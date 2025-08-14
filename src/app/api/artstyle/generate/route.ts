import { NextRequest } from "next/server";

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
      // fallback recipe: ensure at least one shader template
      const recipe = [
        {
          type: "shaderTemplate",
          template: "noisy-blobs",
          uniforms: { colorA: "#a3c3ff", colorB: "#0a1830", scale: 1.2 },
        },
        { type: "haze", opacity: 0.22, speed: 0.18, hueBias: 200 },
      ];
      return Response.json({ id, name: "Generated", prompt, recipe });
    }

    const sys = `You are a JSON-only generator that outputs a layered background "recipe".
Return strictly a JSON object with fields: id, name, prompt, recipe.
recipe is an array of layers. Each layer is one of (include at least one shader or shaderTemplate layer):
- {"type":"haze","opacity":0.3,"speed":0.2,"hueBias":240}
- {"type":"particles","count":70,"color":"rgba(255,255,255,0.35)","size":1,"trail":0.06}
- {"type":"aurora","opacity":0.5,"speed":0.14}
- {"type":"flow","lineCount":1200,"color":"rgba(255,255,255,0.14)","lineWidth":1.2,"glow":4}
- {"type":"mesh","opacity":0.5}
- {"type":"vhs","opacity":0.22,"lineOpacity":0.24,"gap":2,"wobble":1.1,"speed":0.8,"chroma":true}
- {"type":"matrix","fontSize":14,"headColor":"#A8FFB6","tailColor":"#00FF7F","tailLength":24,"speedMin":0.9,"speedMax":1.9}
 - {"type":"shader","frag":"/* GLSL fragment shader body using u_time, u_resolution, u_colorA, u_colorB */","uniforms":{"seed":123,"colorA":"#92b2ff","colorB":"#0a1930"}}
 - {"type":"shaderTemplate","template":"noisy-blobs","uniforms":{"seed":123,"colorA":"#92b2ff","colorB":"#0a1930","scale":1.2}}
Pick 1–3 layers that fit the user's vibe. Use tasteful parameters. No extra text.`;

    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content:
            (shaderOnly
              ? "Return only shader or shaderTemplate layers. "
              : "") + String(prompt || ""),
        },
      ],
      temperature: 0.5,
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
    // if prompt indicates zebra or water, bias to those templates
    if (/(zebra|stripe)/i.test(prompt || "")) {
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
    // ensure at least one shader and apply prompt-driven palette if missing
    const ensurePalette = (u: any) => {
      if (!u) u = {};
      if (!u.colorA) u.colorA = "#a3c3ff";
      if (!u.colorB) u.colorB = "#0a1830";
      return u;
    };
    parsed.recipe = parsed.recipe.map((layer: any) => {
      if (layer?.type === "shader" || layer?.type === "shaderTemplate") {
        layer.uniforms = ensurePalette(layer.uniforms);
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
