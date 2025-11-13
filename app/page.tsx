// app/page.tsx

import Hero from "@/app/components/Hero";
import Stepper from "./components/Stepper";
import Banks from "./components/Banks";
import FAQ from "./components/Faq";
import FlexibleSavingPartner from "./components/FlexibleSavingsPartner";
export default function Home() {
  return (
    <div>
      <Hero />
      <Banks />
      <Stepper />
      <FlexibleSavingPartner/>
      <FAQ />
    </div>
  );
}
