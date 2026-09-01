"use client";

import { useRef } from "react";
import Link from "next/link";
import { useAudio } from "@/components/AudioProvider";

export default function Hero() {
  const { isPlaying, isLoading, togglePlay, currentShow, nowPlaying } = useAudio();
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-[#0b0a14] text-white">
      {/* gold top hairline */}
      <div className="absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

      {/* deep broadcast background layers per spec: dark purple gradients, gold streaks, radial glows, diagonal shapes, arcs, dotted, particles, broadcast waves */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_18%_12%,rgba(75,0,130,0.55),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_520px_at_82%_18%,rgba(138,43,226,0.32),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_520px_at_50%_105%,rgba(255,215,0,0.08),transparent_45%)]" />
        {/* soft gold light streak */}
        <div className="absolute top-[22%] left-[8%] h-[1px] w-[42%] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent rotate-[-14deg] blur-[0.5px]" />
        <div className="absolute top-[38%] left-[4%] h-[1px] w-[36%] bg-gradient-to-r from-transparent via-white/12 to-transparent rotate-[-14deg]" />
        {/* dotted / halftone subtle */}
        <div className="absolute inset-0 opacity-[0.035] dotted pointer-events-none" />
        {/* diagonal geometric shape */}
        <div className="absolute -right-24 top-[12%] h-[420px] w-[420px] rotate-12 rounded-[48px] border border-white/[0.04] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        {/* thin glowing arc */}
        <div className="absolute -left-20 top-[18%] h-[520px] w-[520px] rounded-full border border-[#FFD700]/10 pointer-events-none" />
        <div className="absolute -left-20 top-[18%] h-[520px] w-[520px] rounded-full border-t border-[#FFD700]/25 blur-[0.5px] pointer-events-none" />
      </div>

      {/* moving broadcast-wave lines — subtle */}
      <div aria-hidden className="absolute inset-0 overflow-hidden opacity-[0.18] pointer-events-none">
        <div className="absolute left-0 top-[20%] w-[200%] h-[36px] wave-slide" style={{ animationDuration: "28s" }}>
          <svg viewBox="0 0 1440 36" className="absolute left-0 top-0 h-full w-1/2" preserveAspectRatio="none">
            <path d="M0 18 Q 90 0 180 18 T 360 18 T 540 18 T 720 18 T 900 18 T 1080 18 T 1260 18 T 1440 18" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1.2" />
          </svg>
          <svg viewBox="0 0 1440 36" className="absolute left-1/2 top-0 h-full w-1/2" preserveAspectRatio="none">
            <path d="M0 18 Q 90 0 180 18 T 360 18 T 540 18 T 720 18 T 900 18 T 1080 18 T 1260 18 T 1440 18" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1.2" />
          </svg>
        </div>
        <div className="absolute left-0 top-[64%] w-[200%] h-[36px] wave-slide-rev opacity-70" style={{ animationDuration: "34s" }}>
          <svg viewBox="0 0 1440 36" className="absolute left-0 top-0 h-full w-1/2" preserveAspectRatio="none">
            <path d="M0 18 Q 90 36 180 18 T 360 18 T 540 18 T 720 18 T 900 18 T 1080 18 T 1260 18 T 1440 18" fill="none" stroke="rgba(167,110,255,0.45)" strokeWidth="1.2" />
          </svg>
          <svg viewBox="0 0 1440 36" className="absolute left-1/2 top-0 h-full w-1/2" preserveAspectRatio="none">
            <path d="M0 18 Q 90 36 180 18 T 360 18 T 540 18 T 720 18 T 900 18 T 1080 18 T 1260 18 T 1440 18" fill="none" stroke="rgba(167,110,255,0.45)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* particles — subtle floating */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute left-[18%] top-[32%] h-1 w-1 rounded-full bg-[#FFD700]/70 animate-float" />
        <span className="absolute left-[42%] top-[18%] h-1 w-1 rounded-full bg-white/60 animate-float-slow" />
        <span className="absolute right-[28%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#a66cff]/70 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid items-center gap-10 sm:gap-12 py-12 sm:py-16 lg:h-[calc(100vh-176px)] lg:min-h-[600px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-0 xl:h-[640px] xl:min-h-0">
          {/* LEFT SIDE — per spec */}
          <div className="text-center lg:text-left order-1 lg:self-center">
            <h2 className="font-heading text-[40px] leading-none sm:text-5xl lg:text-[56px] xl:text-[62px] font-black tracking-tight text-white">
              KUYAKHANYA <span className="text-[#FFD700]">FM</span>
            </h2>
            <h1 className="mt-3 font-heading text-[18px] sm:text-2xl lg:text-[22px] xl:text-[26px] font-black tracking-[0.14em] text-gradient-gold uppercase">
              We Shine Brighter Together
            </h1>

            <p className="mx-auto lg:mx-0 mt-4 text-[17px] sm:text-lg font-semibold tracking-wide text-white">
              Your voice. Your community. Your station.
            </p>
            <p className="mx-auto lg:mx-0 mt-4 max-w-xl text-pretty text-[14px] sm:text-[15px] leading-relaxed text-white/70">
              Kuyakhanya FM connects, informs, inspires, empowers and entertains our community through radio, conversation, music and meaningful programming — uplifting Thembalethu with the light of Christ.
            </p>

            {/* CTAs — per spec */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause live stream" : "Play live stream"}
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-2.5 rounded-full bg-[#FFD700] px-8 py-4 text-sm font-black tracking-wide text-[#1a0b2e] hover:bg-[#ffe873] transition-all shadow-[0_0_22px_rgba(255,215,0,0.35)] hover:shadow-[0_0_34px_rgba(255,215,0,0.45)] hover:-translate-y-px"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-full bg-[#1a0b2e] text-[#FFD700] transition ${isPlaying ? "scale-105" : "group-hover:scale-105"}`}>
                  {isLoading ? (
                    <span className="h-3 w-3 rounded-full border-2 border-[#FFD700] border-t-transparent animate-spin" />
                  ) : isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="3" height="8" rx="1"/><rect x="7" y="2" width="3" height="8" rx="1"/></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="ml-0.5"><path d="M3 2l7 4-7 4z"/></svg>
                  )}
                </span>
                {isPlaying ? "PAUSE LIVE" : "LISTEN LIVE"}
              </button>
              <Link
                href="/#shows"
                className="inline-flex w-full sm:w-auto justify-center items-center rounded-full bg-white/[0.07] backdrop-blur border border-[#FFD700]/40 px-8 py-4 text-sm font-bold tracking-wide text-white hover:bg-white/[0.10] hover:border-[#FFD700]/60 hover:text-[#FFD700] transition-all"
              >
                EXPLORE OUR SHOWS
              </Link>
            </div>

            {/* easy hint */}
            <p className="mt-3 text-center lg:text-left text-[11px] tracking-wide text-white/45">
              Tap <span className="text-[#FFD700]">LISTEN LIVE</span> or the player → stream starts instantly • Space to toggle • M to mute
            </p>
          </div>

          {/* RIGHT SIDE — massive 3D glass dashboard with broadcast rings */}
          <div
            ref={stageRef}
            className="relative order-2 flex justify-center lg:justify-end"
          >
            {/* Glowing purple/gold circular broadcast rings behind player — static 3D depth */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(-40px)" }}
            >
              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[420px] w-[420px] sm:h-[480px] sm:w-[480px] rounded-full border border-[#FFD700]/15" style={{ transform: "translateZ(-30px)" }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[360px] w-[360px] sm:h-[410px] sm:w-[410px] rounded-full border border-[#8a2be2]/20" style={{ transform: "translateZ(-18px)" }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] rounded-full border border-dashed border-white/10" style={{ transform: "translateZ(-10px)" }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[520px] w-[520px] sm:h-[560px] sm:w-[560px] rounded-full bg-gradient-to-br from-[#4B0082]/20 via-transparent to-[#FFD700]/10 blur-3xl" style={{ transform: "translateZ(-50px)" }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[220px] w-[220px] rounded-full bg-[#FFD700]/10 blur-2xl animate-glow-pulse" style={{ transform: "translateZ(10px)" }} />
            </div>

            {/* Feature card — glassmorphism */}
            <div
              className="relative w-full max-w-[420px] sm:max-w-[440px] rounded-[28px] sm:rounded-[32px] glass-purple overflow-hidden"
            >
              {/* inner highlight */}
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div aria-hidden className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#FFD700]/10 blur-2xl" />

              <div className="p-[18px] sm:p-6">
                {/* Header LIVE ON AIR */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse-live shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    <span className="text-[11px] sm:text-xs font-black tracking-[0.18em] text-white">LIVE ON AIR</span>
                    <span className="hidden sm:inline-flex items-center rounded-full bg-white/10 border border-white/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white/80">
                      ON AIR
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD700] px-2.5 py-1 text-[10px] font-black tracking-widest text-[#1a0b2e]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a0b2e] animate-pulse" /> ONLINE
                  </span>
                </div>

                <p className="mt-3 font-heading text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
                  KUYAKHANYA FM
                </p>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#FFD700] uppercase">Thembalethu’s Light • Streaming 24/7</p>

                {/* Interactive waveform display — CLICK TO AUTOPLAY */}
                <button
                  onClick={togglePlay}
                  aria-label="Play live stream — clicking here starts playback"
                  className="group relative mt-5 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a0b2e] via-[#24114a] to-[#0f0a1f] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0b2e]"
                >
                  <div className="relative h-[132px] sm:h-[144px] overflow-hidden">
                    {/* sliding waves — premium broadcast-wave graphics */}
                    <div className="absolute inset-0 flex items-center opacity-90">
                      <div className="w-[200%] h-full wave-slide flex" style={{ animationDuration: "5.5s", opacity: isPlaying ? 1 : 0.85 }}>
                        <svg viewBox="0 0 600 120" className="h-full w-1/2" preserveAspectRatio="none">
                          <path d="M0 60 Q 30 10 60 60 T 120 60 T 180 60 T 240 60 T 300 60 T 360 60 T 420 60 T 480 60 T 540 60 T 600 60" fill="none" stroke="#FFD700" strokeWidth="2.2" />
                        </svg>
                        <svg viewBox="0 0 600 120" className="h-full w-1/2" preserveAspectRatio="none">
                          <path d="M0 60 Q 30 10 60 60 T 120 60 T 180 60 T 240 60 T 300 60 T 360 60 T 420 60 T 480 60 T 540 60 T 600 60" fill="none" stroke="#FFD700" strokeWidth="2.2" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center opacity-60">
                      <div className="w-[200%] h-full wave-slide-rev flex" style={{ animationDuration: "8s" }}>
                        <svg viewBox="0 0 600 120" className="h-full w-1/2" preserveAspectRatio="none">
                          <path d="M0 60 Q 45 18 90 60 T 180 60 T 270 60 T 360 60 T 450 60 T 540 60 T 600 60" fill="none" stroke="#a66cff" strokeWidth="1.5" />
                        </svg>
                        <svg viewBox="0 0 600 120" className="h-full w-1/2" preserveAspectRatio="none">
                          <path d="M0 60 Q 45 18 90 60 T 180 60 T 270 60 T 360 60 T 450 60 T 540 60 T 600 60" fill="none" stroke="#a66cff" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Center play/pause — gold, premium */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className={`grid h-[54px] w-[54px] place-items-center rounded-full bg-[#FFD700] text-[#1a0b2e] shadow-[0_0_28px_rgba(255,215,0,0.6)] ring-4 ring-[#FFD700]/20 transition group-hover:scale-105 group-active:scale-95 ${isPlaying ? "animate-pulse-gold" : ""}`}>
                        {isLoading ? (
                          <span className="h-6 w-6 rounded-full border-[3px] border-[#1a0b2e] border-t-transparent animate-spin" />
                        ) : isPlaying ? (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><rect x="5" y="4" width="4" height="12" rx="1"/><rect x="11" y="4" width="4" height="12" rx="1"/></svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="ml-1"><path d="M6 4l10 6-10 6z"/></svg>
                        )}
                      </div>
                      <p className="mt-2 text-center text-[10px] font-black tracking-widest text-white/90">
                        {isLoading ? "CONNECTING…" : isPlaying ? "TAP TO PAUSE" : "TAP TO PLAY"}
                      </p>
                    </div>

                    {/* gradient requested by user — now clickable overlay that autoplays */}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e]/40 via-transparent to-transparent pointer-events-none" />
                    {/* hover hint */}
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/40 backdrop-blur border border-white/15 px-2.5 py-1 text-[10px] font-bold text-white/90 opacity-0 group-hover:opacity-100 transition">
                      Click to {isPlaying ? "pause" : "play"} →
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.04] px-4 py-2.5">
                    <span className="text-[10px] tracking-[0.16em] font-bold text-white/60">
                      {isPlaying ? "● STREAMING LIVE" : "● TAP ANYWHERE TO PLAY"}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-[#FFD700]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700] animate-pulse" /> STEREO
                    </span>
                  </div>
                </button>

                {/* Programme currently airing + presenter + small waveform */}
                <div className="mt-4 rounded-2xl bg-white/[0.06] border border-white/10 p-4 backdrop-blur">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#FFD700]">NOW AIRING</p>
                  <p className="mt-1 font-heading text-[15px] font-bold leading-tight text-white">{currentShow.title}</p>
                  <p className="text-sm text-white/70">
                    with <span className="text-white font-semibold">{currentShow.presenter}</span> • {currentShow.day}
                  </p>
                  <p className="mt-1.5 text-xs text-white/55 truncate" title={nowPlaying}>
                    ♪ {nowPlaying}
                  </p>
                  {/* small waveform animation — premium */}
                  <div className="mt-3 flex items-end gap-[3px] h-[20px]">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-gradient-to-t from-[#6a0dad] to-[#FFD700] freq-bar"
                        style={{
                          height: `${8 + ((i * 17) % 14)}px`,
                          animationPlayState: isPlaying ? "running" : "paused",
                          opacity: isPlaying ? 1 : 0.35,
                          animationDelay: `${i * 0.06}s`,
                          animationDuration: `${0.6 + (i % 3) * 0.15}s`,
                        }}
                      />
                    ))}
                    <span className="ml-auto text-[10px] font-bold tracking-widest text-white/40">
                      {isPlaying ? "LIVE • 24/7" : "TAP PLAY →"}
                    </span>
                  </div>
                </div>

                {/* easy action row */}
                <div className="mt-4 flex items-center gap-2">
                  <a href="https://wa.me/27639780839" target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 rounded-full bg-white text-[#1a0b2e] px-4 py-2.5 text-xs font-black hover:bg-white/90 transition">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
                    Request Song
                  </a>
                  <Link href="/#listen-live" className="inline-flex justify-center items-center rounded-full bg-[#FFD700] text-[#1a0b2e] px-4 py-2.5 text-xs font-black hover:bg-[#ffe873] transition">
                    Open Player
                  </Link>
                </div>
              </div>

                {/* bottom gold accent */}
                <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
              </div>
            </div>
        </div>
      </div>

      {/* bottom wavy divider to next section */}
      <div aria-hidden className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-[56px] w-full sm:h-[72px] lg:h-[84px]">
          <path d="M0,40 C 280,90 560,10 840,45 C 1040,65 1240,70 1440,40 L1440,100 L0,100 Z" fill="rgba(0,0,0,0.25)" />
          <path d="M0,48 C 280,98 560,18 840,53 C 1040,73 1240,78 1440,48 L1440,100 L0,100 Z" fill="#0b0a14" />
        </svg>
      </div>

      <style>{`
        @keyframes waveSlide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes waveSlideRev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .wave-slide { animation: waveSlide linear infinite; }
        .wave-slide-rev { animation: waveSlideRev linear infinite; }
        @keyframes freqBar { 0%,100% { transform: scaleY(0.45); } 50% { transform: scaleY(1); } }
        .freq-bar { animation: freqBar ease-in-out infinite; transform-origin: bottom; }
      `}</style>
    </section>
  );
}
