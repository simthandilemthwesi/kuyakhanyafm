"use client";

import { useState, useEffect, useRef } from "react";
import { searchClient, ALGOLIA_INDEX } from "@/lib/algolia";

type Hit = {
  objectID: string;
  title?: string;
  name?: string;
  description?: string;
  excerpt?: string;
  host?: string;
  day?: string;
  url?: string;
};

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "empty" | "off">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHits([]);
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!searchClient || query.trim().length < 2) {
      setHits([]);
      setStatus(!searchClient ? "off" : "idle");
      return;
    }
    setLoading(true);
    timer.current = setTimeout(async () => {
      if (!searchClient) {
        setStatus("off");
        setLoading(false);
        return;
      }
      try {
        const { results } = await searchClient.search({
          requests: [
            {
              indexName: ALGOLIA_INDEX,
              query: query.trim(),
              hitsPerPage: 8,
              attributesToRetrieve: ["title", "name", "description", "excerpt", "host", "day", "url"],
            },
          ],
        });
        const res = results[0] as { hits?: Hit[] };
        const found = (res?.hits || []).filter(Boolean);
        setHits(found);
        setStatus(found.length ? "ok" : "empty");
      } catch (e) {
        console.error("[Algolia] search failed", e);
        setHits([]);
        setStatus("empty");
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search KUYAKHANYA FM"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] border border-white/10 text-white hover:bg-white/[0.14] transition"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 pt-[12vh]" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-3xl glass-purple p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shows, presenters, news…"
                className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search" className="text-white/50 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mt-4 max-h-[50vh] overflow-y-auto">
              {status === "off" && <p className="p-3 text-sm text-white/60">Search is being configured — results appear once your Algolia index is populated.</p>}
              {status === "empty" && !loading && <p className="p-3 text-sm text-white/60">No results yet for “{query}”.</p>}
              {loading && <p className="p-3 text-sm text-white/60">Searching…</p>}
              {hits.map((h) => (
                <a
                  key={h.objectID}
                  href={h.url || "#"}
                  className="block rounded-2xl p-3 hover:bg-white/10 transition"
                >
                  <p className="text-sm font-bold text-white">{h.title || h.name}</p>
                  {(h.host || h.day) && <p className="text-xs text-[#FFD700]">{h.day ? `${h.day} • ` : ""}{h.host}</p>}
                  {(h.description || h.excerpt) && <p className="mt-0.5 text-xs text-white/60 line-clamp-2">{h.description || h.excerpt}</p>}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
