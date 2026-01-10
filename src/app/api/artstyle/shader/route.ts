import { NextRequest } from "next/server";
import { z } from "zod";
import {
  ensureFragmentSafety,
  assessFragmentQuality,
} from "@/lib/shaderValidation";
import { parsePromptToSpec } from "@/lib/promptToSpec";
import { buildShaderFromTemplate } from "@/lib/shaderTemplates";

const RequestSchema = z.object({
  prompt: z.string().max(500).optional(),
  seed: z.number().int().finite().optional(),
});

function genId(len = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++)
    id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const validation = RequestSchema.safeParse(requestBody);
    if (!validation.success) {
      return Response.json(
        { error: "Invalid request", details: validation.error.flatten() },
        { status: 400 }
      );
    }
    const { prompt, seed: seedInput } = validation.data;
    const id = genId(10);
    const p = String(prompt || "");
    const isFlames =
      /\b(flame|flames|fire|ember|embers|blaze|inferno|burn|torch|lava)\b/i.test(
        p
      );
    const baseUniforms = {
      seed:
        typeof seedInput === "number" && isFinite(seedInput)
          ? Math.floor(seedInput)
          : Math.floor(Math.random() * 1000000),
      colorA: isFlames ? "#ffd56a" : "#a3c3ff",
      colorB: isFlames ? "#1a0a00" : "#0a1830",
    } as const;

    const flameFallback = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_seed;
uniform vec3 u_colorA; // hot
uniform vec3 u_colorB; // dark

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); float a=hash(i+vec2(0.0)); float b=hash(i+vec2(1.0,0.0)); float c=hash(i+vec2(0.0,1.0)); float d=hash(i+vec2(1.0,1.0)); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);} 
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(37.0,17.0); a*=0.5; } return v; }
vec3 pal(float t, vec3 A, vec3 B, vec3 C, vec3 D){ return A + B*cos(6.28318*(C*t + D)); }

