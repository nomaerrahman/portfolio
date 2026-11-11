"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AudienceSwitcher } from "./audience-switcher";
import { useTheme } from "@/components/providers/theme-provider";
import { profile } from "@/data/profile";
import { SECTION_LABELS, SECTION_ORDER, type SectionId } from "@/lib/audience";
import { ease, spring } from "@/components/motion/presets";
import { cn } from "@/lib/utils";

/** Tracks which section is currently in view, for the active nav indicator. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const els = SECTION_ORDER.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { scrollY, scrollYProgress } = useScroll();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev + 4 && y > 480 && !open);
    if (y < prev - 4) setHidden(false);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.35, ease: ease.out }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[1240px] items-center justify-between gap-3 rounded-full px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 md:px-4",
            scrolled ? "glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]" : "border border-transparent"
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5 pl-1" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-fg font-mono text-xs font-bold text-bg transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
              N
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight">{profile.shortName}</span>
              <span className="font-mono text-[10px] text-muted">@{profile.handle}</span>
            </span>
          </a>

          <AudienceSwitcher className="hidden lg:flex" />

          <div className="flex items-center gap-1">
            <ul className="mr-1 hidden items-center xl:flex">
              {SECTION_ORDER.map((id) => (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    className={cn(
                      "relative block rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
                      active === id ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {active === id && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-elevated" transition={spring.snappy} />
                    )}
                    {SECTION_LABELS[id]}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -60, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 60, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg xl:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.div className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: ease.out }}
            className="glass fixed inset-x-3 top-[4.75rem] z-50 origin-top rounded-3xl p-3 shadow-2xl md:top-20 xl:hidden"
          >
            <div className="lg:hidden">
              <p className="t-eyebrow px-2 pb-2 pt-1">View as</p>
              <AudienceSwitcher compact className="mb-3 w-full" />
            </div>
            {SECTION_ORDER.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium transition-colors hover:bg-elevated",
                  active === id && "bg-elevated"
                )}
              >
                {SECTION_LABELS[id]}
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
