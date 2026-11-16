import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Academic } from "@/components/sections/academic";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Degrees & coursework · ${profile.shortName}`,
  description: "MSc Data Science and Analytics and BSc Computer Science, with selected coursework to read.",
};

export default function AcademicPage() {
  return (
    <main className="relative z-10 pt-24 md:pt-28">
      <div className="container">
        <Link href="/#about" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft size={14} /> Back to About
        </Link>
      </div>
      <Academic />
    </main>
  );
}
