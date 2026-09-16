import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WeatherGrid from "@/components/WeatherGrid";
import NewsCard from "@/components/NewsCard";
import InlineAd from "@/components/InlineAd";
import { siteData } from "@/lib/site-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "News & Updates | KUYAKHANYA FM",
  description: "Latest news, announcements, weather updates for George & 7 SA cities, and stories from KUYAKHANYA FM studio in Thembalethu.",
  path: "/news",
  image: "/images/kuyakhanya_radio_day.jpg",
  imageAlt: "KUYAKHANYA FM News — listeners celebrating World Radio Day",
  keywords: ["Kuyakhanya news", "George weather", "South Africa weather", "radio news"],
  type: "website",
});

export default function NewsPage() {
  const items = [...siteData.news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title={<>What’s new at KUYAKHANYA FM</>}
        subtitle="Announcements, events and stories from the studio."
      />

      {/* Weather Updates — anchor for redirect from Home */}
      <section id="weather" className="scroll-mt-24 py-10 sm:py-14 bg-[#0b0a14] border-y border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Weather <span className="text-[#ffd700]">Updates</span>
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">Live temperatures for George & 7 major South African cities — Atlantic to Garden Route, refreshed every 10 minutes via OpenWeatherMap.</p>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#ffd700]" />
          </div>
          <div className="mt-8">
            <WeatherGrid />
          </div>
          <p className="mt-4 text-center text-[11px] text-white/40">Johannesburg • Cape Town • Durban • Pretoria • Gqeberha • East London • Bloemfontein • George • Coordinated for ZA (CAT)</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <InlineAd />
          {items.length === 0 ? (
            <div className="rounded-[32px] grad-card border border-dashed border-zinc-300 bg-white p-16 text-center shadow-soft">
              <span className="text-3xl">📰</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-[#1a0b2e]">No news yet</h2>
              <p className="mt-2 text-zinc-500 max-w-md mx-auto">Stories and announcements will appear here soon. Check back for updates!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((n) => (
                <NewsCard key={n.slug} article={n} variant="light" />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
