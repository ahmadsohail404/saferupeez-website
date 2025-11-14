// app/lyceum/components/Hero.tsx
"use client";

import { BookOpen, ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-purple-50/40 py-8 sm:py-12 md:py-20 lg:py-28 flex items-center">
      {/* Background gradients */}
      <div className="absolute top-10 right-4 sm:right-8 md:right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-300/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" />
      <div className="absolute bottom-10 left-4 sm:left-8 md:left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-amber-300/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
        {/* ---------- Left Section ---------- */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-center lg:text-left animate-fade-in-up">
          {/* Tagline with glow */}
          <div className="relative inline-flex items-center justify-center lg:justify-start">
            <span className="text-xs sm:text-sm md:text-[12px] font-medium uppercase tracking-wide text-purple-600 bg-white/60 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-purple-200 shadow-sm">
              🚀 Free & open education
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight sm:leading-tight md:leading-tight text-gray-900">
            <span className="absolute -z-10 inset-0 blur-3xl bg-gradient-to-r from-purple-300/30 via-pink-200/30 to-blue-200/30 animate-pulse" />
            Free and open
            <br />
            <span className="text-gray-800 text-[0.8em]">
              stock market and financial education
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed text-gray-600">
            Jyesta Lyceum is an extensive and in-depth collection of stock
            market and financial lessons. It&apos;s completely free, openly
            accessible to everyone, and one of the largest financial education
            resources on the web. No signup, no pay-wall, no ads.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
            {/* Start Learning Button */}
            <button className="flex items-center gap-2 sm:gap-3  bg-black px-6 sm:px-8 h-10 sm:h-12 rounded-xl sm:rounded-2xl backdrop-blur-md border border-purple-300/60 shadow-lg shadow-purple-300/40 transition-all duration-300 transform hover:scale-[1.03]">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-sm sm:text-base font-semibold text-white">
                Start learning free
              </span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </button>

            {/* Watch Demo Button */}
            <button className="flex items-center gap-2 sm:gap-3 bg-white hover:bg-slate-50 px-4 sm:px-6 h-10 sm:h-12 rounded-xl sm:rounded-2xl backdrop-blur-md border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]">
              <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <span className="text-sm sm:text-base font-semibold text-gray-900">
                Watch demo
              </span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm pt-2 sm:pt-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium text-gray-700 text-xs sm:text-sm">
                Free forever
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium text-gray-700 text-xs sm:text-sm">
                No signup required
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium text-gray-700 text-xs sm:text-sm">
                Expert created
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Right Section (SVG Illustration) ---------- */}
        <div className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative w-[260px] sm:w-[320px] md:w-[460px] lg:w-[520px]">
            {/* Soft glow behind card */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-purple-200/60 via-amber-100/60 to-blue-100/60 blur-3xl rounded-[2rem]"
              aria-hidden="true"
            />
            {/* Illustration card */}
            <div className="relative rounded-[1.75rem] bg-white/80 border border-slate-200 shadow-2xl shadow-purple-100/60 p-4 sm:p-6">
              <img
                src="https://img.freepik.com/premium-vector/boy-sitting-table-reading-book_1278800-4559.jpg"
                alt="Illustration of a learner exploring stock market and finance lessons online"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
