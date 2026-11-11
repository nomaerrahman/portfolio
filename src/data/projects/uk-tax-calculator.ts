import type { Project } from "@/lib/types";

const project: Project = {
  slug: "uk-tax-calculator",
  title: "UK Take-Home Pay Calculator",
  tagline: "Income tax, National Insurance and take-home pay with a downloadable PDF breakdown",
  summary:
    "A responsive React calculator for UK take-home pay. It handles income tax for England, Wales and Northern Ireland, Category A National Insurance, pension contributions and tax codes including BR, D0, D1, NT and K codes, and exports a formatted PDF breakdown.",
  date: "2026-02",
  role: "Frontend development",
  categories: ["Full-Stack / Web"],
  format: "Web app",
  relevance: { corporate: 2, academic: 0, startup: 1 },
  stack: ["React", "Vite", "JavaScript", "jsPDF", "CSS"],
  highlight: { value: "6", label: "tax code types handled" },
  metrics: [
    { value: "3", label: "Pay periods (year, month, week)" },
    { value: "6", label: "Tax code types" },
    { value: "PDF", label: "Exportable breakdown" },
  ],
  palette: [140, 45],
  links: { repo: "https://github.com/nomaerrahman/uk-tax-calculator" },
  caseStudy: {
    context: "Most take-home pay calculators either hide the working or ignore less common tax codes.",
    goal: "A clear, accurate calculator that shows every deduction and lets people keep a copy.",
    problem:
      "UK tax codes change the allowance and band logic (K codes add to taxable income, BR/D0/D1 apply flat rates, NT applies none), which simple calculators often get wrong.",
    approach: [
      "Tax logic isolated in one module (ukTax.js) covering rUK income tax bands and Category A National Insurance.",
      "Income slider and manual input, with yearly, monthly and weekly views.",
      "Pension contribution adjustment and tax code interpretation with allowance display.",
      "PDF export of the full breakdown with jsPDF; light and dark themes; responsive layout.",
      "GitHub Actions deploys the built app to GitHub Pages.",
    ],
    results: [
      "Handles 1257L, BR, D0, D1, NT and K codes.",
      "Take-home pay shown annually, monthly and weekly, with a downloadable report.",
    ],
  },
};

export default project;
