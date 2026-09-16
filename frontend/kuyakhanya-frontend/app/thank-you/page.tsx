import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Thank You | KUYAKHANYA FM",
  description: "Thank you for contacting KUYAKHANYA FM — your message is on its way. We usually respond within a day.",
  path: "/thank-you",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM — thank you",
  keywords: ["thank you", "contact confirmation", "Kuyakhanya FM"],
});

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-[#0b0a14] py-20 sm:py-28">
      <div aria-hidden className="absolute top-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/15 blur-[100px]" />
      <div aria-hidden className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-[#FFD700]/5 blur-[110px]" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-[#110a1f] p-8 text-center shadow-2xl sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFD700] text-2xl font-black text-[#1a0b2e]">
            ✓
          </span>
          <h1 className="mt-6 font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
            Thank you! <span className="text-gradient-gold">Message received.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-[15px]">
            Your message is on its way to the KUYAKHANYA FM team. We usually respond within a day —
            keep shining brighter with us.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#FFD700] px-7 py-3.5 text-sm font-black text-[#1a0b2e] transition hover:bg-[#ffe873]"
            >
              ← Back to Home
            </Link>
            <Link
              href="/#listen-live"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Listen Live
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
