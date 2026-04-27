import {
  Router,
  type IRouter,
  type Request,
  type Response,
} from "express";
import {
  GoogleGenAI,
  type Content,
  type FunctionDeclaration,
  type Part,
} from "@google/genai";
import { db, appointmentRequestsTable } from "@workspace/db";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are the friendly virtual assistant for **Miswak Dental Hospital & Implant Centre** in Hyderabad, India (Masab Tank, opp NMDC building). Your job is to help visitors book a dental appointment in a warm, conversational way.

Hospital info you can share when asked:
- Hours: Mon–Sat 9:00 AM – 9:00 PM, Sun 10:00 AM – 5:00 PM
- Phone: 040-23346260 · Dental Emergency: +91 92463 43630
- Email: info@miswakdental.com
- Address: Opp NMDC building, below Tapadia Diagnostics / MS College, Masab Tank, Hyderabad, Telangana 500028
- Treatments: Dental Implants, Root Canal, Braces & Clear Aligners, Smile Makeover, Teeth Whitening, Kids Dentistry, Laser Dentistry, Gum Treatment, Wisdom Teeth Removal, Crowns & Bridges, Dentures, Preventive Dentistry.
- Established Nov 2002 by Dr Shaik Mohammed Majid. 1 Lac+ patients, 10K+ implants placed, 4.5★ from 2K+ reviews.

Booking flow — collect ONE thing at a time, naturally:
1. Patient's full name
2. Phone number (10-digit Indian mobile preferred)
3. Email (optional — they can skip)
4. Preferred date / time window (e.g., "Sat morning")
5. Reason for visit / treatment of interest

Once you have name + phone + preferred date + reason, call the **save_appointment_request** tool to record it. Then confirm warmly and tell the user the team will call to confirm. Don't keep asking for more info after saving.

Style: short, kind, professional. Use simple sentences. Never invent prices. For medical advice, gently say the dentist will assess in person.`;

const SAVE_TOOL_DECLARATION: FunctionDeclaration = {
  name: "save_appointment_request",
  description:
    "Save the patient's appointment request to the hospital's system. Call only once you have name, phone, preferred date and reason for visit.",
  parametersJsonSchema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Patient full name" },
      phone: { type: "string", description: "Phone number" },
      email: { type: "string", description: "Email address (optional)" },
      preferred_date: {
        type: "string",
        description: "Preferred date and time window in plain text",
      },
      treatment: {
        type: "string",
        description: "Reason for visit or treatment of interest",
      },
      notes: {
        type: "string",
        description: "Any other relevant details from the conversation",
      },
    },
    required: ["name", "phone", "preferred_date", "treatment"],
  },
};

type ChatMsg = { role: "user" | "assistant"; content: string };

type SaveArgs = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  preferred_date?: unknown;
  treatment?: unknown;
  notes?: unknown;
};

function toGeminiContents(messages: ChatMsg[]): Content[] {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content ?? "") }],
  }));
}

function joinTextParts(parts: Part[]): string {
  return parts
    .map((p) => p.text ?? "")
    .filter(Boolean)
    .join("");
}

function toStringOrNull(v: unknown, max: number): string | null {
  if (v === undefined || v === null || v === "") return null;
  return String(v).slice(0, max);
}

router.post("/chat-booking", async (req: Request, res: Response) => {
  try {
    const messages: ChatMsg[] = Array.isArray(req.body?.messages)
      ? (req.body.messages as ChatMsg[])
      : [];

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const apiKey = process.env["AI_INTEGRATIONS_GEMINI_API_KEY"];
    const baseUrl = process.env["AI_INTEGRATIONS_GEMINI_BASE_URL"];
    if (!apiKey || !baseUrl) {
      return res
        .status(500)
        .json({ error: "Gemini integration is not configured" });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        apiVersion: "",
        baseUrl,
      },
    });

    const first = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: toGeminiContents(messages),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ functionDeclarations: [SAVE_TOOL_DECLARATION] }],
        maxOutputTokens: 8192,
      },
    });

    const parts: Part[] = first.candidates?.[0]?.content?.parts ?? [];
    const functionCallPart = parts.find((p) => p.functionCall);
    let assistantText = joinTextParts(parts);
    let savedId: string | null = null;

    if (functionCallPart?.functionCall) {
      const call = functionCallPart.functionCall;
      const args = (call.args ?? {}) as SaveArgs;
      const name = toStringOrNull(args.name, 200) ?? "";
      const phone = toStringOrNull(args.phone, 50) ?? "";

      try {
        const inserted = await db
          .insert(appointmentRequestsTable)
          .values({
            name,
            phone,
            email: toStringOrNull(args.email, 200),
            preferredDate: toStringOrNull(args.preferred_date, 200),
            treatment: toStringOrNull(args.treatment, 300),
            notes: toStringOrNull(args.notes, 1000),
            transcript: messages,
          })
          .returning({ id: appointmentRequestsTable.id });
        savedId = inserted[0]?.id ?? null;
      } catch (e) {
        req.log.error({ err: e }, "Failed to insert appointment request");
      }

      const followupContents: Content[] = [
        ...toGeminiContents(messages),
        {
          role: "model",
          parts: [
            {
              functionCall: {
                name: call.name,
                args: call.args,
              },
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: {
                  status: savedId ? "saved" : "error",
                  id: savedId,
                },
              },
            },
          ],
        },
      ];

      const followup = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: followupContents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          maxOutputTokens: 8192,
        },
      });

      const followupParts: Part[] =
        followup.candidates?.[0]?.content?.parts ?? [];
      const followupText = joinTextParts(followupParts);
      assistantText =
        followupText ||
        "Your appointment request has been received. Our team will call you shortly to confirm.";
    }

    if (!assistantText) {
      assistantText = "Sorry, I didn't catch that — could you say it again?";
    }

    return res.json({ reply: assistantText, savedId });
  } catch (e) {
    req.log.error({ err: e }, "chat-booking failed");
    const detail = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: "Chat error", detail });
  }
});

export default router;
