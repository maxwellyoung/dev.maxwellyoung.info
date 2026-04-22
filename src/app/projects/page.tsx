"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import { Project, projects } from "@/lib/projects";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ChevronDown } from "lucide-react";
import { container, item, spring } from "@/lib/motion";
import { ProjectHoverPreview } from "@/components/ProjectHoverPreview";
import { SiteFooter } from "@/components/SiteFooter";

function ProjectRow({
  p,
  index = 0,
  expandedProject,
  onToggleExpand,
  onCarouselOpen,
  shouldReduceMotion,
}: {
  p: Project;
  index?: number;
  expandedProject: string | null;
  onToggleExpand: (name: string | null) => void;
  onCarouselOpen: () => void;
  shouldReduceMotion: boolean;
}) {
  const isExpanded = expandedProject === p.name;
  const isEagerLoad = index < 4;

  return (
    <motion.li
      layout
      variants={item.slide}
      className="w-full max-w-full group"
    >
      <button
        onClick={(e) => {
          onToggleExpand(isExpanded ? null : p.name);
          e.currentTarget.parentElement?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "center",
          });
        }}
        className={`
          w-full max-w-full text-left px-2 sm:px-3 py-3
          transition-colors duration-200 ease-out
          hover:bg-[hsl(var(--muted))]/50
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        `}
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden">
          <div className="relative h-16 w-20 sm:w-28 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-inset ring-[hsl(var(--border))] bg-muted transition-all duration-200 group-hover:ring-[hsl(var(--accent))]/40">
            {p.screenshots?.[0] ? (
              <Image
                src={p.screenshots[0]}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading={isEagerLoad ? "eager" : "lazy"}
                priority={isEagerLoad}
                sizes="(max-width: 640px) 80px, 112px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--accent))]/10" />
            )}
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <ProjectHoverPreview screenshots={p.screenshots} projectName={p.name}>
              <h3 className="truncate break-words text-sm font-medium leading-tight text-foreground cursor-pointer">
                {p.name}
              </h3>
            </ProjectHoverPreview>
            <p className="mt-1 truncate break-words text-xs text-muted-foreground">
              {p.description}
            </p>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : spring.snappy}
            className="flex-shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : spring.gentle}
            className="px-1 pb-4 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { ...spring.gentle, delay: 0.05 }
              }
            >
              <ProjectDetails
                project={p}
                onCarouselOpen={onCarouselOpen}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

interface ProjectsShowcaseProps {
  embedded?: boolean;
}

export function ProjectsShowcase({ embedded = false }: ProjectsShowcaseProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const selectedProject: Project | null = expandedProject
    ? projects.find((p) => p.name === expandedProject) || null
    : null;

  const handleCarouselOpen = () => setIsCarouselOpen(true);

  const content = (
    <div className={embedded ? "" : "min-h-screen text-foreground font-sans"}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 overflow-x-hidden">
        {!embedded && (
          <div className="mb-8">
            <h1 className="text-xl font-medium text-foreground">Work</h1>
          </div>
        )}

        <motion.ul
          variants={container.list}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="divide-y divide-[hsl(var(--border))]/50 overflow-x-hidden w-full max-w-full"
        >
          {projects.map((p, index) => (
            <ProjectRow
              key={p.name}
              p={p}
              index={index}
              expandedProject={expandedProject}
              onToggleExpand={setExpandedProject}
              onCarouselOpen={handleCarouselOpen}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.ul>
      </div>

      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0">
          <VisuallyHidden.Root>
            <DialogTitle>
              {selectedProject?.name ?? "Project"} Screenshots
            </DialogTitle>
          </VisuallyHidden.Root>
          {selectedProject?.screenshots && (
            <Carousel
              images={selectedProject.screenshots}
              onClose={() => setIsCarouselOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {!embedded && <SiteFooter />}
    </div>
  );

  if (embedded) {
    return content;
  }

  return <main>{content}</main>;
}

export default function ProjectsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#projects");
  }, [router]);

  return null;
}
