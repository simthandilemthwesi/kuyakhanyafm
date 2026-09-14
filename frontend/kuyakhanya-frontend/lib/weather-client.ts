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
  return process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "1c2f27d04bef0373186c51c2f7a1b79d" || null;
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
  };
}

async function fetchCityRaw(meta: CityMeta, apiKey: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${meta.lat}&lon=${meta.lon}&appid=${apiKey}&units=metric&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Failed ${meta.name}`);
  return shapeCity(data, meta);
}

export type WeatherData = { ok: boolean; location: { name: string; province: string; country: string; lat: number; lon: number }; current: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number; pressure: number; description: string; main: string; icon: string; iconUrl: string; clouds: number | null; wind_speed: number | null; wind_deg: number | null; visibility: number | null; dt: number; sunrise: number | null; sunset: number | null; timezone: number } };

export type CityWeather = { location: { name: string; province: string; blurb: string; country: string; lat: number; lon: number }; current: { description: string; iconUrl: string; temp: number; humidity: number; wind_speed: number | null } };

export async function fetchGeorgeWeather(): Promise<WeatherData> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Weather API key not configured");
  const result = await fetchCityRaw(GEORGE, apiKey);
  return { ok: true, ...result } as WeatherData;
}

export async function fetchAllCitiesWeather(): Promise<{ ok: boolean; count: number; data: CityWeather[] }> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Weather API key not configured");
  const results = await Promise.all(
    CITIES.map((c) =>
      fetchCityRaw(c, apiKey).catch((e) => ({
        error: (e as Error).message,
        location: { name: c.name, province: c.province, country: c.country, lat: c.lat, lon: c.lon, blurb: c.blurb },
        current: null,
      }))
    )
  );
  const okData = results.filter((r) => (r as { current: unknown }).current !== null);
  return { ok: true, count: okData.length, data: okData as CityWeather[] };
}
