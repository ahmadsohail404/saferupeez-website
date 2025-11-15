// app/lyceum/components/Lyceum-Footer.tsx
"use client";

export default function LyceumFooter() {
  return (
    <footer className="w-full border-top border-slate-200 bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

        {/* Right: placeholder (add buttons/links/links later if you want) */}
        <div className="flex justify-center md:justify-end" />
      </div>
    </footer>
  );
}
