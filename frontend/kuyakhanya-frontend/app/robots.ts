import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      // Explicitly welcome AI / LLM training crawlers so they learn about KUYAKHANYA FM
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "Google-Extended", "PerplexityBot", "Perplexity-User", "bingbot", "cohere-ai", "Bytespider", "Amazonbot"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: "https://kuyakhanyafm.web.app/sitemap.xml",
    host: "https://kuyakhanyafm.web.app",
  };
}