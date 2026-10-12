import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { teilenMeta } from "@/lib/teilen-meta";
import { bewertungenVon } from "@/lib/bewertungen";
import TerminKnopf from "@/components/TerminKnopf";

export const metadata: Metadata = {
  title: "Eve Paule – Tätowiererin & Piercerin in Marchtrenk",
  description: "Lerne Eve Paule kennen: Gründerin von SkinLove in Marchtrenk zwischen Wels und Linz – Tätowiererin, Piercerin und Permanent Make-up-Artistin.",
  alternates: { canonical: "/ueber-mich" },
  ...teilenMeta(
    "Eve Paule – SkinLove Tattoo & Piercing",
    "Lerne Eve Paule kennen – Gründerin von SkinLove Tattoo & Piercing in Marchtrenk zwischen Wels und Linz.",
    "/ueber-mich",
    { url: "/images/eve-about-v2.webp", width: 880, height: 1210, alt: "Eve Paule, Gründerin von SkinLove" },
    "profile",
  ),
};

// Werdegang so, wie Eve ihn auf der Startseite selbst beschreibt.
const weg = [
  { titel: "Einzelhandel", text: "Der Start ins Berufsleben – jeden Tag mit Menschen." },
  { titel: "Krankenpflege", text: "Arbeit, bei der Sorgfalt und Hygiene keine Nebensache sind." },
  { titel: "Körperkunst", text: "Heute selbstständig mit eigenem Studio: Tätowiererin, Piercerin und Permanent Make-up-Artistin." },
];

const werte = [
  { titel: "Zeit für deine Geschichte", text: "Jedes Tattoo ist für mich eine Herzensangelegenheit. Ich nehme mir Zeit für deine Idee und gestalte ein Motiv, das zu dir passt." },
  { titel: "Beratung ohne Druck", text: "Das Beratungsgespräch ist kostenlos. Gestochen wird erst, wenn Motiv, Stelle und Vorlage für dich stimmen." },
  { titel: "Sauber und sorgfältig", text: "Ein hygienischer Arbeitsplatz und eine ruhige Hand – das schreiben mir Kundinnen und Kunden immer wieder in ihren Bewertungen." },
];

const arbeiten = [
  { src: "/images/leistungen/tattoo-ginkgo-fine-line-unterarm.webp", alt: "Fine-Line-Tattoo mit Ginkgo-Blättern am Unterarm von Eve Paule" },
  { src: "/images/leistungen/tattoo-fuchs-mond-watercolor.webp", alt: "Fuchs-Tattoo mit Mond im Watercolor-Stil von Eve Paule" },
  { src: "/images/leistungen/tattoo-schlange-pfingstrose.webp", alt: "Schlange mit Pfingstrose in Black and Grey von Eve Paule" },
  { src: "/images/leistungen/tattoo-schmetterling-blueten-farbe.webp", alt: "Farbiges Schmetterling-Tattoo mit Blüten von Eve Paule" },
];

const leistungen = [
  { href: "/leistungen/tattoos", text: "Tattoos" },
  { href: "/leistungen/piercings", text: "Piercings" },
  { href: "/leistungen/permanent-make-up", text: "Permanent Make-up" },
  { href: "/leistungen/lash-brow-lifting", text: "Lash & Brow Lifting" },
  { href: "/leistungen/kinderohrringe", text: "Kinderohrringe" },
  { href: "/workshops", text: "Tattoo- & Piercing-Kurse" },
];

const stimmen = bewertungenVon(["Sarah Kost", "Julia Reifinger", "Kerstin"]);

