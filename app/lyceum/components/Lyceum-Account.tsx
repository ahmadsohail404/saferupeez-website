// app/lyceum/components/SafeRupeezAccountCTA.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function SafeRupeezAccountCTA() {
  return (
    // Removed `border-t border-slate-200` so no line appears between sections
    <section className="w-full ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-100 bg-slate/80 shadow-sm px-4 py-4 sm:px-6 sm:py-5 bg-white/90 backdrop-blur-md">
          {/* Text block */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              Don&apos;t have a SafeRupeez account?
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Modern app for automated savings / Gold & FD options / Smart daily,
              weekly, and monthly plans.
            </p>
          </div>

          {/* CTA button */}
          <div className="flex justify-start sm:justify-end">
            <Button
              asChild
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-slate-900 hover:shadow-lg transition-all"
            >
              {/* TODO: update href to your actual account-opening route */}
              <Link href="/">
                Open an account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
