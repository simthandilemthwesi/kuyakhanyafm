import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/lib/site-data";
import { pageMetadata } from "@/lib/seo";

/* ──────────────────────────────────────────────────────────
   Media Centre — premium, restrained African broadcasting
   commercial experience. All data is strictly per spec.
   No invented metrics, no guaranteed outcomes.
   ────────────────────────────────────────────────────────── */

export const metadata: Metadata = pageMetadata({
  title: "Media Centre | KUYAKHANYA FM",
  description:
    "KUYAKHANYA FM Media Centre — 558,862+ measured digital audience across platforms. Audience insights, geographic reach, advertising, partnership and media enquiries. George & Garden Route, South Africa.",
  path: "/media-centre",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Media Centre — Advertise, Partner, Connect",
  keywords: [
    "Kuyakhanya FM Media Centre",
    "advertise George",
    "Garden Route radio advertising",
    "Thembalethu media",
    "community radio partnership",
    "South Africa radio sponsorship",
    "media enquiries Kuyakhanya",
  ],
});

// Jotform public URLs — never hard-code, never expose /build URLs.
// Configure in env: JOTFORM_ADVERTISING_URL / JOTFORM_PARTNERSHIP_URL
// (also supports NEXT_PUBLIC_ prefix for static export).
const JOTFORM_ADVERTISING_URL =
  process.env.JOTFORM_ADVERTISING_URL ||
  process.env.NEXT_PUBLIC_JOTFORM_ADVERTISING_URL ||
  "https://form.jotform.com/262575262685063";
const JOTFORM_PARTNERSHIP_URL =
  process.env.JOTFORM_PARTNERSHIP_URL ||
  process.env.NEXT_PUBLIC_JOTFORM_PARTNERSHIP_URL ||
  "https://form.jotform.com/262574889084070";

// ── helpers ──────────────────────────────────────────────
function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-black tracking-[0.32em] text-[#6a0dad] uppercase">
      {children}
    </p>
  );
}

