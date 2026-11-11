/** MOCK CONTENT for the founder spotlight. Replace numbers and copy with real ones. */
export const startup = {
  name: "Mango Media",
  tagline: "A digital growth studio for small businesses",
  vision:
    "Most small businesses lose customers online not because their product is weak, but because their presence is. We give them a website, brand and review engine that works as hard as they do, without agency prices or agency timelines.",
  founded: "2026",
  partners: 3,
  bookingCta: "Book a 20-min discovery call",
  pillars: [
    { title: "Speed", body: "Fixed-scope packages that launch in two weeks." },
    { title: "Clarity", body: "One price, one board, weekly updates. No surprises." },
    { title: "Results", body: "Every package ships with tracking, so we can show what changed." },
  ],
  capabilities: [
    {
      id: "web",
      title: "Websites",
      blurb: "Fast, mobile-first sites built on a tested component kit and set up for local search.",
      preview: { headline: "Fresh bakes, every morning", sub: "Order ahead · Open 7am–4pm", accent: 16 },
    },
    {
      id: "brand",
      title: "Social branding",
      blurb: "A brand board, post templates and a content calendar the owner can actually keep up with.",
      preview: { headline: "@corner.bakery", sub: "12 templates · 4-week calendar", accent: 280 },
    },
    {
      id: "reviews",
      title: "QR reviews",
      blurb: "Table and counter QR stands that turn happy customers into public reviews in seconds.",
      preview: { headline: "How was your visit?", sub: "★★★★★  Tap to rate", accent: 42 },
    },
    {
      id: "influencer",
      title: "Influencer marketing",
      blurb: "Matching local creators with businesses, with briefs, tracking links and simple reporting.",
      preview: { headline: "Creator campaign", sub: "8 creators · 46k reach", accent: 200 },
    },
  ],
  metrics: [
    { value: "20+", label: "Businesses launched" },
    { value: "14", label: "Days to launch, on average" },
    { value: "3×", label: "Review volume lift" },
    { value: "60%", label: "Clients who stay on" },
  ],
} as const;

export type Capability = (typeof startup.capabilities)[number];
