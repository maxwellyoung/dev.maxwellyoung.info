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
    companyHref?: string;
    date: string;
    responsibilities: string[];
    metric?: string;
    summary?: string;
  }[];
  education: {
    degree: string;
    institution: string;
    institutionHref?: string;
    date: string;
  }[];
  skills: { category: string; items: string[] }[];
  socials: { name: string; url: string }[];
};

export const resumeData: ResumeData = {
  name: "Maxwell Young",
  title: "Design Engineer",
  availability: "Auckland, NZ",
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland, NZ",
    website: "dev.maxwellyoung.info",
    github: "github.com/maxwellyoung",
    linkedin: "linkedin.com/in/maxwell-young-a55032125",
  },
  selectedWork: [
    {
      title: "Silk — Mobile Design Engineer",
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
    {
      title: "Doomscroll — iOS Spaced Repetition App",
      href: "https://apps.apple.com/app/id6759280323",
    },
    {
      title: "Dry Club — Sober Social Companion",
      href: "https://dryclub.app",
    },
  ],
  experience: [
    {
      title: "Mobile Design Engineer",
      company: "Silk",
      companyHref: "https://www.silk.cx/",
      date: "Jun 2024 – Present",
      summary:
        "React Native frontend for a blogging platform that rejects engagement metrics.",
      responsibilities: [
        "Built interfaces for blogs, archives, and moodboards—no algorithmic feed, no engagement optimization.",
        "Shipped multimedia upload and private archive features across iOS/Android/web.",
      ],
    },
    {
      title: "Bachelor's Student",
      company: "Auckland University of Technology",
      companyHref: "https://www.aut.ac.nz/",
      date: "2025 – Present",
      summary:
        "AUT Computer Science bachelor's degree. Research in explainable AI for health apps. Also building Liner (spatial music canvas) as final-year project.",
      responsibilities: [
        "Designing visualizations that communicate ML model uncertainty without triggering health anxiety.",
        "Building Liner — a spatial canvas for music — as the R&D project: tldraw infinite canvas, audio playback, Convex sync.",
        "Courses: AI, HCI, Special Topics, R&D Project.",
      ],
    },
    {
      title: "Design Engineer",
      company: "Freelance (ninetynine.digital)",
      companyHref: "https://www.ninetynine.digital/",
      date: "Apr 2023 – Present",
      summary:
        "Solo design + dev for clients in fashion, food, and tech. 7+ sites shipped.",
      responsibilities: [
        "Vape Quit Coach (iOS): solo-built, 4.8★. Refused guilt mechanics—used behavioral architecture instead.",
        "Goodness Gracious (Shopify): 40% faster load time via image optimization and CLS fixes.",
        "Ch'lita (Next.js/Sanity): zero-layout-shift portfolio for a stylist with major-label clients.",
        "Dayle (Next.js/Sanity): artist portfolio with CMS-driven works and writing sections.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      companyHref: "https://www.spark.co.nz/",
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
      institutionHref: "https://www.aut.ac.nz/",
      date: "2024 – 2026 (Expected)",
    },
    {
      degree: "Certificate in Web Development (Level 6)",
      institution: "Dev Academy Aotearoa",
      institutionHref: "https://devacademy.co.nz/",
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
      items: ["React Native", "Expo", "SwiftUI", "RevenueCat", "EAS Build"],
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
      category: "AI/ML",
      items: ["Claude API", "VisionKit", "CoreML", "OCR"],
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
    { name: "Portfolio — dev.maxwellyoung.info", url: "https://dev.maxwellyoung.info" },
    { name: "GitHub", url: "https://github.com/maxwellyoung" },
    { name: "LinkedIn", url: "https://linkedin.com/in/maxwell-young-a55032125" },
  ],
};
