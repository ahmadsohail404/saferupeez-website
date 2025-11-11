"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Types ---------------- */
type PlanKey = "daily" | "weekly" | "monthly" | "instant";

type Plan = {
  key: PlanKey;
  title: string;
  subtitle: string;
  tagline: string;
  accent: string;
  icon: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
};

type Props = {
  heading?: string;
  intervalMs?: number;
  pauseOnHover?: boolean;
};

/* --------------- Data --------------- */
const PLANS: Plan[] = [
  {
    key: "daily",
    title: "Daily Savings",
    subtitle: "Save a little every day—build consistency.",
    tagline: "CONSISTENT, AUTOMATED, SIMPLE",
    accent: "text-amber-600",
    icon: "☀️",
    gradientFrom: "from-amber-100",
    gradientTo: "to-yellow-200",
    image:
      "https://images.pexels.com/photos/14891545/pexels-photo-14891545.jpeg",
  },
  {
    key: "weekly",
    title: "Weekly Savings",
    subtitle: "A weekly habit that compounds fast.",
    tagline: "FLEXIBLE, GROWING, STEADY",
    accent: "text-emerald-600",
    icon: "📅",
    gradientFrom: "from-emerald-100",
    gradientTo: "to-teal-200",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "monthly",
    title: "Monthly Savings",
    subtitle: "Set up option to save one amount, every month, with ease.",
    tagline: "FAST, SIMPLE, FLEXIBLE",
    accent: "text-amber-600",
    icon: "✓",
    gradientFrom: "from-orange-100",
    gradientTo: "to-yellow-200",
    image:
      "https://images.pexels.com/photos/14891545/pexels-photo-14891545.jpeg",
  },
  {
    key: "instant",
    title: "Instant Savings",
    subtitle: "Top up anytime with one quick tap.",
    tagline: "INSTANT, QUICK, ANYTIME",
    accent: "text-rose-600",
    icon: "⚡",
    gradientFrom: "from-rose-100",
    gradientTo: "to-pink-200",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
];

/* -------- Reduce Motion Hook -------- */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}

/* -------------- Component -------------- */
export default function FlexibleSavingPartner({
  heading = "Flexible Saving Options",
  intervalMs = 4000,
  pauseOnHover = true,
}: Props) {
  const plans = useMemo(() => PLANS, []);
  const [activeIdx, setActiveIdx] = useState(2);
  const [isHover, setIsHover] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ms = reduced ? Math.max(intervalMs, 4500) : intervalMs;
    if (pauseOnHover && isHover) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % plans.length);
    }, ms);
    return () => window.clearInterval(id);
  }, [intervalMs, plans.length, reduced, pauseOnHover, isHover]);

  const active = plans[activeIdx];

  return (
    <section
      className="relative py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden"
      aria-labelledby="flex-save-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="flex-save-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Tabs */}
        <div
          className="mx-auto w-full max-w-5xl mb-16"
          onMouseEnter={() => pauseOnHover && setIsHover(true)}
          onMouseLeave={() => pauseOnHover && setIsHover(false)}
        >
          <div
            role="tablist"
            aria-label="Saving plans"
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {plans.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <motion.button
                  key={p.key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${p.key}`}
                  id={`tab-${p.key}`}
                  onClick={() => setActiveIdx(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={[
                    "relative rounded-full px-6 py-3 text-sm md:text-base font-semibold",
                    "transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300",
                  ].join(" ")}
                >
                  {p.title}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            id={`panel-${active.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.key}`}
            className="relative"
          >
            {/* Main Card with Gradient + Image */}
            <div
              className={`relative rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-200/50 bg-gradient-to-br ${active.gradientFrom} ${active.gradientTo} overflow-hidden`}
            >
              {/* Background Image overlay */}
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

              {/* Content */}
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Card Stack */}
                <motion.div
                  initial={{ scale: 0.8, rotateY: -20 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mb-8"
                >
                  <CardStack
                    label={active.title.split(" ")[0]}
                    icon={active.icon}
                    image={active.image}
                  />
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xs md:text-sm font-bold tracking-[0.2em] ${active.accent} mb-3`}
                >
                  {active.tagline}
                </motion.p>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                >
                  {active.title}
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-gray-700 max-w-2xl"
                >
                  {active.subtitle}
                </motion.p>

                {/* Progress Dots */}
                <div className="flex gap-2 mt-8">
                  {plans.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: i === activeIdx ? 1.2 : 1,
                        opacity: i === activeIdx ? 1 : 0.4,
                      }}
                      className={`w-2.5 h-2.5 rounded-full ${
                        i === activeIdx ? "bg-amber-600" : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-150%);
          }
          60% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Card Stack Component ---------------- */
function CardStack({
  label,
  icon,
  image,
}: {
  label: string;
  icon: string;
  image: string;
}) {
  return (
    <div
      className="relative w-[240px] h-[320px] sm:w-[280px] sm:h-[360px]"
      style={{ perspective: "1000px" }}
    >
      {/* Back cards */}
      <motion.div
        initial={{ rotateZ: 0, x: 0, y: 0 }}
        animate={{ rotateZ: -8, x: -12, y: 8 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl border-2 border-purple-300"
        aria-hidden
      />
      <motion.div
        initial={{ rotateZ: 0, x: 0, y: 0 }}
        animate={{ rotateZ: 6, x: 12, y: 12 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-xl border-2 border-pink-300"
        aria-hidden
      />

      {/* Front card with image */}
      <motion.div
        initial={{ rotateY: -20 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/50"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <img
          src={image}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

        {/* Shine effect */}
        <div className="absolute top-0 left-0 h-full w-1/2 -skew-x-12 opacity-40">
          <div
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
              animation: "shine 3s ease-in-out infinite",
            }}
            className="h-full w-full"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
          <div className="text-6xl mb-4 drop-shadow-lg">{icon}</div>
          <div className="bg-white/90 text-gray-800 rounded-2xl px-6 py-4 shadow-lg">
            <span className="text-3xl sm:text-4xl font-black tracking-wider block">
              {label.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Corner badges */}
        <div className="absolute right-4 top-4 rounded-full bg-white/30 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-white shadow-lg ring-1 ring-white/40">
          Flexible
        </div>
        <div className="absolute left-4 bottom-4 rounded-full bg-white/30 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-white shadow-lg ring-1 ring-white/40">
          Auto-Debit
        </div>
      </motion.div>
    </div>
  );
}
