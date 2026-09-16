import Image from "next/image";
import { shareTarget, SITE_URL } from "@/lib/share";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  WhatsAppIcon,
  LinkedInIcon,
} from "@/components/SocialIcons";

const NETWORKS = [
  { id: "facebook", label: "Facebook", Icon: FacebookIcon },
  { id: "instagram", label: "Instagram", Icon: InstagramIcon },
  { id: "youtube", label: "YouTube", Icon: YouTubeIcon },
  { id: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
  { id: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
] as const;

type ProfileCardProps = {
  name: string;
  role: string;
  bio?: string;
  photo: string;
  /** Page path used for the share links, e.g. "/team". */
  sharePath?: string;
};

/**
 * ProfileCard — KUYAKHANYA FM presenter/management profile.
 * Rounded rectangle, 1:1 portrait on top, bold name + role,
 * one-sentence tagline, share-only social icons.
 * Equal-height friendly: h-full flex column with clamped zones.
 */
export default function ProfileCard({
  name,
  role,
  bio,
  photo,
  sharePath = "/team",
}: ProfileCardProps) {
  const tagline = bio ?? `Host of ${role} on KUYAKHANYA FM.`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-transparent bg-[#f9f9f9] text-center shadow-[0_10px_30px_-12px_rgba(88,33,125,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b0d136] hover:shadow-[0_0_0_1px_#b0d136,0_20px_45px_-12px_rgba(88,33,125,0.45)]">
      <div className="mx-auto mt-6 h-36 w-36 shrink-0 sm:h-40 sm:w-40">
        <Image
          src={photo}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full rounded-2xl border-2 border-[#b0d136]/50 object-cover transition group-hover:border-[#b0d136]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
        <h3 className="font-display text-[15px] font-black leading-tight text-[#58217d] line-clamp-1">
          {name}
        </h3>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#58217d]/70 line-clamp-1">
          {role}
        </p>
        <div className="mx-auto mt-2 h-[2px] w-10 rounded-full bg-[#b0d136]" aria-hidden />
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-600 line-clamp-2">
          {tagline}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          {NETWORKS.map(({ id, label, Icon }) => (
            <a
              key={id}
              href={
                shareTarget(id, {
                  url: `${SITE_URL}${sharePath}`,
                  title: `${name} — ${role} | KUYAKHANYA FM`,
                  description: tagline,
                }).url
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share ${name} on ${label}`}
              title={label}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#58217d]/10 text-[#58217d] transition hover:bg-[#b0d136] hover:text-[#1a0b2e]"
            >
              <Icon size={15} className="h-[15px] w-[15px]" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
