import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/lib/site-data";

function StaffCard({
  name,
  role,
  bio,
  photo,
}: {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group relative flex h-full flex-col rounded-[28px] glass-purple overflow-hidden hover-lift text-center">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="p-7 sm:p-8 flex flex-col flex-1">
        <div className="circular-frame h-28 w-28 sm:h-32 sm:w-32 mx-auto">
          {photo ? (
            <div className="circular-frame-inner h-full w-full relative overflow-hidden">
              <Image
                src={photo}
                alt={name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="circular-frame-inner h-full w-full grid place-items-center bg-gradient-to-br from-[#1a0b2e] to-[#4B0082] relative overflow-hidden">
              <div className="absolute inset-0 opacity-25 dotted" />
              <span className="relative text-xl font-black tracking-wide text-[#FFD700]">{initials}</span>
            </div>
          )}
        </div>
        <h3 className="mt-5 font-heading text-lg font-black leading-tight text-white line-clamp-1">{name}</h3>
        <p className="mt-1 text-xs font-black tracking-[0.16em] text-[#FFD700] line-clamp-1">{role}</p>
        {bio && <p className="mt-3 text-sm leading-relaxed text-white/65 line-clamp-3">{bio}</p>}
        <div className="mt-4 flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition">
          <span className="h-7 w-7 grid place-items-center rounded-full bg-white/10 border border-white/10 text-white text-xs">↗</span>
        </div>
      </div>
      <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#FFD700]/30 transition" />
    </div>
  );
}

export default function TeamSection() {
  const staff = [
    siteData.managingDirector,
    siteData.managementTeam[0],
    siteData.managementTeam[1],
    siteData.technician,
  ];

  return (
    <section id="team" className="relative py-16 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0a14] via-[#110a1f] to-[#0b0a14]" />
      <div aria-hidden className="absolute top-10 right-1/4 h-[420px] w-[420px] rounded-full bg-[#4B0082]/12 blur-[100px]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.02] grid-pattern" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black tracking-[0.32em] text-[#FFD700]">OUR TEAM</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            The people behind <span className="text-gradient-gold">the mic</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            Leadership, media and technical hearts serving Thembalethu.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" } as React.CSSProperties}>
          {staff.map((p) => (
            <div key={p.name} style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
              <StaffCard name={p.name} role={p.role} bio={p.bio} photo={p.photo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
