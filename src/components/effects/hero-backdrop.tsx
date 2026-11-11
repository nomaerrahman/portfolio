"use client";

import { useAudience } from "@/components/providers/audience-provider";

/**
 * Calm, GPU-cheap hero backdrop: a faded grid plus one radial glow tinted by
 * the active audience. No blur filters and no continuous animation.
 */
export function HeroBackdrop() {
  const { config } = useAudience();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(60% 55% at 78% 30%, hsl(var(--${config.tone}) / 0.16), transparent 70%),
                       radial-gradient(45% 45% at 10% 0%, hsl(var(--fg) / 0.05), transparent 70%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
