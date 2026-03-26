"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const slugMap: Record<string, string> = {
  "Tattoos": "tattoos",
  "Piercings": "piercings",
  "Permanent Make-up": "permanent-make-up",
  "Lash & Brow Lifting": "lash-brow-lifting",
  "Kinderohrringe": "kinderohrringe",
  "Spezialleistungen": "spezialleistungen",
};

const services = [
  { title: "Tattoos", desc: "Fine-Line, Black & Grey, Mandala, Watercolor, Mini-Tattoos, Finger-Tattoos, Cover-Ups, Auffrischung & Narbenüberdeckung.", details: ["Farbtattoos & Schwarz-Weiß-Tattoos — detailreiche Farbarbeiten oder klassische Black & Grey", "Mini-Tattoos — kleine Kunstwerke mit großer Bedeutung, perfekt für dezente Designs", "Finger-Tattoos — wenige Studios bieten es an, ich schon!", "Cover-Ups für kleinere Motive — kostenloses Beratungsgespräch", "Tattoo-Auffrischung — Farben auffrischen oder Linien nachziehen, egal von welchem Studio", "Narbenüberdeckungen — kleinere Narben kunstvoll kaschieren", "Individuelle Zeichnungen — Wunschmotiv persönlich im Studio besprechen", "Nachstechen innerhalb 14 Tagen kostenlos bei übermäßigem Farbverlust"] },
  { title: "Piercings", desc: "Professionell, hygienisch, mit Feingefühl. Nase, Ohr, Surface, Bauchnabel, Oral, Lippe, Brustwarze & Intimbereich.", details: ["Nase: Nostril, Septum, Bridge, Nassallang", "Ohr: Lobe, Helix, Tragus, Conch/Rook, Industrial, Daith/Migräne", "Surface: Augenbraue, Anti Eyebrow, Oberflächen", "Bauchnabel: Standard, Doppelt, 4-fach", "Oral: Zunge, Doppelt/Snake, Lippenbändchen", "Lippe: Madonna/Labret/Medusa, Bites, Ashley", "Brustwarze: Einzel oder Beide", "Intimbereich Damen & Herren — komplettes Angebot", "Alles inkl. Schmuck & Kontrolltermin"] },
  { title: "Permanent Make-up", desc: "Natürliche Schönheit unterstreichen: Fein gezeichnete Augenbrauen und dezente Lippen, die lange halten.", details: ["Augenbrauen — natürlich gezeichnet, typgerecht angepasst", "Lippen — dezente Schattierung für mehr Ausdruck", "Langanhaltend — erleichtert den Alltag, kein tägliches Nachziehen", "Präzise Arbeit mit modernstem Equipment", "Individuelle Beratung vor jeder Behandlung"] },
  { title: "Lash & Brow Lifting", desc: "Naturwimpern sanft nach oben geformt — länger & voller. Brow Lifting für ausdrucksstarke Augenbrauen.", details: ["Lash Lifting inkl. Färben & Keratin", "Brow Lifting inkl. Färben & Keratin", "Kombi Lash & Brow inkl. Zupfen", "Empfohlen alle 6–9 Wochen für dauerhaften WOW-Effekt"] },
  { title: "Kinderohrringe", desc: "Studex-System — sanft, schmerzarm & sicher. Ab 6 Monaten.", details: ["Studex-System — kein Schießen, speziell für empfindliche Kinderhaut", "Ab 6 Monaten möglich", "Ab 8 Jahren auch andere Ohrringe mit Nadel möglich", "Verschiedene Motiv-Designs verfügbar", "Entspannte Atmosphäre für Kinder und Eltern"] },
  { title: "Spezialleistungen", desc: "Wildfleischbehandlung, Dermal Anker Entfernung, kostenlose Erstberatung & mehr.", details: ["Wildfleischbehandlung", "Dermal Anker Entfernung — fachgerecht mit minimalem Narbenrisiko", "Nachstechen gratis innerhalb von 14 Tagen", "Kostenlose Beratung & Erstgespräche jederzeit", "Piercing-Korrekturen bei Fehlstichen aus anderen Studios", "Prontolind Spray & Gel für optimale Pflege", "Stecker kürzen, Fremdschmuck wechseln, Dehnen"] },
];

