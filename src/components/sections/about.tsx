"use client";

import { FileText } from "lucide-react";
import { useSectionIndex } from "@/components/providers/audience-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/about/timeline";
import { SkillCloud } from "@/components/about/skill-cloud";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { profile } from "@/data/profile";

export function About() {
  const sectionIndex = useSectionIndex("about");
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex}
          eyebrow="About & philosophy"
          title={
            <>
              Three tracks, <span className="font-serif font-normal italic text-muted">one way of working.</span>
            </>
          }
          description="Academic training taught me to doubt my own numbers. Industry taught me to ship anyway. Starting a company taught me that none of it matters unless someone's day gets better."
        />

        <Stagger className="mb-20 grid gap-4 md:grid-cols-3">
          {profile.philosophy.map((p, i) => (
            <StaggerItem key={i} className="rounded-3xl border border-border bg-surface/50 p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="mt-4 font-serif text-xl italic leading-snug">{p}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Experience & education</h3>
            <Timeline />
          </div>
          <div className="space-y-12">
            <Reveal>
              <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">Skills</h3>
              <SkillCloud />
            </Reveal>
            <Reveal>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="card group flex items-center justify-between gap-4 p-5"
              >
                <span>
                  <span className="block font-medium">Full CV</span>
                  <span className="text-sm text-muted">Experience, education and module grades (PDF)</span>
                </span>
                <FileText size={18} className="text-muted transition-colors group-hover:text-fg" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
