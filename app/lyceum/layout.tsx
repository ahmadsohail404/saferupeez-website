// app/lyceum/layout.tsx
import type { Metadata } from "next";
import Navbar from "./components/Lyceum-Navbar";
import Footer from "./components/Lyceum-Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Jyesta Lyceum",
  description: "Learn, build, and grow with Jyesta Lyceum.",
};

export default function LyceumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900">
      <Navbar />

      <main className="w-full max-w-full min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  );
}
