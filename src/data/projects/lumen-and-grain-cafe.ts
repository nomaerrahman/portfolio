import type { Project } from "@/lib/types";

const project: Project = {
  slug: "lumen-and-grain-cafe",
  title: "Lumen & Grain",
  tagline: "Coffee roastery, bakery and workspace lounge site with a live bake schedule and booking flow",
  summary:
    "A showcase site for pitching café, bakery and hospitality clients. Beyond the menu, it helps remote workers decide when to visit: a Wi-Fi and outlet guide, peak-hours chart, a live London-time oven timetable, and a four-step table booking with calendar export.",
  date: "2026-11",
  role: "Design & front-end development",
  categories: ["Client Work", "Full-Stack / Web"],
  format: "Client template",
  relevance: { corporate: 1, academic: 0, startup: 3 },
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn-style UI"],
  highlight: { value: "Live", label: "London-time bake schedule" },
  metrics: [
    { value: "4-step", label: "Booking flow with .ics export" },
    { value: "Live", label: "Oven timetable" },
    { value: "7", label: "Interactive sections" },
  ],
  palette: [30, 90],
  links: { demo: "https://cafe-amber-ten.vercel.app", repo: "https://github.com/nomaerrahman/cafe" },
  caseStudy: {
    context: "Cafés increasingly double as workspaces, but their sites rarely answer the questions remote workers actually have.",
    goal: "A café site that sells the food and the space, and turns visits into bookings.",
    problem: "Typical café sites are a menu and a map. They don't say when it's quiet, whether there's power, or when the bread comes out.",
    approach: [
      "Menu with category tabs and pairing suggestions on hover or tap.",
      "Space selector with room galleries and a 'reserve this room' shortcut.",
      "Work guide: Wi-Fi speed gauge, outlet tracker, atmosphere, peak hours chart and house rules.",
      "Bake schedule on live London time with a draggable day scrubber.",
      "Four-step booking drawer (goal, area, date/time/guests, details) with confirmation and calendar file.",
    ],
    results: ["A reusable Japandi-style template ready to rebrand for hospitality clients."],
  },
};

export default project;
