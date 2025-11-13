"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gold } from "../components/Gold";
import { Silver } from "../components/Silver";

export default function GoldSilver() {
  const [activeTab, setActiveTab] = useState<"gold" | "silver">("gold");

  return (
    <section id="gold-silver" className="min-h-screen">
      {/* Fixed Tab Switcher - Does not scroll with content */}
      <div className=" top-10 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={() => setActiveTab("gold")}
              className={`relative px-16 py-5 rounded-2xl transition-all ${
                activeTab === "gold"
                  ? "text-white shadow-2xl"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "gold" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl shadow-lg"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-4xl">🪙</span>
                <span className="text-xl">Gold</span>
              </span>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab("silver")}
              className={`relative px-16 py-5 rounded-2xl transition-all ${
                activeTab === "silver"
                  ? "text-white shadow-2xl"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "silver" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl shadow-lg"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-4xl">⚪</span>
                <span className="text-xl">Silver</span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content - Add top padding to account for fixed header */}
      <div className="pt-32">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "gold" ? <Gold /> : <Silver />}
        </motion.div>
      </div>
    </section>
  );
}