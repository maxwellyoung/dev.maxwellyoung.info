import { NextRequest } from "next/server";
import { z } from "zod";
import {
  createId,
  hasOpenAISecret,
  parseJsonRequest,
  parseOptionalPrompt,
  requestOpenAIJson,
} from "@/lib/artstyle/common";
import {
  createGeneratedRecipeOpenAIError,
  createLocalGeneratedRecipe,
  normalizeGeneratedRecipe,
} from "@/lib/artstyle/generateRecipe";
import { parsePromptToSpec } from "@/lib/promptToSpec";

const RequestSchema = z.object({
  prompt: z.string().max(500).optional(),
  shaderOnly: z.boolean().optional(),
});

function buildPromptConstraints(prompt: string) {
  const spec = parsePromptToSpec(prompt);
  return (
    `${prompt}\n\nConstraints: theme=${spec.theme}, motion=${spec.motion}, complexity=${spec.complexity}.` +
    (spec.palette
      ? ` Preferred palette: colorA=${spec.palette.colorA}, colorB=${spec.palette.colorB}.`
      : "")
  );
}

export async function POST(req: NextRequest) {
  try {
    const parsedRequest = await parseJsonRequest(req, RequestSchema);
    if (!parsedRequest.ok) {
      return parsedRequest.response;
    }

    const prompt = parseOptionalPrompt(parsedRequest.data.prompt);
    const shaderOnly = parsedRequest.data.shaderOnly;
    const id = createId(10);

    if (!hasOpenAISecret()) {
      return Response.json({
        id,
        name: "Generated",
        prompt,
        recipe: createLocalGeneratedRecipe(prompt),
      });
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

    const payload = await requestOpenAIJson<{
      id?: string;
      name?: string;
      prompt?: string;
      recipe?: Array<Record<string, unknown> & { type: string }>;
    }>({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content:
            (shaderOnly
              ? "Return only shader or shaderTemplate layers. "
              : "") +
            buildPromptConstraints(prompt),
        },
      ],
      temperature: 0.65,
      response_format: { type: "json_object" },
    });

    if (!payload) {
      return Response.json(createGeneratedRecipeOpenAIError(id, prompt));
    }

    return Response.json(normalizeGeneratedRecipe(payload, id, prompt));
  } catch {
    return Response.json(
      normalizeGeneratedRecipe(
        {
          id: "local",
          name: "Generated",
          prompt: "",
          recipe: [
            {
              type: "shaderTemplate",
              template: "voronoi-fade",
              uniforms: { colorA: "#ffd1dc", colorB: "#120a1a", cells: 10 },
            },
          ],
        },
        "local",
        ""
      )
    );
  }
}
