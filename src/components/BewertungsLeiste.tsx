"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { BEWERTUNGS_HINWEIS, kurzName, type Bewertung } from "@/lib/bewertungen";

/** Das mehrfarbige Google-„G“ (Original-Farben). */
export function GoogleG({ groesse = 22 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/**
 * Bewertungen als wischbare Endlos-Leiste: Die Karten liegen dreimal im
 * Markup; wer über den Rand der mittleren Runde hinauswischt, wird
 * unsichtbar um eine Runde zurückgesetzt. Läuft alle paar Sekunden eine
 * Karte weiter und hält an, solange jemand wischt oder mit der Maus darüber ist.
 */
export default function BewertungsLeiste({ stimmen }: { stimmen: Bewertung[] }) {
  const bahn = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);
  const weiterNach = useRef<number | undefined>(undefined);

  // Abstand vom ersten Karten-Exemplar zum gleichen Exemplar der nächsten Runde
  const rundenBreite = useCallback(() => {
    const el = bahn.current;
    const a = el?.children[0] as HTMLElement | undefined;
    const b = el?.children[stimmen.length] as HTMLElement | undefined;
    return a && b ? b.offsetLeft - a.offsetLeft : 0;
  }, [stimmen.length]);

  const schritt = useCallback(() => {
    const karte = bahn.current?.querySelector("[data-karte]") as HTMLElement | null;
    return karte ? karte.offsetWidth + 16 : 320;
  }, []);

  // Start in der mittleren Runde, damit es in beide Richtungen weitergeht
  useEffect(() => {
    const el = bahn.current;
    if (el) el.scrollLeft = rundenBreite();
  }, [rundenBreite]);

  // Nahtlos zurücksetzen, sobald die mittlere Runde verlassen wird
  useEffect(() => {
    const el = bahn.current;
    if (!el) return;
    let t: number | undefined;
    const beimScrollen = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const runde = rundenBreite();
        if (el.scrollLeft < runde * 0.5) el.scrollLeft += runde;
        else if (el.scrollLeft > runde * 1.5) el.scrollLeft -= runde;
      }, 140);
    };
    el.addEventListener("scroll", beimScrollen, { passive: true });
    return () => { el.removeEventListener("scroll", beimScrollen); window.clearTimeout(t); };
  }, [rundenBreite]);

  // Von selbst weiterlaufen (nicht bei „weniger Bewegung“)
  useEffect(() => {
    if (pause || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      bahn.current?.scrollBy({ left: schritt(), behavior: "smooth" });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [pause, schritt]);

  const anhalten = () => {
    setPause(true);
    window.clearTimeout(weiterNach.current);
    weiterNach.current = window.setTimeout(() => setPause(false), 8000);
  };

  const blaettern = (richtung: number) => {
    anhalten();
    bahn.current?.scrollBy({ left: richtung * schritt(), behavior: "smooth" });
  };

  if (!stimmen.length) return null;
  const runden = [0, 1, 2];

  return (
    <div className="bl" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onTouchStart={anhalten}>
      <div className="bl-kopf">
        <GoogleG groesse={30} />
        <div>
          <h2>Google-Bewertungen</h2>
          <p><span className="bl-sterne" aria-hidden="true">★★★★★</span> 4,9 von 5 <span className="bl-stand">· Stand 10/2026</span></p>
        </div>
        <div className="bl-pfeile">
          <button type="button" onClick={() => blaettern(-1)} aria-label="Vorherige Bewertung">‹</button>
          <button type="button" onClick={() => blaettern(1)} aria-label="Nächste Bewertung">›</button>
        </div>
      </div>

      <div className="bl-bahn" ref={bahn}>
        {runden.flatMap((runde) =>
          stimmen.map((r, i) => (
            <figure key={`${runde}-${i}`} className="bl-karte" data-karte aria-hidden={runde !== 1}>
              <div className="bl-karte-kopf">
                <span className="bl-avatar" aria-hidden="true">{r.i}</span>
                <div className="bl-name">
                  <strong>{kurzName(r.n)}</strong>
                  <span>Google-Bewertung</span>
                </div>
                <GoogleG groesse={22} />
              </div>
              <div className="bl-sterne" aria-label="5 von 5 Sternen">★★★★★</div>
              <blockquote>&bdquo;{r.t}&ldquo;</blockquote>
            </figure>
          )),
        )}
      </div>
      <p className="bl-hinweis">{BEWERTUNGS_HINWEIS}</p>
    </div>
  );
}
