import type { Skill, TimelineEntry } from "@/lib/types";

/** Real facts are marked; everything else is placeholder to replace. */
export const profile = {
  name: "Nomaer Naiem",
  shortName: "Nom",
  handle: "nomaerrahman",
  degree: "MSc Data Science & AI",
  university: "Brunel University London",
  location: "London, UK",
  email: "hello@example.com", // TODO: your public contact email
  cvUrl: "/cv.pdf", // TODO: drop your CV into /public/cv.pdf
  academicCvUrl: "/cv.pdf",
  socials: {
    github: "https://github.com/nomaerrahman", // TODO: confirm username
    linkedin: "https://www.linkedin.com/",
    scholar: "https://scholar.google.com/",
  },
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/",
  philosophy: [
    "Rigour is a feature. If a number matters, it should be tested, sourced and explainable.",
    "Ship small, learn fast. The second version is always better than the first idea.",
    "Build for the person reading the dashboard, not the person who built it.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2024",
    title: "BSc Computer Science",
    org: "Graduated",
    track: "academic",
    description: "Foundations in algorithms, databases and machine learning. Final project on applied ML (placeholder).",
  },
  {
    year: "2025",
    title: "MSc Data Science & AI",
    org: "Brunel University London",
    track: "academic",
    description: "Research focus on fairness and reproducibility in applied machine learning.",
  },
  {
    year: "2026",
    title: "Founded HypeSpark",
    org: "Digital transformation studio · London",
    track: "startup",
    description: "Advice, websites and apps, review systems, automation and data for UK small and mid-sized businesses.",
  },
  {
    year: "2026",
    title: "Junior Data Engineer (placement)",
    org: "Carrot Soft Ltd · London",
    track: "corporate",
    description: "Building data pipelines and analytics tooling for a London software startup, fully remote, Sep 2026 – May 2027.",
  },
  {
    year: "Next",
    title: "What I'm looking for",
    org: "Open to conversations",
    track: "corporate",
    description: "Graduate data engineering / data science roles, research collaborations, and new HypeSpark clients.",
  },
];

export const skills: Skill[] = [
  { name: "Python", group: "Data", level: 5 },
  { name: "SQL", group: "Data", level: 5 },
  { name: "dbt", group: "Data", level: 4 },
  { name: "Airflow", group: "Data", level: 4 },
  { name: "Spark", group: "Data", level: 3 },
  { name: "pandas", group: "Data", level: 5 },
  { name: "scikit-learn", group: "ML / Research", level: 4 },
  { name: "XGBoost", group: "ML / Research", level: 4 },
  { name: "Statistics", group: "ML / Research", level: 4 },
  { name: "Experiment design", group: "ML / Research", level: 4 },
  { name: "LLM apps", group: "ML / Research", level: 3 },
  { name: "TypeScript", group: "Engineering", level: 4 },
  { name: "Next.js", group: "Engineering", level: 4 },
  { name: "Docker", group: "Engineering", level: 4 },
  { name: "AWS", group: "Engineering", level: 3 },
  { name: "Git / CI", group: "Engineering", level: 4 },
  { name: "Client discovery", group: "Product & Growth", level: 4 },
  { name: "Branding", group: "Product & Growth", level: 3 },
  { name: "Growth analytics", group: "Product & Growth", level: 4 },
  { name: "Pitching", group: "Product & Growth", level: 3 },
];

/** Axes for the radar chart (0-100). */
export const competencies = [
  { axis: "Data Engineering", value: 88 },
  { axis: "Analytics", value: 84 },
  { axis: "Machine Learning", value: 76 },
  { axis: "Research Methods", value: 80 },
  { axis: "Frontend", value: 70 },
  { axis: "Product & Growth", value: 74 },
];
