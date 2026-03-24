import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum \u2013 SkinLove Tattoo & Piercing",
  description: "Impressum von SkinLove Tattoo & Piercing in Marchtrenk. Inhaberin Eve Paule. Angaben gem\u00E4\u00DF ECG \u00A7 5, Gewerbeordnung \u00A7 63, Mediengesetz \u00A7 25.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

const S = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white mb-4">{t}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-[var(--pink)] hover:underline" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{children}</a>
);

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="fixed top-0 left-0 w-full z-50 py-5 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(187,53,153,0.08)]">
        <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white hover:text-[var(--pink)] transition-colors">SkinLove</Link>
          <Link href="/" className="text-xs tracking-[2px] uppercase text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors">{"\u2190"} Zur{"\u00FC"}ck</Link>
        </div>
      </header>
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-12">Impressum</h1>
        <div className="text-[var(--text-dim)] text-[15px] leading-relaxed">

          {/* --- ECG §5 Pflichtangaben --- */}
          <S t={"Informationspflicht gem\u00E4\u00DF ECG \u00A7 5"}>
            <p><strong className="text-white">SkinLove Tattoo &amp; Piercing</strong></p>
            <p><strong className="text-white">Eve Paule</strong> (Inhaberin)</p>
            <p>Linzer Stra{"\u00DF"}e 35, 1. OG<br />4614 Marchtrenk<br />{"\u00D6"}sterreich</p>
            <p>Telefon: <A href="tel:+436607835346">+43 660 783 5346</A><br />E-Mail: <A href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</A><br />Website: <A href="https://skinlove-tattoo-piercing.at">skinlove-tattoo-piercing.at</A></p>
          </S>

          <S t="Unternehmensgegenstand">
            <p>T{"\u00E4"}towieren, Piercen, Permanent Make-up, Lash &amp; Brow Lifting, kosmetische Dienstleistungen, Tattoo-Workshops</p>
          </S>

          <S t="Mitgr{'\u00FC'}nder">
            <p><strong className="text-white">Miro Urbanek</strong></p>
          </S>

          {/* --- GewO §63 Pflichtangaben --- */}
          <S t={"Gewerberechtliche Angaben gem\u00E4\u00DF GewO \u00A7 63"}>
            <p><strong className="text-white">Gewerbewortlaut:</strong></p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Freies Gewerbe: K{"\u00F6"}rperschmuck (T{"\u00E4"}towieren, Piercen)</li>
              <li>Reglementiertes Gewerbe: Kosmetik (Schminken, dekorative Pflege)</li>
            </ul>
            <p><strong className="text-white">Gewerbebeh{"\u00F6"}rde:</strong> Bezirkshauptmannschaft Wels-Land</p>
            <p><strong className="text-white">Verleihungsbeh{"\u00F6"}rde:</strong> Bezirkshauptmannschaft Wels-Land</p>
          </S>

          {/* --- Kammerzugehörigkeit (ECG §5 Abs 1 Z 6) --- */}
          <S t="Kammerzugeh{'\u00F6'}rigkeit">
            <p>Mitglied der Wirtschaftskammer Ober{"\u00F6"}sterreich<br />Fachgruppe der Fu{"\u00DF"}pfleger, Kosmetiker und Masseure</p>
          </S>

          {/* --- Anwendbare Rechtsvorschriften (ECG §5 Abs 1 Z 7) --- */}
          <S t="Anwendbare Rechtsvorschriften">
            <p>Gewerbeordnung 1994 (GewO): <A href="https://www.ris.bka.gv.at">www.ris.bka.gv.at</A></p>
            <p>Kosmetikverordnung</p>
            <p>E-Commerce-Gesetz (ECG)</p>
          </S>

          {/* --- Aufsichtsbehörde --- */}
          <S t={"Aufsichtsbeh\u00F6rde"}>
            <p>Bezirkshauptmannschaft Wels-Land<br />Dr.-Scha{"\u00FC"}er-Stra{"\u00DF"}e 4<br />4600 Wels<br />{"\u00D6"}sterreich</p>
          </S>

          {/* --- Offenlegung nach MedienG §25 --- */}
          <S t={"Offenlegung gem\u00E4\u00DF Mediengesetz \u00A7 25"}>
            <p><strong className="text-white">Medieninhaber:</strong> Eve Paule</p>
            <p><strong className="text-white">Sitz:</strong> 4614 Marchtrenk</p>
            <p><strong className="text-white">Unternehmensgegenstand:</strong> Pr{"\u00E4"}sentation des Unternehmens und seiner Dienstleistungen</p>
            <p><strong className="text-white">Grundlegende Richtung:</strong> Information {"\u00FC"}ber das Leistungsangebot von SkinLove Tattoo &amp; Piercing (Tattoos, Piercings, Permanent Make-up, Lash &amp; Brow Lifting, Workshops) sowie Kontaktm{"\u00F6"}glichkeiten f{"\u00FC"}r Kunden.</p>
          </S>

          {/* --- ODR-Verordnung --- */}
          <S t="Online-Streitbeilegung (ODR)">
            <p>Die Europ{"\u00E4"}ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:</p>
            <p><A href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</A></p>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </S>

          {/* --- Haftung --- */}
          <S t={"Haftung f\u00FCr Inhalte"}>
            <p>Die Inhalte dieser Website wurden mit gr{"\u00F6"}{"\u00DF"}ter Sorgfalt erstellt. F{"\u00FC"}r die Richtigkeit, Vollst{"\u00E4"}ndigkeit und Aktualit{"\u00E4"}t der Inhalte {"\u00FC"}bernehmen wir jedoch keine Gew{"\u00E4"}hr. Als Diensteanbieter sind wir gem{"\u00E4"}{"\u00DF"} ECG {"\u00A7"} 16 f{"\u00FC"}r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
          </S>

          <S t={"Haftung f\u00FCr Links"}>
            <p>Unsere Website enth{"\u00E4"}lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. F{"\u00FC"}r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m{"\u00F6"}gliche Rechtsverst{"\u00F6"}{"\u00DF"}e {"\u00FC"}berpr{"\u00FC"}ft. Eine permanente inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte nicht zumutbar.</p>
          </S>

          <S t="Urheberrecht">
            <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem {"\u00F6"}sterreichischen Urheberrecht. Die Vervielf{"\u00E4"}ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au{"\u00DF"}erhalb der Grenzen des Urheberrechts bed{"\u00FC"}rfen der schriftlichen Zustimmung der Inhaberin. Downloads und Kopien dieser Seite sind nur f{"\u00FC"}r den privaten, nicht kommerziellen Gebrauch gestattet.</p>
            <p>Alle auf dieser Website verwendeten Fotos und Grafiken sind Eigentum von SkinLove Tattoo &amp; Piercing oder wurden mit Genehmigung der jeweiligen Rechteinhaber verwendet.</p>
          </S>

          <div className="mt-16 pt-8 border-t border-[rgba(187,53,153,0.1)]">
            <p className="text-sm text-[var(--text-dim)] opacity-70">Stand: M{"\u00E4"}rz 2025</p>
          </div>

        </div>
      </div>
    </div>
  );
}
