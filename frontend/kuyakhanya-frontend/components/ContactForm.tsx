"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase";

type Status = { type: "idle" | "success" | "error"; message?: string } | null;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const res = await supabaseClient()
      ?.from("contact_submissions")
      .insert({ name: form.name, email: form.email, phone: form.phone || null, subject: form.subject || null, message: form.message });

    if (res?.error) {
      setStatus({ type: "error", message: "We couldn't save your message. Please try again." });
      setSending(false);
      return;
    }

    setStatus({ type: "success", message: "Thank you! Your message has been sent — we’ll be in touch soon." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
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
          <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Subject</label>
          <select className={inputCls} value={form.subject} onChange={update("subject")}>
            <option value="">Select a topic</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Partnership">Partnership / Sponsorship</option>
            <option value="Join the Team">Join the Team</option>
            <option value="Song Request">Song Request</option>
            <option value="Testimony">Testimony</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-600 uppercase">Message *</label>
        <textarea required rows={5} className={`${inputCls} resize-none`} value={form.message} onChange={update("message")} placeholder="How can we help you?" />
      </div>

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
