"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Braces, Database, FileSpreadsheet, Globe2, Webhook } from "lucide-react";
import { useEffect, useState } from "react";
import { ease } from "@/components/motion/presets";
import { cn } from "@/lib/utils";

type Stage = "ingest" | "transform" | "serve";

const NODES: { stage: Stage; label: string; items: { icon: typeof Database; name: string }[] }[] = [
  {
    stage: "ingest",
    label: "Ingest",
    items: [
      { icon: Webhook, name: "REST APIs" },
      { icon: FileSpreadsheet, name: "CSV / S3" },
      { icon: Database, name: "Postgres" },
    ],
  },
  { stage: "transform", label: "Transform", items: [{ icon: Braces, name: "Python · dbt" }] },
  {
    stage: "serve",
    label: "Serve",
    items: [
      { icon: BarChart3, name: "Dashboards" },
      { icon: Globe2, name: "Web apps" },
    ],
  },
];

const LOGS = [
  "✓ 12,480 rows validated against schema v2",
  "✓ dbt run: 18 models, 0 failures",
  "✓ freshness check passed (3m)",
  "✓ deployed analytics API to production",
];

const BARS = [
  [38, 52, 44, 66, 58, 74, 70, 86],
  [42, 48, 60, 55, 70, 68, 80, 90],
  [35, 58, 50, 62, 72, 66, 84, 88],
];

/** Paths between node centres, in a 300×96 viewBox (items are 28px tall with 6px gaps). */
const PATHS: { from: Stage; d: string }[] = [
  { from: "ingest", d: "M 50 14 C 100 14, 100 48, 150 48" },
  { from: "ingest", d: "M 50 48 L 150 48" },
  { from: "ingest", d: "M 50 82 C 100 82, 100 48, 150 48" },
  { from: "transform", d: "M 150 48 C 200 48, 200 31, 250 31" },
  { from: "transform", d: "M 150 48 C 200 48, 200 65, 250 65" },
];

/**
 * The hero visual: a living data pipeline. Packets travel along SVG paths
 * (native SMIL, so near-zero JS cost), a log line ticks over, and a small chart
 * refreshes. Hovering a stage highlights its connections.
 */
export function PipelineCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Stage | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const bars = BARS[tick % BARS.length];
  const log = LOGS[tick % LOGS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: ease.out }}
      className={cn("glass relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]", className)}
    >
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          </span>
          <span className="ml-2 font-mono text-[11px] text-muted">nom/pipeline.py</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          running
        </span>
      </div>

      {/* pipeline diagram */}
      <div className="relative px-4 pb-2 pt-5">
        <div className="relative grid grid-cols-3 gap-2">
          <svg
            viewBox="0 0 300 96"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-[24px] h-[96px] w-full"
            aria-hidden
          >
            {PATHS.map((p, i) => {
              const lit = hover === null || hover === p.from || (hover === "serve" && p.from === "transform");
              return (
                <g key={i}>
                  <path
                    d={p.d}
                    fill="none"
                    stroke={lit ? "hsl(var(--accent) / 0.55)" : "hsl(var(--fg) / 0.1)"}
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: "stroke 300ms" }}
                  />
                  {!reduce && (
                    <circle r="2.2" fill="hsl(var(--accent))" opacity={lit ? 1 : 0.25}>
                      <animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={p.d} />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {NODES.map((n) => (
            <div
              key={n.stage}
              onMouseEnter={() => setHover(n.stage)}
              onMouseLeave={() => setHover(null)}
              className="relative z-10 flex flex-col items-center"
            >
              <p className="t-eyebrow mb-2 h-4 !text-[10px] !leading-4">{n.label}</p>
              <div className={cn("flex w-full flex-col gap-1.5", n.items.length === 1 ? "pt-[34px]" : n.items.length === 2 ? "pt-[17px]" : "")}>
                {n.items.map(({ icon: Icon, name }) => (
                  <div
                    key={name}
                    className={cn(
                      "flex h-7 items-center gap-1.5 rounded-xl border bg-surface px-2 text-[11px] transition-colors duration-300",
                      hover === n.stage ? "border-accent/50 text-fg" : "border-border text-muted"
                    )}
                  >
                    <Icon size={12} className={hover === n.stage ? "text-accent" : ""} />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* output: chart + log */}
      <div className="grid gap-3 p-4 pt-3 sm:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-bg/50 p-3">
          <div className="flex items-baseline justify-between">
            <p className="t-eyebrow !text-[10px]">Weekly active users</p>
            <AnimatePresence mode="wait">
              <motion.span
                key={bars[7]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="font-mono text-xs text-emerald-500 dark:text-emerald-400"
              >
                +{bars[7] - bars[0]}%
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-3 flex h-16 items-end gap-1.5" aria-hidden>
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 origin-bottom rounded-t-[3px]"
                style={{ background: i === bars.length - 1 ? "hsl(var(--accent))" : "hsl(var(--fg) / 0.18)", height: "100%" }}
                animate={{ scaleY: h / 100 }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: i * 0.03 }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-bg/50 p-3 font-mono text-[11px] leading-relaxed">
          <p className="text-muted">
            <span className="text-accent">$</span> make deploy
          </p>
          <div className="relative h-10 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={log}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="absolute inset-x-0 top-1 text-fg/85"
              >
                {log}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
