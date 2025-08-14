"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PastelHazeBackground from "@/components/PastelHazeBackground";
import DotMatrix from "@/components/DotMatrix";
import BrakhageOverlay from "@/components/BrakhageOverlay";
import GlassFlareOverlay from "@/components/GlassFlareOverlay";
import GeoCitiesBackground from "@/components/GeoCitiesBackground";
import VhsScanlines from "@/components/VhsScanlines";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import MeshWarpBackground from "@/components/MeshWarpBackground";
import AsciiRain from "@/components/AsciiRain";
import MatrixRain from "@/components/MatrixRain";
import FlowFieldBackground from "@/components/FlowFieldBackground";
import FluidInkBackground from "@/components/FluidInkBackground";
import CityScene from "@/components/CityScene";
import PromptBackground from "@/components/PromptBackground";
import GeneratedBackground, {
  GeneratedStyle,
} from "@/components/GeneratedBackground";

export type ArtStyle =
  | "default"
  | "haze"
  | "dots"
  | "film"
  | "geocities"
  | "vhs"
  | "aurora"
  | "particles"
  | "mesh"
  | "ascii"
  | "matrix"
  | "flow"
  | "fluid"
  | "city"
  | "fireflies"
  | "ai";
// additional flex modes
// "fluid" and "city" added below

type Ctx = {
  style: ArtStyle;
  setStyle: (s: ArtStyle) => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
  customPrompt: string;
  setCustomPrompt: (s: string) => void;
  // generated AI styles
  generatedStyles: GeneratedStyle[];
  addGeneratedStyle: (g: GeneratedStyle) => void;
  removeGeneratedStyle: (id: string) => void;
  activeGeneratedId: string | null;
  setActiveGeneratedId: (id: string | null) => void;
  renameGeneratedStyle: (id: string, name: string) => void;
  duplicateGeneratedStyle: (id: string) => void;
  defaultGeneratedId: string | null;
  setDefaultGeneratedId: (id: string | null) => void;
};

const ArtStyleContext = createContext<Ctx | null>(null);

export function useArtStyle() {
  const ctx = useContext(ArtStyleContext);
  if (!ctx) throw new Error("useArtStyle must be used within ArtStyleProvider");
  return ctx;
}

