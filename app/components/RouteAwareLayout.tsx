// app/components/RouteAwareLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyQR from "./StickyQR";

export default function RouteAwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLyceumRoute = pathname?.startsWith("/lyceum");

  // Don't render root layout's Navbar and Footer for lyceum routes
  if (isLyceumRoute) {
    return (
      <>
        <main className="min-h-screen w-full max-w-full overflow-x-hidden overscroll-x-none [touch-action:pan-y]">
          {children}
        </main>
      </>
    );
  }

  // Render everything for non-lyceum routes
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full max-w-full overflow-x-hidden overscroll-x-none [touch-action:pan-y]">
        {children}
      </main>
      <StickyQR />
      <Footer />
    </>
  );
}
