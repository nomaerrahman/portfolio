import type { Project } from "@/lib/types";

const project: Project = {
  slug: "portfolio",
  title: "This Portfolio",
  tagline: "Builder portfolio with a scalable project archive, case-study pages and typed content layer",
  summary:
    "The site you're on. It answers five questions (who I am, what I do, what I've built, what's next and what I'm into) and keeps the homepage short with a searchable archive and a case-study page per project.",
  date: "2026-11",
  role: "Design & engineering",
  categories: ["Full-Stack / Web"],
  format: "Open source",
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
  highlight: { value: "1 file", label: "to add a project" },
  metrics: [
    { value: "13", label: "Case-study pages" },
    { value: "1 file", label: "Per new project" },
    { value: "SSG", label: "Static case-study pages" },
  ],
  palette: [16, 214],
  links: { demo: "/", repo: "https://github.com/nomaerrahman/portfolio" },
  caseStudy: {
    context: "A portfolio should say clearly who you are and show the work, without trying to speak to every possible audience at once.",
    goal: "One clear story, a short homepage, and a structure that keeps working as projects are added.",
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
    results: ["Per-project URLs to share in applications and proposals, and a homepage that stays the same length however many projects are added."],
  },
};

export default project;
