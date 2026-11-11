"use client";

import { motion } from "framer-motion";
import { useAudience } from "@/components/providers/audience-provider";
import { AUDIENCES, toneVar } from "@/lib/audience";
import { cn } from "@/lib/utils";
import { spring } from "@/components/motion/presets";

export function AudienceSwitcher({ className, compact }: { className?: string; compact?: boolean }) {
  const { audience, setAudience } = useAudience();

  return (
    <div
      role="radiogroup"
      aria-label="Audience view"
      className={cn(
        "relative flex items-center gap-0.5 rounded-full border border-border bg-surface/70 p-1 backdrop-blur-xl",
        className
      )}
    >
      {AUDIENCES.map((a) => {
        const active = audience === a.id;
        return (
          <button
            key={a.id}
            role="radio"
            aria-checked={active}
            onClick={() => setAudience(a.id)}
            className={cn(
              "relative z-10 flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 md:px-3.5",
              active ? "text-bg" : "text-muted hover:text-fg"
            )}
          >
            {active && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: toneVar(a.tone) }}
                transition={spring.snappy}
              />
            )}
            {compact ? a.short : a.label}
          </button>
        );
      })}
    </div>
  );
}
