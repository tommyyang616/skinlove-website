import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendTelegram } from "@/lib/telegram";
import { sendBookingEmail } from "@/lib/email";
import {
  sendAnfrageBestaetigung,
  sendAnfrageAnBetrieb,
  sendKursanmeldungAnBetrieb,
  type Versandergebnis,
} from "@/lib/anfrage-mails";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

/**
 * Nimmt Terminanfragen und Kursanmeldungen entgegen.
 *
 * ── Die Meldekette ─────────────────────────────────────────────────────────
 *
 * Die Anfrage wird **zuerst gespeichert**, dann gemeldet. Schlaegt das Melden
 * fehl, ist die Anfrage trotzdem da und steht im Dashboard.
 *
 * Gemeldet wird auf **zwei unabhaengigen Wegen**: Telegram und E-Mail. Bis zum
 * 21.09.2026 gab es nur Telegram — und weil dessen Fehler verschluckt wurden,
 * konnte eine Anfrage spurlos untergehen. Faellt jetzt ein Weg aus, traegt der
 * andere; fallen beide aus, steht es als `[ANFRAGE NICHT GEMELDET]` im
 * Protokoll und ist damit auffindbar.
 *
 * Der Kundin wird nie ein Fehler gezeigt, wenn ihre Anfrage gespeichert ist —
 * fuer sie hat es geklappt.
 */

function protokolliere(was: string, e: Versandergebnis) {
  if (!e.ok) console.error(`[anfrage] ${was} nicht verschickt: ${e.grund}`);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { ok } = await checkRateLimit(`booking:${ip}`, 5, 600);
    if (!ok) return NextResponse.json({ error: "Zu viele Anfragen. Bitte warte ein paar Minuten." }, { status: 429 });

    const body = await req.json();
    const { name, email, phone, service, message, courseId } = body;

    if (!name || !email) return NextResponse.json({ error: "Name und E-Mail sind Pflichtfelder." }, { status: 400 });
    if (!phone) return NextResponse.json({ error: "Telefonnummer ist ein Pflichtfeld." }, { status: 400 });

    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json({ error: "Tenant nicht gefunden" }, { status: 500 });

    const anfrage = { name, email, phone: phone || null, service: service || null, message: message || null };

    if (courseId) {
      // ── Kursanmeldung ────────────────────────────────────────────────────
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { category: true, title: true },
      });

      await prisma.courseEnrollment.create({
        data: { courseId, name, email, phone: phone || "", status: "PENDING", paid: false },
      });

      const kurs = course?.title || courseId;

      const [telegram, anBetrieb] = await Promise.all([
        sendTelegram(
          `📅 <b>Neue Workshop-Buchung!</b>\n\n` +
          `<b>Name:</b> ${name}\n` +
          `<b>E-Mail:</b> ${email}\n` +
          `<b>Telefon:</b> ${phone || "—"}\n` +
          `<b>Kurs:</b> ${kurs}\n\n` +
          `<i>Via skinlove-website</i>`
        ),
        // Neu am 21.09.2026: Der Betrieb erfuhr bisher auch davon nur per Telegram.
        sendKursanmeldungAnBetrieb({ ...anfrage, kurs }),
        // Die Kursinfos an die Teilnehmerin — bestand schon.
        sendBookingEmail(email, name, course?.category || "Tattoo"),
      ]);

      protokolliere("Kursanmeldung an den Betrieb", anBetrieb);
      if (!telegram && !anBetrieb.ok) {
        console.error(`[ANFRAGE NICHT GEMELDET] Kursanmeldung ${name} <${email}> — Kurs ${kurs}`);
      }
    } else {
      // ── Terminanfrage ────────────────────────────────────────────────────
      await prisma.contactRequest.create({
        data: { tenantId, name, email, phone: phone || null, service: service || null, message: message || null, status: "PENDING" },
      });

      const [telegram, anBetrieb, anKundin] = await Promise.all([
        sendTelegram(
          `💈 <b>Neue Terminanfrage!</b>\n\n` +
          `<b>Name:</b> ${name}\n` +
          `<b>E-Mail:</b> ${email}\n` +
          `<b>Telefon:</b> ${phone || "—"}\n` +
          `<b>Service:</b> ${service || "—"}\n` +
          `<b>Nachricht:</b> ${message || "—"}\n\n` +
          `<i>Via skinlove-website</i>`
        ),
        // Beide neu am 21.09.2026 — vorher wurde bei einer Terminanfrage
        // ueberhaupt keine Mail verschickt.
        sendAnfrageAnBetrieb(anfrage),
        sendAnfrageBestaetigung(anfrage),
      ]);

      protokolliere("Anfrage an den Betrieb", anBetrieb);
      protokolliere("Bestätigung an die Kundin", anKundin);
      if (!telegram && !anBetrieb.ok) {
        console.error(`[ANFRAGE NICHT GEMELDET] Terminanfrage ${name} <${email}> — ${service || "ohne Leistung"}`);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    // Die interne Fehlermeldung bleibt im Protokoll und geht nicht nach aussen.
    console.error("Booking error:", e);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
