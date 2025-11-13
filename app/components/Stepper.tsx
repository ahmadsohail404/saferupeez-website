"use client"; // Required for interactivity in Next.js App Router

import { useState, useEffect } from "react";
import { Wallet, CreditCard, Lock, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Select Your Amount.",
    description: "Choose an amount you want to save.",
    icon: Wallet,
  },
  {
    id: 2,
    title: "Choose Savings Option.",
    description: "Select Daily, Weekly, or Monthly Savings.",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Enjoy Savings in 24K Gold!",
    description: "Share permission & watch your savings grow.",
    icon: Lock,
  },
];

export default function OnboardingStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Auto-progress through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const nextStep = (prev + 1) % steps.length;

        // Mark current step as completed before moving to next
        setCompletedSteps((completed) => {
          if (!completed.includes(prev + 1) && prev + 1 <= steps.length) {
            return [...completed, prev + 1];
          }
          return completed;
        });

        // Reset completed steps when starting over
        if (nextStep === 0) {
          setTimeout(() => setCompletedSteps([]), 500);
        }

        return nextStep;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-slate-600">
            Start your journey to secure savings and gold investment
          </p>
        </div>

        {/* Three Phones in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16 md:mb-20 relative">
          {/* --- Phone 1 --- */}
          <PhoneCard
            stepIndex={0}
            activeStep={activeStep}
            icon={Wallet}
            title="Daily Savings Setup"
            highlight="₹ 30 per day"
            btns={["₹20", "₹30", "₹40"]}
          />

          {/* --- Phone 2 --- */}
          <PhoneCard
            stepIndex={1}
            activeStep={activeStep}
            icon={CreditCard}
            title="Select UPI Payment Method"
            paymentOptions
          />

          {/* --- Phone 3 --- */}
          <PhoneCard
            stepIndex={2}
            activeStep={activeStep}
            icon={Lock}
            title="Gold Is Saved In Jar Locker"
            goldFeatures
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center items-start gap-4 md:gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center gap-4">
                {/* Step Circle */}
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                    backgroundColor: completedSteps.includes(step.id)
                      ? "rgb(34,197,94)" // green for completed
                      : activeStep === index
                      ? "rgb(245,158,11)" // amber-500 for active
                      : "rgb(203,213,225)", // slate-300 for inactive
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg relative"
                >
                  {activeStep === index && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "rgb(251,191,36)" }} // amber-400 pulse
                    />
                  )}
                  {completedSteps.includes(step.id) ? (
                    <Check className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
                  ) : (
                    <span className="text-white text-lg md:text-xl relative z-10">
                      {step.id}
                    </span>
                  )}
                </motion.div>

                {/* Step Text */}
                <motion.div
                  animate={{
                    opacity: activeStep === index ? 1 : 0.6,
                    scale: activeStep === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-[200px]"
                >
                  <h4
                    className={`mb-1 ${
                      activeStep === index ? "text-amber-700" : "text-slate-800"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      activeStep === index ? "text-amber-600" : "text-slate-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block w-24 lg:w-32 h-[2px] mx-6 mt-6 bg-slate-200 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: activeStep > index ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(245,158,11), rgb(252,211,77))", // amber-500 -> amber-300
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Progress Dots */}
        <div className="flex md:hidden justify-center gap-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: activeStep === index ? "24px" : "8px",
                backgroundColor:
                  activeStep === index
                    ? "rgb(245,158,11)" // amber-500
                    : "rgb(203,213,225)", // slate-300
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Subcomponent for Phones ---------------- */
function PhoneCard({
  stepIndex,
  activeStep,
  icon: Icon,
  title,
  highlight,
  btns,
  paymentOptions,
  goldFeatures,
}: {
  stepIndex: number;
  activeStep: number;
  icon: any;
  title: string;
  highlight?: string;
  btns?: string[];
  paymentOptions?: boolean;
  goldFeatures?: boolean;
}) {
  // Smooth bottom fade mask (Jar-like half phone)
  const mask =
    "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.55) 86%, rgba(0,0,0,0.25) 92%, rgba(0,0,0,0) 100%)";

  const isActive = activeStep === stepIndex;

  // Screen background — only this changes to gold when active
  const screenBg = isActive
    ? "bg-gradient-to-b from-amber-200 via-amber-100 to-transparent"
    : "bg-gradient-to-b from-slate-700 via-slate-600 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: stepIndex * 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="relative w-full max-w-[280px] md:max-w-[300px] overflow-visible">
        {/* PHONE SHELL: border stays black always */}
        <motion.div
          animate={{
            scale: isActive ? 1.05 : 1, // subtle focus
          }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[320px] md:h-[360px] rounded-t-[50px] pt-3 px-3 shadow-2xl border-t-4 border-l-4 border-r-4 border-black/90 bg-gradient-to-b from-slate-900 to-slate-900 overflow-hidden"
          style={{
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

          {/* Screen Content (only this background changes) */}
          <div
            className={`relative w-full h-full rounded-t-[40px] overflow-hidden p-6 ${screenBg}`}
          >
            {/* Gold shimmer overlay when active */}
            {isActive && (
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute top-0 left-[-30%] h-full w-[60%] -skew-x-12 opacity-30"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                    animation: "shimmer 2.8s ease-in-out infinite",
                  }}
                />
              </div>
            )}

            {/* Title row */}
            <div className="flex items-center gap-2 mb-4 mt-6">
              <Icon className="w-4 h-4 text-black/85" />
              <p className="text-black/85 text-xs">{title}</p>
            </div>

            {/* --- Unique Inner Content --- */}
            {highlight && btns && (
              <>
                <Card className="bg-white/80 backdrop-blur-sm border-black/10 p-3 mb-3">
                  <p className="text-slate-900 text-center text-sm">
                    {highlight}
                  </p>
                </Card>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {btns.map((btn, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="bg-white/70 border-black/10 text-slate-900 hover:bg-white/90 text-xs h-8 px-2"
                    >
                      {btn}
                    </Button>
                  ))}
                </div>
                <p className="text-center text-amber-700 text-[10px]">
                  POPULAR
                </p>
              </>
            )}

            {paymentOptions && (
              <>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {["PhonePe", "Paytm", "GPay", "Other UPI"].map((p, i) => (
                    <Card
                      key={p}
                      className="bg-white p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:shadow-lg transition-shadow h-16 border-black/10"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                           style={{
                             background:
                               "linear-gradient(135deg, rgb(245,158,11), rgb(252,211,77))" // amber-500 -> amber-300
                           }}>
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-slate-800 text-[10px]">{p}</p>
                    </Card>
                  ))}
                </div>
                <Button className="bg-black hover:bg-black/90 text-white w-full text-xs h-9">
                  Proceed for Payment
                </Button>
                <p className="text-center text-slate-700 text-[10px] mt-2">
                  🔒 100% SECURE
                </p>
              </>
            )}

            {goldFeatures && (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "100% SECURE", value: "LOCKER" },
                  { label: "24 KARAT", value: "GOLD" },
                  { label: "100% PURE", value: "PURITY" },
                ].map((f) => (
                  <Card
                    key={f.label}
                    className="bg-white/80 backdrop-blur-sm border-black/10 p-2 text-center"
                  >
                    <p className="text-amber-700 text-[9px] mb-0.5">
                      {f.label}
                    </p>
                    <p className="text-slate-900 text-[10px]">{f.value}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* CLOUD / MIST LAYERS BELOW THE MASK (so the fade merges into white) */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-[125%] h-16 bg-gradient-radial from-white/70 via-white/90 to-white blur-xl" />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-[140%] h-24 bg-white/90 blur-2xl" />
      </div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          60%,
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </motion.div>
  );
}
