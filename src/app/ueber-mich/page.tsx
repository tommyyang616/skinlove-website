import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über Eve Paule – Inhaberin & Tattoo-Künstlerin",
  description:
    "Lerne Eve Paule kennen – Gründerin von SkinLove Tattoo & Piercing in Marchtrenk. Über 10 Jahre Erfahrung in Tattoo, Piercing & Permanent Make-up.",
  alternates: { canonical: "/ueber-mich" },
  openGraph: {
    title: "Über Eve Paule – SkinLove Tattoo & Piercing",
    description:
      "Lerne Eve Paule kennen – Gründerin von SkinLove Tattoo & Piercing in Marchtrenk bei Wels.",
    url: "/ueber-mich",
    type: "profile",
  },
};

export default function UeberMichPage() {
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
        Die Künstlerin
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
        Eve Paule
      </h1>
      <p
        style={{
          maxWidth: 600,
          lineHeight: 1.8,
          fontSize: 16,
          color: "var(--text-dim)",
          marginBottom: 32,
        }}
      >
        SkinLove ist mehr als ein Studio – es ist Leidenschaft, Hingabe und
        Liebe zur Körperkunst. Eve Paule hat SkinLove Tattoo &amp; Piercing in
        Marchtrenk gegründet, um jedem Kunden ein einzigartiges und
        persönliches Erlebnis zu bieten. Mit über einem Jahrzehnt Erfahrung in
        Tattoo, Piercing und Permanent Make-up steht Qualität, Hygiene und
        individuelle Beratung an erster Stelle.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/#about"
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
          Mehr erfahren
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
          Kontakt
        </Link>
      </div>
    </main>
  );
}
