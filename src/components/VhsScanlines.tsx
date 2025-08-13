"use client";

import React from "react";

type Props = {
  className?: string;
  opacity?: number;
};

export default function VhsScanlines({
  className = "",
  opacity = 0.12,
}: Props) {
  // Pure CSS overlay: repeating linear gradient for scanlines plus subtle flicker.
  return (
    <div
      aria-hidden
      className={["pointer-events-none fixed inset-0", className].join(" ")}
      style={{
        zIndex: 0,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,1) 2px)",
        backgroundSize: "100% 3px",
        opacity,
        mixBlendMode: "multiply",
        animation: "vhsFlicker 2.2s steps(2, end) infinite",
      }}
    >
      <style>{`
        @keyframes vhsFlicker {
          0% { opacity: ${opacity}; transform: translateY(0); }
          50% { opacity: ${opacity * 0.85}; transform: translateY(-0.5px); }
          100% { opacity: ${opacity}; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
