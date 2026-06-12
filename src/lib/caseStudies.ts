// Case study data - shared between metadata and page component

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  timeline: string;
  role: string;
  team?: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  challenge: string;
  constraints?: string[];
  decisionLog?: {
    problem: string;
    decision: string;
    tradeoff: string;
    impact?: string;
  }[];
  approach: {
    title: string;
    description: string;
    image?: string;
  }[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  avoidedPatterns?: string[];
  nextIterations?: string[];
  learnings: string[];
  nextProject?: { slug: string; title: string };
}

// Silk case study unpublished for now — full draft lives in git history
// (commit a46c00b). To publish: restore the entry here and set
// caseStudySlug: "silk" in projects.ts.

export const caseStudies: Record<string, CaseStudy> = {
  afterlight: {
    slug: "afterlight",
    title: "Afterlight",
    subtitle: "A concert diary that keeps your nights to yourself",
    heroImage: "/projectImages/afterlight-1.webp",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    liveUrl: "https://afterlight.ninetynine.digital",
    overview:
      "Afterlight is a concert diary — Letterboxd for live music, but quieter. You log the gig, keep the photos, write down what you remember before it fades. Everything stays on your phone: no account, no feed, no analytics.",
    challenge:
      "Concert memories live scattered across camera rolls, ticket stubs, and half-remembered setlists. The obvious product to build here is social — reviews, followers, taste as performance. I wanted the opposite: a private record. The hard part was making something feel rich and alive without any of the machinery apps normally use to feel alive — no network effects, no notifications, nothing pulling you back. The app has to earn its place purely through the quality of remembering.",
    constraints: [
      "Local-first for real: no accounts, no servers, no analytics. If the value isn't on the device, it doesn't exist.",
      "A diary is for years, not sessions. The design has to age well and the data has to survive.",
      "Solo build — every feature competes with finishing.",
    ],
    decisionLog: [
      {
        problem: "Social features are the default growth engine for any logging app.",
        decision: "Cut them entirely. No accounts, no sharing graph, no server.",
        tradeoff: "No virality, and no effortless cloud-backup story out of the box.",
        impact: "The promise fits in one sentence, and privacy isn't a settings page — it's the architecture.",
      },
      {
        problem: "Music apps default to streaming-service aesthetics — gradients, glass, glow.",
        decision: "Authored a design system from gig poster modernism instead: Factory Records palette, Swiss type discipline, grain, true black.",
        tradeoff: "A strong aesthetic position will alienate some users.",
        impact: "The app feels like the objects it's about — posters, tickets, the printed ephemera of going out.",
      },
      {
        problem: "Spring animation invites spectacle.",
        decision: "Built a small motion grammar — a handful of springs used consistently, nothing animating from scale(0), nothing over 300ms.",
        tradeoff: "Restraint reads as less impressive in a screen recording.",
        impact: "Motion clarifies state instead of performing for the user.",
      },
    ],
    approach: [
      {
        title: "The loop is the product",
        description:
          "Log a gig, attach the photos, write a line about the night. The whole app is in service of a loop small enough to finish and good enough to repeat. Everything that didn't serve it got cut.",
      },
      {
        title: "Gig poster modernism",
        description:
          "The visual language borrows from the printed history of live music — FAC blue, true black, grain textures, type set with Swiss discipline. A strong reference makes a thousand small decisions for you.",
      },
      {
        title: "Local-first as a feature",
        description:
          "On-device storage isn't a compromise; it's the pitch. Your concert history is yours in the most literal sense available to software: it never leaves the hardware in your pocket.",
      },
    ],
    outcome:
      "A finished 1.0 shaped around a small, offline-first loop — log the gig, keep the photos, remember the night — wrapped in a design system I'd defend line by line.",
    metrics: [
      { label: "Accounts required", value: "0" },
      { label: "Data leaves device", value: "Never" },
      { label: "Design system", value: "Authored from scratch" },
    ],
    avoidedPatterns: [
      "Streaks, badges, or anything that turns remembering into homework.",
      "Cloud accounts as the price of entry.",
      "Streaming-app aesthetics — the design borrows from posters, not players.",
    ],
    nextIterations: [
      "Setlist capture and richer gig metadata.",
      "An export format that treats your history as yours — plain, readable files rather than a proprietary lockbox.",
    ],
    learnings: [
      "Cutting the network from a product removes a third of the code and half the anxiety.",
      "A strong visual reference is a decision-making machine — Factory Records answered questions I would otherwise have litigated alone for weeks.",
      "Local-first is a constraint that designs for you: with no server, every feature has to justify itself on the device or it doesn't ship.",
    ],
    nextProject: { slug: "chlita", title: "Ch'lita" },
  },
  whakapapa: {
    slug: "whakapapa",
    title: "Whakapapa",
    subtitle: "Family history software built around source material",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["Next.js 16", "Supabase", "Claude API", "Tesseract.js", "React Flow", "dagre", "Framer Motion"],
    liveUrl: "https://whakapapa.vercel.app",
    githubUrl: "https://github.com/maxwellyoung/whakapapa",
    overview:
      "A family history app that turns documents, photos, and recorded stories into structured family records and a navigable tree.",
    challenge:
      "Most genealogy tools are expensive, rigid, and centered on manual data entry. The goal here was to make source capture and review easier without asking users to trust raw AI output.",
    constraints: [
      "Trust is fragile with family history data, so AI output must stay reviewable and reversible.",
      "Many source artifacts are low quality scans and handwritten notes.",
      "The product needed to be viable for a solo builder and affordable for families.",
    ],
    decisionLog: [
      {
        problem: "AI extraction can hallucinate relationships.",
        decision: "Added a suggestion queue with explicit human approval before writing to the tree.",
        tradeoff: "Slightly slower ingestion versus fully automatic sync.",
        impact: "Higher confidence in accepted data and fewer correction loops.",
      },
      {
        problem: "Genealogy tools often bury stories under forms.",
        decision: "Made voice capture and story context first-class alongside people and dates.",
        tradeoff: "More schema complexity and moderation edge cases.",
        impact: "Richer family context and stronger emotional retention.",
      },
    ],
    approach: [
      {
        title: "AI Extraction Pipeline",
        description:
          "Users scan or upload documents, OCR extracts text, and an LLM returns candidate people, dates, places, and relationships for review before anything is written to the tree.",
      },
      {
        title: "Voice-First Story Capture",
        description:
          "The app includes voice recording and transcription so spoken stories can sit alongside documents and photos.",
      },
      {
        title: "Living Tree, Not Dead Database",
        description:
          "React Flow and dagre power the tree view, but the product is broader than a chart. Stories, documents, and media stay attached to the people they relate to.",
      },
      {
        title: "Open & Respectful",
        description:
          "The project is open source, self-hostable, and built with Supabase row-level security for private family data.",
      },
    ],
    outcome:
      "A working genealogy product with document ingestion, review flows, voice capture, and a collaborative tree view.",
    metrics: [
      { label: "Open Source", value: "MIT" },
      { label: "AI Pipeline", value: "Doc → OCR → Claude → Tree" },
      { label: "Cost vs Ancestry", value: "$0 vs $240/yr" },
    ],
    avoidedPatterns: [
      "Auto-trusting AI inserts directly into canonical records.",
      "Forcing users into rigid, spreadsheet-like genealogy workflows.",
      "Locking export/import behind paid plans.",
    ],
    nextIterations: [
      "Confidence scoring and source-level reliability badges per extracted entity.",
      "Guided interview flows optimized for elder story capture sessions.",
    ],
    learnings: [
      "AI extraction needs a human review layer to be usable for family records.",
      "Voice capture changes the value of the product because it preserves more than text alone.",
      "Source material and context matter as much as entity extraction.",
      "Supabase and Next.js made the solo build manageable without a separate backend service.",
    ],
    nextProject: { slug: "vape-quit-coach", title: "Vape Quit Coach" },
  },
  liner: {
    slug: "liner",
    title: "Liner",
    subtitle: "A canvas-based workspace for music",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["Next.js", "tldraw", "Convex", "Clerk", "Zustand", "Tailwind CSS"],
    liveUrl: "https://liner.ninetynine.digital",
    overview:
      "Liner is a spatial workspace for arranging songs, notes, and album structures on an infinite canvas.",
    challenge:
      "Playlists and folders are useful for storage, but they are poor tools for sequencing and comparing songs in a broader structure. The goal was to make music organization more visual and direct.",
    constraints: [
      "Audio playback had to stay responsive while the canvas handled selection, pan, zoom, and editing state.",
      "The same product model needed to support web and iOS work without splitting the concept into two unrelated apps.",
      "The interface had to remain useful before every possible cloud-sync and collaboration feature existed.",
    ],
    decisionLog: [
      {
        problem: "A standard list UI made music sequencing feel like storage rather than arrangement.",
        decision: "Built the core workflow around an infinite canvas with custom music objects.",
        tradeoff: "More interaction edge cases than a conventional playlist builder.",
        impact: "Tracks, notes, and album structures can be compared spatially instead of only sequentially.",
      },
      {
        problem: "Audio state can easily fight canvas editing state.",
        decision: "Treated playback as part of the object model instead of a detached global player.",
        tradeoff: "More coordination between keyboard shortcuts, selected shapes, and playback controls.",
        impact: "Music objects behave like working material rather than static attachments.",
      },
    ],
    approach: [
      {
        title: "Spatial Over Sequential",
        description:
          "tldraw provides the canvas model. I added custom shapes for songs, album frames, and notes so tracks can be arranged and grouped visually.",
      },
      {
        title: "Audio as First-Class Object",
        description:
          "Audio files are treated as interactive objects with waveform extraction, queue support, and keyboard playback controls.",
      },
      {
        title: "Local-First, Cloud-Synced",
        description:
          "Convex handles sync and persistence, Clerk handles auth, and the client state model is built to keep the canvas usable even when connectivity is unreliable.",
      },
    ],
    outcome:
      "A working canvas tool for sequencing, note-taking, and audio playback in one interface.",
    metrics: [
      { label: "Custom tldraw Shapes", value: "3+" },
      { label: "Architecture", value: "Local-first" },
      { label: "Real-time Sync", value: "Convex" },
    ],
    avoidedPatterns: [
      "Treating tracks as files in a folder rather than objects in a composition workspace.",
      "Global playback controls detached from the selected canvas material.",
      "Cloud-first assumptions that make the product feel broken offline or during rough sync states.",
    ],
    nextIterations: [
      "Deeper arrangement tools for comparing alternate sequences and album structures.",
      "More explicit collaboration states for shared music workspaces.",
    ],
    learnings: [
      "tldraw is flexible, but custom shapes require careful work around rendering and state.",
      "Audio playback introduces edge cases that affect the whole editing model.",
      "Users often want to organize music spatially once the interface makes it possible.",
    ],
    nextProject: { slug: "whakapapa", title: "Whakapapa" },
  },
  spark: {
    slug: "spark",
    title: "Spark Dashboard",
    subtitle: "Consolidating four BI tools into one app",
    timeline: "Nov 2022 - Apr 2023",
    role: "UI Developer",
    team: "Data Intelligence Team",
    tools: ["React", "Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    overview:
      "Internal analytics dashboard for a specialist analyst team at Spark New Zealand, replacing a fragmented reporting workflow.",
    challenge:
      "Analysts were working across multiple tools with inconsistent models, slow performance, and a high dependency on IT support for report changes.",
    constraints: [
      "Migration had to happen without breaking existing analyst workflows.",
      "Database safety mattered as much as UI flexibility.",
      "Legacy report logic had undocumented business assumptions.",
    ],
    decisionLog: [
      {
        problem: "Query state sharing broke with high filter counts.",
        decision: "Used URL params for critical state plus localStorage hash references for full state.",
        tradeoff: "More implementation complexity and some cache edge cases.",
        impact: "Shareable links for complex views without URL explosion.",
      },
      {
        problem: "Client-side rendering collapsed under large datasets.",
        decision: "Moved heavy aggregation to backend and shipped rollups.",
        tradeoff: "Reduced ad hoc pivot flexibility.",
        impact: "Interactive chart latency dropped to usable levels.",
      },
    ],
    approach: [
      {
        title: "The State Problem",
        description:
          "Complex query state needed to be shareable without overloading the URL. The solution combined URL parameters for critical filters with local persisted state for larger configurations.",
      },
      {
        title: "The Performance Cliff",
        description:
          "Client-side rendering broke down on larger datasets, so aggregation moved to the backend and the client received smaller rollups instead of raw data.",
      },
      {
        title: "The Migration",
        description:
          "Migration had to preserve existing analyst work. An import tool handled part of the old Power BI configuration, with the rest recreated manually where necessary.",
      },
    ],
    outcome:
      "The dashboard shipped to 50+ users, reduced load times, and cut down the dependency on IT for routine reporting changes.",
    metrics: [
      { label: "Load Time", value: "8s -> 2s" },
      { label: "Users", value: "50+" },
      { label: "Tools Replaced", value: "4" },
    ],
    avoidedPatterns: [
      "Unlimited free-form query execution against production tables.",
      "Big-bang migration without compatibility bridges.",
      "Treating analyst pain as a training problem instead of product debt.",
    ],
    nextIterations: [
      "Query cost previews before run to prevent accidental heavy joins.",
      "Saved-view governance with team-level ownership and audit trails.",
    ],
    learnings: [
      "A lot of performance work is about moving computation to the right place.",
      "Migration work often takes longer than replacement UI work.",
      "Flexible query tools need guardrails to protect shared infrastructure.",
      "Legacy behavior often encodes business rules, even when it looks accidental.",
    ],
    nextProject: { slug: "afterlight", title: "Afterlight" },
  },
  "vape-quit-coach": {
    slug: "vape-quit-coach",
    title: "Vape Quit Coach",
    subtitle: "An iOS app for quitting vaping",
    heroImage: "/projectImages/vqc-1.webp",
    timeline: "2024 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript"],
    liveUrl: "https://vapequitcoach.com",
    overview:
      "An iOS app for smoking cessation built around tracking, coaching, and support during cravings and setbacks.",
    challenge:
      "Many quitting apps rely on brittle streak systems and punitive framing. The goal here was to build something calmer and more usable during difficult moments.",
    constraints: [
      "Behavior change support had to avoid shame mechanics and relapse punishment loops.",
      "The app needed to be effective in high-stress, low-attention moments.",
      "Solo development required disciplined scope and clear UX priorities.",
    ],
    decisionLog: [
      {
        problem: "Streak systems create brittle motivation and anxiety.",
        decision: "Shifted progress framing from perfect streaks to identity and trend signals.",
        tradeoff: "Less instantly gamified feedback.",
        impact: "More resilient long-term engagement after setbacks.",
      },
      {
        problem: "Craving moments are noisy and emotionally charged.",
        decision: "Used calm, low-stimulus intervention screens with short actions.",
        tradeoff: "Less visual spectacle during key moments.",
        impact: "Lower cognitive load when users need support most.",
      },
    ],
    approach: [
      {
        title: "Behavioral Architecture",
        description:
          "The product focuses on triggers, replacement habits, and support patterns rather than only on streak counting.",
      },
      {
        title: "Progress as Identity",
        description:
          "Progress is tracked in a way that still reflects forward movement after setbacks instead of resetting everything to zero.",
      },
      {
        title: "Liminal Design",
        description:
          "Intervention screens are intentionally low-stimulus so they stay usable during cravings and stress.",
      },
    ],
    outcome:
      "The app shipped on iOS and has held a 4.8-star App Store rating.",
    metrics: [
      { label: "App Store Rating", value: "4.8★" },
      { label: "Solo Built", value: "100%" },
    ],
    avoidedPatterns: [
      "Punitive streak resets and public shame nudges.",
      "Engagement loops optimized for app opens rather than quit outcomes.",
      "Clinical fear-based copy during relapse-adjacent moments.",
    ],
    nextIterations: [
      "Adaptive intervention timing based on user-identified trigger windows.",
      "Deeper longitudinal insights that preserve privacy and dignity.",
    ],
    learnings: [
      "Health products need a different interaction model than productivity tools.",
      "Low-stimulus support flows matter more than high-energy motivation during cravings.",
      "Solo work makes the product tradeoffs easier to see because no one else is making them for you.",
    ],
    nextProject: { slug: "dayle", title: "Dayle Palfreyman" },
  },
  chlita: {
    slug: "chlita",
    title: "Ch'lita",
    subtitle: "A portfolio built around the work",
    heroImage: "/projectImages/chlita-1.webp",
    timeline: "2024",
    role: "Designer & Developer",
    tools: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://chlita.com",
    // githubUrl intentionally omitted
    overview:
      "Portfolio website for stylist Ch'lita built around editorial image presentation and simple CMS updates.",
    challenge:
      "The site needed to support strong image presentation without adding visual clutter or creating layout instability.",
    constraints: [
      "The styling work needed to lead; the interface could not compete with image rhythm or art direction.",
      "The client needed a CMS workflow that did not require developer support for routine updates.",
      "Image-heavy pages had to stay fast enough that the portfolio still felt editorial, not sluggish.",
    ],
    decisionLog: [
      {
        problem: "Portfolio sites often over-design the frame around the work.",
        decision: "Kept the interface sparse and made image sequencing the primary design material.",
        tradeoff: "Fewer decorative brand moments in the surrounding UI.",
        impact: "The styling work remains the first thing visitors notice.",
      },
      {
        problem: "Manual portfolio updates create a maintenance bottleneck.",
        decision: "Modeled the work in Sanity so image sets and project details can be managed independently.",
        tradeoff: "More setup work up front than hardcoded pages.",
        impact: "The site can evolve with new work without recurring developer involvement.",
      },
    ],
    approach: [
      {
        title: "Subtractive Design",
        description:
          "The interface was kept deliberately spare so the styling work remained the focus.",
      },
      {
        title: "Image-First Architecture",
        description:
          "The image system was tuned for stable layout, responsive cropping, and good performance.",
      },
      {
        title: "CMS for Independence",
        description:
          "Sanity was set up so the client could manage portfolio content without developer involvement.",
      },
    ],
    outcome:
      "A stable, image-led portfolio that the client can update independently.",
    metrics: [
      { label: "Performance", value: "98+" },
      { label: "Client Independence", value: "100%" },
    ],
    avoidedPatterns: [
      "Decorative transitions that make the portfolio feel slower than the work deserves.",
      "Hardcoded project pages that make every update a developer task.",
      "Over-cropped responsive images that undermine the styling context.",
    ],
    nextIterations: [
      "Richer editorial grouping for campaigns and press features.",
      "A lighter upload review flow for checking crops before publishing.",
    ],
    learnings: [
      "Restraint is harder than addition. Every feature you don't add is a decision.",
      "The best client work happens when you understand their craft, not just their requirements.",
      "Performance is a design choice. A slow portfolio undermines the work it's showing.",
    ],
    nextProject: { slug: "liner", title: "Liner" },
  },
  dayle: {
    slug: "dayle",
    title: "Dayle Palfreyman",
    subtitle: "An artist portfolio with a full-screen gallery",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: [
      "Next.js 15",
      "Sanity CMS",
      "Framer Motion",
      "Tailwind CSS",
      "TypeScript",
    ],
    liveUrl: "https://dayle.vercel.app",
    // githubUrl intentionally omitted
    overview:
      "A portfolio for installation artist Dayle Palfreyman with a full-screen gallery, simple navigation, and Sanity CMS.",
    challenge:
      "The site needed to present artwork clearly without introducing too much interface noise, while still being manageable by the client.",
    constraints: [
      "Visual restraint was non-negotiable: the site could not compete with artworks.",
      "Client autonomy required robust CMS patterns over one-off hardcoded pages.",
      "Accessibility and performance had to hold on media-heavy routes.",
    ],
    decisionLog: [
      {
        problem: "Portfolio templates encourage UI chrome over artwork presence.",
        decision: "Adopted full-screen, vertically snapping gallery with minimal persistent chrome.",
        tradeoff: "Less conventional page structure for some users.",
        impact: "Stronger immersion and clearer artwork-first hierarchy.",
      },
      {
        problem: "Rich motion can quickly become distracting in art contexts.",
        decision: "Constrained motion vocabulary to subtle spring-driven transitions.",
        tradeoff: "Lower novelty and fewer visual flourishes.",
        impact: "Consistent tone with reduced cognitive interference.",
      },
    ],
    approach: [
      {
        title: "Full-Screen Immersive Gallery",
        description:
          "The homepage uses a vertically snapping gallery where each artwork fills the viewport and opens into a detail view with supporting media and metadata.",
      },
      {
        title: "Motion with Restraint",
        description:
          "Motion is limited to a small set of transitions between gallery and detail views, with reduced-motion support included from the start.",
      },
      {
        title: "Accessibility as Foundation",
        description:
          "The site includes keyboard navigation, focus management, accessible artwork metadata, and screen-reader support across the gallery flow.",
      },
      {
        title: "CMS-Driven Independence",
        description:
          "Sanity handles artworks, exhibitions, writing, and site settings so the client can manage the site without code changes.",
      },
    ],
    outcome:
      "A media-heavy portfolio that performs well, stays usable, and is fully managed by the client through Sanity.",
    metrics: [
      { label: "Lighthouse", value: "95+" },
      { label: "Client Independence", value: "100%" },
      { label: "Accessibility", value: "WCAG 2.1 AA" },
      { label: "SEO", value: "Auto-generated sitemaps + JSON-LD" },
    ],
    avoidedPatterns: [
      "Autoplay-heavy transitions that distract from images.",
      "CMS models that require developer intervention for routine updates.",
      "Accessibility retrofits after visual design lock-in.",
    ],
    nextIterations: [
      "Collection-level storytelling templates for exhibition narratives.",
      "Media compression pipeline tuning for even faster cold loads.",
    ],
    learnings: [
      "Art portfolios are mostly an exercise in restraint.",
      "Motion needs to support navigation, not compete with the work on screen.",
      "Accessibility decisions shape the structure of the product early, not late.",
      "Automated SEO and CMS setup reduce long-term maintenance for the client.",
    ],
    nextProject: { slug: "spark", title: "Spark Dashboard" },
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
