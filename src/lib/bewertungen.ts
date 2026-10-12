// Die Google-Bewertungen, die auf der Startseite stehen (wörtlich).
// Eine Stelle für Startseite und Leistungsseiten, damit nichts auseinanderläuft.
// i = Initiale, n = Name, d = Alter der Bewertung, t = Text.

export type Bewertung = { i: string; n: string; d: string; t: string };

export const bewertungen: Bewertung[] = [
  { i:"A", n:"Anika Neuschitzer", d:"vor 2 Monaten", t:"Bin sehr happy mit meinem Piercing! Dankeschön! Eve ist eine sehr freundliche und authentische Frau, weiß was sie tut und man fühlt sich mega gut aufgehoben bei ihr!" },
  { i:"J", n:"Julia Reifinger", d:"vor 4 Monaten", t:"Ich war bei Eve und habe mir mein erstes Tattoo stechen lassen. Bin mega zufrieden. Zuerst die Beratung, dann der Termin mit allen Erklärungen, einfach Top. Werde auf jeden Fall wieder kommen." },
  { i:"D", n:"Dizdarevic Samra", d:"vor einem Monat", t:"Ich habe mir heute Morgen mein Piercing stechen lassen und bin total begeistert 🥰 Sie war super freundlich, sehr einfühlsam und alles war extrem sauber und hygienisch." },
  { i:"T", n:"T. N.", d:"vor 5 Monaten", t:"Wir sind sehr zufrieden! Eve hat einen wunderbaren Umgang mit Kindern. Meine Tochter hat ihre ersten Kinderohrringe bekommen, und wir wurden zuvor sehr ausführlich und verständlich beraten." },
  { i:"D", n:"Doris Lehner", d:"vor 4 Monaten", t:"Ich bin total zufrieden! Schon das Gespräch mit Eve vorab war super – sie ist auf all meine Wünsche eingegangen und hat gleichzeitig kreative Ideen eingebracht. Tolle Atmosphäre!" },
  { i:"L", n:"lala _land", d:"vor 3 Monaten", t:"Ich war zum Piercen bei Skinlove und bin wirklich sehr begeistert. Eve ist äußerst erfahren, professionell und erklärt jeden Schritt ganz genau. Man merkt sofort, dass sie genau weiß, was sie tut." },
  { i:"M", n:"Martina R.", d:"vor 4 Monaten", t:"Habe mir von Eve ein Conch-Piercing stechen lassen. Ich bin total begeistert! Sie ist eine absolut sympathische Person und man fühlt sich sofort wohl und gut aufgehoben!" },
  { i:"N", n:"Natasa Savic", d:"vor einem Monat", t:"Haben meiner 7 Monate alten Tochter Ohrringe gestochen, sind sehr zufrieden. Sie ist mega freundlich, man fühlt sich total wohl, es wird einem alles sehr gut erklärt!" },
  { i:"S", n:"Stefan Palmetzhofer", d:"vor 2 Monaten", t:"Danke Eve!!! Es war eine echt angenehme Zeit 😊 super Beratung, super freundlich... wir sehen uns im März!" },
  { i:"D", n:"Dixy Dixy", d:"vor 4 Monaten", t:"Ich habe Nasen-Piercing stechen lassen, und es war gar nicht wie ich es befürchtet habe. Eine sehr leichte Hand, kaum spürbarer Schmerz. Tolle Beratung. Bin extrem zufrieden!" },
  { i:"K", n:"Kerstin", d:"vor 2 Monaten", t:"Meine Tochter (4 Jahre) war bei Skinlove um ihre Ohrringe zu stechen. Meine Maus hat sich sehr wohlgefühlt und erzählt heute noch von der lieben Dame mit den großen Ohrringen 🥰" },
  { i:"L", n:"Leonie Weber", d:"vor einem Monat", t:"Ich habe mich für ein Fine-Line-Tattoo entschieden und bin mehr als zufrieden. Sehr ruhige Hand, saubere Linien und ein perfektes Ergebnis. Beratung, Hygiene und Freundlichkeit waren top!" },
  { i:"C", n:"Chiara Fuchs", d:"vor 2 Monaten", t:"Hab jetzt zwei Tattoos von ihr und bin sehr zufrieden. Sehr schön gestochen, alles hygienisch, sauber und sie selbst ist auch sehr freundlich." },
  { i:"S", n:"Sarah Kost", d:"vor 4 Monaten", t:"Über Social Media auf sie gestoßen – und sofort begeistert! Ich bekam schnell einen Termin, wurde herzlich empfangen und super beraten. Ihre positive Art hat mir direkt die Angst genommen. Einfach toll!" },
];

/** Bewertungen in der angegebenen Reihenfolge; unbekannte Namen fallen weg. */
export function bewertungenVon(namen: string[]): Bewertung[] {
  return namen
    .map((n) => bewertungen.find((b) => b.n === n))
    .filter((b): b is Bewertung => Boolean(b));
}

/** Vorname + Initial des Nachnamens ("Natasa Savic" -> "Natasa S.") -
 *  weniger Personendaten auf der Seite, die Bewertung bleibt zuordenbar. */
export function kurzName(name: string): string {
  const teile = name.trim().split(/\s+/);
  if (teile.length < 2 || teile[1].endsWith(".")) return name;
  return `${teile[0]} ${teile[1][0].toUpperCase()}.`;
}

/** Pflichthinweis nach UWG § 2 Abs. 6b: ob und wie Bewertungen geprüft werden. */
export const BEWERTUNGS_HINWEIS =
  "Auszug aus unseren Google-Bewertungen, wörtlich übernommen. Eine eigene Prüfung, ob sie von Kundinnen und Kunden stammen, findet nicht statt.";
