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
    name: "Goodness Gracious — Bakery, Cafe & Catering",
    status: "Completed",
    description:
      "Full redesign and development of a responsive, high-performance Shopify site. Improved ordering flow, modernised the visual identity, and streamlined content management.",
    longDescription:
      "A full redesign and build of the Goodness Gracious site and ecommerce experience. Delivered a responsive, high‑performance Shopify implementation with a clearer ordering flow, updated visual system, and simplified content management. Worked closely with the client’s marketing team to align physical and digital touchpoints.",
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
      "Interactive WebGL installation responsive to user input. Custom shaders create layered, animated compositions that run smoothly across devices.",
    longDescription:
      "An interactive web installation inspired by Jeremy Blake. Built with React and Three.js, using custom GLSL shaders to layer animation and color. Tuned for performance and input‑responsive behavior so it feels fluid while preserving artistic fidelity across devices.",
    link: "https://jeremy-blake.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/jeremy-blake",
    startDate: "2023-01-15",
    tags: ["React", "Three.js", "WebGL"],
    screenshots: ["/projectImages/blake.webp", "/projectImages/blake2.webp"],
  },
  {
    name: "CineSync",
    status: "WIP",
    description:
      "Web app for collaborative film scheduling with a distraction‑free interface. Developed core scheduling logic and early prototypes to test with production teams.",
    longDescription:
      "Designing and building a minimalist, production‑ready scheduling tool for film teams. Focused on a distraction‑free interface, adaptable to varied workflows. Implemented the core scheduling logic, interactive prototypes, and user validation loops to shape the roadmap.",
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
