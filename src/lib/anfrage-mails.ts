/**
 * Die Eingangsbestätigung an die Kundin nach einer Terminanfrage.
 *
 * ── Warum hier nur noch eine Mail steht ────────────────────────────────────
 *
 * Am 21.09.2026 kamen drei Mails dazu: eine an die Kundin, zwei an den
 * Betrieb. Eve hat am 22.09.2026 gesagt, dass sie **keine Mails** möchte —
 * ihr reicht die Telegram-Nachricht. Die beiden Betriebsmails sind deshalb
 * wieder raus.
 *
 * Damit ist Telegram wieder Eves einziger Meldeweg. Der Rückhalt ist die
 * Datenbank: jede Anfrage wird **vor** dem Melden gespeichert und steht im
 * Dashboard unter *Anfragen*, auch wenn Telegram klemmt.
 *
 * **Nicht ungefragt wieder einbauen** — auch nicht „zur Sicherheit". Der
 * erste Test in `anfrage-mails.test.ts` hält das fest.
 *
 * Die Kundin bekommt ihre Bestätigung weiterhin. Sie ist zugleich Eves
 * Nachweis: was angefragt wurde, wann es ankam, und dass damit noch kein
 * Termin zugesagt ist.
 *
 * `email.ts` daneben bleibt unangetastet — dort liegen die Kursmails.
 */
import { Resend } from "resend";

/**
 * Erst bei Bedarf erzeugen, nicht beim Laden des Moduls.
 *
 * `new Resend(undefined)` wirft sofort. Auf Modulebene aufgerufen, reisst das
 * die ganze Buchungsstrecke mit, sobald der Schluessel einmal fehlt — dann
 * kaeme nicht nur keine Mail an, es koennte auch niemand mehr anfragen.
 * Gefunden am 21.09.2026 vom ersten Test dieser Datei.
 */
let client: Resend | null = null;
function resend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

const ABSENDER =
  process.env.RESEND_FROM ||
  "SkinLove Tattoo & Piercing <info@skinlove-tattoo-piercing.at>";

const STUDIO = {
  name: "SkinLove Tattoo & Piercing",
  inhaberin: "Eve Paule",
  adresse: "Linzer Straße 35, 1. OG, Top 8, 4614 Marchtrenk",
  telefon: "+43 660 783 5346",
  telefonWahl: "+436607835346",
  web: "skinlove-tattoo-piercing.at",
} as const;

const LILA = "#bb3599";

export type Anfrage = {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message?: string | null;
  /** Wann die Anfrage eintraf. Ohne Angabe: jetzt. */
  eingegangen?: Date;
};

/** Ergebnis eines Versands — bewusst kein stilles Schlucken. */
export type Versandergebnis = { ok: true } | { ok: false; grund: string };

