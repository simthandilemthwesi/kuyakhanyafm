"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

type VignetteAdProps = {
  image?: string;
  title?: string;
  link?: string;
  sessionKey?: string;
  /** Minimum viewport width (px). Default 1000: desktop only. */
  minWidthPx?: number;
  /** Re-show at most this often. Default 5 minutes. */
  frequencyMs?: number;
};

/**
 * VignetteAd — desktop-only full-screen overlay advert.
 * Appears between page loads: fires on mount, on route change,
 * and when the tab becomes visible again (additional triggers),
 * at most once per `frequencyMs` (default 5 min), only on
 * screens wider than `minWidthPx` (default 1000px).
 * Fully responsive: capped at 92vw / 90dvh with internal scroll.
 */
export default function VignetteAd({
  image = "/images/octotel_pop_up.png",
  title = "Octotel ISP",
  link = "https://octotel.co.za/isp/",
  sessionKey = "octotel-vignette-last",
  minWidthPx = 1000,
  frequencyMs = 5 * 60 * 1000,
}: VignetteAdProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const firstRun = useRef(true);

  function lastShown(): number | null {
    try {
      const v = localStorage.getItem(sessionKey);
      return v ? Number(v) : null;
    } catch {
      return null;
    }
  }

  function due(): boolean {
    if (typeof window === "undefined") return false;
    if (window.innerWidth < minWidthPx) return false;
    const last = lastShown();
    if (last === null) return true;
    return Date.now() - last >= frequencyMs;
  }

  function markShown() {
    try { localStorage.setItem(sessionKey, Date.now().toString()); } catch {}
  }

  function maybeShow(delayMs: number) {
    window.setTimeout(() => {
      if (due()) {
        markShown();
        setOpen(true);
      }
    }, delayMs);
  }

  // Trigger 1: initial page load
  useEffect(() => {
    maybeShow(2000);
  }, []);

  // Trigger 2: route change (between page loads in the SPA)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    maybeShow(1200);
  }, [pathname]);

  // Trigger 3: tab becomes visible again
  useEffect(() => {
    function onVisible() {
      if (document.visibilityState === "visible") maybeShow(800);
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  // Scroll-lock + Esc while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm animate-fade-in lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative my-auto max-h-[90dvh] w-[min(92vw,40rem)] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close advert"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-sm font-bold text-white backdrop-blur transition hover:bg-black/70"
        >
          ✕
        </button>
        <p className="mb-2 text-center text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
          Advertisement
        </p>
        <a href={link} target="_blank" rel="noopener noreferrer sponsored" aria-label={title} className="block">
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            sizes="(max-width: 1280px) 90vw, 640px"
            className="mx-auto h-auto max-h-[62dvh] w-full rounded-2xl object-contain"
          />
        </a>
        <div className="mt-4 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block rounded-full bg-[#6a0dad] px-6 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#4b0082]"
          >
            Visit Octotel
          </a>
          <button
            onClick={() => setOpen(false)}
            className="inline-block rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-bold text-zinc-600 transition hover:border-[#6a0dad] hover:text-[#6a0dad]"
          >
            Continue to site →
          </button>
        </div>
      </div>
    </div>
  );
}
