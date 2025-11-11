// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safe Rupeez",
  description: "Invest smart with Safe Rupeez",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* If you add theme class switching later, you can add suppressHydrationWarning here */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Offset for fixed navbar with h-20 */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}
