import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

/** Dense list row for the archive. Scales to hundreds of projects. */
export function ProjectRow({ project }: { project: Project }) {
  const [a, b] = project.palette;
  const external = project.links.demo && !project.links.demo.startsWith("/");
  return (
    <li className="group relative grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-border py-4 transition-colors hover:bg-surface/50 md:grid-cols-[88px_minmax(0,2fr)_minmax(0,1.2fr)_auto] md:gap-6 md:px-3">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-border"
        style={{ background: `linear-gradient(135deg, hsl(${a} 70% 45%), hsl(${b} 70% 40%))` }}
      >
        {project.cover && (
          <Image src={project.cover.src} alt="" fill sizes="88px" className="bg-white object-cover object-top" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <h3 className="truncate font-semibold tracking-tight">
            <Link href={`/projects/${project.slug}`} className="outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-accent">
              {project.title}
            </Link>
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted">{project.date.slice(0, 4)}</span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted">{project.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 md:hidden">
          {project.categories.slice(0, 1).map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
      </div>

      <div className="hidden min-w-0 md:block">
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
        <p className="mt-1.5 truncate font-mono text-[11px] text-muted">{project.stack.slice(0, 4).join(" · ")}</p>
      </div>

      <div className="flex items-center gap-1">
        {external && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`} className="relative z-10 hidden h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg sm:grid">
            <Globe size={14} />
          </a>
        )}
        {project.links.repo && (
          <a href={project.links.repo} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`} className="relative z-10 hidden h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg sm:grid">
            <Github size={14} />
          </a>
        )}
        <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-fg">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </li>
  );
}
