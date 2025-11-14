// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteAwareLayout from "./components/RouteAwareLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full w-full overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full overflow-x-hidden overscroll-x-none`}
      >
        <RouteAwareLayout>{children}</RouteAwareLayout>
      </body>
    </html>
  );
}
