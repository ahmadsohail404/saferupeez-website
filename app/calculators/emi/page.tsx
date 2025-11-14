"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { CreditCard } from "lucide-react";

export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState([1500000]);
  const [interestRate, setInterestRate] = useState([9]);
  const [tenure, setTenure] = useState([15]);

  /* ---------- EMI Calculation ---------- */
  const calculateEMI = () => {
    const P = loanAmount[0];
    const r = interestRate[0] / 12 / 100;
    const n = tenure[0] * 12;

    if (r === 0) {
      return {
        emi: P / n,
        totalInterest: 0,
        totalPayment: P,
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return { emi, totalInterest, totalPayment };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  return (
    <div className="relative">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/30 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/25 blur-[150px] rounded-full -z-10"></div>

      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white shadow-xl rounded-3xl ring-4 ring-white flex items-center justify-center transform rotate-6">
            <CreditCard className="w-10 h-10 text-purple-600 -rotate-6" />
          </div>
        </div>

        <h2 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
          EMI Calculator
        </h2>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Calculate your monthly EMI, total interest, and total loan repayment.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ---------------- LEFT INPUTS ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-xl border border-amber-100 rounded-3xl shadow-xl">
            <div className="space-y-10">
              {/* Loan Amount */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Loan Amount
                </Label>

                <Input
                  type="number"
                  value={loanAmount[0]}
                  onChange={(e) => setLoanAmount([+e.target.value])}
                  className="w-40 text-right mb-4"
                />

                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  min={100000}
                  max={50000000}
                  step={50000}
                />

                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>₹1L</span>
                  <span>₹5Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Interest Rate (p.a.)
                </Label>

                <Input
                  type="number"
                  value={interestRate[0]}
                  step="0.1"
                  onChange={(e) => setInterestRate([+e.target.value])}
                  className="w-28 text-right mb-4"
                />

                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  min={5}
                  max={20}
                  step={0.1}
                />
              </div>

              {/* Tenure */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Loan Tenure (Years)
                </Label>

                <Input
                  type="number"
                  value={tenure[0]}
                  onChange={(e) => setTenure([+e.target.value])}
                  className="w-28 text-right mb-4"
                />

                <Slider
                  value={tenure}
                  onValueChange={setTenure}
                  min={1}
                  max={30}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ---------------- RIGHT OUTPUTS ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Output Cards (Fully Responsive) */}
          <div className="flex flex-wrap gap-6 w-full">
            {/* EMI */}
            <Card className="flex-1 min-w-[260px] p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-lg">
              <p className="text-purple-700 text-sm mb-2">Monthly EMI</p>
              <p className="text-3xl md:text-4xl font-semibold text-slate-900 break-words leading-tight">
                ₹
                {emi.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </Card>

            {/* Total Interest */}
            <Card className="flex-1 min-w-[260px] p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 shadow-lg">
              <p className="text-amber-700 text-sm mb-2">Total Interest</p>
              <p className="text-3xl md:text-4xl font-semibold text-slate-900 break-words leading-tight">
                ₹
                {totalInterest.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </Card>

            {/* Total Payment */}
            <Card className="flex-1 min-w-[260px] p-6 rounded-3xl bg-gradient-to-br from-red-50 to-rose-100 border border-rose-200 shadow-lg">
              <p className="text-red-700 text-sm mb-2">Total Payment</p>
              <p className="text-3xl md:text-4xl font-semibold text-slate-900 break-words leading-tight">
                ₹
                {totalPayment.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </Card>
          </div>

          {/* Large EMI Card */}
          <Card className="p-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-3xl shadow-xl transform hover:scale-[1.02] transition-all">
            <div className="text-center">
              <p className="text-purple-200 text-sm mb-2">Your Monthly EMI</p>
              <p className="text-5xl font-bold mb-6">
                ₹
                {emi.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>

              <div className="flex items-center justify-center gap-6 text-sm">
                <div>
                  <p className="text-purple-200">Principal</p>
                  <p className="text-lg font-semibold">
                    ₹{loanAmount[0].toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="w-px h-12 bg-purple-400" />

                <div>
                  <p className="text-purple-200">Interest</p>
                  <p className="text-lg font-semibold">
                    ₹{totalInterest.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border">
            <h4 className="text-xl font-semibold mb-4">Loan Summary</h4>

            <div className="space-y-4 text-slate-700">
              <div className="flex justify-between">
                <span>Loan Amount</span>
                <span className="font-semibold">
                  ₹{loanAmount[0].toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Interest Rate</span>
                <span className="font-semibold">{interestRate[0]}% p.a.</span>
              </div>

              <div className="flex justify-between">
                <span>Tenure</span>
                <span className="font-semibold">
                  {tenure[0]} years ({tenure[0] * 12} months)
                </span>
              </div>

              <div className="flex justify-between">
                <span>Monthly EMI</span>
                <span className="font-semibold text-purple-700">
                  ₹{emi.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-300 flex justify-between">
                <span>Total Interest Paid</span>
                <span className="font-semibold text-red-600">
                  ₹{totalInterest.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Payment</span>
                <span className="font-semibold">
                  ₹{totalPayment.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </Card>

          {/* Breakdown */}
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 rounded-3xl shadow-md">
            <h4 className="mb-4 text-amber-900 font-semibold">
              Payment Breakdown
            </h4>

            {/* Principal */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-700">Principal Amount</span>
                <span className="font-semibold text-amber-900">
                  {((loanAmount[0] / totalPayment) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-amber-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700"
                  style={{
                    width: `${(loanAmount[0] / totalPayment) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Interest */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-700">Interest Amount</span>
                <span className="font-semibold text-amber-900">
                  {((totalInterest / totalPayment) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-amber-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600"
                  style={{
                    width: `${(totalInterest / totalPayment) * 100}%`,
                  }}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
