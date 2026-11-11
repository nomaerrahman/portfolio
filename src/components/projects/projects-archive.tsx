"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard } from "@/components/work/project-card";
import { ProjectRow } from "./project-row";
import { CATEGORY_TONE } from "@/components/ui/badge";
import { useAudience } from "@/components/providers/audience-provider";
import { ease, spring } from "@/components/motion/presets";
import { allProjects, CATEGORIES, matchesQuery } from "@/lib/projects";
import type { ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type View = "grid" | "list";
type Sort = "featured" | "newest" | "az";

/** Reads initial state from the URL so filtered views are shareable. */
function readParams() {
  const p = new URLSearchParams(window.location.search);
  const cat = p.get("category") as ProjectCategory | null;
  return {
    q: p.get("q") ?? "",
    category: cat && CATEGORIES.includes(cat) ? cat : null,
    view: (p.get("view") === "list" ? "list" : "grid") as View,
  };
}

export function ProjectsArchive() {
  const { audience } = useAudience();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("featured");
  const ready = useRef(false);

  useEffect(() => {
    const s = readParams();
    setQ(s.q);
    setCategory(s.category);
    setView(s.view);
    ready.current = true;
  }, []);

  // Keep the URL in sync without adding history entries.
  useEffect(() => {
    if (!ready.current) return;
    const url = new URL(window.location.href);
    q ? url.searchParams.set("q", q) : url.searchParams.delete("q");
    category ? url.searchParams.set("category", category) : url.searchParams.delete("category");
    view === "list" ? url.searchParams.set("view", "list") : url.searchParams.delete("view");
    window.history.replaceState(null, "", url);
  }, [q, category, view]);

  const results = useMemo(() => {
    const list = allProjects.filter((p) => (!category || p.categories.includes(category)) && matchesQuery(p, q.trim()));
    if (sort === "az") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "newest") return list;
    // Featured: curated order first, then (in an audience view) relevance, then newest.
    return [...list].sort(
      (a, b) =>
        (a.featured ?? 99) - (b.featured ?? 99) ||
        (audience !== "all" ? b.relevance[audience] - a.relevance[audience] : 0)
    );
  }, [q, category, sort, audience]);

  const counts = useMemo(
    () => Object.fromEntries(CATEGORIES.map((c) => [c, allProjects.filter((p) => p.categories.includes(c)).length])),
    []
  );

  const chip = (active: boolean) =>
    cn(
      "relative shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors",
      active ? "text-bg" : "text-muted hover:text-fg"
    );

  return (
    <div>
      {/* Toolbar */}
      <div className="glass sticky top-[4.5rem] z-30 -mx-2 mb-8 grid gap-2 rounded-3xl p-2 md:top-20 md:grid-cols-[1fr_auto]">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search size={16} className="pointer-events-none absolute left-3.5 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, tool or topic: dbt, Next.js, NHS…"
            aria-label="Search projects"
            className="h-10 w-full rounded-2xl border border-transparent bg-bg/60 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-fg/25"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-2 grid h-7 w-7 place-items-center rounded-full text-muted hover:text-fg">
              <X size={14} />
            </button>
          )}
        </label>

        <div className="scrollbar-none flex items-center gap-1 overflow-x-auto md:col-span-2">
          <LayoutGroup id="archive-cats">
            {[null, ...CATEGORIES].map((c) => {
              const active = category === c;
              const n = c ? counts[c] : allProjects.length;
              if (c && !n) return null;
              return (
                <button key={c ?? "all"} onClick={() => setCategory(c)} className={chip(active)} aria-pressed={active}>
                  {active && <motion.span layoutId="archive-cat" className="absolute inset-0 rounded-full bg-fg" transition={spring.snappy} />}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {c && <span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(var(--${CATEGORY_TONE[c]}))` }} />}
                    {c ?? "All"}
                    <span className="font-mono text-[11px] opacity-60">{n}</span>
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="flex items-center gap-2 md:col-start-2 md:row-start-1">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort projects"
            className="h-10 rounded-2xl border border-transparent bg-bg/60 px-3 text-sm text-muted outline-none focus:border-fg/25"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="az">A–Z</option>
          </select>
          <div className="flex rounded-2xl bg-bg/60 p-1" role="group" aria-label="View">
            {(["grid", "list"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                aria-label={`${v} view`}
                className={cn(
                  "grid h-8 w-9 place-items-center rounded-xl transition-colors",
                  view === v ? "bg-elevated text-fg" : "text-muted hover:text-fg"
                )}
              >
                {v === "grid" ? <LayoutGrid size={15} /> : <List size={15} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted" aria-live="polite">
        {results.length === allProjects.length ? `${results.length} projects` : `${results.length} of ${allProjects.length} projects`}
        {category && <> in <span className="text-fg">{category}</span></>}
        {q && <> matching “<span className="text-fg">{q}</span>”</>}
      </p>

      {results.length === 0 ? (
        <div className="card grid place-items-center px-6 py-20 text-center">
          <p className="text-lg font-medium">No projects match that.</p>
          <p className="mt-1 text-sm text-muted">Try a different word, or clear the filters.</p>
          <button
            onClick={() => {
              setQ("");
              setCategory(null);
            }}
            className="mt-5 rounded-full border border-border px-4 py-2 text-sm hover:border-fg/40"
          >
            Clear filters
          </button>
        </div>
      ) : view === "grid" ? (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: ease.out }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <ul className="border-t border-border">
          {results.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
