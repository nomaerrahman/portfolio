import { Hero } from "@/components/sections/hero";
import { SectionOrchestrator } from "@/components/sections/section-orchestrator";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <SectionOrchestrator />
    </main>
  );
}
