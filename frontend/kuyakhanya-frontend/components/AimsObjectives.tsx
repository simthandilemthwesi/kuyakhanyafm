import { siteData } from "@/lib/site-data";

export default function AimsObjectives({ objectives }: { objectives?: string[] }) {
  const items = objectives ?? siteData.aims;
  return (
    <section id="aims" className="relative py-16 sm:py-24 overflow-hidden bg-[#110a1f]">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#140b26] to-[#0b0a14]" />
      <div aria-hidden className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-[#4B0082]/22 blur-[110px]" />
      <div aria-hidden className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#FFD700]/8 blur-[110px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.02] halftone" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700] uppercase">
            Aims &amp; Objectives
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            What we <span className="text-gradient-gold">build together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/65">
            Concrete commitments that shape everything we broadcast, through every show, voice and partnership.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] shadow-[0_0_12px_rgba(255,215,0,0.35)]" />
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[32px] glass-purple">
          <ol className="divide-y divide-white/[0.06]">
            {items.map((o, i) => (
              <li key={i} className="group flex gap-4 p-5 sm:p-6 transition hover:bg-white/[0.03]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-[#ffb300] text-sm font-black text-[#4B0082] shadow-[0_0_16px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_24px_rgba(255,215,0,0.45)] transition">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 pt-2.5 text-sm sm:text-[16px] leading-relaxed text-white/85">
                  {o}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
