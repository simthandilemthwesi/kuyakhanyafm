"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAudio } from "@/components/AudioProvider";

export default function ListenLive() {
  const { isPlaying, isLoading, volume, isMuted, error, currentShow, nowPlaying, togglePlay, setVolume, toggleMute } = useAudio();
  const [showLegacy, setShowLegacy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ rx: -y * 8, ry: x * 10 });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleShare = async () => {
    const data = { title: "KUYAKHANYA FM — Live", text: `Listening to ${currentShow.title} with ${currentShow.presenter} on KUYAKHANYA FM`, url: "https://kuyakhanyafm.web.app/#listen-live" };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        alert("Link copied — share KUYAKHANYA FM with friends!");
      }
    } catch {}
  };

  const handlePopout = () => {
    window.open("https://cast3.asurahosting.com/proxy/kuyakhan/stream", "kuyakhanya-popout", "width=460,height=120");
  };

  return (
    <section id="listen-live" className="relative overflow-hidden py-16 sm:py-24">
      {/* section background — premium broadcast dark with purple/gold */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#0b0a14] via-[#1a0b2e] to-[#2e0b56]" />
      <div aria-hidden className="absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/20 blur-[90px]" />
      <div aria-hidden className="absolute -bottom-24 right-1/4 h-[420px] w-[420px] rounded-full bg-[#FFD700]/8 blur-[90px]" />
      <div aria-hidden className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/70 to-transparent" />
      <div aria-hidden className="absolute inset-0 opacity-[0.03] dotted" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header — per spec */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700] uppercase">Listen Live</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            KUYAKHANYA FM <span className="text-[#FFD700]">LIVE RADIO</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/70">
            One tap to play • Premium broadcast quality • Streaming 24/7 from Thembalethu
          </p>
          <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] shadow-[0_0_12px_rgba(255,215,0,0.4)]" />
        </div>

        {/* 3D stage for massive premium player */}
        <div ref={stageRef} className="mx-auto mt-10 max-w-[860px]" style={{ perspective: "1400px" } as React.CSSProperties}>
          {/* floating 3D broadcast rings behind player */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transformStyle: "preserve-3d", transform: `translateZ(-60px) rotateX(${tilt.rx * 0.3}deg) rotateY(${tilt.ry * 0.3}deg)` } as React.CSSProperties}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[760px] w-[760px] rounded-full border border-[#FFD700]/10" style={{ transform: "translateZ(-30px)" } as React.CSSProperties} />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[620px] w-[620px] rounded-full border border-[#8a2be2]/12" style={{ transform: "translateZ(-18px)" } as React.CSSProperties} />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[420px] w-[420px] rounded-full bg-[#FFD700]/6 blur-3xl" style={{ transform: "translateZ(10px)" } as React.CSSProperties} />
          </div>

          {/* Premium glassmorphism radio player — large 3D */}
          <div
            className="relative rounded-[32px] glass-purple overflow-hidden border-glow"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.rx === 0 && tilt.ry === 0 ? "transform 0.6s ease" : "transform 0.08s linear",
            } as React.CSSProperties}
          >
          {/* top highlight */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="p-5 sm:p-7 lg:p-8">
            {/* Station header */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#FFD700]/20 blur-xl" />
                <Image
                  src="/images/Kuyakhanya FM Icon.png"
                  alt="KUYAKHANYA FM"
                  width={64}
                  height={64}
                  className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl object-cover border border-white/15 shadow-lg shadow-black/20"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="font-heading text-base sm:text-lg font-black tracking-tight text-white leading-none">KUYAKHANYA FM Live Stream</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="hidden sm:inline">cast3.asurahosting.com • Premium 88.5 FM</span>
                  <span className="sm:hidden">88.5 FM • Premium</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#FFD700]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700] animate-pulse" /> {isPlaying ? "LIVE NOW" : "READY TO PLAY"}
                  </span>
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-500/30 px-3.5 py-2 text-xs font-black tracking-widest text-red-300">
                <span className={`h-2 w-2 rounded-full bg-red-500 ${isPlaying ? "animate-pulse-live" : "opacity-40"}`} /> LIVE
              </span>
            </div>

            {/* Main player grid — super premium easy features */}
            <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-start">
              {/* Left: play + waveform + now playing */}
              <div className="rounded-[24px] bg-black/25 border border-white/10 p-4 sm:p-5 backdrop-blur">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play live stream"}
                    className="group relative grid h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] place-items-center rounded-full bg-[#FFD700] text-[#1a0b2e] shadow-[0_0_28px_rgba(255,215,0,0.5)] hover:shadow-[0_0_36px_rgba(255,215,0,0.6)] hover:scale-[1.02] active:scale-[0.97] transition-all shrink-0"
                  >
                    {isLoading ? (
                      <span className="h-7 w-7 rounded-full border-[3px] border-[#1a0b2e] border-t-transparent animate-spin" />
                    ) : isPlaying ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="5" width="4" height="14" rx="1.5"/><rect x="13" y="5" width="4" height="14" rx="1.5"/></svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5.14v14l11-7z"/></svg>
                    )}
                    <span className="absolute inset-0 rounded-full ring-4 ring-[#FFD700]/20 group-hover:ring-[#FFD700]/30 transition" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black tracking-[0.18em] text-[#FFD700]">{isPlaying ? "● NOW PLAYING" : "○ TAP PLAY TO START"}</p>
                    <p className="mt-1 font-heading text-sm font-bold text-white truncate" title={nowPlaying}>
                      {nowPlaying}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {currentShow.title} • <span className="text-white/80">{currentShow.presenter}</span>
                    </p>
                    {/* small progress shimmer for live */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full w-1/2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] ${isPlaying ? "wave-slide" : "opacity-40"}`} style={{ width: isPlaying ? "200%" : "42%", animationDuration: "1.4s" }} />
                    </div>
                    <p className="mt-1 text-[10px] tracking-wide text-white/40">Live • 24/7 • Stereo • George</p>
                  </div>
                </div>

                {/* Waveform — small, premium, visible always but animates when playing */}
                <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/10 p-3">
                  <div className="flex items-end justify-center gap-[3px] h-[32px]">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-[4px] rounded-full bg-gradient-to-t from-[#4B0082] via-[#8a2be2] to-[#FFD700] freq-bar"
                        style={{
                          height: `${10 + ((i * 23) % 20)}px`,
                          animationPlayState: isPlaying ? "running" : "paused",
                          opacity: isPlaying ? 1 : 0.32,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: `${0.55 + (i % 4) * 0.12}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-widest text-white/35">
                    <span>WAVEFORM • LIVE</span>
                    <span className={isPlaying ? "text-[#FFD700]" : ""}>{isPlaying ? "STREAMING" : "PAUSED"}</span>
                  </div>
                </div>

                {error && <p className="mt-3 rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-200">{error}</p>}
              </div>

              {/* Right: volume + programme + easy controls */}
              <div className="space-y-4">
                {/* Volume — super easy */}
                <div className="rounded-[20px] bg-white/[0.05] border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-black tracking-[0.16em] text-white/80">VOLUME</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/70">{Math.round(volume * 100)}%</span>
                      <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} className={`grid h-8 w-8 place-items-center rounded-full border text-xs transition ${isMuted ? "bg-red-500/15 border-red-500/30 text-red-200" : "bg-white/10 border-white/15 text-white hover:bg-white/15"}`}>
                        {isMuted ? "🔇" : "🔊"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-white/40 text-sm">—</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 accent-[#FFD700] h-2 cursor-pointer"
                      aria-label="Volume"
                    />
                    <span className="text-white/40 text-sm">＋</span>
                  </div>
                  <p className="mt-2 text-[10px] text-white/35">Tip: Press <span className="text-white/60 font-bold">M</span> to mute • <span className="text-white/60 font-bold">↑/↓</span> volume • <span className="text-white/60 font-bold">Space</span> play/pause</p>
                </div>

                {/* Current programme card — easy to read */}
                <div className="rounded-[20px] bg-gradient-to-br from-[#FFD700]/10 via-white/[0.04] to-transparent border border-[#FFD700]/20 p-4">
                  <p className="text-[11px] font-black tracking-[0.16em] text-[#FFD700]">ON AIR NOW</p>
                  <p className="mt-1 font-heading font-black text-white leading-tight">{currentShow.title}</p>
                  <p className="text-sm text-white/70">with {currentShow.presenter} • {currentShow.day}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className="rounded-full bg-white text-[#1a0b2e] px-3 py-1.5">24/7 Live</span>
                    <span className="rounded-full bg-[#FFD700] text-[#1a0b2e] px-3 py-1.5">88.5 FM</span>
                    <span className="rounded-full bg-white/10 border border-white/15 text-white px-3 py-1.5">Thembalethu</span>
                  </div>
                </div>

                {/* Easy special features row */}
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleShare} className="rounded-xl bg-white text-[#1a0b2e] py-2.5 text-xs font-black hover:bg-white/90 transition">Share</button>
                  <button onClick={handlePopout} className="rounded-xl bg-[#FFD700] text-[#1a0b2e] py-2.5 text-xs font-black hover:bg-[#ffe873] transition">Pop-out</button>
                  <a href="https://wa.me/27639780839" target="_blank" rel="noreferrer" className="grid place-items-center rounded-xl bg-white/10 border border-white/15 text-white text-xs font-bold hover:bg-white/15 transition">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Legacy Asura Webplayer — kept as fallback, styled premium but hidden by default */}
            <div className="mt-6 rounded-2xl bg-black/20 border border-white/10 overflow-hidden">
              <button
                onClick={() => setShowLegacy((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/[0.04] transition"
              >
                <span className="text-xs font-bold tracking-wide text-white/80">
                  Classic Webplayer <span className="text-white/40 font-normal">(AsuraHosting)</span>
                </span>
                <span className="text-xs text-[#FFD700]">{showLegacy ? "Hide ▲" : "Show ▼"}</span>
              </button>
              {showLegacy && (
                <div className="border-t border-white/10 p-3 bg-white/90">
                  <div className="player-wrap rounded-xl overflow-hidden border border-zinc-200">
                    <div className="cc_player" data-username="kuyakhan" data-size="sm" data-style="light">
                      Loading player…
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xs text-zinc-600">Classic player by AsuraHosting. Premium native player above is recommended for best experience.</p>
                </div>
              )}
            </div>

            <style>{`
              .player-wrap .cc_player, .player-wrap iframe { width: 100% !important; height: 64px; display:block; border:0; }
              @media (max-width: 480px){ .player-wrap .cc_player, .player-wrap iframe { height: 56px; } }
            `}</style>

            {/* Direct links — easy fallback */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <a href="https://cast3.asurahosting.com/proxy/kuyakhan/stream" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition">
                <span className="h-2 w-2 rounded-full bg-[#FFD700]" /> Open Direct Stream
              </a>
              <a href="/#shows" className="inline-flex items-center rounded-full bg-[#FFD700] px-5 py-2.5 text-xs font-black text-[#1a0b2e] hover:bg-[#ffe873] transition">
                View Schedule →
              </a>
            </div>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/45">
              Premium playback: one tap anywhere in hero or here starts stream instantly • Remembers volume • Auto-reconnects • Works in background • Super easy
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Load Asura player script once — kept for legacy fallback */}
      <script dangerouslySetInnerHTML={{ __html: `(function(){ if(typeof window==='undefined') return; if(document.querySelector('script[data-kuyakhanya-player]')) return; var s=document.createElement('script'); s.src='https://cast3.asurahosting.com/system/player.js'; s.async=true; s.setAttribute('data-kuyakhanya-player','1'); document.body.appendChild(s); })();` }} />
    </section>
  );
}
