/**
 * DatoCMS client — free-tier
 * Project: kuyakhanya-fm (ID: 229086)
 * Domain: kuyakhanya-fm.admin.datocms.com
 * GraphQL endpoint: https://graphql.datocms.com
 * CMA endpoint: https://site-api.datocms.com
 *
 * Tokens (set in .env):
 *  - DATOCMS_READONLY_API_TOKEN  → for frontend GraphQL (Content Delivery API, public)
 *  - DATOCMS_API_TOKEN            → for CMA (manage models/records) — keep server-side only
 */

export const DATO_PROJECT_ID = "229086";
export const DATO_DOMAIN = "kuyakhanya-fm.admin.datocms.com";
export const DATO_GRAPHQL_URL = "https://graphql.datocms.com/";
export const DATO_CMA_URL = "https://site-api.datocms.com";

export const DATO_READONLY_TOKEN = process.env.DATOCMS_READONLY_API_TOKEN || process.env.NEXT_PUBLIC_DATOCMS_READONLY_TOKEN || "";
export const DATO_FULL_TOKEN = process.env.DATOCMS_API_TOKEN || "";

// Simple GraphQL fetcher used by frontend (ISR 60s)
export async function datoFetch<T>(query: string, variables?: Record<string, unknown>, revalidate = 60): Promise<T> {
  const token = DATO_READONLY_TOKEN || DATO_FULL_TOKEN || process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN || "";
  if (!token) {
    throw new Error("[datocms] Missing DATOCMS_READONLY_API_TOKEN — set in .env / Vercel env");
  }
  const res = await fetch(DATO_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Environment": process.env.DATOCMS_ENVIRONMENT || "main",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`[datocms] GraphQL ${res.status} ${res.statusText} — ${await res.text()}`);
  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) throw new Error(`[datocms] GraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data;
}

// CMA helper (Node only) — dynamic import to avoid bundling in browser
export async function getCmaClient() {
  if (!DATO_FULL_TOKEN) throw new Error("DATOCMS_API_TOKEN required for CMA");
  const { buildClient } = await import("@datocms/cma-client-node");
  return buildClient({ apiToken: DATO_FULL_TOKEN, environment: process.env.DATOCMS_ENVIRONMENT || "main" });
}
