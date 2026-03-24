export default function Info() {
  return (
    <section className="section" id="info" style={{ background: "#0e0e0e" }}>
      <div className="container">
        <span className="section-label reveal">Gut zu wissen</span>
        <h2 className="section-title reveal">Wichtige Infos</h2>
        <div className="info-grid">
          <div className="info-card reveal">
            <h3>Stornierung</h3>
            <ul>
              <li>Bis 48h vorher: kostenlose Verschiebung</li>
              <li>1 Tag vorher: 50 % + Anzahlung</li>
              <li>Am selben Tag / No-Show: voller Preis + Anzahlung</li>
            </ul>
          </div>
          <div className="info-card reveal">
            <h3>Anzahlung</h3>
            <p>Bei Anfahrt über 1 Stunde + konkretem Motiv: Terminreservierung per Überweisung mit 150 € Anzahlung.</p>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-dim)" }}>IBAN: AT37 2032 6000 0123 9441<br />BIC: SPNAKT21XXX</p>
          </div>
          <div className="info-card reveal">
            <h3>Nachstechen &amp; Pflege</h3>
            <p>Gratis Nachstechen innerhalb von 14 Tagen, wenn übermäßig Farbe ausbricht. Kostenlose Erstberatung jederzeit möglich.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
