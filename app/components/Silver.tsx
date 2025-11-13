"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUp } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

/* ----------------------------------
   DATA
---------------------------------- */

const silverPriceData = [
  { date: "7 Nov 25", price: 880 },
  { date: "8 Nov 25", price: 890 },
  { date: "9 Nov 25", price: 875 },
  { date: "10 Nov 25", price: 895 },
  { date: "11 Nov 25", price: 910 },
  { date: "12 Nov 25", price: 925 },
  { date: "13 Nov 25", price: 945 },
];

const weightPriceData = [
  { weight: "1 gm", today: "94.50", yesterday: "92.50" },
  { weight: "10 gm", today: "945.00", yesterday: "925.00" },
  { weight: "100 gm", today: "9,450.00", yesterday: "9,250.00" },
  { weight: "500 gm", today: "47,250.00", yesterday: "46,250.00" },
  { weight: "1 kg", today: "94,500.00", yesterday: "92,500.00" },
];

const priceHistoryData = [
  { date: "30 Oct'25", silver: "9,450.00" },
  { date: "29 Oct'25", silver: "9,350.00" },
  { date: "28 Oct'25", silver: "9,280.00" },
  { date: "27 Oct'25", silver: "9,420.00" },
  { date: "26 Oct'25", silver: "9,520.00" },
  { date: "25 Oct'25", silver: "9,520.00" },
  { date: "24 Oct'25", silver: "9,480.00" },
  { date: "23 Oct'25", silver: "9,580.00" },
  { date: "22 Oct'25", silver: "9,380.00" },
  { date: "21 Oct'25", silver: "9,680.00" },
];

/* ---------------------------------- */

