// app/lyceum/components/ModuleGrid.tsx
import { ModuleCard } from "./ModuleCard";
import type { LyceumModule } from "@/lib/lyceumSanity";

interface ModuleGridProps {
  modules: LyceumModule[];
  onViewModule: (moduleId: string) => void;
  onWatchVideos: (moduleId: string) => void;
  onRead: (moduleId: string) => void;
  onCreateModule: () => void;
}

export function ModuleGrid({
  modules,
  onViewModule,
  onWatchVideos,
  onRead,
  onCreateModule,
}: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={{
            id: module.id,
            title: module.title,
            description: module.description ?? "",
            chapters: module.chapters,
            imageUrl: module.imageUrl || "/assets/le.jpg",
          }}
          onViewModule={() => onViewModule(module.id)}
          onWatchVideos={() => onWatchVideos(module.id)}
          onRead={() => onRead(module.id)}
        />
      ))}
    </div>
  );
}
