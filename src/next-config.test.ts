import { test } from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config";

/**
 * Bewacht zwei Einstellungen, die man der Seite nicht ansieht: Fehlen sie,
 * sieht alles normal aus, und niemand merkt es. Eingebaut am 22.09.2026.
 */

const HAUPTADRESSE = "skinlove-tattoo-piercing.at";

test("Sicherheitskopfzeilen gelten für jede Seite", async () => {
  const regeln = (await nextConfig.headers?.()) ?? [];
  const alleSeiten = regeln.find((r) => r.source === "/:path*" && !r.has && !r.missing);
  assert.ok(alleSeiten, "Keine Kopfzeilen-Regel für alle Seiten gefunden");

  const gesetzt = Object.fromEntries(alleSeiten.headers.map((h) => [h.key.toLowerCase(), h.value]));
  assert.equal(gesetzt["x-frame-options"], "SAMEORIGIN");
  assert.equal(gesetzt["x-content-type-options"], "nosniff");
  assert.equal(gesetzt["referrer-policy"], "strict-origin-when-cross-origin");
});

test("www leitet dauerhaft auf die Hauptadresse um — und nur www", async () => {
  const regeln = (await nextConfig.redirects?.()) ?? [];
  const www = regeln.find((r) => r.has?.some((h) => h.type === "host"));
  assert.ok(www, "Keine Umleitung nach Host gefunden");

  const host = www.has?.find((h) => h.type === "host");
  assert.equal(host?.value, `www.${HAUPTADRESSE}`);
  assert.equal(www.destination, `https://${HAUPTADRESSE}/:path*`);
  assert.equal(www.permanent, true);

  // Träfe die Regel auch die Hauptadresse, leitete sie auf sich selbst um —
  // eine Endlosschleife, und die ganze Seite wäre weg.
  const hostRegeln = regeln.flatMap((r) => r.has ?? []).filter((h) => h.type === "host");
  assert.ok(
    hostRegeln.every((h) => h.value !== HAUPTADRESSE),
    "Eine Umleitung greift auf der Hauptadresse selbst",
  );
});
