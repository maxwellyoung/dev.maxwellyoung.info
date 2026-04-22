type ResumeData = {
  name: string;
  title: string;
  contact: {
    email: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
  };
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
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland, NZ",
    website: "dev.maxwellyoung.info",
    github: "github.com/maxwellyoung",
    linkedin: "linkedin.com/in/maxwell-young-a55032125",
  },
  experience: [
    {
      title: "Research Assistant",
      company: "University of Auckland",
      companyHref: "https://www.auckland.ac.nz/",
      date: "2026",
      summary:
        "Funded research app work supporting a medical research project.",
      responsibilities: [
        "Built product and interface work for a funded medical research application.",
        "Contributed implementation and UX decisions for a research-facing software tool.",
      ],
    },
    {
      title: "Research Assistant",
      company: "Auckland University of Technology",
      companyHref: "https://www.aut.ac.nz/",
      date: "Jan 2025 – Mar 2025",
      summary:
        "Funded sleep-app research work with AUT.",
      responsibilities: [
        "Worked on a sleep-focused research app as part of a funded university project.",
        "Supported product development and interface implementation for the research team.",
      ],
    },
    {
      title: "Mobile Design Engineer",
      company: "Silk",
      companyHref: "https://www.silk.cx/",
      date: "Jun 2024 – Present",
      summary:
        "React Native product work across publishing, archives, and media-heavy flows.",
      responsibilities: [
        "Contribute to interfaces for publishing, archives, and media-heavy mobile flows.",
        "Work across iOS and Android React Native features alongside a small team.",
      ],
    },
    {
      title: "Design Engineer",
      company: "ninetynine.digital",
      companyHref: "https://www.ninetynine.digital/",
      date: "Apr 2023 – Present",
      summary:
        "Independent studio. Client sites and my own products.",
      responsibilities: [
        "Built and shipped Vape Quit Coach for iOS in React Native and Expo.",
        "Built Liner, a spatial canvas for music, with tldraw, audio playback, and Convex sync.",
        "Portfolio and CMS work for Ch'lita and Dayle in Next.js and Sanity.",
        "Shopify performance and layout stability for Goodness Gracious.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      companyHref: "https://www.spark.co.nz/",
      date: "Nov 2022 – Apr 2023",
      summary:
        "Internal analytics dashboard work for Spark's data intelligence team.",
      responsibilities: [
        "Helped replace Power BI workflows with a React and Next.js dashboard.",
        "Built interface patterns and design system components for the team.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer & Information Sciences",
      institution: "Auckland University of Technology",
      institutionHref: "https://www.aut.ac.nz/",
      date: "2024 – 2026",
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
      category: "Frontend & Mobile",
      items: [
        "TypeScript",
        "React",
        "React Native",
        "Next.js",
        "Expo",
        "SwiftUI",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend & Data",
      items: [
        "Node.js",
        "PostgreSQL",
        "Convex",
        "Supabase",
        "Prisma",
        "Python",
      ],
    },
    {
      category: "Design",
      items: ["Figma", "Design Systems", "Interaction Design", "Prototyping"],
    },
    {
      category: "Also",
      items: [
        "Three.js / WebGL",
        "Accessibility (WCAG)",
        "Performance (Core Web Vitals)",
        "Claude API",
      ],
    },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/maxwellyoung" },
    { name: "LinkedIn", url: "https://linkedin.com/in/maxwell-young-a55032125" },
  ],
};
