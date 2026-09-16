import type { Metadata } from "next";
import ShowsPresentersClient from "@/components/ShowsPresentersClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shows & Presenters | KUYAKHANYA FM",
  description:
    "All 8 programmes & 8 presenters — Youth Spotlight, Love & Life, Abafazi Bokholo, Friday Vibes, Ezakwa Ntu, Yizani Sakhe & more. Share any show card.",
  path: "/shows-presenters",
  image: "/images/Kuyakhanya FM LOGO.png",
  imageAlt: "KUYAKHANYA FM Shows & Presenters — shareable cards",
  keywords: ["shows", "presenters", "Love & Life", "Friday Vibes", "Ezakwa Ntu"],
});

export default function ShowsPresentersPage() {
  return <ShowsPresentersClient />;
}
