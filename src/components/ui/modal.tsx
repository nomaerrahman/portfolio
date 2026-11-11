"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { EASE, cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
  /** "center" for dialogs, "right" for a side drawer. */
  variant?: "center" | "right";
  className?: string;
}

export function Modal({ open, onClose, children, label, variant = "center", className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const isDrawer = variant === "right";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={label}>
          <motion.div
            className="absolute inset-0 bg-bg/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex",
              isDrawer ? "justify-end" : "items-center justify-center p-4"
            )}
          >
            <motion.div
              initial={isDrawer ? { x: "100%" } : { opacity: 0, y: 30, scale: 0.97 }}
              animate={isDrawer ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isDrawer ? { x: "100%" } : { opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
              className={cn(
                "pointer-events-auto relative overflow-hidden border bg-surface shadow-2xl",
                isDrawer ? "h-full w-full max-w-[880px] border-l" : "w-full max-w-3xl rounded-3xl",
                className
              )}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur transition hover:rotate-90 hover:text-fg"
              >
                <X size={18} />
              </button>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
