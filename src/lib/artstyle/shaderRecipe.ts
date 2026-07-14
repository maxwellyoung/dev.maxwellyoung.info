import { parsePromptToSpec } from "@/lib/promptToSpec";
import { buildShaderFromTemplate } from "@/lib/shaderTemplates";
import {
  createSeededRandom,
  getPromptPaletteBias,
  isFlamePrompt,
  pickFromArray,
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

type ShaderTemplateSelection = {
  template: string;
  params: Record<string, number | string>;
};

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
