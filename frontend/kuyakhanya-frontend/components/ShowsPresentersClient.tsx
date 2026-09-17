"use client";

import React, { useState, useMemo } from "react";
import { presenters } from "@/lib/people";
import MasterCard from "@/components/MasterCard";
import BannerAd from "@/components/BannerAd";
import { shareTarget, SHARE_NETWORKS, SITE_URL } from "@/lib/share";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";

import { SHOWS, type Show } from "@/lib/shows";

const DAYS = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

function SocialIcon({ id, className = "h-4 w-4" }: { id: string; className?: string }) {
  switch (id) {
    case "facebook":
      return <FacebookIcon className={className} />;
    case "x":
      return <XIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
    case "youtube":
      return <YouTubeIcon className={className} />;
    default:
      return null;
  }
}

function ShareIcons({
  item,
  title,
  description,
  networks = SHARE_NETWORKS,
  size = "h-8 w-8 text-[13px]",
  iconClass = "h-4 w-4",
}: {
  item: string;
  title: string;
  description: string;
  networks?: { id: string; label: string }[];
  size?: string;
  iconClass?: string;
}) {
  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.preventDefault()}>
      {networks.map((n) => (
        <a
          key={n.id}
          href={shareTarget(n.id as never, { url: SITE_URL + "/shows-presenters", title, description }).url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${n.label} — ${title}`}
          title={n.label}
          className={`grid ${size} place-items-center rounded-full bg-white/10 border border-white/15 text-white/80 hover:text-[#1a0b2e] hover:bg-[#FFD700] hover:border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0)] hover:shadow-[0_0_16px_rgba(255,215,0,0.4)] transition-all`}
        >
          <SocialIcon id={n.id} className={iconClass} />
        </a>
      ))}
    </div>
  );
}

