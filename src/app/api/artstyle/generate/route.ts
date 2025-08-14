import { NextRequest } from "next/server";
import { ensureFragmentSafety } from "@/lib/shaderValidation";
import { parsePromptToSpec } from "@/lib/promptToSpec";

function genId(len = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++)
    id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, shaderOnly } = (await req.json()) as {
      prompt?: string;
      shaderOnly?: boolean;
    };
    const id = genId(10);
    if (!process.env.OPENAI_SECRET) {
      // fallback recipe: ensure strong shader baseline + a secondary layer
      const recipe = [
        {
          type: "shaderTemplate",
          template: /(flame|fire|ember|lava)/i.test(String(prompt || ""))
            ? "flow-curl"
            : "noisy-blobs",
          uniforms: { colorA: "#a3c3ff", colorB: "#0a1830", scale: 1.2 },
        },
        { type: "haze", opacity: 0.22, speed: 0.18, hueBias: 200 },
      ];
      return Response.json({ id, name: "Generated", prompt, recipe });
    }

    const sys = `You are a JSON-only background compositor. Output STRICT JSON with fields: id, name, prompt, recipe.
recipe is an array of 1–4 layers (ordered back-to-front). Include AT LEAST ONE shader or shaderTemplate layer.
Allowed layers and example params:
- {"type":"haze","opacity":0.18,"speed":0.16,"hueBias":220}
- {"type":"particles","count":50,"color":"rgba(255,255,255,0.28)","size":1,"trail":0.05}
- {"type":"aurora","opacity":0.4,"speed":0.12}
- {"type":"flow","lineCount":1000,"color":"rgba(255,255,255,0.12)","lineWidth":1.1,"glow":3}
- {"type":"mesh","opacity":0.45}
- {"type":"vhs","opacity":0.16,"lineOpacity":0.22,"gap":2,"wobble":1.0,"speed":0.8,"chroma":true}
- {"type":"matrix","fontSize":14,"headColor":"#A8FFB6","tailColor":"#00FF7F","tailLength":22,"speedMin":0.9,"speedMax":1.8}
- {"type":"shader","frag":"/* GLSL ES 1.00, uses u_resolution,u_time,u_mouse,u_seed,u_colorA,u_colorB, gl_FragColor */","uniforms":{"seed":123,"colorA":"#92b2ff","colorB":"#0a1930"}}
- {"type":"shaderTemplate","template":"noisy-blobs","uniforms":{"seed":123,"colorA":"#92b2ff","colorB":"#0a1930","scale":1.2}}

Guidelines:
- Favor domain-warped noise or flow for the shader; tasteful, cinematic palettes.
- Subtle interactivity via u_mouse if shader is used (no jittery effects).
- Keep parameters balanced; avoid extreme counts and sizes.
- No extra text. JSON only.`;

    const spec = parsePromptToSpec(prompt);
    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content:
            (shaderOnly
              ? "Return only shader or shaderTemplate layers. "
              : "") +
            `${String(prompt || "")}\n\nConstraints: theme=${
              spec.theme
            }, motion=${spec.motion}, complexity=${spec.complexity}.` +
            (spec.palette
              ? ` Preferred palette: colorA=${spec.palette.colorA}, colorB=${spec.palette.colorB}.`
              : ""),
        },
      ],
      temperature: 0.65,
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
      const recipe = [
        {
          type: "shaderTemplate",
          template: "flow-curl",
          uniforms: { colorA: "#9ae6b4", colorB: "#0a1f12", density: 1.1 },
        },
      ];
      return Response.json({
        id,
        name: "Generated",
        prompt,
        recipe,
        error: "openai_error",
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    let parsed: any = null;
    try {
      parsed = JSON.parse(content || "{}");
    } catch {}
    if (!parsed || !Array.isArray(parsed.recipe)) {
      const recipe = [
        {
          type: "shaderTemplate",
          template: /(zebra|stripe)/i.test(prompt || "")
            ? "zebra-stripes"
            : /(water|ocean|sea)/i.test(prompt || "")
            ? "water-caustics"
            : "noisy-blobs",
          uniforms: { colorA: "#a3c3ff", colorB: "#0a1830" },
        },
      ];
      return Response.json({ id, name: "Generated", prompt, recipe });
    }
    // Validate shader fragments if present
    parsed.recipe = parsed.recipe.filter((layer: any) => {
      if (layer?.type === "shader") {
        const s = ensureFragmentSafety(layer.frag);
        return !!s.ok;
      }
      return true;
    });
    // allow models to reference shader templates for guaranteed-valid GLSL
    parsed.recipe = parsed.recipe.map((layer: any) => {
      if (
        layer?.type === "shaderTemplate" &&
        typeof layer?.template === "string"
      ) {
        return {
          type: "shaderTemplate",
          template: layer.template,
          uniforms: layer.uniforms || {},
        };
      }
      return layer;
    });
    // enforce at least one shader-based layer
    let hasShader = parsed.recipe.some(
      (l: any) => l?.type === "shader" || l?.type === "shaderTemplate"
    );
    if (!hasShader) {
      parsed.recipe = [
        {
          type: "shaderTemplate",
          template: "noisy-blobs",
          uniforms: { colorA: "#a3c3ff", colorB: "#0a1830", scale: 1.2 },
        },
        ...parsed.recipe,
      ];
      hasShader = true;
    }
    // if prompt indicates flames/zebra/water, bias to those templates
    if (/(flame|fire|ember|lava)/i.test(prompt || "")) {
      parsed.recipe.unshift({
        type: "shaderTemplate",
        template: "flame-plumes",
        uniforms: {
          colorA: "#ffd56a",
          colorB: "#1a0a00",
          intensity: 1.0,
        },
      });
    } else if (/(zebra|stripe)/i.test(prompt || "")) {
      parsed.recipe.unshift({
        type: "shaderTemplate",
        template: "zebra-stripes",
        uniforms: {
          colorA: "#111111",
          colorB: "#eeeeee",
          bend: 0.9,
          freq: 10.0,
        },
      });
    } else if (/(water|ocean|sea)/i.test(prompt || "")) {
      parsed.recipe.unshift({
        type: "shaderTemplate",
        template: "water-caustics",
        uniforms: {
          colorA: "#a0e7ff",
          colorB: "#002a3d",
          scale: 2.8,
          speed: 0.6,
        },
      });
    }
    // ensure at least one shader and apply default/prompt palette if missing
    const ensurePalette = (u: any) => {
      if (!u) u = {};
      if (!u.colorA) u.colorA = spec.palette?.colorA || "#a3c3ff";
      if (!u.colorB) u.colorB = spec.palette?.colorB || "#0a1830";
      return u;
    };
    parsed.recipe = parsed.recipe.map((layer: any) => {
      if (layer?.type === "shader" || layer?.type === "shaderTemplate") {
        layer.uniforms = ensurePalette(layer.uniforms);
        if (
          spec.theme === "flames" &&
          layer.type === "shaderTemplate" &&
          !layer.uniforms.intensity
        ) {
          layer.uniforms.intensity = spec.complexity === 0.8 ? 1.2 : 1.0;
        }
      }
      return layer;
    });
    // ensure id/name present
    parsed.id = parsed.id || id;
    parsed.name = parsed.name || "Generated";
    parsed.prompt = String(prompt || parsed.prompt || "");
    return Response.json(parsed);
  } catch (e) {
    const recipe = [
      {
        type: "shaderTemplate",
        template: "voronoi-fade",
        uniforms: { colorA: "#ffd1dc", colorB: "#120a1a", cells: 10 },
      },
    ];
    return Response.json({
      id: "local",
      name: "Generated",
      prompt: "",
      recipe,
    });
  }
}
