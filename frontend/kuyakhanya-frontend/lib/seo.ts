import type { Metadata } from "next";

const SITE_URL = "https://kuyakhanyafm.web.app";
const SITE_NAME = "KUYAKHANYA FM";
const DEFAULT_OG = "/images/Kuyakhanya FM LOGO.png";
const FALLBACK_IMG = "/images/team 1.png";
const ICON = "/images/Kuyakhanya FM Icon.png";

type PageOpts = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, image, imageAlt, keywords, type = "website", noIndex }: PageOpts): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG;
  const alt = imageAlt || `${title} | ${SITE_NAME} — We Shine Brighter Together`;

  return {
    title,
    description,
    keywords: keywords || [SITE_NAME, "Kuyakhanya FM", "Thembalethu", "George", "South Africa"],
    alternates: { canonical: url, languages: { "en-ZA": url, en: url } },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type,
      locale: "en_ZA",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        { url: ogImage, width: 1200, height: 630, alt },
        { url: FALLBACK_IMG, width: 1200, height: 630, alt: "KUYAKHANYA FM team" },
        { url: ICON, width: 512, height: 512, alt: "KUYAKHANYA FM Icon" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@KuyakhanyaFM",
      creator: "@KuyakhanyaFM",
      title,
      description,
      images: [ogImage, FALLBACK_IMG],
    },
  };
}

export const siteUrl = SITE_URL;
