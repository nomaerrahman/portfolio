"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ActivityCard } from "@/components/beyond/activity-card";
import { ChessBoard } from "@/components/beyond/chess-board";
import { BadmintonArt, CalisthenicsArt, FifaArt, FootballArt, SwimmingArt } from "@/components/beyond/illustrations";
import { sectionIndex } from "@/lib/sections";
import { hobbies, type HobbyId } from "@/data/hobbies";

const byId = (id: HobbyId) => hobbies.find((h) => h.id === id)!;

/**
 * "Beyond the Screen": a bento grid of interactive activity cards.
 * Desktop layout (4 columns):
 *   [ Chess (2×2) ][ Football (2) ]
 *   [ Chess      ][ Badminton ][ Swimming ]
 *   [ Calisthenics (2) ][ FIFA (2) ]
 */
export function Beyond() {
  const discipline = hobbies.filter((h) => h.group === "Discipline").length;
  const strategy = hobbies.length - discipline;

  return (
    <section id="interests" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex("interests")}
          eyebrow="Interests"
          title={
            <>
              Discipline on the pitch, <span className="font-serif font-normal italic text-academic">strategy at the board.</span>
            </>
          }
          description="In tech, I'm drawn to AI-assisted building, data products and automation for small businesses. Away from the keyboard, it's sport and strategy games, and what each one teaches me about how I work."
        >
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-semibold tracking-tight">{discipline}</p>
              <p className="t-eyebrow !text-[10px]">Sports</p>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight text-academic">{strategy}</p>
              <p className="t-eyebrow !text-[10px]">Strategy games</p>
            </div>
          </div>
        </SectionHeading>

        <ul className="mb-8 flex flex-wrap gap-2" aria-label="Interests in tech">
          {["AI-assisted development", "Data products", "Automation for small businesses", "Startups & product", "Analytics engineering"].map((t) => (
            <li key={t} className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm">
              {t}
            </li>
          ))}
        </ul>

        <Stagger className="grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          <StaggerItem className="sm:col-span-2 lg:row-span-2">
            <ActivityCard hobby={byId("chess")} artClassName="flex-1" render={(a) => <ChessBoard active={a} />} />
          </StaggerItem>
          <StaggerItem className="sm:col-span-2">
            <ActivityCard hobby={byId("football")} artClassName="h-32 md:h-36" render={(a) => <FootballArt active={a} />} />
          </StaggerItem>
          <StaggerItem>
            <ActivityCard hobby={byId("badminton")} artClassName="h-32 md:h-36" render={(a) => <BadmintonArt active={a} />} />
          </StaggerItem>
          <StaggerItem>
            <ActivityCard hobby={byId("swimming")} artClassName="h-32 md:h-36" render={(a) => <SwimmingArt active={a} />} />
          </StaggerItem>
          <StaggerItem className="sm:col-span-1 lg:col-span-2">
            <ActivityCard hobby={byId("calisthenics")} artClassName="h-32 md:h-36" render={(a) => <CalisthenicsArt active={a} />} />
          </StaggerItem>
          <StaggerItem className="sm:col-span-1 lg:col-span-2">
            <ActivityCard hobby={byId("fifa")} artClassName="h-32 md:h-36" render={(a) => <FifaArt active={a} />} />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
