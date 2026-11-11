import type { Project } from "@/lib/types";

const project: Project = {
  slug: "portfolio",
  title: "This Portfolio",
  tagline: "Audience-aware portfolio with a scalable project archive and typed content layer",
  summary:
    "The site you're on. One codebase serves recruiters, academic committees and clients: an audience switcher re-ranks work and changes calls to action, while a searchable archive and per-project case-study pages keep the homepage short as projects grow.",
  date: "2026-11",
  role: "Design & engineering",
  categories: ["Full-Stack / Web"],
  format: "Open source",
  relevance: { corporate: 2, academic: 1, startup: 2 },
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
  highlight: { value: "1 file", label: "to add a project" },
  metrics: [
    { value: "4", label: "Audience views" },
    { value: "1 file", label: "Per new project" },
    { value: "SSG", label: "Static case-study pages" },
  ],
  palette: [16, 214],
  links: { demo: "/", repo: "https://github.com/nomaerrahman/portfolio" },
  caseStudy: {
    context: "One site has to work for recruiters, academic committees and agency clients, who each care about different things.",
    goal: "Show the most relevant work first, keep the homepage short, and make it easy to keep adding projects.",
    problem: "Portfolios get cluttered as projects pile up, or split into separate sites that drift out of date.",
    approach: [
      "Each project is one typed file in src/data/projects; the archive, homepage and case-study pages all read from it.",
      "The homepage shows a short featured set; everything lives in a searchable, filterable archive with grid and list views.",
      "Every project gets a statically generated page with its own URL and metadata.",
      "One motion preset file shared by every animation, with reduced-motion support throughout.",
    ],
    snippet: {
      language: "ts",
      filename: "data/projects/index.ts",
      code: `// Adding a project: create one file, then add it here.
import retail from "./retail-elt-pipeline";
import gp from "./gp-demand-forecasting";
// …
export const projects: Project[] = [retail, gp /* … */];`,
    },
    results: ["Shareable audience links (?view=academic) and per-project URLs for applications and proposals."],
  },
};

export default project;
