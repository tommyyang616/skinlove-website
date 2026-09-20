import { test } from "node:test";
import assert from "node:assert/strict";
import { baueAnfrageBestaetigung, baueAnfrageAnBetrieb } from "./anfrage-mails";

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

test("Bestätigung sagt ausdrücklich, dass noch kein Termin vereinbart ist", () => {
  const { html } = baueAnfrageBestaetigung(beispiel);
  // Eine Mail mit "Bestätigung" im Betreff wird sonst als Terminzusage
  // gelesen — dann steht jemand vor verschlossener Tür.
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

test("Bestätigung kommt auch ohne gewählte Leistung zustande", () => {
  const { html } = baueAnfrageBestaetigung({ ...beispiel, service: null });
  assert.match(html, /Maria Musterfrau/);
  assert.match(html, /kein.{0,20}fixer Termin/i);
});

test("Betriebsmail trägt alle Angaben der Anfrage", () => {
  const { html, subject } = baueAnfrageAnBetrieb(beispiel);
  assert.match(html, /Maria Musterfrau/);
  assert.match(html, /maria@example\.at/);
  assert.match(html, /\+43 660 1234567/);
  assert.match(html, /Piercing/);
  assert.match(html, /Nasenpiercing/);
  // Der Betreff muss auf dem Handy erkennen lassen, worum es geht.
  assert.match(subject, /Maria Musterfrau/);
  assert.match(subject, /Piercing/);
});

test("Betriebsmail kommt auch mit fehlenden Feldern zustande", () => {
  const { html } = baueAnfrageAnBetrieb({
    name: "Nur Name",
    email: "n@example.at",
    phone: null,
    service: null,
    message: null,
  });
  assert.match(html, /Nur Name/);
  assert.match(html, /n@example\.at/);
});

test("Eingeschleustes HTML aus dem Formular wird entschärft", () => {
  // Der Name kommt ungefiltert aus einem Formular im Internet. Ohne
  // Entschärfung landet fremdes Markup in Eves Postfach.
  const boshaft = {
    ...beispiel,
    name: '<img src=x onerror="alert(1)">',
    message: "<script>fetch('http://boese.example')</script>",
  };
  const betrieb = baueAnfrageAnBetrieb(boshaft);
  const kundin = baueAnfrageBestaetigung(boshaft);
  for (const { html } of [betrieb, kundin]) {
    // Kein echtes Tag: die spitze Klammer muss zu &lt; geworden sein.
    assert.doesNotMatch(html, /<script/i);
    assert.doesNotMatch(html, /<img/i);
    // Und kein roher Ereignis-Handler. `onerror=&quot;` ist harmloser Text,
    // `onerror="` wäre ausführbar — nur Letzteres darf fehlen.
    assert.doesNotMatch(html, /onerror="/i);
  }
  // Entschärft heißt sichtbar gemacht, nicht verschwunden — Eve soll lesen
  // können, was ihr jemand geschickt hat.
  assert.match(betrieb.html, /&lt;script&gt;/);
  assert.match(betrieb.html, /&lt;img src=x/);
});
