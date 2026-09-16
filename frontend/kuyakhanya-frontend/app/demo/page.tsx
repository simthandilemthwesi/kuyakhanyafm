"use client";

import { useState } from "react";
import ScrollRevealWrapper from "@/components/ScrollRevealWrapper";

const PROFILE_DATA = [
  { name: "Franky", role: "Presenter", bio: "Warm, welcoming conversation around love, life and relationships." },
  { name: "Mrs. Lolwana", role: "Abafazi Bokholo", bio: "Celebrating women of faith, resilience, wisdom and purpose." },
  { name: "DJ Toto", role: "Ezakwa Ntu", bio: "A proudly African celebration of culture, heritage and roots." },
];

const TEXT_DATA =
  "KUYAKHANYA FM is a community radio station from Thembalethu, George — bringing light to the community through uplifting music, inspirational messages and community-driven programmes. WE SHINE BRIGHTER TOGETHER.";

const CARD_DATA = [
  {
    title: "Love & Life",
    desc: "Real stories, heartfelt advice and community voices that heal, connect and celebrate everyday joy.",
    time: "Tuesday • 06:00 pm",
  },
  {
    title: "Friday Vibes",
    desc: "Feel the weekend energy — music, conversation and vibrant vibes with Kay Cee.",
    time: "Friday • 06:00 pm",
  },
  {
    title: "Yizani Sakhe",
    desc: "An inspirational Sunday gathering of faith, restoration and revival.",
    time: "Sunday • 10:00 am",
  },
];

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(true);

  const reload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1400);
  };

  return (
    <main className="min-h-screen bg-[#0b0a14] text-[#f9f9f9]">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#b0d136]">SCROLL REVEAL WRAPPER</p>
          <h1 className="mt-3 font-heading text-3xl sm:text-5xl font-black">
            Loading, then revealing.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#f9f9f9]/70">
            Demonstrates the skeleton → content scroll animation for the three types:
            <span className="font-bold text-[#b0d136]"> profile</span>,{" "}
            <span className="font-bold text-[#b0d136]"> text</span> and{" "}
            <span className="font-bold text-[#b0d136]"> card</span>.
          </p>
          <button
            onClick={reload}
            className="mt-6 inline-flex items-center rounded-full bg-[#b0d136] px-6 py-2.5 text-sm font-black text-[#1a0b2e] hover:bg-[#c4e34c] transition"
          >
            ↻ Replay loading state
          </button>
        </div>

        {/* Profile skeletons */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-black text-[#f9f9f9]">
            <span className="text-[#b0d136]">01</span> Presenters
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {PROFILE_DATA.map((p, i) => (
              <ScrollRevealWrapper key={p.name} isLoading={isLoading} type="profile">
                <article className="h-full rounded-2xl border border-white/10 bg-[#150c26] p-6 text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-[#b0d136]/60 bg-gradient-to-br from-[#58217d] to-[#1a0b2e] font-black text-2xl text-[#b0d136]">
                    {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#f9f9f9]">{p.name}</h3>
                  <p className="text-xs font-black tracking-[0.14em] text-[#b0d136] uppercase">{p.role}</p>
                  <p className="mt-2 text-sm text-[#f9f9f9]/70">{p.bio}</p>
                </article>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>

        {/* Text skeleton */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-black text-[#f9f9f9]">
            <span className="text-[#b0d136]">02</span> About
          </h2>
          <div className="mt-6">
            <ScrollRevealWrapper isLoading={isLoading} type="text">
              <div className="rounded-2xl border border-white/10 bg-[#150c26] p-6 sm:p-8">
                <p className="text-base sm:text-lg leading-relaxed text-[#f9f9f9]/85">{TEXT_DATA}</p>
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>

        {/* Card skeletons */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-black text-[#f9f9f9]">
            <span className="text-[#b0d136]">03</span> Shows
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {CARD_DATA.map((c) => (
              <ScrollRevealWrapper key={c.title} isLoading={isLoading} type="card">
                <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#150c26]">
                  <div className="grid h-40 place-items-center bg-gradient-to-br from-[#58217d] via-[#3d1260] to-[#1a0b2e]">
                    <span className="font-heading text-xl font-black text-[#b0d136]">{c.title.toUpperCase()}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-black text-[#f9f9f9]">{c.title}</h3>
                    <p className="mt-0.5 text-xs font-bold text-[#b0d136]">{c.time}</p>
                    <p className="mt-2 text-sm text-[#f9f9f9]/70">{c.desc}</p>
                    <span className="mt-3 inline-flex rounded-full bg-[#b0d136] px-4 py-1.5 text-xs font-black text-[#1a0b2e]">
                      LISTEN LIVE
                    </span>
                  </div>
                </article>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
