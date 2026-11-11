import type { Project } from "@/lib/types";

const project: Project = {
  slug: "apex-grooming-barbershop",
  title: "APEX Grooming Studio",
  tagline: "Dark-mode barbershop site with a package builder and four-step booking drawer",
  summary:
    "A white-label luxury barbershop template. A quick-book bar in the hero jumps straight to time selection, a package builder shows live price and chair time, and the booking drawer blocks barbers' days off and ends with an add-to-calendar file.",
  date: "2026-11",
  role: "Design & front-end development",
  categories: ["Client Work", "Full-Stack / Web"],
  format: "Client template",
  relevance: { corporate: 1, academic: 0, startup: 3 },
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
  highlight: { value: "4-step", label: "booking with .ics export" },
  metrics: [
    { value: "4-step", label: "Booking drawer" },
    { value: "Live", label: "Package price & chair time" },
    { value: "A11y", label: "Keyboard & reduced-motion support" },
  ],
  palette: [42, 0],
  links: { demo: "https://barbershop-two-gules.vercel.app", repo: "https://github.com/nomaerrahman/BarberShop_Template" },
  caseStudy: {
    context: "Barbershops live on repeat bookings, and most customers book on their phone in a few seconds.",
    goal: "A premium site where booking is never more than one tap away.",
    problem: "Generic booking widgets don't know which barber works which day, and don't sell add-ons.",
    approach: [
      "Hero quick-book bar (service, barber, date) that opens the drawer straight at time selection.",
      "Services with category tabs, plus a package builder with live total and chair time and a VIP upsell hint.",
      "Barber cards filterable by specialty, with experience, specialties and a book button.",
      "Booking drawer blocks days off and closed days, validates details, and offers an .ics download.",
      "Skip link, visible focus rings, keyboard-operable slider and tabs, and reduced-motion support throughout.",
    ],
    results: ["A rebrandable template for pitching barbershop clients."],
  },
};

export default project;
