import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AdShowcase from "@/components/AdShowcase";
import StatusQuo from "@/components/StatusQuo";
import Solution from "@/components/Solution";
import LandingPages from "@/components/LandingPages";
import Ads from "@/components/Ads";
import Integration from "@/components/Integration";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AdShowcase />
        <StatusQuo />
        <Solution />
        <LandingPages />
        <Ads />
        <Integration />
        <Process />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
