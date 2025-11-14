"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { PiggyBank } from "lucide-react";

export function FDCalculator() {
  const [deposit, setDeposit] = useState([100000]);
  const [interestRate, setInterestRate] = useState([7.5]);
  const [tenure, setTenure] = useState([3]);
  const [compounding, setCompounding] = useState("quarterly");

  const calculateMaturity = () => {
    const p = deposit[0];
    const r = interestRate[0] / 100;
    const t = tenure[0];

    let n = 4;
    if (compounding === "monthly") n = 12;
    if (compounding === "half-yearly") n = 2;
    if (compounding === "yearly") n = 1;

    return p * Math.pow(1 + r / n, n * t);
  };

  const maturityValue = calculateMaturity();
  const interestEarned = maturityValue - deposit[0];

  return (
    <div className="relative">
      {/* Decorative BG blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/30 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300/25 blur-[150px] rounded-full -z-10" />

      {/* Title */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white shadow-xl rounded-3xl ring-4 ring-white flex items-center justify-center transform rotate-6">
            <PiggyBank className="w-10 h-10 text-amber-600 -rotate-6" />
          </div>
        </div>

        <h2 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
          FD Calculator
        </h2>

        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Estimate your fixed deposit maturity value with premium accuracy.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE – Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-100 shadow-xl">
            <div className="space-y-10">
              {/* Deposit */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Deposit Amount
                </Label>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-600">Enter Amount:</span>
                  <Input
                    type="number"
                    value={deposit[0]}
                    onChange={(e) => setDeposit([Number(e.target.value)])}
                    className="w-40 text-right"
                  />
                </div>
                <Slider
                  value={deposit}
                  onValueChange={setDeposit}
                  min={10000}
                  max={10000000}
                  step={10000}
                />
                <div className="flex justify-between text-xs mt-1 text-slate-500">
                  <span>₹10K</span>
                  <span>₹1 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Interest Rate
                </Label>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-600">Rate (p.a):</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={interestRate[0]}
                    onChange={(e) => setInterestRate([Number(e.target.value)])}
                    className="w-28 text-right"
                  />
                </div>
                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  min={3}
                  max={15}
                  step={0.1}
                />
                <div className="flex justify-between text-xs mt-1 text-slate-500">
                  <span>3%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Tenure (years)
                </Label>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-600">Years:</span>
                  <Input
                    type="number"
                    value={tenure[0]}
                    onChange={(e) => setTenure([Number(e.target.value)])}
                    className="w-28 text-right"
                  />
                </div>
                <Slider
                  value={tenure}
                  onValueChange={setTenure}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between text-xs mt-1 text-slate-500">
                  <span>1Y</span>
                  <span>10Y</span>
                </div>
              </div>

              {/* Compounding */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Compounding Frequency
                </Label>

                <Select value={compounding} onValueChange={setCompounding}>
                  <SelectTrigger className="w-full bg-white border rounded-xl px-4 py-3 shadow-sm">
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl rounded-xl">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* RIGHT SIDE – Results */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Invested */}
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-3xl shadow-lg">
            <p className="text-amber-700 text-sm mb-2">Invested Amount</p>
            <p className="text-4xl font-semibold text-slate-900">
              ₹{deposit[0].toLocaleString("en-IN")}
            </p>
          </Card>

          {/* Maturity */}
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-3xl shadow-xl transform hover:scale-[1.02] transition">
            <p className="text-purple-200 text-sm mb-2">Maturity Value</p>
            <p className="text-4xl font-semibold">
              ₹
              {maturityValue.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>

          {/* Interest */}
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-200 rounded-3xl shadow-lg">
            <p className="text-emerald-700 text-sm mb-2">Interest Earned</p>
            <p className="text-4xl font-semibold text-slate-900">
              ₹
              {interestEarned.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>

          {/* Summary */}
          <Card className="p-8 bg-white/70 backdrop-blur-xl shadow-xl border rounded-3xl">
            <h4 className="text-xl font-semibold mb-4">Investment Summary</h4>

            <div className="space-y-4 text-slate-700">
              <div className="flex justify-between">
                <span>Principal</span>
                <span className="font-semibold">
                  ₹{deposit[0].toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Interest Rate</span>
                <span className="font-semibold">{interestRate[0]}%</span>
              </div>

              <div className="flex justify-between">
                <span>Tenure</span>
                <span className="font-semibold">{tenure[0]} years</span>
              </div>

              <div className="flex justify-between">
                <span>Compounding</span>
                <span className="font-semibold capitalize">{compounding}</span>
              </div>

              <div className="pt-3 border-t flex justify-between">
                <span className="font-bold">Total Returns</span>
                <span className="font-bold text-green-600">
                  {((interestEarned / deposit[0]) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
