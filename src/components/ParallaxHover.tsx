"use client";

import { useRef } from "react";

type ParallaxHoverProps = {
  children: React.ReactNode;
  strength?: number; // pixels
  className?: string;
};

export function ParallaxHover({
  children,
  strength = 8,
  className,
}: ParallaxHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    el.style.transform = `translate3d(${dx * strength}px, ${
      dy * strength
    }px, 0)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform", transition: "transform 200ms ease" }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}
