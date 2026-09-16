"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type PopupAdProps = {
  image: string;
  title: string;
  link: string;
  sessionKey?: string;
  intervalMs?: number;
};

/**
 * PopupAd — modal pop-up advert.
 * - Close (×) dismisses; minimise shrinks to bottom-right corner.
 * - Esc key closes.
 * - localStorage tracks last-shown timestamp so the ad
 *   re-appears every `intervalMs` ms (default 5 min) on mobile
 *   and once per session on desktop.
 */
export default function PopupAd({
  image,
  title,
  link,
  sessionKey = "octotel-pop-up-shown",
  intervalMs = 5 * 60 * 1000,
}: PopupAdProps) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  function lastShown(): number | null {
    try {
      const v = localStorage.getItem(sessionKey);
      return v ? Number(v) : null;
    } catch {
      return null;
    }
  }

  function shouldShow(): boolean {
    const last = lastShown();
    if (last === null) return true;
    return Date.now() - last >= (isMobile ? intervalMs : Infinity);
  }

  function markShown() {
    try { localStorage.setItem(sessionKey, Date.now().toString()); } catch {}
  }

  function dismiss() {
    setOpen(false);
    markShown();
  }

  function minimise() {
    setMinimized(true);
    markShown();
  }

  function openModal() {
    setMinimized(false);
    setOpen(true);
  }

  useEffect(() => {
    if (shouldShow()) setOpen(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (minimized) { setMinimized(false); setOpen(true); }
        else dismiss();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [minimized]);

  if (!open && !minimized) return null;

  // Minimized pill
  if (minimized) {
    return (
      <div className="fixed bottom-3 right-3 z-50 flex items-center gap-2 rounded-lg bg-[#1a0b2e]/90 backdrop-blur p-2 shadow-lg animate-fade-in cursor-pointer" onClick={openModal} aria-label="Show advert">
        <Image src={image} alt={title} width={28} height={28} className="rounded-lg object-cover" />
        <span className="text-xs text-white/80">{title}</span>
      </div>
    );
  }

  // Full modal
  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-label={title}>
      <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <button onClick={dismiss} className="absolute top-2 right-2 text-zinc-500 hover:text-[#FFD700] transition" aria-label="Close">✕</button>
        <div className="mt-4 flex flex-col items-center">
          <Image src={image} alt={title} width={120} height={120} className="rounded-2xl object-cover mb-4" />
          <h3 className="text-xl font-bold text-[#1a0b2e]">{title}</h3>
          <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[#6a0dad] underline underline-offset-2 hover:text-[#FFD700] transition">Visit Octotel</a>
        </div>
        <button onClick={minimise} className="absolute bottom-2 right-2 text-zinc-500 hover:text-[#FFD700] transition" aria-label="Minimise">––</button>
      </div>
    </div>
  );
}