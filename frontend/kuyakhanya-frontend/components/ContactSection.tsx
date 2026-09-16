import { siteData } from "@/lib/site-data";
import ContactForm from "./ContactForm";
import { FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon, WebsiteIcon, WhatsAppIcon, MailIcon, PhoneIcon } from "@/components/SocialIcons";

export default function ContactSection() {
  const c = siteData.contact;
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b0a14] border-y border-white/10 py-14 sm:py-20">
      <div aria-hidden className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-[#4B0082]/15 blur-[80px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.03] dotted" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.32em] text-[#FFD700] uppercase">Contact Us</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            We’d love to hear from you
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-white/60">
            Drop us a message or reach us on any of the channels below.
          </p>
          <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300] shadow-[0_0_12px_rgba(255,215,0,0.3)]" />
        </div>

        <div className="relative mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact info — premium dark glass with best vector icons */}
          <div className="space-y-4">
            <a href={`tel:${c.phone}`} className="group flex items-center gap-4 rounded-2xl glass-purple px-5 py-4 hover-lift">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#FFD700] text-[#1a0b2e] shadow"><PhoneIcon size={20} className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs font-bold tracking-wide text-[#FFD700] uppercase">Phone</span>
                <span className="text-sm font-bold text-white">{c.phone}</span>
              </span>
            </a>

            <a href={c.whatsappLink} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl glass-purple px-5 py-4 hover-lift">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white shadow"><WhatsAppIcon size={20} className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs font-bold tracking-wide text-[#FFD700] uppercase">WhatsApp</span>
                <span className="text-sm font-bold text-white">{c.whatsapp}</span>
              </span>
            </a>

            <a href={`mailto:${c.email}`} className="group flex items-center gap-4 rounded-2xl glass-purple px-5 py-4 hover-lift break-all">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#FFD700] to-[#ffb300] text-[#1a0b2e] shadow"><MailIcon size={20} className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block text-xs font-bold tracking-wide text-[#FFD700] uppercase">Email</span>
                <span className="text-sm font-bold text-white">{c.email}</span>
              </span>
            </a>

            <div className="rounded-2xl glass-purple p-5">
              <p className="text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">Follow Us</p>
              <div className="mt-4 grid grid-cols-5 gap-2.5">
                {[
                  { label: "Facebook", href: c.facebook, Icon: FacebookIcon },
                  { label: "Instagram", href: c.instagram, Icon: InstagramIcon },
                  { label: "YouTube", href: c.youtube, Icon: YouTubeIcon },
                  { label: "TikTok", href: c.tiktok, Icon: TikTokIcon },
                  { label: "Website", href: "https://kuyakhanyafm.web.app", Icon: WebsiteIcon },
                ].map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="group grid h-12 w-12 place-items-center rounded-xl bg-white/10 border border-white/10 backdrop-blur hover:bg-[#FFD700] hover:text-[#1a0b2e] hover:border-[#FFD700] hover:shadow-[0_0_16px_rgba(255,215,0,0.35)] hover:-translate-y-0.5 transition-all duration-300">
                    <Icon size={20} className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  { l: "Facebook", h: c.facebook },
                  { l: "Instagram", h: c.instagram },
                  { l: "YouTube", h: c.youtube },
                  { l: "TikTok", h: c.tiktok },
                ].map(({ l, h }) => (
                  <a key={l} href={h} target="_blank" rel="noreferrer" className="text-[11px] font-semibold text-white/60 hover:text-[#FFD700] transition">{l} •</a>
                ))}
                <span className="text-[11px] text-white/35">kuyakhanyafm.web.app</span>
              </div>
            </div>
          </div>

          {/* Backend-integrated form — premium dark */}
          <div className="rounded-[32px] glass-purple p-6 sm:p-9">
            <h3 className="font-heading text-xl font-black tracking-tight text-white">Send us a message</h3>
            <p className="mt-1 text-sm text-white/60">We usually respond within a day.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Location Map — moved from footer */}
        <div className="mt-10 overflow-hidden rounded-[24px] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d826.916314961269!2d22.482814791010206!3d-34.001130845652355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dd61b005ffa49d7%3A0x273e4a0b0c6f9d47!2sKuyakhanya%20FM!5e0!3m2!1sen!2sza!4v1788294598860!5m2!1sen!2sza"
            width={400}
            height={300}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Kuyakhanya FM Location — Thembalethu, George"
            className="block w-full h-[300px] sm:h-[340px]"
          />
        </div>
      </div>
    </section>
  );
}
