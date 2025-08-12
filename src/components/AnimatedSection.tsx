"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef, type HTMLAttributes, type ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function AnimatedSection({
  children,
  className,
  ...rest
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`section-fade-in ${isVisible ? "is-visible" : ""} ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
