import { managers } from "@/lib/people";
import MasterCard from "@/components/MasterCard";

export default function TeamSection() {
  return (
    <section id="team" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#110a1f] to-[#0b0a14]" />
      <div aria-hidden className="absolute top-10 right-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/12 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.02] grid-pattern" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">OUR TEAM</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            The people behind <span className="text-gradient-gold">the mic</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            Leadership, media and technical hearts serving Thembalethu.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" style={{ perspective: "1200px" } as React.CSSProperties}>
          {managers.map((p) => (
            <div key={p.slug} className="h-full" style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
              <MasterCard person={p} profilePath={`/team/${p.slug}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
