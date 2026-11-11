"use client";

import { BookOpen, Code2, Download, FileText } from "lucide-react";
import { useState } from "react";
import type { AcademicWork } from "@/lib/types";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted transition-colors hover:border-fg/40 hover:text-fg";

/** One piece of university work: summary, skills and in-page PDF reading. */
export function WorkCard({
  work,
  onRead,
}: {
  work: AcademicWork;
  onRead: (doc: { title: string; pdfUrl: string }) => void;
}) {
  const [more, setMore] = useState(false);
  return (
    <article className={cn("card flex h-full flex-col p-6 md:p-7", work.highlight && "md:col-span-2")}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-academic">
        {work.kind} · {work.year}
        {work.grade && <span className="ml-2 text-fg">· {work.grade}</span>}
      </p>
      <h4 className={cn("mt-2 text-balance font-semibold tracking-tight", work.highlight ? "t-h2" : "text-lg leading-snug")}>{work.title}</h4>
      {work.module && <p className="mt-1 text-sm text-muted">{work.module}</p>}

      <p className={cn("mt-4 text-[15px] leading-relaxed text-fg/80", !more && !work.highlight && "line-clamp-4")}>{work.summary}</p>
      {!work.highlight && (
        <button onClick={() => setMore((m) => !m)} className="mt-1 self-start text-xs text-muted underline-offset-4 hover:text-fg hover:underline">
          {more ? "Show less" : "Read summary"}
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {work.skills.map((s) => (
          <span key={s} className="rounded-md bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted">
            {s}
          </span>
        ))}
      </div>

      {(work.pdfUrl || work.repoUrl) && (
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {work.pdfUrl && (
            <>
              <button onClick={() => onRead({ title: work.title, pdfUrl: work.pdfUrl! })} className={cn(btn, "border-fg/30 text-fg")}>
                <BookOpen size={13} /> Read
              </button>
              <a href={work.pdfUrl} download className={btn} aria-label={`Download ${work.title} PDF`}>
                <Download size={13} /> PDF
              </a>
            </>
          )}
          {work.extraPdfs?.map((x) => (
            <button key={x.url} onClick={() => onRead({ title: `${work.title}: ${x.label}`, pdfUrl: x.url })} className={btn}>
              <FileText size={13} /> {x.label}
            </button>
          ))}
          {work.repoUrl && (
            <a href={work.repoUrl} target="_blank" rel="noreferrer" className={btn}>
              <Code2 size={13} /> Code
            </a>
          )}
        </div>
      )}
    </article>
  );
}
