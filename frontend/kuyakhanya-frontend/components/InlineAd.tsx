"use client";

import Image from "next/image";

type InlineAdProps = {
  image?: string;
  title?: string;
  link?: string;
};

/**
 * InlineAd — in-page advert block for article flows
 * (place after the opening paragraph / between article blocks).
 * Links to the "Advertise With Us" section of the media centre.
 */
export default function InlineAd({
  image = "/images/inpage_ad_banner.gif",
  title = "Advertise With Us",
  link = "/media-centre#advertise",
}: InlineAdProps) {
  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
        Advertisement
      </p>
      <a
        href={link}
        aria-label={title}
        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#110a1f] p-3 transition hover:border-[#FFD700]/40"
      >
        <Image
          src={image}
          alt={title}
          width={240}
          height={120}
          className="h-16 w-28 shrink-0 rounded-xl object-cover"
          loading="lazy"
        />
        <span className="text-sm font-extrabold text-white">
          {title} <span className="text-[#FFD700]">→</span>
        </span>
      </a>
    </div>
  );
}
