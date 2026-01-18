// lib/projects.ts

export type Status = "Completed" | "WIP" | "Planned" | "Active";
export type Role =
  | "Solo"
  | "Lead"
  | "Collaborator"
  | "Frontend"
  | "Studio Collaboration";
// Unified categories - lowercase versions for filtering, title case for display
export type Category =
  | "Client"
  | "Personal"
  | "Studio"
  | "Experiment"
  | "studio"
  | "personal"
  | "research";

export interface BuildLogEntry {
  date: string; // ISO date
  whatWorks: string[]; // shipped bits
  nextMilestone?: string; // “by 2025-08-18: …”
  openQuestion?: string; // thing you’re exploring
}

export interface Metrics {
  lighthouseMobile?: number; // 0–100
  lcpMs?: number;
  cls?: number;
  bundleKB?: number;
  ocrAccuracyPct?: number; // RR specific
  scraperRefreshMin?: number; // RR specific
}

export interface Links {
  live?: string;
  repo?: string;
  video?: string; // mp4/webm
}

export interface Project {
  slug: string; // stable id for routes
  name: string;
  status: Status;
  category: Category;
  role?: Role;
  description: string; // short card copy
  longDescription?: string; // case page
  startDate?: string; // ISO
  endDate?: string; // ISO
  featured?: boolean; // show on home
  priority?: number; // lower = earlier in lists
  tags?: string[]; // "Next.js", "CMS", "AI"
  stack?: string[]; // tech list
  client?: string; // if applicable
  redacted?: boolean; // NDA-friendly
  links?: Links;
  screenshots?: string[]; // /public paths
  thumb?: string; // primary image
  impact?: string[]; // outcomes / wins
  metrics?: Metrics;
  buildLog?: BuildLogEntry[]; // for WIP
  caseStudySlug?: string; // route to case study page
  // Legacy compat fields (derived from links)
  link?: string; // alias for links.live
  codeLink?: string; // alias for links.repo
}

