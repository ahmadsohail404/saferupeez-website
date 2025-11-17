import { useState } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { modules } from "./data/modules";
import { ScrollArea } from "./ui/scroll-area";

interface VideoPlayerProps {
  moduleId: string;
  onBack: () => void;
}

export function VideoPlayer({ moduleId, onBack }: VideoPlayerProps) {
  const modulee = modules.find((m) => m.id === Number(moduleId));
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  if (!modulee) {
    return <div>Module not found</div>;
  }

  const selectedChapter = modulee.chapterList[selectedChapterIndex];

  return (
    <div className="text-black">
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6 p-0 text-primary cursor-pointer hover:bg-slate-200"
      >
        ← Back to all video modules
      </Button>

      <div className="mb-6">
        <h2 className="text-black">
          Module {moduleId}. {modulee.title} (video series)
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${
                selectedChapter.videoId || "dQw4w9WgXcQ"
              }`}
              title={selectedChapter.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4">
            <h3 className="mb-2">
              {selectedChapterIndex + 1}. {selectedChapter.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedChapter.description}
            </p>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4 border-b">
              <h3 className="text-sm">Video Playlist</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {modulee.chapterList.length} videos
              </p>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="divide-y">
                {modulee.chapterList.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapterIndex(index)}
                    className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                      selectedChapterIndex === index
                        ? "bg-primary/5 border-l-4 border-primary"
                        : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center ${
                            selectedChapterIndex === index
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <Play className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm mb-1">
                          {index + 1}. {chapter.title}
                        </p>
                        {chapter.duration && (
                          <p className="text-xs text-muted-foreground">
                            {chapter.duration}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