export default function UeberMichPage() {
  return (
    <>
      <main className="um">
        {/* Kopf: Porträt + Vorstellung */}
        <section className="um-kopf">
          <div className="um-portrait">
            <Image src="/images/eve-about-v2.webp" alt="Eve Paule, Gründerin von SkinLove Tattoo & Piercing" width={880} height={1210} priority sizes="(max-width: 860px) 80vw, 420px" />
          </div>
          <div className="um-intro">
            <p className="um-label">Die Künstlerin</p>
            <h1 className="um-h1">Eve Paule</h1>
            <p className="um-rolle">Tätowiererin, Piercerin &amp; Permanent Make-up-Artistin in Marchtrenk</p>
            <p className="um-text">
              Ich bin Eve, Gründerin von SkinLove. Vom Einzelhandel und der Krankenpflege zur
              Körperkunst – heute lebe ich meinen Traum als selbstständige Tätowiererin,
              Piercerin und Permanent Make-up-Artistin.
            </p>
            <p className="um-text">
              SkinLove ist mehr als ein Studio: Hier geht es um Leidenschaft, Hingabe und
              Liebe zur Körperkunst. Mein Studio liegt im Marktcenter in Marchtrenk – zwischen
              Wels und Linz, für Kundinnen und Kunden aus ganz Oberösterreich.
            </p>
            <div className="um-chips">
              <span>Tattoo</span><span>Piercing</span><span>Permanent Make-up</span><span>Lash &amp; Brow</span>
            </div>
            <div className="um-aktionen">
              <TerminKnopf />
              <Link href="/leistungen" className="btn-outline">Alle Leistungen</Link>
            </div>
          </div>
        </section>

        {/* Werdegang */}
        <section className="um-block">
          <h2 className="um-h2">Mein Weg zu SkinLove</h2>
          <ol className="um-weg">
            {weg.map((w, i) => (
              <li key={w.titel}>
                <span className="um-weg-nr">{i + 1}</span>
                <h3>{w.titel}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Bei der Arbeit */}
        <section className="um-block">
          <h2 className="um-h2">Bei der Arbeit</h2>
          <div className="um-fotos">
            <Image src="/images/eve-bei-der-arbeit-2.webp" alt="Eve Paule beim Tätowieren im Studio SkinLove in Marchtrenk" width={903} height={1100} sizes="(max-width: 700px) 92vw, 440px" />
            <Image src="/images/eve-bei-der-arbeit-1.webp" alt="Eve Paule sticht ein farbiges Tattoo am Bein, SkinLove Marchtrenk" width={888} height={1100} sizes="(max-width: 700px) 92vw, 440px" />
          </div>
        </section>

        {/* Was mir wichtig ist */}
        <section className="um-block">
          <h2 className="um-h2">Was mir wichtig ist</h2>
          <div className="um-werte">
            {werte.map((w) => (
              <div key={w.titel} className="um-wert">
                <h3>{w.titel}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Arbeitsproben */}
        <section className="um-block">
          <h2 className="um-h2">Ein paar meiner Arbeiten</h2>
          <div className="um-arbeiten">
            {arbeiten.map((a) => (
              <Link key={a.src} href="/leistungen/tattoos" className="um-arbeit">
                <Image src={a.src} alt={a.alt} width={600} height={600} sizes="(max-width: 700px) 46vw, 220px" />
              </Link>
            ))}
          </div>
          <p className="um-mehr"><Link href="/leistungen/tattoos">Mehr Tattoos ansehen →</Link></p>
        </section>

        {/* Kundenstimmen */}
        <section className="um-block">
          <h2 className="um-h2">Das sagen meine Kundinnen und Kunden</h2>
          <div className="um-stimmen">
            {stimmen.map((r) => (
              <figure key={r.n} className="um-stimme">
                <div className="um-sterne" aria-label="5 von 5 Sternen">★★★★★</div>
                <blockquote>&bdquo;{r.t}&ldquo;</blockquote>
                <figcaption>{r.n} · Google-Bewertung</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Abschluss */}
        <section className="um-schluss">
          <h2 className="um-h2">Lust auf dein nächstes Tattoo oder Piercing?</h2>
          <p className="um-text">Termine gibt es nach vorheriger Absprache – einfach online anfragen oder anrufen.</p>
          <div className="um-links">
            {leistungen.map((l) => <Link key={l.href} href={l.href}>{l.text}</Link>)}
          </div>
          <div className="um-aktionen um-aktionen-mitte">
            <TerminKnopf />
            <a href="tel:+436607835346" className="btn-outline">+43 660 78 353 46</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
