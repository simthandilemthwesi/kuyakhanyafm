"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { fetchAllCitiesWeather, type CityWeather } from "@/lib/weather-client";

export default function WeatherUpdates() {
  const [data, setData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const json = await fetchAllCitiesWeather();
        if (!cancelled) {
          setData(json.data);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    const id = setInterval(load, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const loop = data.length ? [...data, ...data] : [];

  return (
    <section className="relative overflow-hidden bg-[#0b0a14] border-y border-white/10 py-8 sm:py-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Link href="/news#weather" className="group inline-flex items-center gap-3 hover:opacity-90 transition">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Weather <span className="text-[#ffd700]">Updates</span>
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-bold text-white/80 group-hover:bg-[#ffd700] group-hover:text-[#1a0b2e] group-hover:border-[#ffd700] transition">View all • {data.length || 8} cities →</span>
        </Link>
        <p className="mt-1 text-xs sm:text-sm text-white/55">Live from OpenWeatherMap • George & 7 major SA cities • updates every 10min • Tap to see full grid on News</p>
      </div>

      <div className="relative mt-6 overflow-hidden">
        {loading ? (
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">Loading weather…</div>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-900 text-sm">Weather temporarily unavailable: {error}</div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
              {loop.map((c, idx) => (
                <div key={`${c.location.name}-${idx}`} className="w-[210px] sm:w-[230px] shrink-0">
                  <WeatherCard
                    city={c.location.name}
                    blurb={c.location.blurb}
                    description={c.current.description}
                    iconUrl={c.current.iconUrl}
                    temp={c.current.temp}
                    humidity={c.current.humidity}
                    windSpeed={c.current.wind_speed}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 80s linear infinite; }
        @media (max-width: 640px) { .animate-marquee { animation-duration: 60s; } }
      `}</style>
    </section>
  );
}
