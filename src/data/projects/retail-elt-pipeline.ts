import type { Project } from "@/lib/types";

const project: Project = {
  slug: "retail-elt-pipeline",
  title: "Retail ELT Pipeline",
  tagline: "541,909 messy transactions into a tested star schema and customer KPI dashboard",
  summary:
    "An end-to-end ELT pipeline that cleans a year of UK online retail data, models it with dbt into a star schema with 42 data tests, and feeds a Power BI customer dashboard. It shows the top 20% of customers drive 74.6% of revenue.",
  date: "2026-11",
  role: "Data engineering & analytics",
  categories: ["Data Engineering", "Data Science & Analytics"],
  format: "Case study",
  featured: 1,
  relevance: { corporate: 3, academic: 2, startup: 1 },
  stack: ["Python", "SQL", "dbt", "DuckDB", "GitHub Actions", "Power BI"],
  highlight: { value: "42", label: "dbt data tests" },
  metrics: [
    { value: "541,909", label: "Raw rows ingested" },
    { value: "42", label: "Automated data tests" },
    { value: "74.6%", label: "Revenue from top 20% of customers" },
    { value: "£804K", label: "Past revenue in At Risk segment" },
  ],
  palette: [214, 16],
  cover: { src: "/projects/retail-elt-pipeline/rfm-segments.webp", alt: "Bar chart: Champions are 22% of customers but 65% of revenue", ratio: 1440 / 640, light: true },
  gallery: [
    { src: "/projects/retail-elt-pipeline/rfm-segments.webp", alt: "RFM segments chart", caption: "Champions are 22% of customers but 65% of revenue.", ratio: 1440 / 640, light: true },
    { src: "/projects/retail-elt-pipeline/monthly-revenue.webp", alt: "Monthly revenue chart", caption: "Revenue doubles into the Q4 gifting season, peaking at £1.14M in Nov 2011.", ratio: 1440 / 640, light: true },
    { src: "/projects/retail-elt-pipeline/cohort-retention.webp", alt: "Cohort retention heatmap", caption: "About one in five new customers orders again the following month.", ratio: 1440 / 800, light: true },
  ],
  links: { repo: "https://github.com/nomaerrahman/Retail-elt-pipeline", docs: [{ label: "Power BI build guide", href: "https://github.com/nomaerrahman/Retail-elt-pipeline/tree/main/powerbi" }] },
  caseStudy: {
    context:
      "The UCI Online Retail dataset holds every transaction of a UK online gift retailer from Dec 2010 to Dec 2011. As exported, it can't be reported on reliably.",
    goal: "Build a reproducible pipeline that produces a trustworthy star schema and customer KPIs, and say which customers matter most.",
    problem:
      "The raw file has 5,268 exact duplicates, 133,846 lines with no customer ID, 9,251 cancellations mixed in with sales, 2,361 non-product lines such as postage and fees, and dates and IDs stored as text.",
    approach: [
      "Extract and load: a Python script downloads the source file and loads it untouched into DuckDB.",
      "Transform: dbt models it in three layers. Staging fixes types and names, intermediate deduplicates and adds one documented quality flag per rule, and marts build a star schema plus KPI and retention tables.",
      "Test: 42 dbt tests check keys are unique and not null, every fact row joins to its dimensions, values are non-negative and categories are valid.",
      "Automate: a GitHub Actions workflow rebuilds and tests everything on every push.",
      "Report: RFM segmentation, monthly KPIs and cohort retention exported to a Power BI dashboard.",
    ],
    snippet: {
      language: "bash",
      filename: "run.sh",
      code: `python ingest/ingest.py               # download + load raw data
dbt build --profiles-dir .            # 9 models + 42 tests
python analysis/export_and_charts.py  # Power BI exports + charts`,
    },
    results: [
      "391,150 valid sales lines kept: £8.74M revenue, 18,402 orders, 4,334 customers, £474.80 average order value.",
      "The top 20% of customers produce 74.6% of revenue; the top 1% alone produce 32.0%.",
      "642 At Risk customers (frequent buyers who've gone quiet) hold £804K of past revenue, the clearest win-back target.",
      "Around 19.3% of new customers order again the following month, so the second order is the cheapest growth lever.",
    ],
    limitations: [
      "RFM scores use quintiles over one year; a production version would score on a rolling window.",
      "The source is a 2010–2011 public sample, but the pipeline is source-agnostic.",
    ],
  },
};

export default project;
