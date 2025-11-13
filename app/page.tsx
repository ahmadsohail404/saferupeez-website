// app/page.tsx

import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import Stepper from "./components/Stepper";
import Banks from "./components/Banks";
import FAQ from "./components/Faq";
import FlexibleSavingPartner from "./components/FlexibleSavingsPartner";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Banks />
      <Stepper />
      <FlexibleSavingPartner/>
      <FAQ />
      <Footer />
    </div>
  );
}
