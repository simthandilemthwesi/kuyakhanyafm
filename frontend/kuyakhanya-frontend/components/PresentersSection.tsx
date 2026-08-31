import Link from "next/link";
import { siteData } from "@/lib/site-data";

function PresenterPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="circular-frame h-28 w-28 sm:h-32 sm:w-32 mx-auto">
      <div className="circular-frame-inner h-full w-full grid place-items-center bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4B0082] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 dotted" />
        <span className="relative text-2xl font-black tracking-wide text-[#FFD700]">{initials}</span>
        <span className="absolute bottom-1.5 text-[8px] tracking-[0.18em] font-bold text-white/45">UPLOAD SOON</span>
      </div>
    </div>
  );
}

function PresenterCard({ p }: { p: (typeof siteData.presenters)[number] }) {
  return (
    <div className="group relative flex flex-col rounded-[28px] glass-purple overflow-hidden hover-lift text-center">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div aria-hidden className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#FFD700]/8 blur-2xl group-hover:bg-[#FFD700]/12 transition" />

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="relative" style={{ transform: "translateZ(20px)" } as React.CSSProperties}>
          {/* For now placeholders only — preserve real face when uploaded, no distortion. If p.photo exists but spec says placeholders until upload, we still show placeholder to avoid fake identities. */}
          <PresenterPlaceholder name={p.name} />
          <div aria-hidden className="absolute inset-0 mx-auto h-28 w-28 sm:h-32 sm:w-32 rounded-full border border-dashed border-[#FFD700]/20 scale-[1.08] pointer-events-none" />
        </div>

        <h3 className="mt-5 font-heading text-[15px] sm:text-base font-black leading-tight text-white line-clamp-1">{p.name}</h3>
        <p className="mt-1 text-xs font-black tracking-[0.14em] text-[#FFD700] uppercase line-clamp-1">{p.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/65 line-clamp-2">
          Presenter • KUYAKHANYA FM • Faith, community and inspiration
        </p>

        {/* Social icons — placeholder where applicable */}
        <div className="mt-4 flex justify-center gap-2">
          {[
            { label: "Facebook", d: "M14 8h2V6c0-.7-.4-1-1-1h-1V3h2c1.6 0 2 1 2 2v2h2l-1 2h-1v6h-2v-6h-2z" },
            { label: "Instagram", d: "M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm4-9a1 1 0 110 2 1 1 0 010-2z" },
          ].map((s) => (
            <span key={s.label} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 border border-white/10 text-white/70 group-hover:text-[#FFD700] group-hover:border-[#FFD700]/30 group-hover:bg-[#FFD700]/10 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d={s.d} />
              </svg>
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <span className="inline-flex rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white/60">
            VIEW PROFILE
          </span>
        </div>
      </div>
      <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
    </div>
  );
}

export default function PresentersSection() {
  // New presenter list only — 9 presenters per updated site-data
  const featured = siteData.presenters;

  return (
    <section id="presenters" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[#0b0a14]" />
      <div aria-hidden className="absolute top-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[#4B0082]/14 blur-[100px]" />
      <div aria-hidden className="absolute bottom-10 right-10 h-[360px] w-[360px] rounded-full bg-[#FFD700]/5 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.02] grid-pattern" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">MEET OUR PRESENTERS</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
              Voices of <span className="text-gradient-gold">Thembalethu</span>
            </h2>
            <div className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
          </div>
          <Link
            href="/team"
            className="hidden sm:inline-flex items-center rounded-full bg-white/10 border border-white/15 backdrop-blur px-5 py-2.5 text-sm font-bold text-white hover:bg-white/15 hover:border-[#FFD700]/30 transition"
          >
            View All {siteData.presenters.length} Presenters →
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          Professional presenters guiding every show. Elegant circular frames, glass panels and gold rings — your uploaded portraits will slot in perfectly, undistorted.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" } as React.CSSProperties}>
          {featured.map((p) => (
            <div key={p.name} style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
              <PresenterCard p={p} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex sm:hidden justify-center">
          <Link href="/team" className="inline-flex items-center rounded-full bg-[#FFD700] px-6 py-3 text-sm font-black text-[#1a0b2e] shadow-lg">
            View All {siteData.presenters.length} Presenters →
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-white/35">
          Placeholder silhouettes shown now — real presenter photos you upload later will preserve facial identity, removed background, placed in circular glass frames with natural proportions.
        </p>
      </div>
    </section>
  );
}
