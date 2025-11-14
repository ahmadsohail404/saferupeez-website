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
   DATA
---------------------------------- */



const gold24 = [
  { date: "7 Nov 25", price: 12400 },
  { date: "8 Nov 25", price: 12450 },
  { date: "9 Nov 25", price: 12510 },
  { date: "10 Nov 25", price: 12580 },
];

const gold22 = [
  { date: "7 Nov 25", price: 11300 },
  { date: "8 Nov 25", price: 11340 },
  { date: "9 Nov 25", price: 11400 },
  { date: "10 Nov 25", price: 11510 },
];

const gold18 = [
  { date: "7 Nov 25", price: 8900 },
  { date: "8 Nov 25", price: 9000 },
  { date: "9 Nov 25", price: 9100 },
  { date: "10 Nov 25", price: 9200 },
];

const weightPriceData = [
  { weight: "1 gm", today: "12,513.18", yesterday: "12,487.23" },
  { weight: "8 gm", today: "1,00,105.44", yesterday: "99,897.84" },
  { weight: "10 gm", today: "1,25,131.80", yesterday: "1,24,872.30" },
  { weight: "12 gm", today: "1,50,158.16", yesterday: "1,49,846.76" },
  { weight: "100 gm", today: "12,51,318.00", yesterday: "12,48,723.00" },
];

const priceHistoryData = [
  { date: "30 Oct'25", gold24k: "1,25,131.80", gold22k: "1,14,708.30", gold18k: "93,848.90" },
  { date: "29 Oct'25", gold24k: "1,24,872.30", gold22k: "1,14,470.40", gold18k: "93,654.20" },
  { date: "28 Oct'25", gold24k: "1,23,505.80", gold22k: "1,13,217.80", gold18k: "92,629.40" },
  { date: "27 Oct'25", gold24k: "1,24,811.20", gold22k: "1,14,414.40", gold18k: "93,608.40" },
  { date: "26 Oct'25", gold24k: "1,27,729.90", gold22k: "1,17,090.00", gold18k: "95,797.40" },
  { date: "25 Oct'25", gold24k: "1,27,729.90", gold22k: "1,17,090.00", gold18k: "95,797.40" },
  { date: "24 Oct'25", gold24k: "1,27,398.90", gold22k: "1,16,786.60", gold18k: "95,549.20" },
  { date: "23 Oct'25", gold24k: "1,28,448.30", gold22k: "1,17,748.60", gold18k: "96,336.20" },
  { date: "22 Oct'25", gold24k: "1,26,696.60", gold22k: "1,16,142.80", gold18k: "95,022.50" },
  { date: "21 Oct'25", gold24k: "1,32,474.50", gold22k: "1,21,439.40", gold18k: "99,355.90" },
  
  
];


