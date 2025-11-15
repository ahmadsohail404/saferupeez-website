// app/lyceum/layout.tsx
import type { Metadata } from "next";
import Navbar from "./components/Lyceum-Navbar";
import Footer from "./components/Lyceum-Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Jyesta Lyceum",
  description: "Learn, build, and grow with Jyesta Lyceum.",
};

export default function LyceumLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="
        min-h-screen w-full
        overflow-x-hidden overscroll-x-none
        bg-gradient-to-br from-amber-50 via-white to-purple-50/40
        relative
      "
    >
      {/* Global background blobs (behind everything) */}
      <div className="pointer-events-none fixed -top-24 right-[-4rem] w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] bg-purple-300/40 blur-[110px] rounded-full" />
      <div className="pointer-events-none fixed -bottom-24 left-[-4rem] w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] bg-amber-300/40 blur-[110px] rounded-full" />

      {/* Page shell */}
      <div className="relative z-10 flex min-h-screen flex-col text-slate-900">
        {/* Lyceum Navbar */}
        <Navbar />

        {/* Main: all sections stack here, with space between them */}
        <main className="flex-1 w-full flex flex-col space-y-12">
          {children}
        </main>

        {/* Lyceum Footer */}
        <Footer />
      </div>
    </div>
  );
}

