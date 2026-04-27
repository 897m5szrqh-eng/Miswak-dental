# Miswak Dental Hospital — Web

The Miswak Dental marketing site. Ported from a Lovable export into the Replit
pnpm workspace.

## Backend

The booking chatbot calls the workspace's Express API (`@workspace/api-server`)
at `POST /api/chat-booking`. That route uses Replit's Gemini AI integration and
persists submissions to the `appointment_requests` table defined in
`@workspace/db`. The route requires these env vars at runtime (provisioned by
the Replit Gemini integration):

- `AI_INTEGRATIONS_GEMINI_API_KEY`
- `AI_INTEGRATIONS_GEMINI_BASE_URL`

If either is missing, the endpoint returns HTTP 500 and the chatbot will show
its fallback "please call us" message — verify both are set when deploying.

## Note on `src/integrations/supabase/`

The original Lovable project used a Supabase Edge Function for the chatbot.
The folder kept under `src/integrations/supabase/` is a **temporary
compatibility shim** — `client.ts` exports a `supabase` object whose
`functions.invoke()` simply forwards calls to the Express endpoint above. This
lets `ChatBot.tsx` keep its original import unchanged. The real Supabase SDK
is no longer a dependency. The shim and any leftover generated `types.ts` can
be removed once the chatbot import is updated to call the API directly.
