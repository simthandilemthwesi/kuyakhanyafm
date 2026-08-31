"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/#shows", label: "SHOWS" },
  { href: "/#presenters", label: "PRESENTERS" },
  { href: "/#listen-live", label: "LISTEN LIVE" },
  { href: "/news", label: "NEWS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-[#0b0a14]/78 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_8px_40px_-16px_rgba(0,0,0,0.7)]"
            : "bg-gradient-to-r from-[#0b0a14] via-[#1a0b2e] to-[#4B0082] border-b border-white/[0.06]"
        }`}
      >
        {/* gold top arc */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD700]/90 to-transparent" />
        {/* subtle dotted shimmer */}
        <div aria-hidden className="absolute inset-0 opacity-[0.03] dotted pointer-events-none" />

        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] sm:h-[76px] items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 min-w-0 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-[#FFD700]/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <Image
                  src="/images/Kuyakhanya FM Icon.png"
                  alt="KUYAKHANYA FM"
                  width={56}
                  height={56}
                  className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover shrink-0 border border-white/15 shadow-lg shadow-black/20 group-hover:border-[#FFD700]/40 group-hover:shadow-[0_0_0_4px_rgba(255,215,0,0.18)] transition"
                  priority
                />
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="font-heading font-black leading-none text-white tracking-tight text-[16px] sm:text-[18px]">
                  KUYAKHANYA <span className="text-[#FFD700]">FM</span>
                </p>
                <p className="mt-0.5 text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] text-white/60 uppercase">
                  We Shine Brighter Together
                </p>
              </div>
              {/* mobile text */}
              <div className="sm:hidden min-w-0">
                <p className="font-heading font-black leading-none text-white text-[15px]">
                  KUYAKHANYA <span className="text-[#FFD700]">FM</span>
                </p>
              </div>
            </Link>

            {/* Desktop nav - pill glass */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.06] px-1.5 py-1.5 border border-white/[0.07] backdrop-blur-xl shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)]">
              {NAV.map((n) => {
                const isActive =
                  n.href === "/"
                    ? pathname === "/"
                    : pathname === n.href || (n.href.startsWith("/#") ? false : pathname?.startsWith(n.href));
                return (
                  <Link
                    key={n.label}
                    href={n.href}
                    className={`px-3.5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-white text-[#1a0b2e] shadow-sm"
                        : "text-white/75 hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right gold button — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/#listen-live"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-6 py-2.5 text-[13px] font-black tracking-wide text-[#1a0b2e] hover:bg-[#ffe873] transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:-translate-y-px"
              >
                <span className="h-2 w-2 rounded-full bg-[#4B0082] animate-pulse" />
                LISTEN LIVE
              </Link>
            </div>

            {/* Mobile: Listen Live + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/#listen-live"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD700] px-4 py-2 text-xs font-black tracking-wide text-[#1a0b2e] shadow-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#4B0082] animate-pulse" />
                LIVE
              </Link>
              <button
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-white hover:bg-white/[0.12] transition-colors border border-white/10 backdrop-blur"
              >
                <span className="sr-only">Menu</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {open ? (
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#0b0a14]/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 h-dvh w-[86%] max-w-[360px] bg-gradient-to-b from-[#1a0b2e] via-[#2e0b56] to-[#0b0a14] text-white shadow-2xl border-l border-white/10 flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <Image src="/images/Kuyakhanya FM Icon.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-cover border border-white/15" />
              <span className="font-heading font-black text-sm">KUYAKHANYA FM</span>
            </div>
            <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-full bg-white/10 border border-white/10">
              ✕
            </button>
          </div>
          <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3.5 font-semibold tracking-wide text-white/90 hover:bg-white/10 hover:text-white transition-colors border border-transparent hover:border-white/10"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="px-4 text-[11px] tracking-[0.2em] font-bold text-[#FFD700]">ON AIR 24/7</p>
              <p className="px-4 mt-1 text-sm text-white/60">Thembalethu • George • 88.5 FM</p>
            </div>
          </nav>
          <div className="p-5 border-t border-white/10">
            <Link
              href="/#listen-live"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-4 py-3.5 font-black text-[#1a0b2e] shadow-lg"
            >
              <span className="h-2 w-2 rounded-full bg-[#4B0082] animate-pulse" />
              LISTEN LIVE NOW
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
