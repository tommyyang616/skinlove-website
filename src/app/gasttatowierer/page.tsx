import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gasttätowierer – Guest Artists bei SkinLove",
  description: "Internationale Gasttätowierer bei SkinLove in Marchtrenk. Regelmäßige Guest Spots mit Top-Künstlern aus ganz Europa – jetzt Termin sichern!",
  alternates: { canonical: "/gasttatowierer" },
  openGraph: {
    title: "Gasttätowierer bei SkinLove Tattoo & Piercing",
    description: "Internationale Gasttätowierer bei SkinLove in Marchtrenk. Regelmäßig wechselnde Guest Artists.",
    url: "/gasttatowierer",
    type: "website",
  },
};

export default function GasttatowiererPage() {
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
        Guest Artists
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
        Gasttätowierer bei SkinLove
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
        Regelmäßig begrüßen wir internationale Tattoo-Künstler als Gäste bei
        SkinLove. Jeder bringt seinen eigenen Stil mit — von Fine Line über
        Realistic bis hin zu Japanese und Neo-Traditional. Sichere dir deinen
        exklusiven Termin mit einem unserer Guest Artists!
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
        Die Guest Spots werden auf unserer Startseite und auf Instagram
        angekündigt. Folge uns, um keinen Termin zu verpassen.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/#guest-artists"
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
          Aktuelle Guest Artists
        </Link>
        <Link
          href="https://www.instagram.com/skinlove_tattoopiercing/"
          target="_blank"
          rel="noopener noreferrer"
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
          Instagram folgen
        </Link>
      </div>
    </main>
  );
}