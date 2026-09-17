import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { managers } from "@/lib/people";
import { SITE_URL } from "@/lib/share";
import { pageMetadata } from "@/lib/seo";
import MasterCard from "@/components/MasterCard";
import BannerAd from "@/components/BannerAd";
import ShareBar from "@/components/ShareBar";

export function generateStaticParams() {
  return managers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = managers.find((p) => p.slug === slug);
  if (!person) return {};
  return pageMetadata({
    title: `${person.name} — ${person.role} | KUYAKHANYA FM`,
    description: person.bio,
    path: `/team/${slug}`,
    image: encodeURI(person.photo),
    imageAlt: `${person.name}, ${person.role} at KUYAKHANYA FM`,
    type: "profile",
  });
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = managers.find((p) => p.slug === slug);
  if (!person) notFound();
  const others = managers.filter((p) => p.slug !== slug).slice(0, 3);
  const url = `${SITE_URL}/team/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    description: person.bio,
    image: `${SITE_URL}${encodeURI(person.photo)}`,
    jobTitle: person.role,
    url,
    worksFor: {
      "@type": "RadioStation",
      name: "KUYAKHANYA FM",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="relative overflow-hidden bg-[#0b0a14] py-16 sm:py-24">
        <div aria-hidden className="absolute top-0 right-1/4 h-[380px] w-[380px] rounded-full bg-[#4B0082]/14 blur-[100px]" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[30px] border-2 border-[#FFD700] shadow-[0_18px_50px_-16px_rgba(75,0,130,0.65)]">
              <Image
                src={person.photo}
                alt={`${person.name}, ${person.role} at KUYAKHANYA FM`}
                fill
                sizes="(max-width: 640px) 90vw, 320px"
                className="object-cover object-top"
                priority
              />
            </div>
            <p className="mt-6 text-[11px] font-black tracking-[0.32em] text-[#FFD700] uppercase">
              {person.role}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-black uppercase tracking-wide text-[#F8F8FF] sm:text-5xl">
              {person.name}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#FFD700] sm:text-base">
              &ldquo;{person.bio}&rdquo;
            </p>
            <div className="mt-6">
              <ShareBar
                title={`${person.name} — ${person.role} | KUYAKHANYA FM`}
                text={person.bio}
                path={`/team/${slug}`}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/team"
                className="inline-flex rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/15 transition"
              >
                ← Our Team
              </Link>
              <Link
                href="/presenters"
                className="inline-flex rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/15 transition"
              >
                Presenters →
              </Link>
            </div>
          </div>

          <BannerAd />

          <div className="mx-auto mt-14 max-w-5xl">
            <h2 className="text-center font-heading text-xl font-black tracking-tight text-white sm:text-2xl">
              More people behind <span className="text-gradient-gold">the mic</span>
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {others.map((p) => (
                <MasterCard key={p.slug} person={p} profilePath={`/team/${p.slug}`} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
