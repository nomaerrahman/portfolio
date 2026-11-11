"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { duration, ease, inView } from "./presets";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

/** Fades and lifts its children into view once. Transform + opacity only, so it stays on the compositor. */
export function Reveal({ delay = 0, y = 16, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: duration.slow, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
