/**
 * Kuyakhanya FM — Strapi API client (free-tier)
 * Works with local sqlite (localhost:1337) and Supabase-hosed Strapi.
 *
 * - REST: /api/* (public reads, auth writes)
 * - GraphQL: POST /graphql
 * All fetchers are isomorphic and handle fallback to local mock when OFFLINE.
 */

// ── Config ───────────────────────────────────────────────────────────────
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') ||
  (typeof window === 'undefined' ? 'http://localhost:1337' : 'http://localhost:1337');

export const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || ''; // optional public token

function headers(init?: HeadersInit): HeadersInit {
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init as Record<string, string>),
  };
  if (STRAPI_TOKEN) h.Authorization = `Bearer ${STRAPI_TOKEN}`;
  return h;
}

// ── Types ────────────────────────────────────────────────────────────────
export type StrapiMedia = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type Programme = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  schedule: string;
  isActive: boolean;
  cover?: StrapiMedia;
  presenters?: Presenter[];
};

export type Presenter = {
  documentId: string;
  name: string;
  slug: string;
  bio?: string;
  showName?: string;
  photo?: StrapiMedia;
  order?: number;
};

export type ManagementMember = {
  documentId: string;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia;
  order?: number;
};

export type Technician = {
  documentId: string;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia;
};

export type VisionMission = {
  vision: string;
  missionItems: string[];
};

export type AimsObjectives = {
  title: string;
  objectives: string[];
};

export type ContactInfo = {
  phone: string;
  whatsapp?: string;
  email: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  whatsappLink?: string;
  googleFormUrl?: string;
};

// Generic Strapi response
type StrapiCollectionRes<T> = { data: T[]; meta: { pagination?: unknown } };
type StrapiSingleRes<T> = { data: T | null };
type StrapiOneRes<T> = { data: T };

function mediaUrl(m?: StrapiMedia | null): string | null {
  if (!m?.url) return null;
  if (m.url.startsWith('http')) return m.url;
  return `${STRAPI_URL}${m.url}`;
}

// ── Fetch helpers ──────────────────────────────────────────────────────
async function get<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: headers(),
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`[strapi] GET ${path} → ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ── REST fetchers ─────────────────────────────────────────────────────
export async function fetchProgrammes(): Promise<Programme[]> {
  try {
    const json = await get<StrapiCollectionRes<Programme>>(
      `/api/programmes?populate=*&publicationState=live&pagination[pageSize]=50&sort=title:asc`
    );
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchPresenters(): Promise<Presenter[]> {
  try {
    const json = await get<StrapiCollectionRes<Presenter>>(
      `/api/presenters?populate=*&publicationState=live&pagination[pageSize]=100&sort=order:asc`
    );
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchManagementTeam(): Promise<ManagementMember[]> {
  try {
    const json = await get<StrapiCollectionRes<ManagementMember>>(
      `/api/management-teams?populate=*&publicationState=live&sort=order:asc`
    );
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchTechnicians(): Promise<Technician[]> {
  try {
    const json = await get<StrapiCollectionRes<Technician>>(
      `/api/technicians?populate=*&publicationState=live`
    );
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchVisionMission(): Promise<VisionMission | null> {
  try {
    const json = await get<StrapiSingleRes<VisionMission>>(`/api/vision-mission`);
    return json.data;
  } catch {
    return null;
  }
}

export async function fetchAimsObjectives(): Promise<AimsObjectives | null> {
  try {
    const json = await get<StrapiSingleRes<AimsObjectives>>(`/api/aims-objectives`);
    return json.data;
  } catch {
    return null;
  }
}

export async function fetchContactInfo(): Promise<ContactInfo | null> {
  try {
    const json = await get<StrapiSingleRes<ContactInfo>>(`/api/contact-info`);
    return json.data;
  } catch {
    return null;
  }
}

// ── GraphQL fetcher (optional, for advanced queries) ──────────────────
export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/graphql`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`[gql] ${res.status}`);
  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// Helpers for UI
export function strapiImage(url?: string | null, fallback = '/images/team_image.jpg'): string {
  if (!url) return fallback;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export { mediaUrl };

// ── DatoCMS unified fetchers (try Dato → fallback to Strapi → fallback null) ─
import { datoQuery } from "./datocms";
import * as Q from "./queries";

export async function fetchVisionMissionUnified(): Promise<VisionMission | null> {
  // Try Dato
  const d = await datoQuery<{ visionMission: { vision: string; missionItems: string[] } | null }>(Q.Q_VISION_MISSION).catch(() => null);
  if (d?.visionMission) return { vision: d.visionMission.vision, missionItems: d.visionMission.missionItems ?? [] };
  // Fallback to Strapi
  return fetchVisionMission();
}
export async function fetchAimsUnified(): Promise<AimsObjectives | null> {
  const d = await datoQuery<{ aimsObjectives: { title?: string | null; objectives: string[] } | null }>(Q.Q_AIMS).catch(() => null);
  if (d?.aimsObjectives) return { title: d.aimsObjectives.title || "Aims & Objectives", objectives: d.aimsObjectives.objectives ?? [] };
  return fetchAimsObjectives();
}
export async function fetchContactUnified(): Promise<ContactInfo | null> {
  const d = await datoQuery<{ contactInfo: ContactInfo | null }>(Q.Q_CONTACT).catch(() => null);
  if (d?.contactInfo?.email) return d.contactInfo;
  return fetchContactInfo();
}

export type AboutInfo = {
  history?: string | { value: unknown } | null;
  vision?: string | null;
  mission?: string | null;
  values?: string[] | null;
  impactMetrics?: { label: string; value: string; suffix?: string }[] | null;
  futurePlans?: string | { value: unknown } | null;
  heroImage?: string | null;
};

export async function fetchAboutUnified(): Promise<AboutInfo | null> {
  const d = await datoQuery<{
    aboutUs: {
      history?: { value: unknown } | null;
      vision?: string | null;
      mission?: string | null;
      values?: unknown;
      impactMetrics?: unknown;
      futurePlans?: { value: unknown } | null;
      heroImage?: { url: string } | null;
    } | null;
  }>(Q.Q_ABOUT).catch(() => null);
  if (!d?.aboutUs) return null;
  const a = d.aboutUs;
  return {
    history: a.history,
    vision: a.vision,
    mission: a.mission,
    values: Array.isArray(a.values) ? (a.values as unknown) as string[] : null,
    impactMetrics: Array.isArray(a.impactMetrics)
      ? (a.impactMetrics as unknown as { label: string; value: string; suffix?: string }[])
      : null,
    futurePlans: a.futurePlans,
    heroImage: a.heroImage?.url ?? null,
  };
}