export default function ArtStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [style, setStyle] = useState<ArtStyle>("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedStyles, setGeneratedStyles] = useState<GeneratedStyle[]>([]);
  const [activeGeneratedId, setActiveGeneratedId] = useState<string | null>(
    null
  );
  const [defaultGeneratedId, setDefaultGeneratedId] = useState<string | null>(
    null
  );

  // hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("art-style");
      const allowed: ArtStyle[] = [
        "default",
        "haze",
        "dots",
        "film",
        "geocities",
        "vhs",
        "aurora",
        "particles",
        "mesh",
        "ascii",
        "matrix",
        "flow",
        "fluid",
        "city",
        "fireflies",
        "ai",
      ];
      if (allowed.includes(saved as ArtStyle)) {
        setStyle(saved as ArtStyle);
        const prompt = localStorage.getItem("art-style-prompt");
        if (prompt) setCustomPrompt(prompt);
        const gen = localStorage.getItem("art-style-generated");
        if (gen) {
          try {
            const parsed = JSON.parse(gen) as GeneratedStyle[];
            setGeneratedStyles(parsed);
          } catch {}
        }
        const activeId = localStorage.getItem("art-style-active-generated");
        if (activeId) setActiveGeneratedId(activeId);
        const defId = localStorage.getItem("art-style-default-generated");
        if (defId) setDefaultGeneratedId(defId);
        // import via URL hash: #bg=<base64>
        try {
          const hash = window.location.hash;
          if (hash.startsWith("#bg=")) {
            const json = atob(hash.slice(4));
            const obj = JSON.parse(json);
            if (obj && obj.id && obj.recipe) {
              setGeneratedStyles((prev) => [
                obj,
                ...prev.filter((x) => x.id !== obj.id),
              ]);
              setActiveGeneratedId(obj.id);
              setStyle("ai");
            }
          }
        } catch {}
      } else if (typeof window !== "undefined" && window.innerWidth < 768) {
        // prefer no background by default on small screens
        setStyle("default");
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("art-style", style);
      if (style === "ai") {
        localStorage.setItem("art-style-prompt", customPrompt);
      }
      localStorage.setItem(
        "art-style-generated",
        JSON.stringify(generatedStyles)
      );
      if (activeGeneratedId) {
        localStorage.setItem("art-style-active-generated", activeGeneratedId);
      } else {
        localStorage.removeItem("art-style-active-generated");
      }
      if (defaultGeneratedId) {
        localStorage.setItem("art-style-default-generated", defaultGeneratedId);
      } else {
        localStorage.removeItem("art-style-default-generated");
      }
    } catch {}
    // DEBUG LOGS: style changes + background counts
    try {
      // eslint-disable-next-line no-console
      console.log("[ArtStyle] style=", style);
      // eslint-disable-next-line no-console
      console.log(
        "[ArtStyle] provider backgrounds present:",
        document.querySelectorAll("[data-art-bg]")?.length
      );
      // eslint-disable-next-line no-console
      console.log(
        "[ArtStyle] page canvases (fixed inset-0):",
        document.querySelectorAll("canvas.pointer-events-none.fixed.inset-0")
          ?.length
      );
      // eslint-disable-next-line no-console
      console.log(
        "[ArtStyle] dot-matrix nodes:",
        document.querySelectorAll(".dot-matrix")?.length
      );
    } catch {}
  }, [
    style,
    customPrompt,
    generatedStyles,
    activeGeneratedId,
    defaultGeneratedId,
  ]);

  // keyboard toggle: Cmd/Ctrl + Shift + A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsMenuOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      style,
      setStyle,
      toggleMenu: () => setIsMenuOpen((v) => !v),
      isMenuOpen,
      customPrompt,
      setCustomPrompt,
      generatedStyles,
      addGeneratedStyle: (g: GeneratedStyle) =>
        setGeneratedStyles((prev) => {
          const next = [g, ...prev.filter((x) => x.id !== g.id)];
          return next;
        }),
      removeGeneratedStyle: (id: string) =>
        setGeneratedStyles((prev) => prev.filter((x) => x.id !== id)),
      activeGeneratedId,
      setActiveGeneratedId,
      renameGeneratedStyle: (id: string, name: string) =>
        setGeneratedStyles((prev) =>
          prev.map((x) => (x.id === id ? { ...x, name } : x))
        ),
      duplicateGeneratedStyle: (id: string) =>
        setGeneratedStyles((prev) => {
          const g = prev.find((x) => x.id === id);
          if (!g) return prev;
          const copy = { ...g, id: `${g.id}-copy`, name: `${g.name} (copy)` };
          return [copy, ...prev];
        }),
      defaultGeneratedId,
      setDefaultGeneratedId,
    }),
    [
      style,
      isMenuOpen,
      customPrompt,
      generatedStyles,
      activeGeneratedId,
      defaultGeneratedId,
    ]
  );

  return (
    <ArtStyleContext.Provider value={value}>
      {/* global background renderer */}
      {style === "haze" && (
        <>
          <PastelHazeBackground
            className="fixed inset-0 z-0"
            opacity={0.32}
            speed={0.24}
            blobCount={8}
            grainIntensity={0.018}
            grainFPS={8}
          />
          {/* subtle flare on desktop for premium glass feel */}
          <GlassFlareOverlay className="hidden md:block" strength={0.06} />
        </>
      )}
      {style === "dots" && (
        <DotMatrix className="fixed inset-0 z-0 opacity-60" />
      )}
      {style === "film" && (
        <>
          <PastelHazeBackground
            className="fixed inset-0 z-0"
            opacity={0.28}
            speed={0.22}
            blobCount={7}
            grainIntensity={0.03}
            grainFPS={9}
          />
          <BrakhageOverlay
            className="z-[2]"
            flickerIntensity={0.08}
            grainIntensity={0.06}
            grainFPS={8}
            scratchDensity={0.6}
          />
        </>
      )}
      {style === "geocities" && (
        <GeoCitiesBackground className="fixed inset-0 z-0" />
      )}
      {style === "vhs" && (
        <VhsScanlines
          className="z-0"
          opacity={0.22}
          lineOpacity={0.22}
          gap={2}
          wobble={1.2}
          speed={0.9}
          chroma
        />
      )}
      {style === "aurora" && (
        <AuroraBackground className="z-0" opacity={0.5} speed={0.16} />
      )}
      {style === "particles" && (
        <ParticleField
          className="z-0"
          count={90}
          color="rgba(255,255,255,0.62)"
          size={1.2}
          trail={0.08}
          linkDistance={120}
          linkColor="255,255,255"
          linkOpacity={0.18}
        />
      )}
      {style === "fireflies" && (
        <ParticleField
          className="z-0"
          count={60}
          color="rgba(255,235,130,0.9)"
          size={1.4}
          trail={0.06}
          linkDistance={0}
          linkColor="255,235,130"
          linkOpacity={0}
        />
      )}
      {style === "mesh" && <MeshWarpBackground className="z-0" opacity={0.5} />}
      {style === "ascii" && (
        <AsciiRain className="z-0" density={0.92} color="#7CFFB2" />
      )}
      {style === "matrix" && (
        <MatrixRain
          className="z-0"
          fontSize={14}
          headColor="#C9FFD3"
          tailColor="#00FF7F"
          tailLength={22}
          speedMin={0.9}
          speedMax={1.8}
        />
      )}
      {style === "flow" && (
        <FlowFieldBackground
          className="z-0"
          lineCount={1400}
          color="rgba(255,255,255,0.16)"
          lineWidth={1.25}
          glow={4}
          blendMode="screen"
        />
      )}
      {style === "fluid" && (
        <FluidInkBackground
          className="z-0"
          quality={1}
          viscosity={0.06}
          swirl={0.28}
          hueShift={0.12}
        />
      )}
      {style === "city" && (
        <CityScene className="fixed inset-0 z-0" snow crowd lights speed={1} />
      )}
      {style === "ai" &&
        (activeGeneratedId || defaultGeneratedId ? (
          <GeneratedBackground
            className="z-0"
            recipe={
              generatedStyles.find(
                (g) => g.id === (activeGeneratedId || defaultGeneratedId)
              )?.recipe
            }
          />
        ) : (
          <PromptBackground className="z-0" prompt={customPrompt} />
        ))}
      {/* default = no background */}
      {children}
    </ArtStyleContext.Provider>
  );
}
