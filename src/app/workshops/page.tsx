import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workshops & Tattoo Kurse – Lerne tätowieren",
  description:
    "Tattoo Workshops & Kurse bei SkinLove in Marchtrenk. Lerne tätowieren unter professioneller Anleitung – für Anfänger & Fortgeschrittene. Material inklusive!",
  alternates: { canonical: "/workshops" },
  openGraph: {
    title: "Tattoo Workshops & Kurse bei SkinLove",
    description:
      "Lerne tätowieren unter professioneller Anleitung bei SkinLove in Marchtrenk. Material inklusive!",
    url: "/workshops",
    type: "website",
  },
};

export default function WorkshopsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 60px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "var(--pink-text)",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        Workshops &amp; Kurse
      </p>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 600,
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        Lerne tätowieren bei SkinLove
      </h1>
      <p
        style={{
          maxWidth: 600,
          lineHeight: 1.8,
          fontSize: 16,
          color: "var(--text-dim)",
          marginBottom: 16,
        }}
      >
        Du wolltest schon immer selbst tätowieren lernen? In unseren Workshops
        zeigen wir dir unter professioneller Anleitung die Grundlagen – vom
        Maschinenaufbau über Hygiene bis zum ersten Stich auf Übungshaut.
        Sämtliches Material ist inklusive!
      </p>
      <p
        style={{
          maxWidth: 600,
          lineHeight: 1.8,
          fontSize: 15,
          color: "var(--text-dim)",
          marginBottom: 32,
        }}
      >
        Unsere Kurse sind für Anfänger und Fortgeschrittene geeignet.
        Mindestalter: 18 Jahre. Kleine Gruppen für individuelle Betreuung.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/#workshop"
          style={{
            padding: "14px 32px",
            background: "var(--pink)",
            color: "#fff",
            borderRadius: 50,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Aktuelle Termine
        </Link>
        <Link
          href="/#contact"
          style={{
            padding: "14px 32px",
            border: "1px solid rgba(255,255,255,.2)",
            color: "var(--text)",
            borderRadius: 50,
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </main>
  );
}
