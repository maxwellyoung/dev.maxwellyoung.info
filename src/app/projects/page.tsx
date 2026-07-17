"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Carousel from "@/components/Carousel";
import {
  Project,
  flagshipProjects,
  getProjectContextLabel,
  rankedProjects,
  supportingProjects,
} from "@/lib/projects";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ChevronDown } from "lucide-react";
import { container, item, spring } from "@/lib/motion";
import { ProjectHoverPreview } from "@/components/ProjectHoverPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectMedia } from "@/components/ProjectMedia";

// Open settles like a drawer; close is quicker — the user has already decided.
const workRevealTransition = {
  height: { duration: 0.3, ease: [0.32, 0.72, 0, 1] as const },
  opacity: { duration: 0.2, ease: [0, 0, 0.2, 1] as const },
};

const workCollapseTransition = {
  height: { duration: 0.22, ease: [0.32, 0.72, 0, 1] as const },
  opacity: { duration: 0.12, ease: [0.4, 0, 1, 1] as const },
};

function ProjectRow({
  p,
  expandedProject,
  onToggleExpand,
  onCarouselOpen,
  shouldReduceMotion,
  emphasis = "supporting",
}: {
  p: Project;
  expandedProject: string | null;
  onToggleExpand: (name: string | null) => void;
  onCarouselOpen: () => void;
  shouldReduceMotion: boolean;
  emphasis?: "flagship" | "supporting";
}) {
  const isExpanded = expandedProject === p.name;
  const isFlagship = emphasis === "flagship";
  const rowRef = React.useRef<HTMLLIElement>(null);
  const supportingMeta = [p.role, p.launchStage ?? getProjectContextLabel(p)]
    .filter((value): value is string => Boolean(value))
    .slice(0, 2);
  const flagshipMeta = [
    p.role,
    p.launchStage ?? getProjectContextLabel(p),
    p.stack?.[0] ?? p.tags?.[0],
  ].filter((value): value is string => Boolean(value));

  return (
    <motion.li
      ref={rowRef}
      variants={item.slide}
      className="w-full max-w-full group"
    >
      <button
        onClick={() => onToggleExpand(isExpanded ? null : p.name)}
        aria-expanded={isExpanded}
        className={`
          relative w-full max-w-full overflow-hidden rounded-sm border border-transparent text-left px-2 sm:px-3 ${isFlagship ? "py-3.5" : "py-2.5"}
          transition-[color,background-color,border-color,transform] duration-300 ease-out
          hover:border-border/70 hover:bg-[hsl(var(--muted))]/35 active:scale-[0.99]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        `}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-2 left-0 w-px origin-top scale-y-0 bg-accent/70 transition-transform duration-300 ease-out group-hover:scale-y-100"
        />
        {isFlagship ? (
          <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden">
            <div className="relative h-20 w-24 sm:h-24 sm:w-36 flex-shrink-0 overflow-hidden rounded-sm ring-1 ring-inset ring-[hsl(var(--border))] bg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:ring-[hsl(var(--accent))]/45 group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.25)]">
              <ProjectMedia
                project={p}
                variant="row"
                sizes="(max-width: 640px) 96px, 144px"
              />
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <ProjectHoverPreview project={p}>
                <div className="cursor-pointer">
                  <p className="mb-0.5 truncate text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {getProjectContextLabel(p)}
                  </p>
                  <h3 className="truncate break-words text-base sm:text-lg font-medium leading-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                    {p.name}
                  </h3>
                </div>
              </ProjectHoverPreview>
              <p className="mt-1 line-clamp-2 break-words text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              {flagshipMeta.length > 0 && (
                <div className="mt-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {flagshipMeta.map((meta) => (
                    <span key={meta} className="max-w-full truncate">
                      {meta}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : spring.snappy}
              className="flex-shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full overflow-hidden">
            <div className="min-w-0 flex-1 overflow-hidden">
              <ProjectHoverPreview project={p}>
                <div className="flex min-w-0 cursor-pointer items-baseline gap-3">
                  <h3 className="flex-shrink-0 text-sm font-medium leading-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="hidden min-w-0 truncate text-xs text-muted-foreground sm:block">
                    {p.description}
                  </p>
                </div>
              </ProjectHoverPreview>
            </div>

            <span className="hidden flex-shrink-0 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:inline">
              {supportingMeta.join(" / ")}
            </span>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : spring.snappy}
              className="flex-shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              height: 0,
              transition: shouldReduceMotion
                ? { duration: 0 }
                : workCollapseTransition,
            }}
            transition={shouldReduceMotion ? { duration: 0 } : workRevealTransition}
            onAnimationComplete={(definition) => {
              // Once open, nudge into view only if the panel isn't fully
              // visible — scrollIntoView with "nearest" is a no-op otherwise.
              if (
                typeof definition === "object" &&
                definition !== null &&
                "height" in definition &&
                definition.height === "auto"
              ) {
                rowRef.current?.scrollIntoView({
                  block: "nearest",
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                });
              }
            }}
            className="px-1 pb-5 overflow-hidden"
          >
            <ProjectDetails project={p} onCarouselOpen={onCarouselOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

interface ProjectsShowcaseProps {
  embedded?: boolean;
}

function ProjectSection({
  title,
  description,
  projects,
  expandedProject,
  onToggleExpand,
  onCarouselOpen,
  shouldReduceMotion,
  emphasis = "supporting",
}: {
  title: string;
  description: string;
  projects: Project[];
  expandedProject: string | null;
  onToggleExpand: (name: string | null) => void;
  onCarouselOpen: () => void;
  shouldReduceMotion: boolean;
  emphasis?: "flagship" | "supporting";
}) {
  return (
    <section className="space-y-3">
      <motion.div
        variants={item.fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col gap-1 px-2 sm:px-3"
      >
        <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </motion.div>

      <motion.ul
        variants={container.list}
        initial={false}
        animate="visible"
        className="divide-y divide-[hsl(var(--border))]/50 overflow-x-hidden w-full max-w-full"
      >
        {projects.map((p) => (
          <ProjectRow
            key={p.name}
            p={p}
            expandedProject={expandedProject}
            onToggleExpand={onToggleExpand}
            onCarouselOpen={onCarouselOpen}
            shouldReduceMotion={shouldReduceMotion}
            emphasis={emphasis}
          />
        ))}
      </motion.ul>
    </section>
  );
}

export function ProjectsShowcase({ embedded = false }: ProjectsShowcaseProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const selectedProject: Project | null = expandedProject
    ? rankedProjects.find((p) => p.name === expandedProject) || null
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

        <div className="space-y-10">
          <ProjectSection
            title={embedded ? "Flagship work" : "Selected work"}
            description="Production interface work, shipped mobile products, a spatial music tool, and editorial client work."
            projects={flagshipProjects}
            expandedProject={expandedProject}
            onToggleExpand={setExpandedProject}
            onCarouselOpen={handleCarouselOpen}
            shouldReduceMotion={shouldReduceMotion}
            emphasis="flagship"
          />

          {supportingProjects.length > 0 && (
            <ProjectSection
              title="Supporting work"
              description="Additional products, current experiments, and shipped client builds, with lifecycle labels kept explicit."
              projects={supportingProjects}
              expandedProject={expandedProject}
              onToggleExpand={setExpandedProject}
              onCarouselOpen={handleCarouselOpen}
              shouldReduceMotion={shouldReduceMotion}
            />
          )}
        </div>
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

  return <main id="main-content">{content}</main>;
}

export default function ProjectsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#projects");
  }, [router]);

  return null;
}
