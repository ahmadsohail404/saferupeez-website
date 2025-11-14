// app/lyceum/layout.tsx
import type { Metadata } from "next";
import Navbar from "./components/Lyceum-Navbar";
import Footer from "./components/Lyceum-Footer";

export const metadata: Metadata = {
  title: "Jyesta Lyceum",
  description: "Learn, build, and grow with Jyesta Lyceum.",
};

export default function LyceumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="mx-auto py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
