# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (port 3000)
pnpm build        # Production build with webpack
pnpm lint         # Run ESLint
```

Note: The project uses `--webpack` flag for dev/build (Next.js 16 turbopack is disabled).

## Architecture

### Tech Stack
- **Next.js 16** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** with shadcn/ui components
- **Framer Motion** for animations
- **Sanity CMS** for dynamic content (blog posts, some project data)
- **MDX** for static content pages

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/landing page
│   ├── projects/          # Project listing
│   ├── case-study/[slug]/ # Dynamic case study pages
│   ├── blog/[slug]/       # Blog posts (MDX)
│   ├── resume/            # Resume page with PDF export
│   └── explore/           # Interactive explore page
├── components/
│   ├── ui/                # shadcn/ui primitives (Button, Dialog, etc.)
│   └── providers/         # Context providers (ArtStyle, PostHog, etc.)
└── lib/
    ├── projects.ts        # Project data definitions (types + static data)
    ├── motion.ts          # Unified animation system
    ├── sanity.ts          # Sanity client config
    └── resumeData.ts      # Resume content
```

### Key Patterns

**Provider Hierarchy** (in `layout.tsx`):
```
CSPostHogProvider → ThemeProvider → ArtStyleProvider → SmoothScrollProvider → PageTransitionProvider
```

**Project Data**: Projects are defined as typed objects in `src/lib/projects.ts` with a `Project` interface that includes status, category, role, build logs, and metrics. Featured projects appear on the home page.

**Motion System** (`src/lib/motion.ts`): Centralized animation config with spring presets (`snappy`, `default`, `gentle`, `soft`), stagger timings, and container/item variants. Respects `prefers-reduced-motion`.

**Path Alias**: `@/*` maps to `./src/*`

### External Services
- **Sanity CMS**: Configured via `NEXT_PUBLIC_SANITY_*` env vars
- **PostHog Analytics**: Via `NEXT_PUBLIC_POSTHOG_*` env vars
- **Vercel**: Deployment target with Analytics + Speed Insights

### Fonts
Custom fonts loaded via `next/font/local`:
- General Sans (sans-serif, `--font-general-sans`)
- Sentient (serif, `--font-sentient`)

### Theme
Dark mode is default and enabled via `next-themes`. Color tokens use CSS custom properties with HSL values (configured in `globals.css`).
