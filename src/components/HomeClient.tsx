"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Info from "@/components/Info";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Gallery = dynamic(() => import("@/components/Gallery"));
const Workshop = dynamic(() => import("@/components/Workshop"));
const Reviews = dynamic(() => import("@/components/Reviews"));

export default function HomeClient() {
  const [bookingOpen, setBookingOpen] = useState(false);
  // Leistung, die im Anfrage-Popup schon ausgewählt ist (aus einer Leistungskarte)
  const [bookingService, setBookingService] = useState<string | undefined>();
  const openBooking = (service?: string) => {
    setBookingService(service);
    setBookingOpen(true);
  };
  const [deferredSectionsReady, setDeferredSectionsReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.01 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    setTimeout(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible")), 500);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDeferredSectionsReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation onBook={() => openBooking()} />
      <Hero onBook={() => openBooking()} />
      <About />
      <Services onBook={openBooking} />
      <Pricing />
      {deferredSectionsReady ? <Gallery /> : null}
      {deferredSectionsReady ? <Workshop /> : null}
      <Info />
      {deferredSectionsReady ? <Reviews /> : null}
      <Contact bookingOpen={bookingOpen} bookingService={bookingService} onOpen={() => openBooking()} onClose={() => setBookingOpen(false)} />
      <Footer />
    </>
  );
}
