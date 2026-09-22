import { test } from "node:test";
import assert from "node:assert/strict";
import * as mails from "./anfrage-mails";
import { baueAnfrageBestaetigung } from "./anfrage-mails";

/**
 * Diese Tests bewachen die Stellen, an denen ein Fehler Geld oder Vertrauen
 * kostet — nicht die Gestaltung. Wer hier etwas rot macht, hat einen echten
 * Grund zu prüfen, ob die Änderung so gewollt war.
 */

const beispiel = {
  name: "Maria Musterfrau",
  email: "maria@example.at",
  phone: "+43 660 1234567",
  service: "Piercing",
  message: "Ich hätte gern ein Nasenpiercing.",
};

test("An den Betrieb geht keine Mail — Eve will nur Telegram", () => {
  // Eve hat am 22.09.2026 gesagt: keine Mails, die Telegram-Nachricht reicht.
  // Am Tag davor hatte ein Agent gleich zwei Betriebsmails eingebaut, gut
  // gemeint als zweiter Meldeweg. Dieser Test sorgt dafür, dass das nicht
  // unbemerkt wiederkommt. Eves Meldeweg ist Telegram, ihr Nachschlagewerk
  // das Dashboard.
  const anBetrieb = Object.keys(mails).filter((name) =>
    /betrieb|kursanmeldung/i.test(name),
  );
  assert.deepEqual(
    anBetrieb,
    [],
    `Mail an den Betrieb ist wieder da: ${anBetrieb.join(", ")}`,
  );
});

test("Bestätigung sagt, dass noch kein Termin vereinbart ist", () => {
  const { html } = baueAnfrageBestaetigung(beispiel);
  // Eine Mail, die als Terminzusage gelesen wird, stellt jemanden vor eine
  // verschlossene Tür — und der Ärger landet bei Eve.
  assert.match(html, /kein.{0,20}fixer Termin/i);
});

test("Bestätigung verspricht keine Reaktionszeit", () => {
  const { html } = baueAnfrageBestaetigung(beispiel);
  // Unbelegte Reaktionszusagen ("Antwort binnen 24 Stunden") sind in
  // Österreich nach UWG abmahnbar. Sie dürfen hier nicht einziehen.
  const zusagen = [
    /\d+\s*(Stunden|Std|h)\b/i,
    /am selben (Werk)?tag/i,
    /binnen \d/i,
    /innerhalb von \d/i,
    /umgehend|sofort zurück/i,
  ];
  for (const muster of zusagen) {
    assert.doesNotMatch(html, muster, `Reaktionszusage gefunden: ${muster}`);
  }
});

test("Bestätigung trägt Name und Leistung der Kundin", () => {
  const { html, subject } = baueAnfrageBestaetigung(beispiel);
  assert.match(html, /Maria Musterfrau/);
  assert.match(html, /Piercing/);
  assert.ok(subject.length > 0 && subject.length < 120);
});

test("Bestätigung hält fest, was wann angefragt wurde", () => {
  // Der Nachweis-Teil: Eve muss im Streitfall zeigen können, was die Kundin
  // geschickt hat und wann. Die Uhrzeit steht in Wiener Zeit — der Server
  // läuft auf UTC, eine um zwei Stunden verschobene Uhrzeit wäre als
  // Nachweis wertlos.
  const { html } = baueAnfrageBestaetigung({
    ...beispiel,
    eingegangen: new Date("2026-09-22T12:35:00Z"),
  });
  assert.match(html, /22\.09\.2026/);
  assert.match(html, /14:35/);
  assert.match(html, /\+43 660 1234567/);
  assert.match(html, /Nasenpiercing/);
});

test("Bestätigung kommt auch ohne gewählte Leistung zustande", () => {
  const { html } = baueAnfrageBestaetigung({ ...beispiel, service: null });
  assert.match(html, /Maria Musterfrau/);
  assert.match(html, /kein.{0,20}fixer Termin/i);
});

test("Bestätigung kommt auch mit fehlenden Feldern zustande", () => {
  const { html } = baueAnfrageBestaetigung({
    name: "Nur Name",
    email: "n@example.at",
    phone: null,
    service: null,
    message: null,
  });
  assert.match(html, /Nur Name/);
});

test("Eingeschleustes HTML aus dem Formular wird entschärft", () => {
  // Name und Nachricht kommen ungefiltert aus einem Formular im Internet.
  // Ohne Entschärfung landet fremdes Markup im Postfach der Kundin.
  const boshaft = {
    ...beispiel,
    name: '<img src=x onerror="alert(1)">',
    message: "<script>fetch('http://boese.example')</script>",
  };
  const { html } = baueAnfrageBestaetigung(boshaft);
  // Kein echtes Tag: die spitze Klammer muss zu &lt; geworden sein.
  assert.doesNotMatch(html, /<script/i);
  assert.doesNotMatch(html, /<img/i);
  // Und kein roher Ereignis-Handler. `onerror=&quot;` ist harmloser Text,
  // `onerror="` wäre ausführbar — nur Letzteres darf fehlen.
  assert.doesNotMatch(html, /onerror="/i);
  // Entschärft heißt sichtbar gemacht, nicht verschwunden.
  assert.match(html, /&lt;script&gt;/);
});
