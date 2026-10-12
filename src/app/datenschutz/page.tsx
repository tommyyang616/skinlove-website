import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { teilenMeta } from "@/lib/teilen-meta";

const TITEL = "Datenschutz – SkinLove Tattoo & Piercing";
const BESCHREIBUNG = "Datenschutzerklärung von SkinLove Tattoo & Piercing in Marchtrenk: welche Daten die Website verarbeitet, wer sie erhält und welche Rechte Sie haben (DSGVO).";

export const metadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
  ...teilenMeta(TITEL, BESCHREIBUNG, "/datenschutz"),
};

// Stand 12.10.2026 - abgeglichen mit dem Code: Supabase (DB, eu-central-2),
// Resend (Mail), Telegram (Benachrichtigung), Upstash (Missbrauchsschutz),
// Vercel (Hosting + Web Analytics), Google Maps nur nach Klick.
export default function Datenschutz() {
  return (
    <>
      <Navigation unterseite />
      <div className="legal-page">
        <div className="legal-content">
          <h1>Datenschutzerklärung</h1>
          <p className="legal-date">Stand: Oktober 2026</p>

          <section className="legal-section">
            <h2>1. Verantwortliche</h2>
            <p><strong>SkinLove Tattoo &amp; Piercing</strong><br />Eve Paule<br />Linzer Straße 35, 1. OG<br />4614 Marchtrenk, Österreich</p>
            <p>Telefon: <a href="tel:+436607835346">+43 660 783 5346</a><br />E-Mail: <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a></p>
          </section>

          <section className="legal-section">
            <h2>2. Überblick</h2>
            <p>Diese Website setzt keine Cookies und verwendet keine Werbe- oder Tracking-Dienste. Personenbezogene Daten verarbeiten wir nur, soweit das für den Betrieb der Website, die Beantwortung Ihrer Anfragen und die Abwicklung von Terminen und Kursen nötig ist. Im Folgenden steht, welche Daten das sind, wer sie erhält und wie lange sie gespeichert werden.</p>
          </section>

          <section className="legal-section">
            <h2>3. Hosting und Server-Protokolle</h2>
            <p>Die Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) betrieben; die Server stehen in Frankfurt am Main. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem, um die Seite auszuliefern und vor Angriffen zu schützen. Diese Protokolle werden nach kurzer Zeit automatisch gelöscht.</p>
            <p>Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und funktionierenden Webauftritt (Art. 6 Abs. 1 lit. f DSGVO). Zur Übermittlung in die USA siehe Punkt 11.</p>
          </section>

          <section className="legal-section">
            <h2>4. Besucherstatistik (Vercel Web Analytics)</h2>
            <p>Um zu sehen, welche Seiten gelesen werden, nutzen wir Vercel Web Analytics. Der Dienst arbeitet ohne Cookies und ohne Wiedererkennung über mehrere Tage: Erfasst werden die aufgerufene Seite, die verweisende Seite, Land, Gerätetyp, Browser und Betriebssystem. Ein Rückschluss auf Ihre Person ist uns nicht möglich.</p>
            <p>Rechtsgrundlage ist unser berechtigtes Interesse an einer bedarfsgerechten Gestaltung der Website (Art. 6 Abs. 1 lit. f DSGVO).</p>
          </section>

          <section className="legal-section">
            <h2>5. Schriftarten</h2>
            <p>Die Schriftarten sind auf unserem eigenen Server eingebunden. Beim Aufruf der Website wird keine Verbindung zu Google Fonts oder anderen Schriftanbietern hergestellt.</p>
          </section>

          <section className="legal-section">
            <h2>6. Terminanfrage über das Formular</h2>
            <p>Wenn Sie das Anfrageformular nutzen, verarbeiten wir Name, E-Mail-Adresse, Telefonnummer, die gewünschte Leistung, Ihre Nachricht sowie den Zeitpunkt der Anfrage. Name, E-Mail-Adresse und Telefonnummer sind Pflichtangaben, weil wir Sie für die Terminvereinbarung erreichen müssen; ohne sie können wir die Anfrage nicht bearbeiten. Bitte geben Sie im Formular keine Gesundheitsdaten an – das besprechen wir persönlich.</p>
            <p>Zweck ist die Bearbeitung Ihrer Anfrage und die Vereinbarung eines Termins. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO).</p>
            <p>Dafür erhalten folgende Dienstleister Ihre Daten:</p>
            <ul>
              <li><strong>Supabase Inc.</strong> (USA) – Speicherung der Anfrage in unserer Datenbank. Die Datenbank liegt in einem Rechenzentrum in Zürich (Schweiz); für die Schweiz besteht ein Angemessenheitsbeschluss der EU-Kommission.</li>
              <li><strong>Resend Inc.</strong> (USA) – Versand der Bestätigungs-E-Mail an Sie.</li>
              <li><strong>Telegram</strong> (Telegram Messenger Inc.) – Benachrichtigung der Inhaberin über neue Anfragen mit Ihren Angaben aus dem Formular.</li>
              <li><strong>Upstash Inc.</strong> (USA) – Schutz vor massenhaft versendeten Anfragen: Ihre IP-Adresse wird dafür höchstens 10 Minuten gespeichert und dann automatisch gelöscht. Rechtsgrundlage ist hier unser berechtigtes Interesse an der Missbrauchsabwehr (Art. 6 Abs. 1 lit. f DSGVO).</li>
            </ul>
            <p>Wir speichern Anfragen, solange sie für die Terminvereinbarung und mögliche Rückfragen nötig sind, und löschen sie danach, sofern keine gesetzliche Aufbewahrungspflicht besteht (siehe Punkt 9).</p>
          </section>

          <section className="legal-section">
            <h2>7. Anmeldung zu Kursen</h2>
            <p>Für Anfragen zu unseren Tattoo- und Piercing-Kursen gilt dasselbe wie unter Punkt 6: Wir verarbeiten Name, E-Mail-Adresse, Telefonnummer und den gewählten Kurs, um die Teilnahme mit Ihnen abzustimmen (Art. 6 Abs. 1 lit. b DSGVO). Empfänger sind dieselben Dienstleister.</p>
          </section>

          <section className="legal-section">
            <h2>8. Kontakt per E-Mail, Telefon oder WhatsApp</h2>
            <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b DSGVO). Wenn Sie uns über WhatsApp schreiben oder wir Ihnen auf Ihren Wunsch dort antworten, verarbeitet zusätzlich WhatsApp Ireland Ltd. (Meta) Ihre Daten nach deren eigener Datenschutzerklärung.</p>
          </section>

          <section className="legal-section">
            <h2>9. Unterlagen im Studio und Aufbewahrung</h2>
            <p>Vor einem Tattoo, Piercing oder Permanent Make-up sind wir gesetzlich verpflichtet, Ihre schriftliche Einwilligung, die Bestätigung der Aufklärung sowie Angaben zur durchgeführten Behandlung aufzubewahren – und zwar 10 Jahre lang (§ 4 der Verordnung über Ausübungsregeln für das Piercen und Tätowieren, BGBl. II Nr. 141/2003). Rechnungen und andere steuerlich relevante Unterlagen bewahren wir 7 Jahre auf (§ 132 Bundesabgabenordnung). Rechtsgrundlage ist die Erfüllung rechtlicher Pflichten (Art. 6 Abs. 1 lit. c DSGVO).</p>
          </section>

          <section className="legal-section">
            <h2>10. Google Maps</h2>
            <p>Die Karte auf unserer Website wird erst geladen, wenn Sie auf „Karte anzeigen“ klicken. Erst dann werden Daten – insbesondere Ihre IP-Adresse – an Google Ireland Ltd. (Gordon House, Barrow Street, Dublin 4, Irland) und an die Google LLC in den USA übertragen; dabei kann Google auch Cookies setzen. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 165 Abs. 3 TKG 2021), die Sie jederzeit für die Zukunft widerrufen können, indem Sie die Seite neu laden. Ohne Klick findet keine Verbindung zu Google statt.</p>
          </section>

          <section className="legal-section">
            <h2>11. Übermittlung in die USA</h2>
            <p>Einige der genannten Dienstleister haben ihren Sitz in den USA. Die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO), soweit der Anbieter danach zertifiziert ist, und im Übrigen auf die Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO).</p>
          </section>

          <section className="legal-section">
            <h2>12. Social Media</h2>
            <p>Auf unserer Website verlinken wir auf unsere Profile bei Instagram, Facebook und TikTok. Es handelt sich um einfache Links, keine eingebetteten Inhalte: Daten werden erst übertragen, wenn Sie einen Link anklicken und die jeweilige Plattform besuchen. Dort gilt die Datenschutzerklärung des jeweiligen Anbieters.</p>
          </section>

          <section className="legal-section">
            <h2>13. Technische Betreuung</h2>
            <p>Mit der technischen Betreuung dieser Website ist ein IT-Dienstleister beauftragt. Er kann dabei auf die gespeicherten Anfragen zugreifen, handelt ausschließlich in unserem Auftrag und ist zur Vertraulichkeit verpflichtet.</p>
          </section>

          <section className="legal-section">
            <h2>14. Verschlüsselung</h2>
            <p>Die Website wird ausschließlich über eine verschlüsselte Verbindung (HTTPS) ausgeliefert. Daten, die Sie über die Formulare senden, sind auf dem Übertragungsweg geschützt.</p>
          </section>

          <section className="legal-section">
            <h2>15. Ihre Rechte</h2>
            <p>Sie haben nach der DSGVO folgende Rechte:</p>
            <ul>
              <li><strong>Auskunft</strong> (Art. 15 DSGVO) – welche Daten wir über Sie gespeichert haben</li>
              <li><strong>Berichtigung</strong> (Art. 16 DSGVO) – Korrektur unrichtiger Daten</li>
              <li><strong>Löschung</strong> (Art. 17 DSGVO) – soweit keine Aufbewahrungspflicht entgegensteht</li>
              <li><strong>Einschränkung</strong> (Art. 18 DSGVO) – der Verarbeitung</li>
              <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) – Herausgabe in einem gängigen Format</li>
              <li><strong>Widerspruch</strong> (Art. 21 DSGVO) – gegen Verarbeitungen auf Grundlage berechtigter Interessen</li>
              <li><strong>Widerruf einer Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) – jederzeit mit Wirkung für die Zukunft</li>
            </ul>
            <p>Wenden Sie sich dafür einfach an <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a>.</p>
          </section>

          <section className="legal-section">
            <h2>16. Beschwerderecht</h2>
            <p>Wenn Sie meinen, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Aufsichtsbehörde beschweren:</p>
            <p>Österreichische Datenschutzbehörde<br />Barichgasse 40–42, 1030 Wien<br />E-Mail: <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a><br />Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