void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R;
  // center + aspect
  vec2 p = (uv - 0.5); p.x *= R.x/R.y;
  // mouse as wind
  float wind = ((u_mouse.x / R.x) - 0.5) * 0.8;
  float t = u_time;
  // upward advection and domain warp
  vec2 q = vec2(fbm(p*2.0 + vec2(0.0, t*1.3)), fbm(p*2.0 - vec2(0.0, t*1.1)));
  vec2 r = vec2(fbm(p*3.0 + 2.0*q + vec2(1.7, 9.2)), fbm(p*3.0 + 2.0*q + vec2(8.3, 2.8)));
  float n = fbm(p*2.4 + 3.0*r + vec2(wind*0.6, t*1.6));

  // shape mask (narrower in the center)
  float profile = smoothstep(0.55, 0.0, abs(p.x));
  float rise = uv.y;
  float heat = clamp(n*1.3 + rise*1.2 - 0.25, 0.0, 1.0) * profile;

  // fire palette
  vec3 fire = pal(heat, vec3(0.5), vec3(0.5), vec3(1.0, 0.5, 0.2), vec3(0.0, 0.15, 0.0));
  vec3 col = mix(u_colorB, u_colorA, heat);
  col = mix(col, col * fire, 0.35);

  // sparks
  float sparks = smoothstep(0.92, 1.0, noise(p*8.0 + vec2(0.0, t*3.0))) * smoothstep(0.5, 1.0, heat);
  col += vec3(1.0, 0.85, 0.5) * sparks * 0.18;

  // vignette
  float d = length(p);
  col *= 1.0 - smoothstep(0.75, 1.1, d);

  gl_FragColor = vec4(col, 1.0);
}`;

    if (!process.env.OPENAI_SECRET) {
      // Local diversified fallback: choose a template based on prompt/theme and randomize params
      const spec = parsePromptToSpec(p);
      // Palette bias from prompt keywords (mirror remote path)
      const pl = p.toLowerCase();
      const paletteBias = (() => {
        if (/water|ocean|aqua|caustic/.test(pl))
          return { a: "#9ad1ff", b: "#0a1930" };
        if (/sunset|dawn|dusk|gold/.test(pl))
          return { a: "#ffc08a", b: "#2a0f2a" };
        if (/forest|moss|emerald|verdant/.test(pl))
          return { a: "#9cffb0", b: "#0d1f12" };
        if (/neon|cyber|glitch/.test(pl)) return { a: "#7cfdfd", b: "#181535" };
        return null;
      })();
      const seed = baseUniforms.seed;
      // cheap deterministic RNG from seed
      const rand = (() => {
        let s = seed + 1;
        return () => {
          s ^= s << 13;
          s ^= s >>> 17;
          s ^= s << 5; // xorshift32
          return (s >>> 0) / 0xffffffff;
        };
      })();
      const pick = <T>(arr: T[]): T =>
        arr[Math.floor(rand() * arr.length) % arr.length];

      // derive uniforms with prompt palette bias if present
      const uniforms = {
        seed,
        colorA: (spec.palette?.colorA ||
          paletteBias?.a ||
          baseUniforms.colorA) as string,
        colorB: (spec.palette?.colorB ||
          paletteBias?.b ||
          baseUniforms.colorB) as string,
      } as const;

      // choose a template and params
      let template = "noisy-blobs";
      let params: Record<string, number | string> = {};
      if (isFlames || spec.theme === "flames") {
        template = "flame-plumes";
        params = { intensity: 0.9 + rand() * 0.5 };
      } else if (spec.theme === "water") {
        template = "water-caustics";
        params = { scale: 2.2 + rand() * 1.0, speed: 0.4 + rand() * 0.5 };
      } else if (spec.theme === "zebra") {
        template = "zebra-stripes";
        params = {
          bend: 0.6 + rand() * 0.6,
          freq: 6 + Math.floor(rand() * 8),
          wobble: 0.2 + rand() * 0.6,
        };
      } else if (spec.theme === "aurora" || spec.theme === "flow") {
        template = pick(["flow-curl", "watercolor-paper"]);
        params =
          template === "flow-curl"
            ? { density: 0.9 + rand() * 0.8 }
            : { bleed: 0.4 + rand() * 0.5 };
      } else {
        template = pick([
          "noisy-blobs",
          "voronoi-fade",
          "halftone-dots",
          "chroma-shift",
          "flow-curl",
        ]);
        if (template === "noisy-blobs") params = { scale: 0.9 + rand() * 1.6 };
        if (template === "voronoi-fade")
          params = { cells: 6 + Math.floor(rand() * 10) };
        if (template === "halftone-dots")
          params = { scale: 110 + Math.floor(rand() * 80) };
        if (template === "chroma-shift")
          params = { shift: 0.002 + rand() * 0.004 };
        if (template === "flow-curl") params = { density: 0.8 + rand() * 1.2 };
      }

      const frag =
        template === "flame-plumes" && rand() < 0.2
          ? flameFallback // occasionally pick the hand-curated fallback for extra variety
          : buildShaderFromTemplate(template, params);

      // Compose optional subtle overlays for extra richness
      const recipe: any[] = [{ type: "shader", frag, uniforms }];
      // light haze overlay
      if (rand() < 0.5) {
        recipe.push({
          type: "haze",
          opacity: 0.18 + rand() * 0.12,
          speed: 0.12 + rand() * 0.12,
          hueBias: 0,
        });
      }
      // sparse particles for prompts referencing stars/spark/embers
      if (/(star|spark|ember|snow|dust)/i.test(p) && rand() < 0.7) {
        recipe.push({
          type: "particles",
          count: 30 + Math.floor(rand() * 40),
          color: "rgba(255,255,255,0.28)",
          size: 1,
          trail: 0.04,
        });
      }

      return Response.json({ id, name: "Shader", prompt, recipe });
    }

    const sys = `You are a senior GLSL/WebGL shader artist. Output ONLY a JSON object with fields: id, name, prompt, recipe.
recipe MUST be an array with EXACTLY one item with this shape:
{"type":"shader","frag":"...","uniforms":{"seed":123,"colorA":"#a3c3ff","colorB":"#0a1830"}}

Requirements for frag:
- GLSL ES 1.00, fragment shader only. No extensions, no includes, no defines, no version pragma.
- Required uniforms (use all meaningfully):
  uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse; uniform float u_seed; uniform vec3 u_colorA; uniform vec3 u_colorB;
