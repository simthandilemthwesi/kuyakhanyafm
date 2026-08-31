import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const phone = (body.phone || "").trim();

  if (!name) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  if (!message) return NextResponse.json({ ok: false, error: "Please enter a message." }, { status: 400 });
  if (message.length < 5)
    return NextResponse.json({ ok: false, error: "Message must be at least 5 characters." }, { status: 400 });

  const supa = supabaseClient();
  if (!supa) {
    // Supabase not configured — still respond so the UX stays smooth during local dev.
    console.warn("[contact] Supabase not configured — submission not persisted.");
    return NextResponse.json({ ok: true, dev: true }, { status: 200 });
  }

  const { error } = await supa.from("contact_submissions").insert({
    name,
    email,
    phone: phone || null,
    subject: body.subject?.trim() || null,
    message,
  });

  if (error) {
    console.error("[contact] Supabase insert error", error);
    return NextResponse.json({ ok: false, error: "We couldn't save your message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
