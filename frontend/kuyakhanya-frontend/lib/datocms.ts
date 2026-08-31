/**
 * DatoCMS GraphQL client — Kuyakhanya FM v2
 * Project ID: 229086 | domain: kuyakhanya-fm.admin.datocms.com
 * Endpoint: https://graphql.datocms.com
 * Free tier: GraphQL, 10 models, no trial
 */

export const DATO_URL = "https://graphql.datocms.com/";
export const DATO_PROJECT_ID = "229086";

function token(): string | null {
  // server & client (public readonly token is okay to expose with prefix NEXT_PUBLIC_)
  return (
    process.env.DATOCMS_READONLY_API_TOKEN ||
    process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN ||
    process.env.NEXT_PUBLIC_DATOCMS_READONLY_TOKEN ||
    null
  );
}

export async function datoQuery<T>(query: string, variables?: Record<string, unknown>, revalidate = 60): Promise<T | null> {
  const t = token();
  if (!t) {
    // graceful fallback — caller will use site-data
    if (process.env.NODE_ENV !== "production") console.warn("[datocms] Missing token — using fallback data. Set DATOCMS_READONLY_API_TOKEN in .env.local");
    return null;
  }
  try {
    const res = await fetch(DATO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
        "X-Environment": process.env.DATOCMS_ENVIRONMENT || process.env.NEXT_PUBLIC_DATOCMS_ENVIRONMENT || "main",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
    if (!res.ok) {
      console.warn(`[datocms] ${res.status} ${await res.text()}`);
      return null;
    }
    const json = (await res.json()) as { data: T; errors?: unknown };
    if (json.errors) {
      console.warn("[datocms] GraphQL errors", json.errors);
      return null;
    }
    return json.data;
  } catch (e) {
    console.warn("[datocms] fetch failed", e);
    return null;
  }
}

// Types mirroring DatoCMS models
export type DatoImage = { url: string; alt?: string | null; width?: number; height?: number; responsiveImage?: { src: string; srcSet: string } };

export type DatoProgramme = {
  id: string; title: string; slug: string; description: string; schedule: string; isActive: boolean;
  cover?: DatoImage | null; presenters?: { id: string; name: string; slug: string; showName?: string | null }[];
};
export type DatoPresenter = {
  id: string; name: string; slug: string; bio?: string | null; showName?: string | null; order?: number | null;
  photo?: DatoImage | null; programmes?: { id: string; title: string; slug: string }[];
};
export type DatoManagement = { id: string; name: string; role: string; bio?: string | null; order?: number | null; isActive?: boolean | null; photo?: DatoImage | null };
export type DatoTechnician = { id: string; name: string; role: string; bio?: string | null; isActive?: boolean | null; photo?: DatoImage | null };
export type DatoVisionMission = { vision: string; missionItems: string[] };
export type DatoAims = { title?: string | null; objectives: string[] };
export type DatoContact = { phone: string; whatsapp?: string | null; email: string; address?: string | null; facebook?: string | null; instagram?: string | null; youtube?: string | null; tiktok?: string | null; whatsappLink?: string | null; googleFormUrl?: string | null };
export type DatoAbout = {
  history?: { value: unknown } | null; vision?: string | null; mission?: string | null;
  values?: unknown; impactMetrics?: unknown; futurePlans?: { value: unknown } | null; heroImage?: DatoImage | null;
};
export type DatoNews = {
  id: string; title: string; slug: string; excerpt?: string | null; author?: string | null; date?: string | null; isFeatured?: boolean | null;
  coverImage?: DatoImage | null; content?: { value: unknown } | null;
};
export type DatoService = {
  id: string; title: string; slug: string; description: string; longDescription?: { value: unknown } | null; order?: number | null; isActive?: boolean | null; image?: DatoImage | null;
};
