import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Leistungen – SkinLove Tattoo & Piercing",
    description: "Alle Leistungen von SkinLove: Tattoos, Piercings, Permanent Make-up, Lash Lifting & Workshops in Marchtrenk bei Wels.",
    alternates: { canonical: "/leistungen" },
};

const services = [
    { slug: "tattoos", icon: "🖊️", title: "Tattoos", desc: "Fine-Line, Black & Grey, Mandala, Watercolor, Cover-Ups" },
    { slug: "piercings", icon: "💎", title: "Piercings", desc: "Nase, Ohr, Surface, Bauchnabel, Oral & mehr" },
    { slug: "permanent-make-up", icon: "💄", title: "Permanent Make-up", desc: "Augenbrauen & Lippen — natürlich betont" },
    { slug: "lash-brow-lifting", icon: "👁️", title: "Lash & Brow Lifting", desc: "Inkl. Färben & Keratin" },
    { slug: "kinderohrringe", icon: "✨", title: "Kinderohrringe", desc: "Sanft & sicher mit dem Studex-System, ab 6 Monate" },
    { slug: "spezialleistungen", icon: "⚡", title: "Spezialleistungen", desc: "Wildfleisch, Dermal Anker, Korrekturen & mehr" },
];

export default function LeistungenPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Outfit',sans-serif" }}>
            <div style={{ padding: "24px 24px 0", maxWidth: 800, margin: "0 auto" }}>
                <Link href="/" style={{ color: "#BB3599", textDecoration: "none", fontSize: 14 }}>← Startseite</Link>
            </div>
            <div style={{ padding: "48px 24px", maxWidth: 800, margin: "0 auto" }}>
                <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Unsere Leistungen</h1>
                <p style={{ color: "#999", marginBottom: 48 }}>Alles unter einem Dach — von Eve Paule persönlich.</p>
                <div style={{ display: "grid", gap: 16 }}>
                    {services.map((s) => (
                        <Link key={s.slug} href={`/leistungen/${s.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div style={{ padding: 24, background: "rgba(187,53,153,0.06)", border: "1px solid rgba(187,53,153,0.15)", borderRadius: 16, display: "flex", alignItems: "center", gap: 20, transition: "border-color 0.2s" }}>
                                <div style={{ fontSize: 36 }}>{s.icon}</div>
                                <div>
                                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{s.title}</h2>
                                    <p style={{ color: "#999", fontSize: 14 }}>{s.desc}</p>
                                </div>
                                <div style={{ marginLeft: "auto", color: "#BB3599", fontSize: 20 }}>→</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}