import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – SkinLove Tattoo & Piercing",
};

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>

        <div className="space-y-6 text-[var(--text-dim)] text-[15px] leading-relaxed">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white">
            1. Datenschutz auf einen Blick
          </h2>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            2. Verantwortliche Stelle
          </h2>
          <p>
            SkinLove Tattoo Piercing
            <br />
            Eve Paule
            <br />
            Linzer Straße 35, 1. OG
            <br />
            4614 Marchtrenk
            <br />
            Österreich
          </p>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:eve@skinlove-tattoo-piercing.at"
              className="text-[var(--pink)] hover:underline"
            >
              eve@skinlove-tattoo-piercing.at
            </a>
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            3. Datenerfassung auf dieser Website
          </h2>
          <p>
            Beim Besuch dieser Website werden automatisch Informationen durch den
            Hosting-Provider erfasst (sog. Server-Log-Dateien). Dies umfasst:
            Browsertyp und -version, verwendetes Betriebssystem, Referrer URL,
            Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage,
            IP-Adresse.
          </p>
          <p>
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
            Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der technisch fehlerfreien Darstellung
            der Website).
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            4. Workshop-Buchung
          </h2>
          <p>
            Bei der Buchung eines Workshops oder einer Anfrage über unsere
            Formulare werden insbesondere Name, E-Mail-Adresse, optionale
            Nachrichteninhalte und je nach Anfrage die gewählte Leistung bzw.
            der gewünschte Workshop verarbeitet. Diese Daten werden in unserer
            Datenbank gespeichert und ausschließlich zur Bearbeitung Ihrer
            Anfrage bzw. Buchung verwendet.
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            5. Hosting
          </h2>
          <p>
            Diese Website wird bei Vercel Inc. gehostet. Die Server befinden
            sich in der EU. Weitere Informationen finden Sie in der
            Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pink)] hover:underline"
            >
              vercel.com/legal/privacy-policy
            </a>
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            6. Google Fonts
          </h2>
          <p>
            Diese Website bindet Schriftarten von Google Fonts ein. Dabei kann
            eine Verbindung zu Servern von Google hergestellt werden. Die
            Nutzung erfolgt im Interesse einer einheitlichen und ansprechenden
            Darstellung der Website.
          </p>

          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white pt-4">
            7. Ihre Rechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
            Bitte wenden Sie sich dazu an die oben genannte verantwortliche
            Stelle.
          </p>
          <p>
            Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen
            das Datenschutzrecht verstößt, haben Sie das Recht, bei der
            Österreichischen Datenschutzbehörde Beschwerde einzulegen.
          </p>
        </div>
      </div>
    </div>
  );
}
