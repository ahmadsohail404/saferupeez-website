"use client";
import { useState, useEffect } from "react";
import { Wallet, CreditCard, Lock, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
/* ---------------------------------------------------------
   STEP DATA
--------------------------------------------------------- */
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
/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */
export default function OnboardingStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  // Auto rotate steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        setCompletedSteps((done) => {
          if (!done.includes(prev + 1) && prev + 1 <= steps.length) {
            return [...done, prev + 1];
          }
          return done;
        });
        if (next === 0) {
          setTimeout(() => setCompletedSteps([]), 300);
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-auto bg-white flex items-center justify-center p-4 md:p-8 py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-7xl">
        {/* --------------------------- HEADER --------------------------- */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-slate-900">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-slate-600">
            Start your journey to secure savings and gold investment
          </p>
        </div>
        {/* --------------------------- MOBILE VIEW --------------------------- */}
        <div className="flex flex-col md:hidden gap-14">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              <PhoneCard
                stepIndex={i}
                activeStep={activeStep}
                icon={steps[i].icon}
                title={
                  i === 0
                    ? "Daily Savings Setup"
                    : i === 1
                    ? "Select UPI Payment Method"
                    : "Gold Is Saved In Jar Locker"
                }
                highlight={i === 0 ? "₹ 30 per day" : undefined}
                btns={i === 0 ? ["₹20", "₹30", "₹40"] : undefined}
                paymentOptions={i === 1}
                goldFeatures={i === 2}
              />
              {/* ---- mobile step block (NOT removed — restored) ---- */}
              <MobileStepBlock
                index={i}
                activeStep={activeStep}
                completedSteps={completedSteps}
              />
            </div>
          ))}
        </div>
        {/* --------------------------- DESKTOP 3 PHONES --------------------------- */}
        <div className="hidden md:grid grid-cols-3 gap-8 md:gap-6 mb-16 md:mb-20">
          <PhoneCard
            stepIndex={0}
            activeStep={activeStep}
            icon={Wallet}
            title="Daily Savings Setup"
            highlight="₹ 30 per day"
            btns={["₹20", "₹30", "₹40"]}
          />
          <PhoneCard
            stepIndex={1}
            activeStep={activeStep}
            icon={CreditCard}
            title="Select UPI Payment Method"
            paymentOptions
          />
          <PhoneCard
            stepIndex={2}
            activeStep={activeStep}
            icon={Lock}
            title="Gold Is Saved In Jar Locker"
            goldFeatures
          />
        </div>
        {/* --------------------------- DESKTOP STEPPER --------------------------- */}
        <div className="hidden md:flex justify-center items-start gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              {/* STEP CIRCLE */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                    backgroundColor: completedSteps.includes(step.id)
                      ? "rgb(34,197,94)"
                      : activeStep === index
                      ? "rgb(245,158,11)"
                      : "rgb(203,213,225)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative"
                >
                  {completedSteps.includes(step.id) ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <span className="text-xl text-white">{step.id}</span>
                  )}
                </motion.div>
                <div className="text-center max-w-[200px]">
                  <h4
                    className={`font-semibold ${
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
                </div>
              </div>
              {/* CONNECTOR LINE */}
              {index < steps.length - 1 && (
                <div className="w-28 h-[2px] mx-6 mt-6 bg-slate-200 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: activeStep > index ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(245,158,11), rgb(252,211,77))",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* --------------------------- MOBILE DOTS --------------------------- */}
        <div className="flex md:hidden justify-center gap-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: activeStep === index ? "24px" : "8px",
                backgroundColor:
                  activeStep === index ? "rgb(245,158,11)" : "rgb(203,213,225)",
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
/* ---------------------------------------------------------
   MOBILE STEP BLOCK (NOT REMOVED)
--------------------------------------------------------- */
function MobileStepBlock({
  index,
  activeStep,
  completedSteps,
}: {
  index: number;
  activeStep: number;
  completedSteps: number[];
}) {
  const s = steps[index];
  const isActive = activeStep === index;
  const isDone = completedSteps.includes(s.id);
  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center gap-3"
    >
      <motion.div
        animate={{
          backgroundColor: isDone
            ? "rgb(34,197,94)"
            : isActive
            ? "rgb(245,158,11)"
            : "rgb(203,213,225)",
        }}
        className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-md"
      >
        {isDone ? (
          <Check className="w-7 h-7 text-white" />
        ) : (
          <span className="text-white text-xl">{s.id}</span>
        )}
      </motion.div>
      <h4
        className={`text-lg font-semibold ${
          isActive ? "text-amber-700" : "text-slate-800"
        }`}
      >
        {s.title}
      </h4>
      <p
        className={`text-sm ${isActive ? "text-amber-600" : "text-slate-600"}`}
      >
        {s.description}
      </p>
    </motion.div>
  );
}
/* ---------------------------------------------------------
   PHONE CARD (FULL, FINAL, WITH SAME WIDTH)
--------------------------------------------------------- */
function PhoneCard({
  stepIndex,
  activeStep,
  icon: Icon,
  title,
  highlight,
  btns,
  paymentOptions,
  goldFeatures,
}: any) {
  const isActive = activeStep === stepIndex;
  const mask =
    "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.55) 86%, rgba(0,0,0,0.25) 92%, rgba(0,0,0,0) 100%)";
  const screenBg = isActive
    ? "bg-gradient-to-b from-amber-200 via-amber-100 to-transparent"
    : "bg-gradient-to-b from-slate-700 via-slate-600 to-transparent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="relative mx-auto w-[260px] sm:w-[280px] md:w-[300px] overflow-visible">
        {/* PHONE SHELL */}
        <motion.div
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[320px] md:h-[360px] rounded-t-[50px] pt-3 px-3 shadow-2xl border-t-4 border-l-4 border-r-4 border-black/90 bg-slate-900 overflow-hidden"
          style={{
            WebkitMaskImage: mask,
            maskImage: mask,
            maskRepeat: "no-repeat",
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
          {/* SCREEN */}
          <div
            className={`relative w-full h-full rounded-t-[40px] overflow-hidden p-6 ${screenBg}`}
          >
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-0 left-[-30%] h-full w-[60%] opacity-30 -skew-x-12"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                    animation: "shimmer 3s infinite",
                  }}
                />
              </div>
            )}
            {/* ICON + TITLE */}
            <div className="flex items-center gap-2 mb-4 mt-6">
              <Icon className="w-4 h-4 text-black/85" />
              <p className="text-black/85 text-xs">{title}</p>
            </div>
            {/* HIGHLIGHT BUTTONS */}
            {highlight && btns && (
              <>
                <Card className="bg-white/80 p-3 mb-3">
                  <p className="text-slate-900 text-center text-sm">
                    {highlight}
                  </p>
                </Card>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {btns.map((b: any, i: number) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="bg-white/70 border-black/10 text-slate-900 text-xs h-8 px-2"
                    >
                      {b}
                    </Button>
                  ))}
                </div>
                <p className="text-center text-amber-700 text-[10px]">
                  POPULAR
                </p>
              </>
            )}
            {/* PAYMENT OPTIONS */}
            {paymentOptions && (
              <>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {["PhonePe", "Paytm", "GPay", "Other UPI"].map((p) => (
                    <Card
                      key={p}
                      className="bg-white p-2 flex flex-col items-center gap-1 h-16 border-black/10"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(245,158,11), rgb(252,211,77))",
                        }}
                      >
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-slate-800 text-[10px]">{p}</p>
                    </Card>
                  ))}
                </div>
                <Button className="bg-black text-white w-full text-xs h-9">
                  Proceed for Payment
                </Button>
                <p className="text-center text-slate-700 text-[10px] mt-2">
                  🔒 100% SECURE
                </p>
              </>
            )}
            {/* GOLD FEATURES */}
            {goldFeatures && (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "100% SECURE", value: "LOCKER" },
                  { label: "24 KARAT", value: "GOLD" },
                  { label: "100% PURE", value: "PURITY" },
                ].map((f) => (
                  <Card
                    key={f.label}
                    className="bg-white p-2 text-center border-black/10"
                  >
                    <p className="text-amber-700 text-[9px]">{f.label}</p>
                    <p className="text-slate-900 text-[10px]">{f.value}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </motion.div>
        {/* CLOUD FADE */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-[130%] h-16 bg-gradient-radial from-white/70 to-white blur-xl" />
      </div>
      {/* SHIMMER KEYFRAMES */}
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