import type { SkillGroup, TimelineEntry } from "@/lib/types";

/** Facts here mirror the CV (public/Nomaer_Naiem_CV.pdf). Keep them in sync. */
export const profile = {
  name: "Nomaer Naiem",
  fullName: "Nomaer Ibne Rahman Naiem",
  shortName: "Nom",
  handle: "nomaerrahman",
  headline: "Data Analyst · Data Engineer",
  degree: "MSc Data Science and Analytics",
  university: "Brunel University London",
  location: "London, UK",
  email: "nomaernaiem@outlook.com",
  cvUrl: "/Nomaer_Naiem_CV.pdf",
  socials: {
    github: "https://github.com/nomaerrahman",
    linkedin: "https://www.linkedin.com/in/nomaer-rahman",
  },
  /** Optional Cal.com / Calendly link. When unset, "Get in touch" buttons go to the contact section. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  philosophy: [
    "Rigour is a feature. If a number matters, it should be tested, sourced and explainable.",
    "Ship small, learn fast. The second version is always better than the first idea.",
    "Build for the person reading the dashboard, not the person who built it.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2021–23",
    title: "BSc (Hons) Computer Science",
    org: "Brunel University London",
    track: "academic",
    description: "Software engineering, data and information, artificial intelligence, algorithms, cybersecurity, networks and operating systems.",
  },
  {
    year: "2022–23",
    title: "Educational Technology Analyst",
    org: "Brunel University London",
    track: "corporate",
    description: "Supported the migration of 5,000+ users to a new learning platform with zero data loss, resolved 300+ support tickets and trained 50+ academic staff.",
  },
  {
    year: "2023–now",
    title: "Healthcare roles at Boots UK",
    org: "Customer Advisor → Healthcare Specialist → Pharmacy Dispenser",
    track: "corporate",
    description: "Dispensing NHS prescriptions under pharmacist supervision and advising on medicines under NHS compliance rules: the operational context behind my NHS analytics projects.",
  },
  {
    year: "2025–27",
    title: "MSc Data Science and Analytics",
    org: "Brunel University London",
    track: "academic",
    description: "Machine learning, distributed data systems, data ethics and governance, analytics strategy and research methods.",
  },
  {
    year: "2025–26",
    title: "Activity Manager",
    org: "ANGLO Green Light for English",
    track: "corporate",
    description: "Managed a team of 18 activity staff across two summers: rotas, timesheets, delegation, workshops and event logistics.",
  },
  {
    year: "2026",
    title: "Co-founded HypeSpark",
    org: "Early-stage software venture · London",
    track: "startup",
    description: "Shared ownership of product direction, technical decisions and go-to-market planning; set up the engineering workflow for its first product, BetterShelf.",
  },
  {
    year: "2026–now",
    title: "Junior Data Engineer (industrial placement)",
    org: "Carrot Soft Ltd · London (remote)",
    track: "corporate",
    description: "Built automated ETL workflows and dashboards that cut reporting time by 35% and improved data accuracy by 25%, analysing 63K+ marketing and business records with Python, SQL, R and Power BI.",
  },
];

/** Skills exactly as grouped on the CV. */
export const skills: SkillGroup[] = [
  {
    group: "Data Analysis & BI",
    items: ["SQL (CTEs, window functions)", "Power BI (DAX, Power Query)", "Tableau", "Looker Studio", "Excel", "Data modelling (star schema)", "KPI design", "Data storytelling"],
  },
  {
    group: "Statistics & ML",
    items: ["Python (pandas, scikit-learn, statsmodels, Prophet)", "R", "Regression", "Hypothesis testing", "A/B testing & power analysis", "Time-series forecasting", "Discrete-event simulation (SimPy)"],
  },
  {
    group: "Data Engineering",
    items: ["ETL / ELT pipelines", "dbt", "DuckDB", "Google BigQuery", "Spark", "Data quality testing", "Git & GitHub Actions (CI/CD)"],
  },
  {
    group: "Business & Delivery",
    items: ["Requirements gathering", "User stories", "Process mapping", "PRDs", "RICE & MoSCoW", "Business cases", "Agile / Scrum", "UK GDPR"],
  },
  {
    group: "Web & Platforms",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Streamlit", "Java", "Microsoft 365 & Power Platform"],
  },
];

export const certifications = ["Data Analyst Bootcamp 2025: Python, SQL, Excel & Power BI"];
