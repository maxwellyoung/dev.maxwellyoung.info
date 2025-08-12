// lib/projects.ts

export type Status = "Completed" | "WIP" | "Planned";
export type Role =
  | "Solo"
  | "Lead"
  | "Collaborator"
  | "Frontend"
  | "Studio Collaboration";
export type Category = "Client" | "Personal" | "Studio" | "Experiment";

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
  tags?: string[]; // “Next.js”, “CMS”, “AI”
  stack?: string[]; // tech list
  client?: string; // if applicable
  redacted?: boolean; // NDA-friendly
  links?: Links;
  screenshots?: string[]; // /public paths
  thumb?: string; // primary image
  impact?: string[]; // outcomes / wins
  metrics?: Metrics;
  buildLog?: BuildLogEntry[]; // for WIP
}

export const projects: Project[] = [
  // ===== FEATURED =====
  {
    slug: "receiptradar",
    name: "ReceiptRadar",
    status: "WIP",
    category: "Personal",
    role: "Lead",
    featured: true,
    priority: 1,
    description:
      "Minimalist grocery intelligence: receipts → OCR → normalised line items + live prices.",
    longDescription:
      "React Native/Expo app with an OCR pipeline and supermarket price scraping. Keeping a fixed test set, tracking accuracy/freshness, and shipping a visible build log.",
    tags: ["Mobile", "AI/ML", "Scraping"],
    stack: ["React Native", "Expo", "TypeScript", "Node", "Playwright"],
    links: {
      // repo: '', // add when public
      video: "/projectVideos/receiptradar-demo.webm",
    },
    // images not yet in repo; keep gallery hidden until added
    screenshots: [],
    // thumb intentionally omitted
    impact: [
      "Prototype OCR to line-item parsing",
      "Price scraper for Countdown with health checks",
    ],
    metrics: {
      // ocrAccuracyPct:  __,
      // scraperRefreshMin: __,
    },
    buildLog: [
      {
        date: "2025-08-10",
        whatWorks: ["Receipt capture → text", "Countdown price scraper"],
        nextMilestone: "2025-08-18: normalise line-items + category mapping",
        openQuestion: "Lightweight accuracy metric for noisy OCR?",
      },
    ],
  },
  {
    slug: "chlita",
    name: "Ch’lita — Fashion Stylist Portfolio",
    status: "Completed",
    category: "Client",
    role: "Lead",
    featured: true,
    priority: 2,
    description:
      "Editorial Next.js + Sanity CMS with quiet motion and stable layout.",
    longDescription:
      "Author-friendly schema, responsive art direction (`srcset`/`sizes`/aspect-ratio), and a tight motion budget with Framer Motion for polish without jank.",
    tags: ["Frontend", "CMS"],
    stack: ["Next.js", "TypeScript", "Sanity", "Framer Motion", "Vercel"],
    client: "Ch’lita",
    links: {
      live: "https://chlita.com",
      repo: "https://github.com/maxwellyoung/chlita",
    },
    screenshots: [
      "/projectImages/chlita-1.webp",
      "/projectImages/chlita-2.webp",
      "/projectImages/chlita-3.webp",
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
    slug: "tytm8",
    name: "TYTM8 — Fashion Brand",
    status: "WIP",
    category: "Client",
    role: "Lead",
    featured: true,
    priority: 3,
    description:
      "Image-led brand site with editorial typography and lookbook tooling.",
    longDescription:
      "Refined brand experience: fast, image-led layouts, smart cropping, and a content model so lookbooks update without breaking the grid.",
    tags: ["Frontend", "CMS", "Brand"],
    stack: ["Next.js", "Sanity", "Framer Motion"],
    client: "TYTM8",
    links: {
      // live: '',
      // repo: '',
    },
    screenshots: [],
    // thumb intentionally omitted
    impact: [
      "Consistent lookbook grid",
      "Responsive art direction for imagery",
    ],
    buildLog: [
      {
        date: "2025-08-11",
        whatWorks: ["Lookbook schema", "Baseline grid + typographic scale"],
        nextMilestone: "2025-08-20: upload first collection + crop presets",
      },
    ],
  },
  {
    slug: "goodness-gracious",
    name: "Goodness Gracious — Shopify",
    status: "Completed",
    category: "Client",
    role: "Frontend",
    featured: true,
    priority: 4,
    description:
      "Shopify Liquid build with an editorial feel, shipped via New Territory Studio.",
    longDescription:
      "Translated comps faithfully, componentised sections, stabilised layout (aspect-ratio + font loading), and tuned spacing for a modern editorial tone.",
    tags: ["Shopify", "Frontend", "Studio Collaboration"],
    stack: ["Shopify Liquid", "CSS"],
    client: "Goodness Gracious (via New Territory Studio)",
    links: {
      live: "https://www.goodnessgracious.co.nz/",
    },
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

  // ===== STRONG SUPPORTING =====
  {
    slug: "pumpwatch-redacted",
    name: "Pumpwatch (Redacted)",
    status: "WIP",
    category: "Client",
    role: "Lead",
    redacted: true,
    featured: false,
    priority: 5,
    description:
      "Pre-launch brand/ops site: CMS + perf hardening in a 2-week sprint.",
    longDescription:
      "Maintainable content model, aspect-ratio hints, font-loading strategy, previews/analytics. Visuals redacted; outcomes shareable privately.",
    tags: ["Frontend", "CMS", "Perf"],
    stack: ["Next.js", "TypeScript", "Sanity", "Vercel"],
    links: {
      // private demo only
    },
    impact: ["Authors publish in ~10–15 min", "CLS ~0 via explicit ratios"],
    metrics: {
      // cls: 0.01,
      // lighthouseMobile: 90,
    },
    buildLog: [
      {
        date: "2025-08-11",
        whatWorks: [
          "Content model",
          "Preview + analytics",
          "Aspect-ratio pass",
        ],
        nextMilestone: "2025-08-19: author training + final polish",
      },
    ],
  },
  {
    slug: "dayle",
    name: "Dayle — Personal Site",
    status: "Planned",
    category: "Client",
    role: "Lead",
    featured: false,
    priority: 6,
    description:
      "Minimal, spacious portfolio with typographic pacing and quiet motion.",
    longDescription:
      "Type-first layout, sensible rhythm, and just enough motion to feel intentional. Built to disappear and let the work lead.",
    tags: ["Frontend", "Portfolio"],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    links: {
      // live: '',
    },
    screenshots: [],
    // thumb intentionally omitted
  },
  {
    slug: "strawhouse",
    name: "Strawhouse — Gallery Site",
    status: "WIP",
    category: "Client",
    role: "Lead",
    featured: false,
    priority: 7,
    description: "Gallery CMS with show calendar and press entries.",
    longDescription:
      "Sanity schema for shows/artists, date-driven listings, and a clean editorial presentation; built for fast updates by non-technical staff.",
    tags: ["Frontend", "CMS", "Gallery"],
    stack: ["Next.js", "TypeScript", "Sanity"],
    links: {
      // live: '',
    },
    screenshots: [],
    // thumb intentionally omitted
  },
  {
    slug: "american-style",
    name: "American Style — Brand",
    status: "Planned",
    category: "Client",
    role: "Lead",
    featured: false,
    priority: 8,
    description: "Brand site with image-led lookbooks and lean motion.",
    tags: ["Frontend", "CMS", "Brand"],
    stack: ["Next.js", "Sanity", "Framer Motion"],
    screenshots: [],
    // thumb intentionally omitted
  },

  // ===== MORE WORK =====
  {
    slug: "ivan-guzman",
    name: "Ivan Guzman — Writer & Cultural Strategist",
    status: "Completed",
    category: "Client",
    role: "Lead",
    featured: false,
    priority: 9,
    description: "Sleek portfolio with Sanity CMS and modern UI.",
    longDescription:
      "Next.js + Tailwind + Framer Motion + Sanity. Built an authorable, typographic site that gets out of the way of the writing.",
    tags: ["Frontend", "CMS"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity"],
    links: {
      live: "https://ivan-guzman.com/",
    },
    screenshots: ["/projectImages/ivan-1.webp"],
    thumb: "/projectImages/ivan-1.webp",
  },
  {
    slug: "metrosexual-awareness-night",
    name: "Metrosexual Awareness Night",
    status: "Completed",
    category: "Personal",
    role: "Solo",
    featured: false,
    priority: 10,
    description:
      "Flashy event site with countdown + pink-gradient poster vibe.",
    tags: ["Web", "Event", "CSS Animations"],
    stack: ["Next.js", "TypeScript", "CSS"],
    links: {
      live: "https://metrosexualawareness.com",
      repo: "https://github.com/maxwellyoung/man",
    },
    screenshots: ["/projectImages/man1.webp", "/projectImages/man2.webp"],
    thumb: "/projectImages/man1.webp",
  },
  {
    slug: "jeremy-blake",
    name: "Jeremy Blake — Interactive Art",
    status: "Completed",
    category: "Experiment",
    role: "Solo",
    featured: false,
    priority: 11,
    description: "Three.js color-field world; input-driven shader transitions.",
    longDescription:
      "GPU-friendly passes and input-modulated parameters tuned for 60fps on modest laptops. Design as mood, code as instrument.",
    tags: ["Creative Coding", "WebGL"],
    stack: ["React", "Three.js", "WebGL"],
    links: {
      live: "https://jeremy-blake.vercel.app/",
      repo: "https://github.com/maxwellyoung/jeremy-blake",
    },
    screenshots: ["/projectImages/blake.webp", "/projectImages/blake2.webp"],
    thumb: "/projectImages/blake.webp",
  },
  {
    slug: "cinesync",
    name: "CineSync",
    status: "WIP",
    category: "Personal",
    role: "Lead",
    featured: false,
    priority: 12,
    description:
      "AI-assisted film discovery with watchlists and shareable recs.",
    longDescription:
      "Next.js + Supabase prototype exploring preference capture and mood-based recommendations with lightweight embeddings.",
    tags: ["AI", "Web App"],
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    links: {
      live: "https://cinesync-peach.vercel.app/",
      video: "/projectVideos/cinesync-demo.webm",
    },
    screenshots: [
      "/projectImages/cinesync1.webp",
      "/projectImages/cinesync2.webp",
    ],
    thumb: "/projectImages/cinesync1.webp",
  },
  {
    slug: "music-site",
    name: "Music Website",
    status: "Completed",
    category: "Personal",
    role: "Lead",
    featured: false,
    priority: 13,
    description:
      "My music catalogue: albums, singles, videos in a clean wrapper.",
    tags: ["Frontend", "Portfolio"],
    stack: ["Next.js", "Tailwind CSS"],
    links: {
      live: "https://music.maxwellyoung.info",
      repo: "https://github.com/maxwellyoung/music_maxwell",
    },
  },
];
