# AGENTS.md

## Mission
Maintain a minimal, high-signal portfolio that converts three paths cleanly:
1. Hiring Maxwell full-time
2. Hiring Maxwell for focused sprint work
3. Hiring ninetynine digital for broader studio scope

## Operating Priorities
1. Keep visual density low. Additions must stay compact and intentional.
2. Never ship broken links or dead CTAs.
3. Favor measurable proof (outcomes, role clarity, shipped work) over decorative copy.
4. Preserve in-progress work visibility without pretending it is launched.

## Required Checks Before Push
Run:
- `pnpm run build`
- `pnpm run check:projects`
- `pnpm run check:site`

Optional visual regression:
- `pnpm run check:site:screenshots`
- To set a new visual baseline:
  - `pnpm run check:site:screenshots -- --update-baseline`

## Deployment
Production deploy command:
- `vercel --prod --yes`

After deploy:
1. Confirm alias assignment succeeded.
2. Re-run `pnpm run check:site -- --base https://dev.maxwellyoung.info`.
3. Log broken routes immediately and patch before next content iteration.

## Project Data Rules
1. Use `releaseStage` as source of truth for launch state.
2. Only show live links for:
   - `releaseStage: "released"`, or
   - explicit preview exceptions with `allowPreviewLink: true`.
3. Projects without live links must render a clear pending state (no fake CTA).

## High-Leverage Roadmap (Active)
1. `Launched` filter in projects view for fast employer scan.
2. Compact ecosystem rail near homepage hero.
3. Automated route + screenshot regression checks in `scripts/site-regression-check.mjs`.
