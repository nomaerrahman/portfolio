import type { TextSegment } from "@/components/motion/kinetic-text";

/** One clear positioning: who I am and what I do. */
export const hero = {
  greeting: "Hi, I'm Nom",
  roles: ["Data Engineer", "Forward Deployed Engineer", "Founder, Atafol"],
  headline: ["I build software that", { accent: "solves real problems" }, "for businesses."] as TextSegment[],
  lead:
    "I turn messy business problems into working products: data pipelines, analytics and web apps. AI is part of how I design, code and test, so ideas get to real users quickly. I founded Atafol, a UK consultancy building custom software, automation and private AI, and I'm a Junior Data Engineer at Carrot Soft while finishing my MSc in Data Science and Analytics.",
};
