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
  approach: {
    title: string;
    description: string;
    image?: string;
  }[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  learnings: string[];
  nextProject?: { slug: string; title: string };
}

// Note: Silk case study disabled until app launch
// To re-enable: uncomment silk entry below and in projects.ts

export const caseStudies: Record<string, CaseStudy> = {
  whakapapa: {
    slug: "whakapapa",
    title: "Whakapapa",
    subtitle: "Preserving family stories with AI before they're lost",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["Next.js 16", "Supabase", "Claude API", "Tesseract.js", "React Flow", "dagre", "Framer Motion"],
    liveUrl: "https://whakapapa.vercel.app",
    githubUrl: "https://github.com/maxwellyoung/whakapapa",
    overview:
      "An AI-powered family knowledge base that turns old documents, photos, and spoken stories into a living, navigable family tree. Named after the Māori word for genealogy — because ancestry isn't just names and dates, it's the web of stories that connect us.",
    challenge:
      "Every family has stories slipping away. Letters in boxes, photos without names on the back, grandparents whose memories are fading. Existing genealogy tools (Ancestry.com, MyHeritage) are expensive, clunky, and treat family history as data entry. The challenge: build something that makes preservation effortless — AI does the heavy lifting, you just feed it documents and tell it stories.",
    approach: [
      {
        title: "AI Extraction Pipeline",
        description:
          "The core innovation: scan a document with your phone camera → Tesseract.js OCR extracts text client-side → Claude AI analyzes the text and returns structured genealogical data (people, dates, relationships, places) → suggestions queue for human review → approved data populates the tree. No manual data entry. The AI handles birth certificates, old letters, newspaper clippings, and handwritten notes.",
      },
      {
        title: "Voice-First Story Capture",
        description:
          "Not everything is written down. The app includes voice recording with transcription — sit with a grandparent, hit record, and their story is captured in their own voice. Attached to the people it's about. Interview prompts help guide the conversation when you're not sure what to ask.",
      },
      {
        title: "Living Tree, Not Dead Database",
        description:
          "The family tree uses dagre for hierarchical layout and React Flow for interactive visualization. Color-coded relationships (parent-child, partners, siblings), zoom, search, keyboard navigation. But the tree is just one view — memories, stories, photos, and documents are all connected to the people they belong to. It's a knowledge base, not a chart.",
      },
      {
        title: "Open & Respectful",
        description:
          "Open source (MIT) and free. Self-hostable. Privacy-first with Supabase Row Level Security. The name honors te ao Māori — whakapapa is a concept where ancestry is a living story, not a static record. That philosophy shaped every design decision.",
      },
    ],
    outcome:
      "A fully functional genealogy platform that replaces manual data entry with AI extraction. Open source with a growing community. Features that commercial tools charge $20-50/month for — available free.",
    metrics: [
      { label: "Open Source", value: "MIT" },
      { label: "AI Pipeline", value: "Doc → OCR → Claude → Tree" },
      { label: "Cost vs Ancestry", value: "$0 vs $240/yr" },
    ],
    learnings: [
      "AI extraction isn't magic — it needs a human review step. The suggestion queue is the trust mechanism that makes AI-generated data feel safe to accept.",
      "Voice recording changes the emotional register of a genealogy app. Reading a transcription is information; hearing grandma's voice is preservation.",
      "Naming matters. 'Whakapapa' immediately communicates that this isn't another Silicon Valley genealogy SaaS — it's built with cultural awareness and respect.",
      "Supabase + Next.js is an incredibly productive stack for solo builders. RLS policies handle multi-tenancy without a dedicated backend.",
    ],
    nextProject: { slug: "liner", title: "Liner" },
  },
  liner: {
    slug: "liner",
    title: "Liner",
    subtitle: "A spatial canvas for organizing music",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["Next.js", "tldraw", "Convex", "Clerk", "Zustand", "Tailwind CSS"],
    liveUrl: "https://liner.ninetynine.digital",
    overview:
      "Liner is Figma for musicians. An infinite spatial canvas where you drag songs, build albums, and capture ideas visually. Built on tldraw with custom shapes for audio, real-time cloud sync via Convex, and a local-first architecture.",
    challenge:
      "Musicians organize music in playlists — linear, one-dimensional lists. But album sequencing is spatial: you're thinking about flow, energy, transitions, thematic arcs. Spreadsheets and playlists can't capture that. The challenge: make music organization feel like arranging photos on a table, not filing documents in a cabinet.",
    approach: [
      {
        title: "Spatial Over Sequential",
        description:
          "tldraw provides an infinite canvas with pan, zoom, and selection. I built custom shapes for songs (with waveform visualization), album frames, and sticky notes. Drag a song onto a frame and it belongs to that album. The spatial metaphor makes relationships between songs visible — proximity implies connection, distance implies contrast.",
      },
      {
        title: "Audio as First-Class Object",
        description:
          "Songs aren't just cards with metadata. Drop an audio file and Liner extracts the waveform, creates a playable shape, and adds it to the queue. Keyboard controls (space, arrows) for playback. The canvas becomes a playable instrument, not just an organizational tool.",
      },
      {
        title: "Local-First, Cloud-Synced",
        description:
          "Convex handles real-time sync and persistence. Clerk for authentication. But the architecture is local-first — your canvas works offline and syncs when connected. Zustand manages client-side state. The data model is yours, not locked into a service.",
      },
    ],
    outcome:
      "A working spatial canvas that musicians can use to sequence albums, organize ideas, and play audio — all in one interface. The spatial metaphor makes album sequencing feel intuitive in a way playlists never could.",
    metrics: [
      { label: "Custom tldraw Shapes", value: "3+" },
      { label: "Architecture", value: "Local-first" },
      { label: "Real-time Sync", value: "Convex" },
    ],
    learnings: [
      "tldraw is an incredible foundation but custom shapes require deep understanding of the rendering pipeline. Worth it for the UX payoff.",
      "Audio playback in a canvas context creates interesting UX challenges — what happens when you delete a playing song? When you undo? These edge cases define the experience.",
      "Musicians think spatially about music more than they realize. The 'aha moment' is when someone drags two songs next to each other and immediately sees the album taking shape.",
    ],
    nextProject: { slug: "whakapapa", title: "Whakapapa" },
  },
  spark: {
    slug: "spark",
    title: "Spark Dashboard",
    subtitle: "Consolidating 4 BI tools into one React app",
    timeline: "Nov 2022 - Apr 2023",
    role: "UI Developer",
    team: "Data Intelligence Team",
    tools: ["React", "Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    overview:
      "Internal analytics dashboard serving 50+ data analysts at Spark New Zealand. The brief: replace a patchwork of Power BI reports, Excel exports, and custom SQL queries with a single unified interface.",
    challenge:
      "Four different tools meant four different data models, four authentication flows, and four sets of muscle memory. Analysts were spending more time switching contexts than analyzing data. The existing Power BI dashboards were slow (8-12 second loads), couldn't handle the query complexity analysts needed, and required IT tickets for any schema changes.",
    approach: [
      {
        title: "The State Problem",
        description:
          "Analysts needed to build complex queries with multiple filters, date ranges, and aggregations - then share those exact views with colleagues. The naive approach (URL params) broke at ~15 filters. I ended up with a hybrid: critical filters in URL for shareability, full state persisted to localStorage with a hash reference. When you share a link, it includes a state hash. If the recipient has that state cached, instant load. If not, it rebuilds from URL params with sensible defaults. Not elegant, but it worked for queries with 40+ filter combinations.",
      },
      {
        title: "The Performance Cliff",
        description:
          "First version rendered all chart data client-side. Fine for 1,000 rows. Unusable at 50,000. Tried virtualization - helped with DOM, didn't help with the 3 seconds of JavaScript parsing. Solution: moved aggregation to the backend, only shipped pre-computed rollups to the client. Charts went from 3s to 200ms. Tradeoff: lost some query flexibility. Analysts could no longer do arbitrary client-side pivots. We added the 10 most common pivot patterns as backend options and accepted the limitation.",
      },
      {
        title: "The Migration",
        description:
          "Couldn't do a clean cutover - analysts had years of saved Power BI reports. Built an import tool that parsed .pbix files and extracted filter configurations, then mapped them to the new schema. Got about 70% accuracy. The remaining 30% required manual recreation, which surfaced edge cases in the old system that nobody remembered building. Documented everything. Some of those 'bugs' turned out to be intentional workarounds for data quality issues upstream.",
      },
    ],
    outcome:
      "Dashboard shipped to 50+ users. Load times dropped from 8-12 seconds to under 2 seconds for most queries. Eliminated the IT ticket bottleneck for report changes - analysts could now modify views directly. Not everything worked. The query builder was too flexible initially; we had to add guardrails after analysts crashed the database with unindexed joins. Added query cost estimation and soft limits.",
    metrics: [
      { label: "Load Time", value: "8s -> 2s" },
      { label: "Users", value: "50+" },
      { label: "Tools Replaced", value: "4" },
    ],
    learnings: [
      "Performance optimization is often about moving work, not eliminating it. We didn't make the queries faster - we moved the heavy lifting to where it belonged (backend aggregation).",
      "Migration is harder than building. Parsing legacy formats and mapping to new schemas took more time than the new UI.",
      "Flexibility has costs. The 'let analysts do anything' approach almost killed the database. Constraints aren't just UX decisions - they're infrastructure protection.",
      "Some bugs are features. Those weird Power BI workarounds existed for reasons. Document before you 'fix' them.",
    ],
    nextProject: { slug: "vape-quit-coach", title: "Vape Quit Coach" },
  },
  // silk: { ... } // Disabled until app launch
  "vape-quit-coach": {
    slug: "vape-quit-coach",
    title: "Vape Quit Coach",
    subtitle: "Behavior change through architecture, not willpower",
    heroImage: "/projectImages/vqc-1.webp",
    timeline: "2024 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript"],
    liveUrl: "https://vapequitcoach.com",
    overview:
      "An iOS app for quitting vaping that treats addiction as a design problem rather than a moral failure. Most health apps use motivation and guilt—I built the opposite.",
    challenge:
      "Quitting apps typically rely on shame, streaks, and willpower. But willpower is a finite resource, and shame drives people away from the tools meant to help them. The challenge: design an experience that makes not vaping feel easier than vaping, without moralizing.",
    approach: [
      {
        title: "Behavioral Architecture",
        description:
          "Instead of counting days sober (which creates anxiety), the app focuses on understanding triggers and building replacement habits. The interface makes logging feel like self-discovery, not confession.",
      },
      {
        title: "Progress as Identity",
        description:
          "Traditional apps celebrate streaks—but one slip resets everything, creating shame spirals. I designed a system where progress accumulates even through setbacks. You're building a new identity, not maintaining a perfect record.",
      },
      {
        title: "Liminal Design",
        description:
          "The moments when cravings hit are liminal—between states. The UI for these moments is deliberately calm, almost meditative. No bright colors, no urgency. Just presence.",
      },
    ],
    outcome:
      "4.8 star rating on the App Store. Users consistently mention that it 'feels different' from other quit apps—less judgmental, more like a tool than a taskmaster.",
    metrics: [
      { label: "App Store Rating", value: "4.8★" },
      { label: "Solo Built", value: "100%" },
    ],
    learnings: [
      "Shame-based design is lazy design. The interface should make the right choice feel obvious, not heroic.",
      "Health apps need a different vocabulary than productivity software. You can't 'optimize' addiction recovery.",
      "Every pixel was a decision I owned. Solo projects teach you what you actually believe.",
    ],
    nextProject: { slug: "chlita", title: "Ch'lita" },
  },
  chlita: {
    slug: "chlita",
    title: "Ch'lita",
    subtitle: "A portfolio that gets out of the way",
    heroImage: "/projectImages/chlita-1.webp",
    timeline: "2024",
    role: "Designer & Developer",
    tools: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://chlita.com",
    // githubUrl omitted — repo is private
    overview:
      "Portfolio website for Ch'lita, a fashion stylist whose clients include Rosalía and The Dare. The brief was simple: let the work speak. My job was to build something that disappeared behind the imagery.",
    challenge:
      "Fashion portfolios often compete with the work they're showcasing—heavy navigation, aggressive branding, slow loads. The challenge was building something technically sophisticated (responsive image handling, CMS integration, smooth transitions) that felt like nothing at all.",
    approach: [
      {
        title: "Subtractive Design",
        description:
          "I killed every feature I wanted to add. Fancy transitions? Cut. Scroll effects? Cut. Hover animations? Minimal. The client's work is better than any animation I could write. The site's job is to disappear.",
      },
      {
        title: "Image-First Architecture",
        description:
          "Zero layout shift. Responsive art direction that doesn't butcher crops. Lazy loading that feels instant. The technical work is invisible, which is the point.",
      },
      {
        title: "CMS for Independence",
        description:
          "Sanity CMS configured so the client can update their portfolio without touching code or calling me. Content modeling that matches how stylists actually think about their work.",
      },
    ],
    outcome:
      "A site that loads fast, looks sharp on any device, and stays out of the way. The client updates it regularly without developer help. The best portfolio sites don't have 'features'—they have work.",
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
    subtitle: "An artist portfolio that disappears behind the art",
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
      "A portfolio for installation and object-based artist Dayle Palfreyman. The brief: make the art the only thing people see. No navigation clutter, no design ego, no templates. A full-screen immersive gallery with Sanity CMS for complete client independence.",
    challenge:
      "Artist portfolios have a unique tension: the site needs to feel considered and intentional, but it can't compete with the work. Most portfolio templates either look generic or add so much design language that they overshadow what they're showing. Dayle needed a site that felt like walking into a gallery, where the work fills the room and the architecture stays invisible.",
    approach: [
      {
        title: "Full-Screen Immersive Gallery",
        description:
          "The homepage is a vertically-snapping gallery. Each artwork fills the entire viewport. No thumbnails, no grids, no sidebars. Scroll or use arrow keys to move between pieces. Click to enter the detail view with multiple images, video embeds, and artwork metadata. The interaction model borrows from museum kiosks, not web templates.",
      },
      {
        title: "Motion with Restraint",
        description:
          "Every animation uses spring physics (not tween curves) for organic feel. Shared layout animations create seamless transitions between gallery and detail views. But the motion vocabulary is deliberately minimal: fade, slide, scale. Nothing calls attention to itself. The header auto-hides after 3 seconds on desktop. Chrome disappears on artwork detail pages. Reduced motion preferences are fully respected.",
      },
      {
        title: "Accessibility as Foundation",
        description:
          "Skip navigation links, ARIA live regions that announce the current artwork to screen readers, proper focus indicators using the accent color, keyboard navigation throughout. Loading skeletons for every route. Alt text includes medium and year, not just title. The gallery has a visible slide counter. These aren't afterthoughts; accessibility was architected from the start.",
      },
      {
        title: "CMS-Driven Independence",
        description:
          "Sanity Studio is configured so Dayle can manage artworks, exhibitions, writing, interviews, and site settings without touching code. Dynamic sitemap generation, JSON-LD structured data for artwork and exhibition pages, and canonical URLs are all automated. The site SEO improves every time Dayle adds content.",
      },
    ],
    outcome:
      "A site that loads fast, ranks well, and puts the art first. Full Lighthouse scores above 95. Dynamic SEO infrastructure means every new artwork is automatically optimized for Google. The client manages everything independently through Sanity.",
    metrics: [
      { label: "Lighthouse", value: "95+" },
      { label: "Client Independence", value: "100%" },
      { label: "Accessibility", value: "WCAG 2.1 AA" },
      { label: "SEO", value: "Auto-generated sitemaps + JSON-LD" },
    ],
    learnings: [
      "Artist portfolios are the ultimate test of design restraint. Every pixel you add competes with the work you're trying to showcase.",
      "Spring-based animations feel more natural than tween curves for gallery interactions. The physics of deceleration matches how people expect physical objects to move.",
      "Accessibility and good design are the same thing. Skip links, focus indicators, and screen reader support aren't compliance checkboxes. They're design decisions that make the site better for everyone.",
      "Automating SEO infrastructure (sitemaps, structured data, canonical URLs) means the site gets better every time the client adds content, without any developer involvement.",
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
