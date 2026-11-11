import type { TextSegment } from "@/components/motion/kinetic-text";

export interface HeroVariant {
  id: "a" | "b" | "c";
  name: string;
  headline: TextSegment[];
  lead: string;
}

/**
 * Three positioning options. Pick the default below, or preview any of them
 * live with ?hero=a, ?hero=b or ?hero=c on the URL.
 */
export const HERO_VARIANTS: HeroVariant[] = [
  {
    id: "a",
    name: "Builder by instinct",
    headline: ["Data engineer by trade,", { accent: "builder" }, "by instinct."],
    lead:
      "I'm Nom, an MSc Data Science and Analytics student at Brunel University London. I build the pipelines, platforms and web apps that turn raw data into decisions people can trust.",
  },
  {
    id: "b",
    name: "Data meets the web",
    headline: ["I build where", { accent: "data" }, "meets the web."],
    lead:
      "Nom here. I design data pipelines, ship full-stack products and study data science at Brunel University London, with one foot in engineering and one in the lab.",
  },
  {
    id: "c",
    name: "Raw data to real products",
    headline: ["From raw data", "to", { accent: "real products." }],
    lead:
      "I'm Nom: data engineer, MSc researcher and web developer. I care about clean pipelines, honest models and interfaces people actually enjoy using.",
  },
];

export const DEFAULT_HERO: HeroVariant["id"] = "a";
