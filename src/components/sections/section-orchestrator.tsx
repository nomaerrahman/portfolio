import { SECTION_ORDER, type SectionId } from "@/lib/sections";
import { Work } from "./work";
import { Startup } from "./startup";
import { About } from "./about";
import { Next } from "./next";
import { Beyond } from "./beyond";
import { Contact } from "./contact";

const SECTIONS: Record<SectionId, () => JSX.Element> = {
  work: Work,
  startup: Startup,
  about: About,
  next: Next,
  interests: Beyond,
  contact: Contact,
};

/** Renders the homepage sections in reading order (see lib/sections.ts). */
export function SectionOrchestrator() {
  return (
    <>
      {SECTION_ORDER.map((id) => {
        const Section = SECTIONS[id];
        return <Section key={id} />;
      })}
    </>
  );
}
