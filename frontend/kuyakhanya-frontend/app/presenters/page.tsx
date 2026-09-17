import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MasterCard from "@/components/MasterCard";
import { presenters } from "@/lib/people";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Presenters | KUYAKHANYA FM",
  description: "Meet all 8 KUYAKHANYA FM presenters — the voices of Youth Spotlight, Love & Life, Friday Vibes, faith, culture and community.",
  path: "/presenters",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Presenters — voices of Thembalethu",
  keywords: ["Kuyakhanya presenters", "radio hosts", "Thembalethu", "youth spotlight"],
});

export default function PresentersPage() {
  return (
    <>
      <PageHero
        eyebrow="Presenters"
        title={<>Voices of Thembalethu</>}
        subtitle="Faith, community and inspiration — meet every voice behind the mic."
      />

      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#0b0a14]">
        <div aria-hidden className="absolute top-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[#4B0082]/14 blur-[100px]" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {presenters.map((p) => (
              <MasterCard key={p.slug} person={p} profilePath={`/presenters/${p.slug}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
