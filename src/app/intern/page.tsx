"use client";

import React from "react";
import InternInfo from "@/components/InternInfo";
import PastelHazeBackground from "@/components/PastelHazeBackground";
import { useArtStyle } from "@/components/providers/ArtStyleProvider";

export default function InternPage() {
  const { style } = useArtStyle();

  return (
    <div className="relative min-h-screen">
      {style === "default" && (
        <PastelHazeBackground
          className="fixed inset-0 z-0"
          opacity={0.5}
          speed={0.35}
          blobCount={9}
          grainIntensity={0.04}
          grainFPS={8}
          data-art-bg
        />
      )}
      <div className="relative z-10 mx-auto max-w-2xl p-4 md:p-8">
        <InternInfo />
      </div>
      <a
        href="/"
        className="absolute top-4 left-4 z-10 text-xs text-muted-foreground hover:text-foreground underline transition-colors"
      >
        back
      </a>
    </div>
  );
}
