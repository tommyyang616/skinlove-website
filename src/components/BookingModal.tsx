"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [form, setForm] = useState({ name: "", email: "", service: "tattoo", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hallo Eve! 💕\n\nName: ${form.name}\nE-Mail: ${form.email}\nService: ${form.service}\n\nNachricht: ${form.message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/436607923606?text=${encoded}`, "_blank");
    onClose();
    setForm({ name: "", email: "", service: "tattoo", message: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[440px] rounded-2xl border border-white/10 p-8 relative"
            style={{ background: "#1a1a1a" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xl transition-colors"
            >
              ✕
            </button>

            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-white mb-2">
              Termin anfragen
            </h3>
            <p className="text-sm text-[var(--text-dim)] mb-6">
              Schick mir deine Anfrage direkt per WhatsApp
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Dein Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50"
              />
              <input
                type="email"
                placeholder="Deine E-Mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50"
              />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--pink)]/50 appearance-none"
              >
                <option value="tattoo" className="bg-[#1a1a1a]">Tattoo</option>
                <option value="piercing" className="bg-[#1a1a1a]">Piercing</option>
                <option value="pmu" className="bg-[#1a1a1a]">Permanent Make-up</option>
                <option value="lash" className="bg-[#1a1a1a]">Lash &amp; Brow Lifting</option>
                <option value="kinder" className="bg-[#1a1a1a]">Kinderohrringe</option>
                <option value="sonstiges" className="bg-[#1a1a1a]">Sonstiges</option>
              </select>
              <textarea
                placeholder="Beschreibe dein Wunschprojekt..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[var(--pink)] text-white py-3 rounded-lg font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>💬</span> Via WhatsApp senden
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
