// app/lyceum/components/ModuleDetail.tsx
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ArrowLeft, PlayCircle, FileText } from "lucide-react";
import { modules } from "./data/modules";

interface ModuleDetailProps {
  moduleId: number;
  onBack: () => void;
  onWatchVideos: () => void;
  onRead: () => void;
}

export function ModuleDetail({
  moduleId,
  onBack,
  onWatchVideos,
  onRead,
}: ModuleDetailProps) {
  const modulee = modules.find((m) => m.id === moduleId);

  if (!modulee) {
    return <div className="text-slate-900">Module not found</div>;
  }

  const [activeVideoChapterId, setActiveVideoChapterId] = useState<number | null>(
    modulee.chapterList[0]?.id ?? null
  );

  const activeVideoChapter = modulee.chapterList.find(
    (c) => c.id === activeVideoChapterId
  );

  return (
    <div className="w-full text-slate-900">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mt-0 mb-6 p-0 text-primary cursor-pointer hover:bg-slate-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all modules
      </Button>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          {modulee.title}
        </h1>
        <p className="text-sm md:text-base text-slate-600">
          {modulee.description}
        </p>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        {/* -------- BLACK GLASS TABS (big size, no background rail) -------- */}
        <TabsList
          className="
            mb-16
            flex
            w-full max-w-8xl
            mx-auto
            gap-3
            bg-transparent
            p-0
            border-0
            shadow-none 
            mt-3
          "
        >
          <TabsTrigger
            value="videos"
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              gap-2
              h-16 sm:h-20
              px-6 sm:px-8
              rounded-[999px]
              text-sm sm:text-lg
              font-semibold
              tracking-tight

              bg-black/40
              text-white/80
              border border-white/15
              backdrop-blur-xl
              shadow-[0_14px_32px_rgba(15,23,42,0.55)]

              transition-all
              duration-200
              cursor-pointer

              hover:bg-black/70
              hover:text-white

              data-[state=active]:bg-black
              data-[state=active]:text-white
              data-[state=active]:border-white/35
              data-[state=active]:shadow-[0_20px_50px_rgba(15,23,42,0.8)]
            "
          >
            <PlayCircle className="h-5 w-5" />
            <span>Watch videos</span>
          </TabsTrigger>

          <TabsTrigger
            value="read"
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              gap-2
              h-16 sm:h-20
              px-6 sm:px-8
              rounded-[999px]
              text-sm sm:text-lg
              font-semibold
              tracking-tight

              bg-black/40
              text-white/80
              border border-white/15
              backdrop-blur-xl
              shadow-[0_14px_32px_rgba(15,23,42,0.55)]

              transition-all
              duration-200
              cursor-pointer

              hover:bg-black/70
              hover:text-white

              data-[state=active]:bg-black
              data-[state=active]:text-white
              data-[state=active]:border-white/35
              data-[state=active]:shadow-[0_20px_50px_rgba(15,23,42,0.8)]
            "
          >
            <FileText className="h-5 w-5" />
            <span>Read module</span>
          </TabsTrigger>
        </TabsList>
        {/* -------- /BLACK GLASS TABS -------- */}

        {/* WATCH VIDEOS TAB */}
        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            {/* LEFT: Chapter list */}
            <div className="space-y-4">
              {modulee.chapterList.map((chapter, index) => {
                const isActive = chapter.id === activeVideoChapterId;
                return (
                  <Card
                    key={chapter.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveVideoChapterId(chapter.id)}
                    className={`group flex flex-col overflow-hidden rounded-2xl border bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl cursor-pointer ${
                      isActive
                        ? "border-blue-500/80 shadow-blue-200"
                        : "border-slate-200"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {index + 1}. {chapter.title}
                      </CardTitle>
                      <CardDescription>{chapter.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideoChapterId(chapter.id);
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <PlayCircle className="h-4 w-4" />
                          {isActive ? "Playing" : "Watch"}
                        </Button>
                        {chapter.duration && (
                          <span className="text-xs text-slate-500">
                            {chapter.duration}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* RIGHT: Video player */}
            <Card className="border border-slate-200 bg-white/90 shadow-md sticky top-24">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  {activeVideoChapter
                    ? activeVideoChapter.title
                    : "Select a chapter to start watching"}
                </CardTitle>
                {activeVideoChapter?.duration && (
                  <CardDescription>
                    Duration: {activeVideoChapter.duration}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-black/90">
                  {activeVideoChapter?.videoId ? (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${activeVideoChapter.videoId}`}
                      title={activeVideoChapter.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-200">
                      No video available for this chapter. Please select
                      another.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* READ MODULE TAB */}
        <TabsContent value="read" className="space-y-4">
          <div className="space-y-4">
            {modulee.chapterList.map((chapter, index) => (
              <Card
                key={chapter.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle className="text-lg">
                    {index + 1}. {chapter.title}
                  </CardTitle>
                  <CardDescription>{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={onRead}
                      className="gap-2 cursor-pointer"
                    >
                      <FileText className="h-4 w-4" />
                      Read the full Blog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
