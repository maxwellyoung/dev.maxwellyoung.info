export interface Project {
  name: string;
  status: string;
  description: string;
  longDescription?: string;
  screenshots?: string[];
  link?: string;
  codeLink?: string;
  startDate?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    name: "Goodness Gracious | Bakery, Cafe & Catering",
    status: "Completed",
    description:
      "Marketing site for artisanal bakery Goodness Gracious, built with New Territory Studio.",
    longDescription:
      "Marketing site for artisanal bakery Goodness Gracious. Contracted by New Territory Studio to implement the frontend build. Focused on responsive layout, styling consistency, and integrating client feedback throughout. Improved my workflow speed and confidence in studio environments.",
    screenshots: [
      "/projectImages/goodness-1.webp",
      "/projectImages/goodness-2.webp",
    ],
    startDate: "2025-03-01",
    link: "https://www.goodnessgracious.co.nz/",
    tags: [
      "Frontend Development",
      "Freelance",
      "Studio Collaboration",
      "Responsive Design",
    ],
  },
  {
    name: "Ivan Guzman | Writer & Cultural Strategist",
    status: "Completed",
    description:
      "A portfolio website for Ivan Guzman, a writer & cultural strategist.",
    longDescription:
      "A portfolio website for Ivan Guzman, a writer. Built with Next.js, Tailwind CSS, and Framer Motion. Managed by a Sanity CMS for a user-friendly way for the client to upload articles.",
    link: "https://ivan-guzman.com/",
    screenshots: ["/projectImages/ivan-1.webp"],
  },
  {
    name: "Ch'lita | Fashion Designer & Stylist Portfolio",
    status: "Completed",
    description:
      "A portfolio website for Ch'lita, a fashion designer and stylist.",
    longDescription:
      "Portfolio site for fashion stylist and designer Ch'lita, featuring work for Rosalia, The Dare, and more. Built with React, Next.js, Tailwind, Framer Motion, and a Sanity CMS for a user-friendly way for the client to upload projects. Designed with a focus on minimalism to display the work clearly and mobile-first as the majority would be viewing on their phone. Dynamic layout for expanded project imagery view.",
    link: "https://chlita.com",
    codeLink: "https://github.com/maxwellyoung/chlita",
    screenshots: [
      "/projectImages/chlita-1.webp",
      "/projectImages/chlita-2.webp",
      "/projectImages/chlita-3.webp",
      "/projectImages/chlita-4.webp",
      "/projectImages/chlita-5.webp",
    ],
  },
  {
    name: "Metrosexual Awareness Night",
    status: "Completed",
    description:
      "Developed a flashy and engaging site for Metrosexual Awareness Night, incorporating unique stylistic and functional elements.",
    longDescription:
      "Implemented a countdown timer for the event, adding a sense of anticipation. The design features a hipster runoff pink gradient background with shooting star effects, contributing to a playful and energetic aesthetic. The site includes responsive side navigation for easy project selection, and the overall styling was updated to be more vibrant, flashy, and pink-themed.",
    link: "https://metrosexualawareness.com",
    startDate: "2024-10-11",
    tags: [
      "Web Development",
      "Responsive Design",
      "Countdown Timer",
      "CSS Animations",
      "Event Website",
    ],
    screenshots: ["/projectImages/man1.webp", "/projectImages/man2.webp"],
    codeLink: "https://github.com/maxwellyoung/man",
  },
  {
    name: "Jeremy Blake Interactive Art Experience",
    status: "Completed",
    description:
      "An interactive digital art experience inspired by the captivating works of Jeremy Blake, a trailblazing artist known for blending vibrant visuals with abstract storytelling.",
    longDescription:
      "This project is an interactive digital art experience inspired by the works of Jeremy Blake, an American digital artist known for his dynamic, abstract color field animations. Users can navigate through abstract, color-rich landscapes, interact with dynamic elements responding to mouse movements or touch, and experience fluid transitions blending and morphing colors in Blake's signature style.",
    link: "https://jeremy-blake.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/jeremy-blake",
    startDate: "2023-01-15",
    tags: ["React", "Three.js", "WebGL"],
    screenshots: ["/projectImages/blake.webp", "/projectImages/blake2.webp"],
  },
  {
    name: "CineSync",
    status: "WIP",
    description: "An AI-powered movie discovery and recommendation platform.",
    longDescription:
      "CineSync is an AI-powered movie discovery and recommendation platform built with Next.js, React, Supabase, OpenAI, Clerk, and TypeScript. It helps users find their next favorite movie based on their preferences and mood. Features include personalized movie recommendations, watchlist management, friend connections for sharing recommendations, responsive design with dark mode, and more.",
    startDate: "2023-04-01",
    tags: ["Next.js", "React", "AI", "TypeScript"],
    link: "https://cinesync-peach.vercel.app/",
    screenshots: [
      "/projectImages/cinesync1.webp",
      "/projectImages/cinesync2.webp",
      "/projectImages/cinesync3.webp",
    ],
  },
  {
    name: "Music Website",
    status: "Completed",
    description:
      "A personal website showcasing my music portfolio, projects, and achievements.",
    longDescription:
      "This is a personal site dedicated to showcasing my music portfolio, projects, and achievements. It features a comprehensive collection of my work, including albums, singles, and collaborations. Built with a focus on aesthetics and functionality, the site provides visitors with an immersive experience, including lyrics, album art, and music videos.",
    link: "https://music.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/music_maxwell",
    startDate: "2022-01-01",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
];
