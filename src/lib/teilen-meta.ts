import type { Metadata } from "next";

// Vorschau beim Teilen (WhatsApp, Facebook, X). Next übernimmt openGraph und
// twitter einer Unterseite nicht anteilig vom Layout, sondern ganz oder gar
// nicht - ohne das hier zeigte jede Unterseite Titel und Bild der Startseite
// bzw. gar kein Bild.

type Bild = { url: string; width: number; height: number; alt: string };

const STANDARD_BILD: Bild = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "SkinLove Tattoo & Piercing in Marchtrenk",
};

export function teilenMeta(
  titel: string,
  beschreibung: string,
  pfad: string,
  bild: Bild = STANDARD_BILD,
  typ: "website" | "profile" = "website",
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title: titel,
      description: beschreibung,
      url: pfad,
      type: typ,
      locale: "de_AT",
      siteName: "SkinLove Tattoo & Piercing",
      images: [bild],
    },
    twitter: {
      card: "summary_large_image",
      title: titel,
      description: beschreibung,
      images: [bild.url],
    },
  };
}
