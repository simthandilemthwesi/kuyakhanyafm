import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use | KUYAKHANYA FM",
  description: "The terms for using the KUYAKHANYA FM website and live stream — fair use, content, competitions and contact.",
  path: "/terms",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Terms of Use",
  keywords: ["terms of use", "terms and conditions", "Kuyakhanya FM"],
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Welcome",
    body: [
      "By using kuyakhanyafm.web.app and listening to our live stream you agree to these terms. KUYAKHANYA FM is a community online radio station from Thembalethu, George, broadcasting messages of faith, hope and community.",
    ],
  },
  {
    heading: "Listening and using the site",
    body: [
      "Our live stream and website content are provided for personal, non-commercial listening, reading and sharing. You may share links to our pages and use the share buttons provided.",
      "Show times, presenters, programmes and event details may change. We keep the schedule updated, but live broadcasting can shift for operational or ministry reasons.",
    ],
  },
  {
    heading: "Your messages to us",
    body: [
      "When you contact us — including song requests, testimonies and prayer requests — please keep messages respectful and truthful. By sending content you give us permission to read it on air or publish it only where you have clearly agreed, and we will never publish your phone number or email address.",
      "Testimonies shared with us may be edited for length and clarity before any broadcast.",
    ],
  },
  {
    heading: "Competitions, events and giveaways",
    body: [
      "Any competitions or event promotions run under their own stated rules, dates and eligibility. Unless stated otherwise, prizes are not transferable and cannot be exchanged for cash.",
    ],
  },
  {
    heading: "Advertising and partnerships",
    body: [
      "Adverts and sponsored placements (on air and on this website) belong to their advertisers. Starting prices shown in our Media Centre are subject to confirmation, availability and creative approval — no outcomes are guaranteed.",
      "Partnership tiers (Bronze, Silver, Gold, Platinum) are scoped individually: request a quote or apply, and we confirm everything in writing before you commit. Terms and conditions apply to every campaign.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Station branding, the KUYAKHANYA FM name and logo, show names, articles and audio remain ours or our partners'. You may not copy, rebroadcast or sell our stream or content without written permission.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Do not misuse the contact form, attempt to disrupt the stream or website, or submit spam, abusive or unlawful content. We may block abusive usage to protect the community.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We work hard to keep the stream and website running, but they are provided as-is. We are not liable for interruptions, data costs you incur while streaming, or reliance on programme, news or weather content — always follow official sources for emergencies.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update these terms as the station grows; continued use means you accept the current version. Questions? Reach us at info.kuyakhanyafm@gmail.com or 063 978 0839, or read our Privacy Policy.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title={<>Terms of Use</>}
        subtitle="Fair, simple rules for listening, sharing and getting involved."
      />
      <section className="py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">Last updated: September 2026</p>
          <div className="mt-8 space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.heading} className="rounded-[24px] border border-zinc-200 bg-white p-6 sm:p-8 shadow-soft">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-[#1a0b2e]">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-zinc-600">{p}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/privacy" className="inline-flex rounded-full bg-[#6a0dad] px-6 py-3 text-sm font-bold text-white hover:bg-[#4b0082] transition">
              Privacy Policy →
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-[#1a0b2e] hover:border-[#6a0dad] transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
