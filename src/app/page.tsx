import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { SectionOrchestrator } from "@/components/sections/section-orchestrator";
import { ProjectDrawer } from "@/components/work/project-drawer";
import { BookingModal } from "@/components/sections/booking-modal";
import { PointerSpotlight } from "@/components/effects/pointer-spotlight";

export default function Home() {
  return (
    <>
      <PointerSpotlight />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionOrchestrator />
      </main>
      <Footer />
      <ProjectDrawer />
      <BookingModal />
    </>
  );
}
