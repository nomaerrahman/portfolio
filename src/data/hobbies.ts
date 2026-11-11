export type HobbyId = "football" | "badminton" | "calisthenics" | "swimming" | "chess" | "fifa";

export interface Hobby {
  id: HobbyId;
  name: string;
  group: "Discipline" | "Strategy";
  /** What it brings to how I work. Keep it one sentence. */
  lesson: string;
  traits: string[];
  stat?: { label: string; value: string };
}

/** Edit freely: the copy here is yours to personalise. */
export const hobbies: Hobby[] = [
  {
    id: "chess",
    name: "Chess",
    group: "Strategy",
    lesson: "Thinking a few moves ahead, and accepting that the position, not my plan, decides the best move.",
    traits: ["Rapid", "Openings", "Calculation"],
    stat: { label: "Rapid rating · goal 2000", value: "~1500" },
  },
  {
    id: "football",
    name: "Football",
    group: "Discipline",
    lesson: "Reading the game, communicating early, and doing the unglamorous running that makes the team work.",
    traits: ["Team play", "Reading the game"],
  },
  {
    id: "badminton",
    name: "Badminton",
    group: "Discipline",
    lesson: "Fast feedback loops: react, reset, go again.",
    traits: ["Reflexes", "Footwork"],
  },
  {
    id: "swimming",
    name: "Swimming",
    group: "Discipline",
    lesson: "Steady pacing beats sprinting. Good for long projects too.",
    traits: ["Endurance", "Rhythm"],
  },
  {
    id: "calisthenics",
    name: "Calisthenics",
    group: "Discipline",
    lesson: "Progressive overload: small, consistent gains compound into skills that looked impossible.",
    traits: ["Consistency", "Bodyweight"],
  },
  {
    id: "fifa",
    name: "FIFA",
    group: "Strategy",
    lesson: "Spotting patterns in an opponent's play, then adapting the system mid-match.",
    traits: ["Tactics", "Adaptation"],
  },
];
