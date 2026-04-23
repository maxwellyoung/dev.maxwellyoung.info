// lib/projects.ts

type Status = "Completed" | "WIP" | "Planned" | "Active";
type Role =
  | "Solo"
  | "Lead"
  | "Collaborator"
  | "Frontend"
  | "Studio Collaboration";
type Category =
  | "Client"
  | "Personal"
  | "Studio"
  | "Experiment"
  | "studio"
  | "personal"
  | "research";

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
  priority?: number;
  tags?: string[];
  stack?: string[];
  client?: string;
  redacted?: boolean;
  links?: Links;
  screenshots?: string[];
  thumb?: string;
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
    category: "research",
    role: "Collaborator",
    featured: true,
    priority: 3,
    description:
      "React Native client work at Silk — contributing to mobile publishing, archive, and media flows.",
    longDescription:
      "I work on the React Native client at Silk as part of a small team. The product spans writing, private archives, and media-rich collections, and I contribute across navigation, editing, media handling, and iOS / Android parity.",
    tags: ["React Native", "TypeScript", "Expo"],
    stack: ["React Native", "TypeScript", "Expo"],
    startDate: "2024-06-01",
    links: {
      live: "https://www.silk.cx",
    },
    link: "https://www.silk.cx",
    screenshots: ["/projectImages/silk-1.webp"],
    thumb: "/projectImages/silk-1.webp",
  },
  {
    slug: "liner",
    name: "Liner",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    priority: 0,
    description:
      "Spatial canvas for organizing music. Built on tldraw with audio playback, custom shapes, and shared data across web and iOS.",
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
    featured: true,
    priority: 1,
    description:
      "iOS app for quitting vaping. Built in React Native and Expo with coaching, recovery tracking, and relapse support.",
    longDescription:
      "Vape Quit Coach is a solo-built iOS app for smoking cessation. It includes recovery timelines, coaching flows, and support tools designed for relapse-prone moments. Built end-to-end in React Native and Expo.",
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
    slug: "holdspace",
    name: "Holdspace",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    priority: 4,
    description:
      "Native iOS app for keeping a small personal queue. One item in focus, the rest held in the background.",
    longDescription:
      "Holdspace is a native SwiftUI app for keeping a lightweight queue of links and tasks. It shows one current item at a time, supports quick gesture actions, and keeps everything on-device with widgets and a share extension.",
    tags: ["Swift", "SwiftUI", "iOS", "SwiftData", "Native"],
    stack: ["Swift", "SwiftUI", "SwiftData", "WidgetKit", "Live Activities"],
    startDate: "2025-01-01",
    screenshots: ["/projectImages/holdspace-1.webp"],
    thumb: "/projectImages/holdspace-1.webp",
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
    featured: true,
    priority: 2,
    description:
      "Family history app for documents, photos, voice notes, and relationship data. OCR and LLM extraction turn source material into structured family records.",
    longDescription:
      "Whakapapa is a family history app built around source material. You can scan letters and documents, upload photos, record stories, and review extracted people, dates, relationships, and places before adding them to a shared tree. The stack combines OCR, LLM-assisted extraction, React Flow for the tree view, and support for GEDCOM import and multi-workspace collaboration.",
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
    screenshots: [],
    thumb: undefined,
    impact: [
      "AI extraction pipeline: document → OCR → Claude → structured genealogical data",
      "Voice recording preserves stories in the storyteller's own voice",
      "Cultural respect: named after Māori concept of living genealogy",
    ],
  },
  {
    slug: "receipt-radar",
    name: "Receipt Radar",
    status: "Active",
    category: "personal",
    role: "Solo",
    featured: true,
    priority: 5,
    description:
      "Receipt scanning app for grocery spend tracking and price comparison.",
    longDescription:
      "Receipt Radar turns paper receipts into structured grocery history. It scans receipts, normalizes line items, tracks spend over time, and makes price comparisons easier to review before the next shop. Built with React Native, Expo, OCR services, and a real-time backend.",
    tags: ["React Native", "Expo", "Convex", "OCR", "Price Intelligence"],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Convex",
      "Supabase",
      "FastAPI",
    ],
    startDate: "2025-01-01",
    screenshots: ["/projectImages/receipt-radar-1.png"],
    thumb: "/projectImages/receipt-radar-1.png",
    links: {
      live: "/receipt-radar",
    },
    link: "/receipt-radar",
    impact: [
      "Receipt parsing + item normalization for longitudinal spend tracking",
      "Price comparison context with store/source transparency",
      "Mobile-first workflow designed for real grocery routines",
    ],
  },
  {
    slug: "chlita",
    name: "Ch'lita",
    status: "Completed",
    category: "studio",
    role: "Solo",
    featured: true,
    priority: 6,
    description:
      "Portfolio site for stylist Ch'lita with a CMS-driven image-led layout.",
    longDescription:
      "Built for stylist Ch'lita as a portfolio that keeps the visual work in front. The site uses Sanity for authoring, responsive image handling, and restrained motion.",
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
  },
  {
    slug: "dayle",
    name: "Dayle Palfreyman",
    status: "Completed",
    category: "studio",
    role: "Solo",
    featured: true,
    priority: 7,
    description:
      "Portfolio site for installation artist Dayle Palfreyman with a full-screen gallery and CMS editing.",
    longDescription:
      "Built for Dayle Palfreyman as a full-screen portfolio with vertical snapping, simple navigation, and client-managed content through Sanity.",
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
  },
  {
    slug: "goodness-gracious",
    name: "Goodness Gracious",
    status: "Completed",
    category: "studio",
    role: "Frontend",
    featured: true,
    priority: 8,
    description:
      "Shopify site for an Auckland bakery, built with New Territory Studio.",
    longDescription:
      "A Shopify build for Goodness Gracious focused on a stable layout, straightforward commerce flows, and a visual tone that matched the bakery.",
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
  },
  {
    slug: "jeremy-blake",
    name: "Jeremy Blake",
    status: "Completed",
    category: "personal",
    role: "Solo",
    featured: true,
    priority: 9,
    description:
      "Interactive WebGL piece built in response to Jeremy Blake's digital paintings.",
    longDescription:
      "A personal WebGL study inspired by Jeremy Blake. It uses shader-driven color fields that respond to pointer movement and run in the browser.",
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
  },
];

export function isActiveStatus(project: Pick<Project, "status">): boolean {
  return project.status === "Active" || project.status === "WIP";
}

export const rankedProjects = [...projects].sort(
  (a, b) =>
    (a.priority ?? Number.MAX_SAFE_INTEGER) -
    (b.priority ?? Number.MAX_SAFE_INTEGER),
);

export function getProjectStatusLabel(
  project: Pick<Project, "status">
): string | null {
  if (project.status === "Active") return "Active";
  if (project.status === "WIP") return "WIP";
  if (project.status === "Planned") return "Planned";
  return null;
}
