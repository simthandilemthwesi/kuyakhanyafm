import Link from "next/link";
import { siteData } from "@/lib/site-data";
import NewsCard from "./NewsCard";
import BannerAd from "./BannerAd";

const CATEGORIES = ["Breaking News", "Community Updates", "Events", "Interviews", "Station Announcements"] as const;

export default function NewsSection() {
  const news = [...siteData.news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
            <NewsCard key={n.slug} article={n} variant="dark" />
          ))}
        </div>

        <BannerAd />

        <div className="mt-8 sm:hidden text-center">
          <Link href="/news" className="inline-flex rounded-full bg-white/10 border border-white/15 px-6 py-3 text-sm font-bold text-white">View All News →</Link>
        </div>
      </div>
    </section>
  );
}
