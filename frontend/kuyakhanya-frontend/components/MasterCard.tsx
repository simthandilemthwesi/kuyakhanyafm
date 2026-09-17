"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { shareTarget, SITE_URL } from "@/lib/share";
import {
  FacebookIcon,
  XIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TikTokIcon,
} from "@/components/SocialIcons";
import type { Person } from "@/lib/people";
import { useOpenProfile } from "./ProfileModalProvider";

/**
 * MasterCard — the KUYAKHANYA FM profile card system (283.5 × 420.75).
 * Portrait-first: ~61% photo area, white bold centered name,
 * gold centered bio, FB → X → LinkedIn → WhatsApp → TikTok → Copy Link.
 * Fixed aspect ratio keeps every card identical at all breakpoints.
 * Tapping opens the profile in-page (modal); the href stays as the
 * canonical URL for SEO, crawlers and no-JS.
 * `layout="list"` renders a compact horizontal row for list views.
 */
export default function MasterCard({
  person,
  profilePath,
  layout = "grid",
}: {
  person: Person;
  profilePath: string;
  layout?: "grid" | "list";
}) {
  const url = `${SITE_URL}${profilePath}`;
  const [copied, setCopied] = useState(false);
  const open = useOpenProfile(person, profilePath);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const share = (network: "facebook" | "x" | "linkedin" | "whatsapp") =>
    shareTarget(network, {
      url,
      title: `${person.name} — ${person.role} | KUYAKHANYA FM`,
      description: person.bio,
    }).url;

  const gridBtn =
    "grid h-5 w-5 place-items-center rounded-full border border-white/25 bg-white/20 text-[#F8F8FF] transition hover:bg-[#FFD700] hover:text-[#1a0b2e] sm:h-7 sm:w-7";
  const gridIcon = "h-3 w-3 sm:h-3.5 sm:w-3.5";
  const listBtn =
    "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/25 bg-white/20 text-[#F8F8FF] transition hover:bg-[#FFD700] hover:text-[#1a0b2e] sm:h-8 sm:w-8";

  const icons = (
    <>
      <a href={share("facebook")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on Facebook`} title="Facebook" className={gridBtn}>
        <FacebookIcon size={14} className={gridIcon} />
      </a>
      <a href={share("x")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on X`} title="X" className={gridBtn}>
        <XIcon size={14} className={gridIcon} />
      </a>
      <a href={share("linkedin")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on LinkedIn`} title="LinkedIn" className={gridBtn}>
        <LinkedInIcon size={14} className={gridIcon} />
      </a>
      <a href={share("whatsapp")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on WhatsApp`} title="WhatsApp" className={gridBtn}>
        <WhatsAppIcon size={14} className={gridIcon} />
      </a>
      <a href="https://www.tiktok.com/@kuyakhanyafm" target="_blank" rel="noopener noreferrer" aria-label="KUYAKHANYA FM on TikTok" title="TikTok" className={gridBtn}>
        <TikTokIcon size={14} className={gridIcon} />
      </a>
    </>
  );

  const copyButton = (cls: string, iconCls: string) => (
    <button
      onClick={copyLink}
      aria-label={copied ? "Profile link copied" : "Copy profile link"}
      title={copied ? "Link copied!" : "Copy Link"}
      aria-live="polite"
      className={`${cls} ${copied ? "!bg-[#FFD700] !text-[#1a0b2e]" : ""}`}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" width="14" height="14" className={iconCls} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="14" height="14" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      )}
    </button>
  );

  if (layout === "list") {
    return (
      <article className="group flex items-center gap-3 rounded-2xl border-2 border-[#FFD700] bg-gradient-to-r from-[#1a0b2e]/80 to-black/60 p-3 shadow-[0_18px_50px_-16px_rgba(75,0,130,0.65)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#FFD700,0_24px_60px_-16px_rgba(255,215,0,0.35)] sm:gap-4 sm:p-4">
        <Link href={profilePath} onClick={open} aria-label={`${person.name} — view full profile`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#FFD700]/50 sm:h-20 sm:w-20">
          <Image
            src={person.photo}
            alt={`${person.name}, ${person.role} on KUYAKHANYA FM`}
            fill
            sizes="80px"
            className="object-cover object-top"
            loading="lazy"
          />
        </Link>
        <Link href={profilePath} onClick={open} className="min-w-0 flex-1 text-center">
          <h3 title={person.name} className="text-sm font-black uppercase leading-tight tracking-wide text-[#F8F8FF] line-clamp-1 sm:text-base">
            {person.name}
          </h3>
          <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#F8F8FF]/60 line-clamp-1">
            {person.role}
          </p>
          <p className="mt-1 text-xs font-semibold leading-snug text-[#FFD700] line-clamp-1 sm:text-[13px]">
            &ldquo;{person.bio}&rdquo;
          </p>
        </Link>
        <div className="flex shrink-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
          <a href={share("facebook")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on Facebook`} title="Facebook" className={listBtn}>
            <FacebookIcon size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <a href={share("x")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on X`} title="X" className={listBtn}>
            <XIcon size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <a href={share("linkedin")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on LinkedIn`} title="LinkedIn" className={listBtn}>
            <LinkedInIcon size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <a href={share("whatsapp")} target="_blank" rel="noopener noreferrer" aria-label={`Share ${person.name} on WhatsApp`} title="WhatsApp" className={listBtn}>
            <WhatsAppIcon size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <a href="https://www.tiktok.com/@kuyakhanyafm" target="_blank" rel="noopener noreferrer" aria-label="KUYAKHANYA FM on TikTok" title="TikTok" className={listBtn}>
            <TikTokIcon size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          {copyButton(listBtn, "h-3.5 w-3.5 sm:h-4 sm:w-4")}
        </div>
      </article>
    );
  }

  return (
    <article
      className="group mx-auto flex h-full w-full max-w-[283.5px] flex-col overflow-hidden rounded-[24px] border-2 border-[#FFD700] bg-gradient-to-b from-[#1a0b2e]/80 via-[#241243]/70 to-black/60 text-center shadow-[0_18px_50px_-16px_rgba(75,0,130,0.65)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_#FFD700,0_24px_60px_-16px_rgba(255,215,0,0.35)]"
      style={{ aspectRatio: "283.5 / 420.75" }}
    >
      <Link
        href={profilePath}
        onClick={open}
        aria-label={`${person.name} — view full profile`}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="relative mx-2 mt-2 h-[61%] shrink-0 overflow-hidden rounded-[18px] border border-[#FFD700]/50">
          <Image
            src={person.photo}
            alt={`${person.name}, ${person.role} on KUYAKHANYA FM`}
            fill
            sizes="(max-width: 640px) 45vw, 283px"
            className="object-cover object-top"
          />
        </div>
        <h3
          title={person.name}
          className="mt-2 px-2 text-center text-[15px] font-black uppercase leading-tight tracking-wide text-[#F8F8FF] line-clamp-1 sm:text-lg"
        >
          {person.name}
        </h3>
        <p className="mt-1 h-[54px] overflow-hidden px-2 text-center text-[11px] font-semibold leading-snug text-[#FFD700] line-clamp-3 sm:text-[13px]">
          &ldquo;{person.bio}&rdquo;
        </p>
      </Link>
      <div className="flex items-center justify-center gap-1 pb-3 pt-1 sm:gap-1.5">
        {icons}
        {copyButton(gridBtn, gridIcon)}
      </div>
    </article>
  );
}
