"use client";
import { useEffect, useRef, useState } from "react";

const SB_URL = "https://ebcjdkjrzwjxxwgtzunh.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY2pka2pyendqeHh3Z3R6dW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDY4OTksImV4cCI6MjA4ODQyMjg5OX0.eOeWfKVQ8ZSVvsc0zcZtFQAFtx05Oe6AAukgqRS0zeY";

interface WS { id: string; title: string; desc: string; date: string; time: string; price: number; deposit: number; maxSpots: number; takenSpots: number; category: string; includes: string; img: string; }

const FALLBACK: WS[] = [
  { id:"tattoo-kurs", title:"Tattoo Kurs", desc:"Lerne Tätowieren von Grund auf — Theorie, Hygiene, Technik & Praxis. Jeden Mittwoch & Donnerstag, fortlaufend.", date:"2026-04-01", time:"Mi 17:00 – 19:00 · Do 17:00 – 20:00", price:499, deposit:150, maxSpots:6, takenSpots:0, category:"Tattoo", includes:"Material, Übungshaut, Zertifikat", img:"/images/workshop1.jpg" },
  { id:"piercing-kurs", title:"Piercing Kurs", desc:"Hygiene, Anatomie, Materialien & erste Stiche unter Anleitung. Für alle die ins Piercing-Business einsteigen wollen.", date:"2026-04-13", time:"Mo & Di 17:00 – 19:00", price:499, deposit:150, maxSpots:4, takenSpots:0, category:"Piercing", includes:"Starter-Kit, Zertifikat, Modell-Praxis", img:"/images/workshop2.jpg" },
  { id:"lash-lifting-basics", title:"Lash & Brow Lifting — Basics", desc:"Lerne die Grundlagen des Lash & Brow Liftings. Theorie, Praxis an Modellen, Materialien inklusive. Perfekt für Einsteigerinnen!", date:"2026-04-12", time:"10:00 – 16:00", price:349, deposit:100, maxSpots:6, takenSpots:0, category:"Lash & Brow", includes:"Material, Zertifikat, Verpflegung", img:"/images/workshop3.jpg" },
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
        const res = await fetch(SB_URL + "/rest/v1/courses?active=eq.true&order=start_date&select=*,bookings(count)", {
          headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY },
        });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setWorkshops(data.map((c: any) => {
            let img = c.image_url || "";
            // Map old .png refs or missing images to optimized .jpg
            if (!img || img.includes("workshop1")) img = "/images/workshop1.jpg";
            else if (img.includes("workshop2")) img = "/images/workshop2.jpg";
            else if (img.includes("workshop3")) img = "/images/workshop3.jpg";
            return {
              id: c.id, title: c.title, desc: c.description, date: c.start_date, time: c.time_text,
              price: c.price, deposit: c.deposit, maxSpots: c.max_spots, takenSpots: c.bookings?.[0]?.count || 0,
              category: c.category, includes: c.includes || "", img,
            };
          }));
        }
      } catch { /* fallback */ }
    })();
  }, []);

  const selected = workshops.find(w => w.id === selectedId);

  const openModal = (id: string) => {
    setSelectedId(id); setSuccess(false); setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => { setModalOpen(false); document.body.style.overflow = ""; };

  const submit = () => {
    const name = nameRef.current?.value.trim() || "";
    const contact = contactRef.current?.value.trim() || "";
    if (!name) { if (nameRef.current) nameRef.current.style.borderColor = "#bb3599"; return; }
    if (!contact) { if (contactRef.current) contactRef.current.style.borderColor = "#bb3599"; return; }
    if (!selected) return;

    const d = new Date(selected.date + "T00:00");
    const dateStr = d.toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" });
    const msg = `💈 *Neue Workshop-Buchung!*%0A%0A*Workshop:* ${selected.title}%0A*Datum:* ${dateStr}, ${selected.time}%0A*Preis:* € ${selected.price} (Anzahlung: € ${selected.deposit})%0A*Zahlung:* 🏦 Überweisung (ausstehend)%0A%0A*Name:* ${name}%0A*Kontakt:* ${contact}%0A%0A_Gesendet über skinlove-website_`;
    window.open(`https://wa.me/436607835346?text=${msg}`, "_blank");

    fetch(SB_URL + "/rest/v1/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SB_KEY, Authorization: "Bearer " + SB_KEY },
      body: JSON.stringify({ course_id: selected.id, name, email: contact, phone: contact, status: "pending", paid: false }),
    }).catch(() => {});

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
      <section className="section" id="workshop" style={{ background: "#262630" }}>
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
                      <span className="ws-info-icon" onClick={toggleInfo}>i</span>
                      <div className="ws-info-popup">
                        <button className="close-info" onClick={(e) => { e.stopPropagation(); (e.currentTarget.parentElement as HTMLElement).classList.remove("show"); }}>×</button>
                        <h5>Voraussetzungen</h5>
                        <ul><li>Mindestalter: 18 Jahre</li><li>Keine Vorkenntnisse nötig</li><li>Material wird gestellt</li></ul>
                        <h5 style={{ marginTop: 12 }}>Stornierung</h5>
                        <ul><li>14+ Tage vorher: 100% Erstattung</li><li>7–14 Tage: 50% Erstattung</li><li>Unter 7 Tage: keine Erstattung</li></ul>
                        <h5 style={{ marginTop: 12 }}>Inkludiert</h5>
                        <p style={{ fontSize: 12, color: "var(--text-dim)" }}>{ws.includes}</p>
                      </div>
                    </div>
                    <div className="ws-card-body">
                      <div className="ws-card-date">{dateStr}</div>
                      <h4>{ws.title}</h4>
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
              <button onClick={() => scrollWs(-1)}>‹</button>
              <button onClick={() => scrollWs(1)}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Booking Modal */}
      <div className={`modal-overlay${modalOpen ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal" style={{ maxWidth: 440 }}>
          <button className="modal-close" onClick={closeModal}>×</button>
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
