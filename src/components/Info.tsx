"use client";
export default function Info() {
  return (
    <section id="info">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-eyebrow">Gut zu wissen</div>
          <h2 className="section-title">Wichtige Infos</h2>
          <div className="section-line" />
        </div>
        <div className="info-grid reveal">
          <div className="info-card">
            <h3>Stornierung</h3>
            <ul className="info-list">
              <li>Bis 48h vorher: kostenlose Verschiebung</li>
              <li>1 Tag vorher: 50 % Gebühr + Anzahlung</li>
              <li>Am selben Tag / No-Show: voller Preis + Anzahlung</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Anzahlung</h3>
            <ul className="info-list">
              <li>Bei Anfahrt über 1 Stunde + konkretem Motiv: Terminreservierung per Überweisung mit 150 € Anzahlung.</li>
            </ul>
            <div className="iban">
              IBAN: AT37 2032 6000 0123 9441<br />
              BIC: SPNAKT21XXX
            </div>
          </div>
          <div className="info-card">
            <h3>Nachstechen & Pflege</h3>
            <ul className="info-list">
              <li>Gratis Nachstechen innerhalb von 14 Tagen, wenn übermäßig Farbe ausbricht.</li>
              <li>Kostenlose Erstberatung jederzeit möglich.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
