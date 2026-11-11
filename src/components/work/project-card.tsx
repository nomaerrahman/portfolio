"use client";

import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HoverLift } from "@/components/motion/hover-lift";
import { ProjectCover } from "./project-cover";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const linkBtn =
  "relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs text-muted transition-colors hover:border-fg/40 hover:text-fg";

/**
 * Project card. The whole card opens the case study (a stretched button sits
 * underneath), while Demo / Code links stay independently clickable on top.
 * Hover state uses transform and opacity only, so the grid never reflows.
 */
export function ProjectCard({
  project,
  featured,
  onOpen,
  dimmed,
}: {
  project: Project;
  featured?: boolean;
  onOpen: () => void;
  dimmed?: boolean;
}) {
  const tone = `${project.palette[0]} 85% 62%`;

  return (
    <HoverLift className={cn("h-full transition-opacity duration-300", dimmed && "opacity-50 hover:opacity-100")}>
      <article className="card group relative flex h-full flex-col overflow-hidden">
        <button
          onClick={onOpen}
          className="absolute inset-0 z-0 rounded-3xl"
          aria-label={`Open case study: ${project.title}`}
        />

        <div className="pointer-events-none relative p-2">
          <ProjectCover
            palette={project.palette}
            title={`${project.year} · ${project.format}`}
            className={cn("rounded-[1.25rem]", featured ? "aspect-[16/9] md:aspect-[2.6/1]" : "aspect-[16/10]")}
          />
          {/* glass stack reveal: overlays the cover, so no layout shift */}
          <div className="glass absolute inset-x-4 bottom-4 flex translate-y-2 flex-wrap gap-1.5 rounded-2xl p-2.5 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {project.stack.slice(0, featured ? 6 : 4).map((s) => (
              <span key={s} className="rounded-md bg-bg/60 px-2 py-0.5 font-mono text-[11px] text-fg/80">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pointer-events-none relative flex flex-1 flex-col px-5 pb-5 pt-3 md:px-6 md:pb-6">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>

          <h3 className={cn("font-semibold tracking-tight", featured ? "t-h2 md:text-[2rem]" : "text-xl")}>{project.title}</h3>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div>
              <span className="text-2xl font-semibold tracking-tight" style={{ color: `hsl(${tone})` }}>
                {project.highlight.value}
              </span>
              <span className="ml-2 text-sm text-muted">{project.highlight.label}</span>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-[transform,background-color,color,border-color] duration-300 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              <ArrowUpRight size={15} />
            </span>
          </div>

          {(project.links.demo || project.links.repo) && (
            <div className="pointer-events-auto mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              {project.links.demo && (
                <a href={project.links.demo} target={project.links.demo.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className={linkBtn}>
                  <Globe size={12} /> Live demo
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
    </HoverLift>
  );
}
