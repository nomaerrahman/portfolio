import type { Project } from "@/lib/types";

const project: Project = {
  slug: "hypespark",
  title: "HypeSpark Studio Website",
  tagline: "Accessible, statically generated site for a UK digital transformation studio",
  summary:
    "The website for HypeSpark, a founder-led UK digital transformation studio. Built with Next.js 15, it has a statically generated page per service, light and dark themes, and automated accessibility testing: 44 axe-core WCAG 2.2 AA scans across pages, themes and screen sizes with zero violations.",
  date: "2026-11",
  role: "Design, research & front-end development",
  categories: ["Full-Stack / Web", "Client Work"],
  format: "Case study",
  relevance: { corporate: 2, academic: 0, startup: 3 },
  stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "axe-core", "Playwright"],
  highlight: { value: "0", label: "WCAG 2.2 AA violations in 44 scans" },
  metrics: [
    { value: "44", label: "Automated accessibility scans" },
    { value: "0", label: "WCAG 2.2 AA violations" },
    { value: "14", label: "Statically generated routes" },
    { value: "7", label: "Service pages" },
  ],
  palette: [24, 280],
  links: { demo: "https://hypespark-three.vercel.app" },
  caseStudy: {
    context: "HypeSpark is a founder-led studio helping UK businesses modernise their digital presence and operations.",
    goal: "A fast, credible site that explains each service clearly and is accessible to everyone, provably.",
    problem:
      "Studio sites often lean on invented metrics and testimonials, and accessibility is rarely tested beyond a manual check.",
    approach: [
      "Researched and documented design and accessibility decisions in a design audit before building.",
      "Home page plus one statically generated page per service (7), with sitemap, robots and a custom 404.",
      "All copy in one typed content file; colours only as CSS variables, checked by a Python script for WCAG contrast and colour-blindness.",
      "An axe-core + Playwright script scans every page in light and dark themes at desktop and mobile widths, including open menus and form error states.",
      "Deliberately no invented metrics or testimonials: proof gets added as real case studies come in.",
    ],
    results: [
      "44 automated WCAG 2.2 AA scans with 0 violations.",
      "Production build with zero type or lint errors across 14 static routes.",
    ],
  },
};

export default project;
