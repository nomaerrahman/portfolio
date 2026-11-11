"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSectionIndex } from "@/components/providers/audience-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { PublicationRow } from "@/components/research/publication-row";
import { PdfModal } from "@/components/research/pdf-modal";
import { Reveal } from "@/components/motion/reveal";
import { research } from "@/data/research";
import type { ResearchItem, ResearchKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const KINDS: ("All" | ResearchKind)[] = ["All", "Paper", "Poster", "Dataset", "Thesis", "Teaching", "Award"];

export function Research() {
  const sectionIndex = useSectionIndex("research");
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const [preview, setPreview] = useState<ResearchItem | null>(null);
  const available = KINDS.filter((k) => k === "All" || research.some((r) => r.kind === k));
  const items = useMemo(
    () => (kind === "All" ? research : research.filter((r) => r.kind === kind)).sort((a, b) => b.year - a.year),
    [kind]
  );

  return (
    <section id="research" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Research & academia"
          title={
            <>
              Questions asked <span className="font-serif font-normal italic text-academic">carefully.</span>
            </>
          }
          description="Papers, posters, datasets and teaching. Every entry has a citation you can copy, and a PDF where one exists."
        />

        <Reveal className="mb-4 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4">
          {available.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={cn("relative pb-1 text-sm transition-colors", kind === k ? "text-fg" : "text-muted hover:text-fg")}
            >
              {k}
              {kind === k && <motion.span layoutId="research-underline" className="absolute -bottom-[17px] left-0 right-0 h-px bg-academic" />}
            </button>
          ))}
        </Reveal>

        <ul>
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <PublicationRow key={item.id} item={item} onPreview={setPreview} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <PdfModal item={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
