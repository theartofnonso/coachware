import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;
let warnedMissing: boolean = false;

/**
 * Server-only Supabase client using the service role key (bypasses RLS).
 * Returns null when URL or key are missing.
 */
export function getSupabaseServiceRole(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    client = null;
    return null;
  }

  client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}

export function warnSupabaseMissingInDev(): void {
  if (warnedMissing || process.env.NODE_ENV !== "development") return;
  warnedMissing = true;
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set; API writes are skipped.",
  );
}
