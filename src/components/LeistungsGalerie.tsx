"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Bildleiste fuer die Leistungsseiten: laeuft von selbst weiter und laesst
 * sich mit den Pfeilen blaettern. Die Bilder sind doppelt im Markup, damit
 * der Uebergang vom Ende zum Anfang nicht springt.
 */
export default function LeistungsGalerie({
  bilder,
  titel,
}: {
  bilder: { src: string; alt: string }[];
  titel: string;
}) {
  const bahn = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);

  // Sanftes Weiterlaufen. Am Ende der ersten Haelfte zurueck auf Anfang -
  // weil die Bilder doppelt liegen, sieht das nahtlos aus.
  useEffect(() => {
    if (pause) return;
    const el = bahn.current;
    if (!el) return;
    const timer = window.setInterval(() => {
      if (!el) return;
      const haelfte = el.scrollWidth / 2;
      if (el.scrollLeft >= haelfte) el.scrollLeft -= haelfte;
      else el.scrollLeft += 1;
    }, 28);
    return () => window.clearInterval(timer);
  }, [pause]);

  const blaettern = (richtung: number) => {
    const el = bahn.current;
    if (!el) return;
    const karte = el.querySelector("[data-karte]") as HTMLElement | null;
    const schritt = karte ? karte.offsetWidth + 12 : 260;
    el.scrollBy({ left: richtung * schritt * 2, behavior: "smooth" });
  };

  if (!bilder.length) return null;
  const doppelt = [...bilder, ...bilder];

  return (
    <div
      style={{ padding: "0 0 56px" }}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={() => setPause(true)}
    >
      <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 600, textAlign: "center", marginBottom: 6 }}>
        Arbeiten aus dem Studio
      </h2>
      <p style={{ color: "#888", fontSize: 14, textAlign: "center", marginBottom: 22 }}>
        {`${bilder.length} Motive — alle von Eve Paule in Marchtrenk gestochen`}
      </p>

      <div style={{ position: "relative" }}>
        <div
          ref={bahn}
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "0 24px",
            scrollSnapType: "x proximity",
          }}
        >
          {doppelt.map((b, i) => (
            <div
              key={b.src + i}
              data-karte
              style={{
                position: "relative",
                flex: "0 0 auto",
                width: 240,
                aspectRatio: "3 / 4",
                overflow: "hidden",
                background: "#141414",
                scrollSnapAlign: "start",
              }}
            >
              <Image
                src={b.src}
                alt={i < bilder.length ? b.alt : ""}
                aria-hidden={i >= bilder.length}
                fill
                loading={i < 4 ? "eager" : "lazy"}
                sizes="240px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => blaettern(-1)}
          aria-label={`Vorherige Bilder ${titel}`}
          style={pfeil("left")}
        >
          &#8249;
        </button>
        <button
          onClick={() => blaettern(1)}
          aria-label={`Weitere Bilder ${titel}`}
          style={pfeil("right")}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

function pfeil(seite: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [seite]: 6,
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "rgba(187,53,153,.92)",
    color: "#fff",
    fontSize: 24,
    lineHeight: 1,
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  };
}
