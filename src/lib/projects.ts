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
  | "work"
  | "personal"
  | "studio"
  | "experiment"
  | "research"
  | "school";
type Visibility = "public" | "parked" | "private";
type Lifecycle = "current" | "completed" | "archived" | "sensitive";
type LaunchStage = "Live" | "In development" | "Case study" | "Client shipped" | "Production work";

interface BuildLogEntry {
  date: string;
  whatWorks: string[];
  nextMilestone?: string;
  openQuestion?: string;
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
    category: "work",
    role: "Lead",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Production work",
    priority: 0,
    description:
      "Mobile lead for Silk's iOS and Android app, from first build through launch, performance work, and ongoing releases.",
    longDescription:
      "Silk is a platform for blogging, private archives, and multimedia moodboards. I led its React Native app from the first build through launch and continue to own mobile delivery across iOS and Android. My work connects architecture and interaction design with performance, accessibility, regression coverage, and real-device verification.",
    tags: ["React Native", "React", "TypeScript"],
    stack: ["React Native", "React", "TypeScript", "Expo"],
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
      "Built the mobile app from zero to launch as mobile lead",
      "Own architecture, performance, and accessibility across iOS and Android",
      "Validate mobile changes with regression coverage and real-device checks",
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
    launchStage: "Live",
    priority: 1,
    description:
      "A visual workspace for organizing songs and planning releases.",
    longDescription:
      "I designed and built Liner to keep demos, notes, references, and tracklists in one visual workspace. Songs can be grouped into frames, annotated, and sequenced while audio remains playable. The web app uses a custom HTML canvas engine, Web Audio, and local browser persistence, with optional account-based sync through Convex and Clerk. This presentation covers the web app. The pictured release board is a public demo; its notes and alternate tracks are illustrative.",
    tags: ["Next.js", "TypeScript", "Web Audio", "Canvas", "Convex"],
    stack: [
      "Next.js",
      "TypeScript",
      "Custom HTML canvas",
      "Web Audio API",
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
    screenshots: ["/projectImages/liner-release-demo-editor.jpg"],
    thumb: "/projectImages/liner-release-demo-editor.jpg",
    cover: {
      variant: "image",
      src: "/projectImages/liner-release-demo-editor.jpg",
      alt: "Liner public release-demo board with songs, frames, references, and notes",
      objectPosition: "center center",
    },
    impact: [
      "Solo-designed and built web workspace for songs and releases",
      "Custom canvas with frames, notes, and audio playback",
      "Local save states and an export path when saving fails",
    ],
  },
  {
    slug: "vape-quit-coach",
    name: "Vape Quit Coach",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 1,
    description:
      "iPhone support for quitting vaping: track progress, reflect on triggers, and reach an AI coach.",
    longDescription:
      "Vape Quit Coach is a solo-built iPhone app with quit tracking, journaling, breathing exercises, and online AI coaching. I designed and shipped the product in React Native and Expo. Its guidance supports reflection and coping; it does not measure biological recovery or replace professional care. Coaching uses external AI services rather than staying entirely on-device.",
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
      variant: "image",
      src: "/projectImages/vqc-cover-2.webp",
      alt: "Vape Quit Coach product page and iPhone interface",
      objectPosition: "center center",
    },
    links: {
      live: "https://apps.apple.com/nz/app/vape-quit-coach/id6754863295",
    },
    link: "https://apps.apple.com/nz/app/vape-quit-coach/id6754863295",
    impact: [
      "Live on the iOS App Store",
      "Solo-designed tracking, coaching, and relapse-support flows",
      "Local progress tracking with separately processed online AI coaching",
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
      "Static scanner that checks agent skills, packages, extensions, and CI workflows before you run them.",
    longDescription:
      "SkillScan reviews agent skills, MCP servers, npm packages, VS Code extensions, GitHub Actions, repositories, and pasted code before you run them locally. Its checks surface risky shell, network, filesystem, credential, package-hook, CI-permission, and prompt-injection patterns, and every finding points at the file and line that triggered it.",
    tags: [
      "Next.js",
      "TypeScript",
      "Security",
      "Static Analysis",
      "Developer Tools",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    startDate: "2026-01-01",
    screenshots: [
      "/projectImages/skillscan-cover.webp",
      "/projectImages/skillscan-result.webp",
    ],
    thumb: "/projectImages/skillscan-cover.webp",
    cover: {
      variant: "image",
      src: "/projectImages/skillscan-cover.webp",
      alt: "SkillScan scanner with a pasted-code input and inspectable validation evidence",
      objectPosition: "center center",
    },
    links: {
      live: "https://skillscan-rouge.vercel.app",
      repo: "https://github.com/maxwellyoung/skillscan",
    },
    link: "https://skillscan-rouge.vercel.app",
    codeLink: "https://github.com/maxwellyoung/skillscan",
    impact: [
      "Every finding carries a file, line, snippet, and fix note",
      "Verdicts stay explicit about what static analysis cannot prove",
      "One engine covers packages, extensions, repositories, workflows, and pasted code",
    ],
    caseStudySlug: "skillscan",
  },
  {
    slug: "default-index",
    name: "Default Index",
    status: "Active",
    category: "experiment",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 6,
    description:
      "Benchmark that measures recurring design defaults in model-generated frontends.",
    longDescription:
      "Default Index turns 'AI frontends all look the same' into something measurable. Fixed briefs, preserved source and renders, rule-based detectors, and a blind-review queue sit behind every chart, so any disagreement has an artifact to look at. The current release is a synthetic calibration corpus that proves the pipeline; it makes no claims about real models yet.",
    tags: [
      "React",
      "TypeScript",
      "Playwright",
      "Benchmarking",
      "Static Analysis",
      "Research",
    ],
    stack: ["React", "TypeScript", "Vite", "Playwright", "Vitest"],
    startDate: "2026-07-20",
    screenshots: [
      "/projectImages/default-index-lab.webp",
      "/projectImages/default-index-corpus.webp",
    ],
    thumb: "/projectImages/default-index-cover.webp",
    cover: {
      variant: "image",
      src: "/projectImages/default-index-cover.webp",
      alt: "Default Index calibration release cover with a measured pattern distribution",
      fit: "contain",
      objectPosition: "center center",
    },
    links: {
      live: "https://default-index.vercel.app",
    },
    link: "https://default-index.vercel.app",
    impact: [
      "Every chart links back to the source and renders that produced it",
      "Fixed briefs and blind review replace screenshot arguments",
      "Calibration corpus is labelled synthetic — no model claims until real runs land",
    ],
    caseStudySlug: "default-index",
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
    priority: 7,
    description:
      "Native iOS queue for keeping one item in focus while the rest waits in the background.",
    longDescription:
      "Holdspace is a native SwiftUI app for a lightweight personal queue. One item stays in focus while saved items wait; gesture actions move them through the queue. Queue records stay on-device. Website link previews and links you choose to open can contact external sites.",
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
      "On-device queue records; website previews can make network requests",
      "One current item, with a waiting queue instead of an endless task list",
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
    priority: 9,
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
    },
    link: "https://whakapapa.vercel.app",
    screenshots: ["/projectImages/whakapapa-cover-2.webp"],
    thumb: "/projectImages/whakapapa-cover-2.webp",
    cover: {
      variant: "image",
      src: "/projectImages/whakapapa-cover-2.webp",
      alt: "Whakapapa homepage showing a family tree and story-led archive",
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
    featured: false,
    visibility: "parked",
    lifecycle: "current",
    launchStage: "In development",
    priority: 10,
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
    priority: 10,
    description:
      "A finite daily news pack that pairs positive and difficult stories, then asks how the reading felt.",
    longDescription:
      "Good News Bad News is a React Native and Expo app with a finite daily pack, publisher links, a post-read balance check, and a local reading archive. A Cloudflare Worker selects and summarizes RSS material with Workers AI. Positive and difficult stories provide emotional contrast; the selection is not a promise of comprehensive coverage, political balance, or verified reporting.",
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
    },
    link: "https://apps.apple.com/nz/app/id6759082896",
    impact: [
      "Live on the App Store",
      "Daily pack model keeps news reading intentionally bounded",
      "Cloudflare Worker fetches RSS sources, curates with Workers AI, and caches packs in KV",
      "Local reading history and balance checks, with network requests for news packs",
    ],
  },
  {
    slug: "afterlight",
    name: "Afterlight",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 4,
    description:
      "An iPhone concert diary for recording the nights, notes, and memories you want to keep.",
    longDescription:
      "Afterlight is a concert diary available on the iPhone App Store, built in React Native and Expo. Its interface brings concert records and personal reflections together. A broader Recovery Desk and improved portable backups are being developed separately; those next-release capabilities are not represented here as included in the current App Store build.",
    tags: [
      "React Native",
      "Expo",
      "Local-first",
      "Native Extensions",
      "Design System",
    ],
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    startDate: "2025-11-01",
    caseStudySlug: "afterlight",
    links: {
      live: "https://apps.apple.com/nz/app/afterlight-concert-diary/id6755545440",
    },
    link: "https://apps.apple.com/nz/app/afterlight-concert-diary/id6755545440",
    screenshots: [
      "/projectImages/afterlight-diary-v2.webp",
      "/projectImages/afterlight-detail-v2.webp",
    ],
    thumb: "/projectImages/afterlight-diary-v2.webp",
    cover: {
      variant: "image",
      src: "/projectImages/afterlight-cover-2.webp",
      alt: "Afterlight product page showing the concert diary on a phone",
      objectPosition: "center center",
    },
    impact: [
      "Available on the iPhone App Store",
      "Concert records and reflections in a concert-poster-inspired interface",
      "Recovery and backup improvements remain separate from the published build",
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
    priority: 11,
    description:
      "A swipeable code-review feed with GitHub imports, prompts, and progress tracking.",
    longDescription:
      "doomscroll presents code as a swipeable review feed with progress tracking. GitHub imports bring repository material into the app. Cards and prompts are generated with on-device rules, not a remote AI model. The interface supports deliberate review; it does not promise mastery or measure learning effectiveness.",
    tags: ["React Native", "Expo", "Code Review", "Developer Tools"],
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
      summary: "Code review in a swipeable feed",
      tone: "teal",
    },
    links: {
      live: "https://apps.apple.com/nz/app/id6759310735",
    },
    link: "https://apps.apple.com/nz/app/id6759310735",
    impact: [
      "Live on the App Store",
      "Swipe-first card feed with review progress",
      "Interaction design built on a strict motion grammar — springs, not decorations",
    ],
  },
  {
    slug: "playback",
    name: "Playback",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: false,
    visibility: "public",
    lifecycle: "current",
    launchStage: "In development",
    priority: 8,
    description:
      "Native macOS app for shooting performance video locked to the track — count in, perform, and export footage already in sync.",
    longDescription:
      "Playback is a native macOS app for lipsync, dance, and music-video takes. Instead of pressing play and record together, camera and music are both scheduled on the system host clock, so every take carries its exact offset in track time. Exports mux the original audio back in aligned to the frame, and any set of takes is already a synced multicam session for the built-in cut editor. It supports iPhone capture via Continuity Camera, loop-and-reps mode, half-speed performance with pitch-preserved retiming, tap-along latency calibration for Bluetooth headphones, and lyrics where pasted text stays the source of truth while on-device speech recognition only supplies timing.",
    tags: ["Swift", "SwiftUI", "AVFoundation", "macOS", "Video"],
    stack: ["Swift", "SwiftUI", "AVFoundation", "Speech", "XCTest"],
    screenshots: ["/projectImages/playback-1.webp"],
    thumb: "/projectImages/playback-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/playback-1.webp",
      alt: "Playback recording view with a track loaded, detected tempo, and synced waveform",
      objectPosition: "center",
      kicker: "Native macOS app",
      summary: "Synced performance video — every take locked to track time",
      tone: "amber",
    },
    impact: [
      "Camera and music scheduled on the system host clock — no 'press play and record together' drift",
      "Every take stores its offset in track time, so the multi-take editor is a cut list, not a sync problem",
      "On-device speech recognition supplies lyric timing while pasted text stays the source of truth",
      "Per-headphone latency calibration with exporter-level compensation",
    ],
  },
  {
    slug: "t3craft",
    name: "T3 Craft",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    visibility: "public",
    lifecycle: "current",
    launchStage: "Live",
    priority: 3,
    description:
      "T3 Code inside Minecraft, featured in a Theo video and my most-starred GitHub project.",
    longDescription:
      "T3 Craft connects Minecraft Java to T3 Code the same way T3's mobile app does. An in-game panel lists threads from every paired machine and renders the conversation as Markdown, with approvals on Y/N and agent questions answered with the number keys. Updates stream over T3's RPC WebSocket and fall back to polling, so a turn can run while you mine and one toast tells you when it's done. Threads can also appear as villagers whose name tags show what they're waiting on; right-click one to open it. A loopback MCP server lets local agents see and build in the world, gated behind an explicit opt-in, and installed on a server the mod runs a shared village every player can see. Theo showed Max's demo in his video Anthropic Actually Fixed Opus. Open source with tagged releases.",
    tags: ["Java", "Minecraft", "Fabric", "MCP", "AI agents"],
    stack: ["Java 25", "Fabric", "WebSocket RPC", "MCP", "Gradle"],
    links: {
      video: "https://www.youtube.com/watch?v=jgGyX7MPPVg&t=1637s",
    },
    link: "https://github.com/maxwellyoung/t3craft/releases/latest",
    codeLink: "https://github.com/maxwellyoung/t3craft",
    screenshots: [
      "/projectImages/t3craft-1.webp",
      "/projectImages/t3craft-2.webp",
      "/projectImages/t3craft-3.webp",
      "/projectImages/t3craft-4.webp",
    ],
    thumb: "/projectImages/t3craft-1.webp",
    cover: {
      variant: "image",
      src: "/projectImages/t3craft-1.webp",
      alt: "T3 Craft panel in Minecraft: a thread list and an agent's reply after it built a beacon platform",
      objectPosition: "center",
      kicker: "Minecraft mod",
      summary: "Coding agents you can check on without leaving the game",
      tone: "forest",
    },
    impact: [
      "15 GitHub stars as of September 2026, my most-starred public repo",
      "Featured in Theo's Anthropic Actually Fixed Opus",
      "Speaks T3's client protocol: pairing, orchestration, and live RPC streams",
      "Threads from several machines in one sidebar, each action routed to the machine that owns it",
      "One notification per event, and approvals answered without leaving the game",
      "Local agents can build in the world through an opt-in MCP server",
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
    priority: 2,
    description:
      "Portfolio for Ch'lita Collins — Fashion Editor-at-Large at i-D — built around fast image browsing and quiet editorial motion.",
    longDescription:
      "Built for Ch'lita Collins, Fashion Editor-at-Large at i-D and stylist to Rosalía and The Dare. An image-led portfolio that keeps the work in front: Sanity for authoring, responsive image handling, and restrained motion so new editorial work ships without touching code.",
    tags: ["Next.js", "Sanity CMS", "Fashion", "Art Direction", "i-D"],
    stack: ["Next.js", "TypeScript", "Sanity", "Framer Motion", "Vercel"],
    client: "Ch'lita — Fashion Editor-at-Large, i-D",
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
      kicker: "Portfolio for i-D's Fashion Editor-at-Large",
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
    visibility: "parked",
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
    visibility: "parked",
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
    },
    link: "https://jeremy-blake.vercel.app/",
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

const appSlugs = new Set(["vape-quit-coach", "afterlight", "holdspace", "good-news-bad-news", "doomscroll"]);

export const independentApps = rankedProjects.filter((project) => appSlugs.has(project.slug));
export const selectedWorkProjects = flagshipProjects.filter((project) => !appSlugs.has(project.slug));
export const supportingProjects = rankedProjects.filter(
  (project) => !project.featured && !appSlugs.has(project.slug),
);

export function getProjectContextLabel(
  project: Pick<Project, "category" | "client">
): string {
  if (project.category === "work" || project.category === "research") {
    return "Work";
  }
  if (project.category === "school") {
    return "School R&D";
  }
  if (project.category === "personal") {
    return "Personal Product";
  }
  if (project.client || project.category === "studio") {
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
