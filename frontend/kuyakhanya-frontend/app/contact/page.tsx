import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us | KUYAKHANYA FM",
  description: "Get in touch with KUYAKHANYA FM — phone 0639780839, WhatsApp, email info.kuyakhanyafm@gmail.com, Thembalethu George, and live map.",
  path: "/contact",
  image: "/images/team_image.jpg",
  imageAlt: "Contact KUYAKHANYA FM — Thembalethu, George",
  keywords: ["contact Kuyakhanya FM", "Thembalethu radio contact", "WhatsApp", "George"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>We’d love to hear from you</>}
        subtitle="Requests, testimonies, partnerships — reach us via phone, WhatsApp, email or the form below."
      />
      <ContactSection />
    </>
  );
}
