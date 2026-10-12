import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import TerminKnopf from "@/components/TerminKnopf";
import { teilenMeta } from "@/lib/teilen-meta";

const TITEL = "Gasttätowierer bei SkinLove in Marchtrenk";
const BESCHREIBUNG = "Gasttätowierer bei SkinLove in Marchtrenk zwischen Wels und Linz: Arbeiten von Nadija und Srdjan ansehen und einen Termin bei deinem Wunsch-Artist anfragen.";

export const metadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/gasttatowierer" },
  ...teilenMeta(TITEL, BESCHREIBUNG, "/gasttatowierer"),
};

// Dieselben Gäste und Bilder wie auf der Startseite (Services.tsx).
const gaeste = [
  {
    name: "Nadija",
    rolle: "Gasttätowiererin",
    avatar: "/gallery/guests/nadija-profilbild-klein.webp",
    bilder: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/gallery/guests/nadija${n}-v2.webp`),
  },
  {
    name: "Srdjan",
    rolle: "Gasttätowierer",
    avatar: "/gallery/guests/srdjan-profilbild-klein.webp",
    bilder: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/gallery/guests/srdjan${n}-v2.webp`),
  },
];

export default function GasttaetowiererPage() {
  return (
    <>
      <main className="um">
        <section className="um-block kurs-text" style={{ textAlign: "center" }}>
          <p className="um-label">Guest Artists</p>
          <h1 className="um-h1" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>Gasttätowierer bei SkinLove</h1>
          <p className="um-rolle">Mehr Handschriften, ein Studio – zwischen Wels und Linz</p>
          <p className="um-text" style={{ margin: "0 auto 16px" }}>
            Neben Inhaberin Eve Paule tätowieren bei SkinLove regelmäßig Gasttätowierer mit ihrem
            eigenen Stil. Für dich heißt das: mehr Auswahl, ohne das Studio zu wechseln – im
            Marktcenter in Marchtrenk, rund zehn Minuten von Wels und 20 bis 25 Minuten von Linz.
          </p>
        </section>

        {gaeste.map((g) => (
          <section key={g.name} className="um-block">
            <div className="gast-kopf">
              <Image src={g.avatar} alt={`${g.rolle} ${g.name}`} width={96} height={96} className="gast-avatar" />
              <div>
                <h2 className="um-h2" style={{ margin: 0, textAlign: "left" }}>{g.name}</h2>
                <p className="um-text" style={{ margin: 0 }}>{g.rolle} bei SkinLove</p>
              </div>
            </div>
            <div className="um-arbeiten">
              {g.bilder.map((b, i) => (
                <div key={b} className="um-arbeit">
                  <Image src={b} alt={`Tattoo von ${g.rolle} ${g.name} bei SkinLove in Marchtrenk, Arbeit ${i + 1}`} width={600} height={600} sizes="(max-width: 860px) 46vw, 260px" />
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="um-block kurs-text">
          <h2 className="um-h2">So bekommst du einen Termin</h2>
          <p className="um-text">
            Wann die Gasttätowierer im Studio sind, wird auf der Startseite und auf Instagram
            angekündigt. Frag einfach über das Formular an und schreib dazu, bei wem du tätowiert
            werden möchtest – Motiv, Größe und Körperstelle helfen bei der Planung.
          </p>
          <p className="um-text">
            Lieber zu Eve? Ihre Arbeiten findest du auf der Seite <Link href="/leistungen/tattoos" style={{ color: "var(--pink-text)" }}>Tattoos</Link>.
          </p>
        </section>

        <section className="um-schluss">
          <h2 className="um-h2">Termin bei einem Gast-Artist anfragen</h2>
          <p className="um-text">Termine nach vorheriger Absprache – online anfragen oder anrufen.</p>
          <div className="um-aktionen um-aktionen-mitte">
            <TerminKnopf />
            <a href="https://www.instagram.com/skinlove_tattoopiercing/" target="_blank" rel="noopener noreferrer" className="btn-outline">Instagram</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
