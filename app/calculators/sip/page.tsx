"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState([17500]);
  const [returnRate, setReturnRate] = useState([12]);
  const [timePeriod, setTimePeriod] = useState([10]);
  const [annualStepUp, setAnnualStepUp] = useState([0]);

  // Calculate SIP maturity
  const calculateSIP = () => {
    const monthlyAmount = monthlyInvestment[0];
    const annualReturn = returnRate[0] / 100;
    const monthlyReturn = annualReturn / 12;
    const months = timePeriod[0] * 12;
    const stepUp = annualStepUp[0] / 100;
    
    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthlyAmount = monthlyAmount;
    
    for (let month = 1; month <= months; month++) {
      // Apply step-up every 12 months
      if (month > 1 && (month - 1) % 12 === 0 && stepUp > 0) {
        currentMonthlyAmount = currentMonthlyAmount * (1 + stepUp);
      }
      
      totalInvested += currentMonthlyAmount;
      futureValue = (futureValue + currentMonthlyAmount) * (1 + monthlyReturn);
    }
    
    return { totalInvested, futureValue };
  };

  const { totalInvested, futureValue } = calculateSIP();
  const estimatedGain = futureValue - totalInvested;

  // Generate chart data
  const generateChartData = () => {
    const data = [];
    const monthlyAmount = monthlyInvestment[0];
    const annualReturn = returnRate[0] / 100;
    const monthlyReturn = annualReturn / 12;
    const years = timePeriod[0];
    const stepUp = annualStepUp[0] / 100;
    
    let invested = 0;
    let value = 0;
    let currentMonthlyAmount = monthlyAmount;
    
    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        data.push({ year: `0y`, invested: 0, value: 0 });
      } else {
        // Calculate for this year
        for (let month = 1; month <= 12; month++) {
          invested += currentMonthlyAmount;
          value = (value + currentMonthlyAmount) * (1 + monthlyReturn);
        }
        
        // Apply step-up for next year
        if (stepUp > 0 && year < years) {
          currentMonthlyAmount = currentMonthlyAmount * (1 + stepUp);
        }
        
        data.push({
          year: `${year}y`,
          invested: Math.round(invested),
          value: Math.round(value)
        });
      }
    }
    
    return data;
  };

  const chartData = generateChartData();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-slate-600 text-sm">
          All calculators · <span className="text-purple-600">SIP Calculator</span>
        </p>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl mb-3">SIP Calculator</h2>
        <p className="text-slate-600 text-lg">
          Project the future value of a monthly SIP with optional annual step-up.
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
              {/* Monthly Investment */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Monthly investment</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">₹</span>
                    <Input
                      type="number"
                      value={monthlyInvestment[0]}
                      onChange={(e) => setMonthlyInvestment([Number(e.target.value)])}
                      className="w-32 text-right"
                    />
                  </div>
                </div>
                <Slider
                  value={monthlyInvestment}
                  onValueChange={setMonthlyInvestment}
                  min={500}
                  max={100000}
                  step={500}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹500</span>
                  <span>₹1L</span>
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

              {/* Annual Step-up */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Annual step-up</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={annualStepUp[0]}
                      onChange={(e) => setAnnualStepUp([Number(e.target.value)])}
                      className="w-24 text-right"
                      step="1"
                    />
                    <span className="text-slate-600">%</span>
                  </div>
                </div>
                <Slider
                  value={annualStepUp}
                  onValueChange={setAnnualStepUp}
                  min={0}
                  max={20}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>20%</span>
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
              <p className="text-purple-700 text-sm mb-2">Total invested</p>
              <p className="text-2xl text-slate-900">₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 hover:shadow-xl transition-all">
              <p className="text-amber-700 text-sm mb-2">Maturity value</p>
              <p className="text-2xl text-slate-900">₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-xl transition-all">
              <p className="text-green-700 text-sm mb-2">Estimated gain</p>
              <p className="text-2xl text-slate-900">₹{estimatedGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </Card>
          </div>

          {/* Chart */}
          <Card className="p-6 bg-white hover:shadow-xl transition-shadow">
            <h4 className="mb-4">Growth Projection</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => `₹${Number(value).toLocaleString('en-IN')}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="invested"
                    stroke="#9333ea"
                    strokeWidth={2}
                    dot={{ fill: '#9333ea', r: 3 }}
                    name="Invested"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', r: 3 }}
                    name="Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <h4 className="mb-4 text-purple-100">Investment Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-purple-200">Monthly Investment</span>
                <span>₹{monthlyInvestment[0].toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Expected Returns</span>
                <span>{returnRate[0]}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Time Period</span>
                <span>{timePeriod[0]} years</span>
              </div>
              {annualStepUp[0] > 0 && (
                <div className="flex justify-between">
                  <span className="text-purple-200">Annual Step-up</span>
                  <span>{annualStepUp[0]}%</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-purple-400">
                <span>Wealth Gain</span>
                <span className="text-xl">
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
