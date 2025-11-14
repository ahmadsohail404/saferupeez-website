"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calculator } from "lucide-react";

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number[]>([17500]);
  const [returnRate, setReturnRate] = useState<number[]>([12]);
  const [timePeriod, setTimePeriod] = useState<number[]>([10]);
  const [annualStepUp, setAnnualStepUp] = useState<number[]>([0]);

  // helper to keep values within safe range
  const clamp = (val: number, min: number, max: number) =>
    isNaN(val) ? min : Math.min(Math.max(val, min), max);

  /* -------------------- CALCULATIONS -------------------- */
  const calculateSIP = () => {
    const monthly = monthlyInvestment[0];
    const annual = returnRate[0] / 100;
    const monthlyReturn = annual / 12;
    const months = timePeriod[0] * 12;
    const stepUp = annualStepUp[0] / 100;

    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthly = monthly;

    for (let m = 1; m <= months; m++) {
      if (m > 1 && (m - 1) % 12 === 0 && stepUp > 0) {
        currentMonthly = currentMonthly * (1 + stepUp);
      }

      totalInvested += currentMonthly;
      futureValue = (futureValue + currentMonthly) * (1 + monthlyReturn);
    }

    return { totalInvested, futureValue };
  };

  const { totalInvested, futureValue } = calculateSIP();
  const estimatedGain = futureValue - totalInvested;

  /* -------------------- CHART DATA -------------------- */
  const generateChartData = () => {
    const data: { year: string; invested: number; value: number }[] = [];
    const monthly = monthlyInvestment[0];
    const annual = returnRate[0] / 100;
    const monthlyReturn = annual / 12;
    const stepUp = annualStepUp[0] / 100;
    const years = timePeriod[0];

    let invested = 0;
    let value = 0;
    let currentMonthly = monthly;

    for (let y = 0; y <= years; y++) {
      if (y === 0) {
        data.push({ year: "0y", invested: 0, value: 0 });
      } else {
        for (let m = 1; m <= 12; m++) {
          invested += currentMonthly;
          value = (value + currentMonthly) * (1 + monthlyReturn);
        }

        if (stepUp > 0 && y < years) {
          currentMonthly = currentMonthly * (1 + stepUp);
        }

        data.push({
          year: `${y}y`,
          invested: Math.round(invested),
          value: Math.round(value),
        });
      }
    }

    return data;
  };

  const chartData = generateChartData();

  return (
    <div className="relative">
      {/* Background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/30 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-300/25 blur-[150px] rounded-full -z-10" />

      {/* Title Section */}
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white shadow-xl rounded-3xl ring-4 ring-white flex items-center justify-center transform rotate-6">
            <Calculator className="w-10 h-10 text-amber-600 -rotate-6" />
          </div>
        </div>

        <h2 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
          SIP Calculator
        </h2>

        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Project the future value of your SIP with optional annual step-up.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ----------------------- LEFT INPUTS ----------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-100 shadow-xl">
            <div className="space-y-8 sm:space-y-10">
              {/* Monthly Investment */}
              <div className="space-y-3">
                <Label className="text-base font-semibold block">
                  Monthly Investment
                </Label>

                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-sm sm:text-base text-slate-600">
                    Amount (₹)
                  </span>
                  <Input
                    type="number"
                    value={monthlyInvestment[0]}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const safe = clamp(raw, 500, 100000);
                      setMonthlyInvestment([safe]);
                    }}
                    className="w-25 text-right"
                  />
                </div>

                <Slider
                  value={monthlyInvestment}
                  onValueChange={(val) => setMonthlyInvestment(val)}
                  min={500}
                  max={100000}
                  step={500}
                  className="mt-2"
                />
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 mt-1">
                  <span>₹500</span>
                  <span>₹1L</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="space-y-3">
                <Label className="text-base font-semibold block">
                  Expected Return (p.a.)
                </Label>

                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-sm sm:text-base text-slate-600">
                    Rate (%)
                  </span>
                  <Input
                    type="number"
                    value={returnRate[0]}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const safe = clamp(raw, 5, 30);
                      setReturnRate([safe]);
                    }}
                    className="w-20 text-right"
                    step={0.5}
                  />
                </div>

                <Slider
                  value={returnRate}
                  onValueChange={(val) => setReturnRate(val)}
                  min={5}
                  max={30}
                  step={0.5}
                  className="mt-2"
                />
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 mt-1">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <Label className="text-base font-semibold block">
                  Time Period (Years)
                </Label>

                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-sm sm:text-base text-slate-600">
                    Duration
                  </span>
                  <Input
                    type="number"
                    value={timePeriod[0]}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const safe = clamp(raw, 1, 30);
                      setTimePeriod([safe]);
                    }}
                    className="w-20 text-right"
                  />
                </div>

                <Slider
                  value={timePeriod}
                  onValueChange={(val) => setTimePeriod(val)}
                  min={1}
                  max={30}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 mt-1">
                  <span>1Y</span>
                  <span>30Y</span>
                </div>
              </div>

              {/* Annual Step Up */}
              <div className="space-y-3">
                <Label className="text-base font-semibold block">
                  Annual Step-up %
                </Label>

                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-sm sm:text-base text-slate-600">
                    Increase per year
                  </span>
                  <Input
                    type="number"
                    value={annualStepUp[0]}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const safe = clamp(raw, 0, 20);
                      setAnnualStepUp([safe]);
                    }}
                    className="w-20 text-right"
                    step={1}
                  />
                </div>

                <Slider
                  value={annualStepUp}
                  onValueChange={(val) => setAnnualStepUp(val)}
                  min={0}
                  max={20}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 mt-1">
                  <span>0%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ----------------------- RIGHT RESULTS ----------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Result Cards (Fixed Responsiveness) */}
          <div className="flex flex-wrap gap-6 w-full">
            {/* Total Invested */}
            <Card className="flex-1 min-w-[260px] p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 shadow-lg">
              <p className="text-red-700 text-md mb-2">Total Invested</p>
              <p className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight break-words">
                ₹{totalInvested.toLocaleString("en-IN")}
              </p>
            </Card>

            {/* Maturity Value */}
            <Card className="flex-1 min-w-[260px] p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 shadow-lg">
              <p className="text-red-700 text-md mb-2">Maturity Value</p>
              <p className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight break-words">
                ₹{futureValue.toLocaleString("en-IN")}
              </p>
            </Card>

            {/* Estimated Gain */}
            <Card className="flex-1 min-w-[260px] p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 shadow-lg">
              <p className="text-red-700 text-md mb-2">Estimated Gain</p>
              <p className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight break-words">
                ₹{estimatedGain.toLocaleString("en-IN")}
              </p>
            </Card>
          </div>

          {/* Chart */}
          <Card className="p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-xl border">
            <h4 className="mb-4 font-semibold text-gray-800">
              Growth Projection
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="invested"
                    stroke="#9333ea"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 text-black rounded-3xl shadow-xl">
            <h4 className="mb-4 text-red-700 font-semibold">
              Investment Summary
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-black">
                <span>Monthly Investment</span>
                <span>₹{monthlyInvestment[0].toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-black">
                <span>Expected Returns</span>
                <span>{returnRate[0]}% p.a.</span>
              </div>

              <div className="flex justify-between text-black">
                <span>Time Period</span>
                <span>{timePeriod[0]} years</span>
              </div>

              {annualStepUp[0] > 0 && (
                <div className="flex justify-between text-black">
                  <span>Annual Step-up</span>
                  <span>{annualStepUp[0]}%</span>
                </div>
              )}

              <div className="flex justify-between pt-3 border-t border-black text-lg">
                <span className="font-semibold">Wealth Gain</span>
                <span className="font-bold text-black">
                  {((estimatedGain / totalInvested) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
