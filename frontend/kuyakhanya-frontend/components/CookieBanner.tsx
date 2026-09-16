"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const KEY = "kuyakhanya-cookie-consent";

type Consent = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

function load(): Consent | "all" | null {
  try {
    const v = localStorage.getItem(KEY);
    return v ? (JSON.parse(v) as Consent | "all") : null;
  } catch {
    return null;
  }
}

/**
 * CookieBanner — short, accessible consent banner.
 * - Essential cookies always on (site keeps working).
 * - Toggles default OFF (no pre-checked boxes), reject is one tap,
 *   never blocks the site when dismissed without choosing.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choices, setChoices] = useState<Consent>({ analytics: false, marketing: false, preferences: false });

  useEffect(() => {
    if (load() === null) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  function save(value: Consent | "all") {
    try { localStorage.setItem(KEY, JSON.stringify(value)); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  const toggle = (k: keyof Consent) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setChoices((c) => ({ ...c, [k]: e.target.checked }));

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-3 right-3 z-[80] p-3 sm:left-6 sm:right-auto sm:w-[26rem] sm:max-w-[calc(100vw-3rem)] sm:p-0"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-h-[70dvh] w-full overflow-y-auto rounded-2xl border border-[#FFD700]/30 bg-[#1a0b2e]/97 p-5 shadow-2xl backdrop-blur animate-slide-in-bottom">
        <p className="text-sm font-extrabold text-white">We value your privacy 🍪</p>
        <p className="mt-1 text-xs leading-relaxed text-white/65">
          This website uses cookies to ensure you get the best experience on our website.
        </p>
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-white/60">
          <li><strong className="text-white/85">Essential</strong> — keep the site working (always on)</li>
          <li><strong className="text-white/85">Analytics</strong> — help us understand how people use our site</li>
          <li><strong className="text-white/85">Marketing</strong> — show you relevant ads</li>
          <li><strong className="text-white/85">Preferences</strong> — remember your settings</li>
        </ul>

        {customizing && (
          <fieldset className="mt-3 rounded-xl border border-white/10 p-3">
            <legend className="px-1 text-[11px] font-bold tracking-widest text-[#FFD700] uppercase">Customize</legend>
            {(
              [
                ["analytics", "Analytics cookies"],
                ["marketing", "Marketing cookies"],
                ["preferences", "Preference cookies"],
              ] as [keyof Consent, string][]
            ).map(([k, label]) => (
              <label key={k} className="flex cursor-pointer items-center justify-between gap-3 py-1.5 text-xs font-semibold text-white/80">
                {label}
                <input
                  type="checkbox"
                  checked={choices[k]}
                  onChange={toggle(k)}
                  className="h-4 w-4 shrink-0 accent-[#FFD700]"
                />
              </label>
            ))}
            <p className="mt-1 text-[11px] text-white/45">Essential cookies stay on — the site needs them to work.</p>
          </fieldset>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => save("all")}
            className="rounded-full bg-[#FFD700] px-4 py-2 text-xs font-black text-[#1a0b2e] transition hover:bg-[#ffe873]"
          >
            Accept All
          </button>
          <button
            onClick={() => save({ analytics: false, marketing: false, preferences: false })}
            className="rounded-full border border-white/25 px-4 py-2 text-xs font-black text-white/85 transition hover:bg-white/10"
          >
            Reject Non-Essential
          </button>
          {customizing ? (
            <button
              onClick={() => save(choices)}
              className="rounded-full border border-[#FFD700]/50 px-4 py-2 text-xs font-black text-[#FFD700] transition hover:bg-[#FFD700]/10"
            >
              Save My Choices
            </button>
          ) : (
            <button
              onClick={() => setCustomizing(true)}
              className="rounded-full border border-[#FFD700]/50 px-4 py-2 text-xs font-black text-[#FFD700] transition hover:bg-[#FFD700]/10"
            >
              Customize
            </button>
          )}
        </div>
        <p className="mt-3 text-[11px] text-white/45">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-[#FFD700]">Privacy Policy</Link>
          {" • "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#FFD700]">Google&apos;s Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
