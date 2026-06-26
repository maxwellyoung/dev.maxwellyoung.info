// lib/projects.ts

type Status = "Completed" | "WIP" | "Planned" | "Active";
type Role =
  | "Solo"
  | "Lead"
  | "Collaborator"
  | "Frontend"
  | "Studio Collaboration"
  | "Research Assistant";
type Category =
  | "Client"
  | "Personal"
  | "Studio"
  | "Experiment"
  | "Work"
  | "School"
  | "studio"
  | "personal"
  | "research";
type Visibility = "public" | "parked" | "private";
type Lifecycle = "current" | "completed" | "archived" | "sensitive";
type LaunchStage = "Live" | "In development" | "Case study" | "Client shipped" | "Production work";

interface BuildLogEntry {
  date: string;
  whatWorks: string[];
  nextMilestone?: string;
  openQuestion?: string;
}

interface Metrics {
  lighthouseMobile?: number;
  lcpMs?: number;
  cls?: number;
  bundleKB?: number;
  ocrAccuracyPct?: number;
  scraperRefreshMin?: number;
}

interface Links {
  live?: string;
  repo?: string;
  video?: string;
}

type ProjectCoverVariant = "image" | "device" | "brand" | "concept";
type ProjectCoverTone = "slate" | "teal" | "amber" | "forest" | "plum";

interface ProjectCover {
  variant?: ProjectCoverVariant;
  src?: string;
  alt?: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
  kicker?: string;
  summary?: string;
  tone?: ProjectCoverTone;
}

export interface Project {
  slug: string;
  name: string;
  status: Status;
  category: Category;
  role?: Role;
  description: string;
  longDescription?: string;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  visibility?: Visibility;
  lifecycle?: Lifecycle;
  launchStage?: LaunchStage;
  priority?: number;
  tags?: string[];
  stack?: string[];
  client?: string;
  redacted?: boolean;
  links?: Links;
  screenshots?: string[];
  thumb?: string;
  cover?: ProjectCover;
  impact?: string[];
  metrics?: Metrics;
  buildLog?: BuildLogEntry[];
  caseStudySlug?: string;
  link?: string;
  codeLink?: string;
}

