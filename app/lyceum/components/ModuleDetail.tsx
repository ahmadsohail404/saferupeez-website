import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, PlayCircle, FileText} from "lucide-react";
import { modules } from "./data/modules";

interface ModuleDetailProps {
  moduleId: number;
  onBack: () => void;
  onWatchVideos: () => void;
  onRead: () => void;
}

export function ModuleDetail({ moduleId, onBack, onWatchVideos, onRead }: ModuleDetailProps) {
  const modulee = modules.find(m => m.id === moduleId);

  if (!modulee) {
    return <div>Module not found</div>;
  }

  return (
    <div className="max-w-4xl text-black">
     <Button variant="outine" onClick={onBack} className="mb-6 p-0 text-primary cursor-pointer hover:bg-slate-200" >

        <ArrowLeft className="mr-2 h-4 w-4 " />
        Back to all modules
      </Button>

      <div className="mb-8">
        <h1 className="text-primary mb-4">{modulee.title}</h1>
        <p className="text-muted-foreground mb-6">
          {modulee.description}
        </p>
        <div className="flex gap-3">
          <Button onClick={onWatchVideos} className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Watch videos
          </Button>
          <Button onClick={onRead} variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Blog
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {modulee.chapterList.map((chapter, index) => (
          <Card key={chapter.id} className="group flex  flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl"
>
            <CardHeader>
              <CardTitle className="text-lg">
                {index + 1}. {chapter.title}
              </CardTitle>
              <CardDescription>
                {chapter.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onWatchVideos}
                  className="gap-2"
                >
                  <PlayCircle className="h-4 w-4" />
                  Watch
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onRead}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Blog
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
