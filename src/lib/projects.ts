import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "./types";

export const CATEGORIES: ProjectCategory[] = ["Data Engineering", "Data Science & Analytics", "Full-Stack / Web", "Client Work"];

export const byNewest = (a: Project, b: Project) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title);

export const allProjects = [...projects].sort(byNewest);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectYear = (p: Project) => p.date.slice(0, 4);

/** Homepage highlights, in the curated `featured` order. */
export function getFeatured(count = 4): Project[] {
  return projects
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99))
    .slice(0, count);
}

export function categoryCounts() {
  return CATEGORIES.map((c) => ({ category: c, count: projects.filter((p) => p.categories.includes(c)).length })).filter(
    (c) => c.count > 0
  );
}

/** Previous / next in archive order, wrapping around. */
export function getAdjacent(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  const n = allProjects.length;
  return { prev: allProjects[(i - 1 + n) % n], next: allProjects[(i + 1) % n] };
}

export function matchesQuery(p: Project, q: string) {
  if (!q) return true;
  const hay = [p.title, p.tagline, p.summary, p.format, ...p.stack, ...p.categories].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}