const projects: Project[] = [
  {
    slug: "silk",
    name: "Silk",
    status: "Active",
    category: "Work",
    role: "Collaborator",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Production work",
    priority: 0,
    description:
      "Production React Native work across mobile publishing flows, media handling, gesture-heavy UI, and platform polish.",
    longDescription:
      "I contribute to Silk's React Native product inside a small shipping team. My work touches the surfaces that make the mobile product feel reliable in practice: publishing flows, editor behavior, media upload and playback, navigation, release hardening, and iOS / Android parity.",
    tags: ["React Native", "TypeScript", "Expo"],
    stack: ["React Native", "TypeScript", "Expo"],
    startDate: "2025-09-01",
    links: {
      live: "https://www.silk.cx",
    },
    link: "https://www.silk.cx",
    screenshots: ["/projectImages/silk-1.webp"],
    thumb: "/projectImages/silk-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/silk-1.webp",
      alt: "Silk landing page screenshot",
      objectPosition: "center",
    },
    impact: [
      "Production React Native work across iOS and Android",
      "Shipped mobile publishing flows, media handling, gesture-heavy UI, and release polish",
      "Contributions span navigation, editing, media handling, and platform parity",
    ],
  },
  {
    slug: "liner",
    name: "Liner",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "In development",
    priority: 3,
    description:
      "Spatial canvas for arranging music, notes, and references with playback-aware objects.",
    longDescription:
      "Liner is a music workspace for arranging songs, notes, and references on an infinite canvas. It uses tldraw with custom shapes for music objects, waveform extraction and playback, keyboard controls, and optional sync through Convex and Clerk. The same underlying model is used across the web app and the iOS app.",
    tags: ["Next.js", "tldraw", "Convex", "Audio", "Canvas", "iOS App"],
    stack: [
      "Next.js",
      "TypeScript",
      "tldraw",
      "Convex",
      "Clerk",
      "Zustand",
      "Tailwind CSS",
    ],
    startDate: "2025-01-01",
    caseStudySlug: "liner",
    links: {
      live: "https://liner.ninetynine.digital",
    },
    link: "https://liner.ninetynine.digital",
    screenshots: [
      "/projectImages/liner-1.webp",
      "/projectImages/liner-3.webp",
    ],
    thumb: "/projectImages/liner-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/liner-1.webp",
      alt: "Liner landing page — See the songs. Shape the release.",
      objectPosition: "center center",
    },
    impact: [
      "Local-first with optional cloud sync",
      "Custom tldraw shapes for music-specific UX",
      "Audio waveform extraction and playback",
      "iOS app built alongside the web app — same data layer via Convex",
    ],
  },
  {
    slug: "vape-quit-coach",
    name: "Vape Quit Coach",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 4,
    description:
      "React Native iOS app for quitting vaping with coaching, recovery milestones, and relapse support.",
    longDescription:
      "Vape Quit Coach is a solo-built iOS app for quitting vaping. It combines recovery timelines, coaching flows, Apple Watch heart-rate context, and support tools for relapse-prone moments. I designed, built, shipped, and monetized the product end-to-end in React Native and Expo.",
    tags: ["React Native", "Expo", "Behavior Design", "Mobile App"],
    stack: ["React Native", "Expo", "TypeScript"],
    startDate: "2024-01-01",
    caseStudySlug: "vape-quit-coach",
    screenshots: [
      "/projectImages/vqc-1.webp",
      "/projectImages/vqc-2.webp",
      "/projectImages/vqc-3.webp",
      "/projectImages/vqc-4.webp",
      "/projectImages/vqc-5.webp",
    ],
    thumb: "/projectImages/vqc-1.webp",
    cover: {
      variant: "device",
      src: "/projectImages/vqc-1.webp",
      alt: "Vape Quit Coach app screen",
      kicker: "Behavior-change mobile app",
      summary: "Coaching, recovery timelines, relapse support",
      tone: "teal",
    },
    links: {
      live: "https://vapequitcoach.com",
    },
    link: "https://vapequitcoach.com",
    impact: [
      "Apple Watch HR data integration: 125 → 92 BPM in 13 days of quitting",
      "$31 MRR. From $0.96/week, 7-day free trial",
      "Science-backed: CDC/NIH recovery milestones built into the timeline",
    ],
  },
  {
    slug: "skillscan",
    name: "SkillScan",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 5,
    description:
      "Static security scanner for Claude Code skills and MCP servers.",
    longDescription:
      "SkillScan is a developer security tool for reviewing Claude Code skills, MCP servers, GitHub repositories, and pasted code before running them locally. It uses deterministic static checks to surface risky shell, network, filesystem, credential, and prompt-injection patterns with severity, snippets, and remediation notes.",
    tags: [
      "Next.js",
      "TypeScript",
      "Security",
      "Static Analysis",
      "Developer Tools",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    startDate: "2026-01-01",
    screenshots: ["/projectImages/skillscan-1.webp"],
    thumb: "/projectImages/skillscan-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/skillscan-1.webp",
      alt: "SkillScan security scanner interface",
      objectPosition: "center center",
    },
    links: {
      live: "https://skillscan-rouge.vercel.app",
      repo: "https://github.com/maxwellyoung/skillscan",
    },
    link: "https://skillscan-rouge.vercel.app",
    codeLink: "https://github.com/maxwellyoung/skillscan",
    impact: [
      "Pattern-based checks for shell execution, network access, filesystem access, credentials, and prompt injection",
      "GitHub URL and direct-code scanning with severity, snippets, and remediation notes",
      "A focused developer-tool UI for first-pass supply-chain review",
    ],
  },
  {
    slug: "holdspace",
    name: "Holdspace",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 6,
    description:
      "Native iOS queue for keeping one item in focus while the rest waits in the background.",
    longDescription:
      "Holdspace is a native SwiftUI app for a lightweight personal queue. It keeps one current item in focus, supports quick gesture actions, and stores everything on-device, with widgets and a share extension planned around the same private queue model.",
    tags: ["Swift", "SwiftUI", "iOS", "SwiftData", "Native"],
    stack: ["Swift", "SwiftUI", "SwiftData", "WidgetKit", "Live Activities"],
    startDate: "2025-01-01",
    screenshots: ["/projectImages/holdspace-1.webp"],
    thumb: "/projectImages/holdspace-1.webp",
    cover: {
      variant: "device",
      src: "/projectImages/holdspace-1.webp",
      alt: "Holdspace iPhone screenshot",
      kicker: "Native iOS app",
      summary: "A focused queue with widgets, gestures, and on-device data",
      tone: "plum",
    },
    links: {
      live: "https://apps.apple.com/nz/app/holdspace/id6758010909",
    },
    link: "https://apps.apple.com/nz/app/holdspace/id6758010909",
    impact: [
      "Privacy-first: no accounts, no analytics, all data stays on-device",
      "One-at-a-time UX reduces overwhelm vs traditional list apps",
      "Native SwiftUI with physics-based motion and haptics",
    ],
  },
  {
    slug: "whakapapa",
    name: "Whakapapa",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "In development",
    priority: 7,
    description:
      "Family-history workspace that turns documents, photos, and voice notes into reviewed family records.",
    longDescription:
      "Whakapapa is a family history app built around source material. You can scan letters and documents, upload photos, record stories, and review extracted people, dates, relationships, and places before adding them to a shared tree. The interface uses an authored design language — Narrative Atlas: parchment surfaces, serif display type, and a story mode that treats lineage as a field of remembered lives rather than a database. The stack combines OCR, LLM-assisted extraction, React Flow for the tree view, and support for GEDCOM import and multi-workspace collaboration.",
    tags: ["Next.js", "Supabase", "Claude AI", "OCR", "React Flow", "Genealogy"],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Claude API",
      "Tesseract.js",
      "React Flow",
      "dagre",
      "Framer Motion",
      "Tailwind CSS",
    ],
    startDate: "2025-01-01",
    caseStudySlug: "whakapapa",
    links: {
      live: "https://whakapapa.vercel.app",
      repo: "https://github.com/maxwellyoung/whakapapa",
    },
    link: "https://whakapapa.vercel.app",
    codeLink: "https://github.com/maxwellyoung/whakapapa",
    screenshots: ["/projectImages/whakapapa-1.webp"],
    thumb: "/projectImages/whakapapa-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/whakapapa-1.webp",
      alt: "Whakapapa family-history homepage",
      objectPosition: "center center",
    },
    impact: [
      "AI extraction pipeline: document → OCR → Claude → structured genealogical data",
      "Narrative Atlas design language: parchment, serif display type, story-first navigation",
      "Voice recording preserves stories in the storyteller's own voice",
      "Cultural respect: named after Māori concept of living genealogy",
    ],
  },
  {
    slug: "basketcase",
    name: "Basketcase",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "In development",
    priority: 2,
    description:
      "Mobile receipt scanner that turns grocery receipts into item history, price memory, and calmer pre-shop comparison.",
    longDescription:
      "Basketcase turns paper receipts into structured grocery history. It scans receipts, normalizes line items, tracks spend over time, and gives each price comparison a source trail before the next shop. Built with React Native, Expo, OCR services, and a real-time backend.",
    tags: ["React Native", "Expo", "Convex", "OCR", "Price Memory"],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Convex",
      "Supabase",
      "FastAPI",
    ],
    startDate: "2025-01-01",
    screenshots: [
      "/projectImages/basketcase-cover.webp",
      "/projectImages/basketcase-hero.webp",
    ],
    thumb: "/projectImages/basketcase-cover.webp",
    cover: {
      variant: "image",
      src: "/projectImages/basketcase-cover.webp",
      alt: "Basketcase product artwork with receipt strips and price-memory charts",
      objectPosition: "center center",
    },
    links: {
      live: "/basketcase",
    },
    link: "/basketcase",
    impact: [
      "Receipt parsing and item normalization turn messy receipts into longitudinal history",
      "Price memory stays source-labelled so comparisons remain explainable",
      "Mobile-first workflow designed around the few minutes after a real grocery run",
    ],
  },
  {
    slug: "good-news-bad-news",
    name: "Good News Bad News",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 8,
    description:
      "Expo news app that turns daily reading into a bounded six-story ritual with a mood check.",
    longDescription:
      "Good News Bad News is a React Native and Expo app for balanced daily news. It pairs a swipeable six-story pack with source links, a post-read balance check, offline caching, and a 30-day archive. A Cloudflare Worker curates daily packs from RSS sources with Workers AI and caches them in KV.",
    tags: [
      "React Native",
      "Expo",
      "Cloudflare Workers",
      "SQLite",
      "Workers AI",
      "News",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo SQLite",
      "Zustand",
      "Cloudflare Workers",
      "Workers AI",
      "KV",
    ],
    startDate: "2026-01-01",
    screenshots: [
      "/projectImages/good-news-bad-news-1.webp",
      "/projectImages/good-news-bad-news-2.webp",
      "/projectImages/good-news-bad-news-3.webp",
      "/projectImages/good-news-bad-news-4.webp",
    ],
    thumb: "/projectImages/good-news-bad-news-1.webp",
    cover: {
      variant: "device",
      src: "/projectImages/good-news-bad-news-1.webp",
      alt: "Good News Bad News app screen",
      tone: "forest",
    },
    links: {
      live: "https://apps.apple.com/nz/app/id6759082896",
      repo: "https://github.com/maxwellyoung/good-news-bad-news",
    },
    link: "https://apps.apple.com/nz/app/id6759082896",
    codeLink: "https://github.com/maxwellyoung/good-news-bad-news",
    impact: [
      "Live on the App Store",
      "Daily pack model keeps news reading intentionally bounded",
      "Cloudflare Worker fetches RSS sources, curates with Workers AI, and caches packs in KV",
      "Offline-first mobile UX with local SQLite storage and a 30-day archive",
    ],
  },
  {
    slug: "afterlight",
    name: "Afterlight",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "In development",
    priority: 1,
    description:
      "Local-first concert diary — Letterboxd for live music, but quieter.",
    longDescription:
      "Afterlight is a concert diary for logging gigs, photos, and memories. It is local-first by design: everything lives on-device with no account or network required. The visual language is gig poster modernism — Factory Records palette, Swiss clarity, grain textures, and spring-based motion.",
    tags: ["React Native", "Expo", "Local-first", "Music", "Design System"],
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    startDate: "2025-11-01",
    caseStudySlug: "afterlight",
    links: {
      live: "https://afterlight.ninetynine.digital",
    },
    link: "https://afterlight.ninetynine.digital",
    screenshots: [
      "/projectImages/afterlight-1.webp",
      "/projectImages/afterlight-2.webp",
    ],
    thumb: "/projectImages/afterlight-1.webp",
    cover: {
      variant: "device",
      src: "/projectImages/afterlight-1.webp",
      alt: "Afterlight concert diary screen",
      kicker: "Local-first concert diary",
      summary: "Gig poster modernism: true black, FAC blue, grain",
      tone: "slate",
    },
    impact: [
      "Local-first: no accounts, no analytics, concerts and photos stay on-device",
      "Authored design system: Factory Records palette with spring motion grammar",
      "Polished 1.0 build shaped around a small, offline-first concert-memory loop",
    ],
  },
  {
    slug: "doomscroll",
    name: "doomscroll",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 9,
    description:
      "Swipe-to-learn spaced repetition for code — master a codebase by doomscrolling through it.",
    longDescription:
      "doomscroll turns the doomscroll reflex into a learning loop. It serves bite-size code cards in a swipeable feed with streaks and spaced repetition, so the muscle memory of scrolling feeds becomes a way to absorb a codebase. Built with React Native and Expo, designed around dark space, floating code, and one-glyph iconography.",
    tags: ["React Native", "Expo", "Spaced Repetition", "Developer Tools"],
    stack: ["React Native", "Expo", "TypeScript"],
    startDate: "2026-02-01",
    screenshots: [
      "/projectImages/doomscroll-1.webp",
      "/projectImages/doomscroll-2.webp",
    ],
    thumb: "/projectImages/doomscroll-1.webp",
    cover: {
      variant: "device",
      src: "/projectImages/doomscroll-2.webp",
      alt: "doomscroll swipe-to-learn card feed",
      kicker: "Swipe-to-learn for code",
      summary: "Spaced repetition disguised as a feed",
      tone: "teal",
    },
    links: {
      live: "https://apps.apple.com/nz/app/id6759310735",
    },
    link: "https://apps.apple.com/nz/app/id6759310735",
    impact: [
      "Live on the App Store",
      "Swipe-first card feed with streaks and spaced repetition",
      "Interaction design built on a strict motion grammar — springs, not decorations",
    ],
  },
  {
    slug: "chlita",
    name: "Ch'lita",
    status: "Completed",
    category: "studio",
    role: "Solo",
    featured: true,
    visibility: "public",
    lifecycle: "completed",
    launchStage: "Client shipped",
    priority: 10,
    description:
      "CMS-backed stylist portfolio built around fast image browsing and quiet editorial motion.",
    longDescription:
      "Built for stylist Ch'lita as an image-led portfolio that keeps the work in front. The site uses Sanity for authoring, responsive image handling, and restrained motion so new editorial work can be published without touching code.",
    tags: ["Next.js", "Sanity CMS", "Fashion", "Art Direction"],
    stack: ["Next.js", "TypeScript", "Sanity", "Framer Motion", "Vercel"],
    client: "Ch'lita",
    caseStudySlug: "chlita",
    links: {
      live: "https://chlita.com",
    },
    link: "https://chlita.com",
    screenshots: [
      "/projectImages/chlita-1.webp",
      "/projectImages/chlita-2.webp",
      "/projectImages/chlita-3.webp",
      "/projectImages/chlita-4.webp",
      "/projectImages/chlita-5.webp",
    ],
    thumb: "/projectImages/chlita-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/chlita-3.webp",
      alt: "Ch'lita portfolio site",
      objectPosition: "center top",
      kicker: "CMS-driven stylist portfolio",
      summary: "Image-led layout with restrained motion and fast editorial browsing",
      tone: "plum",
    },
    impact: [
      "Sanity-backed publishing flow for updating portfolio work without code changes",
      "Responsive image treatment keeps the work prominent across mobile and desktop",
      "Restrained motion supports editorial browsing without competing with the styling work",
    ],
  },
  {
    slug: "dayle",
    name: "Dayle Palfreyman",
    status: "Completed",
    category: "studio",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "completed",
    launchStage: "Client shipped",
    priority: 12,
    description:
      "Artist portfolio with a full-screen gallery, vertical rhythm, and client-managed content.",
    longDescription:
      "Built for Dayle Palfreyman as a full-screen installation-art portfolio. The interface uses vertical snapping, minimal navigation, and Sanity-managed content so the site can stay sparse while still being easy to update.",
    tags: [
      "Next.js 15",
      "Sanity CMS",
      "Framer Motion",
      "Accessibility",
      "Portfolio",
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "Sanity",
      "Tailwind CSS",
      "Framer Motion",
    ],
    client: "Dayle Palfreyman",
    caseStudySlug: "dayle",
    links: {
      live: "https://dayle.vercel.app",
    },
    link: "https://dayle.vercel.app",
    screenshots: ["/projectImages/dayle-1.webp"],
    thumb: "/projectImages/dayle-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/dayle-1.webp",
      alt: "Dayle Palfreyman portfolio",
      objectPosition: "center center",
      kicker: "Artist portfolio",
      summary: "Full-screen gallery with Sanity-managed content",
      tone: "slate",
    },
    impact: [
      "Client-managed Sanity content keeps installation documentation easy to update",
      "Full-screen gallery treatment prioritizes artwork over site chrome",
      "Simple navigation and vertical rhythm suit repeated portfolio browsing",
    ],
  },
  {
    slug: "goodness-gracious",
    name: "Goodness Gracious",
    status: "Completed",
    category: "studio",
    role: "Frontend",
    featured: false,
    visibility: "public",
    lifecycle: "completed",
    launchStage: "Client shipped",
    priority: 13,
    description:
      "Shopify storefront for an Auckland bakery, built with New Territory Studio.",
    longDescription:
      "A Shopify build for Goodness Gracious through New Territory Studio. The work focused on stable responsive templates, straightforward commerce flows, and a visual tone that matched the bakery without slowing down browsing or ordering.",
    tags: ["Shopify", "Performance", "Ecommerce"],
    stack: ["Shopify Liquid", "CSS"],
    client: "Goodness Gracious (via New Territory Studio)",
    links: {
      live: "https://www.goodnessgracious.co.nz/",
    },
    link: "https://www.goodnessgracious.co.nz/",
    screenshots: [
      "/projectImages/goodness-1.webp",
      "/projectImages/goodness-2.webp",
    ],
    thumb: "/projectImages/goodness-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/goodness-1.webp",
      alt: "Goodness Gracious bakery site",
      objectPosition: "center top",
      kicker: "Shopify storefront",
      summary: "Commerce flows and stable layout for a bakery brand",
      tone: "amber",
    },
    impact: [
      "Shopify Liquid implementation for a live bakery storefront",
      "Responsive templates support browsing, product selection, and ordering",
      "Built in collaboration with New Territory Studio",
    ],
  },
  {
    slug: "jeremy-blake",
    name: "Jeremy Blake",
    status: "Completed",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "archived",
    launchStage: "Case study",
    priority: 14,
    description:
      "Interactive WebGL color-field study built in response to Jeremy Blake's digital paintings.",
    longDescription:
      "A personal WebGL study inspired by Jeremy Blake's digital paintings. It uses shader-driven color fields, browser-native interaction, and pointer-responsive motion to explore atmosphere without a conventional interface.",
    tags: ["React", "Three.js", "WebGL", "GLSL", "Interactive Art"],
    stack: ["React", "Three.js", "WebGL"],
    links: {
      live: "https://jeremy-blake.vercel.app/",
      repo: "https://github.com/maxwellyoung/jeremy-blake",
    },
    link: "https://jeremy-blake.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/jeremy-blake",
    screenshots: ["/projectImages/blake.webp", "/projectImages/blake2.webp"],
    thumb: "/projectImages/blake.webp",
    cover: {
      variant: "image",
      src: "/projectImages/blake2.webp",
      alt: "Jeremy Blake interactive WebGL study",
      objectPosition: "center center",
      kicker: "Interactive WebGL study",
      summary: "Shader-driven color fields reacting to pointer movement",
      tone: "teal",
    },
    impact: [
      "Browser-native WebGL study with shader-driven motion",
      "Pointer interaction changes the color-field composition in real time",
      "Small experimental build focused on atmosphere and responsiveness",
    ],
  },
];

