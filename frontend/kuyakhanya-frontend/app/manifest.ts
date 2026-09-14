import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KUYAKHANYA FM — We Shine Brighter Together",
    short_name: "KUYAKHANYA FM",
    description:
      "Online Christian radio from Thembalethu, George. Live 24/7, shows, presenters, news & community.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a14",
    theme_color: "#4B0082",
    orientation: "portrait",
    categories: ["music", "entertainment", "lifestyle"],
    lang: "en-ZA",
    dir: "ltr",
    icons: [
      { src: "/images/Kuyakhanya FM Icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/Kuyakhanya FM Icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/images/Kuyakhanya FM Icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
