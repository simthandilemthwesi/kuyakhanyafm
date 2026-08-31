import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { siteData } from "@/lib/site-data";
import { fetchAboutUnified, fetchVisionMissionUnified, fetchAimsUnified } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who we are and what we believe — the story, vision, mission, aims and values of KUYAKHANYA FM.",
};

export default async function AboutPage() {
  const [about, vm, ao] = await Promise.all([
    fetchAboutUnified().catch(() => null),
    fetchVisionMissionUnified().catch(() => null),
    fetchAimsUnified().catch(() => null),
  ]);

  const history = about?.history?.toString() ?? siteData.aboutUs.history;
  const vision = about?.vision ?? vm?.vision ?? siteData.aboutUs.vision;
  const mission = about?.mission ?? vm?.missionItems?.join(" ") ?? siteData.aboutUs.mission;
  const values = about?.values ?? siteData.aboutUs.values;
  const metrics = about?.impactMetrics ?? siteData.aboutUs.impactMetrics;
  const futurePlans = about?.futurePlans?.toString() ?? siteData.aboutUs.futurePlans;
  const objectives = ao?.objectives ?? siteData.aims;

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Brighter together, for Thembalethu</>}
        subtitle="The story, vision and values behind KUYAKHANYA FM — a voice of hope, faith and transformation."
      />

      {/* Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Our Story</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">Born from a God-given vision</h2>
              <div className="mt-5 rule" />
              <p className="mt-6 text-[15px] sm:text-lg leading-relaxed text-zinc-600">{history}</p>
              <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-zinc-600">{siteData.introduction}</p>
            </div>
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-[#6a0dad]/20 via-transparent to-[#ffd700]/20 blur-2xl" />
              <div className="relative rounded-[32px] overflow-hidden border border-zinc-200 shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={siteData.aboutUs.heroImage} alt="Kuyakhanya FM" className="h-[340px] w-full object-cover sm:h-[440px]" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#f5efff] to-[#faf8ff] border-y border-[#ede6f8]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[32px] grad-card border border-zinc-200 bg-white p-8 sm:p-10 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6a0dad] to-[#8a2be2] text-[#ffd700] text-xl">◎</span>
              <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Vision</p>
              <p className="mt-3 text-[15px] sm:text-lg leading-relaxed text-zinc-700">{vision}</p>
            </div>
            <div className="rounded-[32px] bg-gradient-to-br from-[#6a0dad] to-[#1a0b2e] p-[1.5px] shadow-lift">
              <div className="rounded-[30px] bg-gradient-to-br from-[#6a0dad] to-[#4b0082] p-8 sm:p-10 text-white h-full">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-[#ffd700] text-xl">✦</span>
                <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#ffd700] uppercase">Mission</p>
                <p className="mt-3 text-[15px] sm:text-lg leading-relaxed text-white/90">{mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Our Values</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">What we stand for</h2>
            <div className="mx-rule mt-5 rule" />
          </div>
          <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v} className="rounded-2xl grad-card border border-zinc-200 bg-white p-8 text-center shadow-soft hover:-translate-y-1 transition duration-300">
                <span className="font-display text-xl font-bold text-gradient-purple">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact metrics */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad] py-16 sm:py-20">
        <div aria-hidden className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
        <div aria-hidden className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-[#ffd700]/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center text-white">
                <p className="font-display text-5xl font-extrabold tracking-tight text-gradient-gold">
                  {m.value}
                  <span>{m.suffix}</span>
                </p>
                <p className="mt-2 text-xs font-bold tracking-[0.2em] uppercase text-white/80">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aims & objectives */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Aims & Objectives</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">Why we do what we do</h2>
            <div className="mx-rule mt-5 rule" />
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-3">
            {objectives.map((o, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl grad-card border border-zinc-200 bg-white p-5 shadow-soft">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6a0dad] to-[#8a2be2] text-sm font-black text-white shadow-md">{i + 1}</span>
                <p className="pt-2 text-sm sm:text-base leading-relaxed text-zinc-700">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future plans */}
      {futurePlans && (
        <section className="border-t border-[#ede6f8] bg-[#faf8ff] py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] grad-card border border-zinc-200 bg-white p-8 sm:p-12 shadow-lift">
              <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Looking Ahead</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-ink">The future of KUYAKHANYA FM</h2>
              <div className="mt-5 rule" />
              <p className="mt-6 text-[15px] sm:text-lg leading-relaxed text-zinc-600">{futurePlans}</p>
              <Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#6a0dad] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#4b0082] transition-colors shadow-md">
                Get involved →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
