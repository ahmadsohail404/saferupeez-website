"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { TrendingUp } from "lucide-react";

export function LumpsumCalculator() {
  const [investment, setInvestment] = useState([100000]);
  const [returnRate, setReturnRate] = useState([10]);
  const [timePeriod, setTimePeriod] = useState([5]);

  const calculateMaturity = () => {
    const p = investment[0];
    const r = returnRate[0] / 100;
    const t = timePeriod[0];
    return p * Math.pow(1 + r, t);
  };

  const maturityValue = calculateMaturity();
  const gain = maturityValue - investment[0];

  return (
    <div className="relative">
      {/* Background blur effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/30 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300/25 blur-[150px] rounded-full -z-10" />

      {/* Title Section */}
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white shadow-xl rounded-3xl ring-4 ring-white flex items-center justify-center transform rotate-6">
            <TrendingUp className="w-10 h-10 text-amber-600 -rotate-6" />
          </div>
        </div>

        <h2 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
          Lumpsum Calculator
        </h2>

        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          One-time investment growth projection with premium clarity.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side - Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-100 shadow-xl">
            <div className="space-y-10">
              {/* Investment */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Investment Amount
                </Label>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-600">₹</span>
                  <Input
                    type="number"
                    value={investment[0]}
                    onChange={(e) => setInvestment([Number(e.target.value)])}
                    className="w-40 text-right"
                  />
                </div>
                <Slider
                  value={investment}
                  onValueChange={setInvestment}
                  min={10000}
                  max={10000000}
                  step={10000}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>₹10K</span>
                  <span>₹1 Cr</span>
                </div>
              </div>

              {/* Expected Returns */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Expected Return (p.a.)
                </Label>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-600">%</span>
                  <Input
                    type="number"
                    step="0.5"
                    value={returnRate[0]}
                    onChange={(e) => setReturnRate([Number(e.target.value)])}
                    className="w-28 text-right"
                  />
                </div>
                <Slider
                  value={returnRate}
                  onValueChange={setReturnRate}
                  min={5}
                  max={30}
                  step={0.5}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Time Period (years)
                </Label>
                <div className="flex items-center justify-between mb-4">
                  <Input
                    type="number"
                    value={timePeriod[0]}
                    onChange={(e) => setTimePeriod([Number(e.target.value)])}
                    className="w-28 text-right"
                  />
                </div>
                <Slider
                  value={timePeriod}
                  onValueChange={setTimePeriod}
                  min={1}
                  max={30}
                  step={1}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1Y</span>
                  <span>30Y</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Side - Results */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Result Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Invested */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-3xl shadow-lg">
              <p className="text-purple-700 text-sm mb-2">Invested</p>
              <p className="text-3xl font-semibold text-slate-900">
                ₹{investment[0].toLocaleString("en-IN")}
              </p>
            </Card>

            {/* Maturity */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 rounded-3xl shadow-lg">
              <p className="text-amber-700 text-sm mb-2">Maturity Value</p>
              <p className="text-3xl font-semibold text-slate-900">
                ₹
                {maturityValue.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </Card>

            {/* Gain */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border border-emerald-200 rounded-3xl shadow-lg">
              <p className="text-green-700 text-sm mb-2">Gain</p>
              <p className="text-3xl font-semibold text-slate-900">
                ₹
                {gain.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </Card>
          </div>

          {/* Main Highlighted Card */}
          <Card className="p-10 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all">
            <div className="text-center">
              <p className="text-purple-200 text-sm mb-3">
                Total Maturity Value
              </p>

              <p className="text-5xl font-bold mb-6">
                ₹
                {maturityValue.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>

              <div className="flex items-center justify-center gap-6 text-sm">
                <div>
                  <p className="text-purple-200">Invested</p>
                  <p className="text-lg font-semibold">
                    ₹{investment[0].toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="w-px h-12 bg-purple-400"></div>

                <div>
                  <p className="text-purple-200">Returns</p>
                  <p className="text-lg font-semibold">
                    ₹
                    {gain.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Summary Card */}
          <Card className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border">
            <h4 className="text-xl font-semibold mb-4">Investment Summary</h4>

            <div className="space-y-4 text-slate-700">
              <div className="flex justify-between">
                <span>Investment Amount</span>
                <span className="font-semibold">
                  ₹{investment[0].toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Expected Returns</span>
                <span className="font-semibold">{returnRate[0]}% p.a.</span>
              </div>

              <div className="flex justify-between">
                <span>Time Period</span>
                <span className="font-semibold">{timePeriod[0]} years</span>
              </div>

              <div className="pt-3 border-t flex justify-between">
                <span className="font-bold">Total Gain</span>
                <span className="font-bold text-green-600">
                  {((gain / investment[0]) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
