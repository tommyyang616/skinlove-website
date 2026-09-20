/**
 * Die beiden Mails rund um eine Terminanfrage.
 *
 * ── Warum es diese Datei gibt ──────────────────────────────────────────────
 *
 * Am 21.09.2026 nachgemessen: Im Resend-Konto dieser Seite waren seit der
 * Einrichtung im April **null** Mails verschickt worden. Der Grund stand in
 * `api/booking/route.ts`: Bei einer normalen Terminanfrage wurde gar keine
 * Mail ausgeloest — die Kundin bekam keine Bestaetigung, und der Betrieb
 * erfuhr von der Anfrage ausschliesslich ueber Telegram. Faellt Telegram aus,
 * liegt die Anfrage in der Datenbank und **niemand weiss davon**, denn
 * `sendTelegram` verschluckt jeden Fehler still.
 *
 * Seitdem gilt: Telegram bleibt, aber Mail ist der zweite Weg. Zwei Wege, die
 * unabhaengig voneinander ausfallen koennen.
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

/** Wohin die Anfragen des Betriebs gehen. Aenderbar ohne Codeeingriff. */
const BETRIEB_EMAIL =
  process.env.BETRIEB_EMAIL || "eve@skinlove-tattoo-piercing.at";

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
 * **Sagt ausdruecklich, dass noch kein Termin vereinbart ist.** Eine Mail mit
 * dem Wort „Bestaetigung" im Betreff wird sonst als Terminzusage gelesen, und
 * dann steht jemand vor der Tuer. Und: **keine Zusage, wann geantwortet wird** —
 * eine unbelegte Reaktionszeit ist nach UWG abmahnbar.
 */
export function baueAnfrageBestaetigung(a: Anfrage): { subject: string; html: string } {
  const leistung = a.service ? sicher(a.service) : null;

  const html = rahmen(`
<p style="font-size:16px">Hallo <strong>${sicher(a.name)}</strong>,</p>
<p>deine Anfrage ist bei uns angekommen — danke dafür!</p>
${leistung ? `<p style="background:#181818;border-left:3px solid ${LILA};padding:12px 16px;margin:20px 0">
<span style="color:#888;font-size:13px">Deine Anfrage betrifft</span><br>
<strong style="font-size:16px">${leistung}</strong></p>` : ""}
<p><strong>Was jetzt passiert:</strong> Wir schauen uns deine Anfrage an und melden uns
bei dir, um einen Termin zu vereinbaren.</p>
<p style="background:#1a1512;border:1px solid rgba(187,53,153,.25);border-radius:8px;padding:12px 16px;color:#d8c9d4;font-size:14px">
<strong>Wichtig:</strong> Diese Mail bestätigt, dass deine Anfrage angekommen ist —
sie ist noch <strong>kein fixer Termin</strong>. Der wird erst vereinbart, wenn wir uns
bei dir gemeldet haben.</p>
<p>Wenn sich etwas ändert oder du es dir anders überlegst, ruf einfach an:<br>
<a href="tel:${STUDIO.telefonWahl}" style="color:${LILA};font-size:17px;font-weight:bold">${STUDIO.telefon}</a></p>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<p style="color:#888;font-size:13px;line-height:1.7">
<strong style="color:#bbb">${STUDIO.name}</strong><br>
${STUDIO.inhaberin}<br>
${STUDIO.adresse}<br>
<a href="tel:${STUDIO.telefonWahl}" style="color:#888">${STUDIO.telefon}</a><br>
<a href="https://${STUDIO.web}" style="color:#888">${STUDIO.web}</a></p>`);

  return { subject: "Deine Anfrage ist angekommen — SkinLove Tattoo & Piercing", html };
}

export async function sendAnfrageBestaetigung(a: Anfrage): Promise<Versandergebnis> {
  const { subject, html } = baueAnfrageBestaetigung(a);
  return senden({ to: a.email, subject, html });
}

/**
 * An den Betrieb: eine neue Anfrage liegt vor.
 *
 * `replyTo` steht auf der Kundin — damit geht „Antworten" direkt an sie und
 * nicht an das Absenderpostfach.
 */
export function baueAnfrageAnBetrieb(a: Anfrage): { subject: string; html: string } {
  const zeile = (beschriftung: string, wert: string | null | undefined, link?: string) => {
    if (!wert) return "";
    const inhalt = link
      ? `<a href="${link}" style="color:${LILA};text-decoration:none">${sicher(wert)}</a>`
      : sicher(wert);
    return `<tr>
<td style="padding:8px 12px 8px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap">${beschriftung}</td>
<td style="padding:8px 0;font-size:15px">${inhalt}</td></tr>`;
  };

  const html = rahmen(`
<p style="font-size:17px;margin:0 0 20px"><strong style="color:${LILA}">Neue Terminanfrage</strong></p>
<table style="width:100%;border-collapse:collapse">
${zeile("Name", a.name)}
${zeile("E-Mail", a.email, `mailto:${a.email}`)}
${zeile("Telefon", a.phone, `tel:${String(a.phone ?? "").replace(/[^\d+]/g, "")}`)}
${zeile("Leistung", a.service)}
</table>
${a.message ? `<p style="margin:20px 0 0"><span style="color:#888;font-size:13px">Nachricht</span><br>
<span style="display:block;background:#181818;border-left:3px solid ${LILA};padding:12px 16px;margin-top:6px;white-space:pre-wrap">${sicher(a.message)}</span></p>` : ""}
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<p style="color:#888;font-size:13px">Auf „Antworten" zu drücken schreibt direkt an
${sicher(a.name)}. Die Anfrage steht auch im Dashboard unter <em>Anfragen</em>.</p>`);

  return {
    subject: `Neue Terminanfrage — ${a.name}${a.service ? ` — ${a.service}` : ""}`,
    html,
  };
}

export async function sendAnfrageAnBetrieb(a: Anfrage): Promise<Versandergebnis> {
  const { subject, html } = baueAnfrageAnBetrieb(a);
  return senden({ to: BETRIEB_EMAIL, subject, html, replyTo: a.email });
}

/**
 * An den Betrieb: eine neue Kursanmeldung liegt vor.
 *
 * Bisher erfuhr der Betrieb auch davon nur ueber Telegram.
 */
export async function sendKursanmeldungAnBetrieb(
  a: Anfrage & { kurs: string },
): Promise<Versandergebnis> {
  const html = rahmen(`
<p style="font-size:17px;margin:0 0 20px"><strong style="color:${LILA}">Neue Kursanmeldung</strong></p>
<table style="width:100%;border-collapse:collapse">
<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Kurs</td>
<td style="padding:8px 0;font-size:15px"><strong>${sicher(a.kurs)}</strong></td></tr>
<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Name</td>
<td style="padding:8px 0;font-size:15px">${sicher(a.name)}</td></tr>
<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">E-Mail</td>
<td style="padding:8px 0;font-size:15px"><a href="mailto:${a.email}" style="color:${LILA};text-decoration:none">${sicher(a.email)}</a></td></tr>
${a.phone ? `<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Telefon</td>
<td style="padding:8px 0;font-size:15px">${sicher(a.phone)}</td></tr>` : ""}
</table>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<p style="color:#888;font-size:13px">Die Anmeldung ist erst mit unterschriebenem
Vertrag und Anzahlung verbindlich. Sie steht im Dashboard unter <em>Kurse</em>.</p>`);

  return senden({
    to: BETRIEB_EMAIL,
    subject: `Neue Kursanmeldung — ${a.name} — ${a.kurs}`,
    html,
    replyTo: a.email,
  });
}
