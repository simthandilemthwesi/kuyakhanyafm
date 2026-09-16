"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type PopupAdProps = {
  image: string;
  title: string;
  link: string;
  sessionKey?: string;
  intervalMs?: number;
  /** Only show below this viewport width (px). Default 1000: phones + tablets. Desktop uses VignetteAd. */
  maxWidthPx?: number;
};

/**
 * PopupAd — small-screen modal advert (phones/tablets).
 * Fits every viewport: capped at 92vw / 88dvh with internal scroll,
 * safe-area padding, Esc/backdrop close, scroll-lock while open.
 * Re-appears every `intervalMs` (default 5 min) via localStorage timestamp.
 */
export default function PopupAd({
  image,
  title,
  link,
  sessionKey = "octotel-pop-up-shown",
  intervalMs = 5 * 60 * 1000,
  maxWidthPx = 1000,
}: PopupAdProps) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  function lastShown(): number | null {
    try {
      const v = localStorage.getItem(sessionKey);
      return v ? Number(v) : null;
    } catch {
      return null;
    }
  }

  function shouldShow(): boolean {
    if (typeof window === "undefined") return false;
    if (window.innerWidth >= maxWidthPx) return false;
    const last = lastShown();
    if (last === null) return true;
    return Date.now() - last >= intervalMs;
  }

  function markShown() {
    try { localStorage.setItem(sessionKey, Date.now().toString()); } catch {}
  }

  function dismiss() {
    setOpen(false);
    setMinimized(false);
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
    const t = setTimeout(() => {
      if (shouldShow()) setOpen(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open && !minimized) return null;

  if (minimized) {
    return (
      <button
        onClick={openModal}
        aria-label="Show advert"
        className="fixed bottom-3 right-3 z-50 flex max-w-[70vw] items-center gap-2 rounded-full border border-[#FFD700]/40 bg-[#1a0b2e]/95 p-2 pr-3 shadow-lg backdrop-blur animate-fade-in"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <Image src={image} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-lg object-cover" />
        <span className="truncate text-xs font-bold text-white/85">{title}</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm animate-fade-in sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={dismiss}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="relative my-auto max-h-[88dvh] w-[min(92vw,26rem)] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={dismiss} className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-[#1a0b2e]" aria-label="Close advert">✕</button>
        <div className="flex flex-col items-center text-center">
          <Image src={image} alt={title} width={480} height={480} sizes="(max-width: 640px) 70vw, 320px" className="mb-4 h-auto max-h-[38dvh] w-full max-w-[280px] rounded-2xl object-contain" />
          <h3 className="text-lg font-black text-[#1a0b2e] sm:text-xl">{title}</h3>
          <a href={link} target="_blank" rel="noopener noreferrer sponsored" className="mt-3 inline-block rounded-full bg-[#6a0dad] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#4b0082]">
            Visit Octotel
          </a>
          <button onClick={minimise} className="mt-3 text-xs font-bold text-zinc-500 underline-offset-2 transition hover:text-[#6a0dad] hover:underline">
            Minimise
          </button>
        </div>
      </div>
    </div>
  );
}
