import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendTelegram } from "@/lib/telegram";

const SB_URL = "https://ebcjdkjrzwjxxwgtzunh.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY2pka2pyendqeHh3Z3R6dW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDY4OTksImV4cCI6MjA4ODQyMjg5OX0.eOeWfKVQ8ZSVvsc0zcZtFQAFtx05Oe6AAukgqRS0zeY";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 requests per 10 minutes per IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { ok } = await checkRateLimit(`booking:${ip}`, 5, 600);
    if (!ok) return NextResponse.json({ error: "Zu viele Anfragen. Bitte warte ein paar Minuten." }, { status: 429 });

    const body = await req.json();
    const { name, email, service, message, courseId } = body;

    if (!name || !email) return NextResponse.json({ error: "Name und E-Mail sind Pflichtfelder." }, { status: 400 });

    // Save to Supabase
    const sbBody: Record<string, unknown> = { name, email, status: "pending" };
    if (courseId) { sbBody.course_id = courseId; sbBody.phone = email; sbBody.paid = false; }
    if (service) sbBody.service = service;
    if (message) sbBody.message = message;

    await fetch(`${SB_URL}/rest/v1/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
      body: JSON.stringify(sbBody),
    });

    // Telegram Notification
    if (courseId) {
      await sendTelegram(
        `📅 <b>Neue Workshop-Buchung!</b>\n\n` +
        `<b>Name:</b> ${name}\n` +
        `<b>Kontakt:</b> ${email}\n` +
        `<b>Kurs-ID:</b> ${courseId}\n\n` +
        `<i>Via skinlove-website</i>`
      );
    } else {
      await sendTelegram(
        `💈 <b>Neue Terminanfrage!</b>\n\n` +
        `<b>Name:</b> ${name}\n` +
        `<b>E-Mail:</b> ${email}\n` +
        `<b>Service:</b> ${service || "—"}\n` +
        `<b>Nachricht:</b> ${message || "—"}\n\n` +
        `<i>Via skinlove-website</i>`
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
