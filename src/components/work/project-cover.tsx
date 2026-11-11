import { cn } from "@/lib/utils";

/**
 * Generative cover from the project's two palette hues. Static by design; the
 * card animates it with a cheap transform on hover. Swap for a screenshot via
 * `image` when you have one.
 */
export function ProjectCover({
  palette,
  title,
  image,
  className,
}: {
  palette: [number, number];
  title: string;
  image?: string;
  className?: string;
}) {
  const [a, b] = palette;
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-[-10%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        style={{
          background: image
            ? `center/cover no-repeat url(${image})`
            : `radial-gradient(60% 60% at 25% 30%, hsl(${a} 85% 58% / .8), transparent 60%),
               radial-gradient(50% 55% at 80% 70%, hsl(${b} 85% 55% / .75), transparent 60%),
               radial-gradient(40% 40% at 60% 20%, hsl(${(a + b) / 2} 75% 68% / .45), transparent 60%),
               hsl(${a} 30% 8%)`,
        }}
      />
      {!image && (
        <svg className="absolute inset-0 h-full w-full opacity-35 mix-blend-overlay" viewBox="0 0 400 240" preserveAspectRatio="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M -10 ${40 + i * 22} C 100 ${10 + i * 22}, 260 ${80 + i * 20}, 410 ${30 + i * 24}`}
              fill="none"
              stroke="white"
              strokeWidth="0.7"
            />
          ))}
        </svg>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.4))]" />
      <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">{title}</span>
    </div>
  );
}
