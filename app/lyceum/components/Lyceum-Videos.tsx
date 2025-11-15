// app/lyceum/components/Videos.tsx
"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card"; // adjust path if needed

const videos = [
  {
    id: 1,
    title: "Impact cost and how it can ruin a trade",
    thumbnail: "/assets/le.jpg",
    href: "/lyceum/videos/impact-cost-futures-trading",
    duration: "14 min",
    level: "Beginner",
    description: "Understand how impact cost affects your trade execution.",
  },
  {
    id: 2,
    title: "5 types of share capital",
    thumbnail: "/assets/le.jpg",
    href: "/lyceum/videos/5-types-of-share-capital",
    duration: "11 min",
    level: "Beginner",
    description: "Learn the different types of share capital used by companies.",
  },
  {
    id: 3,
    title: "How OFS allotment is done",
    thumbnail: "/assets/le.jpg",
    href: "/lyceum/videos/how-ofs-allotment-is-done",
    duration: "9 min",
    level: "Intermediate",
    description: "Step-by-step breakdown of the OFS allotment process.",
  },
  {
    id: 4,
    title: "Building a mutual fund portfolio",
    thumbnail: "/assets/le.jpg",
    href: "/lyceum/videos/building-a-mutual-fund-portfolio",
    duration: "18 min",
    level: "Intermediate",
    description: "Framework to design a balanced mutual fund portfolio.",
  },
];

export default function VideoPlaylist() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-14 md:py-16">
      {/* Background gradients (same style as Hero) */}
      <div className="pointer-events-none absolute top-10 right-4 sm:right-8 md:right-16 h-48 w-48 rounded-full bg-white blur-[100px] sm:h-64 sm:w-64 sm:blur-[120px] md:h-96 md:w-96 md:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-4 sm:left-8 md:left-16 h-48 w-48 rounded-full bg-white-300/40 blur-[100px] sm:h-64 sm:w-64 sm:blur-[120px] md:h-96 md:w-96 md:blur-[140px]" />

      {/* MATCHING HERO MARGINS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-600">
              Learn with videos
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              Videos
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              Bite-sized lessons to help you understand markets, one concept at
              a time.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="group flex h-full min-h-[340px] sm:min-h-[360px] md:min-h-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                  <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <PlayCircle className="mr-1.5 h-4 w-4" />
                    Play video
                  </span>
                </div>
              </div>

              {/* Text + Play link */}
              <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                <div>
                  {/* Level pill */}
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    {video.level} • Video lesson
                  </span>

                  <p className="mt-2 text-[14px] sm:text-sm font-semibold leading-snug text-slate-900 line-clamp-3">
                    {video.title}
                  </p>

                  {video.description && (
                    <p className="mt-2 text-[12px] sm:text-xs leading-snug text-slate-500 line-clamp-4">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={video.href}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <PlayCircle className="mr-1.5 h-4 w-4" />
                    Play
                  </Link>
                  <span className="text-[11px] font-medium text-slate-400">
                    {video.duration}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
