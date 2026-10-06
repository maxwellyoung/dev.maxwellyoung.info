"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Carousel from "@/components/Carousel";
import {
  Project,
  independentApps,
  selectedWorkProjects,
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
  // One metadata grammar for every row. "Solo" is the default, so only a
  // different role (Lead, Designer & Developer) earns a place.
  const meta = [
    p.role === "Solo" ? undefined : p.role,
    p.launchStage,
    p.stack?.[0] ?? p.tags?.[0],
  ]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

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
          relative w-full max-w-full overflow-hidden rounded-md text-left px-2 sm:px-3 ${isFlagship ? "py-3.5" : "py-2.5"}
          transition-[background-color,transform] duration-150 ease-out
          hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        `}
      >
        {isFlagship ? (
          <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden">
            <div className="relative h-[5.5rem] w-28 sm:h-28 sm:w-44 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-inset ring-[hsl(var(--border))] bg-muted">
              <ProjectMedia
                project={p}
                variant="row"
                sizes="(max-width: 640px) 112px, 176px"
              />
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <ProjectHoverPreview project={p}>
                <div className="cursor-pointer">
                  <h3 className="break-words text-base sm:text-lg font-medium leading-tight text-foreground">
                    {p.name}
                  </h3>
                </div>
              </ProjectHoverPreview>
              <p className="mt-1 line-clamp-2 break-words text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              {meta && (
                <p className="mt-2 truncate text-xs text-muted-foreground">
                  {meta}
                </p>
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
            <div
              aria-hidden="true"
              className="relative h-11 w-14 flex-shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-inset ring-[hsl(var(--border))]"
            >
              <ProjectMedia project={p} variant="row" sizes="56px" />
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <ProjectHoverPreview project={p}>
                <div className="flex min-w-0 cursor-pointer items-baseline gap-3">
                  <h3 className="flex-shrink-0 text-sm font-medium leading-tight text-foreground">
                    {p.name}
                  </h3>
                  <p className="hidden min-w-0 truncate text-xs text-muted-foreground sm:block">
                    {p.description}
                  </p>
                </div>
              </ProjectHoverPreview>
            </div>

            <span className="hidden flex-shrink-0 text-xs text-muted-foreground sm:inline">
              {p.launchStage}
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
            {p.proof ? (
              <div className="mb-4 ml-1 border-l border-border/60 py-1 pl-3 sm:ml-2">
                <p className="text-xs font-medium text-foreground">{p.proof.label}</p>
                <p className="mt-1 max-w-lg text-xs leading-relaxed text-muted-foreground">{p.proof.text}</p>
                {p.proof.href ? (
                  <Link href={p.proof.href} className="mt-1 inline-flex min-h-11 items-center text-xs underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    {p.proof.href.startsWith("/case-study/") ? "View the case study" : p.proof.href === "/resume" ? "Research role and responsibilities" : "See the native app on Google Play"} <span aria-hidden="true" className="ml-1">↗</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
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
  id,
  title,
  projects,
  expandedProject,
  onToggleExpand,
  onCarouselOpen,
  shouldReduceMotion,
  emphasis = "supporting",
}: {
  id?: string;
  title: string;
  projects: Project[];
  expandedProject: string | null;
  onToggleExpand: (name: string | null) => void;
  onCarouselOpen: () => void;
  shouldReduceMotion: boolean;
  emphasis?: "flagship" | "supporting";
}) {
  return (
    <section id={id} className="space-y-3 scroll-mt-6">
      <motion.div
        variants={item.fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-2 sm:px-3"
      >
        <h2 className="text-sm font-medium text-muted-foreground">
          {title}
        </h2>
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
            title="Selected work"
            projects={selectedWorkProjects}
            expandedProject={expandedProject}
            onToggleExpand={setExpandedProject}
            onCarouselOpen={handleCarouselOpen}
            shouldReduceMotion={shouldReduceMotion}
            emphasis="flagship"
          />

          <ProjectSection
            title="Independent apps"
            projects={independentApps}
            expandedProject={expandedProject}
            onToggleExpand={setExpandedProject}
            onCarouselOpen={handleCarouselOpen}
            shouldReduceMotion={shouldReduceMotion}
            emphasis="flagship"
          />

          {supportingProjects.length > 0 && (
            <ProjectSection
              id="other-work"
              title="Other work"
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
        <DialogContent
          hideCloseButton
          className="max-w-none w-screen h-screen p-0"
        >
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
