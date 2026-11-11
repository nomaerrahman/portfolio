"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Check, Compass, MonitorSmartphone, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { useSectionIndex } from "@/components/providers/audience-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Magnetic } from "@/components/motion/magnetic";
import { ease } from "@/components/motion/presets";
import { useUI } from "@/components/providers/ui-provider";
import { startup, type Practice } from "@/data/startup";
import { cn } from "@/lib/utils";

const ICONS = { strategy: Compass, experience: MonitorSmartphone, growth: QrCode, operations: BarChart3 } as const;
const host = startup.url.replace(/^https?:\/\//, "");

/** Browser-framed preview of a practice area, linking to the real service pages on the HypeSpark site. */
function PracticePreview({ practice }: { practice: Practice }) {
  const Icon = ICONS[practice.id];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={practice.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: ease.out }}
        className="flex h-full flex-col p-6 md:p-8"
      >
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-startup/15 text-startup">
          <Icon size={20} />
        </span>
        <p className="t-eyebrow mt-6 !text-[10px]">{practice.label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{practice.outcome}</p>
        <p className="mt-3 text-muted">{practice.description}</p>
        <ul className="mt-auto space-y-2 pt-8">
          {practice.services.map((s) => (
            <li key={s.slug}>
              <a
                href={`${startup.url}/services/${s.slug}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border bg-bg/60 px-4 py-3 text-sm transition-colors hover:border-startup/50"
              >
                {s.name}
                <ArrowUpRight size={15} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-startup" />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}

export function Startup() {
  const sectionIndex = useSectionIndex("startup");
  const { openBooking } = useUI();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const practice = startup.practices[active];

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % startup.practices.length), 4500);
    return () => clearInterval(id);
  }, [auto]);

  return (
    <section id="startup" className="section overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-50"
        style={{ background: "radial-gradient(50% 50% at 50% 0%, hsl(var(--startup) / 0.16), transparent 70%)" }}
        aria-hidden
      />
      <div className="container relative">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Venture · Co-founder"
          title={
            <>
              <span className="text-startup">{startup.name}</span>
              <span className="font-serif font-normal italic text-muted">, </span>
              {startup.tagline.charAt(0).toLowerCase() + startup.tagline.slice(1)}.
            </>
          }
          description={startup.vision}
        >
          <div className="flex flex-wrap gap-2">
            {[startup.role, ...startup.facts].map((f) => (
              <span key={f} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {f}
              </span>
            ))}
          </div>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Practice areas */}
          <Reveal className="flex flex-col gap-2" onMouseEnter={() => setAuto(false)}>
            {startup.practices.map((p, i) => {
              const Icon = ICONS[p.id];
              const on = i === active;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  aria-pressed={on}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-5 text-left transition-colors duration-300 md:p-6",
                    on ? "border-startup/40 bg-surface" : "border-border bg-surface/30 hover:bg-surface/70"
                  )}
                >
                  {on && auto && (
                    <motion.span
                      key={`bar-${active}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-startup"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                    />
                  )}
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors duration-300",
                        on ? "bg-startup text-accent-fg" : "bg-elevated text-muted"
                      )}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="flex-1">
                      <p className="text-lg font-semibold tracking-tight">{p.label}</p>
                      <p className="text-sm text-muted">{p.outcome}</p>
                    </div>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                </button>
              );
            })}
          </Reveal>

          {/* Browser-framed preview */}
          <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-border bg-surface/60">
            <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              </span>
              <span className="flex-1 truncate rounded-full bg-elevated px-3 py-1 text-center font-mono text-[11px] text-muted">{host}</span>
            </div>
            <div className="min-h-[360px]">
              <PracticePreview practice={practice} />
            </div>
          </Reveal>
        </div>

        {/* Facts */}
        <Stagger className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {startup.facts_grid.map((m) => (
            <StaggerItem key={m.label} className="bg-surface p-6 md:p-8">
              <p className="text-4xl font-semibold tracking-tight md:text-5xl">{m.value}</p>
              <p className="mt-2 text-sm text-muted">{m.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Approach */}
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {startup.approach.map((a) => (
            <StaggerItem key={a.step} className="card p-5">
              <p className="font-mono text-xs text-startup">{a.step}</p>
              <p className="mt-2 font-semibold">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-6 flex flex-wrap gap-2">
          {startup.industries.map((ind) => (
            <span key={ind} className="rounded-full bg-elevated px-3 py-1.5 text-xs text-muted">
              {ind}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {startup.commitments.map((p) => (
              <StaggerItem key={p.title} className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-startup" />
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="flex flex-wrap gap-3">
            <Magnetic>
              <a href={startup.url} target="_blank" rel="noreferrer">
                <Button variant="accent" size="lg">
                  Visit HypeSpark <ArrowUpRight size={16} />
                </Button>
              </a>
            </Magnetic>
            <Button variant="outline" size="lg" onClick={openBooking}>
              Get in touch
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