- Render full-screen and write to gl_FragColor.
- High quality aesthetic: domain-warped FBM or noise-based flow, tasteful gradients, cinematic color.
- Use a cosine palette or similar, but ensure final color is grounded by mixing u_colorA/u_colorB.
- Interactive: subtly influence the pattern with u_mouse (position, bias, or parallax) without being distracting.
- Performance: fixed-size loops with <= 8 iterations; avoid dynamic branching and heavy trig in tight loops; keep ALU reasonable for WebGL1.
    - Coordinates: aspect-correct uv with centered framing.
    - Stability: avoid NaNs/infs; do not use pow with large exponents; clamp where appropriate.
    If the user's prompt suggests flames/fire/embers/lava, create an upward-flowing turbulent flame: vertically advected noise, warm palette from deep red to bright yellow-white, optional sparks, subtle horizontal wind from mouse.x, and avoid geometric repeats.
    Respond with JSON only. No markdown, no comments, no extra text.`;

    // Optional palette derivation to bias uniforms
    const palette = (() => {
      const pl = p.toLowerCase();
      if (/water|ocean|aqua|caustic/.test(pl))
        return { a: "#9ad1ff", b: "#0a1930" };
      if (/sunset|dawn|dusk|gold/.test(pl))
        return { a: "#ffc08a", b: "#2a0f2a" };
      if (/forest|moss|emerald|verdant/.test(pl))
        return { a: "#9cffb0", b: "#0d1f12" };
      if (/neon|cyber|glitch/.test(pl)) return { a: "#7cfdfd", b: "#181535" };
      return null;
    })();
    if (palette) {
      (baseUniforms as any).colorA = palette.a;
      (baseUniforms as any).colorB = palette.b;
    }

    const apiBody = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content: isFlames
            ? `${p}\n\nFocus: upward-flowing turbulent flames with warm palette, subtle wind from mouse.x, no hard edges.`
            : p,
        },
      ],
      temperature: 0.65,
      response_format: { type: "json_object" },
    } as const;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
      },
      body: JSON.stringify(apiBody),
    });

    if (!res.ok) {
      const frag = isFlames
        ? flameFallback
        : `
precision mediump float; 
uniform vec2 u_resolution; 
uniform float u_time; 
uniform vec2 u_mouse;
uniform float u_seed; 
uniform vec3 u_colorA; 
uniform vec3 u_colorB;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); float a=hash(i+vec2(0.0)); float b=hash(i+vec2(1.0,0.0)); float c=hash(i+vec2(0.0,1.0)); float d=hash(i+vec2(1.0,1.0)); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);} 
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(37.0,17.0); a*=0.5; } return v; }
vec3 pal(float t, vec3 A, vec3 B, vec3 C, vec3 D){ return A + B*cos(6.28318*(C*t + D)); }
void main(){ vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; uv-=0.5; uv.x*=R.x/R.y; uv+=0.5; float s=fract(sin(u_seed)*43758.5453); vec2 m=(u_mouse/R)-0.5; m.x*=R.x/R.y; 
float t=u_time*0.16; vec2 p=uv*(1.7+s*0.5); vec2 q=vec2(fbm(p+vec2(0.0,t)), fbm(p+vec2(5.2,-t))); vec2 r=vec2(fbm(p+3.5*q+vec2(1.7,9.2)), fbm(p+3.5*q+vec2(8.3,2.8))); float v=fbm(p+2.0*r+m*0.8);
vec3 brand=mix(u_colorA,u_colorB,smoothstep(0.2,0.8,v)); vec3 tint=pal(v, vec3(0.55), vec3(0.45), vec3(1.0,0.7,0.4), vec3(0.0,0.2+0.3*s,0.2)); vec3 col=mix(brand, brand*tint, 0.25+0.15*s);
float d=length(uv-0.5); col*=1.0 - smoothstep(0.6,0.92,d); gl_FragColor=vec4(col,1.0);} `;
      return Response.json({
        id,
        name: "Shader",
        prompt,
        recipe: [{ type: "shader", frag, uniforms: baseUniforms }],
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    let aiResult: { recipe?: { frag?: string }[]; frag?: string; name?: string } | null = null;
    try {
      aiResult = JSON.parse(content || "{}");
    } catch {}
    let frag: string | undefined = aiResult?.recipe?.[0]?.frag || aiResult?.frag;
    // Two-stage (optional): if frag missing or trivial, request a brief plan then a shader
    const needPlan = !frag || frag.length < 140;
    if (needPlan) {
      const planner = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Design a 2-3 sentence high-level plan for a novel WebGL1 fragment shader: mention coordinate mapping, procedural basis (fbm/flow/voronoi), palette mood, and subtle mouse interactivity.",
          },
          { role: "user", content: p },
        ],
        temperature: 0.6,
      } as const;
      const planRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
          },
          body: JSON.stringify(planner),
        }
      );
      const planData = planRes.ok ? await planRes.json() : null;
      const plan =
        planData?.choices?.[0]?.message?.content?.slice(0, 600) || "";

      const guided = {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: sys },
          {
            role: "user",
            content: `${p}\n\nPlan: ${plan}\nFollow the plan and produce the JSON with one shader layer.`,
          },
        ],
        temperature: 0.6,
        response_format: { type: "json_object" },
      } as const;
      const guidedRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
          },
          body: JSON.stringify(guided),
        }
      );
      if (guidedRes.ok) {
        const guidedData = await guidedRes.json();
        const guidedContent = guidedData?.choices?.[0]?.message?.content;
        try {
          const gp = JSON.parse(guidedContent || "{}");
          frag = gp?.recipe?.[0]?.frag || gp?.frag || frag;
        } catch {}
      }
    }

    // Validate and quality-check; retry once with stricter prompt if poor
    let safety = ensureFragmentSafety(frag);
    let quality = assessFragmentQuality(frag);
    if (!safety.ok || !quality.ok) {
      const stricter = `You produced an unsatisfactory or unsafe shader previously. Regenerate a higher-quality fragment shader.
