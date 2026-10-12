import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { teilenMeta } from "@/lib/teilen-meta";

const TITEL = "Tattoo-Kurs & Piercing-Kurs in Oberösterreich";
const BESCHREIBUNG = "Tätowieren und Piercen lernen bei Wels und Linz: Tattoo-Kurs und Piercing-Kurs in kleinen Gruppen mit Material und Zertifikat – bei Eve Paule in Marchtrenk.";

export const metadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/workshops" },
  ...teilenMeta(TITEL, BESCHREIBUNG, "/workshops"),
};

// Inhalte wie im Verwaltungsbereich hinterlegt (Stand 12.10.2026). Termine,
// Preise und freie Plätze kommen live aus der Datenbank auf der Startseite.
const kurse = [
  {
    titel: "Tattoo-Kurs",
    text: "Tätowieren lernen von Grund auf: Theorie, Hygiene, Technik und Praxis. Du arbeitest zuerst auf Übungshaut und lernst Schritt für Schritt, wie aus einer Vorlage ein sauberes Tattoo wird.",
    punkte: ["Theorie, Hygiene, Technik und Praxis", "Material und Übungshaut inklusive", "Zertifikat zum Abschluss", "Abends unter der Woche, fortlaufend"],
  },
  {
    titel: "Piercing-Kurs",
    text: "Für alle, die ins Piercen einsteigen wollen: Hygiene, Anatomie, Materialien und die ersten Stiche unter Anleitung – geübt wird am Modell.",
    punkte: ["Hygiene, Anatomie und Materialien", "Erste Stiche unter Anleitung", "Praxis am Modell, Zertifikat zum Abschluss", "Abends unter der Woche"],
  },
];

const fragen = [
  { q: "Brauche ich Vorkenntnisse?", a: "Nein. Die Kurse beginnen bei den Grundlagen und sind für Anfängerinnen und Anfänger gedacht. Wer schon Erfahrung hat, steigt auf dem eigenen Stand ein." },
  { q: "Wie groß sind die Gruppen?", a: "Höchstens drei Teilnehmende pro Kurs. So bleibt Zeit, jedem Einzelnen über die Schulter zu schauen." },
  { q: "Was ist im Kurs enthalten?", a: "Beim Tattoo-Kurs Material, Übungshaut und ein Zertifikat, beim Piercing-Kurs Modell-Praxis und ein Zertifikat." },
  { q: "Gibt es ein Mindestalter?", a: "Ja, die Kurse sind ab 18 Jahren." },
  { q: "Darf ich nach dem Kurs als Tätowiererin oder Tätowierer arbeiten?", a: "Wer in Österreich gewerblich tätowiert oder piercet, braucht eine Gewerbeberechtigung – dafür sind ein anerkannter Lehrgang und eine Befähigungsprüfung nötig. Der Kurs bei SkinLove ist ein praxisnaher Einstieg und ersetzt diese Ausbildung nicht." },
  { q: "Wo finden die Kurse statt?", a: "Im Studio SkinLove, Linzer Straße 35 im Marktcenter Marchtrenk. Aus Wels bist du in rund zehn Minuten da, aus Linz in 20 bis 25 Minuten – auch mit Bus 600 oder der Westbahn." },
  { q: "Wann sind die nächsten Termine und was kostet der Kurs?", a: "Aktuelle Termine, Preise und freie Plätze stehen im Kursbereich auf der Startseite. Dort kannst du dich auch gleich anmelden." },
];

export default function WorkshopsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragen.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="um">
        <section className="um-kopf">
          <div className="um-portrait">
            <Image src="/images/eve-bei-der-arbeit-2.webp" alt="Eve Paule beim Tätowieren – sie leitet die Tattoo- und Piercing-Kurse bei SkinLove" width={903} height={1100} priority sizes="(max-width: 860px) 80vw, 420px" />
          </div>
          <div className="um-intro">
            <p className="um-label">Kurse bei SkinLove</p>
            <h1 className="um-h1" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>Tattoo-Kurs &amp; Piercing-Kurs in Oberösterreich</h1>
            <p className="um-rolle">Tätowieren und Piercen lernen – zwischen Wels und Linz</p>
            <p className="um-text">
              Du wolltest schon immer selbst tätowieren oder piercen lernen? Bei SkinLove in
              Marchtrenk zeigt dir Eve Paule die Grundlagen – von Hygiene und Technik bis zu den
              ersten eigenen Stichen. In kleinen Gruppen mit höchstens drei Teilnehmenden.
            </p>
            <div className="um-chips">
              <span>max. 3 Teilnehmende</span><span>ab 18 Jahren</span><span>mit Zertifikat</span>
            </div>
            <div className="um-aktionen">
              <Link href="/#workshop" className="btn-primary">Termine &amp; Anmeldung</Link>
              <a href="tel:+436607835346" className="btn-outline">Anrufen</a>
            </div>
          </div>
        </section>

        <section className="um-block">
          <h2 className="um-h2">Zwei Kurse zur Auswahl</h2>
          <div className="um-werte kurs-karten">
            {kurse.map((k) => (
              <div key={k.titel} className="um-wert">
                <h3>{k.titel}</h3>
                <p>{k.text}</p>
                <ul className="kurs-punkte">
                  {k.punkte.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="um-block kurs-text">
          <h2 className="um-h2">Für wen der Kurs gedacht ist</h2>
          <p className="um-text">
            Für alle ab 18, die das Handwerk von Grund auf kennenlernen wollen – ob als ersten
            Schritt in Richtung eigenes Studio oder aus Leidenschaft für Körperkunst. Weil die
            Gruppen klein sind, geht es in deinem Tempo: Fragen sind ausdrücklich erwünscht.
          </p>
          <p className="um-text">
            Gut zu wissen: Wer in Österreich gewerblich tätowieren oder piercen will, braucht eine
            Gewerbeberechtigung mit anerkanntem Lehrgang und Befähigungsprüfung. Der Kurs ist ein
            praxisnaher Einstieg und ersetzt diese Ausbildung nicht.
          </p>
          <p className="um-text">
            Das Studio liegt im Marktcenter in Marchtrenk – aus Wels rund zehn Minuten, aus Linz 20
            bis 25 Minuten. Teilnehmende kommen damit gut aus ganz Oberösterreich her.
          </p>
        </section>

        <section className="um-block kurs-text">
          <h2 className="um-h2">Häufige Fragen</h2>
          <div className="kurs-fragen">
            {fragen.map((f) => (
              <div key={f.q} className="um-stimme">
                <h3 className="kurs-frage">{f.q}</h3>
                <p className="kurs-antwort">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="um-schluss">
          <h2 className="um-h2">Bereit für deinen ersten Stich?</h2>
          <p className="um-text">Termine, Preise und freie Plätze findest du im Kursbereich auf der Startseite.</p>
          <div className="um-aktionen um-aktionen-mitte">
            <Link href="/#workshop" className="btn-primary">Termine &amp; Anmeldung</Link>
            <Link href="/ueber-mich" className="btn-outline">Über Eve Paule</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
