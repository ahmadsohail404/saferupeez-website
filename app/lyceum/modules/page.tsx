// app/lyceum/modules/page.tsx
"use client";

import { useState } from "react";
import { ModuleGrid } from "../components/ModuleGrid";
import { ModuleDetail } from "../components/ModuleDetail";
import { VideoPlayer } from "../components/VideoPlayer";
import { ReadContent } from "../components/ReadContent";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "modules" | "detail" | "videos" | "read"
  >("modules");
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const navigateToModuleDetail = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("detail");
  };

  const navigateToVideos = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("videos");
  };

  const navigateToRead = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage("read");
  };

  const navigateToModules = () => {
    setCurrentPage("modules");
    setSelectedModuleId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Same horizontal container + padding as Navbar & Footer */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
        {currentPage === "modules" && (
          <>
            <div className="mb-8 text-black">
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
