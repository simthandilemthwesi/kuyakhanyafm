import type { Metadata } from "next";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import PageHero from "@/components/PageHero";
import BannerAd from "@/components/BannerAd";
import { siteData } from "@/lib/site-data";
import { fetchManagementTeam, fetchTechnicians, fetchPresenters } from "@/lib/api";
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

function Card({
  name,
  role,
  bio,
  photo,
}: {
  name: string;
  role: string;
  bio?: string;
  photo: string;
  featured?: boolean;
}) {
  return <ProfileCard name={name} role={role} bio={bio} photo={photo} sharePath="/team" />;
}

export default async function TeamPage() {
  // Fetch from Strapi; fall back to site-data when offline
  const [cmsManagers, cmsTechs, cmsPresenters] = await Promise.all([
    fetchManagementTeam().catch(() => []),
    fetchTechnicians().catch(() => []),
    fetchPresenters().catch(() => []),
  ]);

  const md = siteData.managingDirector;
  const managers =
    cmsManagers.length > 0
      ? cmsManagers.map((m) => ({
          name: m.name,
          role: m.role,
          bio: m.bio ?? undefined,
          photo: (m.photo as unknown as { url?: string })?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ""}${(m.photo as unknown as { url: string }).url}` : undefined,
        }))
      : null;

  // Use static fallback for now (images already in /public)
  const managementList = siteData.managementTeam;
  const technician = siteData.technician;
  const presenters = siteData.presenters;

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
          <div className="mx-auto mt-7 max-w-[420px]">
            <Card name={md.name} role={md.role} bio={md.bio} photo={md.photo} featured />
          </div>
        </section>

        {/* Management Team */}
        <section className="mt-14">
          <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Management Team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {managementList.map((m) => (
              <Card key={m.name} name={m.name} role={m.role} bio={m.bio} photo={m.photo} />
            ))}
          </div>
        </section>

        <BannerAd />

        {/* Technician */}
        <section className="mt-14">
          <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Technician</h2>
          <div className="mt-8 max-w-[380px] mx-auto">
            <Card name={technician.name} role={technician.role} bio={technician.bio} photo={technician.photo} />
          </div>
        </section>

        {/* Presenters */}
        <section className="mt-14">
          <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Presenters</h2>
          <p className="text-center text-xs text-zinc-500 mt-2">{presenters.length} voices • {Array.from(new Set(presenters.map((p) => p.role))).join(" • ")}</p>
          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {presenters.map((p) => (
              <Card key={p.name} name={p.name} role={p.role} photo={p.photo} />
            ))}
          </div>
        </section>

        <BannerAd />

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-flex rounded-full bg-[#6a0dad] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#4b0082] transition-colors shadow-md">
            Partner, advertise or get in touch →
          </Link>
        </div>
      </div>
    </>
  );
}
