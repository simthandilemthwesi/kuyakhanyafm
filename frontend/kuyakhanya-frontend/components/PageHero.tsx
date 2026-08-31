import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad]">
      <div aria-hidden className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
      <div aria-hidden className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-[#8a2be2]/30 blur-3xl animate-float-slow" />
      <div aria-hidden className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-[#ffd700]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 sm:py-28 text-center text-white">
        <p className="text-xs font-bold tracking-[0.3em] text-[#ffd700] uppercase">{eyebrow}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-white/80">{subtitle}</p>
        )}
        <div className="mx-rule mt-6 rule" />
      </div>
    </section>
  );
}
