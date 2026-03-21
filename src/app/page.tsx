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

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Gallery />
        <Workshop />
        <Info />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
