"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WeatherCard from "./WeatherCard";
import { fetchAllCitiesWeather, type CityWeather } from "@/lib/weather-client";

export default function WeatherGrid() {
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
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed");
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

  if (loading) {
    return <div className="rounded-xl bg-white/5 border border-white/10 p-5 text-center text-sm text-zinc-600">Loading weather…</div>;
  }

  if (error) {
    return <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">Weather unavailable: {error}</div>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((c, idx) => (
        <motion.div
          key={c.location.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: idx * 0.06, ease: "easeOut" }}
          whileHover={{ y: -4 }}
        >
          <WeatherCard
            city={c.location.name}
            blurb={c.location.blurb}
            description={c.current.description}
            iconUrl={c.current.iconUrl}
            temp={c.current.temp}
            humidity={c.current.humidity}
            windSpeed={c.current.wind_speed}
          />
        </motion.div>
      ))}
    </div>
  );
}
