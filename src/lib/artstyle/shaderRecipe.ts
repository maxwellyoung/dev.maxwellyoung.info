import { parsePromptToSpec } from "@/lib/promptToSpec";
import { buildShaderFromTemplate } from "@/lib/shaderTemplates";
import {
  assessFragmentQuality,
  ensureFragmentSafety,
} from "@/lib/shaderValidation";
import {
  createSeededRandom,
  getPromptPaletteBias,
  isFlamePrompt,
  pickFromArray,
  requestOpenAIJson,
  requestOpenAIText,
} from "@/lib/artstyle/common";

type ShaderRecipeResponse = {
  id: string;
  name: string;
  prompt?: string;
  recipe: Array<{
    type: "shader" | "haze" | "particles";
    frag?: string;
    uniforms?: Record<string, unknown>;
    opacity?: number;
    speed?: number;
    hueBias?: number;
    count?: number;
    color?: string;
    size?: number;
    trail?: number;
  }>;
};

type ShaderCompletionPayload = {
  name?: string;
  frag?: string;
  recipe?: Array<{ frag?: string }>;
};

type ShaderTemplateSelection = {
  template: string;
  params: Record<string, number | string>;
};

const SHADER_SYSTEM_PROMPT = `You are a senior GLSL/WebGL shader artist. Output ONLY a JSON object with fields: id, name, prompt, recipe.
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

const STRONGER_SHADER_PROMPT = `You produced an unsatisfactory or unsafe shader previously. Regenerate a higher-quality fragment shader.
Keep the same JSON schema. Ensure:
- Rich procedural detail (fbm, domain warp, or layered noise)
- Clear use of u_colorA/u_colorB in the final color mix (not a flat color)
- Subtle interactivity from u_mouse
- Aspect-corrected coordinates and cinematic palette
Respond with JSON only.`;

const CURATED_FLAME_SHADER = `
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

void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R;
  vec2 p = (uv - 0.5); p.x *= R.x/R.y;
  float wind = ((u_mouse.x / R.x) - 0.5) * 0.8;
  float t = u_time;
  vec2 q = vec2(fbm(p*2.0 + vec2(0.0, t*1.3)), fbm(p*2.0 - vec2(0.0, t*1.1)));
  vec2 r = vec2(fbm(p*3.0 + 2.0*q + vec2(1.7, 9.2)), fbm(p*3.0 + 2.0*q + vec2(8.3, 2.8)));
  float n = fbm(p*2.4 + 3.0*r + vec2(wind*0.6, t*1.6));
  float profile = smoothstep(0.55, 0.0, abs(p.x));
  float rise = uv.y;
  float heat = clamp(n*1.3 + rise*1.2 - 0.25, 0.0, 1.0) * profile;
  vec3 fire = pal(heat, vec3(0.5), vec3(0.5), vec3(1.0, 0.5, 0.2), vec3(0.0, 0.15, 0.0));
  vec3 col = mix(u_colorB, u_colorA, heat);
  col = mix(col, col * fire, 0.35);
  float sparks = smoothstep(0.92, 1.0, noise(p*8.0 + vec2(0.0, t*3.0))) * smoothstep(0.5, 1.0, heat);
  col += vec3(1.0, 0.85, 0.5) * sparks * 0.18;
  float d = length(p);
  col *= 1.0 - smoothstep(0.75, 1.1, d);
  gl_FragColor = vec4(col, 1.0);
}`;

const CURATED_DEFAULT_SHADER = `precision mediump float; 
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

const MINIMAL_CATCHALL_SHADER =
  "precision mediump float; uniform vec2 u_resolution; uniform float u_time; uniform vec3 u_colorA; uniform vec3 u_colorB; void main(){ vec2 uv=gl_FragCoord.xy/u_resolution.xy; uv-=0.5; uv.x*=u_resolution.x/u_resolution.y; uv+=0.5; float v=0.5+0.5*sin(u_time+uv.x*5.0-uv.y*7.0); vec3 col=mix(u_colorA,u_colorB,v); gl_FragColor=vec4(col,1.0);} ";

