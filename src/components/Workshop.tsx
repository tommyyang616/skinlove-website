"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const workshops = [
  {
    id: 1,
    badge: "Neu",
    image: "https://myhellocash.com/img/salon/website/522/94f9725f-f8a1-417f-9b9a-06bc84e7f3b4.jpg",
    date: "Auf Anfrage",
    title: "Tattoo Grundkurs",
    desc: "Lerne die Grundlagen des Tätowierens — von Hygiene & Setup über Linework bis hin zu einfachen Motiven. Hands-on Training in kleiner Gruppe (max. 4 Personen).",
    duration: "1 Tag (8h)",
    level: "Anfänger",
    spots: 3,
    price: 299,
    deposit: 100,
  },
  {
    id: 2,
    badge: "Beliebt",
    image: "https://myhellocash.com/img/salon/website/522/9f603991-4c06-4b3c-9578-c4ca9ca049f8.jpg",
    date: "Auf Anfrage",
    title: "Piercing Kurs",
    desc: "Professionelles Piercing von A bis Z: Anatomie, Schmuckauswahl, Sterilisation, Technik. Inkl. Übungsmaterial und Zertifikat.",
    duration: "2 Tage",
    level: "Alle Level",
    spots: 2,
    price: 349,
    deposit: 120,
  },
  {
    id: 3,
    badge: "Exklusiv",
    image: "https://myhellocash.com/img/salon/website/522/0570c36e-30f5-4150-b9c5-7625ef22ad3c.jpg",
    date: "Auf Anfrage",
    title: "1:1 Mentoring",
    desc: "Intensives Einzelcoaching mit Eve — individuell auf deine Ziele abgestimmt. Ideal für Fortgeschrittene die ihren Stil verfeinern möchten.",
    duration: "Flexibel",
    level: "Fortgeschritten",
    spots: 1,
    price: 499,
    deposit: 150,
  },
];

const guestArtists = [
  {
    name: "Coming Soon",
    style: "Guest Artist",
    avatar: "https://myhellocash.com/img/salon/website/522/ede7b670-4110-44fc-a579-bb75b52bd73c.jpg",
    images: [
      "https://myhellocash.com/img/salon/website/522/94f9725f-f8a1-417f-9b9a-06bc84e7f3b4.jpg",
      "https://myhellocash.com/img/salon/website/522/9f603991-4c06-4b3c-9578-c4ca9ca049f8.jpg",
      "https://myhellocash.com/img/salon/website/522/0570c36e-30f5-4150-b9c5-7625ef22ad3c.jpg",
    ],
  },
];

type WorkshopType = typeof workshops[0];

