/** Homepage sections, in reading order: what I did → what I'm building → who I am → what's next → interests → contact. */
export type SectionId = "work" | "startup" | "about" | "next" | "interests" | "contact";

export const SECTION_ORDER: SectionId[] = ["work", "startup", "about", "next", "interests", "contact"];

/** Sections shown in the header. */
export const NAV_SECTIONS: SectionId[] = ["work", "startup", "about", "contact"];

export const SECTION_LABELS: Record<SectionId, string> = {
  work: "Work",
  startup: "Atafol",
  about: "About",
  next: "Now & next",
  interests: "Interests",
  contact: "Contact",
};

/** Two-digit position of a section, e.g. "02". */
export const sectionIndex = (id: SectionId) => String(SECTION_ORDER.indexOf(id) + 1).padStart(2, "0");
