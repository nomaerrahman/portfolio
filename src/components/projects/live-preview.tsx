"use client";

import { ExternalLink, MonitorPlay } from "lucide-react";
import { useState } from "react";

/**
 * Click-to-load live preview of a deployed site in a browser frame.
 * Nothing loads until the visitor asks, so case-study pages stay fast.
 */
export function LivePreview({ url, title }: { url: string; title: string }) {
  const [on, setOn] = useState(false);
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        </span>
        <span className="flex-1 truncate rounded-full bg-elevated px-3 py-1 text-center font-mono text-[11px] text-muted">{host}</span>
        <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-muted hover:text-fg">
          Open <ExternalLink size={12} />
        </a>
      </div>
      <div className="relative aspect-[16/10] bg-bg">
        {on ? (
          <iframe src={url} title={`${title} live preview`} className="h-full w-full" loading="lazy" />
        ) : (
          <button
            onClick={() => setOn(true)}
            className="group absolute inset-0 grid place-items-center bg-[radial-gradient(60%_60%_at_50%_50%,hsl(var(--accent)/0.10),transparent_70%)]"
          >
            <span className="flex flex-col items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-fg text-bg transition-transform duration-300 group-hover:scale-105">
                <MonitorPlay size={22} />
              </span>
              <span className="text-sm font-medium">Load live preview</span>
              <span className="text-xs text-muted">Interact with the deployed site here</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
