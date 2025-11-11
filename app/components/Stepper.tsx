"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BookUser, Truck, CreditCard } from "lucide-react";
import Iphone15Pro from "@/app/components/ui/Iphone15Pro";

/* ---------- Types ---------- */
type Step = {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  videoSrc: string;
};

type StepperProps = {
  heading?: string;
  steps?: Step[];
  intervalMs?: number;
};

/* ---------- Default 3 Steps ---------- */
const DEFAULT_STEPS: Step[] = [
  {
    id: 1,
    title: "Select Amount",
    subtitle: "Choose how much you want to save.",
    icon: BookUser,
    videoSrc: "https://www.pexels.com/download/video/8369983/",
  },
  {
    id: 2,
    title: "Savings Option",
    subtitle: "Pick Daily, Weekly, or Monthly savings.",
    icon: Truck,
    videoSrc: "https://www.pexels.com/download/video/8369983/",
  },
  {
    id: 3,
    title: "Start Saving",
    subtitle: "We convert your savings into pure 24K gold.",
    icon: CreditCard,
    videoSrc:"https://www.pexels.com/download/video/8369983/",
  },
];

/* ---------- Motion Preference ---------- */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}

/* ---------- Main Stepper Component ---------- */
export default function Stepper({
  heading = "Savings Made Simple in 3 Steps!",
  steps: stepsProp,
  intervalMs = 2500,
}: StepperProps) {
  const steps = useMemo(() => stepsProp ?? DEFAULT_STEPS, [stepsProp]);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  // sequence: highlight first, then let the underline "progress" fill
  const [progressPhase, setProgressPhase] = useState<"highlight" | "fill">("fill");

  useEffect(() => {
    const ms = reduced ? Math.max(3000, intervalMs) : intervalMs;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, ms);
    return () => clearInterval(id);
  }, [intervalMs, steps.length, reduced]);

  // re-trigger the underline fill AFTER highlight switches
  useEffect(() => {
    setProgressPhase("highlight");
    const t = setTimeout(() => setProgressPhase("fill"), 220); // small delay
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/20 to-background py-20">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-10 h-72 w-72 rounded-full bg-[hsl(43_96%_56%_/_0.12)] blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-[hsl(267_92%_70%_/_0.12)] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Watch your gold savings journey unfold beautifully.
          </p>
        </div>

        {/* iPhone 15 Pro Max row */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 md:gap-16">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.id}
                className={`flex flex-col items-center md:w-1/3 text-center transition-transform duration-1000 ${
                  isActive ? "scale-[1.08]" : "scale-100 opacity-80"
                }`}
              >
                <Iphone15Pro
                  className="h-[400px] w-auto"
                  videoSrc={s.videoSrc}
                  autoPlay
                  loop
                  muted
                />
              </div>
            );
          })}
        </div>

        {/* Stepper (icons + titles + per-step underline progress) */}
        <div className="mt-16 flex justify-between items-start w-full max-w-3xl mx-auto relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            const isPast = i < active;

            // Underline width logic:
            // - Past steps: 100%
            // - Active step: 0% during "highlight" phase, then animates to 100% in "fill" phase
            // - Future steps: 0%
            const underlineWidth =
              isPast ? "100%" : isActive ? (progressPhase === "fill" ? "100%" : "0%") : "0%";

            return (
              <div key={s.id} className="flex flex-col items-center text-center w-full relative">
                {/* Connector line (only for completed steps; NOT the current one) */}
                {i < steps.length - 1 && (
                  <div
                    className={`absolute top-4 right-[-50%] h-[2px] transition-colors duration-700 ${
                      isPast
                        ? "bg-gradient-to-r from-[hsl(43_96%_56%)] to-[hsl(43_96%_70%)]"
                        : "bg-muted"
                    }`}
                    style={{ width: "100%" }}
                  />
                )}

                {/* Step Indicator */}
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-full border-2 transition-all duration-300 mb-2 ${
                    isActive
                      ? "border-[hsl(43_96%_56%)] bg-[hsl(43_96%_56%)] text-white shadow-[0_0_10px_hsl(43_96%_56%_/0.6)]"
                      : isPast
                      ? "border-[hsl(43_96%_56%)] text-[hsl(43_96%_56%)]"
                      : "border-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Step Titles */}
                <div className="flex flex-col items-center">
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-[hsl(43_96%_46%)]"
                        : isPast
                        ? "text-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.subtitle}</p>

                  {/* Per-step underline progress (under the text) */}
                  <div className="relative mt-3 h-[6px] w-28 rounded-full bg-muted overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[hsl(43_96%_56%)] to-[hsl(43_96%_68%)] shadow-[0_0_10px_hsl(43_96%_56%_/0.45)] transition-[width,opacity] duration-700 ease-out"
                      style={{ width: underlineWidth, opacity: isPast || isActive ? 1 : 0.25 }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
