"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** A card with a radial glow that follows the pointer and a subtle 3D tilt. */
export function SpotlightCard({
  children,
  className,
  glow = "var(--accent)",
  tilt = true,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { glow?: string; tilt?: boolean }) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const rX = useSpring(0, { stiffness: 200, damping: 20 });
  const rY = useSpring(0, { stiffness: 200, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, hsl(${glow} / 0.14), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, hsl(${glow} / 0.7), transparent 70%)`;

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
        if (tilt && e.pointerType === "mouse") {
          rY.set(((e.clientX - r.left) / r.width - 0.5) * 6);
          rX.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
        }
      }}
      onPointerLeave={() => {
        mx.set(-500);
        my.set(-500);
        rX.set(0);
        rY.set(0);
      }}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
      className={cn("group/spot relative rounded-3xl border border-border bg-surface/60 backdrop-blur-sm", className)}
      {...(rest as object)}
    >
      {/* glowing border */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: border,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
