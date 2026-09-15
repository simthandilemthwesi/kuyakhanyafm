/* Coming Soon / Version 2 Launch Page
 * Countdown to October 20, 2026
 * Displays player, weather, time
 * Redirects to home page after the launch date
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AudioProvider } from "@/components/AudioProvider";
import { fetchAllCitiesWeather, type CityWeather } from "@/lib/weather-client";

const LAUNCH_DATE = new Date("2026-10-20T00:00:00Z");

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61580413033664" },
  { name: "Instagram", href: "https://www.instagram.com/kuyakhanyafm/" },
  { name: "YouTube", href: "https://www.youtube.com/@KuyakhanyaFM" },
  { name: "TikTok", href: "https://www.tiktok.com/@kuyakhanyafm/" },
  { name: "Twitter", href: "https://x.com/KuyakhanyaFM" },
];

function formatTimeRemaining(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) {
    return "Launching now!";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function ComingSoon() {
  const router = useRouter();
  const [cityWeather, setCityWeather] = useState<CityWeather[] | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Initialize weather on component mount
  useEffect(() => {
    fetchAllCitiesWeather().then((r) => setCityWeather(r.data)).catch(console.error);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // After launch date, go straight to home page
  useEffect(() => {
    if (new Date() >= LAUNCH_DATE) {
      const t = setTimeout(() => router.push("/"), 500);
      return () => clearTimeout(t);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0a14] via-[#1a0b2e] to-[#4b0082] flex flex-col items-center justify-center p-4 text-white">

      {/* Countdown Timer */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">KUYAKHANYA FM</h1>
        <h2 className="text-2xl font-medium text-[#ffd700]">We Shine Brighter Together</h2>
        <div className="text-lg text-white/60 mt-2">
          <span className="font-display text-5xl font-extrabold tracking-tight">{formatTimeRemaining(LAUNCH_DATE)}</span>
          <div className="mt-2 text-sm text-white/50">to version 2 launch</div>
        </div>
      </div>

      {/* Launch Date Details */}
      <div className="text-center text-white/60 mb-16">
        <p>This website is under construction.</p>
        <p>Getting ready to bring you a better listening experience</p>
        <p>New features, new presenters, same faith</p>
      </div>

      {/* Player Section */}
      <div className="w-full max-w-2xl mb-8">
        <AudioProvider>
          <div className="relative rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad] p-6 sm:p-7 text-white shadow-[0_12px_40px_rgba(26,11,46,0.35)]">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ffd700]/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Kuyakhanya FM Icon.png" alt="KUYAKHANYA FM" width={64} height={64} className="h-16 w-16 shrink-0 drop-shadow" />
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#ffd700] uppercase">Live Now</p>
                  <p className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold leading-none tracking-tight">—</span>
                    <span className="text-sm font-semibold text-white/80">Streaming Live</span>
                  </p>
                  <p className="mt-1 text-xs text-white/60">KUYAKHANYA FM — Online Christian radio</p>
                </div>
              </div>
            </div>

            <p className="relative mt-4 text-[11px] leading-relaxed text-white/55">
              Live weather for George, Western Cape, South Africa (ZA) — Updates every 10 minutes. Powered by OpenWeather.
            </p>
          </div>
        </AudioProvider>
      </div>

      {/* City Weather */}
      {cityWeather && cityWeather.length > 0 && (
        <div className="w-full max-w-3xl mb-8">
          <h3 className="text-center text-white/60 mb-4">Current City Weather</h3>
          <div className="grid grid-cols-2 gap-2">
            {cityWeather.map((c, idx) => (
              <div key={`${c.location.name}-${idx}`} className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 px-3 py-2">
                <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">{c.location.name}</p>
                <p className="mt-1 font-display text-lg font-extrabold">{Math.round(c.current.temp)}°</p>
                <p className="text-xs text-white/50 capitalize">{c.current.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Time */}
      <div className="text-center mb-12">
        <div className="text-6xl font-extrabold font-display text-[#ffd700] mb-2">{currentTime.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false })}</div>
        <div className="text-white/60">Current Time</div>
        <div className="text-white/50">SAST (UTC+2)</div>
      </div>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 backdrop-blur border border-white/10 px-5 py-3 text-sm font-bold text-white/60 transition-all hover:bg-[#ffd700] hover:text-[#1a0b2e] hover:border-[#ffd700]"
          >
            {link.name}
          </a>
        ))}
      </div>

    </div>
  );
}
