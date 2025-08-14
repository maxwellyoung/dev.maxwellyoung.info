"use client";

import React from "react";
import { useArtStyle, ArtStyle } from "@/components/providers/ArtStyleProvider";
import LiquidGlassLoader from "@/components/LiquidGlassLoader";

const styles: { key: ArtStyle; label: string; hint?: string }[] = [
  { key: "default", label: "Default (no bg)" },
  { key: "aurora", label: "Aurora" },
  { key: "dots", label: "Dot Matrix" },
  { key: "particles", label: "Particle Field" },
  { key: "fireflies", label: "Fireflies", hint: "quaint and gentle" },
  { key: "film", label: "Brakhage Film" },
  { key: "matrix", label: "Matrix" },
  { key: "vhs", label: "VHS Scanlines" },
  { key: "flow", label: "Flow Field" },
  { key: "fluid", label: "Fluid Ink (interactive)" },
  { key: "city", label: "Isometric City" },
];

export default function ArtStyleMenu() {
  const {
    style,
    setStyle,
    isMenuOpen,
    toggleMenu,
    customPrompt,
    setCustomPrompt,
    generatedStyles,
    addGeneratedStyle,
    removeGeneratedStyle,
    setActiveGeneratedId,
    renameGeneratedStyle,
    duplicateGeneratedStyle,
    activeGeneratedId,
  } = useArtStyle();
  const [copied, setCopied] = React.useState(false);
  const [ripple, setRipple] = React.useState(false);
  const [localPrompt, setLocalPrompt] = React.useState(customPrompt || "");
  const [loading, setLoading] = React.useState(false);
  // removed shaderOnly toggle; always generating shaders by default via the button below
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("maxtheyoung@gmail.com");
      setCopied(true);
      setRipple(true);
      setTimeout(() => setCopied(false), 1200);
      setTimeout(() => setRipple(false), 500);
    } catch {}
  };
  if (!isMenuOpen)
    return (
      <button
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 z-[60] h-9 rounded-full px-3 text-xs bg-white/80 text-neutral-900 backdrop-blur ring-1 ring-black/10 hover:bg-white"
        title="Art styles (Ctrl/Cmd+Shift+A)"
        aria-label="Open art styles"
      >
        styles
      </button>
    );

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
      <LiquidGlassLoader visible={loading} text={"Generating shader…"} />
      <div className="absolute inset-0 bg-black/40" onClick={toggleMenu} />
      <div className="relative w-full max-w-sm rounded-2xl bg-neutral-900/80 backdrop-blur ring-1 ring-white/10 p-0 text-sm text-white overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-neutral-900/80 backdrop-blur border-b border-white/10">
          <h3 className="text-white/90">Art styles</h3>
          <button
            onClick={toggleMenu}
            className="text-white/70 hover:text-white"
          >
            close
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {styles.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                try {
                  console.log("[ArtStyleMenu] click", s.key);
                } catch {}
                setStyle(s.key);
              }}
              className={
                "w-full text-left rounded-lg px-3 py-2 ring-1 transition " +
                (style === s.key
                  ? "bg-white/10 ring-white/30"
                  : "bg-transparent ring-white/10 hover:bg-white/5")
              }
            >
              <div className="flex items-center justify-between">
                <span>{s.label}</span>
                {s.hint && (
                  <span className="text-[11px] text-white/50">{s.hint}</span>
                )}
              </div>
            </button>
          ))}
          <div className="pt-2 mt-4 border-t border-white/10">
            <label className="block text-xs text-white/60 mb-1">
              Describe a vibe
            </label>
            <input
              value={localPrompt}
              onChange={(e) => setLocalPrompt(e.target.value)}
              placeholder="e.g. candlelit cabin, soft fireflies, midnight blue"
              className="w-full rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm outline-none focus:ring-white/30 placeholder:text-white/30"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={async () => {
                  setCustomPrompt(localPrompt);
                  setStyle("ai");
                  try {
                    setLoading(true);
                    const res = await fetch("/api/artstyle/shader", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ prompt: localPrompt }),
                    });
                    const data = await res.json();
                    if (data?.id && Array.isArray(data?.recipe)) {
                      addGeneratedStyle({
                        id: data.id,
                        name: data.name || "Shader",
                        prompt: data.prompt || localPrompt,
                        recipe: data.recipe,
                      });
                      setActiveGeneratedId(data.id);
                      toggleMenu();
                    }
                  } catch {
                  } finally {
                    setLoading(false);
                  }
                }}
                className="rounded-md ring-1 ring-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
              >
                {loading ? "thinking…" : "Generate shader"}
              </button>
              <button
                onClick={() => {
                  setLocalPrompt("");
                  setCustomPrompt("");
                }}
                className="rounded-md ring-1 ring-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
              >
                clear
              </button>
            </div>
          </div>
          {generatedStyles.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="text-xs text-white/60 mb-2">Generated</div>
              <div className="space-y-2">
                {generatedStyles.map((g) => (
                  <div key={g.id} className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setStyle("ai");
                        setActiveGeneratedId(g.id);
                      }}
                      className={
                        "flex-1 text-left rounded-lg px-3 py-2 ring-1 transition " +
                        (style === "ai" && g.id === activeGeneratedId
                          ? "bg-white/10 ring-white/30"
                          : "bg-transparent ring-white/10 hover:bg-white/5")
                      }
                    >
                      <div className="text-sm flex items-center gap-2">
                        <span>{g.name}</span>
                      </div>
                      <div className="text-[11px] text-white/50 line-clamp-1">
                        {g.prompt}
                      </div>
                    </button>
                    <button
                      onClick={() => removeGeneratedStyle(g.id)}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Remove"
                    >
                      ×
                    </button>
                    <button
                      onClick={() => duplicateGeneratedStyle(g.id)}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Duplicate"
                    >
                      ⧉
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-4 py-3 flex items-center justify-start gap-2 border-t border-white/10 text-xs text-white/60">
          Tip: Ctrl/Cmd+Shift+A
        </div>
      </div>
    </div>
  );
}
