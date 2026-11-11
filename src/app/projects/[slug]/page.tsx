import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/work/code-block";
import { ProjectCover } from "@/components/work/project-cover";
import { CaseToc } from "@/components/projects/case-toc";
import { Figure } from "@/components/projects/figure";
import { LivePreview } from "@/components/projects/live-preview";
import { allProjects, getAdjacent, getProject } from "@/lib/projects";
import { profile } from "@/data/profile";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} · ${profile.shortName}`,
    description: p.summary,
    openGraph: { title: p.title, description: p.tagline, images: p.cover ? [p.cover.src] : undefined },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border pt-10">
      <h2 className="t-h2 mb-5">{title}</h2>
      <div className="space-y-4 text-[16px] leading-relaxed text-fg/85">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const { caseStudy: cs, links } = project;
  const { prev, next } = getAdjacent(project.slug);
  const external = links.demo && !links.demo.startsWith("/") ? links.demo : undefined;

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "approach", label: "Approach" },
    ...(project.gallery?.length ? [{ id: "visuals", label: "Visuals" }] : []),
    ...(external ? [{ id: "live", label: "Live preview" }] : []),
    { id: "results", label: "Results" },
    ...(cs.limitations?.length ? [{ id: "limitations", label: "Limitations" }] : []),
  ];

  return (
    <main className="relative z-10 pb-24 pt-28 md:pt-36">
      <article className="container">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft size={14} /> All projects
        </Link>

        {/* Header */}
        <header className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.categories.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
              <Badge tone="">{project.format}</Badge>
            </div>
            <h1 className="t-display text-balance">{project.title}</h1>
            <p className="t-lead mt-5 max-w-[60ch] text-pretty">{project.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {external && (
                <a href={external} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-shadow hover:shadow-[0_0_0_4px_hsl(var(--accent)/0.25)]">
                  <Globe size={15} /> Visit live site
                </a>
              )}
              {links.repo && (
                <a href={links.repo} target="_blank" rel="noreferrer" className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${external ? "border border-border hover:border-fg/40" : "bg-fg text-bg"}`}>
                  <Github size={15} /> View on GitHub
                </a>
              )}
              {links.docs?.map((d) => (
                <a key={d.href} href={d.href} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm text-muted transition-colors hover:border-fg/40 hover:text-fg">
                  <FileText size={15} /> {d.label}
                </a>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-3xl border border-border bg-surface/50 p-6 text-sm">
            <div>
              <dt className="t-eyebrow !text-[10px]">Role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="t-eyebrow !text-[10px]">Year</dt>
              <dd className="mt-1">{project.date.slice(0, 4)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="t-eyebrow !text-[10px]">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-md bg-elevated px-2 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </header>

        <ProjectCover project={project} label={false} priority sizes="(min-width: 1280px) 1200px, 100vw" className="mt-12 aspect-[16/9] rounded-3xl md:aspect-[2.4/1]" />

        {/* Metrics */}
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-bg p-5 md:p-6">
              <dd className="text-2xl font-semibold tracking-tight md:text-3xl">{m.value}</dd>
              <dt className="mt-1 text-xs leading-snug text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>

        {/* Body */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[200px_minmax(0,760px)] lg:justify-between xl:grid-cols-[220px_minmax(0,760px)_1fr]">
          <aside>
            <CaseToc items={toc} />
          </aside>

          <div className="space-y-14">
            <Section id="overview" title="Overview">
              <p>{cs.context}</p>
              <p className="border-l-2 border-accent pl-4 text-fg">{cs.goal}</p>
              <div className="rounded-2xl border border-border bg-surface/50 p-5 text-[15px]">
                <p className="t-eyebrow mb-2 !text-[10px]">The problem</p>
                {cs.problem}
              </div>
            </Section>

            <Section id="approach" title="Approach">
              <ol className="space-y-4">
                {cs.approach.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border font-mono text-[11px] text-muted">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              {cs.snippet && <CodeBlock snippet={cs.snippet} />}
            </Section>

            {project.gallery?.length ? (
              <Section id="visuals" title="Visuals">
                <div className="space-y-10">
                  {project.gallery.map((img) => (
                    <Figure key={img.src} image={img} />
                  ))}
                </div>
              </Section>
            ) : null}

            {external && (
              <Section id="live" title="Live preview">
                <LivePreview url={external} title={project.title} />
              </Section>
            )}

            <Section id="results" title="Results">
              <Bullets items={cs.results} />
              {cs.testimonial && (
                <figure className="mt-6 rounded-3xl border border-border bg-surface/50 p-6">
                  <blockquote className="font-serif text-xl italic">“{cs.testimonial.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm text-muted">
                    {cs.testimonial.author} · {cs.testimonial.role}
                  </figcaption>
                </figure>
              )}
            </Section>

            {cs.limitations?.length ? (
              <Section id="limitations" title="Limitations & next steps">
                <Bullets items={cs.limitations} />
              </Section>
            ) : null}

            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-surface/50 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium">Working on something similar?</p>
                <p className="text-sm text-muted">Happy to talk about roles, research or client projects.</p>
              </div>
              <Link href="/#contact" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg">
                Get in touch <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / next */}
        <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          {[
            { p: prev, dir: "Previous", icon: <ArrowLeft size={14} /> },
            { p: next, dir: "Next", icon: <ArrowRight size={14} /> },
          ].map(({ p, dir, icon }) => (
            <Link key={dir} href={`/projects/${p.slug}`} className={`card group flex flex-col gap-1 p-6 ${dir === "Next" ? "sm:items-end sm:text-right" : ""}`}>
              <span className="t-eyebrow flex items-center gap-2">
                {dir === "Previous" && icon}
                {dir}
                {dir === "Next" && icon}
              </span>
              <span className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">{p.title}</span>
              <span className="line-clamp-1 text-sm text-muted">{p.tagline}</span>
            </Link>
          ))}
        </nav>
      </article>
    </main>
  );
}
