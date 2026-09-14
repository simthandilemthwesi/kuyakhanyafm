import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://kuyakhanyafm.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/shows-presenters", priority: 0.9, changeFrequency: "weekly" },
    { path: "/programmes", priority: 0.8, changeFrequency: "weekly" },
    { path: "/services", priority: 0.7, changeFrequency: "monthly" },
    { path: "/team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
