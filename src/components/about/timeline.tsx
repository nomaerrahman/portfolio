"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useAudience } from "@/components/providers/audience-provider";
import { timeline } from "@/data/profile";
import { EASE, cn } from "@/lib/utils";

const TRACK_LABEL = { academic: "Academic", corporate: "Industry", startup: "Venture" } as const;

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { audience } = useAudience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-3 md:ml-0">
      <span className="absolute bottom-0 left-0 top-0 w-px bg-border md:left-[120px]" aria-hidden />
      <motion.span
        style={{ scaleY }}
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-academic via-startup to-corporate md:left-[120px]"
        aria-hidden
      />
      {timeline.map((t, i) => {
        const muted = audience !== "all" && audience !== t.track;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className={cn(
              "relative grid gap-1 pb-12 pl-8 transition-opacity duration-500 md:grid-cols-[120px_1fr] md:gap-0 md:pl-0",
              muted && "opacity-40"
            )}
          >
            <span className="font-mono text-sm text-muted md:pr-8 md:text-right">{t.year}</span>
            <span
              className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-bg md:left-[120px]"
              style={{ background: `hsl(var(--${t.track}))` }}
            />
            <div className="md:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: `hsl(var(--${t.track}))` }}>
                {TRACK_LABEL[t.track]}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{t.title}</h3>
              <p className="text-sm text-muted">{t.org}</p>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg/80">{t.description}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
