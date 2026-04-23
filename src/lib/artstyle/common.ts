import { z } from "zod";
import type { NextRequest } from "next/server";

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

const OPENAI_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";

const ART_STYLE_SYNONYMS: Record<string, ArtStyle> = {
  firefly: "fireflies",
  fireflies: "fireflies",
  candle: "fireflies",
  candlelit: "fireflies",
  cabin: "fireflies",
  quaint: "fireflies",
  vhs: "vhs",
  crt: "vhs",
  retro: "vhs",
  analog: "vhs",
  matrix: "matrix",
  hacker: "matrix",
  cyber: "matrix",
  aurora: "aurora",
  borealis: "aurora",
  dawn: "aurora",
  twilight: "aurora",
  flow: "flow",
  wind: "flow",
  water: "flow",
  ocean: "flow",
  sea: "flow",
  zebra: "mesh",
  mesh: "mesh",
  particles: "particles",
};

const FLAME_PROMPT_RE =
  /\b(flame|flames|fire|ember|embers|blaze|inferno|burn|torch|lava)\b/i;

export const ART_STYLE_ALLOWED: ArtStyle[] = [
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

export function parseOptionalPrompt(value: unknown): string {
  return String(value || "");
}

export function cheapLocalArtStyleMap(prompt: string): ArtStyle | null {
  const normalizedPrompt = prompt.toLowerCase();
  for (const [keyword, style] of Object.entries(ART_STYLE_SYNONYMS)) {
    if (normalizedPrompt.includes(keyword)) {
      return style;
    }
  }
  return null;
}

export function createId(length = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let index = 0; index < length; index += 1) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function hasOpenAISecret(): boolean {
  return Boolean(process.env.OPENAI_SECRET);
}

async function requestOpenAIContent(
  body: Record<string, unknown>
): Promise<string | null> {
  if (!process.env.OPENAI_SECRET) {
    return null;
  }

  const response = await fetch(OPENAI_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return typeof data?.choices?.[0]?.message?.content === "string"
    ? data.choices[0].message.content
    : null;
}

export async function requestOpenAIJson<T>(
  body: Record<string, unknown>
): Promise<T | null> {
  return safeParseJson<T>(await requestOpenAIContent(body));
}

export async function requestOpenAIText(
  body: Record<string, unknown>
): Promise<string | null> {
  return requestOpenAIContent(body);
}

function safeParseJson<T>(value: unknown): T | null {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getPromptPaletteBias(prompt: string): {
  colorA: string;
  colorB: string;
} | null {
  const normalizedPrompt = prompt.toLowerCase();

  if (/water|ocean|aqua|caustic/.test(normalizedPrompt)) {
    return { colorA: "#9ad1ff", colorB: "#0a1930" };
  }
  if (/sunset|dawn|dusk|gold/.test(normalizedPrompt)) {
    return { colorA: "#ffc08a", colorB: "#2a0f2a" };
  }
  if (/forest|moss|emerald|verdant/.test(normalizedPrompt)) {
    return { colorA: "#9cffb0", colorB: "#0d1f12" };
  }
  if (/neon|cyber|glitch/.test(normalizedPrompt)) {
    return { colorA: "#7cfdfd", colorB: "#181535" };
  }
  return null;
}

export function isFlamePrompt(prompt: string): boolean {
  return FLAME_PROMPT_RE.test(prompt);
}

export function createSeed(input?: number): number {
  if (typeof input === "number" && Number.isFinite(input)) {
    return Math.floor(input);
  }
  return Math.floor(Math.random() * 1_000_000);
}

export function createSeededRandom(seed: number): () => number {
  let state = seed + 1;

  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
}

export function pickFromArray<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length) % items.length];
}

function jsonErrorResponse(error: z.ZodError) {
  return Response.json(
    { error: "Invalid request", details: error.flatten() },
    { status: 400 }
  );
}

export async function parseJsonRequest<TSchema extends z.ZodTypeAny>(
  req: NextRequest,
  schema: TSchema
): Promise<
  | { ok: true; data: z.infer<TSchema> }
  | { ok: false; response: Response }
> {
  const requestBody = await req.json();
  const validation = schema.safeParse(requestBody);

  if (!validation.success) {
    return { ok: false, response: jsonErrorResponse(validation.error) };
  }

  return { ok: true, data: validation.data };
}
