export const serviceData: Record<string, {
  title: string;
  metaTitle: string;
  description: string;
  hero: string;
  details: string[];
  faq: { q: string; a: string }[];
}> = {
  tattoos: {
    title: "Tattoos",
    metaTitle: "Tattoos in Marchtrenk | Fine-Line, Cover-Up & mehr",
    description: "Professionelle Tattoos in Marchtrenk bei Wels: Fine-Line, Black & Grey, Mandala, Watercolor, Mini-Tattoos, Cover-Ups & Narbenüberdeckung von Eve Paule.",
    hero: "Dein Motiv. Deine Geschichte. Meine Kunst.",
    details: [
      "Fine-Line & filigrane Motive — detailreich und präzise",
      "Black & Grey — klassische Schattierungen mit Tiefe",
      "Mandala & Ornamente — geometrische Kunstwerke",
      "Watercolor — farbenfrohe Designs mit Aquarell-Effekt",
      "Mini-Tattoos — kleine Kunstwerke mit großer Bedeutung",
      "Finger-Tattoos — wenige Studios bieten es an, ich schon!",
      "Cover-Ups — kostenloses Beratungsgespräch vorher",
      "Tattoo-Auffrischung — Farben & Linien nachziehen, egal welches Studio",
      "Narbenüberdeckungen — kleinere Narben kunstvoll kaschieren",
      "Individuelle Zeichnungen — Wunschmotiv persönlich im Studio besprechen",
      "Nachstechen innerhalb 14 Tagen kostenlos bei übermäßigem Farbverlust",
    ],
    faq: [
      { q: "Wie viel kostet ein Tattoo?", a: "Der Preis hängt von Größe, Motiv und Aufwand ab. Meld dich bei mir für ein kostenloses Beratungsgespräch!" },
      { q: "Tut es sehr weh?", a: "Die Schmerzempfindung ist individuell. Die meisten Stellen sind gut auszuhalten — ich geh auf dein Tempo ein." },
      { q: "Wie pflege ich mein neues Tattoo?", a: "Du bekommst nach dem Stechen eine genaue Pflegeanleitung. Prontolind Spray & Gel gibt's direkt im Studio." },
    ],
  },
  piercings: {
    title: "Piercings",
    metaTitle: "Piercings in Marchtrenk | Nase, Ohr, Bauchnabel & mehr",
    description: "Professionelle Piercings in Marchtrenk: Nase, Ohr, Septum, Helix, Tragus, Bauchnabel, Zunge, Lippe, Brustwarze & Intimbereich bei SkinLove.",
    hero: "Professionell gestochen. Mit Feingefühl.",
    details: [
      "Nase: Nostril, Septum, Bridge, Nassallang",
      "Ohr: Lobe, Helix, Tragus, Conch, Rook, Industrial, Daith/Migräne",
      "Surface: Augenbraue, Anti Eyebrow, Oberflächen-Piercings",
      "Bauchnabel: Standard, Doppelt, 4-fach",
      "Oral: Zunge, Doppelt/Snake, Lippenbändchen (Smiley)",
      "Lippe: Madonna, Labret, Medusa, Bites, Ashley",
      "Brustwarze: Einzel oder Beide",
      "Intimbereich: Komplettes Angebot für Damen & Herren",
      "Alles inkl. Schmuck & Kontrolltermin",
    ],
    faq: [
      { q: "Ab welchem Alter kann ich mir ein Piercing stechen lassen?", a: "Unter 16 mit schriftlicher Einverständniserklärung der Eltern. Ab 16 mit Begleitperson, ab 18 eigenständig." },
      { q: "Wie lange dauert die Heilung?", a: "Je nach Stelle 4 Wochen (Ohrläppchen) bis 12 Monate (Bauchnabel). Du bekommst eine genaue Pflegeanleitung." },
    ],
  },
  "permanent-make-up": {
    title: "Permanent Make-up",
    metaTitle: "Permanent Make-up Marchtrenk | Augenbrauen & Lippen",
    description: "Permanent Make-up in Marchtrenk: Natürlich gezeichnete Augenbrauen & Lippen. Langanhaltend, individuell, von Eve Paule bei SkinLove.",
    hero: "Natürliche Schönheit. Dauerhaft betont.",
    details: [
      "Augenbrauen — natürlich gezeichnet, typgerecht angepasst",
      "Lippen — dezente Schattierung für mehr Ausdruck",
      "Langanhaltend — erleichtert den Alltag, kein tägliches Nachziehen",
      "Präzise Arbeit mit modernstem Equipment",
      "Individuelle Beratung vor jeder Behandlung",
      "Auffrischung nach 4-6 Wochen empfohlen",
    ],
    faq: [
      { q: "Wie lange hält Permanent Make-up?", a: "In der Regel 1-3 Jahre, je nach Hauttyp und Pflege. Auffrischungen sind möglich." },
      { q: "Ist es schmerzhaft?", a: "Eine Betäubungscreme wird aufgetragen. Die meisten empfinden nur ein leichtes Kratzen." },
    ],
  },
  "lash-brow-lifting": {
    title: "Lash & Brow Lifting",
    metaTitle: "Lash & Brow Lifting Marchtrenk | inkl. Färben & Keratin",
    description: "Lash Lifting & Brow Lifting in Marchtrenk: Naturwimpern sanft geformt, inkl. Färben & Keratin. Ausdrucksstarke Augenbrauen bei SkinLove.",
    hero: "Dein Blick. Dein Statement.",
    details: [
      "Lash Lifting inkl. Färben & Keratin-Pflege",
      "Brow Lifting inkl. Färben & Keratin-Pflege",
      "Kombi Lash & Brow inkl. Zupfen — das volle Programm",
      "Hält 6-9 Wochen",
      "Sanfte Behandlung, kein Kleber, keine Extensions",
      "Natürlicher WOW-Effekt vom ersten Tag an",
    ],
    faq: [
      { q: "Wie oft sollte ich das wiederholen?", a: "Alle 6-9 Wochen für dauerhaft schöne Wimpern & Brauen." },
      { q: "Kann ich danach Mascara benutzen?", a: "Ja, nach 24 Stunden. Aber die meisten brauchen keine mehr! 😉" },
    ],
  },
  kinderohrringe: {
    title: "Kinderohrringe",
    metaTitle: "Kinderohrringe stechen Marchtrenk | Studex System, ab 6 Monate",
    description: "Kinderohrringe stechen in Marchtrenk: Sanft, schmerzarm & sicher mit dem Studex-System. Ab 6 Monaten bei SkinLove.",
    hero: "Sanft & sicher. Für die Kleinsten.",
    details: [
      "Studex-System — kein Schießen, speziell für empfindliche Kinderhaut",
      "Ab 6 Monaten möglich",
      "Ab 8 Jahren auch andere Ohrringe mit Nadel möglich",
      "Verschiedene süße Motiv-Designs verfügbar",
      "Entspannte Atmosphäre für Kinder und Eltern",
      "Inkl. Pflegehinweise für die Eltern",
    ],
    faq: [
      { q: "Ist es sicher für kleine Kinder?", a: "Ja! Das Studex-System ist speziell für Kinder entwickelt — kein Schuss, minimal schmerzarm, medizinisch getestet." },
      { q: "Welchen Schmuck verwenden Sie?", a: "Hypoallergene Studex-Ohrstecker aus chirurgischem Stahl oder Titan." },
    ],
  },
  spezialleistungen: {
    title: "Spezialleistungen",
    metaTitle: "Spezialleistungen Marchtrenk | Wildfleisch, Dermal Anker & mehr",
    description: "Spezialleistungen bei SkinLove in Marchtrenk: Wildfleischbehandlung, Dermal Anker Entfernung, Piercing-Korrekturen, Nachstechen & kostenlose Erstberatung.",
    hero: "Mehr als Tattoo & Piercing.",
    details: [
      "Wildfleischbehandlung — professionelle Behandlung von Granulationsgewebe",
      "Dermal Anker Entfernung — fachgerecht mit minimalem Narbenrisiko",
      "Nachstechen gratis innerhalb von 14 Tagen bei übermäßigem Farbverlust",
      "Kostenlose Beratung & Erstgespräche jederzeit",
      "Piercing-Korrekturen bei Fehlstichen aus anderen Studios",
      "Prontolind Spray & Gel für optimale Pflege — direkt im Studio erhältlich",
      "Stecker kürzen, Fremdschmuck wechseln, Dehnen",
    ],
    faq: [
      { q: "Was ist Wildfleisch und wie wird es behandelt?", a: "Wildfleisch (Granulationsgewebe) entsteht manchmal bei Piercings. Wir behandeln es professionell — meld dich einfach bei uns." },
      { q: "Kann ich auch Schmuck von anderen Studios wechseln lassen?", a: "Ja klar! Komm einfach vorbei — Fremdschmuck wechseln ist kein Problem." },
      { q: "Kostet die Erstberatung etwas?", a: "Nein, Beratung und Erstgespräch sind bei uns immer kostenlos!" },
    ],
  },
};

export const slugs = Object.keys(serviceData);
