import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 600; // cache 10 minutes

export type CityMeta = { name: string; province: string; country: string; lat: number; lon: number; blurb: string };

export const CITIES: CityMeta[] = [
  { name: "Johannesburg", province: "Gauteng", country: "ZA", lat: -26.2041, lon: 28.0473, blurb: "Gauteng, inland high-veld" },
  { name: "Cape Town", province: "Western Cape", country: "ZA", lat: -33.9249, lon: 18.4241, blurb: "Western Cape, Atlantic coastal" },
  { name: "Durban", province: "KwaZulu-Natal", country: "ZA", lat: -29.8587, lon: 31.0218, blurb: "KwaZulu-Natal, eastern coast" },
  { name: "Pretoria", province: "Gauteng", country: "ZA", lat: -25.7479, lon: 28.2293, blurb: "Northern Gauteng region" },
  { name: "Gqeberha", province: "Eastern Cape", country: "ZA", lat: -33.9608, lon: 25.6022, blurb: "Eastern Cape coastline" },
  { name: "East London", province: "Eastern Cape", country: "ZA", lat: -33.0153, lon: 27.9116, blurb: "Eastern Cape coastline" },
  { name: "Bloemfontein", province: "Free State", country: "ZA", lat: -29.0852, lon: 26.1596, blurb: "Free State, central plateau" },
  { name: "George", province: "Western Cape", country: "ZA", lat: -33.963, lon: 22.4615, blurb: "Western Cape, southern Garden Route" },
];

const GEORGE = CITIES.find((c) => c.name === "George")!;

function getApiKey(): string | null {
  return (
    process.env.OPENWEATHER_API_KEY ||
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ||
    "1c2f27d04bef0373186c51c2f7a1b79d" ||
    null
  );
}

function shapeCity(data: Record<string, unknown>, meta: CityMeta) {
  const weather = (data.weather as Array<Record<string, string>>)?.[0];
  const main = data.main as Record<string, number>;
  const wind = (data.wind as Record<string, number>) || {};
  const sys = (data.sys as Record<string, number>) || {};
  const clouds = (data.clouds as Record<string, number>) || {};
  return {
    location: {
      name: meta.name,
      province: meta.province,
      blurb: meta.blurb,
      country: (sys.country as unknown as string) || meta.country,
      lat: meta.lat,
      lon: meta.lon,
      coord: data.coord,
    },
    current: {
      temp: Math.round(main.temp),
      feels_like: Math.round(main.feels_like),
      temp_min: Math.round(main.temp_min),
      temp_max: Math.round(main.temp_max),
      humidity: main.humidity,
      pressure: main.pressure,
      description: weather?.description || "",
      main: weather?.main || "",
      icon: weather?.icon || "01d",
      iconUrl: `https://openweathermap.org/img/wn/${weather?.icon}@2x.png`,
      clouds: clouds.all ?? null,
      wind_speed: wind.speed ?? null,
      wind_deg: wind.deg ?? null,
      visibility: (data.visibility as number) ?? null,
      dt: data.dt as number,
      sunrise: sys.sunrise ?? null,
      sunset: sys.sunset ?? null,
      timezone: data.timezone as number,
    },
    raw: data,
  };
}

async function fetchCity(meta: CityMeta, apiKey: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${meta.lat}&lon=${meta.lon}&appid=${apiKey}&units=metric&lang=en`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Failed ${meta.name}`);
  return shapeCity(data, meta);
}

export async function GET(req: Request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Weather API key not configured. Set OPENWEATHER_API_KEY in .env.local" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const cityParam = searchParams.get("city");
  const allParam = searchParams.get("all") || searchParams.get("cities");

  try {
    // Single city requested
    if (cityParam) {
      const meta = CITIES.find((c) => c.name.toLowerCase() === cityParam.toLowerCase());
      if (!meta) return NextResponse.json({ ok: false, error: `City ${cityParam} not supported` }, { status: 404 });
      const result = await fetchCity(meta, apiKey);
      return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" } });
    }

    // All cities requested
    if (allParam === "1" || allParam === "true" || allParam === "all") {
      const results = await Promise.all(CITIES.map((c) => fetchCity(c, apiKey).catch((e) => ({ error: (e as Error).message, location: { name: c.name, province: c.province, country: c.country, lat: c.lat, lon: c.lon }, current: null }))));
      // filter out hard failures but keep partial
      const okData = results.filter((r) => (r as { current: unknown }).current !== null);
      return NextResponse.json(
        { ok: true, count: okData.length, data: okData, cities: CITIES },
        { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" } }
      );
    }

    // Default: single George for backward compat
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${GEORGE.lat}&lon=${GEORGE.lon}&appid=${apiKey}&units=metric&lang=en`;
    const res = await fetch(url, { next: { revalidate: 600 } });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ ok: false, error: data?.message || "OpenWeather error", code: data?.cod }, { status: res.status });
    const shaped = shapeCity(data, GEORGE);
    return NextResponse.json({ ok: true, ...shaped }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" } });
  } catch (e) {
    console.error("[weather] fetch failed", e);
    return NextResponse.json({ ok: false, error: "Failed to fetch weather" }, { status: 500 });
  }
}
