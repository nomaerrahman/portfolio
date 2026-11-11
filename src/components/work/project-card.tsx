import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "./project-cover";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const linkBtn =
  "relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs text-muted transition-colors hover:border-fg/40 hover:text-fg";

/**
 * Project card. The whole card links to the case-study page (stretched link),
 * while Live / Code links stay independently clickable above it.
 * Hover uses transform and opacity only, so grids never reflow.
 */
export function ProjectCard({
  project,
  featured,
  dimmed,
  className,
}: {
  project: Project;
  featured?: boolean;
  dimmed?: boolean;
  className?: string;
}) {
  const tone = `${project.palette[0]} 80% 62%`;
  const external = project.links.demo && !project.links.demo.startsWith("/");

  return (
    <article
      className={cn(
        "card group relative flex h-full flex-col overflow-hidden transition-[transform,opacity,border-color] duration-300 ease-out hover:-translate-y-1",
        dimmed && "opacity-50 hover:opacity-100",
        className
      )}
    >
      <div className="p-2">
        <ProjectCover
          project={project}
          className={cn("rounded-[1.25rem]", featured ? "aspect-[16/10] md:aspect-[2.25/1]" : "aspect-[16/10]")}
          sizes={featured ? "(min-width: 768px) 66vw, 100vw" : undefined}
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3 md:px-6 md:pb-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>

        <h3 className={cn("font-semibold tracking-tight", featured ? "t-h2" : "text-xl")}>
          <Link href={`/projects/${project.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-pretty text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="min-w-0">
            <span className="text-2xl font-semibold tracking-tight" style={{ color: `hsl(${tone})` }}>
              {project.highlight.value}
            </span>
            <span className="ml-2 text-sm text-muted">{project.highlight.label}</span>
          </div>
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-[transform,background-color,color,border-color] duration-300 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg"
          >
            <ArrowUpRight size={15} />
          </span>
        </div>

        {(external || project.links.repo) && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            {external && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className={linkBtn}>
                <Globe size={12} /> Live site
              </a>
            )}
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noreferrer" className={linkBtn}>
                <Github size={12} /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
