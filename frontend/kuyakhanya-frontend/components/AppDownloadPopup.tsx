"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { detectPlatform } from "@/lib/app-download";

export const SHOW_APP_POPUP = true;

const IOS_COMING_SOON = "Our iOS app is coming soon — launch day is 20 October 2026.";
const DISMISS_KEY = "kuyakhanya-app-popup-dismissed";

export default function AppDownloadPopup() {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<{ kind: "ios" | "android" | "other"; device: string }>({ kind: "other", device: "Desktop" });

  useEffect(() => {
    if (!SHOW_APP_POPUP) return;
    try { if (localStorage.getItem(DISMISS_KEY) === "1") return; } catch {}
    setPlatform(detectPlatform());
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  if (!SHOW_APP_POPUP || !visible) return null;

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch {}
    setVisible(false);
  }

  const isIos = platform.kind === "ios";

  return (
    <div className="fixed right-3 bottom-3 z-[90] sm:right-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2" role="dialog" aria-label="Get the KUYAKHANYA FM app">
      <div className="flex items-center gap-4 rounded-2xl border border-[#ffd700]/40 bg-[#1a0b2e]/95 p-4 shadow-[0_12px_40px_rgba(26,11,46,0.5)] backdrop-blur animate-slide-in-right sm:max-w-[360px] sm:flex-col sm:items-start sm:rounded-[20px]">
        <img src="/images/Kuyakhanya FM Icon.png" alt="KUYAKHANYA FM app icon" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl sm:h-14 sm:w-14" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-white">Download our app</p>
          <p className="text-xs text-white/60">{isIos ? IOS_COMING_SOON : "Our mobile apps are coming soon"}</p>
          {isIos ? (
            <span className="mt-2 inline-block rounded-full border border-white/25 px-4 py-1.5 text-xs font-extrabold text-white/50">App Store: coming 20 Oct 2026</span>
          ) : (
            <Link href="/download" className="mt-2 inline-block rounded-full bg-[#ffd700] px-4 py-1.5 text-xs font-extrabold text-[#1a0b2e] hover:opacity-90 transition">
              View Mobile Apps →
            </Link>
          )}
        </div>
        <button onClick={dismiss} aria-label="Dismiss" className="shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white sm:absolute sm:right-3 sm:top-3">✕</button>
      </div>
    </div>
  );
}