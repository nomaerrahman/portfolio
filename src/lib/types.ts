export type Audience = "all" | "corporate" | "academic" | "startup";
export type Track = Exclude<Audience, "all">;

export type ProjectCategory = "Data Engineering" | "Data Science & Analytics" | "Full-Stack / Web" | "Client Work";
export type ProjectFormat = "Case study" | "Analysis" | "Web app" | "Client template" | "Open source";

export interface Metric {
  label: string;
  value: string;
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  /** width / height, used to reserve space and avoid layout shift */
  ratio: number;
  /** Charts on light backgrounds render inside a light "figure" frame. */
  light?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  /** One line for cards. */
  tagline: string;
  /** Two or three sentences for the case-study header and SEO description. */
  summary: string;
  /** ISO month, e.g. "2026-10". Used for sorting and the year label. */
  date: string;
  role: string;
  categories: ProjectCategory[];
  format: ProjectFormat;
  /** Lower numbers appear first on the homepage "All" view. Omit to keep it archive-only. */
  featured?: number;
  /** How relevant this is to each audience (0-3). Drives ranking. */
  relevance: Record<Track, number>;
  stack: string[];
  highlight: Metric;
  metrics: Metric[];
  /** Two HSL hues for the generative cover. */
  palette: [number, number];
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  links: {
    demo?: string;
    repo?: string;
    /** Extra documents, e.g. a PRD or business case in the repo */
    docs?: { label: string; href: string }[];
  };
  caseStudy: {
    context: string;
    goal: string;
    problem: string;
    approach: string[];
    snippet?: CodeSnippet;
    results: string[];
    limitations?: string[];
    testimonial?: Testimonial;
  };
}

export type AcademicKind = "Dissertation" | "Final-year project" | "Coursework" | "Group coursework" | "Report" | "Essay" | "Research proposal";

export interface AcademicWork {
  id: string;
  kind: AcademicKind;
  title: string;
  /** Module name, e.g. "Distributed Data Analysis" (no module codes) */
  module?: string;
  year: string;
  /** Optional: show only marks you are happy to share, e.g. "First", "Distinction", "78%". */
  grade?: string;
  summary: string;
  skills: string[];
  /** PDF in /public/academic/<degree>/ */
  pdfUrl?: string;
  /** Extra documents for the same piece, e.g. a supporting file or appendix. */
  extraPdfs?: { label: string; url: string }[];
  repoUrl?: string;
  /** Show at the top of its degree with more space (e.g. the dissertation). */
  highlight?: boolean;
}

export interface Degree {
  id: string;
  title: string;
  institution: string;
  period?: string;
  status: "In progress" | "Completed";
  note?: string;
  /** Shown as a line under the works, e.g. "Dissertation in progress". */
  upcoming?: string;
  works: AcademicWork[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  org: string;
  track: Track;
  description: string;
}

export interface Skill {
  name: string;
  group: "Data" | "ML / Research" | "Engineering" | "Product & Growth";
  level: number; // 1-5
}
