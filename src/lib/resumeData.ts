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
  selectedWork: {
    name: string;
    descriptor: string;
    href: string;
    date: string;
    summary: string;
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
    "Design engineer leading day-to-day mobile implementation at Silk and shipping independent React Native products. I work from interaction design through architecture, accessibility, performance, release hardening, and real-device verification.",
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland, NZ",
    website: "dev.maxwellyoung.info",
    github: "github.com/maxwellyoung",
    linkedin: "linkedin.com/in/maxwell-young-a55032125",
  },
  experience: [
    {
      title: "Mobile Design Engineer",
      company: "Silk",
      companyHref: "https://www.silk.cx/",
      date: "Sep 2025 – Present",
      summary:
        "Lead day-to-day mobile implementation and release hardening across Silk's React Native product.",
      responsibilities: [
        "Turn product direction into production mobile architecture, interface systems, and media-heavy flows.",
        "Own performance, accessibility, regression coverage, and real-device reliability across iOS and Android release candidates.",
      ],
    },
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
      title: "Design Engineer",
      company: "ninetynine.digital",
      companyHref: "https://www.ninetynine.digital/",
      date: "Apr 2023 – Present",
      summary:
        "Independent product and client studio for mobile apps, web products, and CMS-backed portfolio work.",
      responsibilities: [
        "Take independent mobile and web products from interaction design through implementation, release, and iteration.",
        "Delivered client sites with Next.js and Sanity for Ch'lita Collins (Fashion Editor-at-Large at i-D) and artist Dayle Palfreyman, plus Shopify performance and layout stability work for Goodness Gracious.",
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
  selectedWork: [
    {
      name: "Vape Quit Coach",
      descriptor: "Solo iOS product",
      href: "https://vapequitcoach.com",
      date: "Live",
      summary:
        "Designed, built, and shipped a React Native and Expo behavior-change app with recovery milestones, coaching flows, and relapse support.",
    },
    {
      name: "Afterlight",
      descriptor: "Independent mobile product",
      href: "https://afterlight.ninetynine.digital",
      date: "In development",
      summary:
        "Designed a local-first React Native concert diary with on-device archives for gigs, photos, and memories, plus a custom motion and visual system.",
    },
    {
      name: "T3 Code",
      descriptor: "Open-source contributor",
      href: "https://github.com/pingdotgg/t3code/pull/3932",
      date: "2 PRs merged Jul 2026",
      summary:
        "Restored mobile multiline input and prevented persisted assistant replies from colliding across ACP runtime restarts; verified the runtime fix against 1,400 tests.",
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer & Information Sciences",
      institution: "Auckland University of Technology",
      institutionHref: "https://www.aut.ac.nz/",
      date: "2024 – Expected 2026",
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
      category: "Systems & Tools",
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
