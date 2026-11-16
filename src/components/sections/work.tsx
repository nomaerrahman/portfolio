"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { ease } from "@/components/motion/presets";
import { allProjects, categoryCounts, getFeatured } from "@/lib/projects";
import { sectionIndex } from "@/lib/sections";
import { CATEGORY_TONE } from "@/components/ui/badge";

/** What I did: four highlights and a card into the full archive. */
export function Work() {
  const featured = getFeatured(4);
  const counts = categoryCounts();

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex("work")}
          eyebrow="Work"
          title={
            <>
              Things I&apos;ve built, <span className="font-serif font-normal italic text-muted">and what they solved.</span>
            </>
          }
          description="Each project starts with a real problem and ends with something shipped: a pipeline, a model, a product or a live site."
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-fg/40"
          >
            All {allProjects.length} projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: ease.out, delay: i * 0.05 }}
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={p} featured={i === 0} />
            </motion.div>
          ))}

          <Link href="/projects" className="card group relative flex min-h-[280px] flex-col justify-between overflow-hidden p-6 md:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(70% 60% at 100% 0%, hsl(var(--accent) / 0.14), transparent 70%)" }}
            />
            <div className="relative">
              <p className="t-eyebrow">Archive</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">{allProjects.length}</p>
              <p className="mt-1 text-muted">projects with full write-ups</p>
            </div>
            <ul className="relative mt-6 space-y-2">
              {counts.map(({ category, count }) => (
                <li key={category} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(var(--${CATEGORY_TONE[category]}))` }} />
                    {category}
                  </span>
                  <span className="font-mono text-xs">{count}</span>
                </li>
              ))}
            </ul>
            <span className="relative mt-6 inline-flex items-center gap-2 font-medium">
              Browse all projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
