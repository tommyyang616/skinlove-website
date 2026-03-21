"use client";
export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid reveal">
          <div className="about-img-wrap">
            <img src="/images/eve-about.jpg" alt="Eve Paule – SkinLove" />
          </div>
          <div className="about-content">
            <div className="section-header" style={{ textAlign: "left", marginBottom: 32 }}>
              <div className="section-eyebrow">Über mich</div>
              <h2 className="section-title">Ich bin Eve</h2>
              <div className="section-line" style={{ margin: 0 }} />
            </div>
            <p>
              Ich bin Eve, Gründerin von SkinLove in Marchtrenk. Was als Leidenschaft begann, ist heute mein Beruf: Tattoos, Piercings und Lash Lifting – alles unter einem Dach, mit Herz und Präzision.
            </p>
            <p>
              Mein Hintergrund in der Krankenpflege und im Einzelhandel hat mir beigebracht, wie wichtig Vertrauen, Hygiene und echtes Zuhören sind. Das nehme ich in jeden Termin mit.
            </p>
            <p>
              Bei mir bist du nicht nur eine Buchung – ich nehme mir Zeit für dich, deine Ideen und deine Wünsche.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-num">6+</div>
                <div className="stat-label">Jahre Erfahrung</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">OÖ</div>
                <div className="stat-label">Linz · Wels · Region</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
