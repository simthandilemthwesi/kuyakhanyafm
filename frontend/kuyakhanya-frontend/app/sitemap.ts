import type { MetadataRoute } from "next";
import { presenters, managers } from "@/lib/people";

export const dynamic = "force-static";

const SITE_URL = "https://kuyakhanyafm.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/shows-presenters", priority: 0.9, changeFrequency: "weekly" },
    { path: "/team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/media-centre", priority: 0.9, changeFrequency: "weekly" },
    { path: "/presenters", priority: 0.8, changeFrequency: "monthly" },
    { path: "/download", priority: 0.6, changeFrequency: "yearly" },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" },
    { path: "/thank-you", priority: 0.3, changeFrequency: "yearly" },
    { path: "/coming-soon", priority: 0.5, changeFrequency: "yearly" },
  ];

  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...presenters.map((p) => ({
      url: `${SITE_URL}/presenters/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...managers.map((p) => ({
      url: `${SITE_URL}/team/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
