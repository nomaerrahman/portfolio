import { cn } from "@/lib/utils";

export const CATEGORY_TONE: Record<string, string> = {
  "Data Engineering": "corporate",
  "Full-Stack / Web": "web",
  "Academic / AI": "academic",
  "Startup Ventures": "startup",
};
const TONES = CATEGORY_TONE;

export function Badge({
  children,
  tone,
  className,
}: {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}) {
  const t = tone === "" ? undefined : tone ?? (typeof children === "string" ? TONES[children] : undefined);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider",
        !t && "border-border text-muted",
        className
      )}
      style={
        t
          ? {
              color: `hsl(var(--${t}))`,
              borderColor: `hsl(var(--${t}) / 0.35)`,
              background: `hsl(var(--${t}) / 0.08)`,
            }
          : undefined
      }
    >
      {t && <span className="h-1 w-1 rounded-full" style={{ background: `hsl(var(--${t}))` }} />}
      {children}
    </span>
  );
}
