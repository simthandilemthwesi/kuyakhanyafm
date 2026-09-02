"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  ok: boolean;
  location: { name: string; province: string; country: string; lat: number; lon: number };
  current: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    description: string;
    main: string;
    icon: string;
    iconUrl: string;
    clouds: number | null;
    wind_speed: number | null;
    wind_deg: number | null;
    visibility: number | null;
    dt: number;
    sunrise: number | null;
    sunset: number | null;
    timezone: number;
  };
};

function formatTime(unix: number | null, tzOffsetSec: number) {
  if (!unix) return "—";
  try {
    // OpenWeather sys.sunrise is UTC seconds; add timezone offset to get local
    const d = new Date((unix + tzOffsetSec) * 1000);
    // display as UTC since we already offset
    return d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
  } catch {
    return "—";
  }
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
      try {
        setLoading(true);
        const res = await fetch("/api/weather", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Weather unavailable");
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load weather");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchWeather();
    const id = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-[#110a1f] p-6 text-white shadow-soft">
        <p className="text-sm text-white/60">Loading today&apos;s weather for George, Western Cape…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <p className="text-sm font-bold">Weather temporarily unavailable</p>
        <p className="mt-1 text-xs text-amber-800/70">{error || "Try again in a few minutes."}</p>
        <p className="mt-2 text-[11px] text-amber-800/50">George, Western Cape, ZA • -33.963, 22.4615 • OpenWeather</p>
      </div>
    );
  }

  const c = data.current;
  const loc = data.location;

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad] p-6 sm:p-7 text-white shadow-[0_12px_40px_rgba(26,11,46,0.35)]">
      {/* decorative glows */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ffd700]/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.iconUrl} alt={c.description} width={64} height={64} className="h-16 w-16 shrink-0 drop-shadow" />
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#ffd700] uppercase">Today&apos;s Weather • George</p>
            <p className="mt-0.5 flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold leading-none tracking-tight">{c.temp}°</span>
              <span className="text-sm font-semibold text-white/80 capitalize">{c.description}</span>
            </p>
            <p className="mt-1 text-xs text-white/60">
              Feels like {c.feels_like}° • {c.temp_min}° / {c.temp_max}°
            </p>
            <p className="mt-1 text-[11px] font-medium text-white/50">
              {loc.name}, {loc.province}, {loc.country} • {loc.lat.toFixed(3)}, {loc.lon.toFixed(4)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center sm:min-w-[320px]">
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 px-3 py-3">
            <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Humidity</p>
            <p className="mt-1 font-display text-lg font-extrabold">{c.humidity}%</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 px-3 py-3">
            <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Wind</p>
            <p className="mt-1 font-display text-lg font-extrabold">{c.wind_speed ?? "—"}<span className="text-xs font-bold text-white/60"> m/s</span></p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 px-3 py-3">
            <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Clouds</p>
            <p className="mt-1 font-display text-lg font-extrabold">{c.clouds ?? "—"}<span className="text-xs font-bold text-white/60"> %</span></p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5 sm:col-span-3 col-span-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/60">Sunrise <span className="font-bold text-white">{formatTime(c.sunrise, c.timezone)}</span></span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-[11px] font-semibold text-white/60">Sunset <span className="font-bold text-white">{formatTime(c.sunset, c.timezone)}</span></span>
            <span className="hidden sm:inline text-[10px] text-white/30">SAST (UTC+2) • OpenWeather</span>
          </div>
        </div>
      </div>

      <p className="relative mt-4 text-[11px] leading-relaxed text-white/55">
        Live weather for <span className="font-bold text-white/80">George, Western Cape, South Africa (ZA)</span> — updates every 10 minutes. Coordinates locked to
        Thembalethu / George. Powered by OpenWeather.
      </p>
    </div>
  );
}
