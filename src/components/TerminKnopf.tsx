"use client";

import { useState } from "react";
import TerminModal from "@/components/TerminModal";

/**
 * Knopf, der das gemeinsame Anfrage-Popup öffnet. Das Popup wird erst beim
 * ersten Klick eingehängt - sonst stünde es bei mehreren Knöpfen auf einer
 * Seite mehrfach im Code.
 */
export default function TerminKnopf({ text = "Termin anfragen" }: { text?: string }) {
  const [benutzt, setBenutzt] = useState(false);
  const [open, setOpen] = useState(false);

  const oeffnen = () => {
    setBenutzt(true);
    // ein Bild später öffnen, damit die Einblend-Animation läuft
    requestAnimationFrame(() => setOpen(true));
  };

  return (
    <>
      <button type="button" className="btn-primary" onClick={oeffnen}>
        {text}
      </button>
      {benutzt && <TerminModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
