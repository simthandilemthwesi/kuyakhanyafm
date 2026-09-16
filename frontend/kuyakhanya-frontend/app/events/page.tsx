import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events | KUYAKHANYA FM",
  description: "Join KUYAKHANYA FM at our upcoming events — launch party, cultural festivals and gospel awards. Live broadcasts, community love and faith.",
  path: "/events",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Events",
  keywords: ["Kuyakhanya events", "community radio", "live broadcast", "launch event", "gospel awards"],
});

const EVENTS = [
  {
    title: "OUR LAUNCH EVENT",
    date: "Sunday, 09 Nov 2025",
    time: "15:00–17:00",
    location: "Kuyakhanya FM, Opposite 044 Outdoor Lifestyle",
    guest: "Guest MC: Vovo Short 'n Sweet",
    live: "🎙️ LIVE on YouTube",
    theme: "White & Blue",
    image: "/images/kuyakhanya_launch_event.jpg",
    hashtag: "#KuyakhanyaFM #WeShineBrighterTogether #ThembalethuUnites",
  },
  {
    title: "AmaVundle Amahle Cultural Event",
    date: "Mid-October 2028",
    location: "Thundergate, Ntabethemba, Komani, EC",
    image: "/images/ungma_awards.png",
    hashtag: "#KuyakhanyaFM #WeShineBrighterTogether",
  },
  {
    title: "UNGMA Ukhonukamva National Gospel Music Awards 2026",
    date: "5 December 2026",
    location: "Cape Town, WC",
    live: "🎙️ LIVE broadcast from Cape Town",
    image: "/images/ungma_awards.png",
    hashtag: "#KuyakhanyaFM #WeShineBrighterTogether #ToThePoint",
  },
];

export default function EventsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0a14] py-20 sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute top-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/15 blur-[100px]" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">EVENTS</p>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Upcoming <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-[15px] leading-relaxed text-white/65">
            Be there when KUYAKHANYA FM takes the stage. Live broadcasts, community love and faith-filled moments.
          </p>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {EVENTS.map((e) => (
              <div key={e.title} className="group relative overflow-hidden rounded-[32px] grad-card border border-zinc-200 bg-white shadow-soft transition hover:-translate-y-2 hover:shadow-lift">
                <div className="relative h-64 overflow-hidden">
                  <Image src={e.image} alt={e.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a14]/80 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-black tracking-[0.18em] text-[#1a0b2e]">
                    {e.date}
                  </span>
                </div>
                <div className="p-7">
                  <h2 className="font-display text-xl font-black tracking-tight text-[#1a0b2e]">{e.title}</h2>
                  <p className="mt-2 text-sm text-zinc-600">{e.location}</p>
                  {e.guest && <p className="mt-1 text-sm font-bold text-[#6a0dad]">{e.guest}</p>}
                  {e.live && <p className="mt-1 text-sm font-bold text-[#25D366]">{e.live}</p>}
                  {e.theme && <p className="mt-1 text-xs text-zinc-500">Theme: {e.theme}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.hashtag.split(" ").map((h) => (
                      <span key={h} className="rounded-full bg-[#f3e8ff] px-2.5 py-1 text-[10px] font-bold text-[#6a0dad]">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}