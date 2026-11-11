import type { Degree } from "@/lib/types";

/*
 * Degrees and university work. To add a piece of coursework:
 *   1. Export it as PDF (remove student ID / candidate number first).
 *   2. Put it in /public/academic/<degree id>/<file>.pdf
 *   3. Add an entry to that degree's `works`, e.g.
 *
 *   {
 *     id: "msc-dissertation",
 *     kind: "Dissertation",
 *     title: "…",
 *     module: "MSc Dissertation",
 *     year: "2027",
 *     grade: "Distinction",            // optional
 *     summary: "Two or three sentences: question, method, finding.",
 *     skills: ["Python", "scikit-learn"],
 *     pdfUrl: "/academic/msc/dissertation.pdf",
 *     repoUrl: "https://github.com/nomaerrahman/…", // optional
 *     highlight: true,
 *   }
 */
export const degrees: Degree[] = [
  {
    id: "msc",
    title: "MSc Data Science & AI",
    institution: "Brunel University London",
    status: "In progress",
    note: "Including a paid placement year as a Junior Data Engineer at Carrot Soft (2026–27).",
    works: [],
  },
  {
    id: "bsc",
    title: "BSc Computer Science",
    institution: "Brunel University London",
    status: "Completed",
    works: [],
  },
];
