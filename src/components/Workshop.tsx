"use client";
import { useEffect, useRef, useState } from "react";

interface WS { id: string; title: string; desc: string; date: string; time: string; price: number; deposit: number; maxSpots: number; takenSpots: number; category: string; includes: string; img: string; }

type ApiCourse = Omit<WS, "img"> & { img?: string };

const WORKSHOP_IMGS = ["/images/workshop1.jpg", "/images/workshop2.jpg", "/images/workshop3.jpg"];

export default function Workshop() {
  const [workshops, setWorkshops] = useState<WS[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/courses");
        const data: unknown = await res.json();
        if (Array.isArray(data)) {
          setWorkshops((data as ApiCourse[]).map((c, i: number) => ({
            ...c,
            img: c.img || WORKSHOP_IMGS[i % WORKSHOP_IMGS.length],
          })));
        }
      } catch { /* empty = no workshops shown */ }
      finally { setLoading(false); }
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
    const email = emailRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";
    let valid = true;
    if (!name) { if (nameRef.current) nameRef.current.style.borderColor = "#bb3599"; valid = false; }
    if (!email) { if (emailRef.current) emailRef.current.style.borderColor = "#bb3599"; valid = false; }
    if (!phone) { if (phoneRef.current) phoneRef.current.style.borderColor = "#bb3599"; valid = false; }
    if (!valid || !selected) return;

    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, courseId: selected.id }),
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
          {loading ? (
            <p style={{ color: "var(--text-dim)", fontSize: 14, textAlign: "center", padding: "40px 0" }}>Workshops laden…</p>
          ) : workshops.length === 0 ? (
            <p style={{ color: "var(--text-dim)", fontSize: 14, textAlign: "center", padding: "40px 0" }}>Aktuell keine Workshops geplant — schau bald wieder vorbei!</p>
          ) : (
          <div style={{ position: "relative" }}>
            <div className="ws-grid" ref={gridRef}>
              {workshops.map(ws => {
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
          )}
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
                {selected.time} · € {selected.price}
              </p>
              <label>Name *</label>
              <input ref={nameRef} type="text" placeholder="Dein Name" className="ws-input" onFocus={(e) => e.currentTarget.style.borderColor = ""} />
              <label>E-Mail *</label>
              <input ref={emailRef} type="email" placeholder="email@beispiel.at" className="ws-input" onFocus={(e) => e.currentTarget.style.borderColor = ""} />
              <label>Telefon *</label>
              <input ref={phoneRef} type="tel" placeholder="0660 1234567" className="ws-input" onFocus={(e) => e.currentTarget.style.borderColor = ""} />
              <button className="btn-primary" onClick={submit} style={{ width: "100%", border: "none", cursor: "pointer", marginTop: 16 }}>📅 Platz reservieren</button>
              <p style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "center", marginTop: 12 }}>Eve meldet sich bei dir zur Bestätigung</p>
            </div>
          ) : success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 48, color: "var(--pink)", marginBottom: 16 }}>✓</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", color: "#fff", marginBottom: 12 }}>Buchung bestätigt!</h3>
              <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 24 }}>Dein Platz ist reserviert. Eve meldet sich bei dir zur Bestätigung.</p>
              <button className="btn-primary" onClick={closeModal} style={{ border: "none", cursor: "pointer", display: "inline-flex" }}>Schließen</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
