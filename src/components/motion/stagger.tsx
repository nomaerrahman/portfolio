"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, inView, stagger as staggerVariants } from "./presets";

export function Stagger({
  stagger = 0.06,
  delay = 0,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number }) {
  return (
    <motion.div variants={staggerVariants(stagger, delay)} initial="hidden" whileInView="show" viewport={inView} {...rest}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
