"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code2, Download, Plus } from "lucide-react";
import { useState } from "react";
import type { AcademicWork } from "@/lib/types";
import { ease } from "@/components/motion/presets";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted transition-colors hover:border-fg/40 hover:text-fg";

export function WorkRow({ work, onRead }: { work: AcademicWork; onRead: (w: AcademicWork) => void }) {
  const [open, setOpen] = useState(!!work.highlight);
  return (
    <li className={cn("border-b border-border py-5 last:border-b-0", work.highlight && "rounded-2xl border bg-elevated/40 px-5 last:border-b")}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left" aria-expanded={open}>
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-academic">
            {work.kind} · {work.year}
            {work.grade && <span className="ml-2 text-fg">· {work.grade}</span>}
          </p>
          <h4 className={cn("mt-1.5 font-semibold tracking-tight", work.highlight ? "text-xl" : "text-base")}>{work.title}</h4>
          {work.module && <p className="mt-0.5 text-sm text-muted">{work.module}</p>}
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="mt-1 text-muted">
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.out }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-[15px] leading-relaxed text-fg/80">{work.summary}</p>
            {work.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {work.skills.map((s) => (
                  <span key={s} className="rounded-md bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {(work.pdfUrl || work.repoUrl) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {work.pdfUrl && (
            <>
              <button onClick={() => onRead(work)} className={btn}>
                <BookOpen size={13} /> Read
              </button>
              <a href={work.pdfUrl} download className={btn}>
                <Download size={13} /> PDF
              </a>
            </>
          )}
          {work.repoUrl && (
            <a href={work.repoUrl} target="_blank" rel="noreferrer" className={btn}>
              <Code2 size={13} /> Code
            </a>
          )}
        </div>
      )}
    </li>
  );
}