async function senden(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<Versandergebnis> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, grund: "RESEND_API_KEY ist nicht gesetzt" };
  }
  try {
    const { error } = await resend().emails.send({
      from: ABSENDER,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
    if (error) return { ok: false, grund: error.message || String(error) };
    return { ok: true };
  } catch (err) {
    return { ok: false, grund: err instanceof Error ? err.message : String(err) };
  }
}

/** Schutz gegen HTML-Einschleusung aus Formularfeldern. */
function sicher(text: string | null | undefined): string {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Datum und Uhrzeit fest in Wiener Zeit.
 *
 * Der Server läuft auf UTC. Ohne feste Zeitzone stünde in der Mail eine
 * Uhrzeit, die zwei Stunden vor der echten liegt — als Nachweis wertlos.
 */
const WIEN_DATUM = new Intl.DateTimeFormat("de-AT", {
  timeZone: "Europe/Vienna",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const WIEN_UHRZEIT = new Intl.DateTimeFormat("de-AT", {
  timeZone: "Europe/Vienna",
  hour: "2-digit",
  minute: "2-digit",
});

function zeitpunkt(d: Date): string {
  return `${WIEN_DATUM.format(d)} um ${WIEN_UHRZEIT.format(d)}`;
}

function rahmen(inhalt: string): string {
  return `<!DOCTYPE html><html lang="de"><body style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;color:#e0e0e0;padding:32px 16px;margin:0">
<div style="max-width:560px;margin:0 auto;background:#111;border-radius:12px;padding:32px;border:1px solid rgba(187,53,153,.2)">
<div style="text-align:center;margin-bottom:28px">
<h1 style="color:${LILA};font-size:26px;margin:0">SkinLove</h1>
<p style="color:#888;font-size:13px;margin:4px 0 0">Tattoo &amp; Piercing Studio</p>
</div>
${inhalt}
</div></body></html>`;
}

/**
 * An die Kundin: Ihre Anfrage ist angekommen.
 *
 * Die Mail hat zwei Aufgaben, die sich beissen:
 *
 * 1. **Die Kundin soll sich freuen.** Sie hat gerade einen Schritt auf das
 *    Studio zu gemacht; diese Mail ist der erste Eindruck. Also herzlich und
 *    ohne Behoerdenton.
 * 2. **Eve soll keinen Ärger bekommen.** Fehlt ein klarer Satz, wird eine
 *    „Bestätigung" als Terminzusage gelesen und jemand steht vor der Tür.
 *    Und: **keine Zusage, wann geantwortet wird** — eine unbelegte
 *    Reaktionszeit ist nach UWG abmahnbar.
 *
 * Der Ausgleich: Der klare Satz steht mitten im normalen Text statt in einem
 * Warnkasten, und die Angaben der Kundin stehen ruhig darunter — für sie
 * „so haben wir es notiert", für Eve der Nachweis, was wann kam.
 */
export function baueAnfrageBestaetigung(a: Anfrage): { subject: string; html: string } {
  const zeile = (beschriftung: string, wert: string | null | undefined) =>
    wert
      ? `<tr>
<td style="padding:5px 16px 5px 0;color:#8a8a8a;font-size:13px;vertical-align:top;white-space:nowrap">${beschriftung}</td>
<td style="padding:5px 0;font-size:14px;color:#e6e6e6">${sicher(wert)}</td></tr>`
      : "";

  const html = rahmen(`
<p style="font-size:17px;margin:0 0 18px">Hallo <strong>${sicher(a.name)}</strong>,</p>
<p style="margin:0 0 16px;line-height:1.65;font-size:15px">schön, dass du dich bei uns gemeldet hast — deine Anfrage ist angekommen.</p>
<p style="margin:0 0 24px;line-height:1.65;font-size:15px">Wir schauen sie uns in Ruhe an und melden uns bei dir, damit wir gemeinsam einen Termin finden, der dir passt. Bis dahin ist noch kein fixer Termin vergeben — du musst also nichts weiter tun.</p>
<div style="background:#181818;border-radius:10px;padding:18px 20px;margin:0 0 10px">
<p style="color:#7a7a7a;font-size:12px;letter-spacing:.06em;margin:0 0 12px">SO HABEN WIR ES NOTIERT</p>
<table style="width:100%;border-collapse:collapse">
${zeile("Eingegangen", `${zeitpunkt(a.eingegangen ?? new Date())} Uhr`)}
${zeile("Name", a.name)}
${zeile("Leistung", a.service)}
${zeile("Telefon", a.phone)}
${zeile("E-Mail", a.email)}
</table>
${a.message ? `<p style="margin:14px 0 0"><span style="color:#8a8a8a;font-size:13px">Deine Nachricht</span><br>
<span style="display:block;border-left:3px solid ${LILA};padding:8px 0 8px 14px;margin-top:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${sicher(a.message)}</span></p>` : ""}
</div>
<p style="color:#7a7a7a;font-size:12px;line-height:1.6;margin:0 0 26px">Diese Mail bestätigt den Eingang deiner Anfrage. Stimmt etwas davon nicht, sag uns einfach Bescheid.</p>
<p style="margin:0 0 10px;line-height:1.65;font-size:15px">Hat sich etwas geändert oder fällt dir noch etwas ein? Ruf uns an, wir sind gern für dich da:</p>
<p style="margin:0 0 26px"><a href="tel:${STUDIO.telefonWahl}" style="color:${LILA};font-size:19px;font-weight:bold;text-decoration:none">${STUDIO.telefon}</a></p>
<p style="margin:0 0 6px;line-height:1.65;font-size:15px">Wir freuen uns auf dich!</p>
<p style="margin:0;font-size:15px;line-height:1.6">Liebe Grüße<br><strong>${STUDIO.inhaberin}</strong></p>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:26px 0 20px">
<p style="color:#888;font-size:13px;line-height:1.7;margin:0">
<strong style="color:#bbb">${STUDIO.name}</strong><br>
${STUDIO.adresse}<br>
<a href="tel:${STUDIO.telefonWahl}" style="color:#888">${STUDIO.telefon}</a><br>
<a href="https://${STUDIO.web}" style="color:#888">${STUDIO.web}</a></p>`);

  return { subject: "Deine Anfrage ist angekommen — SkinLove Tattoo & Piercing", html };
}

export async function sendAnfrageBestaetigung(a: Anfrage): Promise<Versandergebnis> {
  const { subject, html } = baueAnfrageBestaetigung(a);
  return senden({ to: a.email, subject, html });
}
