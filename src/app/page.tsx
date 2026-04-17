import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AdShowcase from "@/components/AdShowcase";
import StatusQuo from "@/components/StatusQuo";
import LandingPages from "@/components/LandingPages";
import Ads from "@/components/Ads";
import Integration from "@/components/Integration";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatusQuo />
        <LandingPages />
        <Ads />
        <AdShowcase />
        <Integration />
      </main>
      <Footer />
    </>
  );
}
