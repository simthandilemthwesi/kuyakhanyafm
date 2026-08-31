import Link from "next/link";
import { siteData } from "@/lib/site-data";

const CATEGORIES = ["Breaking News", "Community Updates", "Events", "Interviews", "Station Announcements"] as const;

export default function NewsSection() {
  const news = siteData.news;

  return (
    <section id="news" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[#0b0a14]" />
      <div aria-hidden className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">LATEST NEWS & COMMUNITY</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-black tracking-tight text-white">What’s happening</h2>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
          </div>
          <Link href="/news" className="hidden sm:inline-flex rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/15 transition">
            View All News →
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span key={c} className="rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" } as React.CSSProperties}>
          {news.map((n) => (
            <div key={n.slug} className="group flex flex-col rounded-[24px] glass-card overflow-hidden hover-lift">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#4B0082] p-0">
                <div className="absolute inset-0 opacity-20 dotted" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-black tracking-wide text-[#1a0b2e]">KUYAKHANYA FM</span>
                </div>
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="rounded-full bg-[#FFD700] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#1a0b2e]">NEWS</span>
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#1a0b2e]">{new Date(n.date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <div className="absolute inset-0 rounded-t-[24px] ring-1 ring-white/10 pointer-events-none" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading text-base font-black leading-tight text-white group-hover:text-[#FFD700] transition line-clamp-2">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-2">{n.excerpt}</p>
                <p className="mt-3 text-xs text-white/40">By {n.author}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <Link href="/news" className="text-xs font-black tracking-wide text-[#FFD700] hover:text-[#ffe873] transition">
                    READ MORE →
                  </Link>
                  <span className="h-8 w-8 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white/40 group-hover:bg-[#FFD700] group-hover:text-[#1a0b2e] transition">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/news" className="inline-flex rounded-full bg-white/10 border border-white/15 px-6 py-3 text-sm font-bold text-white">View All News →</Link>
        </div>
      </div>
    </section>
  );
}
