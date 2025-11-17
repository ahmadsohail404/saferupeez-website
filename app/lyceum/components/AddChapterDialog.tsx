import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/text-area";
import { Plus, Video } from "lucide-react";
//Chapters
interface AddChapterDialogProps {
  onAddChapter: (chapter: {
    title: string;
    description: string;
    videoId?: string;
    videoUrl?: string;
    isUploadedVideo?: boolean;
    duration: string;
  }) => void;
}

export function AddChapterDialog({ onAddChapter }: AddChapterDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [duration, setDuration] = useState("00:10:00");

  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);

      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        setDuration(
          `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );
        URL.revokeObjectURL(video.src);
      };
      video.src = url;
    }
  };

  const handleSubmit = () => {
    if (!title) {
      alert("Please provide a chapter title");
      return;
    }

    if (!youtubeUrl && !videoFile) {
      alert("Please provide a YouTube URL or upload a video");
      return;
    }

    const videoId = youtubeUrl ? extractVideoId(youtubeUrl) : undefined;

    onAddChapter({
      title,
      description,
      videoId,
      videoUrl: videoFile ? videoPreview : undefined,
      isUploadedVideo: !!videoFile,
      duration,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setYoutubeUrl("");
    setVideoFile(null);
    setVideoPreview("");
    setDuration("00:10:00");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
          <DialogDescription>
            Add a new chapter to this module with video content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="chapterTitle">Chapter Title *</Label>
            <Input
              id="chapterTitle"
              placeholder="e.g., Advanced Trading Strategies"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapterDescription">Chapter Description</Label>
            <Textarea
              id="chapterDescription"
              placeholder="Brief description of this chapter..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <Label>Video Source</Label>

            <div className="space-y-2">
              <Label
                htmlFor="youtubeUrl"
                className="text-sm text-muted-foreground"
              >
                YouTube URL
              </Label>
              <Input
                id="youtubeUrl"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Upload Video File
              </Label>
              {!videoPreview ? (
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Video className="h-8 w-8 text-primary" />
                      <p className="text-sm">
                        <span className="text-primary">
                          Click to upload video
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, WebM, MOV up to 100MB
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="border rounded-lg p-2">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-32 rounded bg-black"
                  />
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Video uploaded successfully
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="00:15:30"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gray-900 hover:bg-gray-800"
          >
            Add Chapter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
