// app/lyceum/components/Lyceum-Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";

export default function LyceumNavbar() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      {/* 
        container + px controls how much space you have 
        from the left and right edges. 
        Increase/decrease lg:px-12 as you like.
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex h-16 sm:h-20 items-center">
        {/* Left: Logo + Brand */}
        <Link href="/lyceum" className="flex items-center gap-3">
          {/* Your custom logo */}
          <div className="relative h-9 w-9 sm:h-18 sm:w-18">
            {/* 
              Put your actual logo file in /public/assets/lyceum-logo.png (or .svg) 
              and update the src below if needed 
            */}
            <Image
              src="/assets/pp.png"
              alt="SafeRupeez Lyceum"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Text block */}
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              saferupeez
            </span>
            <span className="text-sm sm:text-base font-semibold tracking-[0.22em] text-slate-900 uppercase">
              lyceum
            </span>
          </div>
        </Link>

        {/* Right: Modules button pushed fully to the right with ml-auto */}
        <nav className="ml-auto flex items-center">
          <Button
            asChild
            className="bg-black text-white px-6 py-2 rounded-full font-semibold
                       text-sm sm:text-base
                       shadow-md hover:bg-slate-900 hover:shadow-lg
                       transition-all duration-200 flex items-center justify-center"
          >
            <Link href="/lyceum/modules">
              Modules
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

