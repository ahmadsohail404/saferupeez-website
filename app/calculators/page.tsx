"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Badge } from "lucide-react";
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
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    id: "lumpsum" as CalculatorType,
    name: "Lumpsum Calculator",
    description: "One-time investment growth projection",
    icon: TrendingUp,
    gradient: "from-purple-500 to-purple-700"
  },
  {
    id: "sip" as CalculatorType,
    name: "SIP Calculator",
    description: "Project monthly SIP future value",
    icon: Calculator,
    gradient: "from-amber-600 to-orange-600"
  },
  {
    id: "emi" as CalculatorType,
    name: "EMI Calculator",
    description: "Calculate monthly loan EMI",
    icon: CreditCard,
    gradient: "from-purple-600 to-indigo-600"
  }
];

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);

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
    <section id="calculators" className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-amber-50/30 via-purple-50/20 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-600 text-purple-600 uppercase tracking-wider text-base px-4 py-2 mb-6">
            Financial Calculators
          </Badge>
          <h1 className="text-5xl md:text-7xl mb-4">
            All Calculators
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Plan your investments and loans with our smart calculators
          </p>
        </motion.div>

        {/* Calculator Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {calculatorOptions.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`p-6 cursor-pointer transition-all hover:shadow-2xl ${
                    activeCalculator === calc.id
                      ? "border-2 border-purple-600 shadow-xl"
                      : "border-slate-200 hover:border-amber-400"
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${calc.gradient} rounded-2xl flex items-center justify-center transform rotate-6`}>
                    <div className="transform -rotate-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-center mb-2 text-lg">{calc.name}</h3>
                  <p className="text-center text-slate-600 text-sm">{calc.description}</p>
                  {activeCalculator === calc.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="mt-4 h-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full"
                    />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Calculator Content */}
        {activeCalculator && (
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {renderCalculator()}
          </motion.div>
        )}

        {/* Empty State */}
        {!activeCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-purple-100 rounded-full flex items-center justify-center">
              <Calculator className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="mb-3">Select a Calculator</h3>
            <p className="text-slate-600">Choose any calculator above to start planning your finances</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
