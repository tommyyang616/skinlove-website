import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM || "SkinLove Tattoo & Piercing <info@skinlove-tattoo-piercing.at>";

export async function sendBookingEmail(to: string, name: string, category: string) {
  const subject = category?.toLowerCase().includes("piercing")
    ? "Piercing-Kurs - Deine Anmeldung bei SkinLove"
    : "Tattoo Starterkurs - Deine Anmeldung bei SkinLove";

  const html = category?.toLowerCase().includes("piercing")
    ? getPiercingEmailHtml(name)
    : getTattooEmailHtml(name);

  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("[email] Failed to send booking email:", err);
  }
}

function getTattooEmailHtml(name: string) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#0a0a0a;color:#e0e0e0;padding:40px 20px;margin:0">
<div style="max-width:640px;margin:0 auto;background:#111;border-radius:12px;padding:40px;border:1px solid rgba(187,53,153,.2)">
<div style="text-align:center;margin-bottom:32px">
<h1 style="color:#bb3599;font-size:28px;margin:0">SkinLove</h1>
<p style="color:#888;font-size:14px">Tattoo &amp; Piercing Studio</p>
</div>
<p>Hallo <strong>${name}</strong>,</p>
<p>vielen Dank f&uuml;r deine Anmeldung zum <strong>Tattoo Starterkurs</strong>! Hier sind alle wichtigen Infos:</p>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<h2 style="color:#bb3599;font-size:20px">Tattoo Starterkurs &ndash; Praxisorientierter Grundkurs</h2>
<p>Der Kurs richtet sich ausschlie&szlig;lich an Beginner und vermittelt praxisnah die grundlegenden Abl&auml;ufe des T&auml;towierens &ndash; ohne Arbeiten an echten Menschen.</p>
<h3 style="color:#bb3599">Ziel des Kurses</h3>
<p>Ein fundiertes Basisverst&auml;ndnis f&uuml;r das T&auml;towieren entwickeln: professioneller Studioalltag, Materialien, Hygiene und Sicherheit, saubere Grundtechniken.</p>
<h3 style="color:#bb3599">Voraussetzungen</h3>
<ul><li>Mindestalter 18 Jahre</li><li>Eigene Tattoo-Maschine</li><li>Interesse an praxisnaher Arbeit</li></ul>
<h3 style="color:#bb3599">Kursdauer &amp; Zeiten</h3>
<ul><li><strong>Gesamtdauer:</strong> 2 Monate</li><li><strong>Unterricht:</strong> 2x pro Woche (Montag &amp; Dienstag)</li><li><strong>Uhrzeit:</strong> 18:00 &ndash; 20:15 Uhr</li><li><strong>Gruppengroesse:</strong> max. 3 Personen</li></ul>
<h3 style="color:#bb3599">Kursort</h3>
<p>SkinLove Tattoo &amp; Piercing<br>Linzer Stra&szlig;e 35, 4614 Marchtrenk, 1. OG, Top 8</p>
<h3 style="color:#bb3599">Kursinhalt</h3>
<p><strong>Woche 1-2 (Startphase):</strong> Studiogrundlagen, Materialkunde, Hygiene, Kundenaufkl&auml;rung, Stencil-Erstellung</p>
<p><strong>Woche 3-6 (Aufbauphase):</strong> Linienf&uuml;hrung, Schattierungen, Farbtheorie, Nadelkunde, eigenst&auml;ndiges Arbeiten auf &Uuml;bungshaut</p>
<p><strong>Letzte Wochen (Abschluss):</strong> Kombination aller Techniken, Feedback, Teilnahmebest&auml;tigung</p>
<h3 style="color:#bb3599">Material</h3>
<ul><li>&Uuml;bungshaut &amp; Verbrauchsmaterial: wird gestellt</li><li>Tattoo-Maschine: selbst mitzubringen</li><li>Nadelmodule: k&ouml;nnen gestellt werden</li><li>Block f&uuml;r Notizen wird bereitgestellt</li></ul>
<h3 style="color:#bb3599">Kurspreis</h3>
<p style="font-size:20px"><strong>&euro; 3.900,- pro Person</strong></p>
<ul><li>&euro; 900,- Anzahlung bei Anmeldung im Studio</li><li>&euro; 3.000,- Restbetrag bei Kursbeginn</li></ul>
<p><em>Anmeldung gilt erst nach unterschriebenem Vertrag &amp; Anzahlung verbindlich.</em></p>
<h3 style="color:#bb3599">Wichtig</h3>
<ul><li>Es wird ausschlie&szlig;lich auf &Uuml;bungshaut gearbeitet</li><li>Keine T&auml;towierungen an echten Menschen</li><li>Die Teilnahme berechtigt nicht zum selbstst&auml;ndigen T&auml;towieren</li></ul>
<h3 style="color:#bb3599">R&uuml;cktritt &amp; Umbuchung</h3>
<ul><li>Umbuchung bis 3 Wochen vor Kursbeginn m&ouml;glich</li><li>Bei Absage innerhalb von 3 Wochen oder Nichterscheinen: Anzahlung als Aufwandentsch&auml;digung</li></ul>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<p><strong>Kontakt:</strong></p>
<p>Eve Paule<br>
&#128231; eve@skinlove-tattoo-piercing.at<br>
&#128222; +43 660 78 35 346<br>
&#127760; www.skinlove-tattoo-piercing.at</p>
<p style="color:#888;font-size:12px;margin-top:32px;text-align:center">SkinLove Tattoo &amp; Piercing &bull; Linzer Stra&szlig;e 35, 4614 Marchtrenk</p>
</div></body></html>`;
}

function getPiercingEmailHtml(name: string) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#0a0a0a;color:#e0e0e0;padding:40px 20px;margin:0">
<div style="max-width:640px;margin:0 auto;background:#111;border-radius:12px;padding:40px;border:1px solid rgba(187,53,153,.2)">
<div style="text-align:center;margin-bottom:32px">
<h1 style="color:#bb3599;font-size:28px;margin:0">SkinLove</h1>
<p style="color:#888;font-size:14px">Tattoo &amp; Piercing Studio</p>
</div>
<p>Hallo <strong>${name}</strong>,</p>
<p>vielen Dank f&uuml;r deine Anmeldung zum <strong>Piercing-Kurs</strong>! Hier sind alle wichtigen Infos:</p>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<h2 style="color:#bb3599;font-size:20px">Piercing-Kurs &ndash; Praxisorientiert</h2>
<p>Der praxisorientierte Piercing-Kurs richtet sich an vollj&auml;hrige Personen, die das Piercen strukturiert, professionell und mit starkem Praxisfokus erlernen oder vertiefen m&ouml;chten.</p>
<h3 style="color:#bb3599">F&uuml;r wen?</h3>
<ul><li>Anf&auml;nger:innen ohne Vorkenntnisse</li><li>Fortgeschrittene Piercer:innen</li><li>Wiedereinsteiger:innen nach l&auml;ngerer Pause</li><li>Personen mit Studio- oder Praxiserfahrung</li></ul>
<h3 style="color:#bb3599">Kursdauer &amp; Zeiten</h3>
<ul><li><strong>Laufzeit:</strong> 1 Monat</li><li><strong>Einheiten:</strong> 2x pro Woche</li><li><strong>Uhrzeit:</strong> 17:00 &ndash; 19:00 Uhr</li><li><strong>Umfang:</strong> ca. 8 Termine</li><li><strong>Gruppengroesse:</strong> max. 3 Teilnehmer:innen</li></ul>
<h3 style="color:#bb3599">Kursort</h3>
<p>SkinLove Tattoo &amp; Piercing<br>Linzer Stra&szlig;e 35, 1. OG, Top 8, 4614 Marchtrenk</p>
<h3 style="color:#bb3599">Kursinhalt</h3>
<p><strong>Woche 1 (Einstieg):</strong> Studiobesichtigung, Materialkunde, Hygieneabl&auml;ufe, Aufkl&auml;rungsgespr&auml;che, Nachsorge</p>
<p><strong>Woche 2 (Vorbereitung):</strong> Modelle mitbringen (noch kein Piercen), Kundenkommunikation, Anzeichnen, Platzierung &amp; Anatomie</p>
<p><strong>Woche 3-4 (Praxis):</strong> Aktives Piercen unter professioneller Anleitung, max. 2 Piercings pro Teilnehmer:in pro Termin</p>
<h3 style="color:#bb3599">M&ouml;gliche Piercingstellen</h3>
<p>Nase, Septum, Ohr (Tragus, Conch u.a.), Augenbraue, Lippe, Zunge, Bauchnabel, Brustwarzenpiercing, Intimpiercings (modell- &amp; situationsabh&auml;ngig)</p>
<h3 style="color:#bb3599">Modelle &amp; Umkostenbeitrag</h3>
<ul><li>Modelle sind selbst mitzubringen</li><li>Umkostenbeitrag: &euro; 35,- pro Modell</li><li>Deckt Verbrauchsmaterialien, Schmuck &amp; Hygiene</li></ul>
<h3 style="color:#bb3599">Kurspreis</h3>
<p style="font-size:20px"><strong>&euro; 2.900,- pro Person</strong></p>
<ul><li>&euro; 900,- Anzahlung bei Anmeldung im Studio</li><li>&euro; 2.000,- Restbetrag vor Kursbeginn</li></ul>
<p><em>Die Anzahlung ist verbindlich.</em></p>
<h3 style="color:#bb3599">Ausstattung</h3>
<ul><li>Verbrauchsmaterialien werden bereitgestellt</li><li>Block f&uuml;r Notizen &amp; Skizzen (darfst du behalten)</li><li>Kaffee, Tee &amp; Wasser vorhanden</li></ul>
<h3 style="color:#bb3599">Abschluss</h3>
<p>Teilnahmebest&auml;tigung / praxisorientiertes Zertifikat. Dokumentiert die absolvierte praktische Ausbildung.</p>
<p><em>Berechtigt nicht automatisch zum selbstst&auml;ndigen Piercen.</em></p>
<hr style="border:none;border-top:1px solid rgba(187,53,153,.2);margin:24px 0">
<p><strong>Kontakt:</strong></p>
<p>Eve Paule<br>
&#128231; eve@skinlove-tattoo-piercing.at<br>
&#128222; +43 660 78 35 346<br>
&#127760; www.skinlove-tattoo-piercing.at</p>
<p style="color:#888;font-size:12px;margin-top:32px;text-align:center">SkinLove Tattoo &amp; Piercing &bull; Linzer Stra&szlig;e 35, 4614 Marchtrenk</p>
</div></body></html>`;
}
