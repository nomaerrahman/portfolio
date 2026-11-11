"use client";

import { useSectionIndex } from "@/components/providers/audience-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/about/timeline";
import { SkillsRadar } from "@/components/about/skills-radar";
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
          description="Academic training taught me to doubt my own numbers. Industry taught me to ship anyway. Running an agency taught me that none of it matters unless someone's day gets better."
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
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Journey</h3>
            <Timeline />
          </div>
          <div className="space-y-12">
            <Reveal className="rounded-3xl border border-border bg-surface/40 p-6 md:p-8">
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">Core competencies</h3>
              <SkillsRadar />
            </Reveal>
            <Reveal>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Stack</h3>
              <SkillCloud />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
