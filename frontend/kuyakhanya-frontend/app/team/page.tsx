import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { siteData } from "@/lib/site-data";
import { fetchManagementTeam, fetchTechnicians, fetchPresenters } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the dedicated team behind KUYAKHANYA FM — management, technicians, and presenters.",
};

function Card({
  name,
  role,
  bio,
  photo,
  featured,
}: {
  name: string;
  role: string;
  bio?: string;
  photo: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[28px] grad-card border bg-white p-5 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
        featured ? "border-[#ffd700]" : "border-zinc-200"
      }`}
    >
      <div className={`relative mx-auto ${featured ? "h-36 w-36" : "h-28 w-28"}`}>
        <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6a0dad] to-[#ffd700] blur-lg opacity-40" />
        <Image
          src={photo}
          alt={name}
          width={240}
          height={240}
          className={`relative mx-auto rounded-full object-cover border-4 shadow ${
            featured ? "h-36 w-36 border-[#ffd700]" : "h-28 w-28 border-[#ffd700]/60"
          }`}
        />
      </div>
      <h3 className={`mt-4 font-display font-bold leading-tight ${featured ? "text-xl text-[#4b0082]" : "text-[15px] text-ink"}`}>
        {name}
      </h3>
      <p className="mt-1 text-xs font-bold tracking-[0.15em] text-[#6a0dad] uppercase">{role}</p>
      {bio && <p className="mt-2 text-sm leading-relaxed text-zinc-600">{bio}</p>}
    </div>
  );
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
          <div className="mt-8 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {presenters.map((p) => (
              <Card key={p.name} name={p.name} role={p.role} photo={p.photo} />
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-flex rounded-full bg-[#6a0dad] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#4b0082] transition-colors shadow-md">
            Want to join us? Contact us →
          </Link>
        </div>
      </div>
    </>
  );
}
