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

// Note: Silk case study disabled until app launch
// To re-enable: uncomment silk entry below and in projects.ts

export const caseStudies: Record<string, CaseStudy> = {
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
    nextProject: { slug: "liner", title: "Liner" },
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
      "Internal analytics dashboard for 50+ data analysts at Spark New Zealand, replacing a mix of Power BI reports, Excel exports, and direct SQL workflows.",
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
    nextProject: { slug: "vape-quit-coach", title: "Vape Quit Coach" },
  },
  // silk: { ... } // Disabled until app launch
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
    nextProject: { slug: "chlita", title: "Ch'lita" },
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
    // githubUrl omitted — repo is private
    overview:
      "Portfolio website for stylist Ch'lita built around editorial image presentation and simple CMS updates.",
    challenge:
      "The site needed to support strong image presentation without adding visual clutter or creating layout instability.",
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
    learnings: [
      "Restraint is harder than addition. Every feature you don't add is a decision.",
      "The best client work happens when you understand their craft, not just their requirements.",
      "Performance is a design choice. A slow portfolio undermines the work it's showing.",
    ],
    nextProject: { slug: "dayle", title: "Dayle Palfreyman" },
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
    // githubUrl omitted — repo is private
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
