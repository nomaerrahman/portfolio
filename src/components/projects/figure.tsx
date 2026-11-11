import Image from "next/image";
import type { ProjectImage } from "@/lib/types";
import { cn } from "@/lib/utils";

/** A chart or screenshot in a framed figure with caption. Opens full size in a new tab. */
export function Figure({ image, priority, className }: { image: ProjectImage; priority?: boolean; className?: string }) {
  return (
    <figure className={cn("group", className)}>
      <a
        href={image.src}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "block overflow-hidden rounded-2xl border border-border transition-colors hover:border-fg/30",
          image.light ? "bg-white p-2 md:p-3" : "bg-surface"
        )}
        aria-label={`Open full size: ${image.alt}`}
      >
        <div className="relative w-full" style={{ aspectRatio: image.ratio }}>
          <Image src={image.src} alt={image.alt} fill priority={priority} sizes="(min-width: 1024px) 760px, 100vw" className="object-contain" />
        </div>
      </a>
      {image.caption && <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>}
    </figure>
  );
}
