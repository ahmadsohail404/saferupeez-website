"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Calculator, PiggyBank, TrendingUp, CreditCard } from "lucide-react";

import { FDCalculator } from "./fd/page";
import { LumpsumCalculator } from "./lumpsum/page";
import { SIPCalculator } from "./sip/page";
import { EMICalculator } from "./emi/page";

type CalculatorType = "fd" | "lumpsum" | "sip" | "emi" | null;

const calculatorOptions = [
  {
    id: "fd" as CalculatorType,
    name: "FD Calculator",
    description: "Calculate fixed deposit maturity value",
    icon: PiggyBank,
    gradient: "from-amber-400 to-yellow-500",
    preview: "₹1L → ₹1.5L",
  },
  {
    id: "lumpsum" as CalculatorType,
    name: "Lumpsum Calculator",
    description: "One-time investment growth projection",
    icon: TrendingUp,
    gradient: "from-yellow-400 to-amber-500",
    preview: "12% returns",
  },
  {
    id: "sip" as CalculatorType,
    name: "SIP Calculator",
    description: "Project monthly SIP future value",
    icon: Calculator,
    gradient: "from-amber-500 to-orange-500",
    preview: "₹5K/month",
  },
  {
    id: "emi" as CalculatorType,
    name: "EMI Calculator",
    description: "Calculate monthly loan EMI",
    icon: CreditCard,
    gradient: "from-yellow-500 to-amber-600",
    preview: "₹15K/month",
  },
];

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] =
    useState<CalculatorType>(null);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case "fd":
        return <FDCalculator />;
      case "lumpsum":
        return <LumpsumCalculator />;
      case "sip":
        return <SIPCalculator />;
      case "emi":
        return <EMICalculator />;
      default:
        return null;
    }
  };

  return (
    <section
      id="calculators"
      className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-amber-50 via-white to-yellow-50/40 relative overflow-hidden"
    >
      {/* BG Blurs */}
      <div className="absolute top-20 right-16 w-96 h-96 bg-amber-300/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-40 left-16 w-96 h-96 bg-yellow-300/25 blur-[140px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-4 py-2 rounded-full border border-amber-200/50 shadow-sm inline-block mb-6">
            ⚡ Financial Tools
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-4">
            All Calculators
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Plan your investments and loans with our smart calculators
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {calculatorOptions.map((calc, index) => {
            const Icon = calc.icon;
            const active = activeCalculator === calc.id;

            return (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ${
                    active
                      ? "shadow-2xl border-2 border-amber-400"
                      : "shadow-lg border border-gray-100 hover:shadow-2xl"
                  } bg-white`}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-yellow-400/0 to-amber-500/0 group-hover:from-amber-400/10 group-hover:via-yellow-400/5 group-hover:to-amber-500/10 transition-all duration-500 pointer-events-none"></div>

                  {/* Active bar */}
                  {active && (
                    <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"></div>
                  )}

                  {/* Inner content */}
                  <div className="p-8">
                    {/* Icon */}
                    <div className="relative mx-auto mb-6 w-20 h-20">
                      <div
                        className={`absolute inset-0 rounded-2xl transform rotate-6 bg-gradient-to-br ${calc.gradient}`}
                      ></div>
                      <div className="relative w-full h-full rounded-2xl bg-white shadow-xl ring-4 ring-white flex items-center justify-center transform hover:scale-105 transition">
                        <Icon className="w-10 h-10 text-amber-600" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                      {calc.name}
                    </h3>

                    <p className="text-center text-gray-600 text-sm mb-6">
                      {calc.description}
                    </p>

                    {/* Preview */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-gray-500">Quick Preview</span>
                        <span className="font-semibold text-amber-600">
                          {calc.preview}
                        </span>
                      </div>

                      
                    </div>

                    {/* bottom highlight */}
                    {active && (
                      <div className="mt-6 flex justify-center">
                        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* EMPTY STATE */}
        {!activeCalculator && (
          <div className="text-center py-20">
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rotate-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl animate-pulse"></div>
              <div className="relative w-full h-full bg-white rounded-3xl shadow-xl ring-4 ring-white flex items-center justify-center">
                <Calculator className="w-14 h-14 text-amber-600" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Select a Calculator
            </h3>
            <p className="text-xl text-gray-600">
              Choose any tool above to start planning your finances
            </p>
          </div>
        )}

        {/* CALCULATOR CONTENT */}
        {activeCalculator && (
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-12"
          >
            {renderCalculator()}
          </motion.div>
        )}
      </div>
    </section>
  );
}
