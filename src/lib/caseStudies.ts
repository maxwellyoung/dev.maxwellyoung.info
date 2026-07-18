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
  proofPoints?: { label: string; value: string }[];
  avoidedPatterns?: string[];
  nextIterations?: string[];
  learnings: string[];
  nextProject?: { slug: string; title: string };
}

// Employer work stays at project-summary level unless publication is explicitly
// approved. Case studies below cover independent and already-public client work.
export const caseStudies: Record<string, CaseStudy> = {
  afterlight: {
    slug: "afterlight",
    title: "Afterlight",
    subtitle: "Recover a concert history without surrendering it",
    heroImage: "/projectImages/afterlight-1.webp",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    liveUrl: "https://afterlight.ninetynine.digital",
    overview:
      "Afterlight is a local-first concert diary with a Recovery Desk for the history people already have. It turns ticket files, incoming shares, calendars, photos, Gmail receipts, Setlist.fm attendance, and listening history into reviewable clues on-device. A clue never becomes a claimed night until the person confirms it.",
    challenge:
      "Concert memories are distributed across camera rolls, ticket receipts, calendar events, Wallet passes, files, setlists, and half-remembered nights. Those sources have very different confidence: a Spotify play is a hint, while a ticket and dated venue photo together are stronger evidence. The product problem was not merely importing data; it was reconciling ambiguous evidence without letting software invent attendance.",
    constraints: [
      "The canonical diary and recovery queue must work on-device; optional connected services cannot become the source of truth.",
      "Low-confidence evidence can suggest a night but can never auto-confirm attendance.",
      "Calendar, photo, and email access must be permission-gated, purpose-limited, and reduced to concert fields rather than retained source content.",
      "Solo build — every feature competes with finishing.",
    ],
    decisionLog: [
      {
        problem: "Each import source originally behaved like its own workflow, and some hints could move too close to diary creation.",
        decision: "Put every source behind one versioned candidate model with provenance, confidence, deduplication, dismissal, editing, and explicit confirmation.",
        tradeoff: "Every integration has to translate into the shared evidence vocabulary instead of taking a shortcut to the diary.",
        impact: "The app can add new recovery sources without weakening the trust boundary: evidence proposes, the person decides.",
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
        title: "One desk for scattered evidence",
        description:
          "Shares, uploads, calendar scans, photo clusters, Gmail receipts, Setlist.fm attendance, and Spotify hints all land in the same Recovery Desk. Provenance survives merging, so a candidate can explain why it exists.",
      },
      {
        title: "Confirmation is the write boundary",
        description:
          "Recovery candidates remain separate from confirmed concerts. People can review, correct, dismiss, or complete them; only completion calls the existing local concert-creation path.",
      },
      {
        title: "Native reach, local core",
        description:
          "iOS and Android share targets, calendar and photo access, and native Gmail OAuth reach evidence where it already lives. The canonical diary and candidate queue stay on-device, while optional network lookups enrich rather than own the record.",
      },
      {
        title: "Gig poster modernism",
        description:
          "The interface borrows from the printed history of live music — FAC blue, true black, grain textures, and Swiss type discipline — with a restrained motion grammar used to clarify state.",
      },
    ],
    outcome:
      "A shared recovery system now spans web and native entry points, with a signed iOS share extension, Android share configuration, explicit privacy disclosures, and regression coverage around evidence parsing and confirmation. The web Recovery Desk is deployed while the next native release remains in development.",
    proofPoints: [
      { label: "Recovery sources", value: "6+" },
      { label: "Auto-confirmed nights", value: "0" },
      { label: "Native share targets", value: "iOS + Android" },
    ],
    avoidedPatterns: [
      "Treating listening history, a photo cluster, or a ticket receipt as proof of attendance.",
      "Retaining Gmail message bodies or calendar content after extracting candidate fields.",
      "Making a hosted database the canonical source for a private concert diary.",
    ],
    nextIterations: [
      "Complete Google restricted-scope verification before broad Gmail recovery access.",
      "Ship the updated native targets after same-build physical-device verification.",
      "Expand the versioned archive into a plain, durable export and restore workflow.",
    ],
    learnings: [
      "Import is a trust problem before it is a parsing problem; provenance and confirmation belong in the data model.",
      "Local-first does not mean banning the network. It means connected services can enrich the product without owning its canonical record.",
      "Native extensions fail in platform-specific ways, so simulator compilation is not enough; the share handoff itself needs end-to-end exercise.",
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
        title: "Private by Default",
        description:
          "Family records are protected with Supabase row-level security, and AI suggestions require explicit review before they can change the tree.",
      },
    ],
    outcome:
      "A working genealogy product with document ingestion, review flows, voice capture, and a collaborative tree view.",
    proofPoints: [
      { label: "Review gate", value: "Human approval" },
      { label: "Source capture", value: "Documents + voice" },
      { label: "Data model", value: "Private family records" },
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
    proofPoints: [
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
      "The app shipped on iOS with a complete tracking, coaching, and relapse-support loop.",
    proofPoints: [
      { label: "Availability", value: "Live on iOS" },
      { label: "Product scope", value: "Solo shipped" },
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
    subtitle: "A portfolio for i-D's Fashion Editor-at-Large",
    heroImage: "/projectImages/chlita-1.webp",
    timeline: "2024",
    role: "Designer & Developer",
    tools: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://chlita.com",
    // githubUrl intentionally omitted
    overview:
      "Portfolio for Ch'lita Collins — Fashion Editor-at-Large at i-D, and stylist whose work spans Rosalía, The Dare, Tom Guinness and Oliver Hadlee Pearch. Built around editorial image presentation and simple CMS updates, so the work stays in front.",
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
    proofPoints: [
      { label: "Delivery", value: "Client shipped" },
      { label: "Content model", value: "CMS managed" },
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
    proofPoints: [
      { label: "Delivery", value: "Client shipped" },
      { label: "Content model", value: "Sanity CMS" },
      { label: "Access", value: "Keyboard + screen reader" },
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
    nextProject: { slug: "afterlight", title: "Afterlight" },
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
