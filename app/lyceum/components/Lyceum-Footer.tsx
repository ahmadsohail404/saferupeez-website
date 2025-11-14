"use client";

import { Button } from "@/app/components/ui/button";
import { Apple, PlayCircle } from "lucide-react";

export default function LyceumFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-gradient-to-r from-[#fff7e6] via-white to-[#f5edff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left: Text */}
        <div className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed text-center md:text-left">
          <p className="font-semibold text-slate-900 mb-1">
            Lyceum by SafeRupeez © 2025. All rights reserved.
          </p>
          <p className="mb-1">
            Reproduction of Lyceum materials, text, and images is not permitted.
          </p>
          <p>
            For media queries, contact{" "}
            <a
              href="mailto:press@saferupeez.com"
              className="underline underline-offset-2 text-slate-900"
            >
              press@saferupeez.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
