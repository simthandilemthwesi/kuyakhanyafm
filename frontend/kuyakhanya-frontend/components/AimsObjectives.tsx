import { siteData } from "@/lib/site-data";

export default function AimsObjectives({ objectives }: { objectives?: string[] }) {
  const items = objectives ?? siteData.aims;
  return (
    <section id="aims" className="py-16 sm:py-24 bg-gradient-to-b from-[#f5efff] to-[#faf8ff] border-y border-[#ede6f8]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Aims & Objectives</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">
            What we build together
          </h2>
          <div className="mx-rule mt-5 rule" />
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[32px] grad-card bg-white border border-zinc-200 p-6 sm:p-10 shadow-soft">
          <ol className="space-y-4">
            {items.map((o, i) => (
              <li key={i} className="flex gap-4 rounded-2xl p-3 transition hover:bg-[#f7f4fc]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6a0dad] to-[#8a2be2] text-sm font-black text-white shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-2 text-sm sm:text-[16px] leading-relaxed text-zinc-700">{o}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
