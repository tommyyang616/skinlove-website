import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Info from "@/components/Info";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
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
        <Gallery />
        <Info />
        <Reviews />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
