import { bewertungenVon, type Bewertung } from "@/lib/bewertungen";

/** Ein Satz zur Lage, gleich auf allen Seiten (Zahlen wie auf /anfahrt). */
const ANFAHRT = "Das Studio liegt im Marktcenter in Marchtrenk – aus Wels bist du in rund zehn Minuten da, aus Linz in 20 bis 25 Minuten.";

export const serviceData: Record<string, {
  title: string;
  metaTitle: string;
  description: string;
  /** Hauptüberschrift mit den Wörtern, nach denen gesucht wird. */
  h1: string;
  /** Kurzer Leitsatz unter der Überschrift. */
  hero: string;
  details: string[];
  /** Ausführliche Abschnitte: beantworten, was Kunden vorher wissen wollen. */
  abschnitte?: { h: string; text: string[] }[];
  /** Passende echte Google-Bewertungen. */
  stimmen?: Bewertung[];
  faq: { q: string; a: string }[];
  /** Arbeitsfotos fuer die Galerie. Alt-Texte beschreiben Motiv, Stil und Ort
   *  — so findet die Google-Bildersuche sie ueberhaupt erst. */
  bilder?: { src: string; alt: string }[];
}> = {
  tattoos: {
    title: "Tattoos",
    metaTitle: "Tattoostudio bei Wels & Linz | Fineline & Cover-up",
    description: "Tattoos für Wels & Linz: Fineline, Mini- und Finger-Tattoos, Black & Grey, Watercolor, Cover-ups und Narbenüberdeckung – kostenlose Beratung bei Eve Paule.",
    h1: "Tattoostudio in Marchtrenk – zwischen Wels und Linz",
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
    bilder: [
      { src: "/images/leistungen/tattoo-ginkgo-fine-line-unterarm.webp", alt: "Fine-Line-Tattoo mit Ginkgo-Blättern am Unterarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-federn-voegel-oberarm.webp", alt: "Federn-Tattoo mit aufsteigenden Vögeln über Schulter und Oberarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-minnie-mickey-watercolor.webp", alt: "Minnie- und Mickey-Tattoo im Watercolor-Stil am Oberschenkel, gestochen bei SkinLove in Marchtrenk" },
      { src: "/images/leistungen/tattoo-arielle-meerjungfrau-farbe.webp", alt: "Buntes Arielle-Tattoo am Oberschenkel von SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-stitch-ohana-watercolor.webp", alt: "Stitch-und-Angel-Tattoo mit Ohana-Schriftzug im Watercolor-Stil, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-drache-ohnezahn-watercolor.webp", alt: "Ohnezahn-Drachen-Tattoo im Watercolor-Stil an der Wade, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-fuchs-mond-watercolor.webp", alt: "Fuchs-Tattoo mit Mond im Watercolor-Stil am Unterarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-schmetterling-blueten-farbe.webp", alt: "Farbiges Schmetterling-Tattoo mit Blueten am Unterarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-hakuna-matata-watercolor.webp", alt: "Hakuna-Matata-Tattoo im Watercolor-Stil am Oberarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-fuchs-blumen-oberarm.webp", alt: "Grosses Fuchs-Tattoo mit Blumen und Schmetterlingen am Oberarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-stitch-angel-partner.webp", alt: "Stitch-und-Angel-Partnertattoos an beiden Waden im Watercolor-Stil, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-rose-fine-line-wade.webp", alt: "Fine-Line-Rose mit Mond an der Wade samt Zeichenvorlage, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-schlange-pfingstrose.webp", alt: "Schlange mit Pfingstrose in Black and Grey am Oberschenkel, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-rabe-buecher-blackwork.webp", alt: "Rabe auf Buechern in Black and Grey am Oberschenkel samt Vorlage, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-schildkroete-fine-line.webp", alt: "Fine-Line-Schildkroete am Unterarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-schmetterling-blueten-sw.webp", alt: "Schmetterling mit Blueten in Black and Grey am Unterarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-buecher-tasse-fine-line.webp", alt: "Fine-Line-Tattoo mit Buecherstapel und Teetasse am Oberarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-katze-sketch-stil.webp", alt: "Katzen-Tattoo im Sketch-Stil am Unterarm, SkinLove Marchtrenk" },
      { src: "/images/leistungen/tattoo-babyfuss-abdruck-name.webp", alt: "Tattoo eines Babyfuss-Abdrucks mit Namen am Unterarm, SkinLove Marchtrenk" },
    ],
    abschnitte: [
      {
        h: "Deine Tätowiererin für Wels, Linz und Oberösterreich",
        text: [
          "Bei SkinLove tätowiert die Inhaberin Eve Paule selbst, dazu kommen regelmäßig Gasttätowierer mit eigenen Stilen. Das Tattoostudio liegt im Marktcenter in Marchtrenk: Aus Wels bist du in rund zehn Minuten da, aus Linz in 20 bis 25 Minuten. Ohne Auto kommst du mit der Buslinie 600 oder der Westbahn bis Marchtrenk.",
          "Tätowiert wird nach vorheriger Absprache. So bleibt für dein Motiv genug Zeit – für die Beratung genauso wie für den Termin selbst.",
        ],
      },
      {
        h: "Stile: von Fineline bis Watercolor",
        text: [
          "Fineline-Tattoos und filigrane Motive, Mini-Tattoos und Finger-Tattoos – Letztere bieten nur wenige Studios an. Dazu Black & Grey mit weichen Schattierungen, Mandala und Ornamente sowie farbige Watercolor-Tattoos mit Aquarell-Effekt.",
          "Die Bilder oben sind Arbeiten aus dem Studio: von der kleinen Fine-Line-Schildkröte bis zum großen Fuchs am Oberarm.",
        ],
      },
      {
        h: "Vom Wunschmotiv zum fertigen Tattoo",
        text: [
          "Bring Fotos, Skizzen oder einfach eine Idee mit. Im kostenlosen Beratungsgespräch klären wir Motiv, Größe, Körperstelle und Preis, danach zeichne ich dein Motiv. Gestochen wird erst, wenn die Vorlage für dich stimmt.",
          "Nach dem Termin bekommst du eine Pflegeanleitung mit, Prontolind Spray und Gel gibt es direkt im Studio. Verliert ein frisches Tattoo in den ersten 14 Tagen übermäßig Farbe, steche ich kostenlos nach.",
        ],
      },
      {
        h: "Cover-Up, Auffrischung und Narbenüberdeckung",
        text: [
          "Ein altes Tattoo, das dir nicht mehr gefällt, lässt sich oft mit einem neuen Motiv überdecken. Bei kleineren Motiven klären wir im kostenlosen Beratungsgespräch, was möglich ist.",
          "Verblasste Tattoos frische ich auf – egal, in welchem Studio sie gestochen wurden. Und kleinere Narben lassen sich mit einem passenden Motiv kunstvoll kaschieren.",
        ],
      },
    ],
    stimmen: bewertungenVon(["Julia Reifinger", "Leonie Weber", "Chiara Fuchs", "Doris Lehner", "Sarah Kost"]),
    faq: [
      { q: "Wie viel kostet ein Tattoo?", a: "Der Preis hängt von Größe, Motiv und Aufwand ab. Meld dich bei mir für ein kostenloses Beratungsgespräch!" },
      { q: "Tut es sehr weh?", a: "Die Schmerzempfindung ist individuell. Die meisten Stellen sind gut auszuhalten — ich geh auf dein Tempo ein." },
      { q: "Wie pflege ich mein neues Tattoo?", a: "Du bekommst nach dem Stechen eine genaue Pflegeanleitung. Prontolind Spray & Gel gibt's direkt im Studio." },
      { q: "Wie lange dauert ein Tattoo-Termin?", a: "Je nach Größe und Komplexität: Mini-Tattoos ca. 30-60 Min, größere Motive können mehrere Stunden dauern. Pausen sind jederzeit möglich." },
      { q: "Kann ich mein eigenes Motiv mitbringen?", a: "Auf jeden Fall! Bring Vorlagen, Fotos oder Skizzen mit — wir besprechen alles persönlich und ich zeichne dein Wunschmotiv." },
      { q: "Was muss ich vor dem Termin beachten?", a: "Kein Alkohol 24h vorher, ausgeschlafen kommen, gut gegessen haben. Keine blutverdünnenden Medikamente. Bequeme Kleidung anziehen." },
      { q: "Ist Nachstechen wirklich kostenlos?", a: "Ja! Innerhalb von 14 Tagen nach dem Stechen ist Nachstechen bei übermäßigem Farbverlust kostenlos." },
      { q: "Ab welchem Alter darf ich mich tätowieren lassen?", a: "Ab 16 Jahren mit schriftlicher Einverständniserklärung deiner Erziehungsberechtigten, ab 18 Jahren ohne. Unter 16 ist Tätowieren in Österreich verboten." },
      { q: "Wie weit ist das Tattoostudio von Wels und Linz entfernt?", a: "SkinLove liegt in Marchtrenk, Linzer Straße 35 im Marktcenter (1. Stock). Aus Wels sind es rund zehn Minuten, aus Linz 20 bis 25 Minuten mit dem Auto. Mit Bus 600 oder der Westbahn kommst du auch ohne Auto her." },
    ],
  },
  piercings: {
    title: "Piercings",
    metaTitle: "Piercingstudio bei Wels & Linz | Piercer in Marchtrenk",
    description: "Dein Piercer für Wels & Linz: Ohr, Nase, Septum, Helix, Tragus, Daith, Bauchnabel, Zunge, Lippe und Intim – Erstschmuck und Kontrolltermin inklusive.",
    h1: "Piercingstudio in Marchtrenk – zwischen Wels und Linz",
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
    abschnitte: [
      {
        h: "Dein Piercer für Wels, Linz und ganz Oberösterreich",
        text: [
          "Bei SkinLove sticht Eve Paule jedes Piercing selbst. Das Piercingstudio liegt im Marktcenter in Marchtrenk: Aus Wels bist du in rund zehn Minuten da, aus Linz in 20 bis 25 Minuten. Ohne Auto kommst du mit der Buslinie 600 oder der Westbahn bis Marchtrenk.",
          "Gestochen wird nach vorheriger Absprache. So bleibt genug Zeit, gemeinsam die richtige Stelle, die passende Schmuckgröße und den Ablauf zu besprechen.",
        ],
      },
      {
        h: "Welche Piercings ich steche",
        text: [
          "Ohr: Ohrläppchen (Lobe), Helix und Forward Helix, Tragus und Anti-Tragus, Conch, Rook, Flat, Snug, Industrial und Daith – das Daith kennen viele als Migräne-Piercing.",
          "Nase und Gesicht: Nasenflügel (Nostril), Septum, Bridge und Nasallang, dazu Augenbraue, Anti-Eyebrow und Oberflächenpiercings an Nacken, Brustbein oder Fingern.",
          "Mund und Lippe: Zunge, Snake Eyes, Zungen- und Lippenbändchen, Labret, Madonna, Medusa, Ashley sowie Snake, Angel und Shark Bites. Außerdem Bauchnabel (auch doppelt oder als Stern), Brustwarze und Intimpiercings für Damen und Herren.",
          "Dein Wunsch-Piercing ist nicht dabei? Ruf einfach an – die Liste ist nicht vollständig.",
        ],
      },
      {
        h: "So läuft dein Piercing-Termin ab",
        text: [
          "Zuerst schauen wir uns die Stelle gemeinsam an und klären, ob sie für dein Wunsch-Piercing passt. Dann wird desinfiziert, die Position angezeichnet – und gestochen wird erst, wenn sie dir im Spiegel gefällt.",
          "Der Erstschmuck aus Titan oder Chirurgenstahl ist im Preis enthalten, ebenso ein Kontrolltermin. Ohrläppchen gibt es ab 42 €, alle Preise stehen in der Preisliste auf der Startseite.",
        ],
      },
      {
        h: "Pflege und Heilung",
        text: [
          "Du bekommst nach dem Stechen eine Pflegeanleitung mit. Ohrläppchen heilen meist in rund vier Wochen, Knorpel und Bauchnabel brauchen deutlich länger – beim Bauchnabel kann es bis zu zwölf Monate dauern.",
          "Prontolind Spray und Gel gibt es direkt im Studio. Und wenn doch einmal etwas nicht passt – Wildfleisch, ein schief sitzendes Piercing aus einem anderen Studio oder zu langer Schmuck –, komm vorbei: Dafür gibt es meine Spezialleistungen.",
        ],
      },
    ],
    stimmen: bewertungenVon(["Martina R.", "Dixy Dixy", "Dizdarevic Samra", "Anika Neuschitzer", "lala _land"]),
    faq: [
      { q: "Ab welchem Alter kann ich mir ein Piercing stechen lassen?", a: "Ab 14 Jahren mit schriftlicher Einverständniserklärung deiner Erziehungsberechtigten, ab 18 Jahren ohne – so schreibt es die österreichische Verordnung für Piercen und Tätowieren vor. Unter 18 bitte eine erziehungsberechtigte Person zum Termin mitbringen." },
      { q: "Wie lange dauert die Heilung?", a: "Je nach Stelle 4 Wochen (Ohrläppchen) bis 12 Monate (Bauchnabel). Du bekommst eine genaue Pflegeanleitung." },
      { q: "Ist der Schmuck im Preis inbegriffen?", a: "Ja! Bei jedem Piercing ist der passende Erstschmuck inklusive, plus ein kostenloser Kontrolltermin." },
      { q: "Welches Material wird verwendet?", a: "Wir arbeiten mit Titan und chirurgischem Stahl — hypoallergen und bestens verträglich." },
      { q: "Kann ich Sport machen nach dem Piercing?", a: "Leichte Bewegung ist okay, aber Schwimmbad, Sauna und starkes Schwitzen solltest du in den ersten Wochen vermeiden." },
      { q: "Was mache ich bei Problemen nach dem Stechen?", a: "Komm einfach vorbei! Kontrolltermine sind kostenlos. Bei Wildfleisch oder Entzündungen helfen wir sofort." },
      { q: "Hilft ein Daith-Piercing gegen Migräne?", a: "Das Daith wird oft Migräne-Piercing genannt. Eine Wirkung gegen Migräne ist wissenschaftlich aber nicht belegt – lass es dir stechen, weil es dir gefällt." },
      { q: "Wie weit ist das Piercingstudio von Wels und Linz entfernt?", a: "SkinLove liegt in Marchtrenk, Linzer Straße 35 im Marktcenter (1. Stock). Aus Wels sind es rund zehn Minuten, aus Linz 20 bis 25 Minuten mit dem Auto. Mit Bus 600 oder der Westbahn kommst du auch ohne Auto her." },
    ],
  },
  "permanent-make-up": {
    title: "Permanent Make-up",
    metaTitle: "Permanent Make-up bei Wels & Linz | Brauen & Lippen",
    description: "Permanent Make-up für Wels, Linz und Umgebung: natürlich pigmentierte Augenbrauen und dezent betonte Lippen – individuell beraten und gestochen von Eve Paule.",
    h1: "Permanent Make-up in Marchtrenk – Augenbrauen und Lippen",
    hero: "Natürliche Schönheit. Dauerhaft betont.",
    details: [
      "Augenbrauen — natürlich gezeichnet, typgerecht angepasst",
      "Lippen — dezente Schattierung für mehr Ausdruck",
      "Langanhaltend — erleichtert den Alltag, kein tägliches Nachziehen",
      "Präzise Arbeit mit modernstem Equipment",
      "Individuelle Beratung vor jeder Behandlung",
      "Auffrischung nach 4-6 Wochen empfohlen",
    ],
    abschnitte: [
      {
        h: "Augenbrauen-Pigmentierung: natürlich statt aufgemalt",
        text: [
          "Beim Permanent Make-up der Augenbrauen werden feine Farbpigmente in die obere Hautschicht gebracht. Form und Farbe passe ich an dein Gesicht und deine eigenen Härchen an – damit das Ergebnis nach dir aussieht und nicht nach Schminke.",
          "Besonders praktisch ist das bei hellen oder lückigen Brauen, wenn du morgens wenig Zeit hast oder beim Sport und im Sommer nichts verwischen soll: Das tägliche Nachziehen fällt weg.",
        ],
      },
      {
        h: "Lippen dezent betonen",
        text: [
          "Bei den Lippen geht es um eine sanfte Schattierung, die Kontur und Farbe betont. Wie kräftig das Ergebnis werden soll, besprechen wir vorher genau – lieber dezent und bei Bedarf nachlegen.",
        ],
      },
      {
        h: "Ablauf und Haltbarkeit",
        text: [
          "Vor jeder Behandlung steht eine ausführliche Beratung. Dann wird die Form vorgezeichnet, und gestochen wird erst, wenn sie dir gefällt. In den ersten Tagen wirkt die Farbe kräftiger, nach ein bis zwei Wochen zeigt sich das endgültige Ergebnis.",
          "Nach vier bis sechs Wochen empfehle ich eine Auffrischung. Je nach Hauttyp und Pflege hält Permanent Make-up meist ein bis drei Jahre. " + ANFAHRT,
        ],
      },
    ],
    faq: [
      { q: "Wie lange hält Permanent Make-up?", a: "In der Regel 1-3 Jahre, je nach Hauttyp und Pflege. Auffrischungen sind möglich." },
      { q: "Ist es schmerzhaft?", a: "Eine Betäubungscreme wird aufgetragen. Die meisten empfinden nur ein leichtes Kratzen." },
      { q: "Wie sieht es direkt nach der Behandlung aus?", a: "In den ersten Tagen ist die Farbe intensiver. Nach 1-2 Wochen heilt es ab und die endgültige Farbe zeigt sich." },
      { q: "Kann ich Permanent Make-up entfernen lassen?", a: "Es verblasst natürlich über die Jahre. Für eine vorzeitige Entfernung gibt es spezielle Verfahren — sprich mich an." },
      { q: "Ab welchem Alter ist Permanent Make-up möglich?", a: "Permanent Make-up zählt rechtlich als Tätowieren: ab 16 Jahren mit schriftlicher Einverständniserklärung der Erziehungsberechtigten, ab 18 Jahren ohne." },
      { q: "Wer ist für Permanent Make-up geeignet?", a: "Fast jeder! Bei Schwangerschaft, Stillzeit, Blutverdünnern oder bestimmten Hauterkrankungen bitte vorher abklären." },
    ],
  },
  "lash-brow-lifting": {
    title: "Lash & Brow Lifting",
    metaTitle: "Wimpernlifting & Brow Lifting bei Wels & Linz",
    description: "Wimpernlifting und Brow Lifting für Wels, Linz und Umgebung: Naturwimpern sanft geformt, Brauen in Form gebracht – jeweils mit Färben und Keratin-Pflege.",
    h1: "Wimpernlifting & Brow Lifting in Marchtrenk",
    hero: "Dein Blick. Dein Statement.",
    details: [
      "Lash Lifting inkl. Färben & Keratin-Pflege",
      "Brow Lifting inkl. Färben & Keratin-Pflege",
      "Kombi Lash & Brow inkl. Zupfen — das volle Programm",
      "Hält 6-9 Wochen",
      "Sanfte Behandlung, kein Kleber, keine Extensions",
      "Natürlicher WOW-Effekt vom ersten Tag an",
    ],
    abschnitte: [
      {
        h: "Wimpernlifting: mehr Schwung für deine eigenen Wimpern",
        text: [
          "Beim Lash Lifting werden deine Naturwimpern sanft nach oben geformt, gefärbt und mit Keratin gepflegt. Ohne Kleber und ohne Extensions wirken sie länger und voller – sechs bis neun Wochen lang.",
        ],
      },
      {
        h: "Brow Lifting: volle, gepflegte Augenbrauen",
        text: [
          "Beim Brow Lifting werden die Härchen in Form gebracht, sodass die Brauen dichter und gepflegter wirken. Färben und Keratin sind auch hier dabei. Als Kombi gibt es beides zusammen, inklusive Zupfen.",
        ],
      },
      {
        h: "Dauer und Preise",
        text: [
          "Lash Lifting dauert etwa 45 bis 60 Minuten, Brow Lifting rund 30 Minuten, die Kombi 75 bis 90 Minuten. Die Preise stehen in der Preisliste auf der Startseite unter „Lash & Brow“. " + ANFAHRT,
        ],
      },
    ],
    faq: [
      { q: "Wie oft sollte ich das wiederholen?", a: "Alle 6-9 Wochen für dauerhaft schöne Wimpern & Brauen." },
      { q: "Kann ich danach Mascara benutzen?", a: "Ja, nach 24 Stunden. Aber die meisten brauchen keine mehr! 😉" },
      { q: "Ist Lash Lifting schädlich für die Wimpern?", a: "Nein! Durch die Keratin-Pflege werden die Wimpern sogar gestärkt. Kein Kleber, keine Extensions." },
      { q: "Wie lange dauert die Behandlung?", a: "Lash Lifting ca. 45-60 Min, Brow Lifting ca. 30 Min. Kombi ca. 75-90 Min." },
      { q: "Darf ich danach Kontaktlinsen tragen?", a: "Ja, nach ca. 2 Stunden. Am besten mit Brille zum Termin kommen." },
    ],
  },
  kinderohrringe: {
    title: "Kinderohrringe",
    metaTitle: "Ohrlöcher stechen für Kinder bei Wels & Linz | Studex",
    description: "Ohrringe stechen für Kinder mit dem Studex-System: steril verpackte Erststecker, Ruhe statt Hektik, Pflegetipps – in Marchtrenk zwischen Wels und Linz.",
    h1: "Ohrlöcher stechen für Kinder – mit Studex, zwischen Wels und Linz",
    hero: "Sanft & sicher. Für die Kleinsten.",
    details: [
      "Studex-System — steril verpackte Erststecker in Einweg-Kartuschen",
      "Ab 6 Monaten möglich",
      "Ab 8 Jahren auch andere Ohrringe mit Nadel möglich",
      "Verschiedene süße Motiv-Designs verfügbar",
      "Entspannte Atmosphäre für Kinder und Eltern",
      "Inkl. Pflegehinweise für die Eltern",
    ],
    abschnitte: [
      {
        h: "Ohrringe stechen mit Ruhe und Zeit",
        text: [
          "Das erste Ohrloch ist für Kinder ein großer Moment – und für Eltern oft aufregender als für die Kleinen. Deshalb gibt es Ohrringe stechen bei SkinLove nur mit Termin: So hat dein Kind Zeit, anzukommen, sich umzuschauen und die Ohrstecker in Ruhe auszusuchen.",
          "Wie das bei anderen Familien war, steht weiter unten in ihren Google-Bewertungen – vom sieben Monate alten Baby bis zum Kindergartenkind.",
        ],
      },
      {
        h: "Studex: steril verpackte Erststecker",
        text: [
          "Gestochen wird mit dem Studex-System. Die Erststecker kommen steril verpackt in einer Einweg-Kartusche und werden direkt aus der Verpackung gesetzt, ohne dass sie jemand mit der Hand berührt.",
          "Die Ohrstecker sind aus Chirurgenstahl oder Titan und in verschiedenen Motiv-Designs erhältlich – dein Kind darf sich sein Lieblingspaar aussuchen.",
        ],
      },
      {
        h: "So läuft das Ohrlochstechen ab",
        text: [
          "Zuerst sucht ihr gemeinsam die Ohrstecker aus. Dann werden die Ohrläppchen desinfiziert und die Stellen markiert – du schaust als Elternteil mit, ob beide Punkte gleich sitzen. Gestochen wird erst, wenn alles passt.",
          "Beide Ohren werden gleichzeitig gestochen, so ist es für dein Kind in einem Moment vorbei. Danach bekommst du eine Pflegeanleitung mit nach Hause.",
        ],
      },
      {
        h: "Pflege nach dem Stechen",
        text: [
          "Die Erststecker bleiben mindestens sechs Wochen drin und werden in dieser Zeit nicht herausgenommen. Ab dem Tag nach dem Stechen reinigst du die Ohrläppchen zweimal täglich vorne und hinten – Prontolind gibt es direkt im Studio.",
          "Haarspray, Shampoo und Seife möglichst von den frischen Ohrlöchern fernhalten, und solange sie heilen, lieber nicht schwimmen gehen. Auch nach den sechs Wochen trägt dein Kind am besten noch einige Monate Stecker statt Creolen, bis die Ohrlöcher ganz stabil sind.",
        ],
      },
      {
        h: "Aus Wels, Linz und Umgebung",
        text: [
          "Das Studio liegt im Marktcenter in Marchtrenk, Linzer Straße 35 im 1. Stock. Aus Wels, Traun oder Hörsching bist du in rund zehn Minuten da, aus Leonding in einer Viertelstunde und aus Linz in 20 bis 25 Minuten.",
        ],
      },
    ],
    stimmen: bewertungenVon(["Natasa Savic", "Kerstin", "T. N."]),
    faq: [
      { q: "Ab welchem Alter kann man Ohrlöcher stechen lassen?", a: "Bei SkinLove ab 6 Monaten. Ab 8 Jahren sind auch andere Ohrringe mit der Nadel möglich." },
      { q: "Tut Ohrlochstechen weh?", a: "Es ist ein kurzer Moment. Weil beide Ohren gleichzeitig gestochen werden, ist er auch gleich wieder vorbei – und dann wird erst einmal in den Spiegel geschaut." },
      { q: "Welchen Schmuck verwenden Sie?", a: "Hypoallergene Studex-Ohrstecker aus chirurgischem Stahl oder Titan, in verschiedenen Motiv-Designs." },
      { q: "Wie lange müssen die Erststecker drin bleiben?", a: "Mindestens sechs Wochen, ohne sie herauszunehmen. Danach am besten noch einige Monate Stecker statt Creolen tragen." },
      { q: "Wie pflege ich die Ohrlöcher meines Kindes?", a: "Ab dem Tag nach dem Stechen zweimal täglich vorne und hinten mit Prontolind reinigen und den Stecker dabei leicht vor und zurück bewegen. Haarspray, Shampoo und Seife fernhalten." },
      { q: "Darf mein Kind mit frischen Ohrlöchern schwimmen?", a: "Solange die Ohrlöcher heilen, besser nicht – im Schwimmbad oder See kommen leicht Keime an die frische Stelle." },
      { q: "Werden beide Ohren gleichzeitig gestochen?", a: "Ja, bei uns werden immer beide Ohren gleichzeitig gestochen — schnell und stressfrei für dein Kind." },
      { q: "Muss ein Elternteil dabei sein?", a: "Ja, ein Elternteil oder eine andere erziehungsberechtigte Person ist beim Termin dabei und gibt die Einwilligung." },
      { q: "Muss ich einen Termin vereinbaren?", a: "Ja, damit wir genug Zeit und Ruhe für dein Kind haben. Einfach kurz melden!" },
    ],
  },
  spezialleistungen: {
    title: "Spezialleistungen",
    metaTitle: "Wildfleisch & Piercing-Korrektur bei Wels & Linz",
    description: "Hilfe rund ums Piercing für Wels, Linz und Umgebung: Wildfleischbehandlung, Dermal-Anker-Entfernung, Korrekturen von Fehlstichen, Schmuckwechsel und Dehnen.",
    h1: "Wildfleisch, Korrekturen und Dermal Anker – Hilfe rund ums Piercing",
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
    abschnitte: [
      {
        h: "Wildfleisch am Piercing",
        text: [
          "Wildfleisch ist überschüssiges Gewebe, das sich rund um ein frisches Piercing bilden kann – oft durch Reibung, Druck oder unpassenden Schmuck. Ich behandle es mit Spezialmaterial und schaue mir an, ob Schmuck oder Pflege geändert werden sollten. Das gilt auch für Piercings aus anderen Studios.",
        ],
      },
      {
        h: "Korrekturen, Schmuckwechsel und Dehnen",
        text: [
          "Sitzt ein Piercing aus einem anderen Studio schief oder ist der Stecker nach dem Abheilen zu lang, helfe ich weiter: Piercing-Korrekturen bei Fehlstichen, Stecker kürzen, Fremdschmuck wechseln und Dehnen bis 4 mm.",
        ],
      },
      {
        h: "Dermal Anker entfernen",
        text: [
          "Dermal Anker entferne ich fachgerecht und mit möglichst geringem Narbenrisiko. " + ANFAHRT,
        ],
      },
    ],
    faq: [
      { q: "Was ist Wildfleisch und wie wird es behandelt?", a: "Wildfleisch (Granulationsgewebe) entsteht manchmal bei Piercings. Wir behandeln es professionell — meld dich einfach bei uns." },
      { q: "Kann ich auch Schmuck von anderen Studios wechseln lassen?", a: "Ja klar! Komm einfach vorbei — Fremdschmuck wechseln ist kein Problem." },
      { q: "Kostet die Erstberatung etwas?", a: "Nein, Beratung und Erstgespräch sind bei uns immer kostenlos!" },
      { q: "Kann ich Piercings aus anderen Studios korrigieren lassen?", a: "Ja! Wir korrigieren Fehlstiche und beraten dich ehrlich, was möglich ist." },
      { q: "Wo bekomme ich Pflegeprodukte?", a: "Prontolind Spray & Gel gibt's direkt bei uns im Studio — die beste Pflege für Piercings und Tattoos." },
    ],
  },
};

export const slugs = Object.keys(serviceData);
