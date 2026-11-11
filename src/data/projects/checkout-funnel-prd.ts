import type { Project } from "@/lib/types";

const project: Project = {
  slug: "checkout-funnel-prd",
  title: "Checkout Funnel Analysis & PRD",
  tagline: "From raw GA4 events to a PRD, RICE roadmap and A/B test plan worth ~$61K",
  summary:
    "New visitors complete checkout half as often as returning visitors (30% vs 60%). This project finds that gap in raw GA4 event data with BigQuery SQL, turns it into a product requirements document and prioritised roadmap, and designs the A/B test to prove the fix.",
  date: "2026-09",
  role: "Product analytics",
  categories: ["Data Science & Analytics"],
  format: "Analysis",
  featured: 3,
  relevance: { corporate: 3, academic: 1, startup: 2 },
  stack: ["BigQuery SQL", "GA4", "Python", "statsmodels", "Looker Studio"],
  highlight: { value: "+16.9%", label: "revenue opportunity" },
  metrics: [
    { value: "360,129", label: "Sessions analysed" },
    { value: "30% vs 60%", label: "New vs returning checkout completion" },
    { value: "~$61K", label: "Opportunity in 3 months" },
    { value: "972", label: "Checkout starts per test arm" },
  ],
  palette: [150, 214],
  cover: { src: "/projects/checkout-funnel-prd/new-vs-returning.webp", alt: "Chart comparing checkout completion for new and returning visitors", ratio: 1440 / 608, light: true },
  gallery: [
    { src: "/projects/checkout-funnel-prd/funnel.webp", alt: "Purchase funnel chart", caption: "Only 1.35% of sessions end in a purchase; checkout itself loses 56% of buyers.", ratio: 1440 / 608, light: true },
    { src: "/projects/checkout-funnel-prd/new-vs-returning.webp", alt: "New vs returning chart", caption: "New visitors are the problem, not mobile.", ratio: 1440 / 608, light: true },
  ],
  links: {
    repo: "https://github.com/nomaerrahman/Checkout-funnel-prd",
    docs: [
      { label: "Read the PRD", href: "https://github.com/nomaerrahman/Checkout-funnel-prd/blob/main/docs/PRD.md" },
      { label: "A/B test plan", href: "https://github.com/nomaerrahman/Checkout-funnel-prd/blob/main/docs/ab_test_plan.md" },
    ],
  },
  caseStudy: {
    context:
      "Google's public GA4 sample for the Google Merchandise Store, Nov 2020 – Jan 2021: 360,129 sessions and 4,848 purchases, stored as nested event records.",
    goal: "Find where the funnel leaks, size the opportunity, and turn the insight into something a product team can ship and test.",
    problem:
      "GA4 data is event-level and nested, so sessions have to be rebuilt before any funnel can be measured, and the obvious suspect (mobile) turned out not to be the cause.",
    approach: [
      "Rebuilt sessions in BigQuery with UNNEST(event_params) and flagged each funnel step per session.",
      "Segmented the funnel by month, device, traffic medium and new vs returning visitors.",
      "Sized the opportunity in Python and ran a power analysis with statsmodels.",
      "Wrote a PRD with personas, hypotheses, requirements, and success and guardrail metrics.",
      "Scored seven features with RICE and grouped them into Now / Next / Later; built a Looker Studio dashboard on the same query.",
    ],
    results: [
      "Only 1.35% of sessions end in a purchase, and checkout itself loses 56% of buyers.",
      "New visitors complete checkout 29.8% of the time vs 59.8% for returning, and make up 54% of checkout starts.",
      "Desktop (43.0%) and mobile (44.6%) are almost identical: device isn't the issue.",
      "Closing half the gap would have been worth ~$61K (+16.9% revenue) in three months. Guest checkout and delivered-price-in-cart ship first.",
    ],
    limitations: [
      "GA4's sample data is obfuscated and some events are missing, so each funnel step is counted independently, with a strict sequential version also in the output.",
    ],
  },
};

export default project;
