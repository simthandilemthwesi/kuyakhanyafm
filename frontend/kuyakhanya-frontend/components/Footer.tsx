import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/lib/site-data";
import { FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon, WebsiteIcon, WhatsAppIcon, MailIcon, PhoneIcon } from "@/components/SocialIcons";

export default function Footer() {
  const c = siteData.contact;
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4b0082] text-white">
      <div aria-hidden className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-[#6a0dad]/30 blur-[100px]" />
      <div aria-hidden className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3">
            <Image
              src="/images/Kuyakhanya FM Icon.png"
              alt="KUYAKHANYA FM"
              width={52}
              height={52}
              className="h-12 w-12 rounded-xl object-cover border border-white/20 shrink-0 shadow-md"
            />
            <div>
              <h3 className="font-display font-extrabold leading-tight tracking-tight">KUYAKHANYA <span className="text-[#ffd700]">FM</span></h3>
              <p className="text-sm text-[#ffd700] font-medium">We Shine Brighter Together</p>
              <p className="mt-3 text-sm text-white/75 max-w-[30ch] leading-relaxed">
                Online radio from Thembalethu, George — bringing light through Christ.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#ffd700] mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li><Link href="/about" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Services</Link></li>
              <li><Link href="/programmes" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Programmes</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>News & Updates</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#ffd700] mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li><Link href="/join" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Join Our Team</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Partners</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Terms of Use</Link></li>
              <li><Link href="/#vision-mission" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Vision & Mission</Link></li>
              <li><Link href="/#listen-live" className="hover:text-white transition-colors inline-flex items-center gap-2"><span className="text-[#ffd700]">›</span>Listen Live</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#ffd700] mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/85">
              <p className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#ffd700]"><PhoneIcon size={16} className="h-4 w-4" /></span>
                <a href={`tel:${c.phone}`} className="hover:text-white transition-colors">{c.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#25D366]"><WhatsAppIcon size={16} className="h-4 w-4" /></span>
                <a href={c.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Chat</a>
              </p>
              <p className="flex items-start gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-[#ffd700]"><MailIcon size={16} className="h-4 w-4" /></span>
                <a href={`mailto:${c.email}`} className="hover:text-white transition-colors break-all">{c.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#ffd700]"><WebsiteIcon size={16} className="h-4 w-4" /></span>
                <a href="https://kuyakhanyafm.web.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">kuyakhanyafm.web.app</a>
              </p>
              <div className="flex gap-2.5 pt-3">
                {[
                  { href: c.facebook, label: "Facebook", Icon: FacebookIcon },
                  { href: c.instagram, label: "Instagram", Icon: InstagramIcon },
                  { href: c.youtube, label: "YouTube", Icon: YouTubeIcon },
                  { href: c.tiktok, label: "TikTok", Icon: TikTokIcon },
                  { href: "https://kuyakhanyafm.web.app", label: "Website", Icon: WebsiteIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="group h-10 w-10 grid place-items-center rounded-full bg-white/10 border border-white/10 backdrop-blur hover:bg-[#ffd700] hover:text-[#1a0b2e] hover:border-[#ffd700] hover:shadow-[0_0_18px_rgba(255,215,0,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon size={18} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
              <p className="pt-1 text-xs text-white/45">Follow • Share • Shine together</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
          <p className="text-white/60">© {new Date().getFullYear()} KUYAKHANYA FM. All rights reserved.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition-colors">
            Designed by <span className="inline-flex items-center gap-1.5 text-[#ffd700]"><Image src="/simlogo.svg" alt="Simthandile" width={28} height={28} className="h-5 w-5 rounded bg-white" /> Simthandile</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
