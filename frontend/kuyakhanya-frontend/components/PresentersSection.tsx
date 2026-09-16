import Link from "next/link";
import { siteData } from "@/lib/site-data";
import ProfileCard from "@/components/ProfileCard";

export default function PresentersSection() {
  // Home shows the first 4 presenters — the full list lives on /team
  const featured = siteData.presenters.slice(0, 4);

  return (
    <section id="presenters" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[#0b0a14]" />
      <div aria-hidden className="absolute top-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[#4B0082]/14 blur-[100px]" />
      <div aria-hidden className="absolute bottom-10 right-10 h-[360px] w-[360px] rounded-full bg-[#FFD700]/5 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.02] grid-pattern" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">MEET OUR PRESENTERS</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
              Voices of <span className="text-gradient-gold">Thembalethu</span>
            </h2>
            <div className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
          </div>
          <Link
            href="/team"
            className="hidden sm:inline-flex items-center rounded-full bg-white/10 border border-white/15 backdrop-blur px-5 py-2.5 text-sm font-bold text-white hover:bg-white/15 hover:border-[#FFD700]/30 transition"
          >
            View All {siteData.presenters.length} Presenters →
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          The voices guiding each KUYAKHANYA FM show — faith, community and inspiration for Thembalethu.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" } as React.CSSProperties}>
          {featured.map((p) => (
            <div key={p.name} className="h-full" style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
              <ProfileCard name={p.name} role={p.role} photo={p.photo} sharePath="/shows-presenters#sp-presenters" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex sm:hidden justify-center">
          <Link href="/team" className="inline-flex items-center rounded-full bg-[#FFD700] px-6 py-3 text-sm font-black text-[#1a0b2e] shadow-lg">
            View All {siteData.presenters.length} Presenters →
          </Link>
        </div>
      </div>
    </section>
  );
}
