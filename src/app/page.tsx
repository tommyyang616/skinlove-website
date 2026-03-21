"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import GuestArtists from "@/components/GuestArtists";
import Workshop from "@/components/Workshop";
import Info from "@/components/Info";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Intersection Observer for .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <About />
        <Services />
        <Pricing />
        <Gallery />
        <GuestArtists />
        <Workshop />
        <Info />
        <Reviews />
        <Contact
          bookingOpen={bookingOpen}
          onOpen={() => setBookingOpen(true)}
          onClose={() => setBookingOpen(false)}
        />
      </main>
      <Footer />
    </>
  );
}