// ── page ─────────────────────────────────────────────────
export default function MediaCentrePage() {
  const c = siteData.contact;

  return (
    <>
      {/* =================================================
         1 — HERO
         ================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad]">
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"
        />
        <div
          aria-hidden
          className="absolute -top-24 right-[-6rem] h-[420px] w-[420px] rounded-full bg-white/[0.06] blur-[80px]"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-[-4rem] h-[360px] w-[360px] rounded-full bg-[#ffd700]/[0.07] blur-[80px]"
        />
        {/* subtle diagonal line — broadcast-inspired, restrained */}
        <div
          aria-hidden
          className="absolute top-[58%] left-0 h-px w-[46%] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.28em] text-[#ffd700] uppercase">
                Media Centre
              </p>
              <h1 className="mt-4 max-w-[20ch] text-balance font-display text-[34px] sm:text-[48px] lg:text-[54px] font-extrabold leading-[0.95] tracking-tight text-white">
                Amplify your message
                <span className="block text-[#ffd700]">where community listens.</span>
              </h1>
              <p className="mt-5 max-w-[52ch] text-[15px] sm:text-[17px] leading-relaxed text-white/80">
                KUYAKHANYA FM is a community-rooted broadcaster from Thembalethu, George.
                For more than a year our digital platforms have built a measurable, engaged
                audience across the Garden Route and South Africa — rooted in trust, faith and
                local presence.
              </p>
              <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/60">
                Explore our measured reach, audience insights and commercial opportunities.
                No inflated claims — just transparent data and community-first partnerships.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#advertise"
                  className="inline-flex items-center justify-center rounded-full bg-[#ffd700] px-6 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-[0_10px_30px_rgba(255,215,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd700]"
                >
                  Advertise With Us
                </a>
                <a
                  href="#partnership"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-zinc-100 transition shadow-md"
                >
                  Partner With Us
                </a>
                <a
                  href="#media-enquiries"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/15 hover:border-white/30 transition"
                >
                  Media Enquiries
                </a>
              </div>

              <p className="mt-4 text-xs text-white/45">
                Measured digital audience data • 1+ year in community broadcasting
              </p>
            </div>

            {/* editorial stat card — restrained */}
            <div className="lg:pl-8">
              <div className="relative rounded-[32px] bg-white p-7 sm:p-8 shadow-2xl border border-white/60">
                <div
                  aria-hidden
                  className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-[#ffd700]/40 to-transparent"
                />
                <p className="text-xs font-bold tracking-[0.2em] text-[#6a0dad] uppercase">
                  Measured Digital Reach
                </p>
                <p className="mt-3 font-display text-[44px] sm:text-[52px] font-black leading-none tracking-tight text-[#1a0b2e]">
                  558,862<span className="text-[#6a0dad]">+</span>
                </p>
                <p className="mt-1 text-sm font-bold tracking-wide text-[#1a0b2e]">
                  Total Digital Listeners &amp; Views
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  Measured digital audience / platform data. Transparent, platform-reported
                  figures — not broadcast coverage or guaranteed impressions.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-6">
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-[#6a0dad] uppercase">
                      Heartland
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#1a0b2e]">George 79.5%</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-zinc-400 uppercase">
                      Core Age
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#1a0b2e]">25–44 • 58.6%</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-zinc-400 uppercase">
                      Discovery
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#1a0b2e]">88% New</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-white/50">
                George &amp; Garden Route — community at the centre
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
         2 — DIGITAL REACH (single metric only)
         ================================================= */}
      <section className="bg-white border-y border-zinc-100">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Digital Reach</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1a0b2e]">
              558,862<span className="text-[#6a0dad]">+</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base font-bold tracking-wide text-[#1a0b2e]">
              Total Digital Listeners &amp; Views
            </p>
            <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-600">
              Measured digital audience across our platforms. This figure reflects
              platform-reported digital listeners and views — it does not imply FM
              broadcast coverage, guaranteed impressions or sales outcomes.
            </p>
            <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#ffd700]" />
          </div>
        </div>
      </section>

      {/* =================================================
         3 — AUDIENCE INSIGHTS
         ================================================= */}
      <section className="bg-[#faf8ff] border-b border-[#ede6f8]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Audience Insights</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
              Who is listening
            </h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-zinc-600">
              Measured digital audience by age. We report exactly what platforms measure —
              no rounding inflation, no added segments.
            </p>
          </div>

          {/* highlight */}
          <div className="mx-auto mt-10 max-w-3xl rounded-[28px] bg-gradient-to-br from-[#1a0b2e] to-[#4b0082] p-[1.5px] shadow-lift">
            <div className="rounded-[26px] bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4b0082] px-6 py-7 sm:px-8 sm:py-8 text-white">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-[#ffd700] uppercase">
                    Core Audience
                  </p>
                  <p className="mt-2 font-display text-4xl font-black leading-none tracking-tight">
                    58.6%
                  </p>
                  <p className="mt-1.5 max-w-[28ch] text-sm leading-relaxed text-white/75">
                    of the measured digital audience is aged{" "}
                    <span className="font-bold text-white">25–44</span>.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <div className="rounded-2xl bg-white/10 border border-white/15 px-5 py-4 text-center backdrop-blur">
                    <p className="text-xs font-bold tracking-[0.16em] text-white/60 uppercase">
                      35–44
                    </p>
                    <p className="mt-1 font-display text-2xl font-black text-[#ffd700]">29.6%</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 px-5 py-4 text-center backdrop-blur">
                    <p className="text-xs font-bold tracking-[0.16em] text-white/60 uppercase">
                      25–34
                    </p>
                    <p className="mt-1 font-display text-2xl font-black text-white">29.0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* full breakdown — restrained bars */}
          <div className="mx-auto mt-6 max-w-3xl rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-8 shadow-soft">
            <h3 className="text-xs font-bold tracking-[0.18em] text-zinc-500 uppercase">
              Age Breakdown — Measured Digital Audience
            </h3>
            <ul className="mt-6 space-y-4" role="list">
              {[
                { label: "35–44", value: 29.6, bold: true },
                { label: "25–34", value: 29.0, bold: true },
                { label: "45–54", value: 15.9 },
                { label: "18–24", value: 15.1 },
                { label: "65+", value: 6.8 },
                { label: "55–64", value: 3.6 },
              ].map((r) => (
                <li
                  key={r.label}
                  className="grid grid-cols-[72px_1fr_52px] items-center gap-3"
                >
                  <span
                    className={`text-sm ${r.bold ? "font-extrabold text-[#1a0b2e]" : "font-semibold text-zinc-700"}`}
                  >
                    {r.label}
                  </span>
                  <div className="h-2.5 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${r.bold ? "bg-gradient-to-r from-[#6a0dad] to-[#8a2be2]" : "bg-zinc-300"}`}
                      style={{ width: `${(r.value / 30) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={r.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${r.label} ${r.value}%`}
                    />
                  </div>
                  <span className="text-right text-sm font-bold tabular-nums text-[#1a0b2e]">
                    {r.value.toFixed(1)}%
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[72px_1fr_52px] items-center gap-3 border-t border-zinc-100 pt-4">
                <span className="text-sm font-black text-[#6a0dad]">25–44</span>
                <div className="h-2.5 rounded-full bg-[#f5efff] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ffd700] to-[#6a0dad]"
                    style={{ width: `${(58.6 / 60) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={58.6}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="25–44 58.6%"
                  />
                </div>
                <span className="text-right text-sm font-black tabular-nums text-[#6a0dad]">
                  58.6%
                </span>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">
              Source: measured digital platform data. Percentages reflect the reported
              audience composition and are provided for transparency — not as a guarantee
              of campaign performance.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
         4 — GEOGRAPHIC REACH
         ================================================= */}
      <section className="bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Geographic Reach</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
              Rooted in George. Heard across South Africa.
            </h2>
            <p className="mx-auto mt-3 max-w-[58ch] text-sm leading-relaxed text-zinc-600">
              Our measured digital audience is strongly concentrated in George and the
              Garden Route, with national presence across South Africa. We report location
              as measured — not broadcast coverage.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            {/* Countries */}
            <div className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-8 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f5efff] text-[#6a0dad] text-lg">
                  ◆
                </span>
                <div>
                  <h3 className="font-display font-extrabold tracking-tight text-[#1a0b2e]">
                    Countries
                  </h3>
                  <p className="text-xs font-semibold tracking-wide text-zinc-500">
                    Measured digital audience
                  </p>
                </div>
              </div>
              <ul className="mt-6 divide-y divide-zinc-100" role="list">
                {[
                  { label: "South Africa", value: 98.5, emph: true },
                  { label: "Botswana", value: 0.3 },
                  { label: "Mozambique", value: 0.3 },
                  { label: "Malawi", value: 0.2 },
                  { label: "Zimbabwe", value: 0.2 },
                  { label: "Nigeria", value: 0.1 },
                ].map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center justify-between py-3"
                  >
                    <span
                      className={`text-sm ${r.emph ? "font-extrabold text-[#1a0b2e]" : "font-medium text-zinc-700"}`}
                    >
                      {r.label}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black tabular-nums ${r.emph ? "bg-[#1a0b2e] text-[#ffd700]" : "bg-zinc-100 text-zinc-700"}`}
                    >
                      {r.value.toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-[#1a0b2e] to-[#2e0b56] p-[1.5px] shadow-lift">
              <div className="rounded-[26px] bg-white p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffd700] text-[#1a0b2e] text-lg font-black">
                    ◉
                  </span>
                  <div>
                    <h3 className="font-display font-extrabold tracking-tight text-[#1a0b2e]">
                      Cities &amp; Towns
                    </h3>
                    <p className="text-xs font-semibold tracking-wide text-zinc-500">
                      Garden Route heartland
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3" role="list">
                  {[
                    { label: "George, South Africa", value: 79.5, emph: true },
                    { label: "Cape Town, South Africa", value: 8.5 },
                    { label: "Knysna, South Africa", value: 3.8 },
                    { label: "Mossel Bay, South Africa", value: 2.0 },
                    { label: "Mdantsane, South Africa", value: 1.3 },
                    { label: "Stellenbosch, South Africa", value: 1.2 },
                  ].map((r) => (
                    <li key={r.label} className="flex items-center gap-3">
                      <span
                        className={`flex-1 text-sm ${r.emph ? "font-extrabold text-[#1a0b2e]" : "font-medium text-zinc-700"}`}
                      >
                        {r.label}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-black tabular-nums ${r.emph ? "bg-[#ffd700] text-[#1a0b2e]" : "bg-zinc-100 text-zinc-700"}`}
                      >
                        {r.value.toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl bg-[#faf8ff] border border-[#ede6f8] px-4 py-3 text-xs leading-relaxed text-zinc-600">
                  <span className="font-bold text-[#6a0dad]">George &amp; Garden Route focus</span>{" "}
                  — our community presence, live coverage and local stories are strongest
                  here. Figures reflect measured digital location, not FM signal coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
         5 — WHO WE REACH
         ================================================= */}
      <section className="bg-[#faf8ff] border-b border-[#ede6f8]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <SectionEyebrow>Who We Reach</SectionEyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
                  Beyond our followers
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  Our digital content is discovered well beyond the existing follower base.
                  New audiences encounter KUYAKHANYA FM through shares, recommendations and
                  platform discovery — a sign of relevant, shareable community content.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                  This is audience composition data — not a promise of conversions, leads or
                  sales. Campaign outcomes depend on creative, offer, timing and many other
                  factors.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-7 text-center shadow-soft">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#1a0b2e] to-[#4b0082] text-white shadow-md">
                    <span className="font-display text-2xl font-black">88%</span>
                  </div>
                  <p className="mt-4 text-sm font-black tracking-wide text-[#1a0b2e]">
                    Non-followers
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    People reached who do not follow the page
                  </p>
                </div>
                <div className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-7 text-center shadow-soft">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#ffd700] text-[#1a0b2e] shadow-md">
                    <span className="font-display text-2xl font-black">12%</span>
                  </div>
                  <p className="mt-4 text-sm font-black tracking-wide text-[#1a0b2e]">
                    Followers
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    Existing community who follow the page
                  </p>
                </div>
                <div className="col-span-2 rounded-2xl bg-[#1a0b2e] px-5 py-4 text-center">
                  <p className="text-sm font-bold text-white">
                    Content reaches <span className="text-[#ffd700]">substantially beyond</span>{" "}
                    the follower base
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
         6 — WHY ADVERTISE
         ================================================= */}
      <section className="bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Why Advertise With Kuyakhanya FM</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
              Community-first media
            </h2>
            <p className="mx-auto mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-600">
              Six reasons partners choose KUYAKHANYA FM. All describe approach and context —
              not guaranteed results.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Local Connection",
                d: "Rooted in Thembalethu and George — authentic relationships with the Garden Route community.",
              },
              {
                t: "Digital Discovery",
                d: "Content that travels beyond followers, creating opportunities for organic discovery.",
              },
              {
                t: "Multi-Format Content",
                d: "Audio, conversation, community stories and digital moments that match different message needs.",
              },
              {
                t: "Community Presence",
                d: "On-the-ground visibility through events, outreach and partnerships across the region.",
              },
              {
                t: "Flexible Campaigns",
                d: "Options that can align with different timelines, budgets and communication goals.",
              },
              {
                t: "Cross-Platform Potential",
                d: "Opportunities to connect across streaming, social and community touchpoints where relevant.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-soft hover:-translate-y-1 hover:shadow-lift transition duration-300"
              >
                <div className="h-1.5 w-8 rounded-full bg-[#ffd700]" />
                <h3 className="mt-4 font-display font-extrabold tracking-tight text-[#1a0b2e]">
                  {f.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-zinc-500">
            No guaranteed views, listeners, leads, sales or engagement is promised. Outcomes
            vary by creative, offer and audience.
          </p>
        </div>
      </section>

      {/* =================================================
         7 — ADVERTISING OPPORTUNITIES
         ================================================= */}
      <section
        id="advertise"
        className="bg-[#faf8ff] border-b border-[#ede6f8] scroll-mt-24"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Advertising Opportunities</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
              Transparent starting prices
            </h2>
            <p className="mx-auto mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-600">
              Four entry points — priced to support local businesses, organisations and
              community initiatives.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[28px] bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad] p-8 text-center text-white shadow-lift sm:p-10">
            <p className="text-xs font-bold tracking-[0.25em] text-[#ffd700] uppercase">
              Limited advertising offer
            </p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-black tracking-tight">
              First 3 months <span className="text-[#ffd700]">FREE</span> advertising
            </h3>
            <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-white/75">
              New advertisers flight their first three months of on-site
              placements at no cost. This offer covers advertising only — not
              partnerships. Subject to availability, creative approval and
              official terms.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Digital Starter", price: "From R110/week", caption: "Starting price", featured: false },
              { name: "Digital Growth", price: "From R800", caption: "Starting price", featured: true },
              { name: "Digital Impact", price: "From R1,800", caption: "Starting price", featured: false },
              {
                name: "Partnership / Custom Campaign",
                price: "Custom Quote",
                caption: "Scoped on brief",
                featured: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-[28px] border p-6 shadow-soft ${
                  p.featured
                    ? "bg-gradient-to-br from-[#1a0b2e] to-[#4b0082] border-[#6a0dad] text-white shadow-lift"
                    : "bg-white border-zinc-200"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#ffd700] px-3 py-1 text-[11px] font-black tracking-wide text-[#1a0b2e] shadow-md">
                    Most Chosen
                  </span>
                )}
                <h3
                  className={`min-h-[40px] font-display text-base font-extrabold leading-tight tracking-tight ${p.featured ? "text-white" : "text-[#1a0b2e]"}`}
                >
                  {p.name}
                </h3>
                <p
                  className={`mt-4 font-display text-2xl font-black tracking-tight ${p.featured ? "text-[#ffd700]" : "text-[#6a0dad]"}`}
                >
                  {p.price}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold tracking-wide ${p.featured ? "text-white/60" : "text-zinc-500"}`}
                >
                  Starting price
                </p>
                <div
                  className={`mt-5 h-px ${p.featured ? "bg-white/15" : "bg-zinc-100"}`}
                />
                <p
                  className={`mt-4 text-xs leading-relaxed ${p.featured ? "text-white/70" : "text-zinc-500"}`}
                >
                  Tailored deliverables upon brief — we confirm scope before you commit.
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-center text-xs sm:text-sm leading-relaxed text-amber-900">
              Starting prices are subject to confirmation based on campaign requirements,
              creative specifications, duration, placement and agreed deliverables. No
              guaranteed views, listeners, leads, sales or engagement.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            {JOTFORM_ADVERTISING_URL ? (
              <a
                href={JOTFORM_ADVERTISING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#6a0dad] px-7 py-3.5 text-sm font-black text-white hover:bg-[#4b0082] transition shadow-md"
              >
                Advertise With Us — Apply →
              </a>
            ) : (
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#6a0dad] px-7 py-3.5 text-sm font-black text-white hover:bg-[#4b0082] transition shadow-md"
              >
                Advertise With Us — Enquire →
              </a>
            )}
          </div>
          {!JOTFORM_ADVERTISING_URL && (
            <p className="mt-3 text-center text-xs text-zinc-500">
              Advertising applications are handled via our contact team until the online
              form is configured.
            </p>
          )}
        </div>
      </section>

      {/* =================================================
         8 — PARTNERSHIP
         ================================================= */}
      <section
        id="partnership"
        className="bg-white border-b border-zinc-100 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <SectionEyebrow>Partnership</SectionEyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
                Partner with KUYAKHANYA FM
              </h2>
            </div>

            <div className="mt-10 rounded-[32px] bg-gradient-to-br from-[#1a0b2e] via-[#4b0082] to-[#6a0dad] p-[1.5px] shadow-lift">
              <div className="rounded-[30px] bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4b0082] px-6 py-8 sm:px-10 sm:py-10 text-white">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-[44ch]">
                      <p className="text-xs font-bold tracking-[0.22em] text-[#ffd700] uppercase">
                        Partnership Opportunity
                      </p>
                      <h3 className="mt-2 font-display text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                        Bronze, Silver, Gold{" "}
                        <span className="text-[#ffd700]">or Platinum</span>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">
                        Grow with the station at the level that suits you.
                        Tailored deliverables upon brief — request a quote or
                        apply today.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Bronze", "Silver", "Gold", "Platinum"].map((t) => (
                          <span key={t} className="rounded-full bg-white/10 border border-[#ffd700]/40 px-3 py-1.5 text-xs font-black tracking-wide text-[#ffd700]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 inline-flex rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
                        Terms and conditions apply
                      </p>
                    </div>

                  <div className="shrink-0 rounded-[24px] bg-white p-6 text-[#1a0b2e] shadow-xl lg:w-[340px]">
                    <p className="text-xs font-bold tracking-[0.18em] text-[#6a0dad] uppercase">
                      Partnership Tiers
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#1a0b2e]">
                      Request a Quote
                    </p>
                    <ul className="mt-3 space-y-2">
                      {["Bronze Partner", "Silver Partner", "Gold Partner", "Platinum Partner"].map((t) => (
                        <li key={t} className="flex items-center gap-2 rounded-xl bg-[#faf8ff] border border-zinc-100 px-3 py-2 text-sm font-bold text-[#1a0b2e]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd700]" aria-hidden />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      No prices are shown here — every partnership is scoped on
                      brief and confirmed before you commit. Terms and
                      conditions apply.
                    </p>
                    <div className="mt-6">
                      {JOTFORM_PARTNERSHIP_URL ? (
                        <a
                          href={JOTFORM_PARTNERSHIP_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center rounded-full bg-[#ffd700] px-6 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-md"
                        >
                          Apply for Partnership →
                        </a>
                      ) : (
                        <a
                          href="/contact"
                          className="flex w-full items-center justify-center rounded-full bg-[#ffd700] px-6 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-md"
                        >
                          Enquire About Partnership →
                        </a>
                      )}
                    </div>
                    {!JOTFORM_PARTNERSHIP_URL && (
                      <p className="mt-3 text-center text-xs leading-relaxed text-zinc-500">
                        Partnership applications are handled via our contact team until
                        the online form is configured.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
         9 — SPONSORSHIP & COLLABORATION
         ================================================= */}
      <section className="bg-[#faf8ff] border-b border-[#ede6f8]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Sponsorship &amp; Collaboration</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
              Grow with the community
            </h2>
            <p className="mx-auto mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-600">
              Sponsorship and collaboration opportunities that connect your brand with
              community moments — approach-driven, not outcome-guaranteed.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Event Sponsorship", d: "Align with community events and gatherings in Thembalethu and the Garden Route." },
              { t: "Community Initiatives", d: "Support programmes that uplift families, youth and local organisations." },
              { t: "Media Partnerships", d: "Collaborate on communication that amplifies community voices." },
              { t: "Brand Collaborations", d: "Thoughtful brand alignment rooted in local trust and relevance." },
              { t: "Campaign Partnerships", d: "Partner on campaigns that serve the community with purpose." },
              { t: "Content Collaborations", d: "Co-create content themes that reflect community stories and values." },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-soft"
              >
                <div className="h-1.5 w-7 rounded-full bg-[#6a0dad]" />
                <h3 className="mt-4 font-display font-extrabold tracking-tight text-[#1a0b2e]">
                  {f.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
         10 — MEDIA / PR ENQUIRIES (uses existing CMS contact)
         ================================================= */}
      <section
        id="media-enquiries"
        className="bg-white border-b border-zinc-100 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <SectionEyebrow>Media / PR Enquiries</SectionEyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a0b2e]">
                  Media enquiries &amp; press
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  For media enquiries, PR opportunities, interview requests, event
                  coverage, press or media collaboration and community initiatives,
                  contact the KUYAKHANYA FM team directly.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 bg-[#faf8ff] p-5">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#6a0dad] uppercase">
                      Phone
                    </p>
                    <a
                      href={`tel:${c.phone}`}
                      className="mt-1 inline-flex text-sm font-extrabold text-[#1a0b2e] hover:text-[#6a0dad] transition"
                    >
                      {c.phone}
                    </a>
                    <p className="mt-1 text-xs text-zinc-500">Thembalethu • George</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-[#faf8ff] p-5">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#6a0dad] uppercase">
                      WhatsApp
                    </p>
                    <a
                      href={c.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex text-sm font-extrabold text-[#1a0b2e] hover:text-[#6a0dad] transition"
                    >
                      Chat on WhatsApp
                    </a>
                    <p className="mt-1 text-xs text-zinc-500">{c.whatsapp}</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-[#faf8ff] p-5 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#6a0dad] uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-1 inline-flex break-all text-sm font-extrabold text-[#1a0b2e] hover:text-[#6a0dad] transition"
                    >
                      {c.email}
                    </a>
                    <p className="mt-1 text-xs text-zinc-500">Media, PR &amp; general enquiries</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={c.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:border-[#6a0dad]/30 hover:text-[#6a0dad] transition"
                  >
                    Facebook
                  </a>
                  <a
                    href={c.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:border-[#6a0dad]/30 hover:text-[#6a0dad] transition"
                  >
                    Instagram
                  </a>
                  <a
                    href={c.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:border-[#6a0dad]/30 hover:text-[#6a0dad] transition"
                  >
                    YouTube
                  </a>
                  <a
                    href={c.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:border-[#6a0dad]/30 hover:text-[#6a0dad] transition"
                  >
                    TikTok
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-zinc-200 bg-white p-6 sm:p-7 shadow-soft">
                <h3 className="font-display font-extrabold tracking-tight text-[#1a0b2e]">
                  What we handle
                </h3>
                <ul className="mt-5 grid gap-3" role="list">
                  {[
                    "Media Enquiries",
                    "PR Opportunities",
                    "Interview Requests",
                    "Event Coverage",
                    "Press / Media Collaboration",
                    "Community Initiatives",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-[#faf8ff] px-4 py-3"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#6a0dad] text-white text-xs">
                        ✓
                      </span>
                      <span className="text-sm font-semibold text-[#1a0b2e]">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                  <p className="text-xs leading-relaxed text-amber-900">
                    All media collaboration is subject to editorial alignment and
                    availability. No coverage or outcome is guaranteed.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-zinc-50 transition"
                >
                  Go to Contact Page →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
         11 — FINAL CTA
         ================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4b0082]">
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"
        />
        <div
          aria-hidden
          className="absolute -top-20 right-10 h-[320px] w-[320px] rounded-full bg-white/[0.04] blur-3xl"
        />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold tracking-[0.28em] text-[#ffd700] uppercase">
              Final Call
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
              Let&apos;s Make Your <span className="text-[#ffd700]">Message Shine.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-sm sm:text-base leading-relaxed text-white/75">
              Community-first media from Thembalethu. Transparent reach, local trust and
              flexible ways to connect — without inflated promises.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {JOTFORM_ADVERTISING_URL ? (
                <a
                  href={JOTFORM_ADVERTISING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#ffd700] px-7 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-[0_10px_30px_rgba(255,215,0,0.25)]"
                >
                  Advertise With Us
                </a>
              ) : (
                <a
                  href="#advertise"
                  className="inline-flex items-center justify-center rounded-full bg-[#ffd700] px-7 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-[#ffe873] transition shadow-[0_10px_30px_rgba(255,215,0,0.25)]"
                >
                  Advertise With Us
                </a>
              )}
              {JOTFORM_PARTNERSHIP_URL ? (
                <a
                  href={JOTFORM_PARTNERSHIP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-zinc-100 transition shadow-md"
                >
                  Partner With Us
                </a>
              ) : (
                <a
                  href="#partnership"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#1a0b2e] hover:bg-zinc-100 transition shadow-md"
                >
                  Partner With Us
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-7 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/15 hover:border-white/30 transition"
              >
                Media Enquiries
              </Link>
            </div>

            <p className="mt-6 text-xs text-white/45">
              KUYAKHANYA FM • Thembalethu • George • We Shine Brighter Together
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
