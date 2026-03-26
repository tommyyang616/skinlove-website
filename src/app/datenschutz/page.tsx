import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – SkinLove Tattoo & Piercing",
  description: "Datenschutzerklärung von SkinLove Tattoo & Piercing in Marchtrenk. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function Datenschutz() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link href="/" className="legal-logo">SkinLove</Link>
          <Link href="/" className="legal-back">← Zurück</Link>
        </div>
      </header>
      <div className="legal-content">
        <h1>Datenschutzerklärung</h1>
        <p className="legal-date">Stand: März 2025</p>

        <section className="legal-section">
          <h2>1. Verantwortliche Stelle</h2>
          <p><strong>SkinLove Tattoo &amp; Piercing</strong><br />Eve Paule<br />Linzer Straße 35, 1. OG<br />4614 Marchtrenk, Österreich</p>
          <p>Telefon: <a href="tel:+436607835346">+43 660 783 5346</a></p>
          <p>E-Mail: <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a></p>
        </section>

        <section className="legal-section">
          <h2>2. Datenschutz auf einen Blick</h2>
          <p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
        </section>

        <section className="legal-section">
          <h2>3. Datenerfassung auf dieser Website</h2>
          <h3>Server-Log-Dateien</h3>
          <p>Der Hosting-Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:</p>
          <ul>
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL (zuvor besuchte Seite)</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung der Website).</p>
        </section>

        <section className="legal-section">
          <h2>4. Cookies und Speichertechnologien (TKG 2021 § 165)</h2>
          <p>Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt.</p>
          <p>Gemäß § 165 Abs. 3 TKG 2021 ist für technisch notwendige Cookies keine Einwilligung erforderlich, da diese zur Bereitstellung des vom Nutzer ausdrücklich angeforderten Dienstes unbedingt erforderlich sind.</p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) i.V.m. § 165 Abs. 3 TKG 2021.</p>
        </section>

        <section className="legal-section">
          <h2>5. Kontaktaufnahme &amp; Buchungsanfragen</h2>
          <p>Wenn Sie uns per Telefon, E-Mail oder über ein Kontaktformular kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse, Telefonnummer, Nachricht, ggf. gewünschte Leistung oder Workshop) zur Bearbeitung Ihrer Anfrage gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.</p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
        </section>

        <section className="legal-section">
          <h2>6. Workshop-Anmeldung</h2>
          <p>Bei der Anmeldung zu einem Workshop erheben wir Name, E-Mail-Adresse und ggf. weitere für die Durchführung erforderliche Angaben. Diese Daten werden ausschließlich zur Organisation und Abwicklung des Workshops verwendet und nach Abschluss der Veranstaltung (bzw. nach Ablauf gesetzlicher Aufbewahrungsfristen) gelöscht.</p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
        </section>

        <section className="legal-section">
          <h2>7. Hosting</h2>
          <p>Diese Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Vercel verarbeitet personenbezogene Daten in unserem Auftrag und ist vertraglich verpflichtet, angemessene technische und organisatorische Maßnahmen zum Datenschutz zu ergreifen.</p>
          <p>Die Datenübermittlung in die USA erfolgt auf Grundlage des EU-U.S. Data Privacy Framework. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a></p>
        </section>

        <section className="legal-section">
          <h2>8. Schriftarten (Google Fonts)</h2>
          <p>Diese Website nutzt Schriftarten von Google Fonts. Die Schriftarten werden über <strong>next/font</strong> bei der Erstellung der Website heruntergeladen und lokal (self-hosted) eingebunden. Beim Besuch der Website wird <strong>keine Verbindung</strong> zu Google-Servern hergestellt. Ihre IP-Adresse wird nicht an Google übermittelt.</p>
        </section>

        <section className="legal-section">
          <h2>9. SSL-/TLS-Verschlüsselung</h2>
          <p>Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der Adresszeile Ihres Browsers und daran, dass die Adresszeile mit „https://" beginnt.</p>
        </section>

        <section className="legal-section">
          <h2>10. Social Media</h2>
          <p>Auf dieser Website sind Links zu unseren Social-Media-Profilen eingebunden (Instagram, Facebook, TikTok). Es handelt sich um einfache Verlinkungen — beim Besuch unserer Website werden keine Daten an diese Plattformen übermittelt. Erst beim Klick auf einen Link und dem Besuch der jeweiligen Plattform gelten deren Datenschutzbestimmungen.</p>
        </section>

        <section className="legal-section">
          <h2>11. Google Search Console</h2>
          <p>Wir verwenden die Google Search Console, um die Auffindbarkeit unserer Website in der Google-Suche zu überwachen. Dazu wurde eine Verifizierung unserer Domain bei Google durchgeführt. Die Google Search Console erhebt keine personenbezogenen Daten von Website-Besuchern — es werden lediglich aggregierte, anonymisierte Suchdaten an den Websitebetreiber übermittelt.</p>
          <p>Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></p>
        </section>

        <section className="legal-section">
          <h2>12. Auftragsverarbeitung</h2>
          <p>Wir haben mit unseren Dienstleistern (insbesondere Vercel als Hosting-Provider) Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO abgeschlossen. Diese stellen sicher, dass personenbezogene Daten nur nach unserer Weisung und unter Einhaltung der DSGVO verarbeitet werden.</p>
        </section>

        <section className="legal-section">
          <h2>13. Speicherdauer</h2>
          <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Verarbeitungszweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen (z.&nbsp;B. 7 Jahre nach Bundesabgabenordnung für buchhalterisch relevante Unterlagen). Server-Logfiles werden in der Regel nach 30 Tagen gelöscht.</p>
        </section>

        <section className="legal-section">
          <h2>14. Ihre Rechte</h2>
          <p>Sie haben nach der DSGVO folgende Rechte:</p>
          <ul>
            <li><strong>Auskunft</strong> (Art. 15 DSGVO) — Welche Daten wir über Sie gespeichert haben</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO) — Korrektur unrichtiger Daten</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO) — Löschung Ihrer Daten</li>
            <li><strong>Einschränkung</strong> (Art. 18 DSGVO) — Einschränkung der Verarbeitung</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Herausgabe Ihrer Daten in maschinenlesbarem Format</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO) — Widerspruch gegen die Verarbeitung</li>
            <li><strong>Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) — Soweit die Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit widerrufen</li>
          </ul>
          <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte verantwortliche Stelle.</p>
        </section>

        <section className="legal-section">
          <h2>15. Beschwerderecht</h2>
          <p>Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, haben Sie das Recht, bei der zuständigen Aufsichtsbehörde Beschwerde einzulegen:</p>
          <p><strong>Österreichische Datenschutzbehörde</strong><br />Barichgasse 40–42, 1030 Wien<br />Telefon: +43 1 52 152-0<br />E-Mail: <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a><br />Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a></p>
        </section>

        <div className="legal-footer">
          <p>Stand: März 2025</p>
        </div>
      </div>
    </div>
  );
}
