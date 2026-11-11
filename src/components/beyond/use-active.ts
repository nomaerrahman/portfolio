"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Drives a card's animation. Mouse users: active while hovered or focused.
 * Touch users: active while the card is mostly in view. Reduced motion: never.
 */
export function useActivity<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.6 });
  const [touch, setTouch] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => setTouch(window.matchMedia("(hover: none)").matches), []);

  const active = !reduce && (touch ? inView : hover);
  const bind = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
  };
  return { ref, active, bind };
}

/** Counts up while active; resets when inactive. */
export function useTicker(active: boolean, everyMs: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    const id = setInterval(() => setN((x) => x + 1), everyMs);
    return () => clearInterval(id);
  }, [active, everyMs]);
  return n;
}
