import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tattoo & Piercing in Oberösterreich – Anfahrt aus Wels und Linz",
  description:
    "SkinLove liegt in Marchtrenk im Bezirk Wels-Land, zentral zwischen Wels und Linz. Fahrzeiten aus ganz Oberösterreich, Anfahrt mit Auto, Bus und Bahn – Tattoo, Piercing, Permanent Make-up bei Eve Paule.",
  alternates: { canonical: "/anfahrt" },
  openGraph: {
    title: "Anfahrt zu SkinLove – aus Wels, Linz und ganz Oberösterreich",
    description:
      "Marchtrenk liegt zentral zwischen Wels und Linz. So kommst du zum Studio in der Linzer Straße 35.",
    url: "/anfahrt",
    type: "website",
  },
};

/**
 * Fahrzeiten zum Studio. Die Kilometer sind aus den Koordinaten gerechnet
 * (Luftlinie mal 1,25, dem üblichen Umwegfaktor) und deshalb bewusst als
 * „rund" ausgewiesen. Gegenprobe an Wels: Rechnung 9 km, Routenplaner nennen
 * 7,2 bis 9,2 km — die Größenordnung stimmt.
 */
const einzugsgebiet: { ort: string; km: number; min: number }[] = [
  { ort: "Hörsching", km: 8, min: 10 },
  { ort: "Wels", km: 9, min: 10 },
  { ort: "Traun", km: 12, min: 10 },
  { ort: "Pasching", km: 12, min: 10 },
  { ort: "Ansfelden", km: 16, min: 15 },
  { ort: "Leonding", km: 17, min: 15 },
  { ort: "Gunskirchen", km: 17, min: 15 },
  { ort: "Sattledt", km: 18, min: 15 },
  { ort: "Bad Schallerbach", km: 18, min: 15 },
  { ort: "Eferding", km: 19, min: 15 },
  { ort: "Kremsmünster", km: 19, min: 20 },
  { ort: "Linz", km: 22, min: 20 },
  { ort: "Lambach", km: 26, min: 25 },
  { ort: "Grieskirchen", km: 27, min: 25 },
  { ort: "Enns", km: 33, min: 30 },
  { ort: "Steyr", km: 35, min: 35 },
];

const wege = [
  {
    titel: "Aus Wels",
    zeit: "rund 10 Minuten mit dem Auto",
    text: "Zwischen Wels und Marchtrenk liegen je nach Route sieben bis neun Kilometer. Über die B1 bist du in etwa zehn Minuten da. Mit dem Bus fährt die Linie 600 (Wels – Marchtrenk – Hörsching – Linz) durch die Linzer Straße; die Haltestelle liegt in derselben Straße wie das Studio.",
  },
  {
    titel: "Aus Linz",
    zeit: "rund 25 Minuten mit dem Auto",
    text: "Marchtrenk liegt an der Achse zwischen Linz und Wels, Anschluss über die A25 oder die B1. Mit den Öffis fährt die Buslinie 600 durchgehend von Linz über Hörsching bis Marchtrenk.",
  },
  {
    titel: "Mit der Bahn",
    zeit: "Bahnhof Marchtrenk",
    text: "Marchtrenk liegt an der Westbahnstrecke zwischen Linz und Wels und hat einen eigenen Bahnhof. Von dort sind es wenige Minuten bis in die Linzer Straße.",
  },
];

const leistungen: [string, string][] = [
  ["Tattoos", "/leistungen/tattoos"],
  ["Piercings", "/leistungen/piercings"],
  ["Permanent Make-up", "/leistungen/permanent-make-up"],
  ["Lash & Brow Lifting", "/leistungen/lash-brow-lifting"],
  ["Kinderohrringe", "/leistungen/kinderohrringe"],
  ["Spezialleistungen", "/leistungen/spezialleistungen"],
];

const karte: React.CSSProperties = {
  background: "#141414",
  border: "1px solid rgba(255,255,255,.07)",
  padding: "20px 22px",
  marginBottom: 14,
};

export default function AnfahrtPage() {
  return (
    <>
      <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "var(--pink-text)", fontWeight: 600, marginBottom: 12, textAlign: "center" }}>
            Anfahrt
          </p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: 20, textAlign: "center" }}>
            Tattoo &amp; Piercing in Oberösterreich
          </h1>
          <p style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text-dim)", marginBottom: 40, textAlign: "center" }}>
            Das Studio liegt in Marchtrenk im Bezirk Wels-Land, direkt zwischen Wels und Linz.
            Aus dem halben Zentralraum Oberösterreichs bist du in einer Viertelstunde da —
            aus Wels in zehn Minuten, aus Linz in zwanzig.
          </p>

          {wege.map((w) => (
            <div key={w.titel} style={karte}>
              <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{w.titel}</h2>
              <p style={{ color: "var(--pink-text)", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{w.zeit}</p>
              <p style={{ color: "#bbb", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{w.text}</p>
            </div>
          ))}

          <div style={{ ...karte, marginTop: 24, marginBottom: 32 }}>
            <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 600, marginBottom: 10 }}>Wo genau</h2>
            <p style={{ color: "#bbb", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              Linzer Straße 35, 1. Obergeschoss, im Marktcenter
              <br />
              4614 Marchtrenk, Oberösterreich
              <br />
              <br />
              Termine ausschließlich nach Vereinbarung — Mo–Fr 9–18 Uhr, Sa 10–17 Uhr.
              <br />
              <a href="tel:+436607835346" style={{ color: "var(--pink-text)", fontWeight: 600 }}>
                +43 660 78 353 46
              </a>
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#fff", fontWeight: 600, marginBottom: 6 }}>
            Fahrzeiten aus Oberösterreich
          </h2>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
            Marchtrenk liegt zwischen Wels und Linz an der B1, mit Anschluss an
            die A25 und die Westbahn. Ungefähre Werte für die Fahrt mit dem Auto:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: "0 20px",
              marginBottom: 32,
            }}
          >
            {einzugsgebiet.map((e) => (
              <div
                key={e.ort}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,.07)",
                }}
              >
                <span style={{ color: "#ddd", fontSize: 14 }}>{e.ort}</span>
                <span style={{ color: "#888", fontSize: 13, whiteSpace: "nowrap" }}>
                  {`rund ${e.km} km · ${e.min} Min`}
                </span>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#fff", fontWeight: 600, marginBottom: 16 }}>
            Was dich hier erwartet
          </h2>
          <p style={{ color: "#bbb", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
            Eve Paule tätowiert und piercet seit über zehn Jahren. Jeder Termin wird vorher
            besprochen, gearbeitet wird ausschließlich nach Vereinbarung — keine Laufkundschaft,
            keine Hektik. Regelmäßig arbeiten Gasttätowierer mit eigenen Stilrichtungen im Studio.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {leistungen.map(([name, pfad]) => (
              <Link
                key={pfad}
                href={pfad}
                style={{ padding: "10px 18px", border: "1px solid rgba(255,255,255,.14)", color: "var(--text)", borderRadius: 50, fontSize: 14, textDecoration: "none" }}
              >
                {name}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="https://www.google.com/maps/dir//Linzer+Stra%C3%9Fe+35,+4614+Marchtrenk,+%C3%96sterreich"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "14px 32px", background: "var(--pink)", color: "#fff", borderRadius: 50, fontWeight: 600, fontSize: 14, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase" }}
            >
              Route berechnen
            </a>
            <Link
              href="/#contact"
              style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,.2)", color: "var(--text)", borderRadius: 50, fontWeight: 500, fontSize: 14, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase" }}
            >
              Termin anfragen
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
