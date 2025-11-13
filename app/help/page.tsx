// app/help/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Headset, Handshake, Sparkles } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function HelpLanding() {
  return (
    <main className="relative overflow-clip">
      {/* Background gradients (match your Hero vibe) */}
      <div className="pointer-events-none absolute top-10 right-4 sm:right-8 md:right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-300/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-4 sm:left-8 md:left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-amber-300/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" />

      <section className="relative z-10 bg-gradient-to-br from-amber-50 via-white to-purple-50/40 min-h-[82vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14 md:py-16 lg:py-20">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Contact Us
            </h1>
            <p className="mt-4 text-xs md:text-sm font-semibold tracking-wider text-slate-600 uppercase">
              Get in touch to learn more about our services or to address any queries
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Customer Support */}
            <Card className="relative overflow-hidden h-full border border-white/60 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all rounded-3xl p-8 md:p-10 min-h-[420px] md:min-h-[460px] lg:min-h-[520px]">
              <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
              <div
                className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_40%,#000_60%,transparent)] opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(#0000000f 1px, transparent 1px), linear-gradient(90deg, #0000000f 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 ring-1 ring-amber-200">
                    <Headset className="h-6 w-6 text-amber-700" />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Customer Support</h2>
                </div>

                <p className="mt-5 text-slate-700 text-base md:text-lg leading-relaxed">
                  For SafeRupeez users needing help with transactions, gold savings, or account issues.
                  Our team responds quickly and keeps you updated at every step.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Priority assistance for app-related issues
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button asChild className="h-11 px-5 bg-black hover:bg-black/90 text-white rounded-xl">
                    <Link href="/help/support">
                      Contact Customer Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Link
                    href="mailto:help@saferupeez.in"
                    className="text-sm font-medium text-slate-800 hover:text-slate-950 underline underline-offset-4"
                  >
                    help@saferupeez.in
                  </Link>
                </div>

                <div className="flex-1" />
                {/* <div className="relative mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" /> */}
              </div>
            </Card>

            {/* Partnerships */}
            <Card className="relative overflow-hidden h-full border border-white/60 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all rounded-3xl p-8 md:p-10 min-h-[420px] md:min-h-[460px] lg:min-h-[520px]">
              <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
              <div
                className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_40%,#000_60%,transparent)] opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(#0000000f 1px, transparent 1px), linear-gradient(90deg, #0000000f 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 ring-1 ring-amber-200">
                    <Handshake className="h-6 w-6 text-amber-700" />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Partnerships</h2>
                </div>

                <p className="mt-5 text-slate-700 text-base md:text-lg leading-relaxed">
                  For partnership opportunities, product integrations, guest contributions, or media queries.
                  Let’s build value together for the Indian market that we will take together to heights.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Faster onboarding for verified partners
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {/* 🔥 Switched to solid black background */}
                  <Button
                    asChild
                    className="h-11 px-5 rounded-xl bg-black text-white hover:bg-black/90"
                  >
                    <Link href="mailto:partnerships@saferupeez.in">
                      Mail us at partnerships@saferupeez.in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Link
                    href="mailto:partnerships@saferupeez.in"
                    className="text-sm font-medium text-slate-800 hover:text-slate-950 underline underline-offset-4"
                  >
                    partnerships@saferupeez.in
                  </Link>
                </div>

                <div className="flex-1" />
                {/* <div className="relative mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-500" /> */}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
