import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Geist_Mono, Rubik, Bitter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd, { radioStationJsonLd, organizationJsonLd } from "@/components/JsonLd";
import { AudioProvider } from "@/components/AudioProvider";
import AppDownloadPopup from "@/components/AppDownloadPopup";
import PopupAd from "@/components/PopupAd";
import SidebarAd from "@/components/SidebarAd";
import VignetteAd from "@/components/VignetteAd";
import CookieBanner from "@/components/CookieBanner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import ProfileModalProvider from "@/components/ProfileModalProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});
const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0a14",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const SITE_URL = "https://kuyakhanyafm.web.app";
const SITE_NAME = "KUYAKHANYA FM";
const SITE_DESC =
  "KUYAKHANYA FM — Online Christian radio from Thembalethu, George. Uplifting music, inspirational messages, and community programs bringing light through Christ. We Shine Brighter Together.";

export const metadata: Metadata = {
  title: {
    default: "KUYAKHANYA FM — We Shine Brighter Together",
    template: "%s | KUYAKHANYA FM",
  },
  description: SITE_DESC,
  keywords: [
    "Kuyakhanya FM",
    "online radio",
    "Christian radio",
    "Thembalethu",
    "George",
    "South Africa",
    "gospel",
    "community radio",
    "We Shine Brighter Together",
    "live radio streaming",
    "Western Cape radio",
    "faith radio",
  ],
  authors: [{ name: "Simthandile Mthwesi", url: "https://simthandilemthwesi.vercel.app" }],
  creator: "Simthandile Mthwesi",
  publisher: SITE_NAME,
  category: "Music & Religion",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: { "en-ZA": "/", "en": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "KUYAKHANYA FM — We Shine Brighter Together",
    description:
      "Bringing light to Thembalethu through Christ — live 24/7, presenters, shows, news & community. Listen live now.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "KUYAKHANYA FM — We Shine Brighter Together | Thembalethu, George",
      },
      { url: "/images/team 1.png", width: 1200, height: 630, alt: "KUYAKHANYA FM team — Thembalethu" },
      { url: "/images/Kuyakhanya FM Icon.png", width: 512, height: 512, alt: "KUYAKHANYA FM Icon" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KuyakhanyaFM",
    creator: "@KuyakhanyaFM",
    title: "KUYAKHANYA FM — We Shine Brighter Together",
    description: "Live Christian radio from Thembalethu, George. Music, shows, presenters & community — 24/7.",
    images: ["/images/og-image.png", "/images/team 1.png"],
  },
  verification: {
    google: "WYqd-jCyaCfFiV0lY5ugrmAlbOoDJFCaRae4Od6pvAo",
  },
  other: {
    "google-adsense-account": "ca-pub-6092968632954371",
  },
  icons: {
    icon: [
      { url: "/images/Kuyakhanya FM Icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true, email: true, address: true },
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${geistMono.variable} ${rubik.variable} ${bitter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0b0a14] text-[#F8F8FF] antialiased overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PT746VX5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={radioStationJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <AudioProvider>
          {/* Google Tag Manager */}
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PT746VX5');`}
          </Script>
          {/* Google tag (gtag.js) — GA4 Kuyakhanya FM */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VED5B4WH4B" strategy="afterInteractive" />
          <Script id="gtag-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-VED5B4WH4B');`}
          </Script>
          {/* Google AdSense — plain script tag (next/script adds data-nscript, which AdSense warns about) */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6092968632954371"
            crossOrigin="anonymous"
          />
          {/* Broadcast ambient layers — fixed */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#4B0082]/30 blur-[120px] animate-glow-pulse" />
            <div className="absolute top-[18%] -right-24 h-[420px] w-[420px] rounded-full bg-[#8a2be2]/20 blur-[130px] animate-glow-pulse" style={{ animationDelay: "1.2s" }} />
            <div className="absolute bottom-0 left-1/3 h-[600px] w-[700px] rounded-full bg-[#FFD700]/[0.04] blur-[140px]" />
            {/* diagonal geometric */}
            <div className="absolute top-[30%] left-0 h-[1px] w-[70%] bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent rotate-[-8deg]" />
            <div className="absolute top-[42%] left-0 h-[1px] w-[55%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[-8deg]" />
          </div>
          <ProfileModalProvider>
          <Header />
          <SidebarAd image="/images/octotel_sidebar.png" title="Octotel ISP" link="https://octotel.co.za/isp/" />
          <main className="flex-1">{children}</main>
          <Footer />
          <AppDownloadPopup />
          <PopupAd image="/images/octotel_pop_up.png" title="Octotel ISP" link="https://octotel.co.za/isp/" />
          <VignetteAd />
          <CookieBanner />
          <ServiceWorkerRegister />
          </ProfileModalProvider>
        </AudioProvider>
        {/* Chatbase AI chat bubble — Simbot (Mnj8LreLagzhOq40QMKDW) — keep script exactly as provided, before </body> */}
        <Script id="chatbase-embed" strategy="afterInteractive">
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="Mnj8LreLagzhOq40QMKDW";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
        </Script>
      </body>
    </html>
  );
}
