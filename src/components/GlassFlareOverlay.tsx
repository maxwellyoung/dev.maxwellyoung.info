"use client";

import React, { useEffect, useRef } from "react";

type GlassFlareOverlayProps = {
  className?: string;
  strength?: number; // 0-1 alpha multiplier
};

/**
 * Subtle pointer-following specular flare overlay to enhance glass feel.
 * Cheap and purely CSS/DOM (no canvas).
 */
export default function GlassFlareOverlay({
  className = "",
  strength = 0.08,
}: GlassFlareOverlayProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--fx", `${x}%`);
      el.style.setProperty("--fy", `${y}%`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={["pointer-events-none fixed inset-0 z-[3]", className].join(
        " "
      )}
      style={{
        background: `radial-gradient(400px 280px at var(--fx,50%) var(--fy,35%), rgba(255,255,255,${strength}), rgba(255,255,255,0) 60%)`,
      }}
      aria-hidden
    />
  );
}
