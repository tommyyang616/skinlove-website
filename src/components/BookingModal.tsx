"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const services = [
  "Tattoo — Neues Tattoo",
  "Tattoo — Cover-Up",
  "Tattoo — Auffrischung",
  "Piercing",
  "Permanent Make-up",
  "Lash & Brow",
  "Beratungsgespräch",
  "Sonstiges",
];

export default function BookingModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Bitte Name und E-Mail ausfüllen");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Fehler beim Senden");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Fehler beim Senden");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-md bg-[#141414] border border-white/10 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Termin anfragen
            </h3>
            <p className="text-xs text-[#888] mb-6">
              Wir melden uns innerhalb von 24 Stunden bei dir.
            </p>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✓</div>
                <p className="text-white font-medium">Anfrage gesendet!</p>
                <p className="text-[#888] text-sm mt-1">Wir melden uns bald bei dir.</p>
                <button onClick={onClose} className="mt-4 px-6 py-2 bg-[#bb3599] text-white text-sm hover:bg-[#a02d85] transition-colors cursor-pointer">
                  Schließen
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  placeholder="Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 text-white text-sm outline-none focus:border-[#bb3599] transition-colors"
                />
                <input
                  type="email"
                  placeholder="E-Mail *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 text-white text-sm outline-none focus:border-[#bb3599] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Telefon (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 text-white text-sm outline-none focus:border-[#bb3599] transition-colors"
                />
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 text-white text-sm outline-none focus:border-[#bb3599] transition-colors"
                >
                  <option value="">Service wählen...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Deine Nachricht (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 text-white text-sm outline-none focus:border-[#bb3599] transition-colors min-h-[80px] resize-y"
                />
                {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="w-full p-3 bg-[#bb3599] text-white font-semibold text-sm hover:bg-[#a02d85] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? "Wird gesendet..." : "Anfrage senden"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
