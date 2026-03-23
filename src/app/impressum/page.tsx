import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – SkinLove Tattoo & Piercing",
  description: "Impressum von SkinLove Tattoo & Piercing in Marchtrenk. Inhaberin Eve Paule, Kontaktdaten und rechtliche Informationen.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="fixed top-0 left-0 w-full z-50 py-5 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(187,53,153,0.08)]">
        <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.jpg"
              alt="SkinLove Logo"
              width={160}
              height={40}
              className="h-10 object-contain brightness-110"
            />
          </Link>
          <Link
            href="/"
            className="text-xs tracking-[2px] uppercase text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
          >
            ← Zurück
          </Link>
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-white mb-10">
          Impressum
        </h1>

        <div className="space-y-6 text-[var(--text-dim)] text-[15px] leading-relaxed">
          <p>
            <strong className="text-white">SkinLove Tattoo Piercing</strong>
          </p>
          <p>
            Linzer Straße 35, 1. OG
            <br />
            4614 Marchtrenk
            <br />
            Österreich
          </p>
          <p>Freiberufler und Selbstständige</p>
          <p>
            <strong className="text-white">Tel:</strong>{" "}
            <a
              href="tel:+436607835346"
              className="text-[var(--pink)] hover:underline"
            >
              +43 660 783 5346
            </a>
          </p>
          <p>
            <strong className="text-white">E-Mail:</strong>{" "}
            <a
              href="mailto:eve@skinlove-tattoo-piercing.at"
              className="text-[var(--pink)] hover:underline"
            >
              eve@skinlove-tattoo-piercing.at
            </a>
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            Inhaberin
          </h2>
          <p>Eve Paule</p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            Mitgründer
          </h2>
          <p>Miro Urbanek</p>
        </div>
      </div>
    </div>
  );
}
