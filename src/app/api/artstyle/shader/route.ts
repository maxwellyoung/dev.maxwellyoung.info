import { NextRequest } from "next/server";
import { ensureFragmentSafety } from "@/lib/shaderValidation";

function genId(len = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++)
    id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    const id = genId(10);
    const p = String(prompt || "");
    const isFlames =
      /\b(flame|flames|fire|ember|embers|blaze|inferno|burn|torch|lava)\b/i.test(
        p
      );
    const baseUniforms = {
      seed: Math.floor(Math.random() * 1000),
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
      // local fallback: high-quality, domain-warped FBM with palette, interactive mouse bias
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
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash(i + vec2(0.0,0.0));
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<6;i++){
    v += a * noise(p);
    p = p * 2.0 + vec2(37.0, 17.0);
    a *= 0.5;
  }
  return v;
}
vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){
  return a + b * cos(6.28318 * (c * t + d));
}

void main(){
  vec2 R = u_resolution;
  vec2 uv = gl_FragCoord.xy / R;
  uv -= 0.5; uv.x *= R.x / R.y; uv += 0.5;
  float s = fract(sin(u_seed)*43758.5453);

  // mouse influence (center bias)
  vec2 m = (u_mouse / R) - 0.5; m.x *= R.x/R.y;

  float t = u_time * 0.15;
  vec2 p = uv * (1.6 + s*0.6);
  // domain warp
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2)), fbm(p + 4.0*q + vec2(8.3, 2.8)));
  float v = fbm(p + 2.0*r + m*0.8);

  // palette + brand colors
  vec3 brand = mix(u_colorA, u_colorB, smoothstep(0.2, 0.8, v));
  vec3 tint = pal(v, vec3(0.52), vec3(0.48), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.25 + 0.3*s, 0.2));
  vec3 col = mix(brand, brand * tint, 0.28 + 0.12 * s);

  // subtle vignette
  float d = length(uv - 0.5);
  col *= 1.0 - smoothstep(0.58, 0.9, d);

  gl_FragColor = vec4(col, 1.0);
}`;
      return Response.json({
        id,
        name: "Shader",
        prompt,
        recipe: [{ type: "shader", frag, uniforms: baseUniforms }],
      });
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

    const body = {
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
      body: JSON.stringify(body),
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
    let parsed: any = null;
    try {
      parsed = JSON.parse(content || "{}");
    } catch {}
    let frag: string | undefined = parsed?.recipe?.[0]?.frag || parsed?.frag;
    const safety = ensureFragmentSafety(frag);
    if (!safety.ok) {
      // stronger fallback: domain-warped fbm as above
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
    return Response.json({
      id,
      name: parsed?.name || "Shader",
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