export function Silver() {
  const [timePeriod, setTimePeriod] = useState("1W");
  const [savingPeriod, setSavingPeriod] = useState("Daily");
  const [dailyAmount, setDailyAmount] = useState([50]);
  const [years, setYears] = useState([10]);

  const savedAmount =
    savingPeriod === "Daily"
      ? dailyAmount[0] * 365 * years[0]
      : savingPeriod === "Weekly"
      ? dailyAmount[0] * 52 * years[0]
      : dailyAmount[0] * 12 * years[0];

  const estimatedReturns = Math.round(savedAmount * 0.09 * years[0]);
  const totalSavings = savedAmount + estimatedReturns;

  const savingsChartData = Array.from({ length: years[0] }, (_, i) => ({
    year: `${i + 1}Y`,
    saved: Math.round((savedAmount / years[0]) * (i + 1)),
    returns: Math.round((estimatedReturns / years[0]) * (i + 1)),
  }));

  return (
    <div className="w-full flex justify-center bg-gradient-to-b from-[#f8f9fa] to-[#f2f4f7] pb-20">

      <div className="w-full max-w-[1100px] px-4">

        {/* ───────── HEADER ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-slate-600 rounded-full" />
            <Badge
              variant="outline"
              className="font-bold border-slate-500 text-slate-700 text-sm px-4 py-1 bg-slate-50"
            >
              LIVE SILVER PRICES IN INDIA
            </Badge>
          </div>

          <h1 className="font-extrabold text-5xl md:text-6xl text-[#1d2630] mb-3">
            Today’s Silver Price
          </h1>

          <p className="text-slate-600 text-sm">13 Nov 25, 04:35 pm</p>
        </motion.div>

        {/* ───────── SILVER PRICE CARDS ───────── */}
        <Card className="bg-white shadow-lg p-6 rounded-2xl min-h-[280px] mb-10 border border-slate-200">

          <p className="text-left text-3xl font-bold text-[#1d2630] mb-4">
            Showing Silver Prices For India
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[ 
              { label: "1 gm", price: "₹94.50", gradient:"from-slate-300 to-slate-400" },
              { label: "10 gm",price:"₹945.00", gradient:"from-slate-400 to-slate-500" },
              { label: "100 gm",price:"₹9,450.00", gradient:"from-slate-500 to-slate-600" },
            ].map((item) => (
              <Card
                key={item.label}
                className="bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] border border-slate-200 p-4 py-6 min-h-[165px] rounded-xl shadow-sm flex flex-col items-center justify-center gap-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow`}>
                  <span className="text-white font-bold">{item.label}</span>
                </div>

                <p className="text-slate-600 text-xs">Silver / {item.label}</p>

                <p className="text-[#1d2630] font-bold text-2xl md:text-3xl">{item.price}</p>
              </Card>
            ))}

          </div>
        </Card>

        {/* ───────── CHART + SIDEBAR ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* ─── CHART ─── */}
          <Card className="lg:col-span-2 p-6 rounded-2xl min-h-[400px] shadow-md bg-white border border-slate-200">

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-bold text-[#1d2630]">Today's Silver Price</h3>

              <Select defaultValue="pure">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pure">Pure Silver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-slate-600 text-xs mb-4 max-w-[90%]">
              Stay updated with daily price movements and weekly changes.
            </p>

            {/* Live Buy Rate */}
            <div className="mb-6 p-4 bg-[#f1f5f9] rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600">Live Silver Buy Price</p>
                <p className="text-[#1d2630] font-bold text-3xl">94.50/gm</p>
              </div>
              <div className="flex items-center gap-2 text-green-600 text-xs">
                <ArrowUp className="w-4 h-4" />
                <span>2.16%</span>
                <span className="text-slate-500">1 Week Change</span>
              </div>
            </div>

            {/* CHART */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={silverPriceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#475569"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#475569" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* TABS */}
            <Tabs value={timePeriod} onValueChange={setTimePeriod}>
              <TabsList className="bg-slate-100 mt-4">
                {["1W","1M","6M","1Y","3Y","5Y"].map((t)=>
                  <TabsTrigger key={t} value={t} className="text-xs px-3">
                    {t}
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>

          </Card>

          {/* ─── SIDEBAR ─── */}
          <div className="space-y-6">

            {/* ALERT CARD */}
            <Card className="bg-gradient-to-br from-slate-600 to-slate-700 text-white p-6 rounded-2xl min-h-[200px] shadow-lg">
              <div className="w-16 h-16 mx-auto rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-center text-lg font-semibold">Get alerts when Silver prices drop</h4>
              <p className="text-center text-slate-200 text-xs mb-4">
                Never miss a price update.
              </p>
              <Button className="w-full bg-white text-slate-700 hover:bg-slate-50 text-sm py-2">
                Download App Now
              </Button>
            </Card>

            {/* SAVINGS OPTION CARD */}
            <Card className="p-5 rounded-2xl bg-white shadow-md border border-slate-200">
              <h4 className="mb-3 text-base font-semibold text-[#1d2630]">Savings Options For You</h4>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                <div className="w-10 h-10 bg-slate-600 text-white rounded-lg flex items-center justify-center">
                  💰
                </div>
                <span className="flex-1 text-sm">Save Daily</span>
                <span className="text-slate-400">›</span>
              </div>
            </Card>

          </div>
        </div>

        {/* ───────── SILVER WEIGHT TABLE ───────── */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-slate-200 min-h-[280px] mb-10">
          <h3 className="font-semibold text-3xl text-[#1d2630] mb-2">Silver Price by Weight</h3>
          <p className="text-slate-600 mb-4">
            See today's updated silver prices.
          </p>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="text-xs">Weight</TableHead>
                  <TableHead className="text-xs">Price Today (₹)</TableHead>
                  <TableHead className="text-xs">Price Yesterday (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weightPriceData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xl font-bold">{row.weight}</TableCell>
                    <TableCell className="text-xl font-bold text-slate-700">
                      ₹ {row.today}
                    </TableCell>
                    <TableCell className="text-xl font-bold">₹ {row.yesterday}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* ───────── PRICE HISTORY ───────── */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-slate-200 mb-10">
          <h3 className="font-semibold text-3xl text-[#1d2630] mb-2">Silver Price History</h3>
          <p className="text-slate-600 mb-4">
            See how silver prices have changed recently.
          </p>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="text-xl font-bold">Date</TableHead>
                  <TableHead className="text-xl font-bold">Pure Silver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceHistoryData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xl font-bold">{row.date}</TableCell>
                    <TableCell className="text-xl font-bold">₹ {row.silver}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* ───────── SAVINGS CALCULATOR ───────── */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-slate-200 min-h-[400px]">
          <h3 className="font-semibold text-3xl text-[#1d2630] mb-1">Silver Savings Calculator</h3>
          <p className="text-slate-600 mb-6">
            Estimate your silver savings easily.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* CHART */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md min-h-[320px]">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={savingsChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#fff" fontSize={10} />
                    <YAxis stroke="#fff" fontSize={10} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="saved" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="returns" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* CONTROLS */}
            <div className="space-y-6">

              {/* Period Tabs */}
              <Tabs value={savingPeriod} onValueChange={setSavingPeriod}>
                <TabsList className="grid grid-cols-3 bg-slate-100 p-1 rounded-full">
                  {["Daily","Weekly","Monthly"].map((p)=>(
                    <TabsTrigger
                      key={p}
                      value={p}
                      className="text-xs py-2 rounded-full data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                    >
                      {p}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Amount Slider */}
              <Card className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between mb-2 text-sm">
                  <label className="text-slate-700">{savingPeriod} Saving Amount</label>
                  <span className="text-slate-700 font-bold text-lg">₹{dailyAmount[0]}</span>
                </div>

                <Slider
                  value={dailyAmount}
                  onValueChange={setDailyAmount}
                  min={10}
                  max={1000}
                  step={10}
                  className="h-5 flex items-center"
                  thumbClassName="w-5 h-5 bg-slate-600 border-2 border-white rounded-full shadow-lg"
                  trackClassName="h-2 bg-slate-200 rounded-full"
                  rangeClassName="bg-slate-600 h-2 rounded-full"
                />
              </Card>

              {/* Years Slider */}
              <Card className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between mb-2 text-sm">
                  <label className="text-slate-700">Time Period</label>
                  <span className="text-slate-700 font-bold text-lg">{years[0]} yrs</span>
                </div>

                <Slider
                  value={years}
                  onValueChange={setYears}
                  min={1}
                  max={10}
                  step={1}
                  className="h-5 flex items-center"
                  thumbClassName="w-5 h-5 bg-slate-600 border-2 border-white rounded-full shadow-lg"
                  trackClassName="h-2 bg-slate-200 rounded-full"
                  rangeClassName="bg-slate-600 h-2 rounded-full"
                />
              </Card>

              {/* Calculated Numbers */}
              <div className="space-y-3 pt-3 border-t">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Saved Amount</span>
                  <span className="text-[#1d2630] font-bold text-lg">
                    ₹{savedAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Estimated Returns (~9% p.a.)</span>
                  <span className="text-green-700 font-bold text-lg">
                    ₹{estimatedReturns.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold text-slate-700 border-t pt-3">
                  <span>Total Savings</span>
                  <span>
                    ₹{totalSavings.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
