"use client";

/* NewsCard — article card + "Read More" modal popup.
 * Shared by the Home NewsSection (variant="dark") and the /news page (variant="light").
 * Modal: fade in/out, click-outside + ✕ + Escape to close, scroll-locked, ARIA dialog.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InlineAd from "./InlineAd";

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  coverImage: string;
  content?: string;
};

type Props = {
  article: Article;
  variant?: "dark" | "light";
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

export default function NewsCard({ article, variant = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dark = variant === "dark";

  return (
    <>
      <article
        className={`group flex flex-col overflow-hidden rounded-[24px] transition-all duration-300 ${
          dark
            ? "glass-card hover-lift"
            : "grad-card border border-zinc-200 bg-white shadow-soft hover:-translate-y-1.5 hover:shadow-lift"
        }`}
      >
        <div className={`relative h-48 overflow-hidden ${dark ? "bg-gradient-to-br from-[#1a0b2e] to-[#4B0082]" : "bg-[#f0eafb]"}`}>
          <Image
            src={article.coverImage}
            alt={article.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-wide ${dark ? "bg-[#FFD700] text-[#1a0b2e]" : "bg-[#6a0dad] text-white"}`}>
              NEWS
            </span>
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#1a0b2e]">{formatDate(article.date)}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className={`font-heading text-base font-black leading-tight line-clamp-2 ${dark ? "text-white group-hover:text-[#FFD700]" : "text-[#1a0b2e]"}`}>
            {article.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed line-clamp-3 flex-1 ${dark ? "text-white/60" : "text-zinc-600"}`}>{article.excerpt}</p>
          <p className={`mt-3 text-xs ${dark ? "text-white/40" : "text-zinc-400"}`}>By {article.author}</p>
          <button
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className={`mt-4 self-start text-xs font-black tracking-wide transition hover:underline ${
              dark ? "text-[#FFD700] hover:text-[#ffe873]" : "text-[#6a0dad] hover:text-[#4b0082]"
            }`}
          >
            READ MORE →
          </button>
        </div>
      </article>

      {/* Modal — fade in/out */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[100] flex justify-center overflow-y-auto p-4 transition-opacity duration-300 sm:p-6 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden />
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative m-auto max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#110a1f] shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
          }`}
        >
          <button
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            aria-label="Close article"
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/50 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
          >
            ✕
          </button>
          <Image
            src={article.coverImage}
            alt={article.title}
            width={800}
            height={450}
            className="h-52 w-full rounded-t-3xl object-cover sm:h-64"
          />
          <div className="p-6 sm:p-8">
            <p className="text-[11px] font-black tracking-[0.2em] text-[#FFD700] uppercase">
              {formatDate(article.date)} • {article.author}
            </p>
            <h2 className="mt-2 font-heading text-xl font-black leading-tight text-white sm:text-2xl">{article.title}</h2>
            <div className="mt-2 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#FFD700] to-[#ffb300]" />
            {article.content && (
              <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80 sm:text-[15px]">{article.content}</div>
            )}
            <InlineAd />
            <button
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 text-sm font-extrabold text-[#1a0b2e] transition hover:bg-[#ffe873]"
            >
              Close →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}