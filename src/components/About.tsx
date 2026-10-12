import Image from "next/image";
import Link from "next/link";
export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap reveal">
            <Image src="/images/eve-about-v2.webp" alt="Eve Paule – SkinLove" width={880} height={1210} quality={100} />
          </div>
          <div className="reveal">
            <span className="section-label">Über mich</span>
            <h2 className="section-title">Eve Paule</h2>
            <p className="section-text about-text">Ich bin Eve, Gründerin von SkinLove. Vom Einzelhandel und der Krankenpflege zur Körperkunst — heute lebe ich meinen Traum als selbstständige Tätowiererin, Piercerin und Permanent Make-up-Artistin.</p>
            <br />
            <p className="section-text about-text">Ob Fine-Line, Mandala, Black &amp; Grey oder Watercolor — jedes Tattoo ist für mich eine Herzensangelegenheit. Ich nehme mir Zeit für deine Geschichte und gestalte ein Motiv, das zu dir passt.</p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-num">7+</div>
                <div className="stat-label">Jahre Erfahrung</div>
              </div>
              <div className="stat">
                <div className="stat-num">OÖ</div>
                <div className="stat-label">Linz · Wels · Region</div>
              </div>
            </div>
            <Link href="/ueber-mich" className="about-cta">
              Mehr über mich erfahren <span className="about-cta-pfeil" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
