import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between", className)}>
      <Reveal className="max-w-3xl">
        <p className="t-eyebrow mb-4 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-border" />
          {eyebrow}
        </p>
        <h2 className="t-h1 text-balance">{title}</h2>
        {description && <p className="t-lead mt-4 max-w-2xl text-pretty">{description}</p>}
      </Reveal>
      {children && <Reveal delay={0.1}>{children}</Reveal>}
    </div>
  );
}
