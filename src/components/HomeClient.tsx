"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import Workshop from "@/components/Workshop";
import Info from "@/components/Info";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomeClient() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.01 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    setTimeout(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible")), 500);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <Hero onBook={() => setBookingOpen(true)} />
      <About />
      <Services onBook={() => setBookingOpen(true)} />
      <Pricing />
      <Gallery />
      <Workshop />
      <Info />
      <Reviews />
      <Contact bookingOpen={bookingOpen} onOpen={() => setBookingOpen(true)} onClose={() => setBookingOpen(false)} />
      <Footer />
    </>
  );
}
