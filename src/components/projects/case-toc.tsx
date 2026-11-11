"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky table of contents with scroll-spy for case-study pages. */
export function CaseToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
      <p className="t-eyebrow mb-4">On this page</p>
      <ul className="space-y-1 border-l border-border">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                active === id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
