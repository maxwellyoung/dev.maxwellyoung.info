// ATS-optimized resume data
// Designed for recruiter scanning: bullets, keywords, quantified outcomes

type ATSResumeData = {
  name: string;
  title: string;
  summary: string; // ATS loves a keyword-rich summary
  contact: {
    email: string;
    phone?: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
  };
  experience: {
    title: string;
    company: string;
    location?: string;
    date: string;
    bullets: string[]; // Action verb + metric + context
  }[];
  education: {
    degree: string;
    institution: string;
    location?: string;
    date: string;
    details?: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects?: {
    name: string;
    tech: string;
    bullets: string[];
  }[];
};

export const resumeDataATS: ATSResumeData = {
  name: "Maxwell Young",
  title: "Frontend Engineer / React Native Developer",
  summary:
    "Frontend engineer with 3+ years building production React and React Native applications. Shipped solo iOS app (4.8 stars). Experience with TypeScript, Next.js, Expo, performance optimization, and CMS integration. Currently building mobile interfaces at Silk. Open to frontend, mobile, or full-stack roles.",
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland, New Zealand",
    website: "dev.maxwellyoung.info",
    github: "github.com/maxwellyoung",
    linkedin: "linkedin.com/in/maxwell-young-a55032125",
  },
  experience: [
    {
      title: "Frontend Engineer (React Native)",
      company: "Silk",
      location: "Remote",
      date: "Jun 2024 - Present",
      bullets: [
        "Build and ship React Native features across iOS, Android, and web using Expo and TypeScript",
        "Implemented multimedia upload system handling images, video, and audio across platforms",
        "Developed private archive and moodboard interfaces with drag-and-drop organization",
        "Collaborate with small team (<10) on product decisions and technical architecture",
      ],
    },
    {
      title: "Research Assistant - Mobile UI/UX",
      company: "Auckland University of Technology",
      location: "Auckland, NZ",
      date: "Jan 2025 - Mar 2025",
      bullets: [
        "Prototyped mobile interfaces for AI-driven sleep research application",
        "Designed data visualizations communicating ML prediction confidence to end users",
        "Contributed to explainable AI research on presenting uncertainty without eroding trust",
      ],
    },
    {
      title: "Freelance Frontend Developer",
      company: "ninetynine.digital (Self-employed)",
      location: "Auckland, NZ",
      date: "Apr 2023 - Present",
      bullets: [
        "Solo-built iOS app 'Vape Quit Coach' - 4.8 star rating on App Store (React Native, Expo)",
        "Reduced page load time by 40% for Shopify e-commerce site through image optimization and CLS fixes",
        "Built 6+ client websites using Next.js, TypeScript, Tailwind CSS, and headless CMS (Sanity)",
        "Delivered zero-layout-shift portfolio site with responsive image handling and art direction",
      ],
    },
    {
      title: "UI Developer - Data Intelligence",
      company: "Spark New Zealand",
      location: "Auckland, NZ",
      date: "Nov 2022 - Apr 2023",
      bullets: [
        "Built internal analytics dashboard serving 50+ data analysts using React and Next.js",
        "Consolidated 4 separate Power BI workflows into single unified application",
        "Created Figma design system reducing design-to-development handoff time",
        "Worked with data team to surface complex queries through intuitive UI components",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science - Computer & Information Sciences",
      institution: "Auckland University of Technology",
      location: "Auckland, NZ",
      date: "2024 - 2026 (Expected)",
      details: ["Major: Software Development", "Minor: Data Science"],
    },
    {
      degree: "Certificate in Web Development (Level 6)",
      institution: "Dev Academy Aotearoa",
      location: "Auckland, NZ",
      date: "2022",
      details: ["Full-stack JavaScript bootcamp", "React, Node.js, PostgreSQL"],
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frontend",
      items: [
        "React",
        "React Native",
        "Next.js",
        "Expo",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
      ],
    },
    {
      category: "Backend & Data",
      items: [
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "REST APIs",
        "Supabase",
        "Sanity CMS",
      ],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "Figma",
        "Vercel",
        "AWS",
        "Docker",
        "Jest",
        "CI/CD",
      ],
    },
  ],
  projects: [
    {
      name: "Vape Quit Coach",
      tech: "React Native, Expo, TypeScript",
      bullets: [
        "Solo-built iOS health app with 4.8 star App Store rating",
        "Implemented behavioral tracking, progress visualization, and push notifications",
      ],
    },
    {
      name: "Jeremy Blake Interactive Art",
      tech: "React, Three.js, WebGL, GLSL",
      bullets: [
        "Built interactive WebGL art installation with custom shaders",
        "Optimized for 60fps performance across desktop and mobile devices",
      ],
    },
  ],
};
