"use client";

import { useState } from "react";
import TerminModal from "@/components/TerminModal";

/** Knopf, der direkt das gemeinsame Anfrage-Popup öffnet. */
export default function TerminKnopf({ text = "Termin anfragen" }: { text?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
        {text}
      </button>
      <TerminModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
