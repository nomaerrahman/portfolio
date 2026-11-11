"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "./presets";
import { cn } from "@/lib/utils";

export type TextSegment = string | { accent: string };

/**
 * Word-level masked reveal. Lighter than per-letter animation and reads as more
 * confident. Segments marked `{ accent }` render in the serif italic accent style.
 */
export function WordReveal({
  segments,
  className,
  delay = 0,
  each = 0.06,
  accentClassName = "font-serif font-normal italic text-accent",
}: {
  segments: TextSegment[];
  className?: string;
  delay?: number;
  each?: number;
  accentClassName?: string;
}) {
  const reduce = useReducedMotion();
  const words = segments.flatMap((seg) =>
    typeof seg === "string"
      ? seg.split(" ").filter(Boolean).map((w) => ({ w, accent: false }))
      : seg.accent.split(" ").map((w) => ({ w, accent: true }))
  );
  const label = words.map((x) => x.w).join(" ");

  return (
    <span className={cn("inline", className)} aria-label={label}>
      {words.map(({ w, accent }, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className={cn("inline-block", accent && accentClassName)}
            initial={reduce ? { opacity: 0 } : { y: "105%" }}
            animate={reduce ? { opacity: 1 } : { y: "0%" }}
            transition={{ duration: 0.8, delay: delay + i * each, ease: ease.out }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
