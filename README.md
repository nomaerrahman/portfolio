# Nomaer Naiem · Portfolio

A hybrid portfolio for three audiences (recruiters, academic committees, startup clients) built with
**Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide**.

## Run it

```bash
npm install
cp .env.example .env.local   # add your Cal.com / Calendly link
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

## Hero copy variants

Three positioning options live in `src/data/hero.ts`. Preview any of them on the running site with
`?hero=a`, `?hero=b` or `?hero=c`, then set `DEFAULT_HERO`.

## Beyond the Screen

`src/data/hobbies.ts` holds the copy; each card's animation lives in `src/components/beyond/`.
Animations run on hover/focus with a mouse, when scrolled into view on touch screens, and never with reduced motion.

## How the "Audience View" works

`src/lib/audience.ts` defines one config per audience (`all`, `corporate`, `academic`, `startup`). Switching mode:

- **swaps the hero's primary CTA, stats and one-line "lens" note** (page order stays stable)
- **re-ranks project cards** by each project's `relevance` score (0 = dimmed)
- **fades the timeline** to the relevant track
- **pre-selects the contact form's inquiry type**
- **recolours the hero glow**

All motion timings live in `src/components/motion/presets.ts`.

Mode is shareable: `yoursite.com/?view=academic` opens straight into the academic view
(handy to put in a cover letter or a PhD application).

## Structure

```
src/
├─ app/                 layout.tsx · page.tsx · globals.css (design tokens) · api/contact/route.ts
├─ components/
│  ├─ providers/        audience · theme · ui (drawer / booking / inquiry state)
│  ├─ motion/           presets · Reveal · Stagger · WordReveal · Magnetic · HoverLift · Counter
│  ├─ effects/          HeroBackdrop · PipelineCard · PointerSpotlight · SpotlightCard
│  ├─ beyond/           ActivityCard · ChessBoard · illustrations
│  ├─ layout/           Navbar · AudienceSwitcher · Footer
│  ├─ sections/         Hero · Work · Research · Startup · About · Beyond · Contact · BookingModal
│  ├─ work/             ProjectCard · ProjectCover · CodeBlock
│  ├─ projects/         ProjectsArchive · ProjectRow · CaseToc · Figure · LivePreview
│  ├─ research/         PublicationRow · CiteButton · PdfModal
│  ├─ about/            Timeline · SkillsRadar · SkillCloud
│  └─ ui/               Button (cva) · Badge · Modal · SectionHeading
├─ app/projects/        page.tsx (archive) · [slug]/page.tsx (case study)
├─ data/projects/       one file per project + index.ts
├─ data/                research.ts · startup.ts · profile.ts · hero.ts · hobbies.ts   ← edit these
└─ lib/                 types.ts · audience.ts · utils.ts
```

## Make it yours (checklist)

- [x] Projects: real, from GitHub and Vercel
- [x] `src/data/startup.ts`: HypeSpark (mirrors the live HypeSpark site copy)
- [ ] `src/data/research.ts`: still placeholder content
- [ ] `src/data/profile.ts`: email, socials (confirm the GitHub username), CV path, display name
- [ ] `public/cv.pdf` and `public/papers/*.pdf`: swap in real PDFs
- [ ] `.env.local`: `NEXT_PUBLIC_BOOKING_URL` (Cal.com or Calendly)
- [ ] `src/app/api/contact/route.ts`: connect an email provider (Resend, Postmark, Formspree…)
- [ ] Optional: add hover preview videos in `public/previews/` and set `previewVideo` on a project

## Design tokens

Colours live as HSL variables in `globals.css` (`.dark` is the default; light mode via the toggle).
Each audience has its own tone: `--corporate` (azure), `--academic` (amber), `--startup` (ember).

## Accessibility & performance

- Respects `prefers-reduced-motion` (particles freeze, text reveals become fades, custom cursor disabled)
- Native cursor kept; a faint pointer spotlight only on fine pointers; keyboard focus rings everywhere; modals close on `Esc`
- No blur layers or canvas loops; hero packets use native SVG animation
- No external fonts or images; home page first load ≈ 179 kB JS
