import Link from "next/link";

type Show = {
  day: string;
  title: string;
  subtitle?: string;
  presenters: string[];
  theme: string;
  description: string;
  accent?: "default" | "energetic" | "culture" | "sunday";
};

const SHOWS: Show[] = [
  {
    day: "TUESDAY",
    title: "LOVE & LIFE",
    presenters: ["Franky"],
    theme: "Love • Life • Relationships",
    description:
      "A warm, welcoming conversation around love, life and relationships — real stories, heartfelt advice and community voices that heal, connect and celebrate everyday joy.",
    accent: "default",
  },
  {
    day: "WEDNESDAY",
    title: "ABAFazi BOKHOLO",
    presenters: ["Mrs. Lolwana"],
    theme: "Wisdom • Strength • Purpose",
    description:
      "Celebrating women of faith, resilience, wisdom and purpose — powerful testimonies and honest dialogue that uplifts abafazi bokholo in family, church and community.",
    accent: "default",
  },
  {
    day: "WEDNESDAY",
    title: "INKWENKWEZI ZETHU",
    presenters: ["Mrs. Klass"],
    theme: "Inspiration • Empowerment • Faith",
    description:
      "Inspiration that connects — stories of empowerment, faith and hope that uplift, inspire and remind our community that we shine brighter together.",
    accent: "default",
  },
  {
    day: "THURSDAY",
    title: "ITHEMBA LOKULILA",
    presenters: ["Mrs. Mati", "Mrs. Panduva"],
    theme: "Faith • Hope • Encouragement • Community",
    description:
      "Faith, hope and encouragement for the journey — a compassionate space where community finds healing, prayer and strength to keep believing.",
    accent: "default",
  },
  {
    day: "FRIDAY",
    title: "FRIDAY VIBES",
    presenters: ["Kay Cee"],
    theme: "Music • Energy • Weekend Vibes",
    description:
      "Feel the weekend energy! Music, conversation and vibrant weekend vibes with Kay Cee — still KUYAKHANYA at heart, but louder, brighter and made to move you.",
    accent: "energetic",
  },
  {
    day: "SATURDAY",
    title: "EZAKWA NTU",
    presenters: ["DJ Toto"],
    theme: "Culture • Heritage • Community • Roots",
    description:
      "A proudly African celebration of culture, heritage and roots — music, language and stories that honour where we come from while shaping where we are going.",
    accent: "culture",
  },
  {
    day: "SUNDAY",
    title: "YIZANI SAKHE",
    subtitle: "TOGETHER WE REVIVE",
    presenters: ["Mrs. Mthwesi", "Mrs. Ndziba"],
    theme: "Faith • Restoration • Community • Revival",
    description:
      "An inspirational Sunday gathering of faith, restoration and revival — a sacred community moment to be restored, revived and sent out to shine.",
    accent: "sunday",
  },
];

function PlaceholderPortrait({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="circular-frame h-24 w-24 sm:h-28 sm:w-28 mx-auto">
      <div className="circular-frame-inner h-full w-full grid place-items-center bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4B0082] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 dotted" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="relative text-xl sm:text-2xl font-black tracking-wide text-[#FFD700]">{initials}</span>
        <span className="absolute bottom-1 text-[8px] tracking-[0.2em] font-bold text-white/50">PHOTO SOON</span>
      </div>
    </div>
  );
}

function Card({ show }: { show: Show }) {
  const isEnergetic = show.accent === "energetic";
  const isCulture = show.accent === "culture";
  const isSunday = show.accent === "sunday";

  return (
    <div
      className={`group relative flex flex-col rounded-[28px] glass-purple overflow-hidden hover-lift border-glow`}
      style={{ transformStyle: "preserve-3d" } as React.CSSProperties}
    >
      {/* accent glow */}
      {isEnergetic && <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#ff2e8a]/15 blur-2xl" />}
      {isCulture && <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#FFD700]/10 blur-2xl" />}
      {isSunday && <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#a66cff]/15 blur-2xl" />}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
      <div aria-hidden className="absolute -right-10 top-20 h-32 w-32 rounded-full border border-white/[0.04] pointer-events-none" />

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Day pill */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-black tracking-[0.14em] text-[#1a0b2e]">
            {show.day}
          </span>
          <span className="text-[11px] font-bold tracking-[0.16em] text-white/50">{show.theme}</span>
        </div>

        {/* Circular portrait(s) — 3D ring */}
        <div className="mt-6 flex justify-center gap-3">
          {show.presenters.map((p) => (
            <div
              key={p}
              className="relative"
              style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" } as React.CSSProperties}
            >
              <PlaceholderPortrait name={p} />
              {/* gold dash ring behind */}
              <div aria-hidden className="absolute inset-0 rounded-full border border-dashed border-[#FFD700]/20 scale-[1.12] pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <h3 className="font-heading text-[17px] sm:text-lg font-black leading-tight tracking-tight text-white">
            {show.title}
          </h3>
          {show.subtitle && <p className="mt-1 text-xs font-black tracking-[0.14em] text-[#FFD700]">{show.subtitle}</p>}
          <p className="mt-2 text-[12px] font-bold tracking-wide text-[#FFD700]/90">
            {show.presenters.join(" • ")}
          </p>
          <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
          <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-4">{show.description}</p>
        </div>

        <div className="mt-auto pt-6 flex justify-center">
          <Link
            href="/#listen-live"
            className="inline-flex items-center justify-center rounded-full bg-[#FFD700] px-6 py-2.5 text-xs font-black tracking-wide text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-[0_8px_20px_rgba(255,215,0,0.25)]"
          >
            VIEW SHOW
          </Link>
        </div>
      </div>

      {/* bottom gold line */}
      <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/35 to-transparent" />
    </div>
  );
}

export default function ShowsSection() {
  return (
    <section id="shows" className="relative py-16 sm:py-24 overflow-hidden">
      {/* section bg — subtle 3D broadcast layers */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#110a1f] to-[#0b0a14]" />
      <div aria-hidden className="absolute top-10 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/12 blur-[100px]" />
      <div aria-hidden className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[#FFD700]/5 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.025] halftone" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">OUR SHOWS</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            Voices that keep us <span className="text-gradient-gold">connected</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/65">
            Discover the voices, stories and programmes that keep our community connected — from Tuesday to Sunday.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] shadow-[0_0_12px_rgba(255,215,0,0.35)]" />
        </div>

        {/* 3D grid — massive beautiful */}
        <div className="mt-12 grid gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1400px" } as React.CSSProperties}>
          {SHOWS.map((s) => (
            <div key={s.title} style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
              <Card show={s} />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          Presenter photos are placeholders — your uploaded portraits will appear inside the gold glowing rings, undistorted, with natural proportions.
        </p>
      </div>
    </section>
  );
}
