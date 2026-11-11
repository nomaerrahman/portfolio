"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Refined cursor tracking: a large, very faint light that trails the pointer
 * behind content. The native cursor stays untouched. Fine pointers only.
 */
export function PointerSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 24, mass: 0.6 });
  const y = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 24, mass: 0.6 });
  const bg = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, hsl(var(--accent) / 0.06), transparent 65%)`;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background: bg }} />;
}
