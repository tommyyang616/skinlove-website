"use client";
import { useRef } from "react";

const GoogleSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const GoogleSVG24 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const reviews = [
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

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".review-card") as HTMLElement;
    if (card) trackRef.current.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <span className="section-label reveal">Bewertungen</span>
        <h2 className="section-title reveal">Das sagen meine Kunden</h2>
        <div className="reviews-header reveal">
          <GoogleSVG24 />
          <span>4,6 Sterne · Google Bewertungen</span>
        </div>
        <div className="reviews-stars reveal">★★★★★</div>
        <div className="reviews-track-wrap reveal">
          <div className="reviews-track" ref={trackRef}>
            {reviews.map((r, idx) => (
              <div key={idx} className="review-card">
                <div className="review-top">
                  <div className="review-avatar">{r.i}</div>
                  <div><div className="review-name">{r.n}</div><div className="review-date">{r.d}</div></div>
                </div>
                <div className="review-google"><GoogleSVG /><span className="review-stars">★★★★★</span></div>
                <div className="review-text">{r.t}</div>
              </div>
            ))}
          </div>
          <div className="reviews-nav">
            <button onClick={() => scroll(-1)}>‹</button>
            <button onClick={() => scroll(1)}>›</button>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }} className="reveal">
          <a href="https://www.google.com/search?q=rezensionen+f%C3%BCr+skinlove+tattoo-piercing-permanent+make-up" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: "inline-flex" }}>Alle Bewertungen ansehen</a>
        </div>
      </div>
    </section>
  );
}
