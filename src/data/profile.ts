import type { SkillGroup, TimelineEntry } from "@/lib/types";

/** Facts here mirror the CV (public/Nomaer_Naiem_CV.pdf). Keep them in sync. */
export const profile = {
  name: "Nomaer Naiem",
  fullName: "Nomaer Ibne Rahman Naiem",
  shortName: "Nom",
  handle: "nomaerrahman",
  headline: "Data Analyst · Data Engineer · Forward Deployed Engineer",
  degree: "MSc Data Science and Analytics",
  university: "Brunel University of London",
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
    "Start with the problem, not the tool. Technology is only worth it if someone's day gets better.",
    "Ship small, learn fast. The second version is always better than the first idea.",
    "If a number matters, it should be tested, sourced and explainable.",
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
    title: "Educational Technology Analyst (IT Support)",
    org: "Brunel University London",
    track: "corporate",
    description: "Supported the migration of 5,000+ users to a new learning platform with zero data loss, resolved 300+ support tickets and trained 50+ academic staff.",
  },
  {
    year: "2023–26",
    title: "Customer Advisor",
    org: "Boots UK · Uxbridge & Pinner",
    track: "corporate",
    description: "Served a high volume of customers daily, reading their needs and buying behaviour to recommend health, beauty and over-the-counter products within NHS compliance rules, and fed customer trends back to the store team.",
  },
  {
    year: "2025–27",
    title: "MSc Data Science and Analytics",
    org: "Brunel University of London",
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
    title: "Founded Atafol",
    org: "Technology consultancy · London",
    track: "startup",
    description: "A UK consultancy that designs and builds custom software, workflow automation and private AI. Designed its four-stage delivery model and built the website, with interactive workflow demos and a starting-point assessment.",
  },
  {
    year: "2026",
    title: "Built JobPilot",
    org: "AI job application platform",
    track: "startup",
    description: "A full-stack assistant (Next.js, FastAPI, PostgreSQL) that finds jobs through official APIs, scores fit 0–100, tailors the CV and cover letter, and applies only after approval.",
  },
  {
    year: "2026–now",
    title: "Junior Data Engineer (industrial placement)",
    org: "Carrot Soft Ltd · London (remote)",
    track: "corporate",
    description: "Built automated ETL workflows and dashboards that cut reporting time by 35% and improved data accuracy by 25%, analysing 63K+ marketing and business records with Python, SQL, R and Power BI.",
  },
  {
    year: "2026–now",
    title: "Trainee Dispenser",
    org: "Boots UK · London",
    track: "corporate",
    description: "Dispensing NHS prescriptions under pharmacist supervision, following standard operating procedures and patient confidentiality: the operational context behind my NHS analytics projects.",
  },
];

/** Skills exactly as grouped on the CV. */
export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python (pandas, scikit-learn, statsmodels, Prophet)", "SQL (CTEs, window functions)", "TypeScript", "JavaScript", "R", "Java"],
  },
  {
    group: "Analytics & BI",
    items: ["Power BI (DAX, Power Query)", "Tableau", "Looker Studio", "Excel", "KPI design", "Data modelling (star schema)", "Forecasting", "A/B testing"],
  },
  {
    group: "Engineering & Deployment",
    items: ["ETL / ELT pipelines", "dbt", "DuckDB", "Google BigQuery", "PostgreSQL", "FastAPI", "Next.js", "React", "Node.js", "Streamlit", "REST APIs", "LLM integration", "GitHub Actions (CI/CD)", "Docker", "Vercel"],
  },
  {
    group: "Support & Delivery",
    items: ["Requirements gathering", "Solution design", "Process mapping", "Stakeholder management", "Agile / Scrum", "IT troubleshooting & tickets", "User training", "Microsoft 365 & SharePoint", "UK GDPR"],
  },
];

export const certifications = ["Data Analyst Bootcamp 2025: Python, SQL, Excel & Power BI"];
