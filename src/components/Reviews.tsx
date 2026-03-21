"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    name: "Lisa M.",
    rating: 5,
    text: "Mega zufrieden mit meinem neuen Tattoo! Eve hat sich so viel Zeit genommen für die Beratung und das Ergebnis ist wunderschön. Super sauberes Studio, total angenehme Atmosphäre.",
    date: "vor 2 Wochen",
  },
  {
    name: "Sarah K.",
    rating: 5,
    text: "Ich war zum ersten Mal bei Eve fürs Microblading und bin absolut begeistert! Sie hat mir genau erklärt was sie macht und das Ergebnis sieht so natürlich aus. Klare Empfehlung!",
    date: "vor 1 Monat",
  },
  {
    name: "Markus W.",
    rating: 5,
    text: "Bestes Tattoo-Studio in der Umgebung! Bin schon das dritte Mal hier und jedes Mal super zufrieden. Eve ist eine echte Künstlerin. Hygiene ist top und man fühlt sich wohl.",
    date: "vor 1 Monat",
  },
  {
    name: "Julia R.",
    rating: 5,
    text: "Hatte richtig Angst vor meinem ersten Piercing, aber Eve hat mich so gut beruhigt. Total professionell und schmerzarm. Der Schmuck ist wunderschön! Danke!",
    date: "vor 2 Monaten",
  },
  {
    name: "Bianca F.",
    rating: 5,
    text: "Eve hat mein altes Tattoo gecovert und es sieht 1000x besser aus! Sie hat das Design extra für mich angepasst und das Ergebnis ist ein Traum. Absolute Empfehlung!",
    date: "vor 2 Monaten",
  },
  {
    name: "Andi P.",
    rating: 5,
    text: "Hammer Studio! Clean, modern und Eve ist einfach super drauf. Hab mir ein Sleeve anfangen lassen und die Qualität ist der Wahnsinn. Preis-Leistung stimmt auch.",
    date: "vor 3 Monaten",
  },
  {
    name: "Nina H.",
    rating: 4,
    text: "Powder Brows bei Eve machen lassen — sieht mega natürlich aus! Einziger kleiner Kritikpunkt: musste etwas länger auf einen Termin warten. Aber das Warten hat sich gelohnt!",
    date: "vor 3 Monaten",
  },
  {
    name: "Thomas B.",
    rating: 5,
    text: "Top Piercing-Studio! Habe mir zwei neue Ohrlöcher stechen lassen. Super schnell, sauber und professionell. Die Nachsorge-Tipps waren auch sehr hilfreich. Komme wieder!",
    date: "vor 4 Monaten",
  },
  {
    name: "Carina L.",
    rating: 5,
    text: "Ich liebe mein neues Tattoo! Eve hat meine Idee perfekt umgesetzt. Von der ersten Beratung bis zum fertigen Ergebnis alles top. Das Studio ist soo schön eingerichtet!",
    date: "vor 4 Monaten",
  },
  {
    name: "Michi G.",
    rating: 5,
    text: "Workshop bei Eve gemacht — war mega lehrreich und hat richtig Spaß gemacht! Sie erklärt alles super verständlich und man darf auch richtig üben. Kann ich nur empfehlen!",
    date: "vor 5 Monaten",
  },
  {
    name: "Sandra E.",
    rating: 5,
    text: "Lip Blush bei SkinLove machen lassen und bin SO happy! Sieht mega natürlich aus, genau wie ich es wollte. Eve ist einfach die Beste! Healing war auch total unkompliziert.",
    date: "vor 5 Monaten",
  },
  {
    name: "Alex T.",
    rating: 5,
    text: "Eve ist eine absolute Künstlerin! Mein Realistic-Tattoo sieht aus wie ein Foto auf der Haut. Die Detailarbeit ist unglaublich. Fahre gerne den Weg nach Marchtrenk dafür!",
    date: "vor 6 Monaten",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < count ? "text-yellow-400" : "text-gray-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="section-4 py-24 md:py-32">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Was Kunden sagen
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Bewertungen
          </h2>
          <div className="pink-line mb-8" />

          <div className="inline-flex items-center gap-4 glass-card px-6 py-3 rounded-full">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <Stars count={5} />
            <span className="text-white font-semibold">4.6</span>
            <span className="text-[var(--text-dim)] text-sm">
              auf Google
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--pink)]/20 flex items-center justify-center text-[var(--pink)] font-semibold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {review.name}
                    </p>
                    <p className="text-[var(--text-dimmer)] text-xs">
                      {review.date}
                    </p>
                  </div>
                </div>
                <Stars count={review.rating} />
              </div>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
