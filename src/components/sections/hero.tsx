"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Briefcase, CalendarClock, FileText, GraduationCap, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { HeroBackdrop } from "@/components/effects/hero-backdrop";
import { PipelineCard } from "@/components/effects/pipeline-card";
import { WordReveal } from "@/components/motion/kinetic-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Counter } from "@/components/motion/counter";
import { ease } from "@/components/motion/presets";
import { Button } from "@/components/ui/button";
import { useAudience } from "@/components/providers/audience-provider";
import { useUI } from "@/components/providers/ui-provider";
import { DEFAULT_HERO, HERO_VARIANTS, type HeroVariant } from "@/data/hero";
import { profile } from "@/data/profile";

const CREDENTIALS = [
  { icon: GraduationCap, label: profile.degree, org: profile.university },
  { icon: Briefcase, label: "Junior Data Engineer", org: "Carrot Soft" },
  { icon: Rocket, label: "Co-founder", org: "Mango Media" },
];

/** Allows previewing copy variants with ?hero=a|b|c without a redeploy. */
function useHeroVariant(): HeroVariant {
  const [id, setId] = useState<HeroVariant["id"]>(DEFAULT_HERO);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("hero");
    if (q && HERO_VARIANTS.some((v) => v.id === q)) setId(q as HeroVariant["id"]);
  }, []);
  return HERO_VARIANTS.find((v) => v.id === id) ?? HERO_VARIANTS[0];
}

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: ease.out },
});

export function Hero() {
  const { config } = useAudience();
  const { openBooking } = useUI();
  const variant = useHeroVariant();

  const runAction = (action: "projects" | "book" | "cv") => {
    if (action === "book") return openBooking();
    if (action === "cv") return window.open(profile.cvUrl, "_blank", "noopener");
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <HeroBackdrop />

      <div className="container relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <motion.p {...enter(0)} className="glass mb-8 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[13px] text-muted">
              Hi, I&apos;m <span className="font-medium text-fg">{profile.shortName}</span> · Data Engineer · London
            </span>
          </motion.p>

          <h1 key={variant.id} className="t-display max-w-[14ch] text-balance">
            <WordReveal segments={variant.headline} delay={0.1} />
          </h1>

          <motion.p {...enter(0.45)} className="t-lead mt-6 max-w-[54ch] text-pretty">
            {variant.lead}
          </motion.p>

          <motion.div {...enter(0.6)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button size="lg" onClick={() => runAction(config.primaryCta.action)}>
                {config.primaryCta.label}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </Magnetic>
            {config.primaryCta.action !== "projects" && (
              <Button size="lg" variant="outline" onClick={() => runAction("projects")}>
                Explore work
              </Button>
            )}
            {config.primaryCta.action !== "cv" && (
              <Button size="lg" variant="outline" onClick={() => runAction("cv")}>
                <FileText size={16} /> CV
              </Button>
            )}
            {config.primaryCta.action !== "book" && (
              <Button size="lg" variant="ghost" onClick={openBooking}>
                <CalendarClock size={16} /> Book a call
              </Button>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p
              key={config.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 text-sm text-muted"
            >
              {config.lens}
            </motion.p>
          </AnimatePresence>
        </div>

        <PipelineCard className="w-full max-w-[560px] justify-self-center lg:justify-self-end" />
      </div>

      {/* credentials + stats strip */}
      <motion.div {...enter(0.8)} className="container relative mt-16 md:mt-20">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-[1.6fr_1fr]">
          <ul className="grid gap-px bg-border sm:grid-cols-3">
            {CREDENTIALS.map(({ icon: Icon, label, org }) => (
              <li key={org} className="flex items-center gap-3 bg-bg/80 p-5 backdrop-blur">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-elevated text-muted">
                  <Icon size={16} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="text-xs text-muted">{org}</span>
                </span>
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-3 gap-px bg-border">
            {config.stats.map((s) => (
              <div key={`${config.id}-${s.label}`} className="bg-bg/80 p-5 backdrop-blur">
                <dd className="text-2xl font-semibold tracking-tight">
                  <Counter value={s.value} />
                </dd>
                <dt className="mt-0.5 text-xs leading-snug text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-fg md:block"
      >
        <ArrowDown size={16} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