Keep the same JSON schema. Ensure:
- Rich procedural detail (fbm, domain warp, or layered noise)
- Clear use of u_colorA/u_colorB in the final color mix (not a flat color)
- Subtle interactivity from u_mouse
- Aspect-corrected coordinates and cinematic palette
Respond with JSON only.`;
      const retryBody = {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: p },
          { role: "system", content: stricter },
        ],
        temperature: 0.55,
        response_format: { type: "json_object" },
      } as const;
      const retryRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
          },
          body: JSON.stringify(retryBody),
        }
      );
      if (retryRes.ok) {
        const retryData = await retryRes.json();
        const retryContent = retryData?.choices?.[0]?.message?.content;
        try {
          const retryParsed = JSON.parse(retryContent || "{}");
          frag = retryParsed?.recipe?.[0]?.frag || retryParsed?.frag || frag;
        } catch {}
      }
      safety = ensureFragmentSafety(frag);
      quality = assessFragmentQuality(frag);
      if (!safety.ok || !quality.ok) {
        // Strong curated fallback
        frag = isFlames
          ? flameFallback
          : `
precision mediump float; 
uniform vec2 u_resolution; 
uniform float u_time; 
uniform vec2 u_mouse;
uniform float u_seed; 
uniform vec3 u_colorA; 
uniform vec3 u_colorB;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); float a=hash(i+vec2(0.0)); float b=hash(i+vec2(1.0,0.0)); float c=hash(i+vec2(0.0,1.0)); float d=hash(i+vec2(1.0,1.0)); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);} 
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(37.0,17.0); a*=0.5; } return v; }
vec3 pal(float t, vec3 A, vec3 B, vec3 C, vec3 D){ return A + B*cos(6.28318*(C*t + D)); }
void main(){ vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; uv-=0.5; uv.x*=R.x/R.y; uv+=0.5; float s=fract(sin(u_seed)*43758.5453); vec2 m=(u_mouse/R)-0.5; m.x*=R.x/R.y; 
float t=u_time*0.16; vec2 p=uv*(1.7+s*0.5); vec2 q=vec2(fbm(p+vec2(0.0,t)), fbm(p+vec2(5.2,-t))); vec2 r=vec2(fbm(p+3.5*q+vec2(1.7,9.2)), fbm(p+3.5*q+vec2(8.3,2.8))); float v=fbm(p+2.0*r+m*0.8);
vec3 brand=mix(u_colorA,u_colorB,smoothstep(0.2,0.8,v)); vec3 tint=pal(v, vec3(0.55), vec3(0.45), vec3(1.0,0.7,0.4), vec3(0.0,0.2+0.3*s,0.2)); vec3 col=mix(brand, brand*tint, 0.25+0.15*s);
float d=length(uv-0.5); col*=1.0 - smoothstep(0.6,0.92,d); gl_FragColor=vec4(col,1.0);} `;
      }
    }
    return Response.json({
      id,
      name: aiResult?.name || "Shader",
      prompt,
      recipe: [{ type: "shader", frag, uniforms: baseUniforms }],
    });
  } catch {
    const id = genId(10);
    const frag = `precision mediump float; uniform vec2 u_resolution; uniform float u_time; uniform vec3 u_colorA; uniform vec3 u_colorB; 
void main(){ vec2 uv=gl_FragCoord.xy/u_resolution.xy; uv-=0.5; uv.x*=u_resolution.x/u_resolution.y; uv+=0.5; float v=0.5+0.5*sin(u_time+uv.x*5.0-uv.y*7.0); vec3 col=mix(u_colorA,u_colorB,v); gl_FragColor=vec4(col,1.0);} `;
    return Response.json({
      id,
      name: "Shader",
      prompt: "",
      recipe: [
        {
          type: "shader",
          frag,
          uniforms: { seed: 1, colorA: "#a3c3ff", colorB: "#0a1830" },
        },
      ],
    });
  }
}
