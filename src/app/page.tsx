import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Info from "@/components/Info";
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
        <Reviews />
        <Info />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
