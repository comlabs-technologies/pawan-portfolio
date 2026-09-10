# Pawan Mishra — Portfolio

A compact editorial portfolio built with the Next.js App Router. Five routes,
light and dark themes, and a restrained blur-to-focus motion system.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — tokens live in `src/app/globals.css`
- **Motion for React** — entrances and the navbar morph
- **lucide-react** — interface icons

## Routes

| Route | Contents |
| --- | --- |
| `/` | Hero, selected projects, thinking, experience, selected outcomes, enquiry form |
| `/about` | Positioning, how I work, education and leadership |
| `/projects` | All nine projects |
| `/thinking` | Subjects written about on LinkedIn |
| `/contact` | Full contact form and details |

`/blog` and `/blog/:slug` redirect to `/thinking`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run typecheck
```

## Where the content lives

Everything editable is typed data under `src/data/`:

- `site.ts` — name, roles cycled by the hero badge, location, verified socials, intro copy
- `projects.ts` — project cards for the homepage and projects page
- `experience.ts` — employment history and the neutral company monograms
- `outcomes.ts` — the factual "Selected outcomes" cards
- `principles.ts` — the "How I work" list on the about page
- `credentials.ts` — education, leadership and service
- `notes.ts` — subjects for the thinking page
- `tech.ts` — technology monograms

## Content rules this site follows

The content is factual and deliberately conservative:

- **No invented URLs.** A project renders as an unlinked card unless `href` is
  set to a verified public address. Add one and the card becomes a link, with
  the hover treatment, automatically.
- **No invented contact channels.** Only the verified LinkedIn profile is
  listed. `socials` in `src/data/site.ts` drives the navbar and footer, so
  adding a confirmed GitHub or X profile is a one-line change; until then those
  controls stay hidden.
- **No fabricated dates or metrics.** The thinking page links to the LinkedIn
  profile rather than publishing article pages with invented publication dates.

## Imagery

Every image in `public/images/` is generated procedurally by
`scripts/generate-assets.mjs` — original abstract artwork standing in for
screenshots, with no licensed or third-party assets. Regenerate with:

```bash
node scripts/generate-assets.mjs
```

Replace the files with real product screenshots and a photograph when they are
available; the components read paths from the data files, and `next/image`
handles the rest.

## Design system

Tokens are CSS custom properties on `:root` and `.dark`, exposed to Tailwind
through `@theme inline`. Notable pieces:

- **Canvas** — an 896px content column between two 16px patterned rails
- **Type scale** — `text-meta` (12px), `text-label` (14px), `text-body` (16px),
  `text-title-sm` (24px), `text-title` (36px)
- **Motion** — one easing curve, `[0.16, 1, 0.3, 1]`, defined in `src/lib/motion.ts`

Dark mode is class-based, stored in `localStorage`, and applied by a blocking
inline script (`ThemeScript`) so there is no flash and no hydration mismatch.

## Contact submissions

`POST /api/contact` validates with `src/lib/validation.ts` and then calls a
`deliver()` placeholder that only logs. Swap that function for a mail provider
or a database write before relying on it; the client contract does not change.

## Accessibility and motion

`prefers-reduced-motion` removes transforms, blur and the rotating role badge.
All content stays visible, and theme switching and navigation keep working.
