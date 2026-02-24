"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

export function ProjectHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const projects = [
    {
      title: "Whakapapa",
      subtitle: "Genealogy workflow with motion-led guidance",
      description: "A family knowledge product where motion is used to guide document review and relationship mapping without overwhelming people.",
      tech: ["Next.js", "Framer Motion", "Supabase", "Claude AI"],
      process: {
        before: "Document ingestion and relationship data were hard to scan quickly",
        after: "Motion and hierarchy made review steps easier to parse",
        insight: "Animation works best when it supports comprehension, not spectacle"
      },
      links: {
        live: "https://whakapapa.vercel.app",
        github: "https://github.com/maxwellyoung/whakapapa"
      },
      color: "blue"
    },
    {
      title: "Dayle Palfreyman",
      subtitle: "Portfolio system for an installation artist",
      description: "A full-screen portfolio with restrained motion, strong image rhythm, and client-friendly editing through Sanity CMS.",
      tech: ["Next.js", "Sanity CMS", "Framer Motion", "TypeScript"],
      process: {
        before: "Art documentation felt fragmented and hard to maintain",
        after: "A reusable content model gave consistency without losing personality",
        insight: "Craft in portfolio sites is often about subtraction and pacing"
      },
      links: {
        live: "https://dayle.vercel.app",
      },
      color: "purple"
    },
    {
      title: "Vape Quit Coach",
      subtitle: "Behavior-change UX without guilt mechanics",
      description: "A 4.8★ iOS app where feedback, pacing, and copy are designed to support action instead of anxiety.",
      tech: ["React Native", "Expo", "AI Coaching", "Editorial Design"],
      process: {
        before: "Most quit apps rely on shame and streak pressure",
        after: "A calmer interface made repetition and return visits easier",
        insight: "The tone of a product is a product decision, not a copy pass"
      },
      links: {
        live: "https://vapequitcoach.com",
      },
      color: "green"
    }
  ];

  return (
    <motion.section
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 16 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-8"
    >
      <div>
        <h2 className="font-display text-3xl font-light mb-4">
          Project Highlights
        </h2>
        <p className="text-muted leading-relaxed max-w-2xl">
          Selected projects showcasing the intersection of design and engineering. 
          Each project explores different aspects of craft, from motion design to editorial layout.
        </p>
      </div>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  process: {
    before: string;
    after: string;
    insight: string;
  };
  links: {
    live?: string;
    github?: string;
  };
  color: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'process'>('overview');

  const colorClasses = {
    blue: "border-blue-500/30 bg-blue-500/5",
    purple: "border-purple-500/30 bg-purple-500/5", 
    green: "border-green-500/30 bg-green-500/5"
  };

  const accentClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    purple: "bg-purple-500/20 text-purple-400",
    green: "bg-green-500/20 text-green-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1] 
      }}
      className="group"
    >
      <div
        className={`border rounded-xl p-8 transition-all duration-500 hover:border-accent/30 ${
          colorClasses[project.color as keyof typeof colorClasses]
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="font-display text-2xl font-light mb-1">
                {project.title}
              </h3>
              <p className="text-muted-foreground font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted/10 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted hover:text-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('process')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'process' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted hover:text-foreground'
                }`}
              >
                Process
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="min-h-[120px]"
            >
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-muted leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          accentClasses[project.color as keyof typeof accentClasses]
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Before
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {project.process.before}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        After
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {project.process.after}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border/50">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Key Insight
                    </h4>
                    <p className="text-sm font-medium">
                      {project.process.insight}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Links */}
            <div className="flex space-x-3">
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Site</span>
                </motion.a>
              )}
              
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  <span>Source</span>
                </motion.a>
              )}
            </div>
          </div>

          {/* Visual/Preview Area */}
          <div className="w-full lg:w-80 mt-6 lg:mt-0">
            <motion.div
              animate={{ 
                scale: isHovered ? 1.02 : 1,
                rotate: isHovered ? 1 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className={`aspect-[4/3] rounded-lg border ${
                colorClasses[project.color as keyof typeof colorClasses]
              } relative overflow-hidden group-hover:shadow-xl transition-shadow duration-500`}
            >
              {/* Placeholder for project screenshot/video */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className={`w-12 h-12 rounded-full ${
                    accentClasses[project.color as keyof typeof accentClasses]
                  } mx-auto flex items-center justify-center`}>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Project Preview
                  </p>
                </div>
              </div>
              
              {/* Subtle overlay animation */}
              <motion.div
                animate={{
                  opacity: isHovered ? 0.1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-accent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
