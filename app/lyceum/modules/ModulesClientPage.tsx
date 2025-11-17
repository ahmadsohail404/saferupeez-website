// app/lyceum/modules/ModulesClientPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { ModuleGrid } from "../components/ModuleGrid";
import { ModuleDetail } from "../components/ModuleDetail";
import { VideoPlayer } from "../components/VideoPlayer";
import { ReadContent } from "../components/ReadContent";
import type { LyceumModule } from "@/lib/lyceumSanity";

type PageMode = "modules" | "detail" | "videos" | "read";

interface ModulesClientPageProps {
  modules: LyceumModule[];
}

export default function ModulesClientPage({ modules }: ModulesClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<PageMode>("modules");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // read from query params
  useEffect(() => {
    const modeParam = searchParams.get("mode") as PageMode | null;
    const moduleIdParam = searchParams.get("moduleId");
    const moduleId = moduleIdParam ?? null;

    if (moduleId && ["detail", "videos", "read"].includes(modeParam || "")) {
      setSelectedModuleId(moduleId);
      setCurrentPage(modeParam as PageMode);
    }
  }, [searchParams]);

  const navigateToModuleDetail = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("detail");
    router.push(`/lyceum/modules?mode=detail&moduleId=${moduleId}`);
  };

  const navigateToVideos = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("videos");
    router.push(`/lyceum/modules?mode=videos&moduleId=${moduleId}`);
  };

  const navigateToRead = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("read");
    router.push(`/lyceum/modules?mode=read&moduleId=${moduleId}`);
  };

  const navigateToModules = () => {
    setCurrentPage("modules");
    setSelectedModuleId(null);
    router.push("/lyceum/modules");
  };

  const selectedModule = selectedModuleId
    ? modules.find((m) => m.id === selectedModuleId) ?? null
    : null;

  return (
    <>
      {currentPage === "modules" && (
        <>
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              Lyceum Modules
            </h1>
            <p className="mt-3 max-w-3xl text-lg md:text-xl text-slate-700/90 font-sans leading-relaxed">
              Learn stock market trading and investments from scratch. Topics
              include trading strategies, technical analysis, fundamental
              analysis, risk management, and more. Choose a module to get
              started.
            </p>
          </div>

          <ModuleGrid
            modules={modules}
            onViewModule={navigateToModuleDetail}
            onWatchVideos={navigateToVideos}
            onRead={navigateToRead}
            onCreateModule={() => {}} // you can wire this later
          />
        </>
      )}

      {currentPage === "detail" && selectedModule && (
        <ModuleDetail
          module={selectedModule}
          onBack={navigateToModules}
          onWatchVideos={() => navigateToVideos(selectedModule.id)}
          onRead={() => navigateToRead(selectedModule.id)}
        />
      )}

      {currentPage === "videos" && selectedModuleId && (
        <VideoPlayer moduleId={selectedModuleId} onBack={navigateToModules} />
      )}

      {currentPage === "read" && selectedModule && (
        <ReadContent module={selectedModule} onBack={navigateToModules} />
      )}
    </>
  );
}
