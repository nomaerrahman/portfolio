"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { useAudience, useSectionIndex } from "@/components/providers/audience-provider";
import { useUI } from "@/components/providers/ui-provider";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ease, spring } from "@/components/motion/presets";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Data Engineering", "Full-Stack / Web", "Academic / AI", "Startup Ventures"];

export function Work() {
  const sectionIndex = useSectionIndex("work");
  const { audience, config } = useAudience();
  const { openProject } = useUI();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const list = useMemo(() => {
    let items = [...projects];
    if (filter !== "All") items = items.filter((p) => p.categories.includes(filter));
    if (audience !== "all") {
      items.sort((a, b) => b.relevance[audience] - a.relevance[audience] || b.year - a.year);
    }
    return items;
  }, [filter, audience]);

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f, f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length])),
    []
  );

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Selected work"
          title={
            <>
              Systems, studies <span className="font-serif font-normal italic text-muted">&</span> shipped products.
            </>
          }
          description={
            audience === "all"
              ? "Data engineering, full-stack web, academic research and venture work. Filter by area, or switch the view in the header to re-rank for what you care about."
              : `Ranked for the ${config.label.toLowerCase()} view. Most relevant work comes first; the rest remains available below.`
          }
        />

        <div className="scrollbar-none -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 mask-fade-x md:mx-0 md:px-0 md:[mask-image:none]">
          <LayoutGroup id="work-filter">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                  filter === f ? "border-transparent text-bg" : "border-border text-muted hover:text-fg"
                )}
              >
                {filter === f && (
                  <motion.span layoutId="work-filter-pill" className="absolute inset-0 -z-0 rounded-full bg-fg" transition={spring.snappy} />
                )}
                <span className="relative z-10">
                  {f} <span className="ml-1 font-mono text-[11px] opacity-60">{counts[f]}</span>
                </span>
              </button>
            ))}
          </LayoutGroup>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const featured = i === 0;
              const dimmed = audience !== "all" && p.relevance[audience] === 0;
              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: ease.out, delay: Math.min(i, 6) * 0.04 }}
                  className={cn(featured && "md:col-span-2")}
                >
                  <ProjectCard project={p} featured={featured} dimmed={dimmed} onOpen={() => openProject(p.slug)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
