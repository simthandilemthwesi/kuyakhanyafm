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
    <section id="vision-mission" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div aria-hidden className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#8a2be2]/10 blur-3xl" />
      <div aria-hidden className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-[#ffd700]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Vision & Mission</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">
            Where we’re headed
          </h2>
          <div className="mx-rule mt-5 rule" />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-gradient-to-br from-[#6a0dad] to-[#1a0b2e] p-[1.5px] shadow-lift">
            <div className="rounded-[30px] bg-gradient-to-br from-[#6a0dad] to-[#4b0082] p-7 sm:p-10 text-white h-full">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur text-[#ffd700] font-black text-2xl">◎</div>
              <h3 className="mt-5 text-2xl font-display font-extrabold">Vision</h3>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-white/90">{v}</p>
            </div>
          </div>

          <div className="rounded-[32px] grad-card border border-zinc-200 bg-white p-7 sm:p-10 shadow-soft">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd700] text-[#4b0082] font-black text-2xl">✦</div>
            <h3 className="mt-5 text-2xl font-display font-extrabold text-ink">Mission</h3>
            <ul className="mt-5 space-y-3.5">
              {m.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#6a0dad] to-[#8a2be2] shadow" />
                  <span className="text-sm sm:text-[15px] leading-relaxed text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
