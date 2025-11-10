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
  availability: "open to internships · NZ time",
  contact: {
    email: "maxtheyoung@gmail.com",
    location: "Auckland, NZ",
    website: "https://dev.maxwellyoung.info/",
    github: "https://github.com/maxwellyoung",
    linkedin: "https://www.linkedin.com/in/maxwell-young-a55032125/",
  },
  selectedWork: [
    {
      title: "Goodness Gracious — site",
      href: "https://goodnessgracious.co.nz/",
    },
  ],
  experience: [
    {
      title: "Research Assistant",
      company: "Auckland University of Technology",
      date: "2025 – Present, Auckland",
      summary:
        "Prototyping a mobile application for AI-driven sleep stage analysis.",
      responsibilities: [
        "Integrating deep learning models and behavioural inputs into a cohesive UX.",
        "Designing visualisations and explainability tools to improve user insight.",
      ],
    },
    {
      title: "Full-Stack Web Developer",
      company: "Freelance",
      date: "Apr 2023–Present, Auckland",
      summary:
        "Freelance design engineering across web and mobile; ship end‑to‑end.",
      responsibilities: [
        "Shipped portfolio and ecommerce sites (Next.js, Tailwind, Framer Motion).",
        "Built mobile utilities with React Native + Expo (finance tracker, study assistant).",
        "Scoped, designed, and delivered end‑to‑end with clients.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      date: "Nov 2022–Apr 2023, Auckland",
      summary:
        "Product UI for internal analytics; systems thinking from Figma to code.",
      responsibilities: [
        "Implemented a React/Next.js UI for an internal analytics dashboard.",
        "Translated Power BI into a cohesive Figma system and production UI.",
        "Partnered with product and data to refine workflows and usability.",
        "Participated in sprint ceremonies, PR reviews, and pair sessions.",
      ],
    },
  ],
  education: [
    {
      degree:
        "B.Sc. Computer & Information Sciences (Software Development, Data Science)",
      institution: "Auckland University of Technology",
      date: "2024–2026 (Expected), Auckland",
    },
    {
      degree: "Certificate — Level 6 Web Development Training Scheme",
      institution: "Dev Academy Aotearoa",
      date: "2022, Wellington",
    },
  ],
  skills: [
    {
      category: "Core Stack",
      items: [
        "TypeScript",
        "React (hooks, concurrent UI)",
        "Next.js",
        "Node.js",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend & Cloud",
      items: [
        "REST APIs (Node.js)",
        "PostgreSQL",
        "Prisma/Drizzle",
        "Auth (JWT/NextAuth)",
        "Vercel",
        "AWS S3",
        "Azure",
      ],
    },
    {
      category: "Data & ML",
      items: [
        "Python",
        "Pandas, NumPy",
        "scikit-learn",
        "Jupyter/Notebooks",
        "R (tidyverse, ggplot2)",
        "SQL (analytics)",
      ],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo", "Swift, SwiftUI"],
    },
    {
      category: "UX & Visual",
      items: [
        "Figma",
        "Design systems",
        "Prototyping",
        "Interaction design",
        "Typography & layout",
        "Framer Motion (production)",
      ],
    },
    {
      category: "Testing & Dev",
      items: [
        "Jest",
        "React Testing Library",
        "Playwright",
        "Git/GitHub",
        "GitHub Actions",
        "Docker",
        "CI/CD",
      ],
    },
    {
      category: "Also Familiar",
      items: [
        "Three.js/WebGL",
        "Accessibility (WCAG)",
        "Performance (CWV/Lighthouse)",
        "C#/.NET (learning)",
        "Patterns: MVC/layered, REST, SOLID",
        "PHP",
        "Shopify Liquid",
        "C/C++/Go (academic)",
      ],
    },
  ],
  socials: [
    { name: "Website", url: "https://dev.maxwellyoung.info/" },
    { name: "GitHub", url: "https://github.com/maxwellyoung" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/maxwell-young-a55032125/",
    },
  ],
};
