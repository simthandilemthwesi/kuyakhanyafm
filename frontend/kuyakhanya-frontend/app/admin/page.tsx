"use client";

/* KUYAKHANYA FM — Admin dashboard (served on admin-kuyakhanyafm.web.app + /admin)
 * - Passcode gate (set NEXT_PUBLIC_ADMIN_CODE in .env.local; default "shine2026")
 * - Live contact messages from Supabase (contact_submissions)
 * - Stream test, content checklist, quick links to Firebase/GA/AdSense consoles
 */

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase";

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || "shine2026";
const STREAM_URL = "https://cast3.asurahosting.com/proxy/kuyakhan/stream";

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
};

type AppDownload = {
  id: number;
  platform: string | null;
  device: string | null;
  user_agent: string | null;
  referrer: string | null;
  version: string | null;
  created_at: string;
};

const CONSOLE_LINKS = [
  { name: "Firebase Console", href: "https://console.firebase.google.com/project/kuyakhanyafm/overview" },
  { name: "Hosting", href: "https://console.firebase.google.com/project/kuyakhanyafm/hosting/sites" },
  { name: "App Distribution", href: "https://console.firebase.google.com/project/kuyakhanyafm/appdistribution" },
  { name: "Google Analytics", href: "https://analytics.google.com/" },
  { name: "Tag Manager", href: "https://tagmanager.google.com/" },
  { name: "AdSense", href: "https://www.google.com/adsense/" },
  { name: "Search Console", href: "https://search.google.com/search-console" },
  { name: "Supabase", href: "https://supabase.com/dashboard" },
];

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamState, setStreamState] = useState<"idle" | "checking" | "reachable" | "unreachable">("idle");
  const [downloads, setDownloads] = useState<AppDownload[]>([]);
  const [loadingDownloads, setLoadingDownloads] = useState(false);
  const [downloadsError, setDownloadsError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("kuyakhanya-admin") === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  async function loadMessages() {
    setLoading(true);
    setError(null);
    try {
      const supa = supabaseClient();
      if (!supa) {
        setError("Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).");
        return;
      }
      const { data, error: err } = await supa
        .from("contact_submissions")
        .select("id,name,email,phone,subject,message,created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (err) throw err;
      setMessages((data as Message[]) || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function loadDownloads() {
    setLoadingDownloads(true);
    setDownloadsError(null);
    try {
      const supa = supabaseClient();
      if (!supa) {
        setDownloadsError("Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).");
        return;
      }
      const { data, error: err } = await supa
        .from("app_downloads")
        .select("id,platform,device,user_agent,referrer,version,created_at")
        .order("created_at", { ascending: false })
        .limit(25);
      if (err) throw err;
      setDownloads((data as AppDownload[]) || []);
    } catch (e) {
      setDownloadsError(
        (e instanceof Error ? e.message : "Failed to load downloads") +
          ' — run supabase/setup.sql in the Supabase SQL editor to create the "app_downloads" table.'
      );
    } finally {
      setLoadingDownloads(false);
    }
  }

  useEffect(() => {
    if (unlocked) loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  useEffect(() => {
    if (unlocked) loadDownloads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      try {
        sessionStorage.setItem("kuyakhanya-admin", "1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setCodeError(null);
    } else {
      setCodeError("Wrong code. Try again.");
    }
  }

  function lock() {
    try {
      sessionStorage.removeItem("kuyakhanya-admin");
    } catch {
      /* ignore */
    }
    setUnlocked(false);
    setCode("");
    setMessages([]);
    setDownloads([]);
  }

  async function checkStream() {
    setStreamState("checking");
    try {
      await fetch(STREAM_URL, { method: "HEAD", mode: "no-cors" });
      setStreamState("reachable");
    } catch {
      setStreamState("unreachable");
    }
  }

  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-[24px] border border-white/10 bg-[#110a1f] p-8 text-white shadow-soft">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#ffd700] uppercase">KUYAKHANYA FM • Admin</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold">Dashboard login</h1>
          <p className="mt-1 text-sm text-white/60">Enter the admin passcode to continue.</p>
          <form onSubmit={unlock} className="mt-6 space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Admin passcode"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#ffd700]"
            />
            {codeError && <p className="text-sm font-medium text-red-300">{codeError}</p>}
            <button type="submit" className="w-full rounded-full bg-[#ffd700] px-6 py-3 text-sm font-extrabold text-[#1a0b2e] transition hover:opacity-90">
              Unlock dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#ffd700] uppercase">KUYAKHANYA FM • Admin</p>
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Dashboard</h1>
        </div>
        <button onClick={lock} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
          Lock
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#110a1f] p-5">
          <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Contact messages</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-white">{loading ? "…" : messages.length}</p>
          <button onClick={loadMessages} className="mt-2 text-xs font-bold text-[#ffd700] hover:underline">Refresh ↻</button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#110a1f] p-5">
          <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Stream status</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-white">
            {streamState === "reachable" ? "● Live" : streamState === "unreachable" ? "● Down" : streamState === "checking" ? "…" : "● ?"}
          </p>
          <button onClick={checkStream} className="mt-2 text-xs font-bold text-[#ffd700] hover:underline">Check stream ↻</button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#110a1f] p-5">
          <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase">App downloads</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-white">{loadingDownloads ? "…" : downloads.length}</p>
          <button onClick={loadDownloads} className="mt-2 text-xs font-bold text-[#ffd700] hover:underline">Refresh ↻</button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#110a1f] p-5">
          <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Weather cities</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-white">8</p>
          <a href="/news#weather" className="mt-2 inline-block text-xs font-bold text-[#ffd700] hover:underline">View on News →</a>
        </div>
      </div>

      {/* Messages */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#110a1f] p-5 sm:p-6">
        <h2 className="font-display text-xl font-extrabold text-white">Latest messages</h2>
        {error && <p className="mt-2 rounded-xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        {!error && messages.length === 0 && !loading && (
          <p className="mt-2 text-sm text-white/55">No messages yet. New contact-form submissions appear here automatically.</p>
        )}
        <div className="mt-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-extrabold text-white">{m.name} <span className="font-medium text-white/50">• {m.email}</span></p>
                <p className="text-[11px] text-white/40">{new Date(m.created_at).toLocaleString("en-ZA")}</p>
              </div>
              {(m.subject || m.phone) && (
                <p className="mt-1 text-xs text-[#ffd700]/90">{[m.subject, m.phone].filter(Boolean).join(" • ")}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-white/75">{m.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* App downloads */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#110a1f] p-5 sm:p-6">
        <h2 className="font-display text-xl font-extrabold text-white">Latest app downloads</h2>
        <p className="mt-1 text-xs text-white/50">Tracks every tap on "Download APK" — sent from the popup on the website.</p>
        {downloadsError && <p className="mt-2 rounded-xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">{downloadsError}</p>}
        {!downloadsError && downloads.length === 0 && !loadingDownloads && (
          <p className="mt-2 text-sm text-white/55">No downloads yet. They appear here the moment a visitor taps the download button.</p>
        )}
        <div className="mt-4 space-y-3">
          {downloads.map((d) => (
            <div key={d.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-extrabold text-white">
                  {d.platform === "android" ? "🤖" : d.platform === "ios" ? "🍎" : "💻"} {d.device || d.platform || "Unknown"}
                  {d.version && <span className="ml-2 rounded-full bg-[#ffd700]/10 px-2 py-0.5 text-[10px] font-bold text-[#ffd700]">v{d.version}</span>}
                </p>
                <p className="text-[11px] text-white/40">{new Date(d.created_at).toLocaleString("en-ZA")}</p>
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-white/50" title={d.referrer || ""}>
                Referrer: {d.referrer || "direct"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#110a1f] p-5 sm:p-6">
        <h2 className="font-display text-xl font-extrabold text-white">Consoles & quick links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONSOLE_LINKS.map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition hover:border-[#ffd700] hover:text-[#ffd700]">
              {l.name} ↗
            </a>
          ))}
        </div>
        <div className="mt-4 grid gap-2 text-xs text-white/55 sm:grid-cols-2">
          <p>Main site: <a className="text-[#ffd700] hover:underline" href="https://kuyakhanyafm.web.app">kuyakhanyafm.web.app</a></p>
          <p>Stream: <a className="text-[#ffd700] hover:underline" href={STREAM_URL} target="_blank" rel="noopener noreferrer">test stream ↗</a></p>
          <p>Health: <a className="text-[#ffd700] hover:underline" href="https://kuyakhanyafm.web.app/sitemap.xml">sitemap.xml</a> • <a className="text-[#ffd700] hover:underline" href="https://kuyakhanyafm.web.app/robots.txt">robots.txt</a></p>
          <p>Countdown: <a className="text-[#ffd700] hover:underline" href="/coming-soon">/coming-soon</a> (auto-hides after 20 Oct 2026)</p>
          <p>APK download: <a className="text-[#ffd700] hover:underline" href="https://kuyakhanyafm.web.app/downloads/kuyakhanya-fm.apk" target="_blank" rel="noopener noreferrer">kuyakhanya-fm.apk ↗</a> (drop the file in <code>public/downloads/</code>)</p>
          <p>SQL setup: <code>supabase/setup.sql</code> — run once in the Supabase SQL editor if tables are missing</p>
        </div>
      </div>
    </div>
  );
}
