"use client";

type WeatherCardProps = {
  city: string;
  province?: string;
  blurb?: string;
  description: string;
  iconUrl: string;
  temp: number;
  humidity: number;
  windSpeed: number | null;
  className?: string;
};

export default function WeatherCard({ city, blurb, description, iconUrl, temp, humidity, windSpeed, className }: WeatherCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4b0082] p-3.5 text-white shadow-[0_6px_20px_rgba(0,0,0,0.22)] ${className || ""}`}>
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#ffd700]/12 blur-2xl" />
      <div className="relative flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconUrl} alt={description} width={44} height={44} className="h-11 w-11 shrink-0 drop-shadow" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[15px] font-extrabold leading-none tracking-tight text-white">{city}</h3>
          {blurb && <p className="mt-0.5 text-[9px] font-bold tracking-widest text-[#ffd700]/90 uppercase leading-none line-clamp-1">{blurb}</p>}
          <p className="mt-1 text-[11px] font-semibold capitalize text-white/80 line-clamp-1 leading-none">{description}</p>
        </div>
        <div className="ml-auto text-right shrink-0">
          <p className="font-display text-2xl font-extrabold leading-none">{temp}°</p>
          <p className="text-[9px] font-bold tracking-widest text-white/50 uppercase">°C</p>
        </div>
      </div>
      <div className="relative mt-3 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg bg-white/10 border border-white/10 py-2">
          <p className="text-[8px] font-bold tracking-widest text-white/60 uppercase">Wind</p>
          <p className="mt-0.5 font-display text-xs font-extrabold">{windSpeed ?? "—"} <span className="text-[9px] font-bold text-white/60">m/s</span></p>
        </div>
        <div className="rounded-lg bg-white/10 border border-white/10 py-2">
          <p className="text-[8px] font-bold tracking-widest text-white/60 uppercase">Humidity</p>
          <p className="mt-0.5 font-display text-xs font-extrabold">{humidity}%</p>
        </div>
      </div>
    </div>
  );
}
