import type { Project } from "@/lib/types";

const project: Project = {
  slug: "apex-home-auto",
  title: "APEX Craftsmen & Studio",
  tagline: "One demo site, four trades: an Industry Mode switcher re-skins everything live",
  summary:
    "A demo site for high-ticket service businesses (£1k–£250k jobs). An Industry Mode switcher swaps the content, imagery, pricing, estimator logic and accent colour live between auto detailing, home remodelling, landscaping and interior design, so the right version can be shown to each prospect on a call.",
  date: "2026-11",
  role: "Design & front-end development",
  categories: ["Client Work", "Full-Stack / Web"],
  format: "Client template",
  featured: 5,
  relevance: { corporate: 2, academic: 0, startup: 3 },
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Fontsource"],
  highlight: { value: "4", label: "industries in one codebase" },
  metrics: [
    { value: "4", label: "Trades switchable live" },
    { value: "?trade=", label: "Deep links per prospect" },
    { value: "0", label: "External font calls at build" },
  ],
  palette: [32, 210],
  links: { demo: "https://homeautoservices.vercel.app", repo: "https://github.com/nomaerrahman/Home-Auto-services" },
  caseStudy: {
    context: "Pitching high-ticket trades means showing each prospect a site that looks like it was built for their industry.",
    goal: "One codebase that can convincingly present as four different businesses during a demo call.",
    problem:
      "Building and maintaining a separate demo per trade multiplies work, and generic templates don't show off trade-specific features like estimators.",
    approach: [
      "A global TradeProvider drives content, imagery, pricing, estimator logic and CSS accent variables for the active trade.",
      "Shareable deep links (?trade=auto, remodel, landscape, interior); the last choice is remembered in the browser.",
      "Sections: hero, packages, craftsmanship, before/after transformations and a live project estimator.",
      "Lead endpoint stub ready to connect to a CRM; self-hosted fonts so builds need no network calls.",
    ],
    results: [
      "A single demo covers auto detailing, home remodelling, outdoor living and interior design.",
      "Rebranding is a matter of editing one BRAND object and swapping the logo.",
    ],
  },
};

export default project;
