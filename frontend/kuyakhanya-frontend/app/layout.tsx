import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AudioProvider } from "@/components/AudioProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0b0a14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "KUYAKHANYA FM — We Shine Brighter Together",
    template: "%s | KUYAKHANYA FM",
  },
  description:
    "KUYAKHANYA FM — Online Christian radio from Thembalethu, George. Uplifting music, inspirational messages, and community programs bringing light through Christ.",
  keywords: [
    "Kuyakhanya FM",
    "online radio",
    "Christian radio",
    "Thembalethu",
    "George",
    "South Africa",
    "gospel",
    "community radio",
  ],
  authors: [{ name: "Simthandile Mthwesi" }],
  metadataBase: new URL("https://kuyakhanyafm.web.app"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://kuyakhanyafm.web.app",
    siteName: "KUYAKHANYA FM",
    title: "KUYAKHANYA FM — We Shine Brighter Together",
    description:
      "Bringing light to Thembalethu through Christ — uplifting music, inspirational messages, and community programs.",
    images: [{ url: "/images/team_image.jpg", width: 1200, height: 630, alt: "KUYAKHANYA FM team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KUYAKHANYA FM",
    description: "We Shine Brighter Together — Thembalethu's light via radio.",
  },
  verification: {
    google: "5xpY0V-DR-U_GmbHXTEE2ZceAvZB6ay2Kesnqzi7hI8",
  },
  icons: { icon: "/images/Kuyakhanya FM Icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0b0a14] text-[#F8F8FF] antialiased overflow-x-hidden">
        <AudioProvider>
          {/* Broadcast ambient layers — fixed */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#4B0082]/30 blur-[120px] animate-glow-pulse" />
            <div className="absolute top-[18%] -right-24 h-[420px] w-[420px] rounded-full bg-[#8a2be2]/20 blur-[130px] animate-glow-pulse" style={{ animationDelay: "1.2s" }} />
            <div className="absolute bottom-0 left-1/3 h-[600px] w-[700px] rounded-full bg-[#FFD700]/[0.04] blur-[140px]" />
            {/* diagonal geometric */}
            <div className="absolute top-[30%] left-0 h-[1px] w-[70%] bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent rotate-[-8deg]" />
            <div className="absolute top-[42%] left-0 h-[1px] w-[55%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[-8deg]" />
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AudioProvider>
      </body>
    </html>
  );
}
