"use client";

import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { sectionIndex } from "@/lib/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/about/timeline";
import { SkillCloud } from "@/components/about/skill-cloud";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex("about")}
          eyebrow="About"
          title={
            <>
              A builder <span className="font-serif font-normal italic text-muted">at heart.</span>
            </>
          }
          description="I studied computer science, learned to make data trustworthy in industry and in NHS pharmacy work, and now build products of my own: Atafol and JobPilot. The thread through all of it: I like taking a messy problem and shipping something that fixes it."
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
              <Link href="/academic" className="card group mt-3 flex items-center justify-between gap-4 p-5">
                <span>
                  <span className="block font-medium">Degrees & coursework</span>
                  <span className="text-sm text-muted">MSc and BSc, with selected coursework to read</span>
                </span>
                <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
