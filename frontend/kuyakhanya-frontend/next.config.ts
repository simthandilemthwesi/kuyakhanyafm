import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.strapi.io" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "kuyakhanyafm.web.app" },
      { protocol: "https", hostname: "**.datocms-assets.com" },
      { protocol: "https", hostname: "www.datocms-assets.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  },
};

export default nextConfig;
