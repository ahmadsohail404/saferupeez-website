"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gold } from "../components/Gold";
import { Silver } from "../components/Silver";

export default function GoldSilver() {
  const [activeTab, setActiveTab] = useState("gold");

  return (
    <section
      id="gold-silver"
      className="w-full bg-gradient-to-b from-[#f5edff] to-[#fff7e6] pb-20"
    >
      {/* ---------- PREMIUM FLOATING TABS (NO WHITE BOX) ---------- */}
      <div className="flex justify-center pt-10">
        <div className="relative flex items-center gap-4">
          {/* Sliding gradient pill */}
          <motion.div
            layoutId="tab-highlight"
            className="absolute h-14 w-36 rounded-2xl shadow-xl"
            animate={{
              x: activeTab === "gold" ? 0 : 160,
              background:
                activeTab === "gold"
                  ? "linear-gradient(135deg, #fbbf24, #d97706)"
                  : "linear-gradient(135deg, #cbd5e1, #64748b)",
            }}
            transition={{ type: "spring", duration: 0.6 }}
          />

          {/* Gold Tab */}
          <button
            onClick={() => setActiveTab("gold")}
            className={`relative z-10 h-14 w-36 flex items-center justify-center gap-2 rounded-2xl text-lg font-semibold transition-all ${
              activeTab === "gold" ? "text-white" : "text-[#2e1a47]"
            }`}
          >
            <span className="text-3xl">🪙</span> Gold
          </button>

          {/* Silver Tab */}
          <button
            onClick={() => setActiveTab("silver")}
            className={`relative z-10 h-14 w-36 flex items-center justify-center gap-2 rounded-2xl text-lg font-semibold transition-all ${
              activeTab === "silver" ? "text-white" : "text-[#2e1a47]"
            }`}
          >
            <span className="text-3xl">⚪</span> Silver
          </button>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full"
      >
        {activeTab === "gold" ? <Gold /> : <Silver />}
      </motion.div>
    </section>
  );
}
