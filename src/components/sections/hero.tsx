"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Briefcase, GraduationCap, Mail, Rocket } from "lucide-react";
import { HeroBackdrop } from "@/components/effects/hero-backdrop";
import { PipelineCard } from "@/components/effects/pipeline-card";
import { WordReveal } from "@/components/motion/kinetic-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Counter } from "@/components/motion/counter";
import { ease } from "@/components/motion/presets";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/hero";
import { profile } from "@/data/profile";
import { allProjects } from "@/lib/projects";

const CREDENTIALS = [
  { icon: Rocket, label: "Co-founder", org: "HypeSpark" },
  { icon: Briefcase, label: "Junior Data Engineer", org: "Carrot Soft" },
  { icon: GraduationCap, label: profile.degree, org: profile.university },
];

const liveSites = allProjects.filter((p) => p.links.demo && !p.links.demo.startsWith("/")).length;
const STATS = [
  { value: String(allProjects.length), label: "Projects shipped" },
  { value: String(liveSites), label: "Live sites & apps" },
  { value: "35%", label: "Less reporting time at Carrot Soft" },
];

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: ease.out },
});

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Who I am and what I do, in one screen. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <HeroBackdrop />

      <div className="container relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <motion.p {...enter(0)} className="text-[15px] text-muted">
            {hero.greeting} <span aria-hidden>👋</span>
          </motion.p>

          <h1 className="t-display mt-4 max-w-[15ch] text-balance">
            <WordReveal segments={hero.headline} delay={0.1} />
          </h1>

          <motion.ul {...enter(0.35)} className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
            {hero.roles.map((r) => (
              <li key={r} className="rounded-full border border-border bg-surface/60 px-3 py-1 text-sm">
                {r}
              </li>
            ))}
          </motion.ul>

          <motion.p {...enter(0.45)} className="t-lead mt-6 max-w-[56ch] text-pretty">
            {hero.lead}
          </motion.p>

          <motion.div {...enter(0.6)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button size="lg" onClick={() => go("work")}>
                See my work
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </Magnetic>
            <Button size="lg" variant="outline" onClick={() => go("contact")}>
              <Mail size={16} /> Get in touch
            </Button>
          </motion.div>
        </div>

        <PipelineCard className="w-full max-w-[560px] justify-self-center lg:justify-self-end" />
      </div>

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
            {STATS.map((s) => (
              <div key={s.label} className="bg-bg/80 p-5 backdrop-blur">
                <dd className="text-2xl font-semibold tracking-tight">
                  <Counter value={s.value} />
                </dd>
                <dt className="mt-0.5 text-xs leading-snug text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      <a href="#work" aria-label="Scroll to work" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-fg md:block">
        <ArrowDown size={16} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
