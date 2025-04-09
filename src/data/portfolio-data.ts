export interface Node {
  id: string;
  name: string;
  group: string;
  x?: number;
  y?: number;
  value?: number; // Size of node
}

export interface Link {
  source: string;
  target: string;
  value?: number; // Strength of connection
  group?: string; // Type of connection
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

// Create nodes from your projects
const projectNodes: Node[] = [
  {
    id: "ivan-guzman",
    name: "Ivan Guzman | Writer & Cultural Strategist",
    group: "project",
    value: 30,
  },
  {
    id: "chlita",
    name: "Ch'lita | Fashion Designer & Stylist Portfolio",
    group: "project",
    value: 30,
  },
  {
    id: "man",
    name: "Metrosexual Awareness Night",
    group: "project",
    value: 30,
  },
  {
    id: "jeremy-blake",
    name: "Jeremy Blake Interactive Art Experience",
    group: "project",
    value: 30,
  },
  {
    id: "cinesync",
    name: "CineSync",
    group: "project",
    value: 30,
  },
  {
    id: "music",
    name: "Music Website",
    group: "project",
    value: 30,
  },
];

// Create skill nodes with different sizes based on usage
const skillNodes: Node[] = [
  { id: "nextjs", name: "Next.js", group: "skill", value: 25 },
  { id: "react", name: "React", group: "skill", value: 25 },
  { id: "typescript", name: "TypeScript", group: "skill", value: 20 },
  { id: "tailwind", name: "Tailwind CSS", group: "skill", value: 20 },
  { id: "framer-motion", name: "Framer Motion", group: "skill", value: 15 },
  { id: "threejs", name: "Three.js", group: "skill", value: 15 },
  { id: "webgl", name: "WebGL", group: "skill", value: 15 },
  { id: "sanity", name: "Sanity CMS", group: "skill", value: 15 },
  { id: "supabase", name: "Supabase", group: "skill", value: 15 },
  { id: "openai", name: "OpenAI", group: "skill", value: 15 },
  { id: "clerk", name: "Clerk", group: "skill", value: 10 },
];

// Create category nodes (larger to show hierarchy)
const categoryNodes: Node[] = [
  { id: "web", name: "Web Development", group: "category", value: 40 },
  { id: "ai", name: "AI/ML", group: "category", value: 35 },
  { id: "design", name: "UI/UX Design", group: "category", value: 35 },
  { id: "art", name: "Digital Art", group: "category", value: 35 },
  { id: "music", name: "Music", group: "category", value: 35 },
];

// Create links between projects and skills
const projectSkillLinks: Link[] = [
  // Ivan Guzman
  { source: "ivan-guzman", target: "nextjs", value: 1, group: "uses" },
  { source: "ivan-guzman", target: "react", value: 1, group: "uses" },
  { source: "ivan-guzman", target: "tailwind", value: 1, group: "uses" },
  { source: "ivan-guzman", target: "framer-motion", value: 1, group: "uses" },
  { source: "ivan-guzman", target: "sanity", value: 1, group: "uses" },

  // Ch'lita
  { source: "chlita", target: "nextjs", value: 1, group: "uses" },
  { source: "chlita", target: "react", value: 1, group: "uses" },
  { source: "chlita", target: "tailwind", value: 1, group: "uses" },
  { source: "chlita", target: "framer-motion", value: 1, group: "uses" },
  { source: "chlita", target: "sanity", value: 1, group: "uses" },

  // Metrosexual Awareness Night
  { source: "man", target: "react", value: 1, group: "uses" },
  { source: "man", target: "tailwind", value: 1, group: "uses" },
  { source: "man", target: "framer-motion", value: 1, group: "uses" },

  // Jeremy Blake
  { source: "jeremy-blake", target: "react", value: 1, group: "uses" },
  { source: "jeremy-blake", target: "threejs", value: 1, group: "uses" },
  { source: "jeremy-blake", target: "webgl", value: 1, group: "uses" },

  // CineSync
  { source: "cinesync", target: "nextjs", value: 1, group: "uses" },
  { source: "cinesync", target: "react", value: 1, group: "uses" },
  { source: "cinesync", target: "typescript", value: 1, group: "uses" },
  { source: "cinesync", target: "supabase", value: 1, group: "uses" },
  { source: "cinesync", target: "openai", value: 1, group: "uses" },
  { source: "cinesync", target: "clerk", value: 1, group: "uses" },

  // Music Website
  { source: "music", target: "react", value: 1, group: "uses" },
  { source: "music", target: "nextjs", value: 1, group: "uses" },
  { source: "music", target: "tailwind", value: 1, group: "uses" },
];

// Create links between skills to show relationships
const skillSkillLinks: Link[] = [
  // Frontend Framework Relationships
  { source: "react", target: "nextjs", value: 2, group: "related" },
  { source: "react", target: "framer-motion", value: 1, group: "related" },
  { source: "react", target: "typescript", value: 2, group: "related" },

  // 3D/Graphics Relationships
  { source: "threejs", target: "webgl", value: 2, group: "related" },

  // Backend/API Relationships
  { source: "nextjs", target: "sanity", value: 1, group: "related" },
  { source: "nextjs", target: "supabase", value: 1, group: "related" },

  // AI Stack
  { source: "openai", target: "typescript", value: 1, group: "related" },
  { source: "openai", target: "nextjs", value: 1, group: "related" },
];

// Create links between projects and categories
const projectCategoryLinks: Link[] = [
  // Ivan Guzman
  { source: "ivan-guzman", target: "web", value: 2, group: "belongs" },
  { source: "ivan-guzman", target: "design", value: 1, group: "belongs" },

  // Ch'lita
  { source: "chlita", target: "web", value: 2, group: "belongs" },
  { source: "chlita", target: "design", value: 2, group: "belongs" },

  // Metrosexual Awareness Night
  { source: "man", target: "web", value: 2, group: "belongs" },
  { source: "man", target: "design", value: 1, group: "belongs" },

  // Jeremy Blake
  { source: "jeremy-blake", target: "web", value: 1, group: "belongs" },
  { source: "jeremy-blake", target: "art", value: 2, group: "belongs" },

  // CineSync
  { source: "cinesync", target: "web", value: 2, group: "belongs" },
  { source: "cinesync", target: "ai", value: 2, group: "belongs" },

  // Music Website
  { source: "music", target: "web", value: 2, group: "belongs" },
  { source: "music", target: "music", value: 2, group: "belongs" },
];

// Create links between categories to show relationships
const categoryLinks: Link[] = [
  { source: "web", target: "design", value: 2, group: "related" },
  { source: "web", target: "ai", value: 1, group: "related" },
  { source: "art", target: "design", value: 1, group: "related" },
];

// Create links between skills and categories
const skillCategoryLinks: Link[] = [
  // Frontend skills → Web Development
  { source: "react", target: "web", value: 2, group: "belongs" },
  { source: "nextjs", target: "web", value: 2, group: "belongs" },
  { source: "tailwind", target: "web", value: 2, group: "belongs" },

  // Design-related
  { source: "framer-motion", target: "design", value: 2, group: "belongs" },

  // AI/ML tools
  { source: "openai", target: "ai", value: 2, group: "belongs" },

  // Graphics/Art
  { source: "threejs", target: "art", value: 2, group: "belongs" },
  { source: "webgl", target: "art", value: 2, group: "belongs" },
];

export const portfolioData: GraphData = {
  nodes: [...projectNodes, ...skillNodes, ...categoryNodes],
  links: [
    ...projectSkillLinks,
    ...skillSkillLinks,
    ...projectCategoryLinks,
    ...categoryLinks,
    ...skillCategoryLinks,
  ],
};
