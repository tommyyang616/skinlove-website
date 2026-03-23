import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendTelegram } from "@/lib/telegram";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { ok } = await checkRateLimit(`booking:${ip}`, 5, 600);
    if (!ok) return NextResponse.json({ error: "Zu viele Anfragen. Bitte warte ein paar Minuten." }, { status: 429 });

    const body = await req.json();
    const { name, email, service, message, courseId } = body;

    if (!name || !email) return NextResponse.json({ error: "Name und E-Mail sind Pflichtfelder." }, { status: 400 });

    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json({ error: "Tenant nicht gefunden" }, { status: 500 });

    if (courseId) {
      // Workshop booking → CourseEnrollment
      await prisma.courseEnrollment.create({
        data: { courseId, name, email, phone: email, status: "PENDING", paid: false },
      });

      await sendTelegram(
        `📅 <b>Neue Workshop-Buchung!</b>\n\n` +
        `<b>Name:</b> ${name}\n` +
        `<b>Kontakt:</b> ${email}\n` +
        `<b>Kurs-ID:</b> ${courseId}\n\n` +
        `<i>Via skinlove-website</i>`
      );
    } else {
      // Contact request
      await prisma.contactRequest.create({
        data: { tenantId, name, email, service: service || null, message: message || null, status: "PENDING" },
      });

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
  } catch (e: any) {
    console.error("Booking error:", e);
    return NextResponse.json({ error: "Interner Fehler", detail: e?.message || String(e) }, { status: 500 });
  }
}
