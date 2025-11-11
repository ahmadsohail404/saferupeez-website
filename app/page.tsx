// app/page.tsx

import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import Stepper from "./components/Stepper";
import Banks from "./components/Banks";
<<<<<<< Updated upstream
import FlexibleSavingPartner from "./components/FlexibleSavingsPartner";
=======
import FAQ from "./components/Faq";
>>>>>>> Stashed changes
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
<<<<<<< Updated upstream
      <Banks/>
      <Stepper/>
      <FlexibleSavingPartner/>
      <Footer/>    
=======
      <Banks />
      <Stepper />
      <FAQ />
      <Footer />
>>>>>>> Stashed changes
    </div>
  );
}
