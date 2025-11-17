// app/lyceum/components/ModuleCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "./fallback/ImageWithFallback";

interface Module {
  id: string;
  title: string;
  description: string;
  chapters: number;
  imageUrl?: string;
}

interface ModuleCardProps {
  module: Module;
  onViewModule: () => void;
  onWatchVideos: () => void;
  onRead: () => void;
}

export function ModuleCard({ module, onViewModule }: ModuleCardProps) {
  return (
    <Card className="group flex h-full min-h-[340px] sm:min-h-[360px] md:min-h-[440px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl">
      <div className="aspect-video w-full overflow-hidden">
        <ImageWithFallback
          src={module.imageUrl || "/assets/le.jpg"}   // 👈 from Sanity or fallback
          alt={module.title}
          className="w-full h-full object-cover text-black"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-black">{module.title}</CardTitle>
        <CardDescription className="text-sm text-slate-700">
          {module.chapters} chapters
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-slate-700">{module.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          onClick={onViewModule}
          className="w-full text-white cursor-pointer"
          variant="default"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          View module
        </Button>
      </CardFooter>
    </Card>
  );
}
