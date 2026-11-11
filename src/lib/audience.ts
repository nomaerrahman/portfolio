import type { Audience, Track } from "./types";

export type SectionId = "work" | "research" | "startup" | "about" | "beyond" | "contact";

/** Stable page order. Audience modes change emphasis, never navigation. */
export const SECTION_ORDER: SectionId[] = ["work", "research", "startup", "about", "beyond", "contact"];

export const SECTION_LABELS: Record<SectionId, string> = {
  work: "Work",
  research: "Research",
  startup: "Venture",
  about: "About",
  beyond: "Beyond",
  contact: "Contact",
};

export interface AudienceConfig {
  id: Audience;
  label: string;
  short: string;
  /** CSS variable name of this audience's colour token. */
  tone: "accent" | Track;
  /** One line under the hero CTAs explaining what this lens emphasises. */
  lens: string;
  primaryCta: { label: string; action: "projects" | "book" | "cv" };
  inquiry: InquiryType;
  stats: { value: string; label: string }[];
}

export type InquiryType = "recruiter" | "academic" | "client";

export const AUDIENCES: AudienceConfig[] = [
  {
    id: "all",
    label: "All Work",
    short: "All",
    tone: "accent",
    lens: "Showing everything: engineering, research and venture work side by side.",
    primaryCta: { label: "Explore projects", action: "projects" },
    inquiry: "recruiter",
    stats: [
      { value: "12+", label: "Systems shipped" },
      { value: "3", label: "Research outputs" },
      { value: "20+", label: "Agency clients" },
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    short: "Corp",
    tone: "corporate",
    lens: "Recruiter lens: production systems and measurable impact first.",
    primaryCta: { label: "View CV", action: "cv" },
    inquiry: "recruiter",
    stats: [
      { value: "40%", label: "Faster pipeline runs" },
      { value: "99.9%", label: "Job reliability" },
      { value: "5", label: "Teams supported" },
    ],
  },
  {
    id: "academic",
    label: "Academic",
    short: "Acad",
    tone: "academic",
    lens: "Academic lens: research outputs, methods and datasets first.",
    primaryCta: { label: "Academic CV", action: "cv" },
    inquiry: "academic",
    stats: [
      { value: "3", label: "Papers & posters" },
      { value: "1", label: "Open dataset" },
      { value: "2", label: "TA modules" },
    ],
  },
  {
    id: "startup",
    label: "Startup / Venture",
    short: "Venture",
    tone: "startup",
    lens: "Client lens: shipped products, turnaround times and outcomes first.",
    primaryCta: { label: "Book a call", action: "book" },
    inquiry: "client",
    stats: [
      { value: "2 wk", label: "Typical launch" },
      { value: "4.8★", label: "Avg. client review" },
      { value: "3×", label: "Review volume lift" },
    ],
  },
];

export const audienceById = (id: Audience) => AUDIENCES.find((a) => a.id === id) ?? AUDIENCES[0];

export const toneVar = (tone: AudienceConfig["tone"]) => `hsl(var(--${tone}))`;
