"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Globe, Megaphone, Palette, QrCode, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSectionIndex } from "@/components/providers/audience-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { useUI } from "@/components/providers/ui-provider";
import { startup, type Capability } from "@/data/startup";
import { EASE, cn } from "@/lib/utils";

const ICONS = { web: Globe, brand: Palette, reviews: QrCode, influencer: Megaphone } as const;

/** Interactive mock "device" that renders a different live preview per capability. */
function DemoScreen({ cap }: { cap: Capability }) {
  const h = cap.preview.accent;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cap.id}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-0 flex flex-col p-5"
        style={{ background: `linear-gradient(160deg, hsl(${h} 70% 14%), hsl(${h} 30% 6%))` }}
      >
        <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
          <span>9:41</span>
          <span>mango.media</span>
        </div>

        <div className="mt-8">
          <motion.div
            className="mb-5 h-14 w-14 rounded-2xl"
            style={{ background: `hsl(${h} 90% 60%)` }}
            animate={{ rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
          <p className="text-2xl font-semibold leading-tight text-white">{cap.preview.headline}</p>
          <p className="mt-2 text-sm text-white/60">{cap.preview.sub}</p>
        </div>

        <div className="mt-auto space-y-2">
          {cap.id === "reviews" ? (
            <div className="flex justify-between rounded-2xl bg-white/10 p-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.08, type: "spring" }}>
                  <Star size={26} fill={`hsl(${h} 95% 60%)`} stroke="none" />
                </motion.span>
              ))}
            </div>
          ) : (
            [0.9, 0.7, 0.55].map((w, i) => (
              <motion.div
                key={i}
                className="h-10 rounded-xl bg-white/10"
                initial={{ width: 0 }}
                animate={{ width: `${w * 100}%` }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
              />
            ))
          )}
          <div className="rounded-xl py-3 text-center text-sm font-semibold text-black" style={{ background: `hsl(${h} 95% 62%)` }}>
            {cap.id === "reviews" ? "Leave a review" : cap.id === "influencer" ? "View campaign" : "Get started"}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Startup() {
  const sectionIndex = useSectionIndex("startup");
  const { openBooking, setInquiry } = useUI();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const cap = startup.capabilities[active];

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % startup.capabilities.length), 3800);
    return () => clearInterval(id);
  }, [auto]);

  return (
    <section id="startup" className="section overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-50"
        style={{ background: "radial-gradient(50% 50% at 50% 0%, hsl(var(--startup) / 0.18), transparent 70%)" }}
        aria-hidden
      />
      <div className="container relative">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Founder spotlight"
          title={
            <>
              <span className="text-startup">{startup.name}</span>
              <span className="font-serif font-normal italic text-muted">, </span>
              {startup.tagline.toLowerCase()}.
            </>
          }
          description={startup.vision}
        >
          <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            <span>Est. {startup.founded}</span>
            <span>{startup.partners} partners</span>
            <span>London</span>
          </div>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Capabilities list */}
          <Reveal className="flex flex-col gap-2">
            {startup.capabilities.map((c, i) => {
              const Icon = ICONS[c.id as keyof typeof ICONS];
              const on = i === active;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-5 text-left transition-colors duration-500 md:p-6",
                    on ? "border-startup/40 bg-surface" : "border-border bg-surface/30 hover:bg-surface/70"
                  )}
                >
                  {on && auto && (
                    <motion.span
                      key={`bar-${active}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-startup"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.8, ease: "linear" }}
                    />
                  )}
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors duration-500",
                        on ? "bg-startup text-accent-fg" : "bg-elevated text-muted"
                      )}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="flex-1">
                      <p className="text-lg font-semibold tracking-tight">{c.title}</p>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden text-sm leading-relaxed text-muted"
                          >
                            <span className="block pt-1">{c.blurb}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                </button>
              );
            })}
          </Reveal>

          {/* Interactive demo device */}
          <Reveal delay={0.1} className="relative grid place-items-center rounded-3xl border border-border bg-surface/40 p-8 md:p-12">
            <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(circle,black,transparent_70%)]" aria-hidden />
            <p className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Live preview · tap a service</p>
            <motion.div
              className="relative aspect-[9/17] w-full max-w-[270px] overflow-hidden rounded-[2.4rem] border-[6px] border-fg/10 bg-black shadow-[0_40px_120px_-30px_hsl(var(--startup)/0.5)]"
              whileHover={{ rotate: -2, y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <DemoScreen cap={cap} />
            </motion.div>
          </Reveal>
        </div>

        {/* pillars + metrics */}
        <Stagger className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {startup.metrics.map((m) => (
            <StaggerItem key={m.label} className="bg-surface p-6 md:p-8">
              <Counter value={m.value} className="text-4xl font-semibold tracking-tight md:text-5xl" />
              <p className="mt-2 text-sm text-muted">{m.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {startup.pillars.map((p) => (
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
              <Button variant="accent" size="lg" onClick={openBooking}>
                {startup.bookingCta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <a href="#contact" onClick={() => setInquiry("client")}>
              <Button variant="outline" size="lg">
                Work with us
              </Button>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
