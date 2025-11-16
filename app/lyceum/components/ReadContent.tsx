"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { modules } from "./data/modules";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface ReadContentProps {
  moduleId: number;
  onBack: () => void;
}

export function ReadContent({ moduleId, onBack }: ReadContentProps) {
  const modulee = modules.find((m) => m.id === moduleId);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  if (!modulee) {
    return <div>Module not found</div>;
  }

  const selectedChapter = modulee.chapterList[selectedChapterIndex];

  const goToPrevious = () => {
    if (selectedChapterIndex > 0) {
      setSelectedChapterIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (selectedChapterIndex < modulee.chapterList.length - 1) {
      setSelectedChapterIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back link – aligned with navbar/footer because parent <main> is the container */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-2 px-0 text-primary cursor-pointer hover:bg-slate-100"
      >
        ← Back to all modules
      </Button>

      {/* Page header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          {modulee.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Top tags</span>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10"
          >
            #personal finance
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10"
          >
            #IPO
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10"
          >
            #News
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10"
          >
            #lyceum news
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10"
          >
            #trading
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10"
          >
            #stocks
          </Badge>
        </div>
      </div>

      {/* MAIN LAYOUT: TOC (left) + Content (right) */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* LEFT: Table of Contents */}
        <aside className="lg:col-span-3">
          <div className="border rounded-xl bg-white shadow-sm overflow-hidden lg:sticky lg:top-24">
            <div className="bg-muted/60 px-4 py-3 border-b">
              <h3 className="text-sm font-medium text-slate-800">
                Table of Contents
              </h3>
            </div>

            <ScrollArea className="h-[460px]">
              <div className="divide-y">
                {modulee.chapterList.map((chapter, index) => {
                  const isActive = selectedChapterIndex === index;
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapterIndex(index)}
                      className={[
                        "w-full text-left px-4 py-3 text-sm transition-colors",
                        isActive
                          ? "bg-primary/5 border-l-4 border-primary text-slate-900"
                          : "hover:bg-muted/40 text-slate-700",
                      ].join(" ")}
                    >
                      {index + 1}. {chapter.title}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* RIGHT: Summary card + full chapter content */}
        <section className="lg:col-span-9 space-y-6">
          {/* Summary card */}
          <div className="rounded-2xl border border-slate-200 bg-white/95 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-xl">
            <div className="p-5">
              <div className="flex gap-5">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
                    <div className="text-3xl md:text-4xl">
                      {selectedChapterIndex % 4 === 0
                        ? "📊"
                        : selectedChapterIndex % 4 === 1
                        ? "📝"
                        : selectedChapterIndex % 4 === 2
                        ? "💰"
                        : "📈"}
                    </div>
                  </div>
                </div>

                {/* Summary text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {selectedChapter.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                    {selectedChapter.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-[11px] font-semibold">
                        DM
                      </div>

                      <p className="text-xs text-gray-900">
                        Dharmendra Maurya{" "}
                        <span className="text-muted-foreground">
                          – Co-founder, freefincli – NRI Banking &amp; Wealth
                          Platform
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{Math.floor(Math.random() * 5) + 1}</span>
                      </div>
                      <span>05 Jul 2025</span>
                    </div>
                  </div>
                </div>

                {/* Chevron */}
                <div className="hidden sm:flex items-center pl-2">
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Full chapter content */}
          <div className="rounded-2xl border border-slate-200 bg-white/95 shadow-md backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-xl">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">
                Chapter {selectedChapterIndex + 1} of{" "}
                {modulee.chapterList.length}
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-primary">
                {selectedChapter.title}
              </h2>
            </div>

            <div className="prose prose-slate max-w-none">
              {selectedChapter.content ? (
                selectedChapter.content
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 text-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))
              ) : (
                <p className="text-muted-foreground">
                  {selectedChapter.description}
                </p>
              )}
            </div>

            {/* Prev / Next */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={selectedChapterIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                {selectedChapterIndex + 1} / {modulee.chapterList.length}
              </span>

              <Button
                variant="outline"
                onClick={goToNext}
                disabled={
                  selectedChapterIndex === modulee.chapterList.length - 1
                }
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
