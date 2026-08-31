import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { siteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news, announcements and updates from KUYAKHANYA FM.",
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return d;
  }
}

export default function NewsPage() {
  const items = siteData.news;

  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title={<>What’s new at KUYAKHANYA FM</>}
        subtitle="Announcements, events and stories from the studio."
      />

      <section className="py-16 sm:py-24 bg-[#faf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="rounded-[32px] grad-card border border-dashed border-zinc-300 bg-white p-16 text-center shadow-soft">
              <span className="text-3xl">📰</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-ink">No news yet</h2>
              <p className="mt-2 text-zinc-500 max-w-md mx-auto">Stories and announcements will appear here soon. Check back for updates!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((n) => (
                <article key={n.slug} className="group rounded-[32px] grad-card border border-zinc-200 bg-white overflow-hidden shadow-soft hover:-translate-y-1.5 hover:shadow-lift transition duration-300 flex flex-col">
                  <div className="overflow-hidden">
                    <Image
                      src={n.coverImage}
                      alt={n.title}
                      width={600}
                      height={400}
                      className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-[#6a0dad] uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffd700]" />
                      {formatDate(n.date)} • {n.author}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-extrabold leading-snug tracking-tight text-ink">{n.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 line-clamp-3 flex-1">{n.excerpt}</p>
                    <div className="mt-5 pt-4 border-t border-[#ede6f8]">
                      <Link href="/contact" className="text-sm font-bold text-[#6a0dad] hover:text-[#4b0082] transition-colors">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
