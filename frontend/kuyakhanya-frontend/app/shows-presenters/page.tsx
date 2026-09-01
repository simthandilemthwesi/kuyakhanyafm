import type { Metadata } from "next";
import ShowsPresentersClient from "@/components/ShowsPresentersClient";

export const metadata: Metadata = {
  title: "Shows & Presenters | KUYAKHANYA FM",
  description:
    "Explore all KUYAKHANYA FM programmes and meet the presenters — from Love & Life to Friday Vibes, Ezakwa Ntu and Yizani Sakhe. WE SHINE BRIGHTER TOGETHER.",
  openGraph: {
    title: "Shows & Presenters | KUYAKHANYA FM",
    description:
      "Explore all KUYAKHANYA FM programmes and meet the presenters — every show, every host, every day.",
    url: "/shows-presenters",
    siteName: "KUYAKHANYA FM",
    images: [{ url: "/images/Kuyakhanya FM LOGO.png", width: 800, height: 800, alt: "KUYAKHANYA FM" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shows & Presenters | KUYAKHANYA FM",
    description: "Every show, every host — KUYAKHANYA FM programmes and presenters.",
    images: ["/images/Kuyakhanya FM LOGO.png"],
  },
};

export default function ShowsPresentersPage() {
  return <ShowsPresentersClient />;
}
