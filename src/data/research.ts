import type { ResearchItem } from "@/lib/types";

/** MOCK CONTENT. Replace titles, venues and PDFs with your real outputs. */
export const research: ResearchItem[] = [
  {
    id: "fairscore-2026",
    kind: "Paper",
    title: "How Fragile Are Fairness Gains? A Multi-Dataset Study of Bias Mitigation in Gradient-Boosted Credit Models",
    authors: ["N. I. R. Naiem", "A. Supervisor"],
    venue: "MSc Dissertation Track, Brunel University London",
    year: 2026,
    status: "In preparation",
    abstract:
      "We compare in-processing and post-processing fairness interventions across three public credit datasets with repeated cross-validation and bootstrap intervals, and find that headline parity gains vary widely between datasets and random seeds.",
    keywords: ["Algorithmic fairness", "Credit risk", "XGBoost", "Reproducibility"],
    pdfUrl: "/papers/sample-paper.pdf",
    codeUrl: "https://github.com/",
    bibtex: `@mastersthesis{naiem2026fairness,
  title  = {How Fragile Are Fairness Gains? A Multi-Dataset Study of Bias Mitigation in Gradient-Boosted Credit Models},
  author = {Naiem, Nomaer I. R.},
  school = {Brunel University London},
  year   = {2026}
}`,
  },
  {
    id: "air-dataset-2025",
    kind: "Dataset",
    title: "LAQ-H: An Analysis-Ready Hourly Air Quality Dataset for London Boroughs",
    authors: ["N. I. R. Naiem"],
    venue: "Zenodo",
    year: 2025,
    status: "Published",
    abstract:
      "4.2 million hourly readings from 96 sensors, cleaned and documented with a datasheet, gap flags and baseline forecasts.",
    keywords: ["Open data", "Time series", "Environmental data"],
    doi: "10.5281/zenodo.0000000",
    pdfUrl: "/papers/sample-paper.pdf",
    bibtex: `@dataset{naiem2025laqh,
  title     = {LAQ-H: An Analysis-Ready Hourly Air Quality Dataset for London Boroughs},
  author    = {Naiem, Nomaer I. R.},
  publisher = {Zenodo},
  year      = {2025},
  doi       = {10.5281/zenodo.0000000}
}`,
  },
  {
    id: "poster-2026",
    kind: "Poster",
    title: "Explaining Disparity: SHAP-Based Diagnostics for Unfair Lending Models",
    authors: ["N. I. R. Naiem"],
    venue: "Student Research Symposium (placeholder)",
    year: 2026,
    status: "Completed",
    abstract: "A visual diagnostic that ranks features by their contribution to group-level disparity.",
    keywords: ["Explainability", "SHAP", "Fairness"],
    pdfUrl: "/papers/sample-paper.pdf",
    bibtex: `@misc{naiem2026shap,
  title  = {Explaining Disparity: SHAP-Based Diagnostics for Unfair Lending Models},
  author = {Naiem, Nomaer I. R.},
  note   = {Poster},
  year   = {2026}
}`,
  },
  {
    id: "bsc-thesis",
    kind: "Thesis",
    title: "BSc Final Project: Placeholder Title on Applied Machine Learning",
    authors: ["N. I. R. Naiem"],
    venue: "BSc Computer Science",
    year: 2024,
    status: "Completed",
    abstract: "Summarise your undergraduate final-year project here in two sentences.",
    keywords: ["Machine learning"],
  },
  {
    id: "ta-2025",
    kind: "Teaching",
    title: "Teaching Assistant: Introduction to Data Science (placeholder)",
    authors: [],
    venue: "Lab sessions & marking",
    year: 2025,
    abstract: "Ran weekly Python and pandas lab sessions and gave written feedback on coursework.",
    keywords: ["Teaching", "Python"],
  },
  {
    id: "award-2025",
    kind: "Award",
    title: "Placeholder Scholarship or Prize",
    authors: [],
    venue: "Awarding body",
    year: 2025,
    abstract: "One line on what it recognised.",
    keywords: [],
  },
];

export function toAPA(item: ResearchItem): string {
  const authors = item.authors.join(", ") || "Naiem, N. I. R.";
  const doi = item.doi ? ` https://doi.org/${item.doi}` : "";
  return `${authors} (${item.year}). ${item.title}. ${item.venue}.${doi}`;
}
