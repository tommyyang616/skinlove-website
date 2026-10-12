import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { teilenMeta } from "@/lib/teilen-meta";

const TITEL = "Leistungen – Tattoo, Piercing & mehr bei Wels und Linz";
const BESCHREIBUNG = "Alle Leistungen von SkinLove in Marchtrenk zwischen Wels und Linz: Tattoos, Piercings, Permanent Make-up, Wimpernlifting, Ohrlöcher für Kinder und Kurse.";

export const metadata: Metadata = {
    title: TITEL,
    description: BESCHREIBUNG,
    alternates: { canonical: "/leistungen" },
    ...teilenMeta(TITEL, BESCHREIBUNG, "/leistungen"),
};

const services = [
    { href: "/leistungen/tattoos", icon: "🖊️", title: "Tattoos", desc: "Fineline, Mini- und Finger-Tattoos, Black & Grey, Mandala und Watercolor. Dazu Cover-ups, Auffrischungen und Narbenüberdeckungen – mit kostenlosem Beratungsgespräch." },
    { href: "/leistungen/piercings", icon: "💎", title: "Piercings", desc: "Ohr, Nase, Septum, Augenbraue, Bauchnabel, Zunge, Lippe, Brustwarze und Intim. Erstschmuck aus Titan oder Chirurgenstahl und Kontrolltermin sind im Preis enthalten." },
    { href: "/leistungen/permanent-make-up", icon: "💄", title: "Permanent Make-up", desc: "Natürlich pigmentierte Augenbrauen und dezent betonte Lippen – individuell beraten, vorgezeichnet und erst gestochen, wenn die Form passt." },
    { href: "/leistungen/lash-brow-lifting", icon: "👁️", title: "Lash & Brow Lifting", desc: "Wimpernlifting und Brow Lifting mit Färben und Keratin-Pflege – ohne Kleber und ohne Extensions, hält sechs bis neun Wochen." },
    { href: "/leistungen/kinderohrringe", icon: "✨", title: "Kinderohrringe", desc: "Ohrlöcher stechen für Kinder mit dem Studex-System und steril verpackten Erststeckern, ab 6 Monaten – mit Ruhe und Zeit statt Hektik." },
    { href: "/leistungen/spezialleistungen", icon: "⚡", title: "Spezialleistungen", desc: "Wildfleischbehandlung, Dermal-Anker-Entfernung, Korrekturen von Fehlstichen, Schmuckwechsel und Dehnen – auch bei Piercings aus anderen Studios." },
    { href: "/workshops", icon: "🎓", title: "Tattoo- & Piercing-Kurse", desc: "Tätowieren und Piercen lernen in kleinen Gruppen mit höchstens drei Teilnehmenden – mit Material und Zertifikat." },
    { href: "/gasttatowierer", icon: "🌍", title: "Gasttätowierer", desc: "Regelmäßig tätowieren Gast-Artists mit eigenem Stil im Studio – Arbeiten ansehen und Termin anfragen." },
];

export default function LeistungenPage() {
    return (
      <>
        <Navigation unterseite />
        <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Outfit',sans-serif" }}>
            <div style={{ padding: "24px 24px 0", maxWidth: 800, margin: "0 auto" }}>
                <Link href="/" style={{ color: "#BB3599", textDecoration: "none", fontSize: 14 }}>← Startseite</Link>
            </div>
            <div style={{ padding: "48px 24px", maxWidth: 800, margin: "0 auto" }}>
                <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Unsere Leistungen</h1>
                <p style={{ color: "#aaa", fontSize: 17, lineHeight: 1.7, marginBottom: 16 }}>Alles unter einem Dach — von Eve Paule persönlich.</p>
                <p style={{ color: "#aaa", fontSize: 17, lineHeight: 1.7, marginBottom: 48 }}>
                    Das Studio SkinLove liegt im Marktcenter in Marchtrenk, zwischen Wels und Linz: Aus Wels
                    bist du in rund zehn Minuten da, aus Linz in 20 bis 25 Minuten. Termine gibt es nach
                    vorheriger Absprache – so bleibt für jede Behandlung genug Zeit.
                </p>
                <div style={{ display: "grid", gap: 16 }}>
                    {services.map((s) => (
                        <Link key={s.href} href={s.href} style={{ textDecoration: "none", color: "inherit" }}>
                            <div style={{ padding: 24, background: "rgba(187,53,153,0.06)", border: "1px solid rgba(187,53,153,0.15)", borderRadius: 16, display: "flex", alignItems: "center", gap: 20, transition: "border-color 0.2s" }}>
                                <div style={{ fontSize: 36 }}>{s.icon}</div>
                                <div>
                                    <h2 style={{ fontSize: 21, fontWeight: 600, marginBottom: 6 }}>{s.title}</h2>
                                    <p style={{ color: "#aaa", fontSize: 16, lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                                <div style={{ marginLeft: "auto", color: "#BB3599", fontSize: 20 }}>→</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      <Footer />
      </>
    );
}