export const projects: Project[] = [
  // ===== RESEARCH & EXPLORATION =====
  {
    slug: "silk",
    name: "Silk",
    status: "Active",
    category: "research",
    role: "Lead",
    featured: true,
    priority: 0,
    description:
      "Cross-platform blogging system that rejects engagement metrics. No feeds, no ranking, no infinite scroll. Designing usefulness without addiction mechanics is harder than optimizing CTR.",
    longDescription:
      "Silk is a blogging and curation platform where I build the React Native frontend. The product philosophy is the constraint: no algorithmic feeds, no engagement optimization, no extraction. That means every feature has to justify itself on usefulness alone—not stickiness. I ship interfaces for blogs, private archives, and multimedia moodboards. When you can't rely on dark patterns, the UX has to actually work.",
    tags: ["React Native", "TypeScript", "Expo"],
    stack: ["React Native", "TypeScript", "Expo"],
    startDate: "2024-06-01",
    caseStudySlug: "silk",
    screenshots: ["/projectImages/silk-1.webp", "/projectImages/silk-2.webp"],
    thumb: "/projectImages/silk-1.webp",
    links: {
      live: "https://www.silk.cx",
    },
    link: "https://www.silk.cx",
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
      "Solo-built iOS app for quitting vaping. 4.8★ rating. I refused to build guilt mechanics, streak anxiety, or shame-based motivation. Instead: behavioral architecture that makes the right choice feel obvious, not heroic.",
    longDescription:
      "Most health apps weaponize guilt. Daily streaks that punish you for slipping. Progress bars that make failure visible. I refused to build any of that. Vape Quit Coach treats addiction as a design problem, not a willpower problem. The interface uses liminal states, identity-based progress, and environmental cues—not shame. Solo-built from zero: React Native, Expo, end-to-end. 4.8★ on the App Store. What I learned: shame-based design is lazy design. If your app needs to make users feel bad to work, you haven't solved the problem.",
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
  },
  // ===== FEATURED =====
  {
    slug: "chlita",
    name: "Ch'lita — Fashion Stylist Portfolio",
    status: "Completed",
    category: "studio",
    role: "Lead",
    featured: true,
    priority: 2,
    description:
      "Portfolio for a stylist (Rosalia, The Dare). Sanity CMS, zero layout shift. The site disappears behind the images.",
    longDescription:
      "Built for Ch'lita, whose clients include some of music's most visually striking artists. The brief was simple: let the imagery lead. Sanity CMS for her to update, responsive art direction that doesn't crop poorly, and just enough motion to feel alive.",
    tags: ["Next.js", "Sanity CMS", "Fashion", "Art Direction"],
    stack: ["Next.js", "TypeScript", "Sanity", "Framer Motion", "Vercel"],
    client: "Ch'lita",
    caseStudySlug: "chlita",
    links: {
      live: "https://chlita.com",
      repo: "https://github.com/maxwellyoung/chlita",
    },
    link: "https://chlita.com",
    codeLink: "https://github.com/maxwellyoung/chlita",
    screenshots: [
      "/projectImages/chlita-1.webp",
      "/projectImages/chlita-2.webp",
      "/projectImages/chlita-3.webp",
      "/projectImages/chlita-4.webp",
      "/projectImages/chlita-5.webp",
    ],
    thumb: "/projectImages/chlita-1.webp",
    impact: [
      "Authoring time down via schema-driven project templates",
      "CLS stabilised with aspect-ratio hints + responsive art direction",
    ],
    metrics: {
      // lighthouseMobile: 90,
      // cls: 0.01,
    },
  },
  {
    slug: "goodness-gracious",
    name: "Goodness Gracious — Shopify",
    status: "Completed",
    category: "studio",
    role: "Frontend",
    featured: true,
    priority: 3,
    description:
      "Shopify site for an Auckland bakery. 40% faster load time. Built with New Territory Studio.",
    longDescription:
      "Goodness Gracious is a beloved Auckland bakery. The site needed to match the feeling of walking in — warm, unhurried, inviting. Shopify Liquid, careful typography, and layouts that don't jump around as images load.",
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
    impact: [
      "CLS stabilised across hero/media sections",
      "Reusable, section-based theme",
    ],
  },

  // ===== MORE WORK =====
  {
    slug: "ivan-guzman",
    name: "Ivan Guzman — Writer & Cultural Strategist",
    status: "Completed",
    category: "studio",
    role: "Lead",
    featured: false,
    priority: 4,
    description: "Sleek portfolio with Sanity CMS and modern UI.",
    longDescription:
      "Next.js + Tailwind + Framer Motion + Sanity. Built an authorable, typographic site that gets out of the way of the writing.",
    tags: ["Next.js", "Sanity CMS", "Content Modeling"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity"],
    links: {
      live: "https://ivan-guzman.com/",
    },
    link: "https://ivan-guzman.com/",
    screenshots: ["/projectImages/ivan-1.webp"],
    thumb: "/projectImages/ivan-1.webp",
  },
  {
    slug: "jeremy-blake",
    name: "Jeremy Blake — Interactive Art",
    status: "Completed",
    category: "personal",
    role: "Solo",
    featured: true,
    priority: 6,
    description:
      "An interactive tribute to the color-field artist. Move your cursor; the colors respond.",
    longDescription:
      "Jeremy Blake made digital paintings that breathed. This is my attempt to capture that feeling — shaders that respond to your presence, tuned to run smoothly even on modest hardware. Art as code, code as instrument.",
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
  {
    slug: "cinesync",
    name: "CineSync",
    status: "Completed",
    category: "personal",
    role: "Solo",
    featured: false,
    priority: 7,
    description:
      "Film discovery that learns your taste. Tell it a mood; it finds the movie.",
    longDescription:
      "A quiet experiment in recommendation. You describe what you're feeling, it suggests films. Built with Supabase and lightweight embeddings — trying to make AI feel less like a feature and more like a knowledgeable friend.",
    tags: ["Next.js", "Supabase", "AI", "Embeddings"],
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    links: {
      live: "https://cinesync-peach.vercel.app/",
      video: "/projectVideos/cinesync-demo.webm",
    },
    link: "https://cinesync-peach.vercel.app/",
    screenshots: [
      "/projectImages/cinesync1.webp",
      "/projectImages/cinesync2.webp",
      "/projectImages/cinesync3.webp",
    ],
    thumb: "/projectImages/cinesync1.webp",
  },
  {
    slug: "music-maxwell",
    name: "Music Site — Artist Portfolio",
    status: "Completed",
    category: "personal",
    role: "Solo",
    featured: true,
    priority: 8,
    description:
      "A personal music hub with collectibles, listening rooms, and community features. Full-stack Next.js.",
    longDescription:
      "Built as a home for my music — not just a landing page, but a space. Collectible digital items, listening rooms with real-time features via Pusher, a forum for conversation, and a shop powered by Shopify. Three.js visuals where they matter, Clerk auth, Prisma + Neon for the data layer. The kind of site I'd want as a fan.",
    tags: ["Next.js", "Prisma", "Three.js", "Real-time", "Shopify"],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Neon",
      "Clerk",
      "Pusher",
      "Three.js",
      "Shopify",
      "Tailwind",
    ],
    links: {
      live: "https://music.maxwellyoung.info",
      repo: "https://github.com/maxwellyoung/music_maxwell",
    },
    link: "https://music.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/music_maxwell",
    screenshots: [
      "/projectImages/music-1.webp",
      "/projectImages/music-2.webp",
      "/projectImages/music-3.webp",
    ],
    thumb: "/projectImages/music-1.webp",
  },
  ];
