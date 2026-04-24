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
    "Mobile and product engineer working across React Native, Next.js, design systems, research tooling, and applied ML prototypes. I build production mobile features, client products, and research interfaces where software has to stay understandable under real workflow constraints.",
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
        "Building safer-medicines research tooling for a deprescribing and clinical review workflow.",
      responsibilities: [
        "Turned a medication recommendation spreadsheet into a Python-backed rules dataset for safer-medicines and deprescribing research.",
        "Built research prototypes that match structured patient assessments to candidate medication review rules with provenance, ranking summaries, and audit-aware workflow support.",
      ],
    },
    {
      title: "Software Research Assistant",
      company: "Auckland University of Technology",
      companyHref: "https://www.aut.ac.nz/",
      date: "Nov 2025 – Jan 2026",
      summary:
        "Funded sleep research app spanning mobile product, backend services, and on-device ML.",
      responsibilities: [
        "Built a React Native and Expo mobile app for EEG-based sleep-stage classification, including session review, hypnogram views, questionnaires, and sleep metrics.",
        "Integrated on-device and cloud inference flows using AttnSleep TFLite, FastAPI, Express, and Supabase, with separate consumer and lab modes for the AUT research workflow.",
      ],
    },
    {
      title: "Mobile Design Engineer",
      company: "Silk",
      companyHref: "https://www.silk.cx/",
      date: "September 2025 – Present",
      summary:
        "React Native product engineering across mobile auth, publishing, archives, and media-heavy flows.",
      responsibilities: [
        "Owned mobile auth, publishing, archive, and media upload/playback flows across iOS and Android.",
        "Built React Native architecture and delivery patterns for navigation, editing, media handling, and platform parity in a small product team.",
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
        "Delivered client sites for Ch'lita and Dayle with Next.js and Sanity, plus Shopify performance and layout stability work for Goodness Gracious.",
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
    { name: "LinkedIn", url: "https://linkedin.com/in/maxwell-young-a55032125" },
  ],
};
