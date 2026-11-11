import type { Transition, Variants } from "framer-motion";

/**
 * Single source of truth for motion. Every wrapper and component pulls from here,
 * so the site moves with one consistent "feel".
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

export const duration = { fast: 0.2, base: 0.45, slow: 0.7 };

export const spring = {
  /** UI state changes: pills, toggles, tabs */
  snappy: { type: "spring", stiffness: 420, damping: 34 } satisfies Transition,
  /** Hover lifts and card movement */
  soft: { type: "spring", stiffness: 180, damping: 22, mass: 0.6 } satisfies Transition,
  /** Magnetic buttons: quick to follow, settles without wobble */
  magnetic: { type: "spring", stiffness: 200, damping: 18, mass: 0.35 } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const stagger = (each = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

/** Viewport settings shared by scroll reveals. */
export const inView = { once: true, margin: "-64px" } as const;
