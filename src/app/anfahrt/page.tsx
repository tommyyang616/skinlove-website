import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tattoo & Piercing für Wels und Linz – Anfahrt nach Marchtrenk",
  description:
    "SkinLove liegt in Marchtrenk im Bezirk Wels-Land, rund 8 km von Wels und 25 km von Linz. Anfahrt mit Auto, Bus und Bahn – Tattoo, Piercing, Permanent Make-up bei Eve Paule.",
  alternates: { canonical: "/anfahrt" },
  openGraph: {
    title: "Anfahrt zu SkinLove – aus Wels, Linz und Umgebung",
    description:
      "Marchtrenk liegt zwischen Wels und Linz. So kommst du zum Studio in der Linzer Straße 35.",
    url: "/anfahrt",
    type: "website",
  },
};

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
            Tattoo &amp; Piercing für Wels und Linz
          </h1>
          <p style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text-dim)", marginBottom: 40, textAlign: "center" }}>
            Das Studio liegt in Marchtrenk im Bezirk Wels-Land, direkt zwischen Wels und Linz.
            Von Wels aus bist du in etwa zehn Minuten da, von Linz in rund einer halben Stunde.
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
