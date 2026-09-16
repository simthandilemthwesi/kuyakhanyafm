import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import BannerAd from "@/components/BannerAd";

export const metadata: Metadata = pageMetadata({
  title: "Our Mobile Applications | KUYAKHANYA FM",
  description: "Download KUYAKHANYA FM on Google Play, Apple App Store, and Huawei AppGallery. Coming soon – tap to grab the Android APK prototype.",
  path: "/download",
  image: "/images/Kuyakhanya FM Icon.png",
  imageAlt: "KUYAKHANYA FM Mobile Apps",
  keywords: ["Kuyakhanya FM app", "Android APK", "mobile radio", "Google Play", "App Store"],
});

export default function DownloadPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0a14] py-20 sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute top-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/15 blur-[100px]" />
        <div aria-hidden className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-[#FFD700]/5 blur-[110px]" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">MOBILE APPLICATIONS</p>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Listen Anywhere,{" "}
            <span className="text-gradient-gold">Shine Brighter</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-[15px] leading-relaxed text-white/65">
            KUYAKHANYA FM is coming to your phone. Tap the store icons below to be notified the moment we go live – or grab the Android prototype now.
          </p>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* Store badges — single image, Coming Soon on top */}
          <div className="mx-auto mb-12 max-w-xl">
            <div className="mb-4 flex justify-center">
              <span className="rounded-full bg-[#1a0b2e] px-4 py-1.5 text-[11px] font-black tracking-[0.2em] text-[#FFD700] uppercase">
                Coming Soon
              </span>
            </div>
            <div className="overflow-hidden rounded-[28px] border-2 border-[#ffd700]/40 bg-white shadow-sm">
              <Image
                src="/images/store_icons.jpg"
                alt="Google Play, App Store and AppGallery — coming soon"
                width={900}
                height={300}
                sizes="(max-width: 640px) 100vw, 576px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Download CTA */}
          <div className="mx-auto max-w-lg text-center">
            <Link
              href="/downloads/kuyakhanya-fm.apk"
              download="kuyakhanya-fm.apk"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#6a0dad] to-[#8a2be2] px-8 py-4 text-sm font-extrabold text-white shadow-lg transition hover:from-[#4b0082] hover:to-[#6a0dad] hover:shadow-[0_0_30px_rgba(106,13,173,0.4)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#FFD700] animate-pulse" />
              Download Android Prototype APK
            </Link>
            <p className="mt-4 text-xs text-zinc-500">Direct prototype link • v1.0 • Free</p>
          </div>
        </div>
      </section>
      <BannerAd />
    </>
  );
}