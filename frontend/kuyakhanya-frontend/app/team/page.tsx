import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import MasterCard from "@/components/MasterCard";
import BannerAd from "@/components/BannerAd";
import { managers, presenters } from "@/lib/people";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Team | KUYAKHANYA FM",
  description: "Meet the dedicated team behind KUYAKHANYA FM — Managing Director, managers, technician & 8 presenters from Thembalethu. Shareable profiles.",
  path: "/team",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Team — presenters & management",
  keywords: ["Kuyakhanya team", "presenters", "Thembalethu", "radio team"],
  type: "profile",
});

export default function TeamPage() {
  const md = managers[0];
  const managementList = managers.slice(1, 3);
  const technician = managers[3];

  return (
    <>
      {/* Team Hero */}
      <PageHero
        eyebrow="Our Team"
        title={<>Meet the people behind the mic</>}
        subtitle="Dedicated presenters, managers and technicians bringing light to Thembalethu every day."
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Managing Director */}
        <section className="text-center">
          <h2 className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Managing Director</h2>
          <div className="mx-auto mt-7 max-w-[320px]">
            <MasterCard person={md} profilePath={`/team/${md.slug}`} />
          </div>
        </section>

        {/* Management Team */}
        <section className="mt-14">
          <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Management Team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {managementList.map((m) => (
              <MasterCard key={m.slug} person={m} profilePath={`/team/${m.slug}`} />
            ))}
          </div>
        </section>

        <BannerAd />

        {/* Technician */}
        <section className="mt-14">
          <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Technician</h2>
          <div className="mt-8 max-w-[320px] mx-auto">
            <MasterCard person={technician} profilePath={`/team/${technician.slug}`} />
          </div>
        </section>

        {/* Presenters */}
        <section className="mt-14">
          <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Presenters</h2>
          <p className="text-center text-xs text-zinc-500 mt-2">{presenters.length} voices • {Array.from(new Set(presenters.map((p) => p.role))).join(" • ")}</p>
          <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {presenters.map((p) => (
              <MasterCard key={p.slug} person={p} profilePath={`/presenters/${p.slug}`} />
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-flex rounded-full bg-[#6a0dad] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#4b0082] transition-colors shadow-md">
            Partner, advertise or get in touch →
          </Link>
        </div>
      </div>
    </>
  );
}
