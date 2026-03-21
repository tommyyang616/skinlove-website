"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";

const reviews = [
  { initial: "A", name: "Anika Neuschitzer", date: "vor 2 Monaten", text: "Bin sehr happy mit meinem Piercing! Dankeschön! Eve ist eine sehr freundliche und authentische Frau, weiß was sie tut und man fühlt sich mega gut aufgehoben bei ihr!" },
  { initial: "J", name: "Julia Reifinger", date: "vor 4 Monaten", text: "Ich war bei Eve und habe mir mein erstes Tattoo stechen lassen. Bin mega zufrieden. Zuerst die Beratung, dann der Termin mit allen Erklärungen, einfach Top. Werde auf jeden Fall wieder kommen." },
  { initial: "D", name: "Dizdarevic Samra", date: "vor einem Monat", text: "Ich habe mir heute Morgen mein Piercing stechen lassen und bin total begeistert 🥰 Sie war super freundlich, sehr einfühlsam und alles war extrem sauber und hygienisch." },
  { initial: "T", name: "T. N.", date: "vor 5 Monaten", text: "Wir sind sehr zufrieden! Eve hat einen wunderbaren Umgang mit Kindern. Meine Tochter hat ihre ersten Kinderohrringe bekommen, und wir wurden zuvor sehr ausführlich und verständlich beraten." },
  { initial: "D", name: "Doris Lehner", date: "vor 4 Monaten", text: "Ich bin total zufrieden! Schon das Gespräch mit Eve vorab war super – sie ist auf all meine Wünsche eingegangen und hat gleichzeitig kreative Ideen eingebracht. Tolle Atmosphäre!" },
  { initial: "L", name: "lala _land", date: "vor 3 Monaten", text: "Ich war zum Piercen bei Skinlove und bin wirklich sehr begeistert. Eve ist äußerst erfahren, professionell und erklärt jeden Schritt ganz genau. Man merkt sofort, dass sie genau weiß, was sie tut." },
  { initial: "M", name: "Martina R.", date: "vor 4 Monaten", text: "Habe mir von Eve ein Conch-Piercing stechen lassen. Ich bin total begeistert! Sie ist eine absolut sympathische Person und man fühlt sich sofort wohl und gut aufgehoben!" },
  { initial: "N", name: "Natasa Savic", date: "vor einem Monat", text: "Haben meiner 7 Monate alten Tochter Ohrringe gestochen, sind sehr zufrieden. Sie ist mega freundlich, man fühlt sich total wohl, es wird einem alles sehr gut erklärt!" },
  { initial: "S", name: "Stefan Palmetzhofer", date: "vor 2 Monaten", text: "Danke Eve!!! Es war eine echt angenehme Zeit 😊 super Beratung, super freundlich... wir sehen uns im März!" },
  { initial: "D", name: "Dixy Dixy", date: "vor 4 Monaten", text: "Ich habe Nasen-Piercing stechen lassen, und es war gar nicht wie ich es befürchtet habe. Eine sehr leichte Hand, kaum spürbarer Schmerz. Tolle Beratung. Bin extrem zufrieden!" },
  { initial: "K", name: "Kerstin", date: "vor 2 Monaten", text: "Meine Tochter (4 Jahre) war bei Skinlove um ihre Ohrringe zu stechen. Meine Maus hat sich sehr wohlgefühlt und erzählt heute noch von der lieben Dame mit den großen Ohrringen 🥰" },
  { initial: "L", name: "Leonie Weber", date: "vor einem Monat", text: "Ich habe mich für ein Fine-Line-Tattoo entschieden und bin mehr als zufrieden. Sehr ruhige Hand, saubere Linien und ein perfektes Ergebnis. Beratung, Hygiene und Freundlichkeit waren top!" },
  { initial: "C", name: "Chiara Fuchs", date: "vor 2 Monaten", text: "Hab jetzt zwei Tattoos von ihr und bin sehr zufrieden. Sehr schön gestochen, alles hygienisch, sauber und sie selbst ist auch sehr freundlich." },
  { initial: "S", name: "Sarah Kost", date: "vor 4 Monaten", text: "Über Social Media auf sie gestoßen – und sofort begeistert! Ich bekam schnell einen Termin, wurde herzlich empfangen und super beraten. Ihre positive Art hat mir direkt die Angst genommen. Einfach toll!" },
];

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Stars = () => (
  <span className="text-yellow-400 text-sm tracking-wider">★★★★★</span>
);

export default function Reviews() {
  const ref = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scroll = useCallback((dir: number) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLDivElement>(".review-card");
    if (card) {
      trackRef.current.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
    }
  }, []);

  return (
    <section id="reviews" className="py-24 md:py-32" style={{ background: "#1a1a1e" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Bewertungen
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Das sagen meine Kunden
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <GoogleIcon />
            <span className="text-sm text-[var(--text-dim)]">4,6 Sterne · Google Bewertungen</span>
          </div>
          <div className="text-2xl text-yellow-400 tracking-wider">★★★★★</div>
        </motion.div>

        {/* Scrollable Track */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                className="review-card flex-shrink-0 w-[340px] max-md:w-[85vw] rounded-2xl border border-white/5 p-6 snap-start"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--pink)]/20 flex items-center justify-center text-[var(--pink)] font-semibold text-sm">
                    {r.initial}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{r.name}</div>
                    <div className="text-xs text-[var(--text-dim)]">{r.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <GoogleIcon />
                  <Stars />
                </div>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
            >
              →
            </button>
          </div>
        </motion.div>

        {/* All Reviews Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.google.com/search?q=rezensionen+f%C3%BCr+skinlove+tattoo-piercing-permanent+make-up"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--pink)]/30 text-[var(--pink)] text-sm hover:bg-[var(--pink)]/10 transition-colors"
          >
            Alle Bewertungen ansehen
          </a>
        </motion.div>
      </div>
    </section>
  );
}
