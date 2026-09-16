"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase";

/* Contact form
 * - Primary delivery: Web3Forms → info.kuyakhanyafm@gmail.com
 * - Subject template: "New Form Submission - {field:subject} - {field:phone}"
 *   (standalone subject/phone fields feed the dashboard template variables)
 * - Sender: "Kuyakhanya FM Notifications" · redirect: /thank-you
 * - Mirror: also saved to Supabase `contact_submissions` → seen live in /admin
 * - hCaptcha (Web3Forms zero-config, free plan): enabled in the dashboard
 *   at app.web3forms.com → Block Spam → hCaptcha (Strict).
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "b78c3899-e55f-4ff4-96d0-5186c49c2982";

type Status = { type: "idle" | "success" | "error"; message?: string } | null;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  // Load Web3Forms' zero-config hCaptcha proxy script once (renders the widget in .h-captcha)
  useEffect(() => {
    if (document.querySelector('script[src="https://web3forms.com/client/script.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://web3forms.com/client/script.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  function buildMessage() {
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
      `Subject: ${form.subject || "General Enquiry"}`,
      "",
      form.message,
    ];
    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const body = buildMessage();

    // 1) Web3Forms → email delivery
    // Dashboard subject template: "New Form Submission - {field:subject} - {field:phone}".
    // Standalone `subject` + `phone` fields feed those template variables;
    // `redirect` is the dashboard fallback (AJAX submit navigates client-side below).
    const fd = new FormData();
    fd.append("access_key", ACCESS_KEY);
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phone", form.phone || "—");
    fd.append("from_name", "Kuyakhanya FM Notifications");
    fd.append("subject", `New Form Submission - ${form.subject || "General Enquiry"} - ${form.phone || "no phone"}`);
    fd.append("redirect", "https://kuyakhanyafm.web.app/thank-you");
    fd.append("message", body);
    fd.append("botcheck", "");

    // hCaptcha token (Web3Forms zero-config proxy renders into .h-captcha and fills a hidden textarea)
    const capEl = e.currentTarget?.querySelector<HTMLTextAreaElement | HTMLInputElement>('textarea[name="h-captcha-response"], input[name="h-captcha-response"]');
    const token = capEl?.value;
    if (!token) {
      setStatus({ type: "error", message: "Please complete the captcha and try again." });
      setSending(false);
      return;
    }
    fd.append("h-captcha-response", token);
    fd.append("g-recaptcha-response", token); // web3forms accepts either name

    let emailed = false;
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: fd });
      const data = await res.json();
      emailed = Boolean(res.ok && data?.success);
      if (!emailed && data?.message) throw new Error(data.message);
    } catch (err) {
      console.error("Web3Forms failed:", err);
    }

    // 2) Supabase → admin dashboard mirror (best-effort)
    try {
      await supabaseClient()
        ?.from("contact_submissions")
        .insert({ name: form.name, email: form.email, phone: form.phone || null, subject: form.subject || null, message: body });
    } catch (err) {
      console.error("Supabase mirror failed:", err);
    }

    if (!emailed) {
      setStatus({ type: "error", message: "We couldn't send your message. Please try again later." });
      setSending(false);
      return;
    }

    setStatus({ type: "success", message: "Thank you! Taking you to our confirmation page…" });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
    window.setTimeout(() => {
      window.location.href = "/thank-you";
    }, 900);
  }

  const inputCls =
    "w-full rounded-xl border border-[#e6ddf5] bg-[#faf8ff] px-4 py-3 text-sm text-[#1a0b2e] placeholder:text-zinc-400 outline-none transition focus:border-[#6a0dad] focus:ring-2 focus:ring-[#6a0dad]/20 focus:bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Name *</label>
          <input required className={inputCls} value={form.name} onChange={update("name")} placeholder="Your full name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Email *</label>
          <input required type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Phone</label>
          <input className={inputCls} value={form.phone} onChange={update("phone")} placeholder="Optional" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Subject *</label>
          <select required className={inputCls} value={form.subject} onChange={update("subject")}>
            <option value="">Select a topic</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Partnership">Partnership / Sponsorship</option>
            <option value="Get Involved">Get Involved</option>
            <option value="Song Request">Song Request</option>
            <option value="Testimony">Testimony</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Message *</label>
        <textarea required rows={5} className={`${inputCls} resize-none`} value={form.message} onChange={update("message")} placeholder="How can we help you?" />
        <p className="mt-1.5 text-[11px] text-zinc-500">Your name, email, phone and topic are added automatically to your message so nothing is lost.</p>
      </div>

      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      {/* hCaptcha (Web3Forms zero-config) — enable in dashboard → Settings → Block Spam */}
      <div className="h-captcha" data-captcha="true" />
      <p className="text-[11px] text-zinc-500">Verify you are human to submit.</p>

      {status && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-medium ${
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role="status"
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6a0dad] to-[#8a2be2] px-6 py-3.5 text-sm font-extrabold text-white transition hover:from-[#4b0082] hover:to-[#6a0dad] disabled:cursor-not-allowed disabled:opacity-60 shadow-md"
      >
        {sending ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}