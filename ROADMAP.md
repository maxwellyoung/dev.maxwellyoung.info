### Shader Generation Roadmap

## Vision

Deliver a robust, beautiful, and performant shader-generation experience that turns short prompts into production-worthy WebGL backgrounds with fast iteration and shareability.

## Success Criteria

- Valid, performant GLSL ES 1.00 with subtle interactivity.
- Sub-1.5s perceived TTFB via fallbacks and caching.
- > 90% compile success on first try; safe fallbacks for the rest.
- Share links reproduce visuals across devices.

## Phases

### Phase 0 — Stabilize foundation

- High-quality fallback shader (domain-warped FBM + palette + vignette).
- Validation: check required uniforms, ban risky tokens, cap loop sizes.
- Runtime guards: compile/link logs, fallback on errors, FPS guard.
- Telemetry hooks (client-only): success/failure, fps samples.

### Phase 1 — Shader quality baseline

- Strong system prompt with constraints and best-practices.
- Uniform pack: u_resolution, u_time, u_mouse, u_seed, u_colorA, u_colorB; optional u_detail.
- Palette guidance, gentle motion, aspect-correct UVs.

### Phase 2 — UX flows

- Generate, Regenerate (same prompt), Duplicate, Rename, Remove.
- Import/Export JSON, Share links (#bg=base64).
- Lock camera and performance toggle (dynamic detail).

### Phase 3 — Model excellence

- Few-shot JSON examples in system prompt.
- Dynamic constraints by prompt length.
- Temperature tuning.

### Phase 4 — Performance & resilience

- Device adaptation; DPR clamp; dynamic detail scaling.
- Graceful degradation on backgrounded tabs.

### Phase 5 — Share & reproducibility

- Share link, import/export, versioning for recipes.

### Phase 6 — Pro tools (optional)

- Inline read-only editor; fork to editable.
- Uniform knobs for detected uniforms.
- Screenshot/GIF capture.

### Phase 7 — Production hardening

- Rate limiting, caching by normalized prompt + version.
- Monitoring, privacy guardrails.

### Phase 8 — Polish & branding

- Curated presets aligned with brand.

## Implementation Notes

- API: strict validation + strong fallback.
- ShaderBackground: dynamic quality via u_detail; FPS monitor.
- ArtStyleMenu: regenerate, rename, share, import/export.
- Provider: updateGeneratedStyle helper; localStorage persistence.
