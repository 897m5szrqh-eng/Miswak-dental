// Compatibility shim — original Lovable app used Supabase Edge Functions.
// We now route the chat-booking request to our own Express API.
const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+/g, "/");

export type InvokeResult<T> =
  | { data: T; error: null }
  | { data: null; error: Error };

async function invoke<T = unknown>(
  name: string,
  opts: { body?: unknown } = {},
): Promise<InvokeResult<T>> {
  try {
    const res = await fetch(`${API_BASE}/${name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts.body ?? {}),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        data: null,
        error: new Error(`Request failed: ${res.status} ${text}`),
      };
    }
    const data = (await res.json()) as T;
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e : new Error(String(e)) };
  }
}

export const supabase = {
  functions: { invoke },
};
