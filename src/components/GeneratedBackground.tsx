"use client";

import React from "react";
import PastelHazeBackground from "@/components/PastelHazeBackground";
import ParticleField from "@/components/ParticleField";
import AuroraBackground from "@/components/AuroraBackground";
import FlowFieldBackground from "@/components/FlowFieldBackground";
import MeshWarpBackground from "@/components/MeshWarpBackground";
import VhsScanlines from "@/components/VhsScanlines";
import MatrixRain from "@/components/MatrixRain";
import ShaderBackground from "@/components/ShaderBackground";
import { buildShaderFromTemplate } from "@/lib/shaderTemplates";

export type BackgroundLayer =
  | { type: "haze"; opacity?: number; speed?: number; hueBias?: number }
  | {
      type: "particles";
      count?: number;
      color?: string;
      size?: number;
      trail?: number;
    }
  | { type: "aurora"; opacity?: number; speed?: number }
  | {
      type: "flow";
      lineCount?: number;
      color?: string;
      lineWidth?: number;
      glow?: number;
    }
  | { type: "mesh"; opacity?: number }
  | {
      type: "vhs";
      opacity?: number;
      lineOpacity?: number;
      gap?: number;
      wobble?: number;
      speed?: number;
      chroma?: boolean;
    }
  | {
      type: "matrix";
      fontSize?: number;
      headColor?: string;
      tailColor?: string;
      tailLength?: number;
      speedMin?: number;
      speedMax?: number;
    }
  | {
      type: "shader";
      frag: string;
      uniforms?: { seed?: number; colorA?: string; colorB?: string };
    }
  | {
      type: "shaderTemplate";
      template: string;
      uniforms?: { seed?: number; colorA?: string; colorB?: string } & Record<
        string,
        number | string
      >;
    };

export type GeneratedStyle = {
  id: string;
  name: string;
  prompt: string;
  recipe: BackgroundLayer[];
};

export default function GeneratedBackground({
  className = "",
  recipe = [],
}: {
  className?: string;
  recipe?: BackgroundLayer[] | undefined;
}) {
  if (!recipe || recipe.length === 0) {
    try {
      console.log("[GeneratedBackground] empty recipe");
    } catch {}
    return null;
  }
  return (
    <div
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    >
      {recipe.map((layer, i) => {
        try {
          if (i === 0) console.log("[GeneratedBackground] layer0", layer?.type);
        } catch {}
        switch (layer.type) {
          case "haze":
            return (
              <PastelHazeBackground
                key={i}
                className="absolute inset-0"
                opacity={layer.opacity ?? 0.32}
                speed={layer.speed ?? 0.22}
                hueBias={layer.hueBias ?? 0}
              />
            );
          case "particles":
            return (
              <ParticleField
                key={i}
                className="absolute inset-0"
                count={layer.count ?? 70}
                color={layer.color ?? "rgba(255,255,255,0.4)"}
                size={layer.size ?? 1}
                trail={layer.trail ?? 0.06}
                linkDistance={0}
                linkColor="255,255,255"
                linkOpacity={0}
              />
            );
          case "aurora":
            return (
              <AuroraBackground
                key={i}
                className="absolute inset-0"
                opacity={layer.opacity ?? 0.5}
                speed={layer.speed ?? 0.16}
              />
            );
          case "flow":
            return (
              <FlowFieldBackground
                key={i}
                className="absolute inset-0"
                lineCount={layer.lineCount ?? 1200}
                color={layer.color ?? "rgba(255,255,255,0.12)"}
                lineWidth={layer.lineWidth ?? 1.2}
                glow={layer.glow ?? 3}
                blendMode="screen"
              />
            );
          case "mesh":
            return (
              <MeshWarpBackground
                key={i}
                className="absolute inset-0"
                opacity={layer.opacity ?? 0.5}
              />
            );
          case "vhs":
            return (
              <VhsScanlines
                key={i}
                className="absolute inset-0"
                opacity={layer.opacity ?? 0.22}
                lineOpacity={layer.lineOpacity ?? 0.22}
                gap={layer.gap ?? 2}
                wobble={layer.wobble ?? 1.0}
                speed={layer.speed ?? 0.9}
                chroma={layer.chroma ?? true}
              />
            );
          case "matrix":
            return (
              <MatrixRain
                key={i}
                className="absolute inset-0"
                fontSize={layer.fontSize ?? 14}
                headColor={layer.headColor ?? "#C9FFD3"}
                tailColor={layer.tailColor ?? "#00FF7F"}
                tailLength={layer.tailLength ?? 22}
                speedMin={layer.speedMin ?? 0.9}
                speedMax={layer.speedMax ?? 1.8}
              />
            );
          case "shader":
            return (
              <ShaderBackground
                key={i}
                className="absolute inset-0"
                frag={layer.frag}
                uniforms={layer.uniforms}
              />
            );
          case "shaderTemplate": {
            const frag = buildShaderFromTemplate(
              layer.template,
              layer.uniforms || {}
            );
            return (
              <ShaderBackground
                key={i}
                className="absolute inset-0"
                frag={frag}
                uniforms={layer.uniforms}
              />
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