export function ShowCard({ show }: { show: Show }) {
  const bg = {
    backgroundImage: `linear-gradient(180deg, rgba(11,10,20,0.15) 0%, rgba(21,11,40,0.75) 55%, rgba(11,10,20,0.95) 100%), url('${show.image}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#110a1f] transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700]/40 hover:shadow-[0_20px_50px_-12px_rgba(255,215,0,0.25)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-48" style={bg}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_50%_120%,rgba(255,215,0,0.25),transparent_60%)]" />
        <span
          className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black tracking-[0.14em] text-white"
          style={{ backgroundColor: show.accent }}
        >
          {show.day.toUpperCase()}
        </span>
        <span className="absolute bottom-4 left-4 text-xs font-bold text-white/90 bg-black/30 rounded-full px-2.5 py-1 backdrop-blur">
          {show.time}
        </span>
      </div>

      <div className="relative p-5">
        <h3 className="text-base font-black uppercase tracking-tight text-white">{show.title}</h3>
        <p className="mt-0.5 text-xs font-bold text-[#FFD700]">with {show.host}</p>
        <p className="mt-1 text-[11px] font-semibold tracking-wide text-white/50">{show.theme}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/75 line-clamp-3">{show.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <ShareIcons
            item={show.title}
            title={`${show.title} — KUYAKHANYA FM`}
            description={`${show.day} • ${show.time} • Host: ${show.host}. ${show.theme}.`}
          />
        </div>
      </div>
    </article>
  );
}

export default function ShowsPresentersClient() {
  const [dayFilter, setDayFilter] = useState<(typeof DAYS)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [pView, setPView] = useState<"grid" | "list">("grid");

  const featured = useMemo(() => presenters, []);
  const filteredShows = useMemo(
    () => (dayFilter === "All" ? SHOWS : SHOWS.filter((s) => s.day === dayFilter)),
    [dayFilter]
  );

  return (
    <>
      {/* SECTION 1 — SHOWS */}
      <section id="sp-shows" className="relative py-16 sm:py-24 overflow-hidden bg-[#0b0a14]">
        <div aria-hidden className="absolute top-10 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/18 blur-[110px]" />
        <div aria-hidden className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-[#FFD700]/6 blur-[110px]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.025] halftone" />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">KUYAKHANYA FM SHOWS</p>
            <h1 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
              Our <span className="text-gradient-gold">Programmes</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/65">
              A week of voices keeping Thembalethu connected — every show, every host, every day.
            </p>
            <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
          </div>

          {/* Filters + view toggle */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {DAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDayFilter(d)}
                  className={`rounded-full px-4 py-2 text-xs font-black tracking-wide transition-all ${
                    dayFilter === d
                      ? "bg-[#FFD700] text-[#1a0b2e] shadow-[0_0_16px_rgba(255,215,0,0.4)]"
                      : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                >
                  {d === "All" ? d : d.slice(0, 3).toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/10 border border-white/10 p-1">
              <button
                onClick={() => setView("grid")}
                className={`rounded-full px-4 py-1.5 text-xs font-black transition ${view === "grid" ? "bg-[#FFD700] text-[#1a0b2e]" : "text-white/70 hover:text-white"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`rounded-full px-4 py-1.5 text-xs font-black transition ${view === "list" ? "bg-[#FFD700] text-[#1a0b2e]" : "text-white/70 hover:text-white"}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Shows grid / list */}
          {view === "grid" ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredShows.map((s, i) => (
                <ShowCard key={`${s.title}-${i}`} show={s} />
              ))}
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {filteredShows.map((s, i) => (
                <article
                  key={`${s.title}-${i}`}
                  className="flex flex-col sm:flex-row gap-4 rounded-[20px] border border-white/10 bg-[#110a1f] p-4 transition-all hover:border-[#FFD700]/50 hover:-translate-y-1"
                >
                  <div
                    className="h-28 w-full sm:w-40 shrink-0 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url('${s.image}')` }}
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black text-white" style={{ backgroundColor: s.accent }}>
                        {s.day.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-white/60">{s.time}</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-black uppercase text-white">{s.title}</h3>
                    <p className="text-xs font-bold text-[#FFD700]">with {s.host}</p>
                    <p className="mt-1 text-sm text-white/65 line-clamp-2">{s.description}</p>
                  </div>
                  <div className="flex items-center sm:items-end sm:flex-col justify-between gap-3 sm:justify-center">
                    <ShareIcons
                      item={s.title}
                      title={`${s.title} — KUYAKHANYA FM`}
                      description={`${s.day} • ${s.time} • ${s.host}.`}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
          {filteredShows.length === 0 && (
            <p className="mt-10 text-center text-sm text-white/50">No shows on this day.</p>
          )}
        </div>
      </section>

      {/* SECTION 2 — ALL PRESENTERS */}
      <section id="sp-presenters" className="relative py-16 sm:py-24 overflow-hidden bg-[#0b0a14]">
        <div aria-hidden className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#4B0082]/22 blur-[110px]" />
        <div aria-hidden className="absolute bottom-10 right-10 h-[380px] w-[380px] rounded-full bg-[#FFD700]/6 blur-[110px]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.02] grid-pattern" />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">ALL PRESENTERS</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
              Meet your favourite voices of <span className="text-gradient-gold">Kuyakhanya FM.</span>
            </h2>
            <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1 rounded-full bg-white/10 border border-white/10 p-1" role="tablist" aria-label="Presenters view">
              <button
                role="tab"
                aria-selected={pView === "grid"}
                onClick={() => setPView("grid")}
                className={`rounded-full px-4 py-1.5 text-xs font-black transition ${pView === "grid" ? "bg-[#FFD700] text-[#1a0b2e]" : "text-white/70 hover:text-white"}`}
              >
                Grid
              </button>
              <button
                role="tab"
                aria-selected={pView === "list"}
                onClick={() => setPView("list")}
                className={`rounded-full px-4 py-1.5 text-xs font-black transition ${pView === "list" ? "bg-[#FFD700] text-[#1a0b2e]" : "text-white/70 hover:text-white"}`}
              >
                List
              </button>
            </div>
          </div>

          {pView === "grid" ? (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {featured.map((p) => (
                <MasterCard key={p.slug} person={p} profilePath={`/presenters/${p.slug}`} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-8 max-w-3xl space-y-3">
              {featured.map((p) => (
                <MasterCard key={p.slug} person={p} profilePath={`/presenters/${p.slug}`} layout="list" />
              ))}
            </div>
          )}
        </div>
      </section>
      <BannerAd />
    </>
  );
}
