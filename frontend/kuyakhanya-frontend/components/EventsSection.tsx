import Link from "next/link";
import Image from "next/image";

type EventCard = {
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  imageLabel?: string;
};

const EVENTS: EventCard[] = [
  {
    title: "KUYAKHANYA FM Launch Event",
    date: "Sun, 09 Nov 2025 • 15:00–17:00",
    location: "Kuyakhanya FM, Opposite 044 Outdoor Lifestyle",
    description:
      "You're invited to the official launch — Guest MC Vovo Short 'n Sweet, LIVE on YouTube, theme White & Blue. Powerful music, uplifting messages and community love.",
    image: "/images/kuyakhanya_launch_event.jpg",
  },
  {
    title: "AmaVundle Amahle Cultural Event",
    date: "03 Oct 2026",
    location: "Thundergate, Ntabethemba, Komani, EC",
    description:
      "KUYAKHANYA FM heads to Ntabethemba for the amaVundle Amahle Cultural Event — all nations gather. Stay tuned to our pages for updates.",
    image: "/images/amavundle_launch_event.JPG",
  },
  {
    title: "UNGMA Gospel Music Awards 2026",
    date: "5 Dec 2026",
    location: "Cape Town, WC",
    description:
      "We attend the UNGMA Ukhonukamva National Gospel Music Awards, broadcasting LIVE from Cape Town with all the insights.",
    image: "/images/ungma_awards.png",
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#0f0a1f] to-[#0b0a14]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.03] dotted" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">UPCOMING EVENTS</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            Come <span className="text-gradient-gold">gather with us</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">Launch celebration, cultural gathering and awards night — live broadcasts and community love.</p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" } as React.CSSProperties}>
          {EVENTS.map((ev) => (
            <div key={ev.title} className="group flex h-full flex-col rounded-[28px] glass-card overflow-hidden hover-lift">
              <div className="relative h-48 overflow-hidden">
                {ev.image ? (
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#4B0082] to-[#6a0dad]" />
                    <div className="absolute inset-0 opacity-20 dotted" />
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 backdrop-blur grid place-items-center">
                      <span className="text-xs font-black tracking-[0.18em] text-[#FFD700]">{ev.imageLabel}</span>
                    </div>
                  </>
                )}
                <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-black text-[#1a0b2e] truncate">{ev.date}</div>
                <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full border border-white/10" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading text-base font-black leading-tight text-white line-clamp-2">{ev.title}</h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFD700]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD700]" /> <span className="line-clamp-1">{ev.location}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-3 flex-1">{ev.description}</p>
                <div className="mt-auto pt-5">
                  <Link href="/events" className="inline-flex rounded-full bg-white text-[#1a0b2e] px-5 py-2.5 text-xs font-black hover:bg-white/90 transition">Learn More →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
