"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { spring } from "./presets";

/**
 * Pulls its child gently toward the pointer, capped so it never drifts far
 * from its anchor. Mouse only; touch and reduced-motion users get a static button.
 */
export function Magnetic({
  children,
  strength = 0.2,
  max = 8,
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring.magnetic);
  const y = useSpring(useMotionValue(0), spring.magnetic);
  const clamp = (v: number) => Math.max(-max, Math.min(max, v));

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
