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

export const caseStudies: Record<string, CaseStudy> = {
  silk: {
    slug: "silk",
    title: "Silk",
    subtitle: "Interfaces for a slower, more intentional web",
    timeline: "Jun 2024 — Present",
    role: "Mobile Design Engineer",
    team: "Small team (< 10)",
    tools: ["React Native", "TypeScript", "Expo", "Tailwind CSS"],
    liveUrl: "https://silk.cx",
    overview:
      "Silk is a blogging and curation platform that rejects the engagement-metrics playbook. No algorithmic feeds, no targeted ads, no extraction. Just tools for collecting and sharing things you find interesting. I work on the frontend, building interfaces for blogs, private archives, and multimedia moodboards.",
    challenge:
      "Most social platforms optimize for time-on-site. Silk optimizes for something harder to measure: did you leave feeling like you gained something? The challenge is building interfaces that encourage thoughtfulness without feeling slow or frustrating. Every interaction needs to feel intentional, not addictive.",
    approach: [
      {
        title: "Restraint as Feature",
        description:
          "Where other platforms add notifications, infinite scroll, and engagement hooks, we deliberately leave them out. My job is often to advocate for less—fewer animations, fewer prompts, fewer reasons to stay longer than you intended.",
      },
      {
        title: "Content-First Interfaces",
        description:
          "The UI disappears behind what users create. Typography choices, spacing, and interaction patterns all serve the content. Moodboards feel like moodboards, not like 'moodboard software.'",
      },
      {
        title: "Calm Technology",
        description:
          "Borrowed from Amber Case's principles: technology should require the smallest possible amount of attention. Hover states are subtle. Transitions are quick. Nothing begs for interaction.",
      },
    ],
    outcome:
      "Silk has cultivated a small but dedicated community of writers, archivists, and people who remember when the web felt handmade. I've shipped features for blog customization, archive organization, and collaborative moodboards.",
    learnings: [
      "Working on a product with strong values teaches you what you actually care about in software.",
      "Sometimes the best feature is the one you don't build. Saying no is a design skill.",
      "Small teams mean owning decisions end-to-end. There's nowhere to hide.",
    ],
    nextProject: { slug: "vape-quit-coach", title: "Vape Quit Coach" },
  },
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
    githubUrl: "https://github.com/maxwellyoung/chlita",
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
    nextProject: { slug: "silk", title: "Silk" },
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
