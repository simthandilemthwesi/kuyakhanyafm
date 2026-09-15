"use client";

/* ─────────────────────────────────────────────────────────────
 * AppDownloadPopup — "Download our app" banner
 *
 * TO REMOVE COMPLETELY:
 *   1. Set SHOW_APP_POPUP = false below, OR
 *   2. Delete this file + remove `<AppDownloadPopup />` from app/layout.tsx
 * ───────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";

// ★ Master switch — set to false to disable the popup everywhere
export const SHOW_APP_POPUP = true;

// ★ Store links — update when the apps go live
const IOS_APP_URL = "https://apps.apple.com/app/kuyakhanya-fm/id0000000000"; // TODO: real App Store URL
const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.kuyakhanya.KuyakhanyaFM"; // TODO: real Play URL

const DISMISS_KEY = "kuyakhanya-app-popup-dismissed";

function detectPlatform(): "ios" | "android" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

export default function AppDownloadPopup() {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    if (!SHOW_APP_POPUP) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* storage unavailable — still show */
    }
    setPlatform(detectPlatform());
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!SHOW_APP_POPUP || !visible) return null;

  const storeUrl = platform === "ios" ? IOS_APP_URL : ANDROID_APP_URL;
  const storeLabel = platform === "ios" ? "Download on the App Store" : platform === "android" ? "Get it on Google Play" : "Download our app";

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6" role="dialog" aria-label="Download our app">
      <div className="mx-auto flex max-w-xl items-center gap-4 rounded-2xl border border-[#ffd700]/40 bg-[#1a0b2e]/95 p-4 shadow-[0_12px_40px_rgba(26,11,46,0.5)] backdrop-blur">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Kuyakhanya FM Icon.png" alt="KUYAKHANYA FM app icon" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-white">Download our app</p>
          <p className="truncate text-xs text-white/60">Listen live anywhere — KUYAKHANYA FM on your phone.</p>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-[#ffd700] px-4 py-1.5 text-xs font-extrabold text-[#1a0b2e] transition hover:opacity-90"
          >
            {storeLabel}
          </a>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss download popup"
          className="shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
