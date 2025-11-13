// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickyQR from "./components/StickyQR";
import Navbar from "@/app/components/Navbar";      // ✅ add
import Footer from "@/app/components/Footer";      // ✅ add

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe Rupeez",
  description: "Invest smart with Safe Rupeez",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full w-full overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full overflow-x-hidden overscroll-x-none`}>
        {/* ✅ Navbar rendered exactly once here */}
        <Navbar />

        {/* Prevent any child from causing sideways scroll */}
        <main className="min-h-screen w-full max-w-full overflow-x-hidden overscroll-x-none [touch-action:pan-y]">
          {children}
        </main>
        <StickyQR />

        {/* ✅ Footer rendered exactly once here */}
        <Footer />
      </body>
    </html>
  );
}
