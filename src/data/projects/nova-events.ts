import type { Project } from "@/lib/types";

const project: Project = {
  slug: "nova-events",
  title: "NOVA Events & Culinary",
  tagline: "Luxury events and catering site with a live budget estimator and tiered packages",
  summary:
    "A reference site for a luxury event production and catering company. Visitors compare three service tiers with an expandable feature matrix, filter the catering menu by dietary need, and get an instant budget estimate with a cost breakdown before booking a consultation.",
  date: "2026-11",
  role: "Design & front-end development",
  categories: ["Client Work", "Full-Stack / Web"],
  format: "Client template",
  relevance: { corporate: 1, academic: 0, startup: 3 },
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide"],
  highlight: { value: "Live", label: "budget estimator" },
  metrics: [
    { value: "3", label: "Service tiers + feature matrix" },
    { value: "Live", label: "Budget estimate & breakdown" },
    { value: "4-step", label: "Consultation booking" },
  ],
  palette: [45, 260],
  links: { demo: "https://nova-events-orcin.vercel.app", repo: "https://github.com/nomaerrahman/Events" },
  caseStudy: {
    context: "Event clients want a feel for cost early, but most event sites say 'contact us for pricing'.",
    goal: "Qualify leads by giving visitors a realistic budget before they get in touch.",
    problem: "Without pricing signals, sales calls are spent on budgets that were never going to fit.",
    approach: [
      "Three tier cards with an expandable feature matrix.",
      "Catering menu with animated tabs and a dietary filter.",
      "Budget estimator with a live range, animated numbers and breakdown bars, driven by a rate card in lib/pricing.ts.",
      "Filterable gallery with lightbox, before/after slider and a four-step process timeline.",
      "Booking provider that can open the drawer prefilled from any section.",
    ],
    results: ["A template that turns pricing questions into qualified consultation requests."],
  },
};

export default project;
