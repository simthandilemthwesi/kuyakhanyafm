import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { siteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Browse the programmes, shows and presenters on KUYAKHANYA FM — uplifting gospel content for the Thembalethu community.",
};

export default function ProgrammesPage() {
  // Group presenters by their show (role)
  const shows = siteData.presenters.reduce<{ name: string; presenters: typeof siteData.presenters }[]>((acc, p) => {
    const existing = acc.find((s) => s.name === p.role);
    if (existing) existing.presenters.push(p);
    else acc.push({ name: p.role, presenters: [p] });
    return acc;
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={<>Shows & presenters</>}
        subtitle="A lineup of uplifting devotional, praise and community programmes airing on KUYAKHANYA FM."
      />

      <section className="py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {shows.length === 0 ? (
            <div className="rounded-[32px] grad-card border border-dashed border-zinc-300 bg-white p-16 text-center shadow-soft">
              <span className="text-3xl">📻</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-ink">Programme schedule coming soon</h2>
              <p className="mt-2 text-zinc-500 max-w-md mx-auto">We’re preparing our full show line-up. Tune in soon for devotionals, praise and community programmes!</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {shows.map((show) => (
                <div key={show.name} className="rounded-[32px] grad-card border border-zinc-200 bg-white p-7 shadow-soft hover:-translate-y-1 hover:shadow-lift transition duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-gradient-purple">{show.name}</h2>
                    <span className="rounded-full bg-gradient-to-r from-[#6a0dad] to-[#8a2be2] px-3.5 py-1 text-xs font-black text-white shadow-sm">
                      {show.presenters.length} {show.presenters.length === 1 ? "host" : "hosts"}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {show.presenters.map((p) => (
                      <div key={p.name} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 hover:border-[#6a0dad]/40 transition-colors">
                        <Image src={p.photo} alt={p.name} width={56} height={56} className="h-12 w-12 rounded-full object-cover border-2 border-[#ffd700]/70 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold leading-tight text-ink truncate">{p.name}</p>
                          <p className="text-[11px] text-zinc-500 truncate">Presenter</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
