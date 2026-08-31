import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { siteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore the services KUYAKHANYA FM offers — live streaming, outreach, event coverage, youth development, audio production and marketing.",
};

export default function ServicesPage() {
  const services = siteData.services;

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>How we serve our community</>}
        subtitle="From live gospel radio to community outreach and audio production — discover the ways we shine brighter together."
      />

      <section className="py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="rounded-[32px] grad-card border border-dashed border-zinc-300 bg-white p-16 text-center shadow-soft">
              <span className="text-3xl">🎙️</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-ink">Services coming soon</h2>
              <p className="mt-2 text-zinc-500 max-w-md mx-auto">We’re putting the finishing touches on our service lineup. Check back shortly!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <div key={s.slug} className="group rounded-[32px] grad-card border border-zinc-200 bg-white p-4 shadow-soft hover:-translate-y-1.5 hover:shadow-lift transition duration-300 flex flex-col">
                  <div className="overflow-hidden rounded-3xl">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={600}
                      height={400}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#6a0dad] uppercase">Service 0{i + 1}</span>
                    <h2 className="mt-1.5 font-display text-xl font-extrabold tracking-tight text-ink">{s.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 flex-1">{s.description}</p>
                    <div className="mt-5 pt-4 border-t border-[#ede6f8] flex items-center justify-between">
                      <Link href="/contact" className="text-sm font-bold text-[#6a0dad] hover:text-[#4b0082] transition-colors">
                        Enquire →
                      </Link>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f7f4fc] text-[#6a0dad] transition group-hover:bg-[#6a0dad] group-hover:text-white">
                        ✦
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
