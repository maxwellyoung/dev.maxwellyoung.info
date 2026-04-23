type PromptSpec = {
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

const THEME_MATCHERS: Array<{
  theme: PromptSpec["theme"];
  pattern: RegExp;
}> = [
  { theme: "flames", pattern: /flame|fire|ember|lava|inferno|bonfire|torch|smoke/ },
  { theme: "water", pattern: /water|ocean|sea|wave|caustic|lagoon|pool|ripple/ },
  { theme: "aurora", pattern: /aurora|northern lights|borealis|curtains|ribbon/ },
  { theme: "zebra", pattern: /zebra|stripe|monochrome stripes|barcode/ },
  { theme: "matrix", pattern: /matrix|glyph|code rain|terminal rain/ },
  { theme: "vhs", pattern: /vhs|scanline|retro|crt|chromatic/ },
  { theme: "flow", pattern: /flow|curl|stream|smoke trail|tendrils/ },
  { theme: "particles", pattern: /particle|firefly|spark|snow|starfield/ },
  { theme: "mesh", pattern: /mesh|grid|wire|wireframe/ },
];

const MOTION_MATCHERS: Array<{
  motion: PromptSpec["motion"];
  pattern: RegExp;
}> = [
  { motion: "slow", pattern: /slow|calm|gentle|subtle|still|glacial|soft/ },
  { motion: "fast", pattern: /fast|rapid|energetic|intense|hyper|frantic/ },
];

const COMPLEXITY_MATCHERS: Array<{
  complexity: PromptSpec["complexity"];
  pattern: RegExp;
}> = [
  { complexity: 0.3, pattern: /minimal|simple|clean|minimalist/ },
  {
    complexity: 0.8,
    pattern: /complex|intricate|rich|ornate|chaotic|maximalist|baroque/,
  },
];

function chooseTheme(input: string): PromptSpec["theme"] {
  return (
    THEME_MATCHERS.find((matcher) => matcher.pattern.test(input))?.theme ||
    "generic"
  );
}

function chooseMotion(input: string): PromptSpec["motion"] {
  return (
    MOTION_MATCHERS.find((matcher) => matcher.pattern.test(input))?.motion ||
    "medium"
  );
}

function chooseComplexity(input: string): PromptSpec["complexity"] {
  return (
    COMPLEXITY_MATCHERS.find((matcher) => matcher.pattern.test(input))
      ?.complexity || 0.5
  );
}

function extractPalette(
  prompt: string
): { colorA?: string; colorB?: string } | undefined {
  const hexes = Array.from(prompt.matchAll(/#([0-9a-f]{3}|[0-9a-f]{6})\b/gi)).map(
    (match) => match[0]
  );

  if (hexes.length > 0) {
    const colorA = hexes[0];
    const colorB =
      hexes[1] || (colorA.toLowerCase() === "#ffffff" ? "#0a1830" : "#0e0e0e");
    return { colorA, colorB };
  }

  const namedColors = Object.keys(COLOR_MAP).filter((color) => prompt.includes(color));
  if (namedColors.length === 0) {
    return undefined;
  }

  const primaryColor = namedColors[0];
  return {
    colorA: COLOR_MAP[primaryColor],
    colorB:
      COLOR_MAP[namedColors[1]] ||
      (primaryColor === "white" ? "#0a1830" : "#0e0e0e"),
  };
}

function buildExtras(prompt: string): PromptSpec["extras"] {
  return {
    sparks: /spark|ember/.test(prompt),
    vignette: !/no vignette|novignette/.test(prompt),
    chroma: /vhs|chromatic|retro/.test(prompt),
    monochrome: /monochrome|black and white|grayscale|greyscale/.test(prompt),
    highContrast: /high contrast|punchy|bold/.test(prompt),
    particles: /particles|snow|firefly|embers/.test(prompt),
  };
}

export function parsePromptToSpec(prompt?: string): PromptSpec {
  const normalizedPrompt = String(prompt || "").toLowerCase();

  return {
    theme: chooseTheme(normalizedPrompt),
    motion: chooseMotion(normalizedPrompt),
    complexity: chooseComplexity(normalizedPrompt),
    palette: extractPalette(normalizedPrompt),
    extras: buildExtras(normalizedPrompt),
  };
}
