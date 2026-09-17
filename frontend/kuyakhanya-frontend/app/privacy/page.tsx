import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | KUYAKHANYA FM",
  description: "How KUYAKHANYA FM collects, uses and protects your personal information — contact forms, cookies, analytics and advertising.",
  path: "/privacy",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Privacy Policy",
  keywords: ["privacy policy", "POPIA", "data protection", "Kuyakhanya FM"],
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Who we are",
    body: [
      "KUYAKHANYA FM is a community online radio station broadcasting from Thembalethu, George, South Africa. You can reach our team at info.kuyakhanyafm@gmail.com or 063 978 0839.",
      "This policy explains what personal information we collect through kuyakhanyafm.web.app, why we collect it, and the choices you have.",
    ],
  },
  {
    heading: "Information you give us",
    body: [
      "Contact form: when you send us a message we receive your name, email address, phone number (optional), subject and message. Messages are delivered to our station inbox and may be stored securely so we can respond and keep a record of enquiries.",
      "We use a spam-protection check (hCaptcha) on the contact form to block automated abuse.",
      "We never sell your personal information.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Essential cookies keep the site working — for example remembering your cookie choice and whether you dismissed a popup. These cannot be switched off.",
      "With your consent we use: analytics cookies to understand how people use our site; marketing cookies to show relevant adverts; preference cookies to remember settings such as your cookie choice.",
      "You can change your mind at any time using the cookie banner choices (Accept All, Reject Non-Essential, or Customize). Clearing your browser storage resets your choice and the banner will appear again.",
    ],
  },
  {
    heading: "Analytics and advertising",
    body: [
      "We use Google Analytics to understand aggregated listening and reading trends, and Google AdSense plus direct sponsorships (such as Octotel placements) to keep the station running. These providers may set their own cookies as described in Google's Privacy Policy.",
      "Our pages embed third-party content such as YouTube players, which may collect viewing data under their own policies.",
    ],
  },
  {
    heading: "How long we keep information",
    body: [
      "Contact messages are kept only as long as needed to respond and for reasonable record-keeping, and are then deleted. Cookie choices persist on your device until you clear them.",
    ],
  },
  {
    heading: "Your rights (POPIA)",
    body: [
      "Under South Africa's Protection of Personal Information Act you may ask what information we hold about you, ask us to correct it, or ask us to delete it. Contact us at info.kuyakhanyafm@gmail.com and we will respond within a reasonable time.",
      "You may also lodge a complaint with the Information Regulator of South Africa.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Our website is a general-audience community service. Children should only contact us with the involvement of a parent or guardian.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the station grows. Material changes will be reflected on this page with a revised date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title={<>Privacy Policy</>}
        subtitle="How we collect, use and protect your information — in plain language."
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
            <Link href="/terms" className="inline-flex rounded-full bg-[#6a0dad] px-6 py-3 text-sm font-bold text-white hover:bg-[#4b0082] transition">
              Terms of Use →
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
