import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectsArchive } from "@/components/projects/projects-archive";
import { allProjects, categoryCounts } from "@/lib/projects";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Projects · ${profile.shortName}`,
  description: "Every project with a write-up: data engineering pipelines, forecasting and analytics case studies, web apps and client sites.",
};

export default function ProjectsPage() {
  const counts = categoryCounts();
  return (
    <main className="relative z-10 pb-24 pt-32 md:pt-40">
      <div className="container">
        <Link href="/#work" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft size={14} /> Home
        </Link>
        <div className="mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="t-eyebrow mb-4">Archive</p>
            <h1 className="t-display">
              All projects<span className="text-accent">.</span>
            </h1>
            <p className="t-lead mt-5 max-w-xl">
              Data pipelines, forecasting and analytics case studies, web apps and client sites. Each one has a write-up covering
              the problem, approach and results.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-3xl border border-border bg-border">
            <div className="col-span-2 flex items-baseline gap-3 bg-bg p-5">
              <dd className="text-4xl font-semibold tracking-tight">{allProjects.length}</dd>
              <dt className="text-sm text-muted">projects in total</dt>
            </div>
            {counts.map((c) => (
              <div key={c.category} className="hidden bg-bg p-5 sm:block">
                <dd className="text-3xl font-semibold tracking-tight">{c.count}</dd>
                <dt className="text-xs text-muted">{c.category}</dt>
              </div>
            ))}
          </dl>
        </div>
        <ProjectsArchive />
      </div>
    </main>
  );
}
