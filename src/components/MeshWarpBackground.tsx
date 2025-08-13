"use client";

import React from "react";

type Props = { className?: string; opacity?: number };

export default function MeshWarpBackground({
  className = "",
  opacity = 0.45,
}: Props) {
  // CSS-only multi-radial gradient mesh with gentle drift
  return (
    <div
      aria-hidden
      className={["pointer-events-none fixed inset-0", className].join(" ")}
      style={{
        zIndex: 0,
        opacity,
        backgroundImage:
          "radial-gradient(30% 30% at 20% 20%, rgba(255,135,135,0.65), transparent 60%)," +
          "radial-gradient(30% 30% at 80% 30%, rgba(135,160,255,0.65), transparent 60%)," +
          "radial-gradient(30% 30% at 30% 80%, rgba(135,255,210,0.6), transparent 60%)," +
          "radial-gradient(30% 30% at 75% 75%, rgba(255,210,135,0.6), transparent 60%)",
        backgroundRepeat: "no-repeat",
        animation: "meshDrift 16s ease-in-out infinite alternate",
      }}
    >
      <style>{`
        @keyframes meshDrift {
          0% { filter: hue-rotate(0deg) saturate(0.9); transform: translateY(0); }
          50% { filter: hue-rotate(10deg) saturate(1); transform: translateY(-2%); }
          100% { filter: hue-rotate(0deg) saturate(0.95); transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
