"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";

export function LumpsumCalculator() {
  const [investment, setInvestment] = useState([100000]);
  const [returnRate, setReturnRate] = useState([10]);
  const [timePeriod, setTimePeriod] = useState([5]);

  // Calculate maturity value
  const calculateMaturity = () => {
    const principal = investment[0];
    const rate = returnRate[0] / 100;
    const time = timePeriod[0];
    
    const maturityValue = principal * Math.pow(1 + rate, time);
    return maturityValue;
  };

  const maturityValue = calculateMaturity();
  const gain = maturityValue - investment[0];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-slate-600 text-sm">
          All calculators · <span className="text-purple-600">Lumpsum Calculator</span>
        </p>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl mb-3">Lumpsum Calculator</h2>
        <p className="text-slate-600 text-lg">
          One-time investment growth projection.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
            <div className="space-y-8">
              {/* Investment Amount */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Investment</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">₹</span>
                    <Input
                      type="number"
                      value={investment[0]}
                      onChange={(e) => setInvestment([Number(e.target.value)])}
                      className="w-32 text-right"
                    />
                  </div>
                </div>
                <Slider
                  value={investment}
                  onValueChange={setInvestment}
                  min={10000}
                  max={10000000}
                  step={10000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹10K</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Expected Return */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Expected return (p.a.)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={returnRate[0]}
                      onChange={(e) => setReturnRate([Number(e.target.value)])}
                      className="w-24 text-right"
                      step="0.5"
                    />
                    <span className="text-slate-600">%</span>
                  </div>
                </div>
                <Slider
                  value={returnRate}
                  onValueChange={setReturnRate}
                  min={5}
                  max={30}
                  step={0.5}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Time period (years)</Label>
                  <Input
                    type="number"
                    value={timePeriod[0]}
                    onChange={(e) => setTimePeriod([Number(e.target.value)])}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={timePeriod}
                  onValueChange={setTimePeriod}
                  min={1}
                  max={30}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1Y</span>
                  <span>30Y</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Side - Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all">
              <p className="text-purple-700 text-sm mb-2">Invested</p>
              <p className="text-2xl text-slate-900">₹{investment[0].toLocaleString('en-IN')}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 hover:shadow-xl transition-all">
              <p className="text-amber-700 text-sm mb-2">Maturity value</p>
              <p className="text-2xl text-slate-900">₹{maturityValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-xl transition-all">
              <p className="text-green-700 text-sm mb-2">Gain</p>
              <p className="text-2xl text-slate-900">₹{gain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>
          </div>

          {/* Large Result Card */}
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white hover:shadow-2xl hover:scale-105 transition-all">
            <div className="text-center">
              <p className="text-purple-200 text-sm mb-3">Total Maturity Value</p>
              <p className="text-5xl mb-6">₹{maturityValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div>
                  <p className="text-purple-200">Invested</p>
                  <p className="text-lg">₹{investment[0].toLocaleString('en-IN')}</p>
                </div>
                <div className="w-px h-12 bg-purple-400"></div>
                <div>
                  <p className="text-purple-200">Returns</p>
                  <p className="text-lg">₹{gain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6 bg-slate-50">
            <h4 className="mb-4">Investment Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Investment Amount</span>
                <span className="text-slate-900">₹{investment[0].toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Expected Returns</span>
                <span className="text-slate-900">{returnRate[0]}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time Period</span>
                <span className="text-slate-900">{timePeriod[0]} years</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-medium">Total Gain</span>
                <span className="text-green-600 font-medium">
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
