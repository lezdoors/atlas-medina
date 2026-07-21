import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Expeditions from "@/components/Expeditions";
import TrustStrip from "@/components/TrustStrip";
import HowItWorks from "@/components/HowItWorks";
import Guides from "@/components/Guides";
import Ethos from "@/components/Ethos";
import Voices from "@/components/Voices";
import Faq from "@/components/Faq";
import Manifesto from "@/components/Manifesto";
import Journal from "@/components/Journal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <TrustStrip />
        <Expeditions />
        <HowItWorks />
        <Ethos />
        <Guides />
        <Manifesto />
        <Voices />
        <Journal />
        <Faq />
        <Footer />
      </main>
    </>
  );
}
