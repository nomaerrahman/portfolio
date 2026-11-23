# Nomaer Naiem · Portfolio

Nom's portfolio: a data engineer, builder and founder who ships data, AI-powered and web products. Built with
**Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide**.

## Run it

```bash
npm install
cp .env.example .env.local   # optional: a Cal.com / Calendly link enables "Book a call"
npm run dev                  # http://localhost:3000
```

Deploy: push to GitHub and import into Vercel. No other setup needed.

## Projects: adding a new one

The homepage shows 4 highlights plus an archive card; every project lives at **`/projects`**
(search, category filters, grid/list views, shareable URLs like `/projects?category=Client%20Work&view=list`)
and gets its own case-study page at **`/projects/<slug>`** (statically generated, with its own metadata).

To add a project:

1. Copy any file in `src/data/projects/`, rename it to your slug and fill it in.
2. Optional: put images in `public/projects/<slug>/` and set `cover` / `gallery` (WebP, ~1440px wide).
   Without a cover, a branded generative cover is used.
3. Import it in `src/data/projects/index.ts`.
4. To show it on the homepage, give it `featured: 1–4` (lower = earlier).

Web projects with a `links.demo` URL get a click-to-load live preview on their case-study page.

## Beyond the Screen

`src/data/hobbies.ts` holds the copy; each card's animation lives in `src/components/beyond/`.
Animations run on hover/focus with a mouse, when scrolled into view on touch screens, and never with reduced motion.

## Page structure

The homepage answers five questions, in this order (`src/lib/sections.ts`):

1. **Who I am / what I do**: hero (`src/data/hero.ts`)
2. **What I did**: Work (4 featured projects + archive) and Atafol
3. **Who I am**: About (story, experience, skills, CV, link to `/academic`)
4. **What I want to do**: Now & next (`src/data/now.ts`; keep it current)
5. **Interests**: tech interests and sport/strategy cards
6. **Contact**: one simple section

All motion timings live in `src/components/motion/presets.ts`.

## Structure

```
src/
├─ app/                 layout.tsx · page.tsx · globals.css (design tokens) · api/contact/route.ts
├─ components/
│  ├─ providers/        theme
│  ├─ motion/           presets · Reveal · Stagger · WordReveal · Magnetic · HoverLift · Counter
│  ├─ effects/          HeroBackdrop · PipelineCard · PointerSpotlight · SpotlightCard
│  ├─ beyond/           ActivityCard · ChessBoard · illustrations
│  ├─ layout/           Navbar · Footer
│  ├─ sections/         Hero · Work · Startup (Atafol) · About · Next · Beyond (Interests) · Contact · Academic
│  ├─ work/             ProjectCard · ProjectCover · CodeBlock
│  ├─ projects/         ProjectsArchive · ProjectRow · CaseToc · Figure · LivePreview
│  ├─ research/         PublicationRow · CiteButton · PdfModal
│  ├─ about/            Timeline · SkillsRadar · SkillCloud
│  └─ ui/               Button (cva) · Badge · Modal · SectionHeading
├─ app/projects/        page.tsx (archive) · [slug]/page.tsx (case study)
├─ data/projects/       one file per project + index.ts
├─ data/                research.ts · startup.ts · profile.ts · hero.ts · hobbies.ts   ← edit these
└─ lib/                 types.ts · sections.ts · projects.ts · utils.ts
```

## Content sources

- **CV:** `public/Nomaer_Naiem_CV.pdf`. Profile, timeline and skills in `src/data/profile.ts` mirror it; update both together.
- **Projects:** `src/data/projects/` (one file each).
- **Coursework:** `src/data/academic.ts` + PDFs in `public/academic/`.
- **Venture:** `src/data/startup.ts` (Atafol).
- **Contact:** the form opens a ready-to-send email to the address in `profile.ts`; no backend needed.
- **Optional:** set `NEXT_PUBLIC_BOOKING_URL` to add a "Book a call" calendar.

## Design tokens

Colours live as HSL variables in `globals.css` (`.dark` is the default; light mode via the toggle).
Category tones: `--corporate` (azure), `--academic` (amber), `--startup` (ember), `--web` (green).

## Accessibility & performance

- Respects `prefers-reduced-motion` (particles freeze, text reveals become fades, custom cursor disabled)
- Native cursor kept; a faint pointer spotlight only on fine pointers; keyboard focus rings everywhere; modals close on `Esc`
- No blur layers or canvas loops; hero packets use native SVG animation
- No external fonts or images; home page first load ≈ 179 kB JS
