"use client";

import Link from "next/link";
import { siteData } from "@/lib/site-data";

/**
 * ALTERNATE Hero — Option B
 * A different premium concept: abstract radio-wave visualizer, centered copy,
 * glass "now playing" card, and animated waveform bars. No photo, image-free.
 * To swap, change the import in app/page.tsx from Hero to HeroAlt.
 */
export default function HeroAlt() {
  return (
    <section className="relative overflow-hidden bg-[#150a27] text-white">
      <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />

      {/* animated waveform background */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-[0.16] pointer-events-none" aria-hidden>
        <div className="flex items-end gap-[6px]">
          {Array.from({ length: 48 }).map((_, i) => (
            <span
              key={i}
              className="w-[6px] rounded-full bg-gradient-to-t from-[#6a0dad] to-[#ffd700]"
              style={{
                height: `${18 + ((i * 37) % 42)}px`,
                animation: `wave 1.6s ease-in-out ${(i % 12) * 0.12}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* radial depth glows */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(106,13,173,0.5),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,215,0,0.14),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[600px] lg:min-h-[700px] flex-col items-center justify-center py-16 text-center">
          {/* badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest border border-white/15 backdrop-blur animate-fade-up">
            <span className="h-2 w-2 rounded-full bg-[#ffd700] animate-pulse" />
            LIVE FROM THEMBALETHU • GEORGE
          </span>

          {/* glass now-playing card */}
          <div className="mt-8 flex items-center gap-4 rounded-3xl border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-xl shadow-2xl animate-fade-up-delay-1">
            <div className="flex items-end gap-1" aria-hidden>
              {[12, 20, 26, 16, 22, 10, 18].map((h, i) => (
                <span key={i} className="w-1.5 rounded-full bg-[#ffd700]"
                  style={{ height: `${h}px`, animation: `wave 1s ease-in-out ${i * 0.1}s infinite` }} />
              ))}
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-extrabold tracking-tight">Now Playing</p>
              <p className="text-xs text-[#ffd700]">Kuyakhanya FM — Live</p>
            </div>
          </div>

          <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold leading-[0.95] tracking-tight drop-shadow-[0_4px_30px_rgba(255,215,0,0.25)] animate-fade-up-delay-2">
            Bringing Light <span className="text-gradient-gold">to Thembalethu</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base sm:text-lg font-medium text-white/80 animate-fade-up-delay-2">
            {siteData.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up-delay-3">
            <Link
              href={siteData.hero.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#ffd700] px-8 py-4 text-sm font-extrabold tracking-wide text-[#4b0082] hover:bg-[#ffe873] transition-all shadow-lg shadow-black/20 animate-pulse-gold"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#4b0082]" />
              {siteData.hero.cta}
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center rounded-full bg-white/10 px-7 py-4 text-sm font-semibold border border-white/20 hover:bg-white/15 backdrop-blur transition-colors"
            >
              Meet Our Team →
            </Link>
          </div>

          {/* stats */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-4 animate-fade-up-delay-3">
            {[
              { k: "15+", v: "Presenters" },
              { k: "5+", v: "Programmes" },
              { k: "24/7", v: "Online" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl grad-card bg-white/10 backdrop-blur border border-white/15 px-4 py-5 text-center shadow-md">
                <div className="text-xl sm:text-3xl font-extrabold text-gradient-gold">{s.k}</div>
                <div className="mt-1 text-[10px] sm:text-xs tracking-[0.18em] font-semibold text-white/70 uppercase">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* waveform keyframes */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
