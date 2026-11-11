import type { Project } from "@/lib/types";

const project: Project = {
  slug: "aura-beauty-lounge",
  title: "AURA Beauty Lounge",
  tagline: "Luxury salon site with a consultation quiz, package builder and five-step booking",
  summary:
    "A white-label Next.js 15 template for beauty salons, aesthetic clinics and spas. A consultation quiz recommends treatments, a package builder prices bundles live with a 3+ treatment discount, and every call to action opens the same five-step booking drawer.",
  date: "2026-11",
  role: "Design & front-end development",
  categories: ["Client Work", "Full-Stack / Web"],
  format: "Client template",
  relevance: { corporate: 1, academic: 0, startup: 3 },
  stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide"],
  highlight: { value: "5-step", label: "booking flow" },
  metrics: [
    { value: "5-step", label: "Booking drawer" },
    { value: "3", label: "Quiz questions → top 3 treatments" },
    { value: "10%", label: "Auto package discount at 3+" },
  ],
  palette: [330, 40],
  links: { demo: "https://beautyparlour-five.vercel.app", repo: "https://github.com/nomaerrahman/Beauty_parlour_template" },
  caseStudy: {
    context: "Salon clients want a premium look, but their real goal is more bookings with less back-and-forth.",
    goal: "Help visitors choose treatments confidently and book in as few steps as possible.",
    problem: "Long treatment menus overwhelm first-time visitors, and bundle pricing is usually handled by phone.",
    approach: [
      "Consultation quiz (skin type, desired vibe, time available) that scores treatments and recommends three.",
      "Package builder with live time and price, applying the same discount rule as the booking drawer.",
      "Five-step booking: treatment, specialist, date and time, add-ons, details.",
      "Before/after slider usable with mouse, touch and keyboard.",
      "Content in typed data files; colours as CSS variables for quick rebranding.",
    ],
    results: ["Ready to connect to a real booking system such as Fresha, Timely or Square Appointments."],
  },
};

export default project;
