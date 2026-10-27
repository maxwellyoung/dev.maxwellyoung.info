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
  title: "Product Engineer",
  profile:
    "Product engineer working across mobile apps and research software. Led Silk's React Native app from its first build to its Google Play launch, and designed and shipped five iPhone apps of my own. Combine interaction design with architecture, performance, accessibility, and regression testing.",
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
        "Silk is a platform for blogging, private archives, and multimedia moodboards. Led its React Native app from initial build through its Google Play launch and now lead ongoing iOS and Android delivery.",
      responsibilities: [
        "Built the initial mobile foundation and turned early product direction into production architecture, interface systems, and media-heavy flows.",
        "Own performance, accessibility, and release reliability across iOS and Android, using regression coverage and real-device checks to validate changes.",
      ],
    },
    {
      title: "Software Research Assistant",
      company: "University of Auckland",
      companyHref: "https://www.auckland.ac.nz/",
      date: "Apr 2026 – Present",
      summary:
        "Design and build research applications end to end, from the user experience through to implementation, including Rx-Opt and MRB-QoL 2.0.",
      responsibilities: [
        "Own UX and interface design, application architecture, frontend and backend implementation, and testing in collaboration with researchers.",
        "Build clinician assessment and review workflows, patient questionnaires, and researcher dashboards. Validate data and keep source provenance visible within the applications.",
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
        "Shipped five iPhone apps to the App Store with React Native, Expo, and SwiftUI, including Vape Quit Coach.",
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
      name: "SkillScan",
      descriptor: "Published developer tool",
      href: "https://skillscan.ninetynine.digital",
      date: "Live · npm 0.1.0",
      summary:
        "Designed and shipped a static security scanner for Claude Code skills and MCP servers as a web app, npm CLI, and GitHub Action, with 29 detection rules, source-linked findings, SARIF reports, and explicit partial-scan handling.",
    },
    {
      name: "T3 Code",
      descriptor: "Open-source contributor",
      href: "https://github.com/pingdotgg/t3code/pulls?q=is%3Apr+is%3Amerged+author%3Amaxwellyoung",
      date: "13 merged PRs",
      summary:
        "Merged 13 upstream fixes to T3 Code (30k+ GitHub stars) across its server, web client, and mobile app.",
    },
    {
      name: "Liner",
      descriptor: "Independent web product",
      href: "https://liner.ninetynine.digital",
      date: "Live",
      summary:
        "Designed and built a local-first canvas for sequencing unfinished music, with Playwright end-to-end tests.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer and Information Sciences (Software Development and Data Science)",
      institution: "Auckland University of Technology",
      institutionHref: "https://www.aut.ac.nz/",
      date: "2024 – Nov 2026",
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
        "Python",
        "PostgreSQL",
        "Convex",
        "Supabase",
        "Prisma",
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
