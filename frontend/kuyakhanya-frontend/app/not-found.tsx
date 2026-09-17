import Link from "next/link";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shows-presenters", label: "Programmes" },
  { href: "/media-centre", label: "Media Centre" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2e0b56] to-[#4b0082] flex items-center">
      {/* Ambient orbs */}
      <div aria-hidden className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#6a0dad]/40 blur-[110px] animate-drift" />
      <div aria-hidden className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#8a2be2]/30 blur-[120px] animate-drift" />
      <div aria-hidden className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-[#ffd700]/10 blur-[100px] animate-float-slow" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        {/* Oversized 404 */}
        <p className="text-sm font-bold tracking-[0.4em] text-[#ffd700] uppercase">Page not found</p>

        <div className="relative mt-4 select-none">
          <span
            aria-hidden
            className="block text-[clamp(6rem,24vw,16rem)] leading-none font-extrabold tracking-tight text-transparent"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.25)" }}
          >
            404
          </span>
          <span className="absolute inset-0 grid place-items-center text-[clamp(6rem,24vw,16rem)] leading-none font-extrabold tracking-tight shimmer">
            404
          </span>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
          You’ve drifted off the airwaves
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-white/75 text-sm sm:text-base">
          The page you’re looking for has been moved, is still being produced, or never hit the studio. Let’s get you back to a signal that’s live.
        </p>

        {/* Primary action */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#ffd700] px-7 py-3.5 text-sm font-extrabold text-[#4b0082] shadow-lg shadow-black/20 hover:bg-[#ffe873] transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/#listen-live"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white border border-white/20 backdrop-blur hover:bg-white/15 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Listen Live
          </Link>
        </div>

        {/* Quick links */}
        <div className="mx-auto mt-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/50">Or jump straight to</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/20 hover:text-white transition-colors backdrop-blur"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
