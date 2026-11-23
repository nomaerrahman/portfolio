import type { Project } from "@/lib/types";

/** Facts mirror the JobPilot README and codebase. No usage numbers until there are real users. */
const project: Project = {
  slug: "jobpilot",
  title: "JobPilot",
  tagline: "AI job application assistant: finds jobs, scores fit 0–100, tailors the CV and applies only after you approve",
  summary:
    "A full-stack job-matching and application assistant. It turns an uploaded resume into a verified profile, pulls jobs from official job-board APIs, scores every job against your skills and preferences, and drafts a tailored CV and cover letter for the best matches. Nothing is sent until you approve it.",
  date: "2026-11",
  role: "Product, design & full-stack engineering",
  categories: ["Full-Stack / Web", "Data Engineering"],
  format: "Web app",
  featured: 1,
  stack: ["Next.js 16", "TypeScript", "FastAPI", "Python 3.12", "PostgreSQL + pgvector", "SQLAlchemy", "Gemini / Groq / Ollama", "Notion API", "Docker"],
  highlight: { value: "70+", label: "fit score to make the shortlist" },
  metrics: [
    { value: "5", label: "Official job sources (Reed, Adzuna, Greenhouse, Lever, Ashby)" },
    { value: "6 h", label: "Refresh cycle for every source" },
    { value: "0–100", label: "Explainable fit score" },
    { value: "201", label: "Automated tests" },
  ],
  palette: [262, 16],
  links: {},
  caseStudy: {
    context:
      "Applying for jobs well means finding the right roles, checking each one against your experience, rewriting your CV for it and keeping track of every application. Done properly, that is hours per application.",
    goal: "Do the searching, screening and first drafts automatically, while keeping a person in control of every fact and every application that goes out.",
    problem:
      "Most auto-apply tools spray generic applications and invent details. JobPilot had to be accurate, explainable and approval-first, and run on free model tiers.",
    approach: [
      "Resume import: a model extracts your experience, skills and education into a profile. Every extracted fact starts unverified, and only facts you confirm are used for matching and tailoring.",
      "Job ingestion from official APIs only (no scraping): Reed and Adzuna searches built from your preferences, plus company boards on Greenhouse, Lever and Ashby. A background worker refreshes every source every 6 hours, removes duplicates and marks closed jobs.",
      "Screening and parsing: titles matching your roles pass straight away; the rest are triaged in batches by a fast model. Each relevant job is read once into key facts: level, skills, experience, visa sponsorship, right to work and closing date.",
      "Matching: a 0–100 score from rules anyone can check (skills 40, level 20, experience 10, job type, location and salary 10 each), with hard blockers capping the score. Strong matches get an AI review, and jobs at or above your threshold (70 by default) make the shortlist.",
      "Tailoring and tracking: every application starts from a core CV you approved, with light tailoring and a cover letter for the role, then moves through an approval-first tracker that can sync to a Notion database.",
      "Model router: every call goes through one router that falls back across Gemini, Groq and a local Ollama model on rate limits, timeouts or bad output, and logs tokens and latency per call.",
    ],
    results: [
      "A working end-to-end pipeline from resume upload to approved application, covered by 201 automated tests and strict type checks.",
      "Built single-user first but multi-tenant by design: every table is scoped to a user, so adding real accounts is an addition, not a rewrite.",
    ],
    limitations: ["Runs locally for now; a hosted version with user accounts is the next step."],
  },
};

export default project;
