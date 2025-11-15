// app/components/RecentComments.tsx
"use client";

import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

/** Dummy Data — replace with API later */
const comments = [
  {
    id: 455,
    name: "Sita Ram",
    article: "The Mutual Fund Portfolio",
    excerpt:
      "Thank you for curating structured content. I am planning a 3-fund portfolio and have a couple of queries...",
    date: "14 Nov 2025",
  },
  {
    id: 103,
    name: "Prasad Kumar",
    article: "Ideas by the lake",
    excerpt:
      "Loved the content! Very clear and kid-friendly. A little more expression in the voiceover would make it perfect...",
    date: "14 Nov 2025",
  },
  {
    id: 149,
    name: "Nitish Kumar",
    article: "Measuring Mutual Fund Returns",
    excerpt:
      "Following you since FA module days. Is small-cap investing good for a 20–25 year horizon?",
    date: "14 Nov 2025",
  },
  {
    id: 1177,
    name: "Harsh",
    article: "Volatility & Normal Distribution",
    excerpt: "As it is daily returns, assume it as number of days...",
    date: "14 Nov 2025",
  },
  {
    id: 1320,
    name: "Aman Jaiswal",
    article: "Multiple Candlestick Patterns (Part 1)",
    excerpt:
      "What if a Doji appears after a bullish engulfing pattern? How should a trader react?",
    date: "14 Nov 2025",
  },
];

export default function RecentComments() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 md:pt-16 pb-10 sm:pb-14 md:pb-16">
      {/* Background blurry glows (same as HERO / VIDEOS) */}
      <div className="absolute top-10 right-8 h-64 w-64 rounded-full bg-white-300/40 blur-[130px]" />
      <div className="absolute bottom-10 left-8 h-64 w-64 rounded-full bg-white-300/40 blur-[130px]" />

      {/* MATCHING HERO / VIDEOS MARGINS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-600">
            Community Feedback
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">
            Recent Comments
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            What learners are discussing across Lyceum.
          </p>
        </div>

        {/* Comments container */}
        <Card className="rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-xl backdrop-blur-md">
          {comments.map((c) => (
            <div
              key={c.id}
              className="group relative mb-1 rounded-xl border-b border-slate-200/70 last:mb-0 last:border-b-0 p-4 sm:p-5 transition-all duration-200 hover:-translate-y-[1px] hover:bg-gradient-to-r hover:from-purple-50/90 hover:via-white hover:to-amber-50/90 hover:shadow-md"
            >
              {/* Accent bar on hover */}
              <div className="pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-gradient-to-b from-amber-500 to-amber-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3 pl-2">
                <div className="flex-1">
                  {/* Name + ID Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[13px] sm:text-sm font-semibold text-gray-900">
                      {c.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-purple-100 text-purple-700"
                    >
                      #{c.id}
                    </Badge>
                  </div>

                  {/* Article link */}
                  <Link
                    href="#"
                    className="mt-0.5 inline-block text-[11px] font-medium text-blue-600 hover:underline"
                  >
                    on {c.article}
                  </Link>

                  {/* Excerpt (bolder) */}
                  <p className="mt-2 text-[13px] sm:text-sm font-medium text-gray-800 leading-snug">
                    {c.excerpt}
                  </p>

                  {/* Date */}
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
                    {c.date}
                  </p>
                </div>

                {/* Icon bubble */}
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-100 bg-purple-50 text-purple-500 transition-all duration-200 group-hover:bg-purple-100 group-hover:text-purple-700 group-hover:shadow-sm">
                  <MessageCircle className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}
