/**
 * Founder spotlight: Atafol. Copy mirrors the live Atafol site
 * (src/content/*.ts there). Deliberately no invented clients, metrics or testimonials.
 */
export const startup = {
  name: "Atafol",
  role: "Founder",
  url: "https://atafol.vercel.app",
  tagline: "A UK technology consultancy building intelligent systems for better-run businesses",
  vision:
    "Atafol designs and builds the software, private AI and automation that make businesses work better. It doesn't just help businesses adopt AI: it builds the intelligent systems behind them, starting with how the work is done today and advising against AI when a simpler tool fits better.",
  facts: ["United Kingdom", "Stage-by-stage delivery"],
  practices: [
    {
      id: "automation",
      label: "Intelligent Automation",
      outcome: "Make businesses work smarter",
      description: "AI agents and automated workflows that take repetitive work off your team.",
      services: [
        { href: "/services#intelligent-automation", name: "AI agents & intelligent workflows" },
        { href: "/services#intelligent-automation", name: "Business process automation" },
      ],
    },
    {
      id: "systems",
      label: "Digital Systems",
      outcome: "Build the systems businesses need",
      description: "Bespoke software and connected infrastructure that your business runs on.",
      services: [
        { href: "/services#digital-systems", name: "Bespoke software & internal tools" },
        { href: "/services#digital-systems", name: "Legacy system modernisation" },
      ],
    },
    {
      id: "intelligence",
      label: "Private Intelligence",
      outcome: "Turn business data into intelligence",
      description: "Private AI and data systems that give you answers while you keep control of your data.",
      services: [
        { href: "/services#private-intelligence", name: "Self-hosted AI & private knowledge bases" },
        { href: "/services#private-intelligence", name: "Reporting across scattered data" },
      ],
    },
  ],
  approach: [
    { step: "01", title: "Discover", detail: "Understand the business, its challenges and where it could improve." },
    { step: "02", title: "Strategise", detail: "Identify the right technologies and design an appropriate solution." },
    { step: "03", title: "Build", detail: "Engineer, integrate and implement the solution in short, testable stages." },
    { step: "04", title: "Optimise", detail: "Monitor, refine and evolve the systems as the business changes." },
  ],
  industries: [
    "Professional services",
    "Finance & accounting",
    "Legal services",
    "Healthcare administration",
    "Real estate",
    "Manufacturing",
    "Logistics",
    "Retail & e-commerce",
  ],
  facts_grid: [
    { value: "3", label: "Service pillars" },
    { value: "4", label: "Delivery stages" },
    { value: "8", label: "Industries covered" },
    { value: "4", label: "Interactive demos on the site" },
  ],
  commitments: [
    { title: "You decide stage by stage", body: "Every stage ends with something usable and a costed plan for the next." },
    { title: "You see it working early", body: "Short stages you can test, so problems surface while they're cheap to fix." },
    { title: "No lock-in", body: "Software and documentation your own team, or another supplier, can maintain." },
  ],
} as const;

export type Practice = (typeof startup.practices)[number];
