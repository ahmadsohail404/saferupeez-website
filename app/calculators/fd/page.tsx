"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";


export function FDCalculator() {
  const [deposit, setDeposit] = useState([100000]);
  const [interestRate, setInterestRate] = useState([7.5]);
  const [tenure, setTenure] = useState([3]);
  const [compounding, setCompounding] = useState("quarterly");

  // Calculate maturity value
  const calculateMaturity = () => {
    const principal = deposit[0];
    const rate = interestRate[0] / 100;
    const time = tenure[0];
    
    let n = 4; // quarterly
    if (compounding === "monthly") n = 12;
    if (compounding === "half-yearly") n = 2;
    if (compounding === "yearly") n = 1;
    
    const maturityValue = principal * Math.pow(1 + rate / n, n * time);
    return maturityValue;
  };

  const maturityValue = calculateMaturity();
  const interestEarned = maturityValue - deposit[0];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-slate-600 text-sm">
          All calculators · <span className="text-purple-600">FD Calculator</span>
        </p>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl mb-3">FD Calculator</h2>
        <p className="text-slate-600 text-lg">
          Estimate maturity value with different compounding frequencies.
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
              {/* Deposit Amount */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Deposit</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">₹</span>
                    <Input
                      type="number"
                      value={deposit[0]}
                      onChange={(e) => setDeposit([Number(e.target.value)])}
                      className="w-32 text-right"
                    />
                  </div>
                </div>
                <Slider
                  value={deposit}
                  onValueChange={setDeposit}
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

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Interest rate (p.a.)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={interestRate[0]}
                      onChange={(e) => setInterestRate([Number(e.target.value)])}
                      className="w-24 text-right"
                      step="0.1"
                    />
                    <span className="text-slate-600">%</span>
                  </div>
                </div>
                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  min={3}
                  max={15}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>3%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Tenure (years)</Label>
                  <Input
                    type="number"
                    value={tenure[0]}
                    onChange={(e) => setTenure([Number(e.target.value)])}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={tenure}
                  onValueChange={setTenure}
                  min={1}
                  max={10}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1Y</span>
                  <span>10Y</span>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div>
                <Label className="text-base mb-3 block">Compounding</Label>
                <Select value={compounding} onValueChange={setCompounding}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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

        {/* Right Side - Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Result Cards */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:shadow-xl transition-all">
              <p className="text-amber-700 text-sm mb-2">Invested</p>
              <p className="text-3xl text-slate-900">₹{deposit[0].toLocaleString('en-IN')}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white hover:shadow-xl hover:scale-105 transition-all">
              <p className="text-purple-200 text-sm mb-2">Maturity value</p>
              <p className="text-4xl">₹{maturityValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-xl transition-all">
              <p className="text-green-700 text-sm mb-2">Interest earned</p>
              <p className="text-3xl text-slate-900">₹{interestEarned.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </Card>
          </div>

          {/* Summary */}
          <Card className="p-6 bg-slate-50">
            <h4 className="mb-4">Investment Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Principal Amount</span>
                <span className="text-slate-900">₹{deposit[0].toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Interest Rate</span>
                <span className="text-slate-900">{interestRate[0]}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tenure</span>
                <span className="text-slate-900">{tenure[0]} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Compounding</span>
                <span className="text-slate-900 capitalize">{compounding}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-medium">Total Returns</span>
                <span className="text-green-600 font-medium">
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
