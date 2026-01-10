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
    pinnedStyles,
    pinGeneratedStyle,
    unpinGeneratedStyle,
    addGeneratedStyle,
    removeGeneratedStyle,
    setActiveGeneratedId,
    renameGeneratedStyle,
    duplicateGeneratedStyle,
    updateGeneratedStyle,
    activeGeneratedId,
  } = useArtStyle();
  // removed copy interactions
  const [localPrompt, setLocalPrompt] = React.useState(customPrompt || "");
  const [loading, setLoading] = React.useState(false);
  const [pulse, setPulse] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [tilt, setTilt] = React.useState<{ rx: number; ry: number }>({
    rx: 0,
    ry: 0,
  });
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  // derive adaptive accent color from current style/prompt
  const activeGenerated = React.useMemo(
    () => generatedStyles.find((g) => g.id === activeGeneratedId),
    [generatedStyles, activeGeneratedId]
  );
  function cssColorToRgbString(input?: string): string | null {
    if (!input) return null;
    try {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d");
      if (!ctx) return null;
      ctx.fillStyle = input;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return `${d[0]},${d[1]},${d[2]}`;
    } catch {
      return null;
    }
  }
  const accentRgb = React.useMemo(() => {
    // prioritize AI shader palette if available
    if (style === "ai" && activeGenerated?.recipe?.length) {
      const shaderLayer = activeGenerated.recipe.find(
        (l) => l.type === "shader" || l.type === "shaderTemplate"
      ) as any;
      const u = shaderLayer?.uniforms || {};
      const pick = (u.colorA as string) || (u.colorB as string);
      const rgb = cssColorToRgbString(pick);
      if (rgb) return rgb;
    }
    // fallbacks based on style
    const byStyle: Record<string, string> = {
      aurora: "99,196,255",
      fireflies: "255,235,130",
      matrix: "0,255,127",
      vhs: "255,153,204",
      flow: "124,255,178",
    };
    return byStyle[style] || "58,131,255"; // default blue
  }, [style, activeGenerated]);

  // reduced motion preference
  React.useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReducedMotion(!!mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {}
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height; // 0..1
    const rx = (x - 0.5) * 10; // yaw
    const ry = (0.5 - y) * 6; // pitch
    setTilt({ rx, ry });
    // update sheen hotspot
    const mx = Math.round(x * 100);
    const my = Math.round(y * 100);
    try {
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
    } catch {}
  };

  const onPointerLeave = () => {
    setIsHover(false);
    setIsPressed(false);
    setTilt({ rx: 0, ry: 0 });
  };
  // No floating button - accessed via command palette only
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
      <LiquidGlassLoader visible={loading} text={"Generating shader…"} />
      <div className="absolute inset-0 bg-black/40" onClick={toggleMenu} />
      <div className="relative w-full max-w-sm rounded-2xl bg-neutral-900/80 backdrop-blur ring-1 ring-white/10 p-0 text-sm text-white overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-neutral-900/80 backdrop-blur border-b border-white/10">
          <h3 className="text-white/90">Background Shaders</h3>
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
              onClick={() => setStyle(s.key)}
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
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={async () => {
                  setCustomPrompt(localPrompt);
                  setStyle("ai");
                  try {
                    setLoading(true);
                    setPulse(true);
                    const res = await fetch("/api/artstyle/shader", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        prompt: localPrompt,
                        seed: Math.floor(Math.random() * 1_000_000),
                      }),
                    });
                    const data = await res.json();
                    if (data?.id && Array.isArray(data?.recipe)) {
                      addGeneratedStyle({
                        id: data.id,
                        name: data.name || "Generated",
                        prompt: data.prompt || localPrompt,
                        recipe: data.recipe,
                      });
                      setActiveGeneratedId(data.id);
                      toggleMenu();
                    }
                  } catch {
                  } finally {
                    setLoading(false);
                    setTimeout(() => setPulse(false), 300);
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
              <button
                onClick={() => setShowAdvanced((v) => !v)}
                className="ml-auto text-xs text-white/60 hover:text-white/90"
                aria-expanded={showAdvanced}
              >
                {showAdvanced ? "Hide advanced" : "Advanced"}
              </button>
            </div>
          </div>
          {showAdvanced && pinnedStyles.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="text-xs text-white/60 mb-2">Pinned</div>
              <div className="space-y-2">
                {pinnedStyles.map((g) => (
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
                      onClick={() => unpinGeneratedStyle(g.id)}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Unpin"
                    >
                      📌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showAdvanced && generatedStyles.length > 0 && (
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
                      onClick={() => pinGeneratedStyle(g.id)}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Pin"
                    >
                      📌
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
                    <button
                      onClick={async () => {
                        try {
                          // Regenerate shader using same prompt; keep same id and overwrite recipe
                          setPulse(true);
                          const res = await fetch("/api/artstyle/shader", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ prompt: g.prompt }),
                          });
                          const data = await res.json();
                          if (data?.recipe) {
                            updateGeneratedStyle(g.id, (prev) => ({
                              ...prev,
                              recipe: data.recipe,
                            }));
                            setActiveGeneratedId(g.id);
                            setStyle("ai");
                          }
                        } catch {}
                      }}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Regenerate"
                    >
                      ↻
                    </button>
                    <button
                      onClick={() => {
                        const newName = prompt("Rename style", g.name);
                        if (newName && newName.trim().length > 0) {
                          renameGeneratedStyle(g.id, newName.trim());
                        }
                      }}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Rename"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => {
                        try {
                          const json = JSON.stringify(g);
                          const blob = new Blob([json], {
                            type: "application/json",
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${g.name || "shader"}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                        } catch {}
                      }}
                      className="text-[11px] text-white/50 hover:text-white px-2"
                      title="Export JSON"
                    >
                      ⭳
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {showAdvanced && (
          <div className="px-4 py-3 flex items-center justify-start gap-2 border-t border-white/10 text-xs text-white/60">
            <button
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "application/json";
                input.onchange = async () => {
                  const file = input.files?.[0];
                  if (!file) return;
                  try {
                    const text = await file.text();
                    const obj = JSON.parse(text);
                    if (obj?.id && obj?.recipe) {
                      addGeneratedStyle(obj);
                      setActiveGeneratedId(obj.id);
                      setStyle("ai");
                    }
                  } catch {}
                };
                input.click();
              }}
              className="rounded-md ring-1 ring-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              import
            </button>
            <button
              onClick={() => {
                try {
                  const g = generatedStyles.find(
                    (x) => x.id === activeGeneratedId
                  );
                  if (!g) return;
                  const base64 = btoa(JSON.stringify(g));
                  const url = `${location.origin}${location.pathname}#bg=${base64}`;
                  window.open(url, "_blank");
                } catch {}
              }}
              className="rounded-md ring-1 ring-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              share
            </button>
            <span className="ml-auto">Tip: Ctrl/Cmd+Shift+A</span>
          </div>
        )}
      </div>
    </div>
  );
}
