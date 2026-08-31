import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/lib/site-data";

export default function TeamPreview() {
  return (
    <section id="team-preview" className="py-16 sm:py-24 bg-[#faf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Our Team</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">
              The people behind the mic
            </h2>
            <div className="mt-5 rule" />
          </div>
          <Link
            href="/team"
            className="inline-flex items-center rounded-full bg-[#6a0dad] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#4b0082] transition-colors shadow-md"
          >
            View Full Team →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {/* Managing Director */}
          <div className="sm:col-span-3 lg:col-span-1 rounded-[32px] grad-card border border-zinc-200 bg-white p-7 text-center shadow-soft">
            <div className="relative mx-auto h-32 w-32">
              <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6a0dad] to-[#ffd700] blur-lg opacity-40" />
              <Image
                src={siteData.managingDirector.photo}
                alt={siteData.managingDirector.name}
                width={200}
                height={200}
                className="relative mx-auto h-32 w-32 rounded-full object-cover border-4 border-[#ffd700] shadow-lg"
              />
            </div>
            <h3 className="mt-5 font-display font-extrabold text-ink text-lg">{siteData.managingDirector.name}</h3>
            <p className="text-xs font-bold tracking-[0.2em] text-[#6a0dad] uppercase mt-1">{siteData.managingDirector.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 line-clamp-3 mx-auto max-w-[30ch]">{siteData.managingDirector.bio}</p>
          </div>

          {/* Management + technician preview */}
          <div className="sm:col-span-3 lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...siteData.managementTeam, siteData.technician].map((m) => (
              <div key={m.name} className="rounded-[24px] grad-card border border-zinc-200 bg-white p-5 text-center shadow-soft">
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={160}
                  height={160}
                  className="mx-auto h-20 w-20 rounded-full object-cover border-4 border-[#ffd700]/70 shadow"
                />
                <p className="mt-4 font-display font-bold text-ink leading-tight">{m.name}</p>
                <p className="text-[11px] font-bold tracking-widest text-[#6a0dad] uppercase mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* presenters mini-grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {siteData.presenters.slice(0, 10).map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-2xl grad-card border border-zinc-200 bg-white p-3 shadow-soft">
              <Image src={p.photo} alt={p.name} width={56} height={56} className="h-11 w-11 rounded-full object-cover shrink-0 border-2 border-[#ffd700]/60" />
              <div className="min-w-0">
                <p className="text-xs font-bold leading-tight text-ink truncate">{p.name}</p>
                <p className="text-[11px] text-zinc-500 truncate">{p.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/team" className="inline-flex items-center rounded-full border border-[#e6ddf5] bg-white px-6 py-2.5 text-sm font-bold text-[#6a0dad] hover:bg-[#f7f4fc] transition-colors shadow-sm">
            See all {siteData.presenters.length} presenters
          </Link>
        </div>
      </div>
    </section>
  );
}
