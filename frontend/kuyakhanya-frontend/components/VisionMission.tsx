import { siteData } from "@/lib/site-data";

export default function VisionMission({
  vision,
  missionItems,
}: {
  vision?: string;
  missionItems?: string[];
}) {
  const v = vision ?? siteData.vision;
  const m = missionItems ?? siteData.mission;

  return (
    <section
      id="vision-mission"
      className="relative py-16 sm:py-24 overflow-hidden bg-[#0b0a14]"
    >
      {/* section bg — soft broadcast layers */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#120b22] to-[#0b0a14]" />
      <div aria-hidden className="absolute top-16 -left-24 h-80 w-80 rounded-full bg-[#4B0082]/20 blur-[110px]" />
      <div aria-hidden className="absolute bottom-10 -right-24 h-80 w-80 rounded-full bg-[#FFD700]/8 blur-[110px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.025] grid-pattern" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700] uppercase">
            Vision &amp; Mission
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            Where we&rsquo;re <span className="text-gradient-gold">headed</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/65">
            The heart of what drives KUYAKHANYA FM — a vision of light and a mission of hope for Thembalethu and beyond.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] shadow-[0_0_12px_rgba(255,215,0,0.35)]" />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Vision — dark purple glass */}
          <div className="rounded-[32px] glass-purple p-[1.5px]">
            <div className="rounded-[31px] bg-gradient-to-br from-[#1a0b2e]/95 to-[#0b0a14] p-7 sm:p-10 h-full relative overflow-hidden">
              <div aria-hidden className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#4B0082]/40 blur-2xl" />
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700] text-[#4B0082] font-black text-2xl shadow-[0_0_20px_rgba(255,215,0,0.35)]">
                ◎
              </div>
              <h3 className="relative mt-5 text-2xl font-heading font-black text-white">Vision</h3>
              <div className="relative mt-3 h-[2px] w-12 bg-gradient-to-r from-[#FFD700] to-transparent" />
              <p className="relative mt-4 text-[15px] sm:text-base leading-relaxed text-white/90">{v}</p>
            </div>
          </div>

          {/* Mission — dark glass with gold hairline */}
          <div className="rounded-[32px] glass-purple relative overflow-hidden">
            <div aria-hidden className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#FFD700]/8 blur-2xl" />
            <div className="relative p-7 sm:p-10 h-full">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700]/15 text-[#FFD700] font-black text-2xl border border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                ✦
              </div>
              <h3 className="mt-5 text-2xl font-heading font-black text-white">Mission</h3>
              <div className="mt-3 h-[2px] w-12 bg-gradient-to-r from-[#FFD700] to-transparent" />
              <ul className="mt-5 space-y-3.5">
                {m.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#ffb300] shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                    <span className="text-sm sm:text-[15px] leading-relaxed text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
