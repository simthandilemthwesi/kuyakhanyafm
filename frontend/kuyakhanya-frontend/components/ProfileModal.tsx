"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareBar from "./ShareBar";
import type { Person } from "@/lib/people";

/**
 * ProfileModal — quick-view profile on the same page.
 * Opens from any MasterCard, closes via ✕ / backdrop / Escape,
 * then another profile can be opened right away.
 */
export default function ProfileModal({
  person,
  profilePath,
  onClose,
}: {
  person: Person;
  profilePath: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm animate-fade-in sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${person.name} — profile preview`}
      onClick={onClose}
    >
      <div
        className="relative my-auto max-h-[90dvh] w-[min(92vw,24rem)] overflow-y-auto rounded-[24px] border-2 border-[#FFD700] bg-gradient-to-b from-[#1a0b2e]/95 via-[#241243]/95 to-black/95 text-center shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close profile preview"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
        >
          ✕
        </button>
        <div className="relative mx-4 mt-4 aspect-square overflow-hidden rounded-[18px] border border-[#FFD700]/50">
          <Image
            src={person.photo}
            alt={`${person.name}, ${person.role} on KUYAKHANYA FM`}
            fill
            sizes="(max-width: 640px) 85vw, 360px"
            className="object-cover object-top"
          />
        </div>
        <div className="px-5 pb-6 pt-4">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#FFD700] uppercase">
            {person.role}
          </p>
          <h3 className="mt-1 font-display text-xl font-black uppercase tracking-wide text-[#F8F8FF]">
            {person.name}
          </h3>
          <p className="mx-auto mt-2 max-w-[40ch] text-sm leading-relaxed text-[#FFD700]/90">
            &ldquo;{person.bio}&rdquo;
          </p>
          <div className="mt-4">
            <ShareBar
              title={`${person.name} — ${person.role} | KUYAKHANYA FM`}
              text={person.bio}
              path={profilePath}
            />
          </div>
          <Link
            href={profilePath}
            className="mt-4 inline-flex rounded-full bg-[#FFD700] px-6 py-2.5 text-xs font-black tracking-wide text-[#1a0b2e] transition hover:bg-[#ffe873]"
          >
            Open full profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
