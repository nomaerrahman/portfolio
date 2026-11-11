import { SECTION_ORDER, type SectionId } from "@/lib/audience";
import { Work } from "./work";
import { Research } from "./research";
import { Startup } from "./startup";
import { About } from "./about";
import { Beyond } from "./beyond";
import { Contact } from "./contact";

const SECTIONS: Record<SectionId, () => JSX.Element> = {
  work: Work,
  research: Research,
  startup: Startup,
  about: About,
  beyond: Beyond,
  contact: Contact,
};

/** Renders sections in the stable page order defined in lib/audience.ts. */
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