export function isActiveStatus(project: Pick<Project, "status">): boolean {
  return project.status === "Active" || project.status === "WIP";
}

export const rankedProjects = projects
  .filter((project) => project.visibility === "public" || project.featured)
  .filter((project) => project.visibility !== "private")
  .sort(
    (a, b) =>
      (a.priority ?? Number.MAX_SAFE_INTEGER) -
      (b.priority ?? Number.MAX_SAFE_INTEGER),
  );

export const flagshipProjects = rankedProjects.filter((project) => project.featured);

export const supportingProjects = rankedProjects.filter(
  (project) => !project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectContextLabel(
  project: Pick<Project, "category" | "client">
): string {
  if (project.category === "Work" || project.category === "research") {
    return "Work";
  }
  if (project.category === "School") {
    return "School R&D";
  }
  if (project.category === "personal" || project.category === "Personal") {
    return "Personal Product";
  }
  if (project.client || project.category === "studio" || project.category === "Studio") {
    return "Client Work";
  }
  return "Experiment";
}

export function getProjectStatusLabel(
  project: Pick<Project, "status" | "launchStage">
): string | null {
  if (project.launchStage) return project.launchStage;
  if (project.status === "Active") return "In development";
  if (project.status === "WIP") return "WIP";
  if (project.status === "Planned") return "Planned";
  if (project.status === "Completed") return "Live";
  return null;
}
