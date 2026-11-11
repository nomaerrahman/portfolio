import Image from "next/image";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Cover art for a project.
 * - With a cover image: the image sits in a light "figure" frame on the project's
 *   gradient, bleeding off the bottom edge like a product shot.
 * - Without one: a generative gradient with the project name as a wordmark, and a
 *   mini browser bar for web projects.
 * Hover motion is transform-only and driven by the parent `.group`.
 */
export function ProjectCover({
  project,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority,
  label = true,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: boolean;
}) {
  const [a, b] = project.palette;
  const isWeb = project.categories.includes("Full-Stack / Web") || project.categories.includes("Client Work");

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-[-12%] -z-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        style={{
          background: `radial-gradient(60% 70% at 18% 20%, hsl(${a} 80% 56% / .75), transparent 60%),
             radial-gradient(55% 60% at 85% 80%, hsl(${b} 80% 55% / .65), transparent 60%),
             hsl(${a} 28% 9%)`,
        }}
      />
      <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-30 mix-blend-overlay" viewBox="0 0 400 240" preserveAspectRatio="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M -10 ${40 + i * 24} C 100 ${10 + i * 24}, 260 ${80 + i * 22}, 410 ${30 + i * 26}`} fill="none" stroke="white" strokeWidth="0.6" />
        ))}
      </svg>

      {label && (
        <span className="absolute left-4 top-3.5 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
          {project.date.slice(0, 4)} · {project.format}
        </span>
      )}

      {project.cover ? (
        <div className="absolute inset-x-[7%] bottom-0 top-[18%] overflow-hidden rounded-t-xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-black/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={project.cover.light ? "object-contain object-top p-1.5" : "object-cover object-top"}
          />
        </div>
      ) : (
        <div className="absolute inset-x-[7%] bottom-0 top-[18%] flex flex-col overflow-hidden rounded-t-xl bg-black/35 ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
          {isWeb && (
            <div aria-hidden className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <span className="ml-2 h-2 flex-1 rounded-full bg-white/10" />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center px-[8%]">
            <p className="text-balance text-[clamp(1.1rem,2.4vw,1.9rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              {project.title}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">{project.stack.slice(0, 3).join(" · ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
