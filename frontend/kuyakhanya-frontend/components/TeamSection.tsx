import Link from "next/link";
import { siteData } from "@/lib/site-data";

function StaffCard({
  name,
  role,
  bio,
  isVacancy,
  vacancyDesc,
}: {
  name: string;
  role: string;
  bio?: string;
  isVacancy?: boolean;
  vacancyDesc?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (isVacancy) {
    return (
      <div className="group relative flex flex-col rounded-[28px] glass-purple overflow-hidden hover-lift border-2 border-dashed border-[#FFD700]/30">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#8a2be2]/10" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
        <div className="relative p-7 sm:p-8 flex flex-col flex-1 text-center">
          <span className="mx-auto inline-flex items-center rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-black tracking-[0.16em] text-[#1a0b2e]">VACANCY</span>
          <div className="mt-6 circular-frame h-28 w-28 mx-auto opacity-90">
            <div className="circular-frame-inner h-full w-full grid place-items-center bg-[#0b0a14] border-2 border-dashed border-[#FFD700]/30">
              <span className="text-2xl">＋</span>
              <span className="absolute bottom-1 text-[8px] tracking-[0.16em] font-bold text-white/40">OPEN</span>
            </div>
          </div>
          <h3 className="mt-5 font-heading text-lg font-black tracking-tight text-white">{name}</h3>
          <p className="mt-1 text-xs font-black tracking-[0.16em] text-[#FFD700]">OPEN POSITION</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60 flex-1">{vacancyDesc}</p>
          <p className="mt-4 text-xs font-semibold text-white/50">Join the KUYAKHANYA FM team.</p>
          <Link href="/contact" className="mt-5 inline-flex justify-center rounded-full bg-[#FFD700] px-6 py-2.5 text-xs font-black text-[#1a0b2e] hover:bg-[#ffe873] transition">
            VIEW OPPORTUNITY
          </Link>
        </div>
        <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-[28px] glass-purple overflow-hidden hover-lift text-center">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="p-7 sm:p-8 flex flex-col flex-1">
        <div className="circular-frame h-28 w-28 sm:h-32 sm:w-32 mx-auto">
          <div className="circular-frame-inner h-full w-full grid place-items-center bg-gradient-to-br from-[#1a0b2e] to-[#4B0082] relative overflow-hidden">
            <div className="absolute inset-0 opacity-25 dotted" />
            <span className="relative text-xl font-black tracking-wide text-[#FFD700]">{initials}</span>
          </div>
        </div>
        <h3 className="mt-5 font-heading text-lg font-black leading-tight text-white">{name}</h3>
        <p className="mt-1 text-xs font-black tracking-[0.16em] text-[#FFD700]">{role}</p>
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
            Leadership, media and technical hearts serving Thembalethu — plus open doors to join us.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" } as React.CSSProperties}>
          {/* Managing Director — preserve existing */}
          <div style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
            <StaffCard name={siteData.managingDirector.name} role={siteData.managingDirector.role} bio={siteData.managingDirector.bio} />
          </div>
          {/* Media Manager — preserve existing */}
          <div style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
            <StaffCard name={siteData.managementTeam[1].name} role={siteData.managementTeam[1].role} bio={siteData.managementTeam[1].bio} />
          </div>
          {/* Station Manager — VACANCY per spec */}
          <div style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
            <StaffCard name="STATION MANAGER" role="VACANCY" isVacancy vacancyDesc="Lead station operations, programming and community partnerships." />
          </div>
          {/* Technician — VACANCY per spec */}
          <div style={{ transformStyle: "preserve-3d" } as React.CSSProperties}>
            <StaffCard name="TECHNICIAN" role="VACANCY" isVacancy vacancyDesc="Support technical and broadcast operations — studio, streaming and live events." />
          </div>
        </div>
      </div>
    </section>
  );
}
