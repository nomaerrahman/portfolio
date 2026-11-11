import type { Audience, Track } from "./types";

export type SectionId = "work" | "academic" | "startup" | "about" | "beyond" | "contact";

/** Stable page order. Audience modes change emphasis, never navigation. */
export const SECTION_ORDER: SectionId[] = ["work", "academic", "startup", "about", "beyond", "contact"];

/** Sections shown in the header (Beyond is reachable by scrolling). */
export const NAV_SECTIONS: SectionId[] = ["work", "academic", "startup", "about", "contact"];

export const SECTION_LABELS: Record<SectionId, string> = {
  work: "Work",
  academic: "Academic",
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
    label: "Everyone",
    short: "Everyone",
    tone: "accent",
    lens: "Showing everything: engineering, analytics, academic and venture work.",
    primaryCta: { label: "Explore projects", action: "projects" },
    inquiry: "recruiter",
    stats: [
      { value: "12", label: "Projects with write-ups" },
      { value: "4", label: "Data case studies" },
      { value: "6", label: "Live web apps & sites" },
    ],
  },
  {
    id: "corporate",
    label: "Recruiters",
    short: "Recruiters",
    tone: "corporate",
    lens: "Recruiter lens: production systems and measurable impact first.",
    primaryCta: { label: "View CV", action: "cv" },
    inquiry: "recruiter",
    stats: [
      { value: "35%", label: "Less reporting time at Carrot Soft" },
      { value: "42", label: "Automated dbt data tests" },
      { value: "1.6%", label: "Forecast back-test error" },
    ],
  },
  {
    id: "academic",
    label: "Academics",
    short: "Academics",
    tone: "academic",
    lens: "Academic lens: degrees, coursework and analytical case studies first.",
    primaryCta: { label: "Academic CV", action: "cv" },
    inquiry: "academic",
    stats: [
      { value: "128", label: "Back-test forecasts scored" },
      { value: "4,500", label: "Simulated pharmacy days" },
      { value: "6", label: "MSc coursework pieces" },
    ],
  },
  {
    id: "startup",
    label: "Clients",
    short: "Clients",
    tone: "startup",
    lens: "Client lens: HypeSpark and live client sites first.",
    primaryCta: { label: "Get in touch", action: "book" },
    inquiry: "client",
    stats: [
      { value: "7", label: "HypeSpark services" },
      { value: "6", label: "Live client-style sites" },
      { value: "AA", label: "WCAG 2.2 accessibility target" },
    ],
  },
];

export const audienceById = (id: Audience) => AUDIENCES.find((a) => a.id === id) ?? AUDIENCES[0];

export const toneVar = (tone: AudienceConfig["tone"]) => `hsl(var(--${tone}))`;