export function Gold() {
  const [timePeriod, setTimePeriod] = useState("1W");
  const [purity, setPurity] = useState("24k");
  const [savingPeriod, setSavingPeriod] = useState("Daily");
  const [dailyAmount, setDailyAmount] = useState([50]);
  const [years, setYears] = useState([10]);

  const savedAmount =
    savingPeriod === "Daily"
      ? dailyAmount[0] * 365 * years[0]
      : savingPeriod === "Weekly"
      ? dailyAmount[0] * 52 * years[0]
      : dailyAmount[0] * 12 * years[0];

  const estimatedReturns = Math.round(savedAmount * 0.11 * years[0]);
  const totalSavings = savedAmount + estimatedReturns;

  const savingsChartData = Array.from({ length: years[0] }, (_, i) => ({
    year: `${i + 1}Y`,
    saved: Math.round((savedAmount / years[0]) * (i + 1)),
    returns: Math.round((estimatedReturns / years[0]) * (i + 1)),
  }));
  const chartData =
    purity === "24k" ? gold24 : purity === "22k" ? gold22 : gold18;

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
              className="font-bold border-purple-500 text-green-600 text-sm px-4 py-1 bg-green-50"
            >
              LIVE GOLD PRICES IN INDIA
            </Badge>
          </div>

          <h1 className="font-extrabold text-6xl md:text-6xl text-[#2e1a47] mb-3">
            Today’s Gold Price
          </h1>

          <p className="text-slate-600 text-sm">13 Nov 25, 04:35 pm</p>
        </motion.div>

        {/* GOLD PRICE CARDS */}
        <Card className="bg-white shadow-lg p-6 rounded-2xl min-h-[280px] mb-10 border border-purple-100">

          <p className="text-left text-3xl md:text-1xl font-bold text-black font-semibold text-black-600 mb-4">
            Showing Gold Prices For India
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Each Gold Card */}
            {[
              { karat: "24K", price: "₹132,474.50", gradient: "from-yellow-400 to-amber-500" },
              { karat: "22K", price: "₹121,439.40", gradient: "from-yellow-300 to-amber-400" },
              { karat: "18K", price: "₹99,355.90", gradient: "from-yellow-200 to-amber-300" },
            ].map((item) => (
              <Card
                key={item.karat}
                className="bg-gradient-to-br from-[#fff7e6] to-[#fff1cc] border border-amber-200 p-4 py-6 min-h-[165px] rounded-xl shadow-sm flex flex-col items-center justify-center gap-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow`}>
                  <span className="text-white font-bold">{item.karat}</span>
                </div>

                <p className="text-amber-700 text-xs">{item.karat} Gold / 10gm</p>

                <p className="text-[#2e1a47] font-bold text-2xl md:text-3xl">{item.price}</p>
              </Card>
            ))}

          </div>
        </Card>

        {/* CHART + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* CHART */}
           <Card className="lg:col-span-2 p-6 rounded-2xl min-h-[400px] shadow-md bg-white border border-purple-100">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-3xl md:text-3xl font-bold text-[#2e1a47]">
          Today's Gold Price
        </h3>

        {/* DROPDOWN */}
        <div className="w-[150px]">
          <Select value={purity} onValueChange={setPurity} defaultValue="24k">
            <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="24K Gold"/>
            </SelectTrigger>

            <SelectContent align="end" className="w-[110px] text-xs" defaultValue="24k">
              <SelectItem value="24k">24K Gold</SelectItem>
              <SelectItem value="22k">22K Gold</SelectItem>
              <SelectItem value="18k">18K Gold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-slate-600 mb-4 font-semibold">
        Stay updated with daily price movements and weekly changes.
      </p>

      {/* Gold Buy Rate */}
      <div className="mb-6 p-4 bg-[#fff7e6] rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-600">Live Gold Buy Price</p>
          <p className="text-[#2e1a47] font-bold text-3xl">
            {chartData[chartData.length - 1].price.toLocaleString()}/gm
          </p>
        </div>
        <div className="flex items-center gap-2 text-green-600 text-xs">
          <ArrowUp className="w-4 h-4" />
          <span>4.99%</span>
          <span className="text-slate-500">1 Week Change</span>
        </div>
      </div>

      {/* Chart */}
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
              stroke="#d97706"
              strokeWidth={3}
              dot={{ r: 4, fill: "#d97706" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TABS */}
      <Tabs value={timePeriod} onValueChange={setTimePeriod}>
        <TabsList className="bg-yellow-100 mt-4">
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

            <Card className="bg-gradient-to-br from-yellow-150 to-yellow-200 text-black p-6 rounded-2xl min-h-[200px] shadow-lg">
              <div className="w-16 h-16 mx-auto rounded-xl bg-black/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-7 h-7 text-white border-b " />
              </div>
              <h4 className="text-center text-lg font-semibold">Get alerts when Gold prices drop</h4>
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
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 transition">
      <div className="w-10 h-10 bg-yellow-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Daily</span>
      <span className="text-slate-400">›</span>
    </div>

    {/* Weekly */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 transition">
      <div className="w-10 h-10 bg-yellow-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Weekly</span>
      <span className="text-slate-400">›</span>
    </div>

    {/* Monthly */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 transition">
      <div className="w-10 h-10 bg-yellow-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Monthly</span>
      <span className="text-slate-400">›</span>
    </div>

    {/* Yearly */}
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 transition">
      <div className="w-10 h-10 bg-yellow-200 text-black rounded-lg flex items-center justify-center">
        💰
      </div>
      <span className="flex-1 text-sm">Save Yearly</span>
      <span className="text-slate-400">›</span>
    </div>
  </div>
</Card>

          </div>
        </div>

        {/* GOLD WEIGHT TABLE */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-purple-100 min-h-[280px] mb-10">
          <h3 className="font-semibold text-3xl text-[#2e1a47] mb-2">Gold Price by Weight</h3>
          <p className="text-1xl md:text-1xl font-bold text-black text-slate-600 mb-4">
            See today's updated gold prices.
          </p>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-xs">Weight</TableHead>
                  <TableHead className="text-xs">Price Today (₹)</TableHead>
                  <TableHead className="text-xs">Price Yesterday (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weightPriceData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">{row.weight}</TableCell>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black-700">
                      ₹ {row.today}
                    </TableCell>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">₹ {row.yesterday}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* GOLD PRICE HISTORY */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-purple-100 min-h-[280px] mb-10">
          <h3 className="font-semibold text-3xl text-[#2e1a47] mb-2">Gold Price History</h3>
          <p className="text-1xl md:text-1xl font-bold text-black text-slate-600 mb-4">
            See how gold prices have changed recently.
          </p>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-1xl md:text-1xl font-bold text-black">Date</TableHead>
                  <TableHead className="text-1xl md:text-1xl font-bold text-black">24K Gold</TableHead>
                  <TableHead className="text-1xl md:text-1xl font-bold text-black">22K Gold</TableHead>
                  <TableHead className="text-1xl md:text-1xl font-bold text-black">18K Gold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceHistoryData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">{row.date}</TableCell>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">
                      ₹ {row.gold24k}
                    </TableCell>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">₹ {row.gold22k}</TableCell>
                    <TableCell className="text-1xl md:text-1xl font-bold text-black">₹ {row.gold18k}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* SAVINGS CALCULATOR */}
        <Card className="p-6 rounded-2xl shadow-md bg-white border border-purple-100 min-h-[400px]">
          <h3 className="font-semibold text-3xl text-[#2e1a47] mb-1">Gold Savings Calculator</h3>
          <p className="text-1xl md:text-1xl font-bold text-black text-slate-600 mb-6">
            Estimate your gold savings easily.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* CHART */}
            <Card className="bg-gradient-to-br from-yellow-200 to-yellow-250 text-white p-6 rounded-2xl shadow-md min-h-[320px]">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="140%">
                  <BarChart data={savingsChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#0a0808ff" fontSize={10} />
                    <YAxis stroke="#0a0808ff" fontSize={10} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="saved" fill="#000000ff" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="returns" fill="#5b595fff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* CONTROLS */}
            <div className="space-y-6">

              {/* Tabs */}
              <Tabs value={savingPeriod} onValueChange={setSavingPeriod}>
                <TabsList className="grid grid-cols-3 bg-yellow-100 p-1 rounded-full align-center pt-0 pb-0">
                  {["Daily", "Weekly", "Monthly"].map((p) => (
                    <TabsTrigger
                      key={p}
                      value={p}
                      className="text-xs py-2 rounded-full data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                    >
                      {p}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Daily Amount */}
              <Card className="p-4 bg-yellow-50 rounded-xl">
                <div className="flex justify-between mb-2 text-sm">
                  <label className="text-slate-700">{savingPeriod} Saving Amount</label>
                  <span className="text-black-700 font-bold text-lg">₹{dailyAmount[0]}</span>
                </div>

                <Slider
  value={dailyAmount}
  onValueChange={setDailyAmount}
  min={10}
  max={1000}
  step={10}
  className="h-5 flex items-center"
  thumbClassName="w-5 h-5 #ceab10ff border-2 border-white rounded-full shadow-lg"
  trackClassName="h-2 #ceab10ff rounded-full"
  rangeClassName="#ceab10ff h-2 rounded-full"
/>

              </Card>

              {/* Years */}
              <Card className="p-4 yellow rounded-xl">
                <div className="flex justify-between mb-2 text-sm">
                  <label className="text-slate-700">Time Period</label>
                  <span className="text yellow-700 font-bold text-lg">{years[0]} yrs</span>
                </div>

                <Slider
  value={years}
  onValueChange={setYears}
  min={1}
  max={10}
  step={1}
  className="h-5 flex items-center"
  thumbClassName="w-5 h-5 #d97706-600 border-2 border-white rounded-full shadow-lg"
  trackClassName="h-2 #d97706-200 rounded-full"
  rangeClassName="#d97706-600 h-2 rounded-full"
/>

              </Card>

              {/* Calculated Numbers */}
              <div className="space-y-3 pt-3 border-t">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Saved Amount</span>
                  <span className="text-[#2e1a47] font-bold text-lg">
                    ₹{savedAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Estimated Returns (~11% p.a.)</span>
                  <span className="text-green-700 font-bold text-lg">
                    ₹{estimatedReturns.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold text-black-700 border-t pt-3">
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
