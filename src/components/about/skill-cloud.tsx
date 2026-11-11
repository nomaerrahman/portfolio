"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { skills } from "@/data/profile";
import type { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

const GROUPS: Skill["group"][] = ["Data", "ML / Research", "Engineering", "Product & Growth"];

export function SkillCloud() {
  const [group, setGroup] = useState<Skill["group"] | null>(null);
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g}
            onMouseEnter={() => setGroup(g)}
            onMouseLeave={() => setGroup(null)}
            onClick={() => setGroup((cur) => (cur === g ? null : g))}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition",
              group === g ? "bg-fg text-bg" : "text-muted hover:text-fg"
            )}
          >
            {g}
          </button>
        ))}
      </div>
      <motion.ul
        className="flex flex-wrap gap-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
      >
        {skills.map((s) => {
          const on = !group || s.group === group;
          return (
            <motion.li
              key={s.name}
              variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
              whileHover={{ y: -3 }}
              animate={{ opacity: on ? 1 : 0.25 }}
              className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-2 text-sm"
            >
              {s.name}
              <span className="flex gap-0.5" aria-label={`Level ${s.level} of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className={cn("h-1 w-1 rounded-full", i < s.level ? "bg-accent" : "bg-border")} />
                ))}
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
