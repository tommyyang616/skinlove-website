"use client";

/**
 * Bildadressen für `next/image` — an Vercels Optimierer vorbei.
 *
 * ── Warum das hier steht (01.09.2026) ──────────────────────────────────────
 *
 * Auf der Startseite fehlten im Abschnitt „Guest Artists" reihenweise Bilder
 * und zeigten den Fehlerplatzhalter. Nachgemessen an dem Tag:
 *
 *     /gallery/guests/nadija1.jpg                    HTTP 200
 *     /_next/image?url=…nadija1.jpg&w=384&q=75       HTTP 200
 *     /_next/image?url=…nadija1.jpg&w=640&q=75       HTTP 402
 *     /_next/image?url=…nadija1.jpg&w=1080&q=75      HTTP 402
 *
 *     Payment required
 *     OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
 *
 * **Die Dateien waren nie weg.** Kaputt war Vercels Bildoptimierung: Ihr
 * Kontingent war aufgebraucht, und jede Umrechnung, die nicht zufällig noch im
 * Zwischenspeicher lag, kam als 402 zurück. Deshalb ging `w=384` noch und
 * `w=640` nicht — die kleine Größe war von früher da.
 *
 * Das Schwesterprojekt Nemo Print hatte denselben Ausfall am 24.08.2026, und
 * dort steht die Begründung ausführlich in `src/lib/bild-loader.ts`. Diese
 * Datei ist derselbe Griff, nur kleiner.
 *
 * ── Was der Loader tut ─────────────────────────────────────────────────────
 *
 * **Eigene Dateien gehen unverändert durch.** Die 44 Bilder unter
 * `public/gallery/` wiegen zusammen 5,2 MB — im Schnitt 121 KB, das größte
 * 205 KB. Sie sind bereits fürs Web aufbereitet; sie noch einmal umrechnen zu
 * lassen, hat nie viel gebracht und kostet ein Kontingent, das dann anderswo
 * fehlt. Sie kommen jetzt direkt vom Rand, ohne Funktionsaufruf.
 *
 * **Fremde Bilder laufen über wsrv.nl.** Die Galerie zieht ihre Aufnahmen von
 * `myhellocash.com`, und über deren Größe entscheidet niemand hier. wsrv.nl
 * (images.weserv.nl) holt das Bild, skaliert es und legt es als WebP hinter
 * Cloudflare ab — kostenlos, und für uns fällt weder Rechenzeit noch
 * Datenverkehr an.
 *
 * ── Was der Preis ist ──────────────────────────────────────────────────────
 *
 * Die eigenen Bilder werden nicht mehr je Bildschirmbreite verkleinert: Ein
 * Handy lädt dieselbe Datei wie ein großer Bildschirm. Bei 121 KB im Schnitt
 * ist das vertretbar — ein fehlendes Bild kostet mehr als ein etwas zu großes.
 *
 * Sollten hier je große Bilder dazukommen, ist der Ausbau eine Zeile: die
 * eigene Adresse absolut machen (`https://skinlove-tattoo-piercing.at` davor)
 * und ebenfalls durch wsrv.nl schicken. Dann muss aber die Entwicklung auf
 * localhost gesondert behandelt werden — dorthin kommt kein fremder Dienst.
 *
 * **Der Rückweg ist ebenfalls eine Zeile:** `loaderFile` aus `next.config.ts`
 * entfernen, dann rechnet wieder Vercel. Sinnvoll, sobald das Konto auf Pro
 * läuft und das Kontingent nicht mehr klemmt — nötig ist es nicht.
 */

/** Der Dienst holt das Bild selbst — er muss also von außen drankommen. */
const PROXY = "https://images.weserv.nl/";

export default function bildLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Eigene Dateien aus `public/` liegen relativ vor („/gallery/…"). Sie gehen
  // unverändert hinaus: In der Entwicklung läuft die Seite auf localhost, und
  // dorthin kommt kein fremder Dienst.
  if (!src.startsWith("http")) return src;

  const p = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 75),
    output: "webp",
  });
  // `we` = ohne Vergrößern. Ein Bild, das schmaler ist als die angefragte
  // Breite, würde sonst hochgerechnet — größere Datei, kein besseres Bild.
  return `${PROXY}?${p.toString()}&we`;
}
