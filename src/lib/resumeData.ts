type ResumeData = {
  name: string;
  title: string;
  availability?: string;
  contact: {
    email: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
  };
  selectedWork: { title: string; href: string }[];
  experience: {
    title: string;
    company: string;
    date: string;
    responsibilities: string[];
    metric?: string;
    summary?: string;
  }[];
  education: { degree: string; institution: string; date: string }[];
  skills: { category: string; items: string[] }[];
  socials: { name: string; url: string }[];
};

export const resumeData: ResumeData = {
  name: "Maxwell Young",
  title: "Design Engineer",
  availability: "Open to opportunities · NZ / Remote",
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland, NZ",
    website: "dev.maxwellyoung.info",
    github: "github.com/maxwellyoung",
    linkedin: "linkedin.com/in/maxwell-young-a55032125",
  },
  selectedWork: [
    {
      title: "Silk — Frontend Engineer",
      href: "https://silk.cx",
    },
    {
      title: "Vape Quit Coach — iOS App (4.8★)",
      href: "https://vapequitcoach.com",
    },
    {
      title: "Ch'lita — Fashion Stylist Portfolio",
      href: "https://chlita.com",
    },
    {
      title: "Jeremy Blake — Interactive WebGL Art",
      href: "https://jeremy-blake.vercel.app",
    },
  ],
  experience: [
    {
      title: "Frontend Engineer",
      company: "Silk",
      date: "Jun 2024 – Present",
      summary:
        "React Native frontend for a blogging platform that rejects engagement metrics.",
      responsibilities: [
        "Built interfaces for blogs, archives, and moodboards—no infinite scroll, no algorithmic feed.",
        "Shipped multimedia upload and private archive features across iOS/Android/web.",
      ],
    },
    {
      title: "Research Assistant",
      company: "Auckland University of Technology",
      date: "Jan – Mar 2025",
      summary:
        "Prototyped mobile UI for AI-driven sleep research. Problem: ML outputs uncertainty that scares users.",
      responsibilities: [
        "Designed visualizations that communicate prediction confidence without triggering health anxiety.",
        "Contributed to explainable AI research—how to show 'the model isn't sure' without eroding trust.",
      ],
    },
    {
      title: "Design Engineer",
      company: "Freelance (ninetynine.digital)",
      date: "Apr 2023 – Present",
      summary:
        "Solo design + dev for clients in fashion, food, and tech. 6+ sites shipped.",
      responsibilities: [
        "Vape Quit Coach (iOS): solo-built, 4.8★. Refused guilt mechanics—used behavioral architecture instead.",
        "Goodness Gracious (Shopify): 40% faster load time via image optimization and CLS fixes.",
        "Ch'lita (Next.js/Sanity): zero-layout-shift portfolio for a stylist with major-label clients.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      date: "Nov 2022 – Apr 2023",
      summary:
        "Internal analytics dashboard for 50+ data analysts. Consolidated 4 tools → 1.",
      responsibilities: [
        "Replaced Power BI workflows with React/Next.js app—faster iteration, better UX.",
        "Built Figma design system that cut design-to-dev handoff time.",
      ],
    },
  ],
  education: [
    {
      degree:
        "B.Sc. Computer & Information Sciences (Software Development, Data Science)",
      institution: "Auckland University of Technology",
      date: "2024 – 2026 (Expected)",
    },
    {
      degree: "Certificate in Web Development (Level 6)",
      institution: "Dev Academy Aotearoa",
      date: "2022",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo", "Swift/SwiftUI"],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "REST APIs",
        "Vercel",
        "AWS",
      ],
    },
    {
      category: "Design",
      items: [
        "Figma",
        "Design Systems",
        "Interaction Design",
        "Prototyping",
      ],
    },
    {
      category: "Data",
      items: [
        "Python",
        "Pandas",
        "SQL",
        "R",
        "Jupyter",
      ],
    },
    {
      category: "Also",
      items: [
        "Three.js/WebGL",
        "Accessibility (WCAG)",
        "Performance (Core Web Vitals)",
        "Docker",
        "CI/CD",
      ],
    },
  ],
  socials: [
    { name: "Website", url: "https://dev.maxwellyoung.info" },
    { name: "GitHub", url: "https://github.com/maxwellyoung" },
    { name: "LinkedIn", url: "https://linkedin.com/in/maxwell-young-a55032125" },
  ],
};
