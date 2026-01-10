"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SkillCategoryProps {
  category: string;
  items: string[];
  compact?: boolean;
  collapsible?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}

export function SkillCategory({
  category,
  items,
  compact = false,
  collapsible = false,
  expanded = true,
  onToggle,
}: SkillCategoryProps) {
  const contentId = `skills-${category.toLowerCase().replace(/\s+/g, "-")}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={compact ? "mt-6" : "mt-8"}>
      <div>
        {collapsible ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={onToggle}
            className="resume-label inline-flex items-center gap-2 select-none hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          >
            <span>{category}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
              initial={false}
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 30 }
              }
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"
                clipRule="evenodd"
              />
            </motion.svg>
          </button>
        ) : (
          <span className="resume-label">{category}</span>
        )}
      </div>
      <motion.div
        id={contentId}
        aria-hidden={!expanded}
        initial={false}
        animate={
          expanded
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: prefersReducedMotion ? 0 : 0 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.2,
          ease: "easeInOut",
        }}
        style={{ overflow: "hidden" }}
        className={compact ? "mt-2" : "mt-2"}
      >
        <div
          className={
            (compact ? "block text-[13px] leading-6" : "block text-sm") +
            " font-normal text-muted-foreground font-inter"
          }
        >
          {items.map((item, index) => (
            <motion.span
              key={index}
              initial={false}
              animate={
                expanded
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReducedMotion ? 0 : 2 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.15,
                delay: expanded ? index * 0.02 : 0,
              }}
            >
              {item}
              <br />
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
