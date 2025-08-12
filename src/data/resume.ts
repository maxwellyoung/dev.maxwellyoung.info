export interface Role {
  title: string;
  company: string;
  date: string;
  summary: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  institution: string;
  date: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Social {
  name: string;
  url: string;
}

export interface Tool {
  name: string;
  description: string;
}

export interface ToolSection {
  title: string;
  items: Tool[];
}

export const resume = {
  name: "Maxwell Young",
  title: "Design Engineer",
  contact: {
    email: "maxwell@ninetynine.digital",
    location: "Auckland",
    website: "https://dev.maxwellyoung.info/",
    github: "https://github.com/maxwellyoung",
    linkedin: "https://www.linkedin.com/in/maxwell-young-a55032125/",
  },
  experience: [
    {
      title: "Full Stack Web Developer",
      company: "Freelance",
      date: "Apr 2023 - Present, Auckland",
      summary:
        "Developed a number of portfolio sites for designers & musicians, enhancing user experience with responsive designs and dynamic animations using Tailwind and Framer Motion.",
      bullets: [
        "Shipped 5+ client websites from design to deployment, resulting in an average 30% increase in user engagement.",
        "Utilised Next.js to ensure high performance across devices, constantly exploring new front-end technologies to stay ahead of industry trends.",
        "Developing personal finance tracker and study assistant mobile apps using React Native and Expo, focusing on improving personal productivity and financial management.",
        "Committed to continuous learning through online courses, workshops, and collaboration with other developers to upskill in various fields.",
      ],
    },
    {
      title: "Data Intelligence UI Developer",
      company: "Spark New Zealand",
      date: "Nov 2022 - Apr 2023, Auckland",
      summary:
        "Designed and developed the front end of an internal dashboard application.",
      bullets: [
        "Designed and developed the front end of an internal dashboard application.",
        "Translated PowerBI dashboard into Figma design, integrating machine learning algorithms.",
        "Increased stakeholder productivity by 20% by implementing a new front-end in React & Next.js.",
        "Collaborated with product team and stakeholders for usability.",
        "Conducted user testing to refine the UI.",
      ],
    },
  ],
  education: [
    {
      degree:
        "B.Sc. Computer and Information Sciences (Software Development and Data Science)",
      institution: "Auckland University of Technology",
      date: "2024 - 2026 (Expected), Auckland",
    },
    {
      degree: "Certificate - Level 6 Web Development Training Scheme",
      institution: "Dev Academy Aotearoa",
      date: "2022, Wellington",
    },
  ],
  stack: [
    {
      title: "Hardware",
      items: [
        {
          name: "'MacBook Pro 14' (M2 Pro)",
          description: "Primary machine.",
        },
        {
          name: "Apple Studio Display",
          description: "Crisp, clean, perfect colors.",
        },
        {
          name: "Keychron Q1 Pro",
          description: "With Gateron Oil King switches.",
        },
        {
          name: "Logitech MX Master 3S",
          description: "Feels like cheating.",
        },
      ],
    },
    {
      title: "Development",
      items: [
        { name: "Cursor", description: "Primary editor, for its AI features." },
        {
          name: "iTerm2",
          description: "Monastic. Minimal. Just enough friction.",
        },
        {
          name: "Next.js & Vercel",
          description: "For almost all web projects.",
        },
        {
          name: "Supabase",
          description: "My go-to for backend-as-a-service.",
        },
      ],
    },
    {
      title: "Design",
      items: [
        {
          name: "Figma",
          description: "For UI, UX, and everything in between.",
        },
        { name: "Photoshop", description: "For anything raster." },
      ],
    },
    {
      title: "Productivity",
      items: [
        { name: "Things 3", description: "Task management that doesn't yell." },
        {
          name: "Notion",
          description: "Second brain and project management.",
        },
        { name: "Cron", description: "Calendar, but beautiful." },
      ],
    },
  ],
  competencies: [
    {
      category: "Web Development",
      items: [
        "Full Stack Web Development",
        "UI/UX Design",
        "Responsive Web Design",
      ],
    },
    {
      category: "Collaboration & Methodologies",
      items: [
        "Agile and Scrum Methodologies",
        "Cross-functional Team Collaboration",
      ],
    },
    {
      category: "Tools & Technologies",
      items: [
        "Database Management",
        "Cloud Services (AWS, Azure)",
        "Automated Testing (Jest)",
        "Git & Version Control",
        "TypeScript & JavaScript",
        "React, React Native, Next.js",
        "PHP",
        "C, C++, Go",
        "CSS, Tailwind",
        "Figma",
        "Adobe Creative Suite",
        "OpenAI Integration",
        "WebGL, Three.js",
      ],
    },
  ],
  socials: [
    {
      name: "Website",
      url: "https://dev.maxwellyoung.info/",
    },
    {
      name: "GitHub",
      url: "https://github.com/maxwellyoung",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/maxwell-young-a55032125/",
    },
  ],
};
