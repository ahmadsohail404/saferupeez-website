// app/page.tsx

import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Footer/>    
    </div>
  );
}
