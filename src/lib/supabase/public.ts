import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseEnv } from "./env";

let client: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Plain (non-SSR, non-cookie) Supabase client for public, anonymous reads.
 * Safe to use at build time (generateStaticParams, sitemap) and in request
 * time Server Components alike — RLS restricts the `anon` role to published
 * properties regardless of where this is called from.
 */
export function supabasePublic() {
  if (!client) {
    const { url, anonKey } = getSupabaseEnv();
    client = createClient<Database>(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return client;
}
