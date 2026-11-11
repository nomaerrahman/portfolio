"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { spring } from "./presets";

/** Physics-based hover lift for cards. Uses transform only, so no layout shift. */
export function HoverLift({ lift = 4, children, ...rest }: HTMLMotionProps<"div"> & { lift?: number }) {
  return (
    <motion.div whileHover={{ y: -lift }} whileTap={{ scale: 0.99 }} transition={spring.soft} {...rest}>
      {children}
    </motion.div>
  );
}
