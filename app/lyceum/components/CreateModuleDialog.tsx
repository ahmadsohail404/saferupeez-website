import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/text-area";
import { Plus, X, Video, Image as ImageIcon, Trash2 } from "lucide-react";
import { Card } from "./ui/card";

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoId?: string;
  videoUrl?: string;
  isUploadedVideo?: boolean;
  duration: string;
  videoFile?: File;
}

interface CreateModuleDialogProps {
  onCreateModule: (module: {
    title: string;
    description: string;
    imageUrl: string;
    chapters: Array<{
      title: string;
      description: string;
      videoId?: string;
      videoUrl?: string;
      isUploadedVideo?: boolean;
      duration: string;
    }>;
  }) => void;
}

export function CreateModuleDialog({ onCreateModule }: CreateModuleDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([{
    id: '1',
    title: '',
    description: '',
    duration: '00:10:00'
  }]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>, chapterId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const duration = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        setChapters(chapters.map(ch => 
          ch.id === chapterId 
            ? { ...ch, videoUrl: url, isUploadedVideo: true, duration, videoFile: file }
            : ch
        ));
        URL.revokeObjectURL(video.src);
      };
      video.src = url;
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUrl("");
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: String(chapters.length + 1),
      title: '',
      description: '',
      duration: '00:10:00'
    };
    setChapters([...chapters, newChapter]);
  };

  const removeChapter = (chapterId: string) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter(ch => ch.id !== chapterId));
    }
  };

  const updateChapter = (chapterId: string, field: string, value: any) => {
    setChapters(chapters.map(ch => 
      ch.id === chapterId ? { ...ch, [field]: value } : ch
    ));
  };

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill in module title and description");
      return;
    }

    if (!imagePreview && !imageUrl) {
      alert("Please upload a module image or provide an image URL");
      return;
    }

    const validChapters = chapters.filter(ch => ch.title);
    
    if (validChapters.length === 0) {
      alert("Please add at least one chapter with a title");
      return;
    }

    const formattedChapters = validChapters.map(ch => {
      const videoId = ch.videoId ? extractVideoId(ch.videoId) : undefined;
      return {
        title: ch.title,
        description: ch.description,
        videoId,
        videoUrl: ch.videoUrl,
        isUploadedVideo: ch.isUploadedVideo,
        duration: ch.duration
      };
    });

    onCreateModule({
      title,
      description,
      imageUrl: imagePreview || imageUrl,
      chapters: formattedChapters
    });

    // Reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setImageFile(null);
    setImagePreview("");
    setChapters([{ id: '1', title: '', description: '', duration: '00:10:00' }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          CREATE MODULE
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Module</DialogTitle>
          <DialogDescription>
            Add a new learning module with multiple chapters and video content.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Module Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Introduction to Cryptocurrency"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Module Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what students will learn in this module..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Module Thumbnail Image *</Label>
            
            {!imagePreview ? (
              <div className="space-y-3">
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or use URL</span>
                  </div>
                </div>
                
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                />
              </div>
            ) : (
              <Card className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4>Chapters</h4>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addChapter}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Chapter
              </Button>
            </div>
            
            <div className="space-y-6">
              {chapters.map((chapter, index) => (
                <Card key={chapter.id} className="p-4 relative">
                  {chapters.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeChapter(chapter.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                  
                  <h5 className="text-sm mb-3">Chapter {index + 1}</h5>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Chapter Title *</Label>
                      <Input
                        placeholder="e.g., What is Blockchain?"
                        value={chapter.title}
                        onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Chapter Description</Label>
                      <Textarea
                        placeholder="Brief description of this chapter..."
                        value={chapter.description}
                        onChange={(e) => updateChapter(chapter.id, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* YouTube Link */}
                      <div className="space-y-2">
                        <Label>YouTube URL</Label>
                        <Input
                          placeholder="https://youtube.com/..."
                          value={chapter.videoId || ''}
                          onChange={(e) => updateChapter(chapter.id, 'videoId', e.target.value)}
                        />
                      </div>

                      {/* Upload Video */}
                      <div className="space-y-2">
                        <Label>Or Upload Video</Label>
                        <div className="border-2 border-dashed rounded-md p-2 text-center hover:border-primary transition-colors">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleVideoUpload(e, chapter.id)}
                            className="hidden"
                            id={`video-upload-${chapter.id}`}
                          />
                          <label htmlFor={`video-upload-${chapter.id}`} className="cursor-pointer">
                            <div className="flex items-center justify-center gap-2 text-xs">
                              <Video className="h-4 w-4 text-primary" />
                              <span>{chapter.videoUrl ? 'Change Video' : 'Upload'}</span>
                            </div>
                          </label>
                        </div>
                        {chapter.videoUrl && (
                          <p className="text-xs text-green-600">✓ Video uploaded</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={chapter.duration}
                        onChange={(e) => updateChapter(chapter.id, 'duration', e.target.value)}
                        placeholder="00:15:30"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {/* <Button onClick={handleSubmit} className="bg-gray-900 hover:bg-gray-800">
            Create Module
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}