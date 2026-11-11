import type { Project } from "@/lib/types";

const project: Project = {
  slug: "insight-dashboard",
  title: "InsightDash",
  tagline: "No-code data exploration: upload, clean, transform and chart any dataset",
  summary:
    "A Streamlit dashboard that lets anyone upload a CSV or Excel file, clean and transform it, and build interactive charts without writing code. It keeps the raw upload separate from a working copy, so users can experiment safely.",
  date: "2026-02",
  role: "Python & dashboard development",
  categories: ["Data Science & Analytics", "Full-Stack / Web"],
  format: "Web app",
  relevance: { corporate: 2, academic: 1, startup: 1 },
  stack: ["Python", "Streamlit", "pandas", "NumPy", "Plotly"],
  highlight: { value: "6", label: "chart types, no code" },
  metrics: [
    { value: "3", label: "File formats (CSV, XLSX, XLS)" },
    { value: "6", label: "Chart types" },
    { value: "7", label: "Imputation strategies" },
  ],
  palette: [265, 190],
  links: { repo: "https://github.com/nomaerrahman/insight-dashboard" },
  caseStudy: {
    context: "Students and analysts often need a quick look at a dataset before committing to a notebook or BI tool.",
    goal: "A fast, intuitive tool that mirrors a real analysis workflow: overview, cleaning, then visualisation.",
    problem:
      "Spreadsheet tools are clumsy for cleaning and charting, and notebooks are slow to set up for a first look.",
    approach: [
      "Upload CSV or Excel with automatic type detection and removal of empty rows and columns.",
      "Category and numeric range filters, plus column selection.",
      "Plot builder for scatter, line, bar (sum, mean, median, count), box, histogram and correlation heatmap, with colour and size encodings.",
      "Cleaning tools: drop or impute missing values (mean, median, mode, constant, forward and backward fill), type conversion and derived columns.",
      "Raw data, working copy and chart logic kept separate so transformations never overwrite the original.",
    ],
    results: [
      "A complete exploration workflow in three tabs: Overview, Plot Builder, and Cleaning & Transformations.",
      "Derived columns such as Profit Margin = Profit / Sales without writing code.",
    ],
    limitations: ["Planned: download the cleaned dataset, save and load sessions, and multi-user authentication."],
  },
};

export default project;
