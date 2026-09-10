# Portfolio

A compact editorial portfolio built with the Next.js App Router. Six routes,
light and dark themes, and a restrained blur-to-focus motion system.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — tokens live in `src/app/globals.css`
- **Motion for React** — entrances, the navbar morph, the draggable gallery
- **lucide-react** — interface icons

## Routes

| Route | Contents |
| --- | --- |
| `/` | Hero, selected projects, latest writing, experience, testimonials, enquiry form |
| `/about` | Long-form intro, draggable photo pile, milestone timeline |
| `/projects` | All six projects |
| `/blog` | Article index |
| `/blog/[slug]` | Article, statically generated per slug |
| `/contact` | Full contact form |

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

- `site.ts` — name, roles cycled by the hero badge, socials, intro copy
- `projects.ts` — project cards for the homepage and projects page
- `experience.ts` — employment history and the neutral company monograms
- `testimonials.ts` — marquee entries
- `travel.ts` — photo pile, including each card's resting position and rotation
- `timeline.ts` — milestones grouped by year
- `articles.ts` — article bodies as typed blocks (`p`, `h2`, `ul`, `code`, …)

Article copy supports a small inline subset: `**bold**`, `` `code` `` and
`[links](https://example.com)`.

Project `href` values point at `example.com` placeholders — swap them for the
real case-study or live-site URLs.

## Imagery

Every image in `public/images/` is generated procedurally by
`scripts/generate-assets.mjs` — original artwork, no licensed or third-party
photography. Regenerate with:

```bash
node scripts/generate-assets.mjs
```

Replace the files with your own photographs when you have them; the components
read paths from the data files, and `next/image` handles the rest.

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
`deliver()` placeholder. Swap that function for a mail provider or a database
write; the client contract does not change.

## Accessibility and motion

`prefers-reduced-motion` removes transforms, blur, the marquee, the rotating
role badge and drag inertia. The photo pile stays usable without a pointer —
each card is focusable and moves with the arrow keys.
