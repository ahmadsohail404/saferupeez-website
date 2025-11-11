"use client";

import {
  CheckCircle2,
  Download,
  ArrowUpRight,
  Star,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { PhoneSimulator } from "./PhoneSimulator";
import UnderlineImg from "../../public/assets/Vector.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-purple-50/40 py-8 sm:py-12 md:py-20 lg:py-28 flex items-center">
      {/* Background gradients */}
      <div className="absolute top-10 right-4 sm:right-8 md:right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-300/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" />
      <div className="absolute bottom-10 left-4 sm:left-8 md:left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-amber-300/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
        {/* ---------- Left Section ---------- */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-center lg:text-left animate-fade-in-up">
          {/* Tagline with glow & pulse */}
          <div className="relative inline-flex items-center justify-center lg:justify-start">
            <span className="text-xs sm:text-sm md:text-[12px] font-medium uppercase tracking-wide text-purple-600 bg-white/60 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-purple-200 shadow-sm">
              ⚡ Instant, Smart & Secure
            </span>
          </div>

          {/* Main Heading with gradient burst + underline image */}
          <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight sm:leading-tight md:leading-tight text-gray-900">
            <span className="absolute -z-10 inset-0 blur-3xl bg-gradient-to-r from-purple-300/30 via-pink-200/30 to-blue-200/30 animate-pulse"></span>
            Pay{" "}
            <span className="relative inline-block">
              fast and smarter
              {/* Underline image */}
              <img
                src={UnderlineImg.src}
                alt="underline"
                className="absolute left-0 bottom-0 w-full max-w-[180px] sm:max-w-[230px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[420px] -z-10 translate-y-[6px] sm:translate-y-[8px] md:translate-y-[10px]"
              />
            </span>
            <br className="hidden sm:block" />
            from anywhere.
          </h1>

          {/* Subtext */}
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            Experience a new era of payments — borderless, encrypted, and
            lightning-fast. Join millions simplifying their payments with one
            tap.
          </p>

          {/* Buttons with glassmorphism + hover glow */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
            {/* App Store */}
            <button className="flex items-center gap-2 sm:gap-3 bg-black/90 hover:bg-black px-4 sm:px-6 h-10 sm:h-12 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 shadow-lg hover:shadow-purple-400/20 transition-all duration-300 transform hover:scale-[1.03]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="App Store"
                className="h-5 w-4 sm:h-7 sm:w-6 invert"
              />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] sm:text-[11px] text-gray-300">
                  Download on the
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  App Store
                </span>
              </div>
            </button>

            {/* Google Play */}
            <button className="flex items-center gap-2 sm:gap-3 bg-black/90 hover:bg-black px-4 sm:px-6 h-10 sm:h-12 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 shadow-lg hover:shadow-green-400/20 transition-all duration-300 transform hover:scale-[1.03]">
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/484/511/original/google-play-store-icon-logo-symbol-free-png.png"
                alt="Google Play"
                className="h-5 w-4 sm:h-7 sm:w-6"
              />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] sm:text-[11px] text-gray-300">
                  Get it on
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Google Play
                </span>
              </div>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm pt-2 sm:pt-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-white/60 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium text-gray-700 text-xs sm:text-sm">
                No Card Required
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-white/60 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium text-gray-700 text-xs sm:text-sm">
                Fast Acceptance
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Right Section ---------- */}
        <div className="relative flex justify-center lg:justify-end md:mr-12 items-center mt-6 sm:mt-8 lg:mt-0 pb-8 sm:pb-12 md:pb-16 lg:pb-0">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 to-amber-200/30 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full" />

          {/* Phone container - Optimized for laptop screens */}
          <div className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] xl:w-[380px]">
            <PhoneSimulator />

            {/* Floating Active Users card - Optimized positioning */}
            <div
              className="absolute z-50 -top-6 -right-8 sm:-top-8 sm:right-[-70px]
      md:-top-4 md:right-[-80px] lg:top-8 lg:right-[-90px] xl:top-16 xl:right-[-100px] 
      bg-white/90 backdrop-blur-lg border border-white/60 
      shadow-xl rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 
      transition-all duration-300 hover:shadow-2xl animate-float-slow
      w-40 sm:w-48 md:w-52 lg:w-56"
            >
              <div className="flex -space-x-1.5 sm:-space-x-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 border-white"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 border-white"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 font-medium leading-none">
                  Active Users
                </p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  120K+
                </p>
              </div>
            </div>

            {/* Floating Payment card - Optimized positioning */}
            <div
              className="absolute -bottom-8 z-50 -left-10 sm:-bottom-10 sm:-left-12
      md:bottom-4 md:left-[-170px] lg:bottom-12 lg:left-[-190px] xl:bottom-[110px] xl:left-[-210px] 
      bg-white/90 backdrop-blur-lg border border-white/60 
      shadow-xl rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 
      transition-all duration-300 hover:shadow-2xl animate-float-medium
      w-48 sm:w-56 md:w-60 lg:w-64"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 font-medium">
                  Payment Received
                </p>
                <span className="bg-green-100 text-green-700 text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  +3.09%
                </span>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                ₹35,890.00
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500">1 Jan 2024</p>
              <div className="flex items-center justify-end gap-1 text-green-600 text-[10px] sm:text-xs mt-1">
                <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span>Growth ↑</span>
              </div>
            </div>

            {/* Verified Transactions (Left) - Optimized positioning */}
            <div
              className="absolute top-[60%] z-50 -translate-y-1/2 -left-16
      sm:top-[35%] sm:-left-20 md:top-[38%] md:left-[-150px] lg:top-[38%] lg:left-[-170px] xl:left-[-180px]
      bg-white/90 backdrop-blur-lg border border-white/60 
      shadow-xl rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 
      transition-all duration-300 hover:shadow-2xl flex items-center gap-2 sm:gap-3 animate-float-fast
      w-44 sm:w-52 md:w-56 lg:w-60"
            >
              <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 font-medium leading-none">
                  Verified Transactions
                </p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  98.4%
                </p>
              </div>
            </div>

            {/* Rewards Earned (Right) - Optimized positioning */}
            <div
              className="absolute top-[45%] z-50 -translate-y-1/2 -right-16
      sm:top-[55%] sm:-right-20 md:top-[50%] md:right-[-140px] lg:top-[50%] lg:right-[-160px] xl:right-[-170px]
      bg-white/90 backdrop-blur-lg border border-white/60 
      shadow-xl rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 
      transition-all duration-300 hover:shadow-2xl flex items-center gap-2 sm:gap-3 animate-float-medium-delayed
      w-44 sm:w-52 md:w-56 lg:w-60"
            >
              <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-full">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 font-medium leading-none">
                  Rewards Earned
                </p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  ₹5,420
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