function buildBaseUniforms(prompt: string, seed: number) {
  const paletteBias = getPromptPaletteBias(prompt);
  const flame = isFlamePrompt(prompt);

  return {
    seed,
    colorA: paletteBias?.colorA || (flame ? "#ffd56a" : "#a3c3ff"),
    colorB: paletteBias?.colorB || (flame ? "#1a0a00" : "#0a1830"),
  };
}

function buildFallbackShader(prompt: string) {
  return isFlamePrompt(prompt) ? CURATED_FLAME_SHADER : CURATED_DEFAULT_SHADER;
}

function extractShaderFragment(payload: ShaderCompletionPayload | null) {
  return payload?.recipe?.[0]?.frag || payload?.frag;
}

function buildSpecificTemplateSelection(
  prompt: string,
  theme: ReturnType<typeof parsePromptToSpec>["theme"],
  random: () => number
): ShaderTemplateSelection | null {
  if (isFlamePrompt(prompt) || theme === "flames") {
    return {
      template: "flame-plumes",
      params: { intensity: 0.9 + random() * 0.5 },
    };
  }
  if (theme === "water") {
    return {
      template: "water-caustics",
      params: { scale: 2.2 + random(), speed: 0.4 + random() * 0.5 },
    };
  }
  if (theme === "zebra") {
    return {
      template: "zebra-stripes",
      params: {
        bend: 0.6 + random() * 0.6,
        freq: 6 + Math.floor(random() * 8),
        wobble: 0.2 + random() * 0.6,
      },
    };
  }
  if (theme === "aurora" || theme === "flow") {
    const template = pickFromArray(["flow-curl", "watercolor-paper"], random);
    return {
      template,
      params:
        template === "flow-curl"
          ? { density: 0.9 + random() * 0.8 }
          : { bleed: 0.4 + random() * 0.5 },
    };
  }

  return null;
}

function buildGenericTemplateSelection(random: () => number): ShaderTemplateSelection {
  const template = pickFromArray(
    [
      "noisy-blobs",
      "voronoi-fade",
      "halftone-dots",
      "chroma-shift",
      "flow-curl",
    ],
    random
  );

  const paramsByTemplate: Record<string, () => Record<string, number>> = {
    "noisy-blobs": () => ({ scale: 0.9 + random() * 1.6 }),
    "voronoi-fade": () => ({ cells: 6 + Math.floor(random() * 10) }),
    "halftone-dots": () => ({ scale: 110 + Math.floor(random() * 80) }),
    "chroma-shift": () => ({ shift: 0.002 + random() * 0.004 }),
    "flow-curl": () => ({ density: 0.8 + random() * 1.2 }),
  };

  return { template, params: paramsByTemplate[template]?.() || {} };
}

function buildTemplateSelection(
  prompt: string,
  random: () => number
): ShaderTemplateSelection {
  const spec = parsePromptToSpec(prompt);
  return (
    buildSpecificTemplateSelection(prompt, spec.theme, random) ||
    buildGenericTemplateSelection(random)
  );
}

function createOptionalOverlayLayers(prompt: string, random: () => number) {
  const layers: ShaderRecipeResponse["recipe"] = [];

  if (random() < 0.5) {
    layers.push({
      type: "haze",
      opacity: 0.18 + random() * 0.12,
      speed: 0.12 + random() * 0.12,
      hueBias: 0,
    });
  }

  if (/(star|spark|ember|snow|dust)/i.test(prompt) && random() < 0.7) {
    layers.push({
      type: "particles",
      count: 30 + Math.floor(random() * 40),
      color: "rgba(255,255,255,0.28)",
      size: 1,
      trail: 0.04,
    });
  }

  return layers;
}

