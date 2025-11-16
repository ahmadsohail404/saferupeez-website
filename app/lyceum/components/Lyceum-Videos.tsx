// app/lyceum/components/Lyceum-Videos.tsx
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { fetchLyceumModules } from "@/lib/lyceumSanity"; // 👈 Sanity fetch

export default async function VideoPlaylist() {
  // 1) Fetch modules from Sanity
  const modules = await fetchLyceumModules();

  // 2) Take only first 4 modules for this section
  const featured = modules.slice(0, 4);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14 md:py-16">
      {/* Background gradients */}
      <div className="pointer-events-none absolute top-10 right-4 sm:right-8 md:right-16 h-48 w-48 rounded-full bg-white blur-[100px] sm:h-64 sm:w-64 sm:blur-[120px] md:h-96 md:w-96 md:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-4 sm:left-8 md:left-16 h-48 w-48 rounded-full bg-white/60 blur-[100px] sm:h-64 sm:w-64 sm:blur-[120px] md:h-96 md:w-96 md:blur-[140px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-600">
              Learn with videos
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              Videos
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              Bite-sized lessons to help you understand markets, one concept at
              a time.
            </p>
          </div>
        </div>

        {/* Cards – first 4 modules from Sanity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featured.map((module) => (
            <Link
              key={module.id}
              href={`/lyceum/modules?mode=detail&moduleId=${module.id}`}
              className="group"
            >
              <Card
                className="group flex h-full min-h-[340px] sm:min-h-[360px] md:min-h-[400px] flex-col overflow-hidden 
                  rounded-2xl border border-slate-200 bg-white/90 shadow-md backdrop-blur-sm 
                  transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-xl cursor-pointer"
              >
                {/* Thumbnail from Sanity */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={module.imageUrl || "/assets/le.jpg"} // 👈 coverImage from Sanity or fallback
                    alt={module.title}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* Text + Play button */}
                <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                  <div>
                    <p className="mt-2 text-[14px] sm:text-sm font-semibold leading-snug text-slate-900 line-clamp-2">
                      {module.title}
                    </p>

                    {module.description && (
                      <p className="mt-2 text-[12px] sm:text-xs leading-snug text-slate-500 line-clamp-4">
                        {module.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-black 
                        px-4 py-2 text-sm font-medium text-white 
                        cursor-pointer transition-colors group-hover:bg-black/90"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Play
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
