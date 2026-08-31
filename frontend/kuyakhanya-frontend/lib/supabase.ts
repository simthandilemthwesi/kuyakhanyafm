import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server-side Supabase client (free tier).
 * Uses NEXT_PUBLIC_* so it also works in client components with RLS anon-inserts.
 * Returns null when not configured so the app falls back gracefully.
 */
export function supabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}