async function requestShaderPayload(content: string) {
  return requestOpenAIJson<ShaderCompletionPayload>({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SHADER_SYSTEM_PROMPT },
      { role: "user", content },
    ],
    temperature: 0.65,
    response_format: { type: "json_object" },
  });
}

async function maybePlanShader(prompt: string) {
  const plan = await requestOpenAIText({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Design a 2-3 sentence high-level plan for a novel WebGL1 fragment shader: mention coordinate mapping, procedural basis (fbm/flow/voronoi), palette mood, and subtle mouse interactivity.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
  });

  return plan?.slice(0, 600) || "";
}

async function requestGuidedShader(prompt: string, plan: string) {
  return requestShaderPayload(
    `${prompt}\n\nPlan: ${plan}\nFollow the plan and produce the JSON with one shader layer.`
  );
}

async function requestStricterShader(prompt: string) {
  return requestOpenAIJson<ShaderCompletionPayload>({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SHADER_SYSTEM_PROMPT },
      { role: "user", content: prompt },
      { role: "system", content: STRONGER_SHADER_PROMPT },
    ],
    temperature: 0.55,
    response_format: { type: "json_object" },
  });
}

async function buildRemoteShader(prompt: string) {
  const firstPass = await requestShaderPayload(
    isFlamePrompt(prompt)
      ? `${prompt}\n\nFocus: upward-flowing turbulent flames with warm palette, subtle wind from mouse.x, no hard edges.`
      : prompt
  );

  let payload = firstPass;
  let fragment = extractShaderFragment(payload);

  if (!fragment || fragment.length < 140) {
    const plan = await maybePlanShader(prompt);
    const guided = await requestGuidedShader(prompt, plan);
    if (guided) {
      payload = guided;
      fragment = extractShaderFragment(guided) || fragment;
    }
  }

  let safety = ensureFragmentSafety(fragment);
  let quality = assessFragmentQuality(fragment);

  if (!safety.ok || !quality.ok) {
    const retry = await requestStricterShader(prompt);
    if (retry) {
      payload = retry;
      fragment = extractShaderFragment(retry) || fragment;
      safety = ensureFragmentSafety(fragment);
      quality = assessFragmentQuality(fragment);
    }
  }

  return {
    fragment:
      safety.ok && quality.ok ? fragment : buildFallbackShader(prompt),
    name: payload?.name || "Shader",
  };
}

export function buildLocalShaderRecipe(
  id: string,
  prompt: string,
  seed: number
): ShaderRecipeResponse {
  const random = createSeededRandom(seed);
  const uniforms = buildBaseUniforms(prompt, seed);
  const { template, params } = buildTemplateSelection(prompt, random);

  const fragment =
    template === "flame-plumes" && random() < 0.2
      ? CURATED_FLAME_SHADER
      : buildShaderFromTemplate(template, params);

  const recipe: ShaderRecipeResponse["recipe"] = [
    { type: "shader", frag: fragment, uniforms },
    ...createOptionalOverlayLayers(prompt, random),
  ];

  return { id, name: "Shader", prompt, recipe };
}

export async function buildRemoteShaderRecipe(
  id: string,
  prompt: string,
  seed: number
): Promise<ShaderRecipeResponse> {
  const { fragment, name } = await buildRemoteShader(prompt);

  return {
    id,
    name,
    prompt,
    recipe: [
      {
        type: "shader",
        frag: fragment || buildFallbackShader(prompt),
        uniforms: buildBaseUniforms(prompt, seed),
      },
    ],
  };
}

export function buildCatchallShaderRecipe(id: string): ShaderRecipeResponse {
  return {
    id,
    name: "Shader",
    prompt: "",
    recipe: [
      {
        type: "shader",
        frag: MINIMAL_CATCHALL_SHADER,
        uniforms: { seed: 1, colorA: "#a3c3ff", colorB: "#0a1830" },
      },
    ],
  };
}
