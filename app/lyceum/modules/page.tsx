// app/lyceum/modules/page.tsx
import { fetchLyceumModules, LyceumModule } from "@/lib/lyceumSanity";
import ModulesClientPage from "./ModulesClientPage";

export const revalidate = 60; // revalidate every 60s (optional)

export default async function ModulesPage() {
  const modules: LyceumModule[] = await fetchLyceumModules();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 text-black">
        <ModulesClientPage modules={modules} />
      </main>
    </div>
  );
}
