/**
 * Supabase client — free tier (Postgres + Auth + Storage)
 * Use service_role on server, anon on client.
 * Kuyakhanya FM: optionally stores contact_submissions, join_requests, news_views.
 */
import { createClient } from "@supabase/supabase-js";

export function supabaseAnon() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) throw new Error("Missing SUPABASE_URL / SUPABASE_ANON_KEY");
  return createClient(url, key);
}

export function supabaseService() {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (server only)");
  return createClient(url, key, { auth: { persistSession: false } });
}

// Example: record a contact submission
export async function saveContactSubmission(data: { name: string; email: string; phone?: string; subject?: string; message: string }) {
  const supa = supabaseService();
  return supa.from("contact_submissions").insert(data).select().single();
}
