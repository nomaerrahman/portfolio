import type { Project } from "@/lib/types";

const project: Project = {
  slug: "gp-demand-forecasting",
  title: "NHS GP Demand Forecasting",
  tagline: "Six-month GP appointment forecasts for England's 7 NHS regions, 1.6% back-test error",
  summary:
    "Forecasts monthly GP appointments for England and its 7 NHS regions six months ahead. Four models were compared in a rolling back-test, and a simple 'last year × recent growth' model beat SARIMA and Prophet in every region. Results are explored in a Streamlit app.",
  date: "2026-10",
  role: "Data science & forecasting",
  categories: ["Data Science & Analytics"],
  format: "Case study",
  featured: 2,
  relevance: { corporate: 3, academic: 3, startup: 0 },
  stack: ["Python", "pandas", "statsmodels", "Prophet", "Streamlit", "Altair"],
  highlight: { value: "1.6%", label: "average back-test error" },
  metrics: [
    { value: "835M", label: "Appointments modelled" },
    { value: "128", label: "Back-test forecasts scored" },
    { value: "1.58%", label: "England monthly error (MAPE)" },
    { value: "206M", label: "Forecast, Sep 2026 – Feb 2027" },
  ],
  palette: [200, 16],
  cover: { src: "/projects/gp-demand-forecasting/app-screenshot.webp", alt: "Streamlit app showing the England GP appointment forecast", ratio: 1300 / 1100, light: true },
  gallery: [
    { src: "/projects/gp-demand-forecasting/app-screenshot.webp", alt: "Streamlit forecasting app", caption: "The Streamlit app: pick a region and model to see history, forecast and its 80% range.", ratio: 1300 / 1100, light: true },
    { src: "/projects/gp-demand-forecasting/model-accuracy.webp", alt: "Model accuracy comparison", caption: "The simplest model wins in all 8 series.", ratio: 1440 / 512, light: true },
    { src: "/projects/gp-demand-forecasting/england-forecast.webp", alt: "England forecast chart", caption: "England is forecast to need 206 million appointments from Sep 2026 to Feb 2027.", ratio: 1440 / 640, light: true },
  ],
  links: { repo: "https://github.com/nomaerrahman/Gp-demand-forecasting" },
  caseStudy: {
    context:
      "GP practices and Integrated Care Boards set staff rotas and book locum cover weeks ahead. Demand swings by more than 30% across the year, from about 27 million appointments in August to nearly 39 million in October.",
    goal: "Give planners a forecast they can trust, plus an honest sense of how wrong it might be.",
    problem:
      "With only two and a half years of daily data there are just two Octobers to learn from, and the October vaccination peak is exactly what planners care about most.",
    approach: [
      "Aggregated 30 monthly NHS England files (about 10 million rows) into daily series for England and each of the 7 regions: 835 million appointments.",
      "Compared four models: seasonal naive, seasonal naive + growth, SARIMA on the log ratio to last year, and Prophet with England bank holidays.",
      "Scored every model with a rolling-origin back-test: 3 months ahead from 4 starting points for all 8 series, 128 forecasts on unseen data.",
      "Built 80% ranges from each model's own back-test errors, so they reflect how wrong it has actually been.",
      "Shipped a Streamlit app to explore regions, models, forecasts and accuracy.",
    ],
    results: [
      "'Last year × growth' had 61% lower error than the plain baseline and 56% lower than Prophet.",
      "Re-framing SARIMA to model the ratio to last year cut its error from 15% to 3.6%.",
      "England is forecast to need 206.0M appointments from Sep 2026 to Feb 2027 (+4.5%), peaking at 39.7M in October.",
      "Registered patients fell 0.9% while appointments grew: the extra demand comes from more appointments per person.",
    ],
    limitations: [
      "Two Octobers of history: if vaccination timing changes, October is most at risk.",
      "Several ICBs merged in 2026; regional series follow region codes as published.",
    ],
  },
};

export default project;
