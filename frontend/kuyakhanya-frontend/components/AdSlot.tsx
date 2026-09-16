"use client";

import Image from "next/image";

type AdSlotProps = {
  image: string;
  title: string;
  link: string;
  placement: "sidebar" | "inline";
  startDate?: number;
  endDate?: number;
};

/**
 * AdSlot — reusable ad renderer.
 * Renders a sidebar strip or an inline ad block.
 * Scheduling: hidden when current time is outside [startDate, endDate].
 */
export default function AdSlot({
  image,
  title,
  link,
  placement,
  startDate,
  endDate,
}: AdSlotProps) {
  const now = Date.now();
  const within = (!startDate || now >= startDate) && (!endDate || now <= endDate);
  if (!within) return null;

  if (placement === "sidebar") {
    return (
      <div className="fixed left-0 top-1/2 -translate-y-1/2 w-20 h-full bg-white/50 backdrop-blur rounded-r-lg shadow-2xl flex flex-col items-center pt-2 transition-transform duration-300 hover:w-32" aria-label="Octotel sidebar advert">
        <Image src={image} alt={title} width={48} height={48} className="mb-2 rounded-xl object-cover hover:scale-110 transition-transform" />
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#1a0b2e] hover:text-[#6a0dad] transition-colors">{title}</a>
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <Image src={image} alt={title} width={48} height={48} className="mr-3 rounded-xl object-cover" />
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#6a0dad] hover:text-[#FFD700] transition-colors">{title}</a>
        <p className="text-xs text-zinc-500">Sponsored by Octotel</p>
      </div>
    </div>
  );
}