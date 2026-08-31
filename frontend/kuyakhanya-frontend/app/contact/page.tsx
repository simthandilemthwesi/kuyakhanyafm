import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with KUYAKHANYA FM — phone, WhatsApp, email, socials, and message form.",
};

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
