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
        "Building interfaces for a blogging and curation platform focused on organic internet culture.",
      responsibilities: [
        "Developing React/Next.js interfaces for blogs, archives, and multimedia moodboards.",
        "Collaborating on product decisions that prioritize user agency over engagement metrics.",
        "Shipping features that help users collect and share content without algorithmic interference.",
      ],
    },
    {
      title: "Research Assistant",
      company: "Auckland University of Technology",
      date: "Jan – Mar 2025",
      summary:
        "Prototyped mobile interfaces for AI-driven sleep stage classification research.",
      responsibilities: [
        "Designed React Native UI that communicates ML uncertainty without causing user anxiety.",
        "Created data visualizations that make complex sleep metrics understandable to non-experts.",
        "Contributed to research on explainable AI in personal health contexts.",
      ],
    },
    {
      title: "Design Engineer",
      company: "Freelance (ninetynine.digital)",
      date: "Apr 2023 – Present",
      summary:
        "End-to-end design and development for clients across fashion, food, and tech.",
      responsibilities: [
        "Shipped 6+ client sites including ecommerce (Shopify) and portfolios (Next.js, Sanity).",
        "Built Vape Quit Coach iOS app solo — 4.8★ rating, behavioral design approach.",
        "Reduced Goodness Gracious bakery site load time by 40% through performance optimization.",
        "Established ongoing relationships through clear communication and reliable delivery.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      date: "Nov 2022 – Apr 2023",
      summary:
        "Designed and built internal analytics dashboard used by 50+ data analysts.",
      responsibilities: [
        "Rebuilt Power BI workflows as a React/Next.js application with improved UX.",
        "Created Figma design system that reduced design-to-dev handoff friction.",
        "Reduced analyst time-to-insight by consolidating 4 tools into one unified interface.",
        "Collaborated with product and data teams in agile ceremonies and pair programming.",
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
