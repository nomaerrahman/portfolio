import type { Degree } from "@/lib/types";

/*
 * Degrees and university work. To add a piece:
 *   1. Export it as PDF (remove student ID / candidate number first).
 *   2. Put it in /public/academic/<degree id>/<file>.pdf
 *   3. Add an entry to that degree's `works` below.
 * PDFs here have the student ID redacted and a "Portfolio copy" footer.
 */
export const degrees: Degree[] = [
  {
    id: "msc",
    title: "MSc Data Science and Analytics",
    institution: "Brunel University of London",
    period: "2025 – 2027",
    status: "In progress",
    note: "Taught modules 2025–26, followed by a paid placement year as a Junior Data Engineer at Carrot Soft (2026–27).",
    upcoming: "Dissertation in progress",
    works: [
      {
        id: "readmission-prediction-spark",
        kind: "Group coursework",
        title: "Predicting 30-day diabetic readmission with Random Forest in R and Spark",
        module: "Distributed Data Analysis",
        year: "2025–26",
        summary:
          "Can a diabetic patient's readmission within 30 days be predicted from their hospital stay, and what drives the risk? Using 101,766 encounters from 130 US hospitals, I built a class-balanced Random Forest in R (AUC 0.651) and re-implemented it in Spark MLlib, which matched it (AUC 0.645) and trained 3.2× faster on the same hardware. Both found prior inpatient visits to be the strongest predictor. My part was the Random Forest and its Spark version, compared against four teammates' models on the same patient-level split.",
        skills: ["R", "Random Forest", "Spark MLlib", "k-means", "PCA", "Class imbalance", "Model evaluation"],
        pdfUrl: "/academic/msc/readmission-prediction-spark.pdf",
        highlight: true,
      },
      {
        id: "carbon-footprint-analysis",
        kind: "Coursework",
        title: "Household carbon footprint and recycling: a statistical analysis in R",
        module: "Quantitative Data Analysis",
        year: "2025–26",
        summary:
          "Cleaned an allocated sample of 240 households (impossible energy readings, missing income, inconsistent categories), then modelled carbon footprint with multiple linear regression and the likelihood of regular recycling with logistic regression. Energy consumption and income dominated the footprint model. For recycling, each extra point of environmental concern multiplied the odds by more than six, and households in flats had about five times the odds. The supporting file contains the full R code and output behind the main report.",
        skills: ["R", "R Markdown", "ggplot2", "Linear regression", "Logistic regression", "Stepwise AIC", "Data cleaning"],
        pdfUrl: "/academic/msc/carbon-footprint-analysis.pdf",
        extraPdfs: [{ label: "Supporting file", url: "/academic/msc/carbon-footprint-analysis-supporting.pdf" }],
      },
      {
        id: "who-mdg-dashboard",
        kind: "Report",
        title: "WHO retrospective: life expectancy in the Millennium Development Goals era, 2000–2015",
        module: "Data Visualisation",
        year: "2025–26",
        summary:
          "An interactive Tableau dashboard and story for 193 countries, re-implemented in Plotly Dash to compare tools. It shows the gap between developed and developing countries narrowed but unevenly: the countries that started furthest behind gained most when they combined falling HIV/AIDS deaths with more schooling and steady health spending, while countries in conflict lost ground.",
        skills: ["Tableau", "LOD expressions", "Plotly Dash", "Python", "Dashboard design", "User-centred design"],
        pdfUrl: "/academic/msc/who-mdg-dashboard-report.pdf",
      },
      {
        id: "lms-attainment-proposal",
        kind: "Research proposal",
        title: "Which LMS features actually predict student attainment?",
        module: "Research Project Management",
        year: "2025–26",
        summary:
          "A research proposal for finding which learning-platform features predict grades on their own, rather than just reflecting how much a student clicks overall. It designs engineered engagement features, checks multicollinearity (VIF, Lasso), compares Random Forest, XGBoost and a small neural network with Bayesian tuning and macro-F1, and includes a 17-week project plan.",
        skills: ["Research design", "Learning analytics", "Feature engineering", "Model evaluation", "Project planning"],
        pdfUrl: "/academic/msc/lms-attainment-proposal.pdf",
      },
      {
        id: "iot-data-management",
        kind: "Essay",
        title: "How to effectively manage IoT data",
        module: "Digital Innovation and Strategy",
        year: "2025–26",
        summary:
          "Reviews IoT data management frameworks, selects an edge–cloud architecture as the best fit, and applies it to AWS as a case study, from edge processing and stream ingestion to storage and analytics. It closes with the limits in practice: architectural complexity, data consistency, security and dependence on a single cloud provider.",
        skills: ["IoT architecture", "Edge–cloud computing", "AWS", "Data strategy", "Literature review"],
        pdfUrl: "/academic/msc/iot-data-management.pdf",
      },
      {
        id: "syri-automated-decisions",
        kind: "Essay",
        title: "Automated decision systems in public services: the SyRI case",
        module: "Critical Analysis of Modern Data",
        year: "2025–26",
        summary:
          "A reflective essay on the Dutch SyRI welfare-fraud system, ruled unlawful in 2020 for breaching the right to privacy. It examines the legal, social and ethical failures behind it and argues that public-sector automated decision-making needs transparency, contestability and independent oversight built in from the start.",
        skills: ["AI ethics", "Algorithmic governance", "Data protection law", "Critical analysis"],
        pdfUrl: "/academic/msc/syri-automated-decisions.pdf",
      },
    ],
  },
  {
    id: "bsc",
    title: "BSc (Hons) Computer Science",
    institution: "Brunel University London",
    period: "2021 – 2023",
    status: "Completed",
    works: [],
  },
];
