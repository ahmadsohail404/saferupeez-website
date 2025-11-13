"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";


export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState([1500000]);
  const [interestRate, setInterestRate] = useState([9]);
  const [tenure, setTenure] = useState([15]);

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount[0];
    const monthlyRate = interestRate[0] / 12 / 100;
    const months = tenure[0] * 12;
    
    if (monthlyRate === 0) {
      return {
        emi: principal / months,
        totalInterest: 0,
        totalPayment: principal
      };
    }
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    
    return { emi, totalInterest, totalPayment };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-slate-600 text-sm">
          All calculators · <span className="text-purple-600">EMI Calculator</span>
        </p>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl mb-3">EMI Calculator</h2>
        <p className="text-slate-600 text-lg">
          Monthly EMI and total interest for your loan.
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
              {/* Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Loan amount</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">₹</span>
                    <Input
                      type="number"
                      value={loanAmount[0]}
                      onChange={(e) => setLoanAmount([Number(e.target.value)])}
                      className="w-32 text-right"
                    />
                  </div>
                </div>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  min={100000}
                  max={50000000}
                  step={100000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹1L</span>
                  <span>₹5Cr</span>
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
                  min={5}
                  max={20}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>5%</span>
                  <span>20%</span>
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
              <p className="text-purple-700 text-sm mb-2">Monthly EMI</p>
              <p className="text-2xl text-slate-900">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 hover:shadow-xl transition-all">
              <p className="text-amber-700 text-sm mb-2">Total interest</p>
              <p className="text-2xl text-slate-900">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-xl transition-all">
              <p className="text-red-700 text-sm mb-2">Total payment</p>
              <p className="text-2xl text-slate-900">₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>
          </div>

          {/* Large EMI Card */}
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white hover:shadow-2xl hover:scale-105 transition-all">
            <div className="text-center">
              <p className="text-purple-200 text-sm mb-3">Your Monthly EMI</p>
              <p className="text-5xl mb-6">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div>
                  <p className="text-purple-200">Principal</p>
                  <p className="text-lg">₹{loanAmount[0].toLocaleString('en-IN')}</p>
                </div>
                <div className="w-px h-12 bg-purple-400"></div>
                <div>
                  <p className="text-purple-200">Interest</p>
                  <p className="text-lg">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6 bg-slate-50">
            <h4 className="mb-4">Loan Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Loan Amount</span>
                <span className="text-slate-900">₹{loanAmount[0].toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Interest Rate</span>
                <span className="text-slate-900">{interestRate[0]}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Loan Tenure</span>
                <span className="text-slate-900">{tenure[0]} years ({tenure[0] * 12} months)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Monthly EMI</span>
                <span className="text-purple-700 font-medium">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-medium">Total Interest Paid</span>
                <span className="text-red-600 font-medium">
                  ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Payment</span>
                <span className="text-slate-900 font-medium">
                  ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </Card>

          {/* Breakdown Card */}
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <h4 className="mb-4 text-amber-900">Payment Breakdown</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-amber-700">Principal Amount</span>
                  <span className="text-amber-900">{((loanAmount[0] / totalPayment) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full"
                    style={{ width: `${(loanAmount[0] / totalPayment) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-amber-700">Interest Amount</span>
                  <span className="text-amber-900">{((totalInterest / totalPayment) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 h-3 rounded-full"
                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
