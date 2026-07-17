type ResumeData = {
  name: string;
  title: string;
  profile: string;
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
  openSourceContributions: {
    project: string;
    role: string;
    href: string;
    date: string;
    summary: string;
    proof: string;
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
  profile:
    "Product-minded design engineer building mobile and web interfaces with React Native and React. I focus on clear interaction states, accessible systems, and software that holds up on real devices.",
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland, NZ",
    website: "dev.maxwellyoung.info",
    github: "github.com/maxwellyoung",
    linkedin: "linkedin.com/in/maxwell-young-a55032125",
  },
  experience: [
    {
      title: "Software Research Assistant",
      company: "University of Auckland",
      companyHref: "https://www.auckland.ac.nz/",
      date: "Apr 2026 – Present",
      summary:
        "Building traceable software for safer-medicines research workflows.",
      responsibilities: [
        "Turn research rules and source material into structured, reviewable software workflows.",
        "Build prototypes that preserve provenance and support careful human review.",
      ],
    },
    {
      title: "Software Research Assistant",
      company: "Auckland University of Technology",
      companyHref: "https://www.aut.ac.nz/",
      date: "Nov 2025 – Jan 2026",
      summary:
        "Mobile research tooling for sleep-session analysis and review.",
      responsibilities: [
        "Built a React Native and Expo app for session review, questionnaires, and sleep-stage visualization.",
        "Integrated mobile, backend, and model-inference workflows for research use.",
      ],
    },
    {
      title: "Mobile Design Engineer",
      company: "Silk",
      companyHref: "https://www.silk.cx/",
      date: "September 2025 – Present",
      summary:
        "Product interface engineering across Silk's mobile and web experiences.",
      responsibilities: [
        "Build and refine media-heavy product flows across React Native and React.",
        "Improve cross-platform consistency, accessibility, performance, and real-device reliability across iOS and Android.",
      ],
    },
    {
      title: "Design Engineer",
      company: "ninetynine.digital",
      companyHref: "https://www.ninetynine.digital/",
      date: "Apr 2023 – Present",
      summary:
        "Independent product and client studio for mobile apps, web products, and CMS-backed portfolio work.",
      responsibilities: [
        "Shipped independent products including Vape Quit Coach for iOS and Liner, a spatial canvas for music with tldraw, audio playback, and Convex sync.",
        "Delivered client sites with Next.js and Sanity for Ch'lita Collins (Fashion Editor-at-Large at i-D) and artist Dayle Palfreyman, plus Shopify performance and layout stability work for Goodness Gracious.",
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
  openSourceContributions: [
    {
      project: "T3 Code",
      role: "Contributor",
      href: "https://github.com/pingdotgg/t3code/pull/3930",
      date: "Jul 2026",
      summary:
        "Fixed a mobile composer regression in T3 Code, restoring multiline input while preserving desktop keyboard behavior.",
      proof:
        "Added focused unit coverage and validated the interaction with Playwright and the 1,283-test web suite.",
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer & Information Sciences",
      institution: "Auckland University of Technology",
      institutionHref: "https://www.aut.ac.nz/",
      date: "2024 – expected 2026",
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
        "Claude / OpenAI APIs",
      ],
    },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/maxwellyoung" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/maxwell-young-a55032125/" },
  ],
};
