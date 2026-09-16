"use client";

import Image from "next/image";

type BannerAdProps = {
  image?: string;
  title?: string;
  link?: string;
};

/**
 * BannerAd — in-page responsive ad unit.
 * Lives in normal page flow (never overlays content),
 * full-width up to 728px, scales down on small screens.
 * Placement rule: max 7 per page, sections keep 230px+ spacing.
 */
export default function BannerAd({
  image = "/images/inpage_ad_banner.gif",
  title = "Advertise With Us",
  link = "/media-centre#advertise",
}: BannerAdProps) {
  return (
    <div className="mx-auto mt-8 w-full max-w-3xl px-1">
      <p className="mb-1 text-center text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
        Advertisement
      </p>
      <a
        href={link}
        aria-label={title}
        className="block overflow-hidden rounded-2xl border border-[#FFD700]/25 bg-gradient-to-br from-[#4B0082] via-[#2e0b56] to-[#1a0b2e] transition hover:border-[#FFD700]/50"
      >
        <Image
          src={image}
          alt={title}
          width={970}
          height={250}
          sizes="(max-width: 768px) 100vw, 728px"
          className="h-auto max-h-44 w-full object-contain sm:max-h-56"
          loading="lazy"
        />
      </a>
    </div>
  );
}
