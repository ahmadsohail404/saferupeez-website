"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";

/** iOS-style status bar time (HH:MM, no AM/PM). Pass tz to force a zone, e.g. "Asia/Kolkata". */
function StatusTime({ tz }: { tz?: string }) {
  const format = () => {
    const raw = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: tz,
    }).format(new Date());
    return raw.replace(/\s?(AM|PM)$/i, ""); // strip AM/PM like iOS status bar
  };

  const [t, setT] = useState(format());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // align first update to the next minute boundary, then tick every 60s
    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeoutId = window.setTimeout(() => {
      setT(format());
      intervalRef.current = window.setInterval(() => setT(format()), 60_000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [tz]);

  return <>{t}</>;
}

export function PhoneSimulator() {
  return (
    <div className="relative flex justify-center">
      {/* Outer Shadow Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 to-amber-200/40 blur-2xl sm:blur-3xl rounded-[2rem] sm:rounded-[3rem] -z-10" />

      {/* iPhone 15 Frame - Optimized for laptop screens */}
      <div className="relative mx-auto w-[360px] h-[510px] sm:h-[620px] md:h-[670px] lg:h-[690px] xl:h-[710px] rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] bg-gradient-to-br from-gray-900 to-gray-800 p-[8px] sm:p-[10px] md:p-[12px] shadow-[0_0_20px_rgba(0,0,0,0.3)] sm:shadow-[0_0_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-700/60">
        {/* Inner metallic ring */}
        <div className="absolute inset-[2px] rounded-[2.3rem] sm:rounded-[3.1rem] md:rounded-[3.3rem] bg-gradient-to-br from-gray-700 to-gray-900"></div>

        {/* Screen */}
        <div className="relative z-10 w-full h-full rounded-[2rem] sm:rounded-[2.8rem] md:rounded-[3rem] bg-gradient-to-b from-purple-50 via-white to-amber-50/50 overflow-hidden">
          {/* Dynamic Island - Perfect proportions */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[90px] h-[22px] sm:w-[110px] sm:h-[24px] md:w-[118px] md:h-[25px] rounded-full bg-black/95 shadow-[inset_0_0_6px_rgba(255,255,255,0.06)] border border-black"></div>

          {/* ===== iPhone 15 Accurate Status Bar ===== */}
          <div className="absolute top-0 left-0 right-0 pt-[8px] sm:pt-[10px] md:pt-[12px] px-4 sm:px-5 md:px-6">
            <div className="flex items-center justify-between text-gray-900">
              {/* Time (left) */}
              <span className="text-[12px] sm:text-[13px] md:text-[14px] ml-3 sm:ml-3.5 md:ml-4 font-semibold tracking-tight">
                <StatusTime /* tz="Asia/Kolkata" */ />
              </span>

              {/* Indicators (right): Cellular, Wi-Fi, Battery */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                {/* Cellular bars */}
                <div
                  className="flex items-end gap-[1px] sm:gap-[2px]"
                  aria-label="cellular"
                >
                  <span className="block w-[2.5px] h-[5px] sm:w-[3px] sm:h-[6px] md:w-[3.5px] md:h-[7px] rounded-[1px] bg-gray-900/80" />
                  <span className="block w-[2.5px] h-[7px] sm:w-[3px] sm:h-[8px] md:w-[3.5px] md:h-[9px] rounded-[1px] bg-gray-900/85" />
                  <span className="block w-[2.5px] h-[9px] sm:w-[3px] sm:h-[10px] md:w-[3.5px] md:h-[11px] rounded-[1px] bg-gray-900/90" />
                  <span className="block w-[2.5px] h-[11px] sm:w-[3px] sm:h-[12px] md:w-[3.5px] md:h-[13px] rounded-[1px] bg-gray-900" />
                </div>

                {/* Battery with cap (iOS shape) */}
                <div
                  className="relative flex items-center mr-3 sm:mr-3.5 md:mr-4"
                  aria-label="battery"
                >
                  <div className="relative w-[22px] h-[11px] sm:w-[24px] sm:h-[12px] md:w-[26px] md:h-[13px] rounded-[2.5px] sm:rounded-[3px] border border-gray-900">
                    <div
                      className="absolute top-[1px] bottom-[1px] left-[1px] rounded-[1.5px] sm:rounded-[2px] bg-gray-900"
                      style={{
                        right: "4px",
                      }}
                    />
                  </div>
                  <div className="ml-[1.5px] sm:ml-[2px] w-[1.5px] h-[7px] sm:w-[2px] sm:h-[8px] md:w-[2.5px] md:h-[9px] rounded-[1px] bg-gray-900" />
                </div>
              </div>
            </div>
          </div>
          {/* ===== /Status Bar ===== */}

          {/* App Header */}
          <div className="px-5 sm:px-6 md:px-7 pt-12 sm:pt-14 md:pt-16">
            <h3 className="text-gray-900 mb-1 font-semibold text-sm sm:text-base md:text-lg">
              Today's Insights
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Live precious metal rates
            </p>
          </div>

          {/* Content */}
          <div className="px-5 sm:px-6 md:px-7 space-y-4 sm:space-y-5 md:space-y-6 pb-6 sm:pb-8 md:pb-10 pt-4 sm:pt-5 md:pt-6">
            {/* Gold Card */}
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
              <CardContent className="p-4 sm:p-5 md:p-6 relative">
                <div className="absolute top-0 right-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-amber-200/20 rounded-full -mr-14 sm:-mr-16 md:-mr-18 -mt-14 sm:-mt-16 md:-mt-18" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5">
                    <div>
                      <div className="text-gray-600 mb-1 text-sm sm:text-base">
                        Gold (24K)
                      </div>
                      <div className="text-gray-900 font-medium text-base sm:text-lg md:text-xl">
                        ₹6,245/gm
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>2.4%</span>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="flex items-end gap-1 h-10 sm:h-12 md:h-14 mb-3 sm:mb-4 md:mb-5">
                    {[40, 55, 45, 60, 50, 70, 65, 75, 70, 80, 75, 85].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-amber-400 to-amber-300 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Your Holdings: 12.5g</span>
                    <span className="text-purple-600">₹78,062</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Silver Card */}
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
              <CardContent className="p-4 sm:p-5 md:p-6 relative">
                <div className="absolute top-0 right-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gray-200/20 rounded-full -mr-14 sm:-mr-16 md:-mr-18 -mt-14 sm:-mt-16 md:-mt-18" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5">
                    <div>
                      <div className="text-gray-600 mb-1 text-sm sm:text-base">
                        Silver
                      </div>
                      <div className="text-gray-900 font-medium text-base sm:text-lg md:text-xl">
                        ₹78.50/gm
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm">
                      <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>0.8%</span>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="flex items-end gap-1 h-10 sm:h-12 md:h-14 mb-3 sm:mb-4 md:mb-5">
                    {[70, 65, 75, 70, 60, 55, 60, 50, 55, 45, 50, 40].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Your Holdings: 250g</span>
                    <span className="text-purple-600">₹19,625</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom home indicator */}
        <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-1 sm:h-1.5 bg-gray-700/90 rounded-full" />
      </div>
    </div>
  );
}

export default PhoneSimulator;
