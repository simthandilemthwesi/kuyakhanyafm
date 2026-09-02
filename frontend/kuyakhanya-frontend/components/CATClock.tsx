"use client";

import { useEffect, useState } from "react";

const START_YEAR = 2025;

function formatCAT(date: Date): string {
  // Africa/Johannesburg is CAT = UTC+2 (no DST)
  try {
    const datePart = date.toLocaleDateString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "short",
    });
    const timePart = date.toLocaleTimeString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${datePart} • ${timePart} CAT`;
  } catch {
    return date.toISOString().slice(0, 19).replace("T", " ") + " CAT";
  }
}

export default function CATClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const currentYear = now ? now.toLocaleDateString("en-ZA", { timeZone: "Africa/Johannesburg", year: "numeric" }) : String(new Date().getFullYear());
  const yearNum = parseInt(currentYear, 10);
  const yearRange = yearNum > START_YEAR ? `© ${START_YEAR} – ${yearNum}` : `© ${START_YEAR}`;
  const catString = now ? formatCAT(now) : null;

  return (
    <span className="inline-flex flex-wrap items-center gap-2 text-white/60">
      <span>{yearRange} KUYAKHANYA FM. All rights reserved.</span>
      {catString && (
        <>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="font-mono text-xs font-semibold tracking-wide text-[#ffd700]">{catString}</span>
        </>
      )}
    </span>
  );
}