const guestArtists = [
  {
    name: "Nikola",
    style: "Gasttätowierer",
    avatar: "/gallery/guests/guest1-profile.jpg",
    works: ["/gallery/arbeit1.jpg", "/gallery/arbeit2.jpg", "/gallery/arbeit3.jpg", "/gallery/arbeit4.jpg", "/gallery/arbeit6.jpg", "/gallery/guests/guest1-work1.jpg", "/gallery/guests/guest1-work2.jpg", "/gallery/guests/guest1-work3.jpg", "/gallery/guests/guest1-work4.jpg"],
  },
  {
    name: "Nadija",
    style: "Gasttätowiererin",
    avatar: "/gallery/guests/nadija-profilbild.jpg",
    works: Array.from({ length: 17 }, (_, i) => `/gallery/guests/nadija${i + 1}.jpg`),
  },
  {
    name: "Srdjan",
    style: "Gasttätowierer",
    avatar: "/gallery/guests/srdjan-profilbild.jpg",
    works: Array.from({ length: 15 }, (_, i) => `/gallery/guests/srdjan${i + 1}.jpg`),
  },
];

export default function Services({ onBook }: { onBook: () => void }) {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());
  const [guestLbOpen, setGuestLbOpen] = useState(false);
  const [guestLbIdx, setGuestLbIdx] = useState(0);
  const [workLbOpen, setWorkLbOpen] = useState(false);
  const [workLbIdx, setWorkLbIdx] = useState(0);
  const [workImgs, setWorkImgs] = useState<string[]>([]);

  const toggle = (i: number) => {
    setOpenCards(prev => {
      const s = new Set(prev);
      if (s.has(i)) s.delete(i);
      else s.add(i);
      return s;
    });
  };

  const openGuestLb = (idx: number) => { setGuestLbIdx(idx); setGuestLbOpen(true); };
  const closeGuestLb = () => setGuestLbOpen(false);
  const navGuest = useCallback((dir: number) => setGuestLbIdx(p => (p + dir + guestArtists.length) % guestArtists.length), []);
  const openWorkLb = (imgs: string[], idx: number) => { setWorkImgs(imgs); setWorkLbIdx(idx); setWorkLbOpen(true); };
  const closeWorkLb = () => setWorkLbOpen(false);
  const navWork = useCallback((dir: number) => setWorkLbIdx(p => (p + dir + workImgs.length) % workImgs.length), [workImgs.length]);

  // Lock body scroll when any lightbox is open
  useEffect(() => {
    document.body.style.overflow = (guestLbOpen || workLbOpen) ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (workLbOpen) {
        if (e.key === "Escape") closeWorkLb();
        if (e.key === "ArrowLeft") navWork(-1);
        if (e.key === "ArrowRight") navWork(1);
      } else if (guestLbOpen) {
        if (e.key === "Escape") closeGuestLb();
        if (e.key === "ArrowLeft") navGuest(-1);
        if (e.key === "ArrowRight") navGuest(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [guestLbOpen, workLbOpen, navWork, navGuest]);

  // Touch swipe for work lightbox — live drag
  const touchStartX = useRef(0);
  const dragRef = useRef(0);
  const imgRef = useRef<HTMLDivElement>(null);

  const onWorkTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    dragRef.current = 0;
    if (imgRef.current) imgRef.current.style.transition = "none";
  }, []);

  const onWorkTouchMove = useCallback((e: React.TouchEvent) => {
    dragRef.current = e.touches[0].clientX - touchStartX.current;
    if (imgRef.current) imgRef.current.style.transform = `translateX(${dragRef.current}px)`;
  }, []);

  const onWorkTouchEnd = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    if (Math.abs(dragRef.current) > 50) {
      const dir = dragRef.current < 0 ? 1 : -1;
      const exitX = dragRef.current < 0 ? -window.innerWidth : window.innerWidth;
      el.style.transition = "transform .2s ease-in";
      el.style.transform = `translateX(${exitX}px)`;
      setTimeout(() => {
        navWork(dir);
        el.style.transition = "none";
        el.style.transform = `translateX(${-exitX}px)`;
        requestAnimationFrame(() => {
          el.style.transition = "transform .2s ease-out";
          el.style.transform = "translateX(0)";
        });
      }, 200);
    } else {
      el.style.transition = "transform .2s ease-out";
      el.style.transform = "translateX(0)";
    }
    dragRef.current = 0;
  }, [navWork]);

  // Touch swipe for guest artist lightbox (navigate between artists)
  const guestTouchX = useRef(0);
  const handleGuestTouchStart = useCallback((e: React.TouchEvent) => {
    guestTouchX.current = e.touches[0].clientX;
  }, []);
  const handleGuestTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - guestTouchX.current;
    if (Math.abs(dx) > 50) navGuest(dx < 0 ? 1 : -1);
  }, [navGuest]);

  return (
    <section className="section" id="services">
      <div className="container">
        <span className="section-label reveal">Leistungen</span>
        <h2 className="section-title reveal">Was ich für dich mache</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card reveal${openCards.has(i) ? " open" : ""}`} onClick={() => toggle(i)}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-expand">Mehr erfahren</span>
              <div className="service-detail">
                <ul>{s.details.map((d, j) => <li key={j}>{d}</li>)}</ul>
                <Link
                  href={`/leistungen/${slugMap[s.title] || "tattoos"}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "var(--pink)", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, transition: "opacity .3s" }}
                >
                  Details & FAQ →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* GASTTÄTOWIERER */}
        <div className="guest-section reveal" id="guest-artists" style={{ marginTop: 80 }}>
          <span className="section-label" style={{ marginBottom: 12, display: "block" }}>Guest Artists</span>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", color: "#fff", fontWeight: 600, marginBottom: 12 }}>Gasttätowierer bei SkinLove</h3>
          <div className="guest-grid">
            {guestArtists.map((a, i) => (
              <div key={i} className="guest-card" onClick={() => openGuestLb(i)}>
                <div className="guest-card-mosaic">
                  {a.works.slice(0, 3).map((w, j) => <Image key={j} src={w} alt="Arbeit von Gasttätowierer" width={320} height={320} sizes="(max-width: 768px) 45vw, 180px" loading="lazy" />)}
                </div>
                <div className="guest-card-bottom">
                  <Image className="guest-avatar" src={a.avatar} alt={a.name} width={60} height={60} sizes="60px" loading="lazy" />
                  <div className="guest-info">
                    <h4>{a.name}</h4>
                    <p>{a.style}</p>
                  </div>
                  <span className="guest-cta">Arbeiten ansehen →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Artist Lightbox */}
        <div className={`guest-lb${guestLbOpen ? " open" : ""}`} id="guestLb"
          onTouchStart={handleGuestTouchStart} onTouchEnd={handleGuestTouchEnd}>
          <div className="guest-lb-inner">
            <button className="guest-lb-close" onClick={closeGuestLb} aria-label="Schließen">×</button>
            {guestArtists.length > 1 && (
              <>
                <button className="guest-lb-nav prev" onClick={() => navGuest(-1)} aria-label="Vorheriger Künstler">‹</button>
                <button className="guest-lb-nav next" onClick={() => navGuest(1)} aria-label="Nächster Künstler">›</button>
              </>
            )}
            {guestArtists[guestLbIdx] && (
              <>
                <div className="guest-lb-header">
                  <Image src={guestArtists[guestLbIdx].avatar} alt={guestArtists[guestLbIdx].name} width={120} height={120} sizes="120px" loading="lazy" />
                  <h3>{guestArtists[guestLbIdx].name}</h3>
                  <p>{guestArtists[guestLbIdx].style}</p>
                </div>
                <div className="guest-lb-gallery">
                  {guestArtists[guestLbIdx].works.map((w, j) => (
                    <Image key={j} src={w} alt={`Arbeit von ${guestArtists[guestLbIdx].name}`} width={420} height={420} sizes="(max-width: 768px) 44vw, 240px" loading="lazy" onClick={() => openWorkLb(guestArtists[guestLbIdx].works, j)} />
                  ))}
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); closeGuestLb(); setTimeout(onBook, 300); }} style={{ display: "block", textAlign: "center", marginTop: 20, padding: "12px 24px", background: "var(--pink)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "opacity .3s" }}>Termin vereinbaren</a>
              </>
            )}
          </div>
        </div>

        {/* Guest Work Lightbox — live drag swipe */}
        <div className={`lightbox${workLbOpen ? " open" : ""}`} style={{ zIndex: 10002 }}
          onClick={(e) => { if (e.target === e.currentTarget) closeWorkLb(); }}
          onTouchStart={onWorkTouchStart}
          onTouchMove={onWorkTouchMove}
          onTouchEnd={onWorkTouchEnd}>
          <button className="lb-close" onClick={closeWorkLb} aria-label="Schließen">×</button>
          <button className="lb-nav prev" onClick={() => navWork(-1)} aria-label="Vorheriges Bild">‹</button>
          <div ref={imgRef} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {workImgs[workLbIdx] && <Image className="lb-main" src={workImgs[workLbIdx]} alt="Gastarbeit vergrößert" width={1200} height={1200} sizes="90vw" />}
          </div>
          <button className="lb-nav next" onClick={() => navWork(1)} aria-label="Nächstes Bild">›</button>
          <div className="lb-counter">{workLbIdx + 1} / {workImgs.length}</div>
        </div>
      </div>
    </section>
  );
}
