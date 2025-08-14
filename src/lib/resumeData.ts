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
      title: "Full-Stack Web Developer",
      company: "Freelance",
      date: "Apr 2023 – Present · Auckland",
      responsibilities: [
        "Designed and shipped portfolio and ecommerce sites for designers & musicians with Next.js, Tailwind, and Framer Motion.",
        "Built mobile utilities with React Native + Expo (finance tracker, study assistant).",
        "Collaborated directly with clients on scoping, UX, and content; owned delivery end-to-end.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      date: "Nov 2022 – Apr 2023 · Auckland",
      responsibilities: [
        "Implemented a React/Next.js front end for an internal analytics dashboard.",
        "Translated Power BI concepts into a cohesive Figma system and production UI.",
        "Partnered with product and data teams to refine workflows and usability.",
      ],
    },
  ],
  education: [
    {
      degree:
        "B.Sc. Computer & Information Sciences (Software Development, Data Science)",
      institution: "Auckland University of Technology",
      date: "2024 – 2026 (Expected) · Auckland",
    },
    {
      degree: "Certificate — Level 6 Web Development Training Scheme",
      institution: "Dev Academy Aotearoa",
      date: "2022 · Wellington",
    },
  ],
  skills: [
    {
      category: "Core Stack",
      items: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo"],
    },
    {
      category: "UX & Visual",
      items: ["Figma", "Motion/Prototyping (Framer Motion)"],
    },
    {
      category: "Testing & Dev",
      items: ["Jest", "Git/GitHub", "CI/CD basics"],
    },
    {
      category: "Also Familiar",
      items: ["Three.js/WebGL", "PHP", "C/C++/Go (academic)"],
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
