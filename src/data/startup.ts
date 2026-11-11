/**
 * Founder spotlight: HypeSpark. Copy mirrors the live HypeSpark site
 * (src/lib/content.ts there). Deliberately no invented metrics or testimonials.
 */
export const startup = {
  name: "HypeSpark",
  role: "Co-founder",
  url: "https://hypespark-three.vercel.app",
  tagline: "A digital transformation studio for UK businesses",
  vision:
    "Most established small and mid-sized businesses know their digital setup is holding them back. HypeSpark gives them independent advice first, then designs and builds what fixes it: websites and apps, review systems, automation and data. Founders on every project, fixed-price proposals, and you own everything we build.",
  facts: ["London, UK", "Fixed-price"],
  practices: [
    {
      id: "strategy",
      label: "Strategy & Advisory",
      outcome: "Know exactly where to go next",
      description: "Independent advice and hard evidence before you spend on technology.",
      services: [
        { slug: "technology-consulting", name: "Technology Consulting" },
        { slug: "digital-audits", name: "Digital Audits & Security" },
      ],
    },
    {
      id: "experience",
      label: "Experience & Engineering",
      outcome: "Build what your customers use",
      description: "Websites, online shops and apps designed and engineered in-house.",
      services: [
        { slug: "websites-ecommerce", name: "Websites & E-Commerce" },
        { slug: "mobile-apps", name: "Mobile Apps (iOS & Android)" },
      ],
    },
    {
      id: "growth",
      label: "Growth & Reputation",
      outcome: "Be found, chosen and trusted",
      description: "Turn happy customers into reviews, visibility and new enquiries.",
      services: [{ slug: "review-systems", name: "Google Maps & QR Review Systems" }],
    },
    {
      id: "operations",
      label: "Operations & Data",
      outcome: "Run leaner, decide faster",
      description: "Remove manual admin and see your whole business in one place.",
      services: [
        { slug: "workflow-automation", name: "Workflow & Process Automation" },
        { slug: "data-analytics", name: "Data Analytics & Pipelines" },
      ],
    },
  ],
  approach: [
    { step: "01", title: "Diagnose", detail: "An audit of your systems and conversations with your team and customers." },
    { step: "02", title: "Design", detail: "Experience and system designed together, prototypes tested with real users." },
    { step: "03", title: "Build", detail: "Short, visible cycles: working progress every week or two." },
    { step: "04", title: "Improve", detail: "Measure what matters after launch and keep improving." },
  ],
  industries: [
    "Hospitality & Retail",
    "Professional Services",
    "Trades & Local Services",
    "Logistics & Distribution",
    "E-Commerce Brands",
    "Health & Wellbeing",
  ],
  facts_grid: [
    { value: "7", label: "Services" },
    { value: "4", label: "Practice areas" },
    { value: "6", label: "Industries served" },
    { value: "AA", label: "WCAG 2.2 target on every build" },
  ],
  commitments: [
    { title: "Founders on every project", body: "Work directly with the people who own the business." },
    { title: "Fixed-price proposals", body: "Clear scope and cost agreed up front." },
    { title: "You own everything", body: "Code, designs, data and accounts, fully documented." },
  ],
} as const;

export type Practice = (typeof startup.practices)[number];
