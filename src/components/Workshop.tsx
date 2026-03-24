"use client";
import { useEffect, useRef, useState } from "react";

interface WS { id: string; title: string; desc: string; date: string; time: string; price: number; deposit: number; maxSpots: number; takenSpots: number; category: string; includes: string; img: string; }

type ApiCourse = Omit<WS, "img"> & { img?: string };

const FALLBACK: WS[] = [
  { id: "tattoo-kurs", title: "Tattoo Kurs", desc: "Lerne Tätowieren von Grund auf — Theorie, Hygiene, Technik & Praxis. Jeden Mittwoch & Donnerstag, fortlaufend.", date: "2026-04-01", time: "Mi 17:00 – 19:00 · Do 17:00 – 20:00", price: 499, deposit: 150, maxSpots: 6, takenSpots: 0, category: "Tattoo", includes: "Material, Übungshaut, Zertifikat", img: "/images/workshop1.jpg" },
  { id: "piercing-kurs", title: "Piercing Kurs", desc: "Hygiene, Anatomie, Materialien & erste Stiche unter Anleitung. Für alle die ins Piercing-Business einsteigen wollen.", date: "2026-04-13", time: "Mo & Di 17:00 – 19:00", price: 499, deposit: 150, maxSpots: 4, takenSpots: 0, category: "Piercing", includes: "Starter-Kit, Zertifikat, Modell-Praxis", img: "/images/workshop2.jpg" },
  { id: "lash-lifting-basics", title: "Lash & Brow Lifting — Basics", desc: "Lerne die Grundlagen des Lash & Brow Liftings. Theorie, Praxis an Modellen, Materialien inklusive. Perfekt für Einsteigerinnen!", date: "2026-04-12", time: "10:00 – 16:00", price: 349, deposit: 100, maxSpots: 6, takenSpots: 0, category: "Lash & Brow", includes: "Material, Zertifikat, Verpflegung", img: "/images/workshop3.jpg" },
];

