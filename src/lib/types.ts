export type Audience = "all" | "corporate" | "academic" | "startup";
export type Track = Exclude<Audience, "all">;

export type ProjectCategory = "Data Engineering" | "Full-Stack / Web" | "Academic / AI" | "Startup Ventures";
export type ProjectFormat = "Case study" | "Publication" | "Open source" | "Client work";

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

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: number;
  role: string;
  categories: ProjectCategory[];
  format: ProjectFormat;
  /** Which audiences this project is relevant to, and how strongly (0-3). Drives filtering & ranking. */
  relevance: Record<Track, number>;
  stack: string[];
  highlight: Metric;
  metrics: Metric[];
  /** Two HSL hue values used to paint the generative cover / preview. */
  palette: [number, number];
  /** Optional preview video (mp4/webm) shown on hover. Drop files in /public/previews. */
  previewVideo?: string;
  links: {
    /** Live site or demo */
    demo?: string;
    /** Source code */
    repo?: string;
    /** Paper, poster or dataset page */
    paper?: string;
  };
  caseStudy: {
    context: string;
    goal: string;
    problem: string;
    foundation: string;
    architecture: string[];
    snippet?: CodeSnippet;
    impact: string[];
    testimonial?: Testimonial;
  };
}

export type ResearchKind = "Paper" | "Poster" | "Dataset" | "Thesis" | "Teaching" | "Award";

export interface ResearchItem {
  id: string;
  kind: ResearchKind;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status?: "Published" | "Under review" | "In preparation" | "Completed";
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
  doi?: string;
  codeUrl?: string;
  bibtex?: string;
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
