// @ts-ignore - Replit AI Integrations env vars are set at runtime
import { Router, type IRouter, type Request, type Response } from "express";
import { GoogleGenAI } from "@google/genai";
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

const SAVE_TOOL_DECLARATION = {
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
} as any;

type ChatMsg = { role: "user" | "assistant"; content: string };

function toGeminiContents(messages: ChatMsg[]) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content ?? "") }],
  }));
}

router.post("/chat-booking", async (req: Request, res: Response) => {
  try {
    const messages: ChatMsg[] = Array.isArray(req.body?.messages)
      ? req.body.messages
      : [];

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env["AI_INTEGRATIONS_GEMINI_API_KEY"]!,
      httpOptions: {
        apiVersion: "",
        baseUrl: process.env["AI_INTEGRATIONS_GEMINI_BASE_URL"]!,
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

    const candidate = first.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];
    const functionCallPart = parts.find((p: any) => p.functionCall);
    let assistantText: string =
      parts
        .map((p: any) => p.text ?? "")
        .filter(Boolean)
        .join("") || "";

    let savedId: string | null = null;

    if (functionCallPart && (functionCallPart as any).functionCall) {
      const call = (functionCallPart as any).functionCall;
      const args = (call.args ?? {}) as Record<string, any>;

      try {
        const inserted = await db
          .insert(appointmentRequestsTable)
          .values({
            name: String(args.name ?? "").slice(0, 200),
            phone: String(args.phone ?? "").slice(0, 50),
            email: args.email ? String(args.email).slice(0, 200) : null,
            preferredDate: args.preferred_date
              ? String(args.preferred_date).slice(0, 200)
              : null,
            treatment: args.treatment ? String(args.treatment).slice(0, 300) : null,
            notes: args.notes ? String(args.notes).slice(0, 1000) : null,
            transcript: messages,
          })
          .returning({ id: appointmentRequestsTable.id });
        savedId = inserted[0]?.id ?? null;
      } catch (e) {
        req.log.error({ err: e }, "Failed to insert appointment request");
      }

      const followup = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
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
          } as any,
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
          } as any,
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          maxOutputTokens: 8192,
        },
      });

      const followupParts = followup.candidates?.[0]?.content?.parts ?? [];
      const followupText = followupParts
        .map((p: any) => p.text ?? "")
        .filter(Boolean)
        .join("");
      assistantText =
        followupText ||
        "Your appointment request has been received. Our team will call you shortly to confirm.";
    }

    if (!assistantText) {
      assistantText = "Sorry, I didn't catch that — could you say it again?";
    }

    return res.json({ reply: assistantText, savedId });
  } catch (e: any) {
    req.log.error({ err: e }, "chat-booking failed");
    return res.status(500).json({
      error: "Chat error",
      detail: String(e?.message ?? e),
    });
  }
});

export default router;
