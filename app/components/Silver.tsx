"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUp } from "lucide-react";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";


/* ----------------------------------
   SILVER DATA — MULTI PURITY
---------------------------------- */

// PURE SILVER 999
const silver999 = [
  { date: "7 Nov 25", price: 880 },
  { date: "8 Nov 25", price: 890 },
  { date: "9 Nov 25", price: 875 },
  { date: "10 Nov 25", price: 895 },
  { date: "11 Nov 25", price: 910 },
  { date: "12 Nov 25", price: 925 },
  { date: "13 Nov 25", price: 945 },
];

  // 92.5% STERLING SILVER → 7.5% LESS PURE
const silver925 = silver999.map((d) => ({
  ...d,
  price: Math.round(d.price * 0.925),
}));

/* ----------------------------------
   SILVER PRICE DATA
---------------------------------- */



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

export function Silver() {
  const [timePeriod, setTimePeriod] = useState("1W");
   const [purity, setPurity] = useState("999"); // DEFAULT PURITY

  // CHART DATA BASED ON SELECTED PURITY
  const chartData = purity === "999" ? silver999 : silver925;

  // LATEST 10gm prices
const latest999 = silver999[silver999.length - 1].price;     // e.g. 945
const latest925 = silver925[silver925.length - 1].price;     // e.g. 874

// SELECTED LATEST price based on dropdown
const latestPrice = purity === "999" ? latest999 : latest925;
 
  // TOP 2 CARDS VALUES (auto-updates by purity switch)
const pureLatest = silver999[silver999.length - 1].price;
const sterLatest = silver925[silver925.length - 1].price;

const cards = [
  {
    label: "999 Silver",
    gm1: `₹${(pureLatest / 10).toFixed(2)}`,
    gm10: `₹${pureLatest.toFixed(2)}`,
  },
  {
    label: "92.5 Silver",
    gm1: `₹${(sterLatest / 10).toFixed(2)}`,
    gm10: `₹${sterLatest.toFixed(2)}`,
  },
];

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
    <div className="w-full flex justify-center bg-gradient-to-b from-[#f5edff] to-[#fff7e6] pb-20">
      <div className="w-full max-w-[1100px] px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-700 rounded-full" />
            <Badge
              variant="outline"
              className="font-bold border-slate-500 text-green-600 text-sm px-4 py-1 bg-slate-100"
            >
              LIVE SILVER PRICES IN INDIA
            </Badge>
          </div>

          <h1 className="font-extrabold text-6xl md:text-6xl text-[#1d2630] mb-3">
            Today’s Silver Price
          </h1>

          <p className="text-slate-600 text-sm">13 Nov 25, 04:35 pm</p>
        </motion.div>

               {/* SILVER CARDS — ONLY 2 CARDS */}
        <Card className="bg-white text-center shadow-lg p-6 rounded-2xl mb-10 border border-slate-200">
          <p className="text-left text-3xl md:text-1xl font-bold text-black font-semibold text-black-600 mb-4">
            Showing Silver Prices For India
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {cards.map((item) => (
    <Card
      key={item.label}
      className="bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] border border-slate-300 p-4 py-6 rounded-xl shadow flex flex-col items-center justify-center gap-2"

    >
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow">
        <span className="text-white font-bold">{item.label}</span>
      </div>
      <p className="text-slate-600 text-xs mt-2">10gm Price</p>
      <p className="text-[#1d2630] font-bold text-2xl">{item.gm10}</p>
    </Card>
  ))}
</div>

        </Card>

        {/* CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className="lg:col-span-2 p-6 rounded-2xl bg-white shadow border border-slate-200">

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-3xl font-bold text-[#1d2630]">
                Today's Silver Price
              </h3>

              {/* PURITY DROPDOWN */}
              <div className="w-[160px]">
                <Select value={purity} onValueChange={setPurity}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="999 Silver" />
                  </SelectTrigger>

                  <SelectContent align="end" className="text-xs w-[140px]">
                    <SelectItem value="999">999 Silver</SelectItem>
                    <SelectItem value="925">92.5 Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

      <p className="text-slate-600 mb-4 font-semibold">
              Stay updated with daily price movements & purity differences.
            </p>

            {/* LIVE PRICE BOX */}
            <div className="mb-6 p-4 bg-slate-100 rounded-xl flex items-center justify-between">
  <div>
    <p className="text-xs text-slate-600">
      Live Silver Buy Price ({purity === "999" ? "999" : "92.5"} purity)
    </p>

    {/* 10gm price */}
    <p className="text-[#1d2630] font-bold text-3xl">
      ₹{latestPrice.toLocaleString("en-IN")}/10gm
    </p>

    {/* 1gm price */}
    <p className="text-slate-500 text-xs mt-1">
      ₹{(latestPrice / 10).toFixed(2)}/1gm
    </p>
  </div>

  <div className="flex items-center gap-2 text-green-600 text-xs">
    <ArrowUp className="w-4 h-4" />
    <span>+2.1%</span>
    <span className="text-slate-500">1 Week</span>
  </div>
</div>


            {/* CHART */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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
                {["1W", "1M", "6M", "1Y", "3Y", "5Y"].map((t) => (
                  <TabsTrigger key={t} value={t} className="text-xs px-3">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </Card>


          {/* SIDEBAR */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-150 to-slate-200 text-black p-6 rounded-2xl min-h-[200px] shadow-lg">
              <div className="w-16 h-16 mx-auto rounded-xl bg-black/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-7 h-7 text-white border-b " />
              </div>
              <h4 className="text-center text-lg font-semibold">Get alerts when Silver prices drop</h4>
              <p className="text-center text-black-200 text-xs mb-4">
                Never miss a price update.
              </p>
              <Button className="w-full bg-black text-white hover:border-b cursor-pointer transition text-sm py-2">
                Download App Now
              </Button>
            </Card>

            <Card className="p-5 rounded-2xl bg-white shadow-md border border-slate-200">
  <h4 className="mb-3 text-base font-semibold text-[#1d2630]">
    Savings Options For You
  </h4>

  <div className="space-y-3">  
    {/* Daily */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
      <div className="w-10 h-10 bg-slate-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Daily</span>
      <span className="text-slate-400">›</span>
    </div>

    {/* Weekly */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
      <div className="w-10 h-10 bg-slate-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Weekly</span>
      <span className="text-slate-400">›</span>
    </div>

    {/* Monthly */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
      <div className="w-10 h-10 bg-slate-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Monthly</span>
      <span className="text-slate-400">›</span>
    </div>

    {/* Yearly */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
      <div className="w-10 h-10 bg-slate-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Yearly</span>
      <span className="text-slate-400">›</span>
    </div>
  </div>
</Card>

          </div>
        </div>

        {/* SILVER WEIGHT TABLE */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-slate-200 mb-10">
          <h3 className="font-semibold text-3xl text-[#1d2630] mb-2">
            Silver Price by Weight
          </h3>

          <p className="text-1xl md:text-1xl font-bold text-black text-slate-600 mb-4">
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
                    <TableCell className="text-1xl  md:text-1xl font-bold text-black">{row.weight}</TableCell>
                    <TableCell className="text-1xl  md:text-1xl font-bold text-black-700">
                      ₹ {row.today}
                    </TableCell>
                    <TableCell className="text-1xl  md:text-1xl font-bold text-black">
                      ₹ {row.yesterday}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* SILVER PRICE HISTORY */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-slate-200 mb-10">
          <h3 className="font-semibold text-3xl text-[#1d2630] mb-2">
            Silver Price History
          </h3>

          <p className="text-1xl md:text-1xl font-bold text-black text-slate-600 mb-4">
            See how silver prices have changed recently.
          </p>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="text-1xl md:text-1xl font-bold text-black">Date</TableHead>
                  <TableHead className="text-1xl md:text-1xl font-bold text-black">Pure Silver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceHistoryData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">{row.date}</TableCell>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">
                      ₹ {row.silver}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* SAVINGS CALCULATOR */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-slate-200 min-h-[400px]">
          <h3 className="font-semibold text-3xl text-[#1d2630] mb-1">
            Silver Savings Calculator
          </h3>

          <p className="text-1xl md:text-1xl font-bold text-black text-slate-600 mb-6">
            Estimate your silver savings easily.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CHART */}
            <Card className="bg-gradient-to-br from-slate-300 to-slate-350 text-white p-6 rounded-2xl shadow-md min-h-[320px]">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="140%">
                  <BarChart data={savingsChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#0c0c0cff" fontSize={10} />
                    <YAxis stroke="#080808ff" fontSize={10} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="saved" fill="#1d2e47ff" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="returns" fill="#445469ff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* CONTROLS */}
            <div className="space-y-6">
              {/* Tabs */}
              <Tabs value={savingPeriod} onValueChange={setSavingPeriod}>
                <TabsList className="grid grid-cols-3 bg-slate-100 p-1 rounded-full pt-0 pb-0">
                  {["Daily", "Weekly", "Monthly"].map((p) => (
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

              {/* Daily Amount */}
              <Card className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between mb-2 text-sm">
                  <label className="text-slate-700">
                    {savingPeriod} Saving Amount
                  </label>
                  <span className="text-slate-700 font-bold text-lg">
                    ₹{dailyAmount[0]}
                  </span>
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

              {/* Years */}
              <Card className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between mb-2 text-sm">
                  <label className="text-slate-700">Time Period</label>
                  <span className="text-slate-700 font-bold text-lg">
                    {years[0]} yrs
                  </span>
                </div>

                <Slider
                  value={years}
                  onValueChange={setYears}
                  min={1}
                  max={10}
                  step={1}
                  className="h-5 flex items-center"
                  thumbClassName="w-5 h-5 bg-slate-400 border-2 border-white rounded-full shadow-lg"
                  trackClassName="h-2 bg-slate-200 rounded-full"
                  rangeClassName="bg-slate-700 h-2 rounded-full"
                />
              </Card>

              {/* Calculated Values */}
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
