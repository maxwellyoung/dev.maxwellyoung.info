"use client";

import React from "react";

type Props = {
  className?: string;
  opacity?: number;
  jitter?: number; // px vertical jitter amount
  noise?: number; // overlay grain strength 0..1
  skew?: number; // CSS skewX degrees
};

export default function VhsScanlines({
  className = "",
  opacity = 0.12,
  jitter = 0.6,
  noise = 0.06,
  skew = -0.4,
}: Props) {
  // Pure CSS overlay: repeating linear gradient for scanlines plus subtle flicker.
  return (
    <div
      aria-hidden
      className={["pointer-events-none fixed inset-0", className].join(" ")}
      style={{
        zIndex: 0,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,1) 2px), radial-gradient(circle at 50% 50%, rgba(255,255,255,${noise}), rgba(255,255,255,0) 60%)`,
        backgroundSize: "100% 3px, 160px 160px",
        backgroundBlendMode: "multiply",
        opacity,
        transform: `skewX(${skew}deg)`,
        animation:
          "vhsFlicker 1.8s steps(2, end) infinite, vhsJitter 3.5s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes vhsFlicker {
          0% { opacity: ${opacity}; }
          50% { opacity: ${opacity * 0.85}; }
          100% { opacity: ${opacity}; }
        }
        @keyframes vhsJitter {
          0% { transform: translateY(0) }
          25% { transform: translateY(-${jitter}px) }
          50% { transform: translateY(${jitter / 2}px) }
          75% { transform: translateY(-${jitter / 3}px) }
          100% { transform: translateY(0) }
        }
      `}</style>
    </div>
  );
}
