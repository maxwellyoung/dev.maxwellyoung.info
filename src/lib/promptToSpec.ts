export type PromptSpec = {
  theme:
    | "flames"
    | "water"
    | "aurora"
    | "zebra"
    | "matrix"
    | "vhs"
    | "flow"
    | "particles"
    | "mesh"
    | "generic";
  motion: "slow" | "medium" | "fast";
  complexity: 0.3 | 0.5 | 0.8;
  palette?: { colorA?: string; colorB?: string };
  extras: {
    sparks?: boolean;
    vignette?: boolean;
    chroma?: boolean;
    monochrome?: boolean;
    highContrast?: boolean;
    particles?: boolean;
  };
};

const COLOR_MAP: Record<string, string> = {
  red: "#ff4d4d",
  orange: "#ff9a3c",
  yellow: "#ffd56a",
  gold: "#ffcf33",
  amber: "#ffb000",
  green: "#7cffb2",
  teal: "#00d1b2",
  cyan: "#6ee7ff",
  blue: "#92b2ff",
  navy: "#0a1830",
  indigo: "#6a8dff",
  purple: "#b28dff",
  magenta: "#ff6ad5",
  pink: "#ff86c8",
  rose: "#ff8da1",
  brown: "#5a3a2e",
  black: "#0e0e0e",
  white: "#eaeaea",
};

function extractPalette(
  prompt: string
): { colorA?: string; colorB?: string } | undefined {
  const lower = prompt.toLowerCase();
  // First, try to find hex codes explicitly provided
  const hexes = Array.from(
    lower.matchAll(/#([0-9a-f]{3}|[0-9a-f]{6})\b/gi)
  ).map((m) => m[0]);
  if (hexes.length > 0) {
    const a = hexes[0];
    const b =
      hexes[1] || (a.toLowerCase() === "#ffffff" ? "#0a1830" : "#0e0e0e");
    return { colorA: a, colorB: b };
  }
  const colors = Object.keys(COLOR_MAP).filter((c) => lower.includes(c));
  if (colors.length === 0) return undefined;
  const a = COLOR_MAP[colors[0]];
  const b =
    COLOR_MAP[colors[1]] || (colors[0] === "white" ? "#0a1830" : "#0e0e0e");
  return { colorA: a, colorB: b };
}

export function parsePromptToSpec(prompt?: string): PromptSpec {
  const p = String(prompt || "").toLowerCase();
  const theme: PromptSpec["theme"] =
    /flame|fire|ember|lava|inferno|bonfire|torch|smoke/.test(p)
      ? "flames"
      : /water|ocean|sea|wave|caustic|lagoon|pool|ripple/.test(p)
      ? "water"
      : /aurora|northern lights|borealis|curtains|ribbon/.test(p)
      ? "aurora"
      : /zebra|stripe|monochrome stripes|barcode/.test(p)
      ? "zebra"
      : /matrix|glyph|code rain|terminal rain/.test(p)
      ? "matrix"
      : /vhs|scanline|retro|crt|chromatic/.test(p)
      ? "vhs"
      : /flow|curl|stream|smoke trail|tendrils/.test(p)
      ? "flow"
      : /particle|firefly|spark|snow|starfield/.test(p)
      ? "particles"
      : /mesh|grid|wire|wireframe/.test(p)
      ? "mesh"
      : "generic";

  const motion: PromptSpec["motion"] =
    /slow|calm|gentle|subtle|still|glacial|soft/.test(p)
      ? "slow"
      : /fast|rapid|energetic|intense|hyper|frantic/.test(p)
      ? "fast"
      : "medium";

  const complexity: PromptSpec["complexity"] =
    /minimal|simple|clean|minimalist/.test(p)
      ? 0.3
      : /complex|intricate|rich|ornate|chaotic|maximalist|baroque/.test(p)
      ? 0.8
      : 0.5;

  const extras = {
    sparks: /spark|ember/.test(p),
    vignette: !/no vignette|novignette/.test(p),
    chroma: /vhs|chromatic|retro/.test(p),
    monochrome: /monochrome|black and white|grayscale|greyscale/.test(p),
    highContrast: /high contrast|punchy|bold/.test(p),
    particles: /particles|snow|firefly|embers/.test(p),
  } as const;

  const palette = extractPalette(p);

  return { theme, motion, complexity, palette, extras };
}
