"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Github, Globe, Quote } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./code-block";
import { ProjectCover } from "./project-cover";
import { useUI } from "@/components/providers/ui-provider";
import { projects } from "@/data/projects";
import { EASE } from "@/lib/utils";

const block = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.6, ease: EASE } }),
};

function Block({ i, label, children }: { i: number; label: string; children: React.ReactNode }) {
  return (
    <motion.section custom={i} variants={block} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-[180px_1fr]">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">0{i + 1}</span> · {label}
      </h3>
      <div className="space-y-4 text-[15px] leading-relaxed text-fg/85">{children}</div>
    </motion.section>
  );
}

export function ProjectDrawer() {
  const { activeProject, closeProject, openBooking } = useUI();
  const project = projects.find((p) => p.slug === activeProject);
  const cs = project?.caseStudy;

  return (
    <Modal open={!!project} onClose={closeProject} variant="right" label={project?.title ?? "Case study"}>
      {project && cs && (
        <div className="h-full overflow-y-auto overscroll-contain">
          <ProjectCover palette={project.palette} title={project.role} className="h-56 md:h-72" />
          <div className="space-y-12 p-6 pb-24 md:p-12">
            <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, ease: EASE, duration: 0.6 }}>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.categories.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
                <Badge tone="">{project.format}</Badge>
              </div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{project.title}</h2>
              <p className="mt-3 max-w-xl text-lg text-muted">{project.tagline}</p>
              <p className="mt-1 text-sm text-muted">{project.role} · {project.year}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.demo && (
                  <a href={project.links.demo} target={project.links.demo.startsWith("#") ? undefined : "_blank"} rel="noreferrer" onClick={project.links.demo.startsWith("#") ? closeProject : undefined}>
                    <Button size="sm">
                      <Globe size={14} /> Live demo
                    </Button>
                  </a>
                )}
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline">
                      <Github size={14} /> GitHub
                    </Button>
                  </a>
                )}
                {project.links.paper && (
                  <a href={project.links.paper} onClick={closeProject}>
                    <Button size="sm" variant="outline">
                      <FileText size={14} /> Paper / dataset
                    </Button>
                  </a>
                )}
              </div>
              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-surface p-4">
                    <dd className="text-2xl font-semibold tracking-tight md:text-3xl">{m.value}</dd>
                    <dt className="mt-1 text-xs text-muted">{m.label}</dt>
                  </div>
                ))}
              </dl>
            </motion.header>

            <Block i={0} label="Context & goal">
              <p>{cs.context}</p>
              <p className="border-l-2 border-accent pl-4 text-fg">{cs.goal}</p>
            </Block>

            <Block i={1} label="Problem & foundation">
              <p>{cs.problem}</p>
              <p className="rounded-2xl border border-border bg-elevated/50 p-4 text-sm text-muted">
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-academic">
                  Research foundation
                </span>
                {cs.foundation}
              </p>
            </Block>

            <Block i={2} label="Architecture">
              <ol className="space-y-3">
                {cs.architecture.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border font-mono text-[10px] text-muted">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-md bg-elevated px-2 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </span>
                ))}
              </div>
              {cs.snippet && <CodeBlock snippet={cs.snippet} />}
            </Block>

            <Block i={3} label="Impact">
              <ul className="space-y-2">
                {cs.impact.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              {cs.testimonial && (
                <figure className="relative mt-4 rounded-3xl border border-border bg-elevated/40 p-6">
                  <Quote className="absolute right-5 top-5 text-accent/40" size={28} />
                  <blockquote className="font-serif text-xl italic leading-snug md:text-2xl">“{cs.testimonial.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-muted">
                    {cs.testimonial.author} · {cs.testimonial.role}
                  </figcaption>
                </figure>
              )}
            </Block>

            <div className="flex flex-wrap gap-3 border-t border-border pt-8">
              <Button
                onClick={() => {
                  closeProject();
                  openBooking();
                }}
              >
                Talk about a similar project <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
