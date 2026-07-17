# Maxwell Young — Developer Portfolio

Source for [dev.maxwellyoung.info](https://dev.maxwellyoung.info), a curated public portfolio and resume for Maxwell Young.

## What is included

- Selected production, independent-product, and client work
- Evidence-focused case studies for work that is approved for publication
- Verified open-source contributions with direct links to merged changes
- A browser resume with client-side PDF export
- Interaction and motion studies
- Responsive, keyboard-accessible light and dark themes

Employer-internal, client-private, academic-private, and unreleased material does not belong in this repository. Public claims should be supported by visible product evidence or clearly framed as prototypes.

## Stack

- Next.js and React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Analytics and optional PostHog analytics

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
pnpm privacy:scan
pnpm test
pnpm lint
pnpm build
```

The privacy scan checks the public worktree for private planning artifacts, local paths, raw team context, Notion links, and credential-like strings.

## Content sources

- `src/lib/projects.ts` — public project summaries
- `src/lib/caseStudies.ts` — publishable case studies
- `src/lib/resumeData.ts` — resume content
- `src/lib/openSource.ts` — verified open-source proof
- `src/app/` — routes, metadata, and product pages
- `public/` — curated public media

## Deployment

The site is deployed on Vercel. Deployment is intentionally separate from local verification.

## Contact

[maxwell@ninetynine.digital](mailto:maxwell@ninetynine.digital)
