import { ModuleCard } from "./ModuleCard";
import { modules } from "./data/modules";
import { CreateModuleDialog } from "./CreateModuleDialog";


interface ModuleGridProps {
  onViewModule: (moduleId: number) => void;
  onWatchVideos: (moduleId: number) => void;
  onRead: (moduleId: number) => void;
  onCreateModule: (moduleData: any) => void;
}

export function ModuleGrid({ onViewModule, onWatchVideos, onRead,onCreateModule }: ModuleGridProps) {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <CreateModuleDialog onCreateModule={onCreateModule} />
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard 
          key={module.id} 
          module={module}
          onViewModule={() => onViewModule(module.id)}
          onWatchVideos={() => onWatchVideos(module.id)}
          onRead={() => onRead(module.id)}
        />
      ))}
    </div>
    </div>
    
  );
}