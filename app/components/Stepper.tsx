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
    videoSrc: "https://www.pexels.com/download/video/8369983/",
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
  const [progressPhase, setProgressPhase] = useState<"highlight" | "fill">("fill");

  useEffect(() => {
    const ms = reduced ? Math.max(3000, intervalMs) : intervalMs;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, ms);
    return () => clearInterval(id);
  }, [intervalMs, steps.length, reduced]);

  useEffect(() => {
    setProgressPhase("highlight");
    const t = setTimeout(() => setProgressPhase("fill"), 220);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/20 to-background py-36 md:py-40">
      {/* Background Accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-10 h-80 w-80 rounded-full bg-[hsl(43_96%_56%_/_0.15)] blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-96 w-96 rounded-full bg-[hsl(267_92%_70%_/_0.15)] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            {heading}
          </h2>
          <p className="mt-5 text-2xl text-muted-foreground">
            Watch your gold savings journey unfold beautifully.
          </p>
        </div>

        {/* iPhone 15 Pro Max Row */}
        <div className="mt-24 flex flex-col md:flex-row justify-center gap-14 md:gap-20">
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
                  className="h-[440px] w-auto"
                  videoSrc={s.videoSrc}
                  autoPlay
                  loop
                  muted
                />
              </div>
            );
          })}
        </div>

        {/* Stepper (Icons + Titles + Progress) */}
        <div className="mt-24 flex justify-between items-start w-full max-w-3xl mx-auto relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            const isPast = i < active;

            const underlineWidth =
              isPast ? "100%" : isActive ? (progressPhase === "fill" ? "100%" : "0%") : "0%";

            return (
              <div key={s.id} className="flex flex-col items-center text-center w-full relative">
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
                  className={`flex items-center justify-center h-9 w-9 rounded-full border-2 transition-all duration-300 mb-2 ${
                    isActive
                      ? "border-[hsl(43_96%_56%)] bg-[hsl(43_96%_56%)] text-white shadow-[0_0_12px_hsl(43_96%_56%_/0.7)]"
                      : isPast
                      ? "border-[hsl(43_96%_56%)] text-[hsl(43_96%_56%)]"
                      : "border-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>

                {/* Step Titles */}
                <div className="flex flex-col items-center">
                  <p
                    className={`text-base font-semibold transition-colors ${
                      isActive
                        ? "text-[hsl(43_96%_46%)]"
                        : isPast
                        ? "text-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{s.subtitle}</p>

                  {/* Progress Bar */}
                  <div className="relative mt-3 h-[6px] w-32 rounded-full bg-muted overflow-hidden">
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
