"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ResearchItem } from "@/lib/types";
import { toAPA } from "@/data/research";
import { copyToClipboard } from "@/lib/utils";

export function CiteButton({ item }: { item: ResearchItem }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const formats = [
    { id: "BibTeX", text: item.bibtex },
    { id: "APA", text: toAPA(item) },
  ].filter((f): f is { id: string; text: string } => !!f.text);

  const copy = async (id: string, text: string) => {
    if (await copyToClipboard(text)) {
      setCopied(id);
      setTimeout(() => {
        setCopied(null);
        setOpen(false);
      }, 1200);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted transition hover:border-fg/40 hover:text-fg"
      >
        <Quote size={13} /> Cite
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-11 z-30 w-[min(92vw,420px)] rounded-2xl border border-border bg-surface p-2 shadow-2xl"
          >
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => copy(f.id, f.text)}
                className="group block w-full rounded-xl p-3 text-left transition hover:bg-elevated"
              >
                <span className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {f.id}
                  <span className="flex items-center gap-1 normal-case tracking-normal text-fg">
                    {copied === f.id ? (
                      <>
                        <Check size={12} className="text-academic" /> Copied
                      </>
                    ) : (
                      "Click to copy"
                    )}
                  </span>
                </span>
                <pre className="scrollbar-none max-h-32 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-fg/80">
                  {f.text}
                </pre>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
