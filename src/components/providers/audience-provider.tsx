"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Audience } from "@/lib/types";
import { SECTION_ORDER, audienceById, type AudienceConfig } from "@/lib/audience";

interface AudienceState {
  audience: Audience;
  config: AudienceConfig;
  setAudience: (a: Audience) => void;
}

const AudienceContext = createContext<AudienceState | null>(null);
const STORAGE_KEY = "portfolio:audience";
const VALID: Audience[] = ["all", "corporate", "academic", "startup"];

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("all");

  // Initialise from ?view= (shareable links for recruiters / committees) then localStorage.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("view") as Audience | null;
    let initial: Audience | null = fromUrl && VALID.includes(fromUrl) ? fromUrl : null;
    if (!initial) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as Audience | null;
        if (stored && VALID.includes(stored)) initial = stored;
      } catch {}
    }
    if (initial) setAudienceState(initial);
  }, []);

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a);
    try {
      localStorage.setItem(STORAGE_KEY, a);
    } catch {}
    const url = new URL(window.location.href);
    if (a === "all") url.searchParams.delete("view");
    else url.searchParams.set("view", a);
    window.history.replaceState(null, "", url);
  }, []);

  const value = useMemo(
    () => ({ audience, config: audienceById(audience), setAudience }),
    [audience, setAudience]
  );

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used inside <AudienceProvider>");
  return ctx;
}

/** Two-digit position of a section in the stable page order, e.g. "02". */
export function useSectionIndex(id: import("@/lib/audience").SectionId) {
  return String(SECTION_ORDER.indexOf(id) + 1).padStart(2, "0");
}
