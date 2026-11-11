"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, Download, Eye, Link2, Plus } from "lucide-react";
import { useState } from "react";
import { CiteButton } from "./cite-button";
import type { ResearchItem } from "@/lib/types";
import { EASE, cn } from "@/lib/utils";

const STATUS_TONE: Record<string, string> = {
  Published: "text-academic",
  "Under review": "text-corporate",
  "In preparation": "text-muted",
  Completed: "text-muted",
};

export function PublicationRow({ item, onPreview }: { item: ResearchItem; onPreview: (i: ResearchItem) => void }) {
  const [open, setOpen] = useState(false);
  const iconBtn =
    "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted transition hover:border-fg/40 hover:text-fg";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35 }}
      className="group overflow-visible border-b border-border"
    >
      <div className="grid gap-4 py-6 md:grid-cols-[90px_1fr_auto] md:items-start md:gap-8">
        <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1">
          <span className="font-mono text-sm text-fg">{item.year}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-academic">{item.kind}</span>
        </div>

        <div>
          <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left" aria-expanded={open}>
            <h3 className="flex-1 text-pretty text-lg font-medium leading-snug tracking-tight transition-colors group-hover:text-academic md:text-xl">
              {item.title}
            </h3>
            <motion.span animate={{ rotate: open ? 45 : 0 }} className="mt-1 text-muted">
              <Plus size={18} />
            </motion.span>
          </button>
          <p className="mt-1.5 text-sm text-muted">
            {item.authors.length > 0 && <>{item.authors.join(", ")} · </>}
            <span className="italic">{item.venue}</span>
            {item.status && <span className={cn("ml-2", STATUS_TONE[item.status])}>· {item.status}</span>}
          </p>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-[15px] leading-relaxed text-fg/80">{item.abstract}</p>
                {item.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.keywords.map((k) => (
                      <span key={k} className="rounded-md bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted">
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {item.pdfUrl && (
            <>
              <button onClick={() => onPreview(item)} className={iconBtn} data-cursor="Read">
                <Eye size={13} /> Preview
              </button>
              <a href={item.pdfUrl} download className={iconBtn} aria-label="Download PDF">
                <Download size={13} /> PDF
              </a>
            </>
          )}
          {item.doi && (
            <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noreferrer" className={iconBtn}>
              <Link2 size={13} /> DOI
            </a>
          )}
          {item.codeUrl && (
            <a href={item.codeUrl} target="_blank" rel="noreferrer" className={iconBtn}>
              <Code2 size={13} /> Code
            </a>
          )}
          {item.bibtex && <CiteButton item={item} />}
        </div>
      </div>
    </motion.li>
  );
}
