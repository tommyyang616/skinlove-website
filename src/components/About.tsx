import Image from "next/image";
export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap reveal">
            <Image src="/images/eve-about.webp" alt="Eve Paule – SkinLove" width={852} height={1172} quality={100} />
          </div>
          <div className="reveal">
            <span className="section-label">Über mich</span>
            <h2 className="section-title">Eve Paule</h2>
            <p className="section-text">Ich bin Eve, Gründerin von SkinLove. Vom Einzelhandel und der Krankenpflege zur Körperkunst — heute lebe ich meinen Traum als selbstständige Tätowiererin, Piercerin und Permanent Make-up-Artistin.</p>
            <br />
            <p className="section-text">Ob Fine-Line, Mandala, Black &amp; Grey oder Watercolor — jedes Tattoo ist für mich eine Herzensangelegenheit. Ich nehme mir Zeit für deine Geschichte und gestalte ein Motiv, das zu dir passt.</p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-num">6+</div>
                <div className="stat-label">Jahre Erfahrung</div>
              </div>
              <div className="stat">
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
