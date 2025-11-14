"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function LyceumNavbar() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          {/* Shield logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-md">
            <Shield className="h-5 w-5 text-white" />
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

        {/* Right: Modules link */}
        <nav className="flex items-center">
         
<Button
  asChild
  className="bg-black text-white px-6 py-2 rounded-full font-semibold
             text-lg md:text-xl
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
