"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { now } from "@/data/now";
import { sectionIndex } from "@/lib/sections";

/** What I'm doing now, and what I want to do next. */
export function Next() {
  return (
    <section id="next" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex("next")}
          eyebrow="Now & next"
          title={
            <>
              Where I&apos;m <span className="font-serif font-normal italic text-accent">heading.</span>
            </>
          }
          description={`What I'm focused on today, and what I want to build next. Updated ${now.updated}.`}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <h3 className="t-eyebrow mb-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Now
            </h3>
            <Stagger className="space-y-3">
              {now.current.map((n) => (
                <StaggerItem key={n.title} className="card p-5">
                  <p className="font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted">{n.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <h3 className="t-eyebrow mb-4 flex items-center gap-2">
              <ArrowUpRight size={14} className="text-accent" /> Next
            </h3>
            <Stagger className="space-y-3">
              {now.next.map((n, i) => (
                <StaggerItem key={n.title} className="card flex gap-5 p-6">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <div>
                    <p className="text-lg font-semibold tracking-tight">{n.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{n.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
