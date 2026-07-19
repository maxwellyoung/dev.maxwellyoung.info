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
    "Design engineer who led Silk's React Native app from its first build through launch and now leads ongoing mobile delivery. I also ship independent products from interaction design through architecture, accessibility, performance, and release.",
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
        "Silk is a platform for blogging, private archives, and multimedia moodboards. Led its React Native app from initial build through launch and now lead ongoing delivery.",
      responsibilities: [
        "Built the initial mobile foundation and turned early product direction into production architecture, interface systems, and media-heavy flows.",
        "Continue to own performance, accessibility, regression coverage, and real-device reliability across iOS and Android releases.",
      ],
    },
    {
      title: "Software Research Assistant",
      company: "University of Auckland",
      companyHref: "https://www.auckland.ac.nz/",
      date: "Apr 2026 – Present",
      summary:
        "Own end-to-end software delivery across two medicines-safety research applications: Rx-Opt clinician decision-support and MRB-QoL 2.0 patient-reported outcomes.",
      responsibilities: [
        "Built Python ingestion and matching that turns six stages of spreadsheet-authored rules into traceable Next.js review workflows while preserving source provenance and ambiguity.",
        "Shipped role-aware surveys, researcher dashboards, protected review tooling, server-backed persistence, and approval-gated rule promotion with privacy and end-to-end validation built in.",
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
        "Designed and built a local-first React Native concert diary with a Recovery Desk that turns ticket files, shares, calendars, photos, Gmail receipts, and listening history into reviewable on-device candidates; nothing enters the diary without confirmation.",
    },
    {
      name: "T3 Code",
      descriptor: "Open-source contributor",
      href: "https://github.com/pingdotgg/t3code/pull/4112",
      date: "Ongoing",
      summary:
        "Contributed upstream fixes across mobile input and server data integrity, including multiline composition, runtime-safe message IDs, and reliable cross-device conversation ordering.",
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
