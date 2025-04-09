export interface Node {
  id: string
  name: string
  group: string
}

export interface Link {
  source: string
  target: string
  type: "primary" | "secondary"
}

export interface GraphData {
  nodes: Node[]
  links: Link[]
}

export const portfolioData: GraphData = {
  nodes: [
    // Projects
    { id: "project1", name: "Web Portfolio", group: "project" },
    { id: "project2", name: "E-commerce App", group: "project" },
    { id: "project3", name: "Data Visualization", group: "project" },
    { id: "project4", name: "Mobile App", group: "project" },
    { id: "project5", name: "AI Chatbot", group: "project" },

    // Skills
    { id: "skill1", name: "React", group: "skill" },
    { id: "skill2", name: "Next.js", group: "skill" },
    { id: "skill3", name: "TypeScript", group: "skill" },
    { id: "skill4", name: "Node.js", group: "skill" },
    { id: "skill5", name: "Python", group: "skill" },
    { id: "skill6", name: "UI/UX Design", group: "skill" },
    { id: "skill7", name: "Data Analysis", group: "skill" },
    { id: "skill8", name: "Machine Learning", group: "skill" },

    // Experiences
    { id: "exp1", name: "Frontend Developer", group: "experience" },
    { id: "exp2", name: "UX Researcher", group: "experience" },
    { id: "exp3", name: "Data Scientist", group: "experience" },

    // Education
    { id: "edu1", name: "Computer Science Degree", group: "education" },
    { id: "edu2", name: "UI/UX Certification", group: "education" },
    { id: "edu3", name: "Machine Learning Course", group: "education" },

    // Categories
    { id: "cat1", name: "Web Development", group: "category" },
    { id: "cat2", name: "Mobile Development", group: "category" },
    { id: "cat3", name: "Data Science", group: "category" },
    { id: "cat4", name: "Design", group: "category" },
  ],
  links: [
    // Project to Skills
    { source: "project1", target: "skill1", type: "primary" },
    { source: "project1", target: "skill2", type: "primary" },
    { source: "project1", target: "skill3", type: "primary" },
    { source: "project1", target: "skill6", type: "secondary" },

    { source: "project2", target: "skill1", type: "primary" },
    { source: "project2", target: "skill2", type: "primary" },
    { source: "project2", target: "skill4", type: "primary" },

    { source: "project3", target: "skill5", type: "primary" },
    { source: "project3", target: "skill7", type: "primary" },

    { source: "project4", target: "skill1", type: "primary" },
    { source: "project4", target: "skill3", type: "primary" },

    { source: "project5", target: "skill5", type: "primary" },
    { source: "project5", target: "skill8", type: "primary" },

    // Projects to Categories
    { source: "project1", target: "cat1", type: "primary" },
    { source: "project2", target: "cat1", type: "primary" },
    { source: "project3", target: "cat3", type: "primary" },
    { source: "project4", target: "cat2", type: "primary" },
    { source: "project5", target: "cat3", type: "primary" },

    // Skills to Experiences
    { source: "skill1", target: "exp1", type: "primary" },
    { source: "skill2", target: "exp1", type: "primary" },
    { source: "skill3", target: "exp1", type: "primary" },
    { source: "skill6", target: "exp2", type: "primary" },
    { source: "skill5", target: "exp3", type: "primary" },
    { source: "skill7", target: "exp3", type: "primary" },
    { source: "skill8", target: "exp3", type: "primary" },

    // Skills to Education
    { source: "skill1", target: "edu1", type: "secondary" },
    { source: "skill2", target: "edu1", type: "secondary" },
    { source: "skill3", target: "edu1", type: "secondary" },
    { source: "skill4", target: "edu1", type: "secondary" },
    { source: "skill5", target: "edu1", type: "secondary" },
    { source: "skill6", target: "edu2", type: "primary" },
    { source: "skill8", target: "edu3", type: "primary" },

    // Cross-connections to make the graph more interesting
    { source: "cat1", target: "exp1", type: "secondary" },
    { source: "cat3", target: "exp3", type: "secondary" },
    { source: "cat4", target: "exp2", type: "secondary" },
    { source: "edu1", target: "exp1", type: "secondary" },
    { source: "edu3", target: "exp3", type: "secondary" },
  ],
}

