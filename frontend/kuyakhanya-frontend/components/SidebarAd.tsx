"use client";

import { useState } from "react";
import Image from "next/image";

type SidebarAdProps = {
  image: string;
  title: string;
  link: string;
};

/**
 * SidebarAd — desktop-only LEFT side-rail advert.
 * Fixed to the left edge so it sticks while the page scrolls,
 * never overlaps content flow, hidden below lg screens.
 */
export default function SidebarAd({ image, title, link }: SidebarAdProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <aside
      aria-label={`${title} advertisement`}
      className="fixed left-3 top-1/2 z-30 hidden w-[150px] -translate-y-1/2 lg:block"
    >
      <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-white/10 bg-[#110a1f]/90 p-2 shadow-2xl backdrop-blur">
        <p className="mb-1 text-center text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
          Ad
        </p>
        <a href={link} target="_blank" rel="noopener noreferrer sponsored" aria-label={title} className="block overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={300}
            height={600}
            sizes="150px"
            className="h-auto w-full object-contain transition-transform duration-300 hover:scale-[1.03]"
            loading="lazy"
          />
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss advert"
          className="mx-auto mt-1 grid h-7 w-7 place-items-center rounded-full text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
