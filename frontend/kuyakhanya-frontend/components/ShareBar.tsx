"use client";

import { useState } from "react";
import { shareTarget, SITE_URL } from "@/lib/share";
import {
  FacebookIcon,
  XIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TikTokIcon,
} from "@/components/SocialIcons";

/**
 * ShareBar — profile sharing with Web Share API + fallbacks.
 * Order: Facebook → X → LinkedIn → WhatsApp → TikTok → Copy Link.
 * navigator.share() carries name + bio + URL where supported,
 * otherwise everything falls back to share links / clipboard copy.
 */
export default function ShareBar({
  title,
  text,
  path,
}: {
  title: string;
  text: string;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

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

  async function nativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator & { share: (d: object) => Promise<void> }).share({
          title,
          text,
          url,
        });
        setShared(true);
        window.setTimeout(() => setShared(false), 1600);
        return;
      } catch {
        return; // user dismissed — stay quiet
      }
    }
    copyLink();
  }

  const share = (network: "facebook" | "x" | "linkedin" | "whatsapp") =>
    shareTarget(network, { url, title, description: text }).url;

  const btn =
    "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#F8F8FF]/85 transition hover:bg-[#FFD700] hover:text-[#1a0b2e]";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={nativeShare}
        className="mr-1 inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-5 py-2.5 text-xs font-black tracking-wide text-[#1a0b2e] transition hover:bg-[#ffe873]"
      >
        {shared ? "Shared ✓" : "Share profile →"}
      </button>
      <a href={share("facebook")} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" title="Facebook" className={btn}>
        <FacebookIcon size={17} className="h-[17px] w-[17px]" />
      </a>
      <a href={share("x")} target="_blank" rel="noopener noreferrer" aria-label="Share on X" title="X" className={btn}>
        <XIcon size={17} className="h-[17px] w-[17px]" />
      </a>
      <a href={share("linkedin")} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" title="LinkedIn" className={btn}>
        <LinkedInIcon size={17} className="h-[17px] w-[17px]" />
      </a>
      <a href={share("whatsapp")} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" title="WhatsApp" className={btn}>
        <WhatsAppIcon size={17} className="h-[17px] w-[17px]" />
      </a>
      <a href="https://www.tiktok.com/@kuyakhanyafm" target="_blank" rel="noopener noreferrer" aria-label="KUYAKHANYA FM on TikTok" title="TikTok" className={btn}>
        <TikTokIcon size={17} className="h-[17px] w-[17px]" />
      </a>
      <button
        onClick={copyLink}
        aria-label={copied ? "Profile link copied" : "Copy profile link"}
        title={copied ? "Copied!" : "Copy Link"}
        aria-live="polite"
        className={`${btn} ${copied ? "!bg-[#FFD700] !text-[#1a0b2e]" : ""}`}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" width="17" height="17" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="17" height="17" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>
    </div>
  );
}
