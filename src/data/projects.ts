import type { Project } from "@/lib/types";

/**
 * MOCK CONTENT. Every project, number and quote below is placeholder copy
 * written to show the layout. Replace with your real work before publishing.
 */
export const projects: Project[] = [
  {
    slug: "streamline-etl",
    title: "Streamline",
    tagline: "Event-driven ingestion platform replacing nightly batch jobs",
    year: 2026,
    role: "Junior Data Engineer · Carrot Soft",
    categories: ["Data Engineering"],
    format: "Case study",
    relevance: { corporate: 3, academic: 1, startup: 1 },
    stack: ["Python", "Apache Airflow", "dbt", "PostgreSQL", "Docker", "AWS S3"],
    highlight: { label: "faster runs", value: "40%" },
    metrics: [
      { label: "Pipeline runtime", value: "−40%" },
      { label: "Job success rate", value: "99.9%" },
      { label: "Sources unified", value: "14" },
    ],
    links: { repo: "https://github.com/nomaerrahman" },
    palette: [214, 190],
    caseStudy: {
      context:
        "Product and finance teams depended on a set of cron scripts that pulled data overnight. Failures were silent and reports were often a day stale.",
      goal: "Move to observable, incremental pipelines that land fresh data within minutes and alert on failure.",
      problem:
        "Fourteen sources with inconsistent schemas, no lineage, and no tests. A single upstream change could break every dashboard without anyone noticing.",
      foundation:
        "Applied idempotent, incremental-load patterns and data contracts so each stage can be replayed safely and validated against an explicit schema.",
      architecture: [
        "Airflow DAGs orchestrate extract jobs per source, with retries and SLA alerts to Slack.",
        "Raw data lands in S3 partitioned by date, then loads to Postgres staging tables.",
        "dbt models build tested, documented marts; schema tests gate every deploy.",
        "Freshness checks feed a status page that business users can read.",
      ],
      snippet: {
        language: "python",
        filename: "dags/ingest_orders.py",
        code: `@dag(schedule="*/15 * * * *", catchup=False, default_args=DEFAULTS)
def ingest_orders():
    @task(retries=3, retry_exponential_backoff=True)
    def extract(since: str) -> str:
        rows = orders_api.fetch(updated_after=since)
        return s3.write_parquet(rows, key=f"raw/orders/{ds}.parquet")

    @task
    def load(key: str) -> None:
        contract.validate(key, schema=OrdersV2)   # fail fast on drift
        pg.upsert("staging.orders", key, conflict="order_id")

    load(extract(since="{{ prev_data_interval_end_success }}"))`,
      },
      impact: [
        "Dashboards refresh every 15 minutes instead of once a day.",
        "Broken upstream changes are caught by contract tests before they reach reports.",
        "On-call time spent on data issues dropped noticeably within the first month.",
      ],
      testimonial: {
        quote: "We stopped asking whether the numbers were right and started asking what to do about them.",
        author: "Placeholder Name",
        role: "Head of Product (example)",
      },
    },
  },
  {
    slug: "fairscore",
    title: "FairScore",
    tagline: "Measuring and reducing bias in credit-risk models",
    year: 2026,
    role: "MSc Research · Brunel University London",
    categories: ["Academic / AI"],
    format: "Publication",
    relevance: { corporate: 1, academic: 3, startup: 0 },
    stack: ["Python", "scikit-learn", "XGBoost", "SHAP", "Fairlearn", "Jupyter"],
    highlight: { label: "parity gap reduced", value: "62%" },
    metrics: [
      { label: "Demographic parity gap", value: "−62%" },
      { label: "AUC retained", value: "0.91" },
      { label: "Datasets evaluated", value: "3" },
    ],
    links: { repo: "https://github.com/nomaerrahman", paper: "#research" },
    palette: [38, 12],
    caseStudy: {
      context:
        "Gradient-boosted models are widely used for lending decisions, but their fairness trade-offs are rarely reported alongside accuracy.",
      goal: "Quantify how much fairness can be gained for how little accuracy, and make the trade-off visible to decision makers.",
      problem:
        "Standard post-processing methods are evaluated on one dataset with one metric, which hides how fragile their gains can be.",
      foundation:
        "Builds on threshold-optimisation and reductions approaches to fair classification, evaluated with repeated stratified cross-validation and bootstrap confidence intervals.",
      architecture: [
        "Reproducible pipeline: config-driven experiments, fixed seeds, and versioned data splits.",
        "Baselines vs. in-processing (exponentiated gradient) vs. post-processing (threshold optimiser).",
        "SHAP analysis to explain which features drive disparity.",
        "Pareto-front plots of accuracy against parity for each method.",
      ],
      snippet: {
        language: "python",
        filename: "experiments/mitigate.py",
        code: `mitigator = ExponentiatedGradient(
    estimator=XGBClassifier(**params),
    constraints=DemographicParity(difference_bound=eps),
)
mitigator.fit(X_train, y_train, sensitive_features=A_train)

report = evaluate(mitigator, X_test, y_test, A_test,
                  metrics=[roc_auc, dp_difference, eo_difference],
                  n_boot=1000)`,
      },
      impact: [
        "Showed a 62% reduction in parity gap at a cost of under 1.5 AUC points.",
        "Released the experiment harness so others can reproduce every figure.",
        "Accepted as a poster at a student research symposium (placeholder).",
      ],
    },
  },
  {
    slug: "mango-reviews",
    title: "Mango Reviews",
    tagline: "QR-powered review engine for local businesses",
    year: 2026,
    role: "Co-founder · Mango Media",
    categories: ["Startup Ventures", "Full-Stack / Web"],
    format: "Client work",
    relevance: { corporate: 1, academic: 0, startup: 3 },
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    highlight: { label: "more reviews", value: "3×" },
    metrics: [
      { label: "Monthly reviews", value: "3×" },
      { label: "Avg. rating", value: "4.8★" },
      { label: "Setup time", value: "< 1 day" },
    ],
    links: { demo: "https://example.com" },
    palette: [16, 340],
    caseStudy: {
      context:
        "Small cafés and salons know reviews drive footfall but rarely ask for them. Customers are happy to leave one if it takes seconds.",
      goal: "Give any shop a branded QR stand that turns a happy customer into a public review in under 20 seconds.",
      problem:
        "Generic review links are buried and feel impersonal. Owners also had no way to catch unhappy customers before they posted publicly.",
      foundation:
        "Informed by interviews with 12 local owners and simple funnel analytics on scan → open → submit.",
      architecture: [
        "Each business gets a short link and printable QR tied to its profile.",
        "A tiny mobile page asks for a star rating first; 4–5 stars route to Google, lower ratings open a private feedback form.",
        "Supabase stores scans and feedback; a weekly email summarises results for the owner.",
      ],
      snippet: {
        language: "tsx",
        filename: "app/r/[slug]/page.tsx",
        code: `export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const biz = await getBusiness(params.slug);
  await track("scan", biz.id);
  return (
    <RatingPrompt
      business={biz}
      onRate={(stars) => stars >= 4 ? redirect(biz.googleReviewUrl)
                                    : openPrivateFeedback(biz.id)}
    />
  );
}`,
      },
      impact: [
        "Pilot shops roughly tripled monthly review volume.",
        "Owners resolved private complaints before they turned into public one-star reviews.",
        "Became the entry product that leads into website and branding packages.",
      ],
      testimonial: {
        quote: "We got more reviews in three weeks than in the previous year.",
        author: "Placeholder Name",
        role: "Café owner (example)",
      },
    },
  },
  {
    slug: "pulse-analytics",
    title: "Pulse",
    tagline: "Self-serve product analytics with natural-language queries",
    year: 2025,
    role: "Data Engineering · Client project",
    categories: ["Data Engineering", "Full-Stack / Web"],
    format: "Case study",
    relevance: { corporate: 2, academic: 1, startup: 2 },
    stack: ["Python", "FastAPI", "DuckDB", "React", "OpenAI API"],
    highlight: { label: "weekly active users", value: "1.2k" },
    metrics: [
      { label: "Weekly active users", value: "1.2k" },
      { label: "Median query time", value: "380ms" },
      { label: "Analyst tickets", value: "−55%" },
    ],
    links: { demo: "https://example.com", repo: "https://github.com/nomaerrahman" },
    palette: [160, 200],
    caseStudy: {
      context: "A growing SaaS team routed every metrics question through one analyst, creating a week-long queue.",
      goal: "Let anyone in the company answer common product questions themselves, safely.",
      problem: "Raw SQL access was risky and intimidating; existing BI tools were slow to set up and rarely used.",
      foundation:
        "A semantic layer of vetted metrics constrains what the language model can generate, so answers stay consistent with official definitions.",
      architecture: [
        "Metric definitions in YAML compile to parameterised SQL.",
        "An LLM maps questions to metric + filters, never to free-form SQL.",
        "DuckDB over Parquet keeps queries fast and cheap.",
        "Every answer links to its SQL so analysts can audit it.",
      ],
      impact: [
        "Analyst request tickets fell by more than half.",
        "Adopted by sales and support, not just product.",
      ],
    },
  },
  {
    slug: "urban-air-dataset",
    title: "London Air Quality Dataset",
    tagline: "Cleaned, open dataset of hourly sensor readings across London boroughs",
    year: 2025,
    role: "Independent research",
    categories: ["Academic / AI", "Data Engineering"],
    format: "Open source",
    relevance: { corporate: 1, academic: 3, startup: 0 },
    stack: ["Python", "pandas", "GeoPandas", "Prophet", "Zenodo"],
    highlight: { label: "hourly readings", value: "4.2M" },
    metrics: [
      { label: "Readings", value: "4.2M" },
      { label: "Sensors", value: "96" },
      { label: "Downloads", value: "800+" },
    ],
    links: { repo: "https://github.com/nomaerrahman", paper: "#research" },
    palette: [190, 120],
    caseStudy: {
      context: "Public air-quality feeds are rich but noisy, with gaps, duplicated stations and inconsistent units.",
      goal: "Publish an analysis-ready dataset with documented cleaning steps and baseline forecasts.",
      problem: "Researchers spent weeks repeating the same cleaning work, with results that were hard to compare.",
      foundation: "Follows FAIR data principles and documents every transformation with a datasheet.",
      architecture: [
        "Scheduled scraper with schema validation.",
        "Gap detection and seasonal imputation, flagged per row.",
        "Baseline Prophet and gradient-boosting forecasts for comparison.",
      ],
      impact: ["Used in two student theses (placeholder).", "Cited as a benchmark in a course assignment."],
    },
  },
  {
    slug: "brand-sprint",
    title: "Brand Sprint",
    tagline: "Two-week website + social identity package for small businesses",
    year: 2026,
    role: "Co-founder · Mango Media",
    categories: ["Startup Ventures"],
    format: "Client work",
    relevance: { corporate: 0, academic: 0, startup: 3 },
    stack: ["Figma", "Next.js", "Framer", "Meta Ads", "Google Business"],
    highlight: { label: "average launch", value: "14 days" },
    metrics: [
      { label: "Time to launch", value: "14 days" },
      { label: "Clients delivered", value: "20+" },
      { label: "Repeat clients", value: "60%" },
    ],
    links: { demo: "https://example.com" },
    palette: [280, 16],
    caseStudy: {
      context: "Local businesses often have an outdated site, inconsistent social pages, and no time to manage either.",
      goal: "A fixed-scope, fixed-price package that ships a complete online presence in two weeks.",
      problem: "Agency projects usually sprawl. Small clients need certainty on price, timeline and outcome.",
      foundation: "A productised process with templates, a checklist, and a shared client board for every stage.",
      architecture: [
        "Day 1–3: discovery call, brand board, content gathering.",
        "Day 4–10: site build on a tested component kit, social templates.",
        "Day 11–14: launch, Google Business setup, handover training.",
      ],
      impact: ["Most clients launched on time with no scope creep.", "Over half came back for ongoing social management."],
    },
  },
  {
    slug: "local-business-kit",
    title: "Local Business Site Kit",
    tagline: "Reusable Next.js kit behind Mango Media's client sites",
    year: 2026,
    role: "Full-stack developer · Mango Media",
    categories: ["Full-Stack / Web", "Startup Ventures"],
    format: "Client work",
    relevance: { corporate: 2, academic: 0, startup: 3 },
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Vercel"],
    highlight: { label: "client sites shipped", value: "5" },
    metrics: [
      { label: "Sites from one kit", value: "5" },
      { label: "Lighthouse perf.", value: "95+" },
      { label: "Build time per site", value: "~1 wk" },
    ],
    links: { demo: "https://example.com", repo: "https://github.com/nomaerrahman" },
    palette: [340, 30],
    caseStudy: {
      context:
        "Mango Media's clients (a barber, a café, a beauty parlour, a home services business and an events brand) all needed fast, good-looking sites on small budgets.",
      goal: "Ship each new client site in about a week without starting from scratch, while still giving every brand its own look.",
      problem:
        "Hand-building each site meant repeated work, inconsistent quality and slow edits whenever a client wanted to change opening hours or prices.",
      foundation:
        "A shared component library and content schema, with per-client theme tokens, so design changes stay local and fixes reach every site.",
      architecture: [
        "Theme tokens (colour, type, radius) per client, consumed by one component library.",
        "Content lives in typed data files, so services, prices and hours are one edit away.",
        "Booking, map, reviews and gallery blocks drop in as needed.",
        "Deployed on Vercel with preview links for client sign-off.",
      ],
      impact: [
        "New client sites go from kickoff to launch in roughly a week (placeholder).",
        "Fixes and improvements roll out to every site at once.",
      ],
    },
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    tagline: "Audience-aware portfolio with a typed content layer and motion system",
    year: 2026,
    role: "Design & engineering",
    categories: ["Full-Stack / Web"],
    format: "Open source",
    relevance: { corporate: 2, academic: 1, startup: 2 },
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlight: { label: "first-load JS", value: "<180kB" },
    metrics: [
      { label: "Audience views", value: "4" },
      { label: "Motion presets", value: "1 file" },
      { label: "Content files", value: "5" },
    ],
    links: { demo: "#top", repo: "https://github.com/nomaerrahman" },
    palette: [16, 214],
    caseStudy: {
      context: "One site has to work for recruiters, academic committees and agency clients, who each care about different things.",
      goal: "Let each visitor see the most relevant work first without hiding anything or changing the page layout under them.",
      problem: "Most portfolios either try to please everyone at once or split into separate sites that drift out of date.",
      foundation: "Content is typed data with relevance scores per audience; the UI only changes ranking, emphasis and calls to action.",
      architecture: [
        "App Router with a single page and client providers for audience, theme and UI state.",
        "Typed content files (projects, research, venture, profile, hobbies).",
        "One motion preset file shared by every animation wrapper.",
        "Contact API route with validation and spam honeypot.",
      ],
      snippet: {
        language: "ts",
        filename: "sections/work.tsx",
        code: `const list = useMemo(() => {
  let items = projects.filter((p) => filter === "All" || p.categories.includes(filter));
  if (audience !== "all") {
    items = [...items].sort((a, b) => b.relevance[audience] - a.relevance[audience] || b.year - a.year);
  }
  return items;
}, [filter, audience]);`,
      },
      impact: ["Shareable audience links (?view=academic) for applications and cover letters."],
    },
  },
];
