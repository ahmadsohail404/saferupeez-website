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
setSelectedChapterIndex(selectedChapterIndex - 1);
}
};

const goToNext = () => {
if (selectedChapterIndex < modulee.chapterList.length - 1) {
setSelectedChapterIndex(selectedChapterIndex + 1);
}
};

return (
<div className="max-w-4xl mx-auto">
<Button variant="outine" onClick={onBack} className="mb-6 p-0 text-primary cursor-pointer hover:bg-slate-200" >
← Back to all modules
</Button>

  {/* Page header to match screenshot */}
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl text-gray-900 mb-3">
      {modulee.title}
    </h1>

    {/* Top tags, optional */}
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Top tags</span>
      <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">#personal finance</Badge>
      <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">#IPO</Badge>
      <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">#News</Badge>
      <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">#lyceum news</Badge>
      <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">#trading</Badge>
      <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">#stocks</Badge>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Table of Contents Sidebar (unchanged logic; light style polish) */}
    <div className="lg:col-span-1 order-2 lg:order-1">
      <div className="border rounded-lg overflow-hidden lg:sticky lg:top-24">
        <div className="bg-muted/60 p-4 border-b">
          <h3 className="text-sm">Table of Contents</h3>
        </div>
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            {modulee.chapterList.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapterIndex(index)}
                className={[
                  "w-full text-left p-4 hover:bg-muted/50 transition-colors",
                  selectedChapterIndex === index ? "bg-primary/5 border-l-4 border-primary" : "",
                ].join(" ")}
              >
                <p className="text-sm">
                  {index + 1}. {chapter.title}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>

    {/* Content Area (unchanged logic; layout tuned to screenshot) */}
    <div className="lg:col-span-3 order-1 lg:order-2">
      {/* Each chapter row like a card from the screenshot */}
      <div className="space-y-5">
        {/* Active chapter as the top “card” */}
        <div className="group flex rounded-xl border border-gray-200/60 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl">
          <div className="p-5">
            <div className="flex gap-5">
              {/* Pastel thumbnail */}
              <div className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32">
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
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

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <h3 className="text-lg md:text-xl text-gray-900 mb-2">
                    {selectedChapter.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                    {selectedChapter.description}
                  </p>
                </div>

                {/* Author/meta row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-[10px] font-medium">
                      DM
                    </div>
                    <p className="text-xs text-gray-900">
                      Dharmendra Maurya
                      <span className="text-muted-foreground">
                        {" "}-  Co-founder, freefincli - NRI Banking & Wealth Platform
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
              <div className="hidden sm:flex items-center">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Full chapter content block below the card (your original rendering) */}
        <div className="bg-white border rounded-lg p-8  border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl ">

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Chapter {selectedChapterIndex + 1} of {modulee.chapterList.length}
            </p>
            <h1 className="text-primary mb-4">
              {selectedChapter.title}
            </h1>
          </div>

          <div className="prose prose-slate max-w-none">
            {selectedChapter.content ? (
              selectedChapter.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">
                {selectedChapter.description}
              </p>
            )}
          </div>

          {/* Navigation Buttons (unchanged logic) */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
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
              disabled={selectedChapterIndex === modulee.chapterList.length - 1}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
}