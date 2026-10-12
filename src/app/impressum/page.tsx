import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { teilenMeta } from "@/lib/teilen-meta";

const TITEL = "Impressum – SkinLove Tattoo & Piercing";
const BESCHREIBUNG = "Impressum von SkinLove Tattoo & Piercing in Marchtrenk. Inhaberin Eve Paule. Angaben gemäß ECG § 5, Gewerbeordnung § 63, Mediengesetz § 25.";

export const metadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
  ...teilenMeta(TITEL, BESCHREIBUNG, "/impressum"),
};

export default function Impressum() {
  return (
    <>
    <Navigation unterseite />
    <div className="legal-page">
      <div className="legal-content">
        <h1>Impressum</h1>

        <section className="legal-section">
          <h2>Informationspflicht gemäß ECG § 5</h2>
          <p><strong>SkinLove Tattoo &amp; Piercing</strong></p>
          <p><strong>Eve Paule</strong> (Inhaberin)</p>
          <p>Linzer Straße 35, 1. OG<br />4614 Marchtrenk<br />Österreich</p>
          <p>Telefon: <a href="tel:+436607835346">+43 660 783 5346</a><br />E-Mail: <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a><br />Website: <a href="https://skinlove-tattoo-piercing.at">skinlove-tattoo-piercing.at</a></p>
        </section>

        <section className="legal-section">
          <h2>Unternehmensgegenstand</h2>
          <p>Tätowieren, Piercen, Permanent Make-up, Lash &amp; Brow Lifting, Ohrlochstechen, Tattoo- und Piercing-Kurse</p>
        </section>


        <section className="legal-section">
          <h2>Gewerberechtliche Angaben gemäß GewO § 63 und ECG § 5</h2>
          <p><strong>Gewerbe:</strong> Kosmetik (Schönheitspflege) – reglementiertes Gewerbe, verliehen in Österreich</p>
          <p><strong>Gewerbebehörde:</strong> Bezirkshauptmannschaft Wels-Land</p>
        </section>

        <section className="legal-section">
          <h2>Kammerzugehörigkeit</h2>
          <p>Mitglied der Wirtschaftskammer Oberösterreich<br />Landesinnung der Fußpfleger, Kosmetiker und Masseure</p>
        </section>

        <section className="legal-section">
          <h2>Anwendbare Rechtsvorschriften</h2>
          <p>Gewerbeordnung 1994 (GewO) sowie Verordnung über Ausübungsregeln für das Piercen und Tätowieren (BGBl. II Nr. 141/2003 idF BGBl. II Nr. 261/2008), abrufbar unter <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer">www.ris.bka.gv.at</a></p>
        </section>

        <section className="legal-section">
          <h2>Aufsichtsbehörde</h2>
          <p>Bezirkshauptmannschaft Wels-Land<br />Herrengasse 8<br />4600 Wels<br />Österreich</p>
        </section>

        <section className="legal-section">
          <h2>Offenlegung gemäß Mediengesetz § 25</h2>
          <p><strong>Medieninhaber:</strong> Eve Paule</p>
          <p><strong>Sitz:</strong> 4614 Marchtrenk</p>
          <p><strong>Unternehmensgegenstand:</strong> Präsentation des Unternehmens und seiner Dienstleistungen</p>
          <p><strong>Grundlegende Richtung:</strong> Information über das Leistungsangebot von SkinLove Tattoo &amp; Piercing (Tattoos, Piercings, Permanent Make-up, Lash &amp; Brow Lifting, Kurse) sowie Kontaktmöglichkeiten für Kundinnen und Kunden.</p>
        </section>

        <section className="legal-section">
          <h2>Verbraucherschlichtung</h2>
          <p>Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Anliegen und Beschwerden richten Sie bitte direkt an <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a>.</p>
        </section>

        <section className="legal-section">
          <h2>Haftung für Inhalte</h2>
          <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Als Diensteanbieter sind wir gemäß ECG § 16 für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
        </section>

        <section className="legal-section">
          <h2>Haftung für Links</h2>
          <p>Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte nicht zumutbar.</p>
        </section>

        <section className="legal-section">
          <h2>Urheberrecht</h2>
          <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung der Inhaberin. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          <p>Alle auf dieser Website verwendeten Fotos und Grafiken sind Eigentum von SkinLove Tattoo &amp; Piercing oder wurden mit Genehmigung der jeweiligen Rechteinhaber verwendet.</p>
        </section>

        <div className="legal-footer">
          <p>Stand: Oktober 2026</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