function BookingModal({ ws, onClose }: { ws: WorkshopType; onClose: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: contact,
          service: `Workshop: ${ws.title}`,
          message: `Workshop-Buchung: ${ws.title} · Anzahlung: ${ws.deposit}€`,
        }),
      });
      setSent(true);
    } catch {
      // fail silently
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 relative"
        style={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-white/40 hover:text-white transition-colors"
        >
          ×
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="text-5xl text-[var(--pink)] mb-4">✓</div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-white mb-3">
              Buchung bestätigt!
            </h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-2">
              Dein Platz ist reserviert. Eve meldet sich bei dir.
            </p>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-6">
              Bitte überweise die Anzahlung auf:<br />
              <strong className="text-white">AT37 2032 6000 0123 9441</strong><br />
              <span className="text-xs">BIC: SPNAKT21XXX · Betreff: Workshop + dein Name</span>
            </p>
            <button
              onClick={onClose}
              className="bg-[var(--pink)] text-white px-8 py-3 text-sm font-medium hover:brightness-110 transition-all"
            >
              Schließen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-white mb-1">
              {ws.title}
            </h3>
            <p className="text-sm text-[var(--text-dim)] mb-6">Platz reservieren</p>

            {/* Deposit info */}
            <div className="rounded-lg p-4 mb-5" style={{ background: "rgba(187,53,153,0.06)", border: "1px solid rgba(187,53,153,0.15)" }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-[var(--text-dim)]">Anzahlung</span>
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-white font-semibold">{ws.deposit} €</span>
              </div>
              <div className="text-sm text-[var(--text-dim)] leading-relaxed">
                <strong className="text-white">Banküberweisung:</strong><br />
                <strong className="text-white">AT37 2032 6000 0123 9441</strong><br />
                BIC: SPNAKT21XXX<br />
                <span className="text-xs">Betreff: Workshop + dein Name</span>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50 transition-colors"
              />
              <input
                type="text"
                placeholder="E-Mail oder Telefon"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-5 bg-[var(--pink)] text-white py-3 text-sm font-medium tracking-wider uppercase hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? "Wird gesendet..." : "📅 Platz reservieren"}
            </button>
            <p className="text-center text-xs text-[var(--text-dim)] mt-3">
              Eve meldet sich bei dir zur Bestätigung
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Workshop() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeModal, setActiveModal] = useState<WorkshopType | null>(null);

  return (
    <>
      <section id="workshop" className="py-24 md:py-32" style={{ background: "#262630" }}>
        <div ref={ref} className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">Workshop</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
              Workshops & Kurse
            </h2>
            <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto mb-6" />
            <p className="max-w-xl mx-auto text-sm text-[var(--text-dim)] leading-relaxed">
              Lerne von Eve persönlich — in kleinen Gruppen, hands-on, mit allem was du brauchst. Plätze sind begrenzt!
            </p>
          </motion.div>

          {/* Workshop Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {workshops.map((ws, i) => (
              <motion.div
                key={ws.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex flex-col overflow-hidden border border-white/5 hover:border-[var(--pink)]/20 transition-all duration-300"
                style={{ background: "var(--bg-card)" }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(10,10,10,0.8))" }} />
                  <span className="absolute top-3 right-3 bg-[var(--pink)] text-white text-[10px] font-semibold tracking-[1.5px] uppercase px-3 py-1.5 z-10">
                    {ws.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--pink)] mb-2">{ws.date}</p>
                  <h4 className="font-[family-name:var(--font-cormorant)] text-xl text-white mb-2">{ws.title}</h4>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed flex-1 mb-4">{ws.desc}</p>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="text-xs text-[var(--text-dim)] flex items-center gap-1">⏱ {ws.duration}</span>
                    <span className="text-xs bg-[rgba(187,53,153,0.1)] text-[var(--pink)] px-2.5 py-1">{ws.level}</span>
                    <span className="text-xs text-[var(--text-dim)]">
                      Noch <strong className="text-[var(--pink)]">{ws.spots}</strong> Plätze frei
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-[family-name:var(--font-cormorant)] text-2xl text-white font-semibold">{ws.price} €</span>
                      <span className="text-xs text-[var(--text-dim)] ml-1">gesamt</span>
                    </div>
                    <button
                      onClick={() => setActiveModal(ws)}
                      className="bg-[var(--pink)] text-white text-xs font-medium tracking-[1.5px] uppercase px-5 py-2.5 hover:brightness-110 transition-all"
                    >
                      Buchen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guest Artists */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-20"
          >
            <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">Guest Artists</p>
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-white mb-8">
              Gasttätowierer
            </h3>
            <div className="flex flex-wrap gap-4">
              {guestArtists.map((artist) => (
                <div
                  key={artist.name}
                  className="w-72 overflow-hidden border border-white/5 hover:border-[var(--pink)]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{ background: "var(--bg-card)" }}
                >
                  {/* Mosaic */}
                  <div className="grid grid-cols-3 h-44">
                    {artist.images.map((img, j) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={j} src={img} alt="" className="w-full h-full object-cover" />
                    ))}
                  </div>
                  {/* Info */}
                  <div className="px-5 pb-5 flex flex-col items-center text-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-14 h-14 rounded-full object-cover border-2 -mt-7 relative z-10"
                      style={{ borderColor: "var(--bg-card)" }}
                    />
                    <div>
                      <h4 className="font-[family-name:var(--font-cormorant)] text-lg text-white">{artist.name}</h4>
                      <p className="text-xs text-[var(--text-dim)]">{artist.style}</p>
                    </div>
                    <span className="text-xs text-[var(--pink)] tracking-widest uppercase font-medium">Details ansehen →</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {activeModal && (
        <BookingModal ws={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
