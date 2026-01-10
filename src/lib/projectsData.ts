export interface Project {
  name: string;
  status: string;
  description: string;
  longDescription?: string;
  screenshots?: string[];
  link?: string;
  codeLink?: string;
  caseStudySlug?: string;
  startDate?: string;
  tags?: string[];
  category?: "studio" | "personal" | "research";
  featured?: boolean;
}

export const projects: Project[] = [
  // === RESEARCH & EXPLORATION ===
  // The work that says something about where I'm going

  {
    name: "Silk",
    status: "Active",
    description:
      "Frontend engineer on the team building a platform for organic internet culture. Blogs, archives, moodboards—tools for people who miss when the web felt handmade.",
    longDescription:
      "Silk is a blogging and curation platform that rejects the engagement-metrics playbook. No targeted ads, no algorithmic feeds, no extraction. Just tools for collecting and sharing things you find interesting. I work on the frontend—building interfaces for blogs, private archives, and multimedia moodboards. The philosophy matters as much as the code: we're building for critical thought and organic connection, not infinite scroll.",
    link: "https://www.silk.cx",
    caseStudySlug: "silk",
    startDate: "2024-06-01",
    category: "research",
    featured: true,
    tags: ["Next.js", "TypeScript", "React"],
  },
  {
    name: "Sleep Architecture Research",
    status: "Completed",
    description:
      "Completed interface prototypes for AI-driven sleep analysis at AUT. What happens when machine learning meets the most personal data we have?",
    longDescription:
      "Research at AUT: mobile interfaces for AI-based sleep classification. The ML is the easy part. The hard part is communicating uncertainty without causing anxiety. Most health apps lie with false precision. I tried not to. What I learned: health interfaces need a different vocabulary than productivity software. You can't 'optimize' sleep the way you 'optimize' a workflow. The goal is understanding, not gamification.",
    startDate: "2025-01-01",
    category: "research",
    featured: false,
    tags: ["React Native", "Python", "ML", "Health Tech", "Research"],
    // No screenshots yet - research complete
  },
  {
    name: "Jeremy Blake — Interactive Art",
    status: "Completed",
    description:
      "WebGL tribute where the art responds to you. Code as instrument, not illustration.",
    longDescription:
      "Interactive web installation inspired by digital painter Jeremy Blake, who made color-field animations that felt like looking into something alive. Built with React and Three.js using custom GLSL shaders. The colors shift in response to your cursor—turning the piece from something you observe into something you play. This project taught me that performance optimization is a creative constraint: the smoothness of the interaction is inseparable from its emotional effect.",
    link: "https://jeremy-blake.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/jeremy-blake",
    startDate: "2023-01-15",
    category: "personal",
    featured: true,
    tags: ["React", "Three.js", "WebGL", "GLSL", "Interactive Art"],
    screenshots: ["/projectImages/blake.webp", "/projectImages/blake2.webp"],
  },
  {
    name: "Vape Quit Coach",
    status: "Active",
    description:
      "Behavior change as architecture, not willpower. 4.8 rating, solo-built.",
    longDescription:
      "An iOS app for quitting vaping that reframes addiction as a design problem. Most health apps use motivation and guilt—I refused to build that. Instead: behavioral architecture. Liminal states. Progress as identity, not willpower. What I learned: shame-based design is lazy design. The interface should make the right choice feel obvious, not heroic. Every pixel was a decision I owned.",
    screenshots: ["/projectImages/vqc-1.webp", "/projectImages/vqc-2.webp", "/projectImages/vqc-3.webp", "/projectImages/vqc-4.webp", "/projectImages/vqc-5.webp"],
    startDate: "2024-01-01",
    link: "https://vapequitcoach.com",
    caseStudySlug: "vape-quit-coach",
    category: "personal",
    featured: true,
    tags: ["React Native", "Expo", "Behavior Design", "Mobile App"],
  },

  // === STUDIO WORK ===
  // Client projects that demonstrate craft in service of others

  {
    name: "Ch'lita — Fashion Stylist",
    status: "Completed",
    description:
      "A portfolio that gets out of the way. When your client works with Rosalia and The Dare, the site's job is to disappear.",
    longDescription:
      "Portfolio for fashion stylist Ch'lita, whose clients include Rosalia and The Dare. I killed every feature I wanted to add. Fancy transitions? Cut. Scroll effects? Cut. The client's work is better than any animation I could write. What I shipped: image-first layouts, zero layout shift, responsive art direction that doesn't butcher crops. The site disappears behind the content. That's not failure—that's the job.",
    link: "https://chlita.com",
    codeLink: "https://github.com/maxwellyoung/chlita",
    caseStudySlug: "chlita",
    screenshots: [
      "/projectImages/chlita-1.webp",
      "/projectImages/chlita-2.webp",
      "/projectImages/chlita-3.webp",
      "/projectImages/chlita-4.webp",
      "/projectImages/chlita-5.webp",
    ],
    category: "studio",
    tags: ["Next.js", "Sanity CMS", "Fashion", "Art Direction"],
  },
  {
    name: "Ivan Guzman — Writer Portfolio",
    status: "Completed",
    description:
      "CMS architecture for a writer who thinks in weeks, not sprints. He publishes without touching code.",
    longDescription:
      "Built a dynamic portfolio for cultural strategist Ivan Guzman. The real work wasn't the code—it was designing a content model that matches how writers actually think. Categories, tags, related work, publication states. He now publishes articles weekly without developer help. The best CMS is invisible.",
    link: "https://ivan-guzman.com/",
    screenshots: ["/projectImages/ivan-1.webp"],
    category: "studio",
    tags: ["Next.js", "Sanity CMS", "Content Modeling"],
  },
  {
    name: "Goodness Gracious — Bakery",
    status: "Completed",
    description:
      "Shopify rebuild for Auckland's favorite bakery. Made it faster by removing things.",
    longDescription:
      "Full redesign and Shopify build for a beloved Auckland bakery. The brief was speed—the old site was slow enough to lose customers. The solution was subtraction: fewer plugins, simpler checkout, mobile-first architecture. Result: 40% faster page loads and a site the client can actually update themselves. Sometimes the best feature is the one you delete.",
    screenshots: [
      "/projectImages/goodness-1.webp",
      "/projectImages/goodness-2.webp",
    ],
    startDate: "2024-05-01",
    link: "https://www.goodnessgracious.co.nz/",
    category: "studio",
    tags: ["Shopify", "Performance", "Ecommerce"],
  },

  // === EXPERIMENTS ===
  // Smaller things that show range

  {
    name: "CineSync",
    status: "WIP",
    description:
      "Film discovery by mood, not genre. Making AI feel like a friend who's seen everything.",
    longDescription:
      "Film discovery that understands vibes, not just categories. Describe what you're feeling, get recommendations that actually fit. Built with Next.js, Supabase, and lightweight embeddings. The goal: make AI feel less like a feature and more like a knowledgeable friend who happens to have seen 10,000 movies.",
    startDate: "2023-04-01",
    category: "personal",
    tags: ["Next.js", "Supabase", "AI", "Embeddings"],
    link: "https://cinesync-peach.vercel.app/",
    screenshots: [
      "/projectImages/cinesync1.webp",
      "/projectImages/cinesync2.webp",
      "/projectImages/cinesync3.webp",
    ],
  },
  {
    name: "Metrosexual Awareness Night",
    status: "Completed",
    description:
      "Event site that refuses to take itself seriously. Sometimes you just build something fun.",
    longDescription:
      "Sometimes you just build something fun. Event site with live countdown, shooting star effects, and a pink gradient that would make Hipster Runoff proud. Built in a weekend because the event needed a home and I wanted to write some CSS animations that made me smile.",
    link: "https://metrosexualawareness.com",
    startDate: "2024-10-11",
    category: "personal",
    tags: ["Next.js", "CSS Animations", "Event"],
    screenshots: ["/projectImages/man1.webp", "/projectImages/man2.webp"],
    codeLink: "https://github.com/maxwellyoung/man",
  },
  {
    name: "Music Website",
    status: "Completed",
    description:
      "Personal music portfolio. Built because Linktree wasn't cutting it and I wanted control.",
    longDescription:
      "Personal site for my music. Albums, singles, collaborations, videos—all in one place that I actually control. Built because Linktree felt impersonal and Spotify's artist pages are too limiting when you want to tell a story about your work.",
    link: "https://music.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/music_maxwell",
    startDate: "2022-01-01",
    category: "personal",
    tags: ["Next.js", "Tailwind CSS", "Music"],
  },
];
