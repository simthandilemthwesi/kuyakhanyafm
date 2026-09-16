import Link from "next/link";
import { ShowCard } from "@/components/ShowsPresentersClient";
import { SHOWS, type Show } from "@/lib/shows";

const FEATURED = ["Ithemba Lokulila", "Ezakwa Ntu", "Yizani Sakhe"];

export default function ShowsSection() {
  const featured = FEATURED.map((t) => SHOWS.find((s) => s.title === t)).filter(
    (s): s is Show => Boolean(s)
  );

  return (
    <section id="shows" className="relative py-16 sm:py-24 overflow-hidden">
      {/* section bg — subtle 3D broadcast layers */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#110a1f] to-[#0b0a14]" />
      <div aria-hidden className="absolute top-10 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/12 blur-[100px]" />
      <div aria-hidden className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[#FFD700]/5 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.025] halftone" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">OUR SHOWS</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            Voices that keep us <span className="text-gradient-gold">connected</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/65">
            Discover the voices, stories and programmes that keep our community connected — Thursday to Sunday highlights.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] shadow-[0_0_12px_rgba(255,215,0,0.35)]" />
        </div>

        {/* Home grid — featured shows only: Ithemba Lokulila, Ezakwa Ntu, Yizani Sakhe */}
        <div className="mt-12 grid gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1400px" } as React.CSSProperties}>
          {featured.map((s) => (
            <div key={s.title} style={{ transformStyle: "preserve-3d" } as React.CSSProperties} className="h-full">
              <ShowCard show={s} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shows-presenters"
            className="inline-flex items-center rounded-full bg-white/10 border border-white/15 backdrop-blur px-6 py-3 text-sm font-bold text-white hover:bg-white/15 hover:border-[#FFD700]/30 transition"
          >
            View All {SHOWS.length} Shows →
          </Link>
        </div>
      </div>
    </section>
  );
}
