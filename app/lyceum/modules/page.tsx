// app/lyceum/modules/page.tsx
"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ModuleGrid } from "../components/ModuleGrid";
import { ModuleDetail } from "../components/ModuleDetail";
import { VideoPlayer } from "../components/VideoPlayer";
import { ReadContent } from "../components/ReadContent";

type PageMode = "modules" | "detail" | "videos" | "read";

export default function ModulesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 text-black">
            <div className="animate-pulse space-y-4">
              <div className="h-10 w-64 bg-slate-200 rounded" />
              <div className="h-5 w-full max-w-xl bg-slate-200 rounded" />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-40 bg-slate-200 rounded-xl" />
                <div className="h-40 bg-slate-200 rounded-xl" />
                <div className="h-40 bg-slate-200 rounded-xl" />
              </div>
            </div>
          </main>
        </div>
      }
    >
      <ModulesPageInner />
    </Suspense>
  );
}

function ModulesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ---- derive initial state from URL once ----
  const modeParam = searchParams.get("mode") as PageMode | null;
  const moduleIdParam = searchParams.get("moduleId");
  const parsedModuleId = moduleIdParam ? Number(moduleIdParam) : null;

  const hasValidDeepLink =
    !!parsedModuleId && ["detail", "videos", "read"].includes(modeParam || "");

  const [currentPage, setCurrentPage] = useState<PageMode>(
    hasValidDeepLink ? (modeParam as PageMode) : "modules"
  );

  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(
    hasValidDeepLink ? parsedModuleId : null
  );

  // ---- navigation helpers ----
  const navigateToModuleDetail = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("detail");
    router.push(`/lyceum/modules?mode=detail&moduleId=${moduleId}`);
  };

  const navigateToVideos = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("videos");
    router.push(`/lyceum/modules?mode=videos&moduleId=${moduleId}`);
  };

  const navigateToRead = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("read");
    router.push(`/lyceum/modules?mode=read&moduleId=${moduleId}`);
  };

  const navigateToModules = () => {
    setCurrentPage("modules");
    setSelectedModuleId(null);
    router.push("/lyceum/modules");
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 text-black">
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
              onViewModule={navigateToModuleDetail}
              onWatchVideos={navigateToVideos}
              onRead={navigateToRead}
              onCreateModule={navigateToRead}
            />
          </>
        )}

        {currentPage === "detail" && selectedModuleId && (
          <ModuleDetail
            moduleId={selectedModuleId}
            onBack={navigateToModules}
            onWatchVideos={() => navigateToVideos(selectedModuleId)}
            onRead={() => navigateToRead(selectedModuleId)}
          />
        )}

        {currentPage === "videos" && selectedModuleId && (
          <VideoPlayer moduleId={selectedModuleId} onBack={navigateToModules} />
        )}

        {currentPage === "read" && selectedModuleId && (
          <ReadContent moduleId={selectedModuleId} onBack={navigateToModules} />
        )}
      </main>
    </div>
  );
}
