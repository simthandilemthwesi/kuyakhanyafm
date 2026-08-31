import { siteData } from "@/lib/site-data";
import Link from "next/link";

export default function AboutSection() {
  const pillars = [
    { title: "Community", desc: "Rooted in Thembalethu, serving families, churches and neighbours with care and consistency.", icon: "◈" },
    { title: "Connection", desc: "Radio that brings people together — conversation, music and stories that connect hearts.", icon: "◎" },
    { title: "Inspiration", desc: "Messages that uplift, encourage and point to hope through Christ.", icon: "✦" },
    { title: "Faith", desc: "A gentle, steady voice of faith — prayer, worship and truth for everyday life.", icon: "✝" },
    { title: "Culture", desc: "Honouring language, heritage and the beauty of our community’s roots.", icon: "⬡" },
    { title: "Empowerment", desc: "Youth mentorship, skills and platforms for local talent to shine.", icon: "↗" },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[#0b0a14]" />
      <div aria-hidden className="absolute top-10 -left-20 h-[420px] w-[420px] rounded-full bg-[#4B0082]/12 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.02] grid-pattern" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">ABOUT KUYAKHANYA FM</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              A beacon of hope in <span className="text-gradient-gold">Thembalethu & beyond</span>
            </h2>
            <div className="mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
            <p className="mt-6 text-[15px] sm:text-[15px] leading-relaxed text-white/70">
              {siteData.about}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Authentic, community-driven broadcasting — no inflated claims, just faithful service, real people and meaningful programmes that inform, inspire and entertain.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              {[
                { k: "Hope", v: "Daily encouragement" },
                { k: "Unity", v: "Stronger together" },
                { k: "Faith", v: "Christ-centred" },
                { k: "Service", v: "For the community" },
              ].map((f) => (
                <div key={f.k} className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-black text-white">{f.k}</p>
                  <p className="text-xs text-white/60">{f.v}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="mt-7 inline-flex rounded-full bg-[#FFD700] px-6 py-3 text-sm font-black text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-[0_8px_20px_rgba(255,215,0,0.25)]">
              Learn more about us →
            </Link>
          </div>

          {/* Visual cards — 3D stacked */}
          <div className="relative" style={{ perspective: "1200px" } as React.CSSProperties}>
            <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-[#4B0082]/16 via-transparent to-[#FFD700]/8 blur-2xl" />

            <div className="relative grid gap-4">
              {/* main card */}
              <div className="rounded-[28px] glass-purple p-[1.5px]">
                <div className="rounded-[26px] bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0a14]/80 backdrop-blur p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFD700] text-[#1a0b2e] font-black">◈</span>
                    <p className="font-heading font-black text-white">We Shine Brighter Together</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Information, education and entertainment through thoughtful curation — music, conversation and local stories that reflect our people.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Thembalethu", "George", "Western Cape"].map((t) => (
                      <span key={t} className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {pillars.slice(0, 3).map((p) => (
                  <div key={p.title} className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 text-center backdrop-blur">
                    <span className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-[#FFD700]/15 text-[#FFD700] text-sm">{p.icon}</span>
                    <p className="mt-2 text-xs font-black text-white">{p.title}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {pillars.slice(3, 6).map((p) => (
                  <div key={p.title} className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 text-center backdrop-blur">
                    <span className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-[#8a2be2]/20 text-[#d9b4ff] text-sm">{p.icon}</span>
                    <p className="mt-2 text-xs font-black text-white">{p.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
