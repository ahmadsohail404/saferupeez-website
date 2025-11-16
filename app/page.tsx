// app/page.tsx

import Hero from "@/app/components/Hero";
import Stepper from "./components/Stepper";
import Banks from "./components/Banks";
import FAQ from "./components/Faq";
import FlexibleSavingPartner from "./components/FlexibleSavingsPartner";
// import ReviewsSection from "./components/Reviews";
export default function Home() {
  return (
    <div>
      <Hero />
      <Banks />
      <Stepper />
      <FlexibleSavingPartner />
      {/* <ReviewsSection /> */}
      <FAQ />
    </div>
  );
}
