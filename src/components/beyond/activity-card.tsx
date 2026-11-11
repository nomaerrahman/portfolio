"use client";

import { Badge } from "@/components/ui/badge";
import { HoverLift } from "@/components/motion/hover-lift";
import type { Hobby } from "@/data/hobbies";
import { useActivity } from "./use-active";
import { cn } from "@/lib/utils";

/**
 * Shared shell for the hobby cards: title, group, lesson and traits, with an
 * illustration slot that receives `active`.
 */
export function ActivityCard({
  hobby,
  className,
  artClassName,
  render,
}: {
  hobby: Hobby;
  className?: string;
  artClassName?: string;
  render: (active: boolean) => React.ReactNode;
}) {
  const { ref, active, bind } = useActivity<HTMLDivElement>();
  const tone = hobby.group === "Strategy" ? "academic" : "accent";

  return (
    <HoverLift className={cn("h-full", className)} lift={3}>
      <div
        ref={ref}
        {...bind}
        tabIndex={0}
        className={cn(
          "card group relative flex h-full flex-col overflow-hidden p-5 outline-none md:p-6",
          active && "border-fg/20"
        )}
      >
        {/* tone wash that fades in when active */}
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500", active && "opacity-100")}
          style={{ background: `radial-gradient(80% 60% at 50% 0%, hsl(var(--${tone}) / 0.08), transparent 70%)` }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="t-eyebrow !text-[10px]">{hobby.group}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">{hobby.name}</h3>
          </div>
          {hobby.stat && (
            <div className="text-right">
              <p className="text-2xl font-semibold tracking-tight" style={{ color: `hsl(var(--${tone}))` }}>
                {hobby.stat.value}
              </p>
              <p className="text-[11px] text-muted">{hobby.stat.label}</p>
            </div>
          )}
        </div>

        <div className={cn("relative my-5", artClassName)}>{render(active)}</div>

        <p className="relative mt-auto text-pretty text-sm leading-relaxed text-muted">{hobby.lesson}</p>
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {hobby.traits.map((t) => (
            <Badge key={t} tone="">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </HoverLift>
  );
}
