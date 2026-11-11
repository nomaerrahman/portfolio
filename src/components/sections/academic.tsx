"use client";

import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { useSectionIndex } from "@/components/providers/audience-provider";
import { WorkCard } from "@/components/academic/work-card";
import { PdfModal } from "@/components/academic/pdf-modal";
import { degrees } from "@/data/academic";

/** Degrees, then each degree's coursework as readable cards. */
export function Academic() {
  const sectionIndex = useSectionIndex("academic");
  const [reading, setReading] = useState<{ title: string; pdfUrl: string } | null>(null);

  return (
    <section id="academic" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Academic"
          title={
            <>
              Degrees <span className="font-serif font-normal italic text-academic">and coursework.</span>
            </>
          }
          description="Selected university work. Open any piece to read it here, or download the PDF."
        />

        {/* Degrees */}
        <div className="grid gap-4 md:grid-cols-2">
          {degrees.map((d) => (
            <div key={d.id} className="card flex items-start gap-4 p-5 md:p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-academic/15 text-academic">
                <GraduationCap size={18} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">{d.title}</h3>
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {d.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{d.institution}</p>
                {d.note && <p className="mt-2 text-sm text-muted">{d.note}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Work, per degree */}
        {degrees
          .filter((d) => d.works.length > 0 || d.upcoming)
          .map((d) => {
            const works = [...d.works].sort((a, b) => Number(!!b.highlight) - Number(!!a.highlight));
            return (
              <div key={d.id} className="mt-12">
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <h3 className="t-eyebrow">{d.title.split(" ")[0]} coursework</h3>
                  <span className="font-mono text-xs text-muted">{works.length} pieces</span>
                </div>
                <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.05}>
                  {works.map((w) => (
                    <StaggerItem key={w.id} className={w.highlight ? "md:col-span-2" : undefined}>
                      <WorkCard work={w} onRead={setReading} />
                    </StaggerItem>
                  ))}
                </Stagger>
                {d.upcoming && (
                  <p className="mt-5 rounded-2xl border border-dashed border-border px-5 py-4 text-sm text-muted">{d.upcoming}. It will be added here when it&apos;s complete.</p>
                )}
              </div>
            );
          })}
      </div>
      <PdfModal doc={reading} onClose={() => setReading(null)} />
    </section>
  );
}
