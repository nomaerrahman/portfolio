"use client";

import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { useSectionIndex } from "@/components/providers/audience-provider";
import { WorkRow } from "@/components/academic/work-row";
import { PdfModal } from "@/components/academic/pdf-modal";
import { degrees } from "@/data/academic";
import type { AcademicWork } from "@/lib/types";

/** Degrees with their dissertation and coursework, readable in-page as PDFs. */
export function Academic() {
  const sectionIndex = useSectionIndex("academic");
  const [reading, setReading] = useState<AcademicWork | null>(null);
  const total = degrees.reduce((n, d) => n + d.works.length, 0);

  return (
    <section id="academic" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Academic"
          title={
            <>
              Degrees, dissertation <span className="font-serif font-normal italic text-academic">and coursework.</span>
            </>
          }
          description={
            total > 0
              ? "Selected university work. Open any piece to read it here, or download the PDF."
              : "My degrees at Brunel. Selected coursework and my dissertation will be published here."
          }
        />

        <Stagger className="grid gap-5 lg:grid-cols-2">
          {degrees.map((d) => {
            const works = [...d.works].sort((a, b) => Number(!!b.highlight) - Number(!!a.highlight) || b.year.localeCompare(a.year));
            return (
              <StaggerItem key={d.id} className="card flex flex-col p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academic/15 text-academic">
                    <GraduationCap size={20} />
                  </span>
                  <div className="flex-1">
                    <h3 className="t-h2">{d.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {d.institution}
                      {d.period && <> · {d.period}</>}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {d.status}
                  </span>
                </div>
                {d.note && <p className="mt-4 text-sm text-muted">{d.note}</p>}

                {works.length > 0 ? (
                  <ul className="mt-6 space-y-3">
                    {works.map((w) => (
                      <WorkRow key={w.id} work={w} onRead={setReading} />
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 rounded-2xl border border-dashed border-border px-4 py-5 text-sm text-muted">
                    {d.status === "In progress" ? "Coursework and dissertation coming soon." : "Selected coursework coming soon."}
                  </p>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
      <PdfModal doc={reading} onClose={() => setReading(null)} />
    </section>
  );
}
