import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz \u2013 SkinLove Tattoo & Piercing",
  description: "Datenschutzerkl\u00E4rung von SkinLove Tattoo & Piercing in Marchtrenk. Informationen zur Verarbeitung personenbezogener Daten gem\u00E4\u00DF DSGVO.",
  alternates: { canonical: "/datenschutz" },
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

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="fixed top-0 left-0 w-full z-50 py-5 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(187,53,153,0.08)]">
        <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white hover:text-[var(--pink)] transition-colors">SkinLove</Link>
          <Link href="/" className="text-xs tracking-[2px] uppercase text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors">{"\u2190"} Zur{"\u00FC"}ck</Link>
        </div>
      </header>
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-4">Datenschutzerkl{"\u00E4"}rung</h1>
        <p className="text-[var(--text-dim)] text-sm mb-12">Stand: M{"\u00E4"}rz 2025</p>
        <div className="text-[var(--text-dim)] text-[15px] leading-relaxed">

          <S t="1. Verantwortliche Stelle">
            <p><strong className="text-white">SkinLove Tattoo &amp; Piercing</strong><br />Eve Paule<br />Linzer Stra{"\u00DF"}e 35, 1. OG<br />4614 Marchtrenk, {"\u00D6"}sterreich</p>
            <p>Telefon: <A href="tel:+436607835346">+43 660 783 5346</A></p>
            <p>E-Mail: <A href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</A></p>
          </S>

          <S t="2. Datenschutz auf einen Blick">
            <p>Die folgenden Hinweise geben einen {"\u00DC"}berblick dar{"\u00FC"}ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie pers{"\u00F6"}nlich identifiziert werden k{"\u00F6"}nnen.</p>
          </S>

          <S t="3. Datenerfassung auf dieser Website">
            <h3 className="text-white font-medium mt-2">Server-Log-Dateien</h3>
            <p>Der Hosting-Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch {"\u00FC"}bermittelt. Dies sind:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>Eine Zusammenf{"\u00FC"}hrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung der Website).</p>
          </S>

          <S t="4. Cookies und Speichertechnologien (TKG 2021 {'\u00A7'} 165)">
            <p>Diese Website verwendet ausschlie{"\u00DF"}lich technisch notwendige Cookies, die f{"\u00FC"}r den Betrieb der Seite erforderlich sind. Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt.</p>
            <p>Gem{"\u00E4"}{"\u00DF"} {"\u00A7"} 165 Abs. 3 TKG 2021 ist f{"\u00FC"}r technisch notwendige Cookies keine Einwilligung erforderlich, da diese zur Bereitstellung des vom Nutzer ausdr{"\u00FC"}cklich angeforderten Dienstes unbedingt erforderlich sind.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) i.V.m. {"\u00A7"} 165 Abs. 3 TKG 2021.</p>
          </S>

          <S t="5. Kontaktaufnahme &amp; Buchungsanfragen">
            <p>Wenn Sie uns per Telefon, E-Mail oder {"\u00FC"}ber ein Kontaktformular kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse, Nachricht, ggf. gew{"\u00FC"}nschte Leistung oder Workshop) zur Bearbeitung Ihrer Anfrage gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Die Daten werden gel{"\u00F6"}scht, sobald sie f{"\u00FC"}r die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Ma{"\u00DF"}nahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
          </S>

          <S t="6. Workshop-Anmeldung">
            <p>Bei der Anmeldung zu einem Workshop erheben wir Name, E-Mail-Adresse und ggf. weitere f{"\u00FC"}r die Durchf{"\u00FC"}hrung erforderliche Angaben. Diese Daten werden ausschlie{"\u00DF"}lich zur Organisation und Abwicklung des Workshops verwendet und nach Abschluss der Veranstaltung (bzw. nach Ablauf gesetzlicher Aufbewahrungsfristen) gel{"\u00F6"}scht.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserf{"\u00FC"}llung).</p>
          </S>

          <S t="7. Hosting">
            <p>Diese Website wird bei <strong className="text-white">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Vercel verarbeitet personenbezogene Daten in unserem Auftrag und ist vertraglich verpflichtet, angemessene technische und organisatorische Ma{"\u00DF"}nahmen zum Datenschutz zu ergreifen.</p>
            <p>Die Daten{"\u00FC"}bermittlung in die USA erfolgt auf Grundlage des EU-U.S. Data Privacy Framework. Weitere Informationen: <A href="https://vercel.com/legal/privacy-policy">vercel.com/legal/privacy-policy</A></p>
          </S>

          <S t="8. Schriftarten (Google Fonts)">
            <p>Diese Website nutzt Schriftarten von Google Fonts. Die Schriftarten werden {"\u00FC"}ber <strong className="text-white">next/font</strong> bei der Erstellung der Website heruntergeladen und lokal (self-hosted) eingebunden. Beim Besuch der Website wird <strong className="text-white">keine Verbindung</strong> zu Google-Servern hergestellt. Ihre IP-Adresse wird nicht an Google {"\u00FC"}bermittelt.</p>
          </S>

          <S t="9. SSL-/TLS-Verschl{'\u00FC'}sselung">
            <p>Diese Website nutzt aus Sicherheitsgr{"\u00FC"}nden eine SSL-/TLS-Verschl{"\u00FC"}sselung. Eine verschl{"\u00FC"}sselte Verbindung erkennen Sie am Schloss-Symbol in der Adresszeile Ihres Browsers und daran, dass die Adresszeile mit {"\u201E"}https://{"\u201C"} beginnt.</p>
          </S>

          <S t="10. Social Media">
            <p>Auf dieser Website sind Links zu unseren Social-Media-Profilen eingebunden (Instagram, Facebook, TikTok). Es handelt sich um einfache Verlinkungen {"\u2014"} beim Besuch unserer Website werden keine Daten an diese Plattformen {"\u00FC"}bermittelt. Erst beim Klick auf einen Link und dem Besuch der jeweiligen Plattform gelten deren Datenschutzbestimmungen.</p>
          </S>

          <S t="11. Google Search Console">
            <p>Wir verwenden die Google Search Console, um die Auffindbarkeit unserer Website in der Google-Suche zu {"\u00FC"}berwachen. Dazu wurde eine Verifizierung unserer Domain bei Google durchgef{"\u00FC"}hrt. Die Google Search Console erhebt keine personenbezogenen Daten von Website-Besuchern {"\u2014"} es werden lediglich aggregierte, anonymisierte Suchdaten an den Websitebetreiber {"\u00FC"}bermittelt.</p>
            <p>Weitere Informationen: <A href="https://policies.google.com/privacy">policies.google.com/privacy</A></p>
          </S>

          <S t="12. Auftragsverarbeitung">
            <p>Wir haben mit unseren Dienstleistern (insbesondere Vercel als Hosting-Provider) Auftragsverarbeitungsvertr{"\u00E4"}ge gem{"\u00E4"}{"\u00DF"} Art. 28 DSGVO abgeschlossen. Diese stellen sicher, dass personenbezogene Daten nur nach unserer Weisung und unter Einhaltung der DSGVO verarbeitet werden.</p>
          </S>

          <S t="13. Speicherdauer">
            <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies f{"\u00FC"}r den jeweiligen Verarbeitungszweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen (z.{"\u00A0"}B. 7 Jahre nach Bundesabgabenordnung f{"\u00FC"}r buchhalterisch relevante Unterlagen). Server-Logfiles werden in der Regel nach 30 Tagen gel{"\u00F6"}scht.</p>
          </S>

          <S t="14. Ihre Rechte">
            <p>Sie haben nach der DSGVO folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-white">Auskunft</strong> (Art. 15 DSGVO) {"\u2014"} Welche Daten wir {"\u00FC"}ber Sie gespeichert haben</li>
              <li><strong className="text-white">Berichtigung</strong> (Art. 16 DSGVO) {"\u2014"} Korrektur unrichtiger Daten</li>
              <li><strong className="text-white">L{"\u00F6"}schung</strong> (Art. 17 DSGVO) {"\u2014"} L{"\u00F6"}schung Ihrer Daten</li>
              <li><strong className="text-white">Einschr{"\u00E4"}nkung</strong> (Art. 18 DSGVO) {"\u2014"} Einschr{"\u00E4"}nkung der Verarbeitung</li>
              <li><strong className="text-white">Daten{"\u00FC"}bertragbarkeit</strong> (Art. 20 DSGVO) {"\u2014"} Herausgabe Ihrer Daten in maschinenlesbarem Format</li>
              <li><strong className="text-white">Widerspruch</strong> (Art. 21 DSGVO) {"\u2014"} Widerspruch gegen die Verarbeitung</li>
              <li><strong className="text-white">Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) {"\u2014"} Soweit die Verarbeitung auf Ihrer Einwilligung beruht, k{"\u00F6"}nnen Sie diese jederzeit widerrufen, ohne dass die Rechtm{"\u00E4"}{"\u00DF"}igkeit der bis dahin erfolgten Verarbeitung ber{"\u00FC"}hrt wird</li>
            </ul>
            <p>Zur Aus{"\u00FC"}bung Ihrer Rechte wenden Sie sich bitte an die oben genannte verantwortliche Stelle.</p>
          </S>

          <S t="15. Beschwerderecht">
            <p>Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verst{"\u00F6"}{"\u00DF"}t, haben Sie das Recht, bei der zust{"\u00E4"}ndigen Aufsichtsbeh{"\u00F6"}rde Beschwerde einzulegen:</p>
            <p><strong className="text-white">{"\u00D6"}sterreichische Datenschutzbeh{"\u00F6"}rde</strong><br />Barichgasse 40{"\u2013"}42, 1030 Wien<br />Telefon: +43 1 52 152-0<br />E-Mail: <A href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</A><br />Website: <A href="https://www.dsb.gv.at">www.dsb.gv.at</A></p>
          </S>

        </div>
      </div>
    </div>
  );
}
