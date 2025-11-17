// app/lyceum/modules/page.tsx
import { Suspense } from "react";
import { fetchLyceumModules, LyceumModule } from "@/lib/lyceumSanity";
import ModulesClientPage from "./ModulesClientPage";

export const revalidate = 60;

export default async function ModulesPage() {
  const modules: LyceumModule[] = await fetchLyceumModules();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 text-black">
        <Suspense fallback={<div>Loading modules...</div>}>
          <ModulesClientPage modules={modules} />
        </Suspense>
      </main>
    </div>
  );
}
