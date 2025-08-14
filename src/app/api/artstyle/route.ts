import { NextRequest } from "next/server";

type ArtStyle =
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

export const ALLOWED: ArtStyle[] = [
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

const SYNONYMS: Record<string, ArtStyle> = {
  // cozy / quaint
  firefly: "fireflies",
  fireflies: "fireflies",
  candle: "fireflies",
  candlelit: "fireflies",
  cabin: "fireflies",
  quaint: "fireflies",
  // neon / retro
  vhs: "vhs",
  crt: "vhs",
  retro: "vhs",
  analog: "vhs",
  // code
  matrix: "matrix",
  hacker: "matrix",
  cyber: "matrix",
  // natural
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
  // fallback
  mesh: "mesh",
  particles: "particles",
};

function cheapLocalMap(prompt: string): ArtStyle | null {
  const p = (prompt || "").toLowerCase();
  for (const [k, v] of Object.entries(SYNONYMS)) {
    if (p.includes(k)) return v;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    const local = cheapLocalMap(prompt || "");
    if (!process.env.OPENAI_SECRET) {
      // If no key, fall back to local mapping or ai style
      const style: ArtStyle = local ?? "ai";
      return Response.json({ style });
    }

    const sys = `You are a JSON-only mapper from aesthetic prompt to one of these exact art style keys:
${ALLOWED.join(", ")}
Rules:
- Respond with a compact JSON object: {"style":"<one-of-allowed>"}
- Prefer the closest stylistic match. If unsure, choose "ai".
- No extra text.`;

    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: String(prompt || "") },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const style: ArtStyle = local ?? "ai";
      return Response.json({ style, error: "openai_error" }, { status: 200 });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    let style: string | undefined;
    try {
      const parsed = JSON.parse(content || "{}");
      style = parsed?.style;
    } catch {}
    let chosen: ArtStyle = "ai";
    if (style && ALLOWED.includes(style as ArtStyle)) {
      chosen = style as ArtStyle;
    } else if (local) {
      chosen = local;
    }
    return Response.json({ style: chosen });
  } catch (e) {
    const local = cheapLocalMap("");
    return Response.json({ style: local ?? "ai" }, { status: 200 });
  }
}