export default function Workshop() {
  const [workshops, setWorkshops] = useState<WS[]>(FALLBACK);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/courses");
        const data: unknown = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const fallbackImgs = ["/images/workshop1.jpg", "/images/workshop2.jpg", "/images/workshop3.jpg"];
          setWorkshops((data as ApiCourse[]).map((c, i: number) => {
            const img = c.img || fallbackImgs[i % fallbackImgs.length];
            return { ...c, img };
          }));
        }
      } catch { /* fallback */ }
    })();
  }, []);

  const selected = workshops.find(w => w.id === selectedId);

  const openModal = (id: string) => {
    setSelectedId(id); setSuccess(false); setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); };

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const submit = () => {
    const name = nameRef.current?.value.trim() || "";
    const contact = contactRef.current?.value.trim() || "";
    if (!name) { if (nameRef.current) nameRef.current.style.borderColor = "#bb3599"; return; }
    if (!contact) { if (contactRef.current) contactRef.current.style.borderColor = "#bb3599"; return; }
    if (!selected) return;

    // Save via API (Prisma + rate limiting + telegram)
    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: contact, courseId: selected.id }),
    }).catch(() => { });

    setSuccess(true);
  };

  const scrollWs = (dir: number) => {
    if (!gridRef.current) return;
    const card = gridRef.current.querySelector(".ws-card") as HTMLElement;
    if (card) gridRef.current.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const icon = e.currentTarget;
    const popup = icon.nextElementSibling as HTMLElement;
    document.querySelectorAll(".ws-info-popup.show").forEach(p => { if (p !== popup) p.classList.remove("show"); });
    popup?.classList.toggle("show");
  };

  return (
    <>
      <section className="section" id="workshop" style={{ background: "#202028" }}>
        <div className="container">
          <span className="section-label reveal">Workshop</span>
          <h2 className="section-title reveal">Workshops &amp; Kurse</h2>
          <p className="reveal" style={{ maxWidth: 600, color: "var(--text-dim)", fontSize: 14, lineHeight: 1.8, marginBottom: 48 }}>Lerne von Eve persönlich — in kleinen Gruppen, hands-on, mit allem was du brauchst. Plätze sind begrenzt!</p>
          <div style={{ position: "relative" }}>
            <div className="ws-grid" ref={gridRef}>
              {workshops.map(ws => {
                const d = new Date(ws.date + "T00:00");
                const dateStr = d.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                const spotsLeft = ws.maxSpots - ws.takenSpots;
                const soldOut = spotsLeft <= 0;
                return (
                  <div key={ws.id} className="ws-card reveal visible">
                    <div className="ws-card-img" style={{ backgroundImage: ws.img ? `url('${ws.img}')` : "linear-gradient(135deg,rgba(187,53,153,.3),rgba(10,10,10,.9))" }}>
                      <span className="ws-card-badge">{ws.category}</span>
                      <button type="button" className="ws-info-icon" onClick={toggleInfo} aria-label="Workshop-Info anzeigen">i</button>
                      <div className="ws-info-popup">
                        <button className="close-info" onClick={(e) => { e.stopPropagation(); (e.currentTarget.parentElement as HTMLElement).classList.remove("show"); }} aria-label="Info schließen">×</button>
                        <h4>Voraussetzungen</h4>
                        <ul><li>Mindestalter: 18 Jahre</li><li>Keine Vorkenntnisse nötig</li><li>Material wird gestellt</li></ul>
                        <h4 style={{ marginTop: 12 }}>Stornierung</h4>
                        <ul><li>14+ Tage vorher: 100% Erstattung</li><li>7–14 Tage: 50% Erstattung</li><li>Unter 7 Tage: keine Erstattung</li></ul>
                        <h4 style={{ marginTop: 12 }}>Inkludiert</h4>
                        <p style={{ fontSize: 12, color: "var(--text-dim)" }}>{ws.includes}</p>
                      </div>
                    </div>
                    <div className="ws-card-body">
                      <div className="ws-card-date">{dateStr}</div>
                      <h3>{ws.title}</h3>
                      <p className="ws-card-desc">{ws.desc}</p>
                      <div className="ws-card-meta">
                        <span>🕐 {ws.time}</span>
                        <span>👥 max. {ws.maxSpots} Plätze</span>
                        <span className="tag">{ws.includes.split(",")[0]}</span>
                      </div>
                      <div className="ws-card-footer">
                        <div>
                          <div className="ws-card-price">€ {ws.price} <small>inkl. Material</small></div>
                          <div className="ws-card-spots">{soldOut ? <strong>Ausgebucht</strong> : <>Noch <strong>{spotsLeft} Plätze</strong> frei</>}</div>
                        </div>
                      </div>
                      <button className={`ws-card-btn${soldOut ? " sold-out" : ""}`} disabled={soldOut} onClick={() => !soldOut && openModal(ws.id)}>
                        {soldOut ? "Ausgebucht" : "Platz sichern"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ws-scroll-nav">
              <button onClick={() => scrollWs(-1)} aria-label="Vorheriger Workshop">‹</button>
              <button onClick={() => scrollWs(1)} aria-label="Nächster Workshop">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Booking Modal */}
      <div className={`modal-overlay${modalOpen ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal" style={{ maxWidth: 440 }}>
          <button className="modal-close" onClick={closeModal} aria-label="Schließen">×</button>
          {!success && selected ? (
            <div>
              <h3>{selected.title}</h3>
              <p style={{ marginBottom: 20 }}>
                {new Date(selected.date + "T00:00").toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" })} · {selected.time} · € {selected.price}
              </p>
              <label>Name</label>
              <input ref={nameRef} type="text" placeholder="Dein Name" className="ws-input" />
              <label>E-Mail oder Telefon</label>
              <input ref={contactRef} type="text" placeholder="email@beispiel.at oder 0660 ..." className="ws-input" />
              <div style={{ marginTop: 8, padding: 16, background: "rgba(187,53,153,.06)", border: "1px solid rgba(187,53,153,.15)", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Anzahlung</span>
                  <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "#fff", fontWeight: 600 }}>€ {selected.deposit}</span>
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.8 }}>
                  <strong style={{ color: "#fff" }}>Banküberweisung:</strong><br />
                  <strong style={{ color: "#fff" }}>AT37 2032 6000 0123 9441</strong><br />
                  BIC: SPNAKT21XXX<br />
                  <span style={{ fontSize: 11 }}>Betreff: Workshop + dein Name</span>
                </div>
              </div>
              <button className="btn-primary" onClick={submit} style={{ width: "100%", border: "none", cursor: "pointer" }}>📅 Platz reservieren</button>
              <p style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "center", marginTop: 12 }}>Eve meldet sich bei dir zur Bestätigung</p>
            </div>
          ) : success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 48, color: "var(--pink)", marginBottom: 16 }}>✓</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", color: "#fff", marginBottom: 12 }}>Buchung bestätigt!</h3>
              <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 8 }}>Dein Platz ist reserviert. Eve meldet sich bei dir.</p>
              <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 24 }}>
                Bitte überweise die Anzahlung auf:<br />
                <strong style={{ color: "#fff" }}>AT37 2032 6000 0123 9441</strong><br />
                <span style={{ fontSize: 11 }}>BIC: SPNAKT21XXX · Betreff: Workshop + dein Name</span>
              </p>
              <button className="btn-primary" onClick={closeModal} style={{ border: "none", cursor: "pointer", display: "inline-flex" }}>Schließen</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
