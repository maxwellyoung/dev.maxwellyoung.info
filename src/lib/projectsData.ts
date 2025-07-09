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
      "Developed a marketing site for artisanal bakery Goodness Gracious in collaboration with New Territory Studio, focusing on a clean, responsive layout.",
    longDescription:
      "Led the frontend development for the Goodness Gracious marketing site, a project contracted by New Territory Studio. My role focused on translating design mockups into a fully responsive and pixel-perfect website, ensuring styling consistency and integrating client feedback. This project was built using Shopify Liquid and pure CSS, enhancing my skills in studio collaboration and rapid development workflows.",
    screenshots: [
      "/projectImages/goodness-1.webp",
      "/projectImages/goodness-2.webp",
    ],
    startDate: "2024-05-01",
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
      "Designed and developed a sleek portfolio for writer and cultural strategist Ivan Guzman, featuring a modern UI and a headless CMS.",
    longDescription:
      "Built a dynamic portfolio website for writer Ivan Guzman using Next.js, Tailwind CSS, and Framer Motion. To empower the client with content management capabilities, I integrated a Sanity CMS, allowing for easy article uploads and updates. The result is a user-friendly and visually engaging platform for showcasing his work.",
    link: "https://ivan-guzman.com/",
    screenshots: ["/projectImages/ivan-1.webp"],
  },
  {
    name: "Ch'lita | Fashion Designer & Stylist Portfolio",
    status: "Completed",
    description:
      "Developed a minimalist portfolio for fashion designer Ch'lita, showcasing her work with high-profile clients like Rosalia and The Dare.",
    longDescription:
      "Created a portfolio for fashion stylist and designer Ch'lita, featuring her work with prominent artists like Rosalia and The Dare. The site was built with React, Next.js, and Framer Motion, and includes a Sanity CMS for easy project management. The design prioritizes minimalism and a mobile-first approach, with a dynamic layout that adapts to showcase high-resolution imagery.",
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
      "Developed a flashy and engaging event site for Metrosexual Awareness Night, featuring a live countdown and vibrant, animated design.",
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
      "Created an interactive art experience inspired by digital artist Jeremy Blake, using Three.js to generate dynamic, abstract animations.",
    longDescription:
      "Developed an interactive digital art experience inspired by Jeremy Blake, an American digital artist known for his dynamic, abstract color field animations. Using React and Three.js, I built a WebGL-powered world where users can navigate through abstract landscapes and interact with elements that respond to mouse movements and touch. The experience features fluid, morphing color transitions that capture Blake's signature style.",
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
      "CineSync is an AI-powered movie discovery platform designed to help users find their next favorite film. Built with a modern stack including Next.js, Supabase, and OpenAI, it offers personalized recommendations based on user preferences and mood. Key features include watchlist management, social sharing of recommendations, and a responsive design with dark mode.",
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
      "Created a personal portfolio site to showcase my musical projects, including albums, singles, and collaborations.",
    longDescription:
      "Designed and built a personal website to showcase my music portfolio. The site features a comprehensive collection of my work, including albums, singles, and collaborations. With a focus on aesthetics and functionality, it provides an immersive experience with lyrics, album art, and music videos, all built with React and Next.js.",
    link: "https://music.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/music_maxwell",
    startDate: "2022-01-01",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
];
