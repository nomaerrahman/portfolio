import type { Project } from "@/lib/types";

const project: Project = {
  slug: "nhs-pharmacy-workflow",
  title: "NHS Pharmacy Workflow Simulation",
  tagline: "A discrete-event simulation that finds which workflow change actually cuts patient waits",
  summary:
    "Clinical demand on London's community pharmacies is rising faster than dispensing while pharmacy numbers stay flat. Using 19 months of NHSBSA data and a SimPy simulation, this project shows which workflow change shortens patient waits, and which popular fix does nothing.",
  date: "2026-08",
  role: "Healthcare operations analytics",
  categories: ["Data Science & Analytics"],
  format: "Case study",
  featured: 4,
  relevance: { corporate: 3, academic: 3, startup: 0 },
  stack: ["Python", "SQL (BigQuery API)", "pandas", "SimPy", "Tableau"],
  highlight: { value: "−59%", label: "95th-percentile wait" },
  metrics: [
    { value: "+20.5%", label: "Pharmacy First consultations" },
    { value: "4,500", label: "Simulated trading days" },
    { value: "−59%", label: "95th-pct wait with A + B" },
    { value: "12", label: "User stories with acceptance criteria" },
  ],
  palette: [180, 340],
  cover: { src: "/projects/nhs-pharmacy-workflow/simulation-waits.webp", alt: "Simulation results comparing patient waits across scenarios", ratio: 1440 / 640, light: true },
  gallery: [
    { src: "/projects/nhs-pharmacy-workflow/demand-vs-capacity.webp", alt: "Demand vs capacity chart", caption: "Clinical services are growing far faster than dispensing, while pharmacy numbers stay flat.", ratio: 1440 / 672, light: true },
    { src: "/projects/nhs-pharmacy-workflow/simulation-waits.webp", alt: "Simulation waits chart", caption: "Combining pre-assembled repeats with an accuracy checking technician cuts the worst waits by 59%.", ratio: 1440 / 640, light: true },
  ],
  links: {
    repo: "https://github.com/nomaerrahman/Nhs-pharmacy-workflow",
    docs: [
      { label: "Business case", href: "https://github.com/nomaerrahman/Nhs-pharmacy-workflow/blob/main/docs/business_case.md" },
      { label: "Process maps", href: "https://github.com/nomaerrahman/Nhs-pharmacy-workflow/blob/main/docs/process_maps.md" },
      { label: "Requirements", href: "https://github.com/nomaerrahman/Nhs-pharmacy-workflow/blob/main/docs/requirements.md" },
    ],
  },
  caseStudy: {
    context:
      "From Jan–Jul 2025 to Jan–Jul 2026, London's ~1,700 community pharmacies saw prescription items rise 2.5% and Pharmacy First consultations rise 20.5%, while the number of pharmacies rose just 0.1%.",
    goal: "Work out which workflow change best protects patient waiting times, without adding a pharmacist.",
    problem:
      "Every consultation needs the same person as prescription checking: the pharmacist. Intuitive fixes, like adding dispenser hours, may not touch the real bottleneck.",
    approach: [
      "Pulled 19 months of NHSBSA dispensing data through the portal's SQL API, aggregating server-side so 19 × 50 MB files came back as two small tables.",
      "Standardised ICB names and mapped every month to the current London structure after the April 2026 merger.",
      "Drew swimlane maps of the current and redesigned workflow.",
      "Built a SimPy discrete-event model of one trading day: 5 scenarios × 3 demand levels × 300 simulated days.",
      "Wrote 12 user stories with MoSCoW priorities, a pilot plan, RAID log and a two-page business case, plus a Tableau dashboard.",
    ],
    results: [
      "Extra dispenser hours change nothing: the pharmacist is the bottleneck, not the dispensers.",
      "An accuracy checking technician frees pharmacist capacity; pre-assembling repeats turns it into shorter waits.",
      "Combined, they cut the 95th-percentile wait from 47.7 to 19.6 minutes (−59%) and nearly clear the end-of-day backlog.",
      "Recommendation: a three-month pilot of both changes at one busy branch.",
    ],
    limitations: [
      "Process times and patient behaviour are assumptions; the pilot's first week replaces them with measured times.",
      "The model covers one pharmacist and ignores breaks, deliveries and phone calls.",
    ],
  },
};

export default project;
