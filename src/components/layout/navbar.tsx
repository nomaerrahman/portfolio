"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { profile } from "@/data/profile";
import { NAV_SECTIONS, SECTION_LABELS, type SectionId } from "@/lib/audience";
import { ease } from "@/components/motion/presets";
import { cn } from "@/lib/utils";

/**
 * Which homepage section is under the reading line (40% from the top).
 * Returns null over the hero, so nothing is highlighted at the top of the page.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    if (!enabled) return setActive(null);
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current: SectionId | null = null;
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);
  return active;
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onProjects = pathname.startsWith("/projects");
  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  const items = NAV_SECTIONS.map((id) =>
    id === "work"
      ? { id, href: "/projects", label: "Projects", current: onProjects || (onHome && active === "work") }
      : { id, href: onHome ? `#${id}` : `/#${id}`, label: SECTION_LABELS[id], current: onHome && active === id }
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-border/70 bg-bg/80 backdrop-blur-xl" : "border-transparent"
        )}
      >
        <nav aria-label="Primary" className="container flex h-16 items-center justify-between gap-6">
          <Link href={onHome ? "#top" : "/"} className="flex items-center gap-2.5" aria-label={onHome ? "Back to top" : "Home"}>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-fg font-mono text-[11px] font-bold text-bg">N</span>
            <span className="text-[15px] font-semibold tracking-tight">{profile.name}</span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="mr-3 hidden items-center gap-1 md:flex">
              {items.map((it) => (
                <li key={it.id}>
                  <Link
                    href={it.href}
                    aria-current={it.current ? "page" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm transition-colors duration-200",
                      it.current ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {it.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-[13px] h-px bg-fg transition-opacity duration-200",
                        it.current ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm transition-colors hover:border-fg/40 sm:inline-flex"
            >
              <FileText size={14} /> CV
            </a>
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: ease.out }}
              className="overflow-hidden border-t border-border md:hidden"
            >
              <ul className="container py-3">
                {items.map((it) => (
                  <li key={it.id}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className={cn("block py-3 text-lg", it.current ? "text-fg" : "text-muted")}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="block py-3 text-lg text-muted">
                    CV
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
