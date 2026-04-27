import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

const tools = [
  {
    type: "function",
    function: {
      name: "save_appointment_request",
      description:
        "Save the patient's appointment request to the hospital's system. Call only once you have name, phone, preferred date and reason for visit.",
      parameters: {
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
        additionalProperties: false,
      },
    },
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages = [] } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        tools,
        tool_choice: "auto",
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit. Please try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact us by phone." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const txt = await aiRes.text();
      return new Response(JSON.stringify({ error: "AI gateway error", detail: txt }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const choice = data.choices?.[0];
    const message = choice?.message ?? {};
    const toolCalls = message.tool_calls ?? [];

    let savedId: string | null = null;
    let assistantText: string = message.content ?? "";

    if (toolCalls.length > 0) {
      const call = toolCalls.find((c: any) => c.function?.name === "save_appointment_request");
      if (call) {
        const args = JSON.parse(call.function.arguments || "{}");
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );
        const { data: inserted, error } = await supabase
          .from("appointment_requests")
          .insert({
            name: String(args.name || "").slice(0, 200),
            phone: String(args.phone || "").slice(0, 50),
            email: args.email ? String(args.email).slice(0, 200) : null,
            preferred_date: args.preferred_date ? String(args.preferred_date).slice(0, 200) : null,
            treatment: args.treatment ? String(args.treatment).slice(0, 300) : null,
            notes: args.notes ? String(args.notes).slice(0, 1000) : null,
            transcript: messages,
          })
          .select("id")
          .single();
        if (error) {
          console.error("Insert error", error);
        } else {
          savedId = inserted.id;
        }

        // Ask the model to produce a friendly confirmation
        const followup = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages,
              message,
              {
                role: "tool",
                tool_call_id: call.id,
                content: JSON.stringify({
                  status: savedId ? "saved" : "error",
                  id: savedId,
                }),
              },
            ],
          }),
        });
        if (followup.ok) {
          const f = await followup.json();
          assistantText = f.choices?.[0]?.message?.content ?? "Your appointment request has been received. Our team will call you shortly to confirm.";
        } else {
          assistantText = "Your appointment request has been received. Our team will call you shortly to confirm.";
        }
      }
    }

    if (!assistantText) {
      assistantText = "Sorry, I didn't catch that — could you say it again?";
    }

    return new Response(
      JSON.stringify({ reply: assistantText, savedId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});