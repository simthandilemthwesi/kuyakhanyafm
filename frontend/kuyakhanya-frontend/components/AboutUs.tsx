import Link from "next/link";
import { siteData } from "@/lib/site-data";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">About Us</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#1a0b2e]">
              A beacon of hope in <span className="text-gradient-purple">Thembalethu & beyond</span>
            </h2>
            <div className="mt-5 rule" />
            <p className="mt-6 text-[15px] sm:text-lg leading-relaxed text-zinc-600">
              {siteData.about}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              {[
                { icon: "♪", title: "Uplifting Music", desc: "Curated gospel & inspiration" },
                { icon: "✧", title: "Community Shows", desc: "Local voices & talent" },
                { icon: "✝", title: "Faith & Growth", desc: "Messages that transform" },
                { icon: "✦", title: "Youth Focus", desc: "Skills & mentorship" },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl grad-card bg-white border border-zinc-100 p-5 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#6a0dad] to-[#8a2be2] text-[#ffd700] text-lg">{f.icon}</span>
                  <p className="mt-3 font-bold text-[#1a0b2e] text-[15px]">{f.title}</p>
                  <p className="mt-0.5 text-sm text-zinc-500 leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-7 inline-flex items-center rounded-full bg-[#6a0dad] px-6 py-3 text-sm font-bold text-white hover:bg-[#4b0082] transition-colors shadow-md">
              Learn more about us →
            </Link>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-[#6a0dad]/20 via-transparent to-[#ffd700]/20 blur-2xl" />
            <div className="relative rounded-[32px] overflow-hidden border border-zinc-200 shadow-lift bg-white">
              <img
                src="/images/team_image.jpg"
                alt="Kuyakhanya FM team"
                className="h-[340px] w-full object-cover sm:h-[440px]"
                loading="lazy"
              />
              <div className="p-5 sm:p-6">
                <p className="font-display font-extrabold text-[#1a0b2e]">We Shine Brighter Together</p>
                <p className="text-sm text-zinc-500">Thembalethu • George • Western Cape</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
