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
    const { prompt } = (await req.json()) as { prompt?: string };
    const id = genId(10);
    const baseUniforms = {
      seed: Math.floor(Math.random() * 1000),
      colorA: "#a3c3ff",
      colorB: "#0a1830",
    };

    if (!process.env.OPENAI_SECRET) {
      // local fallback raw shader
      const frag = `
precision mediump float;
uniform vec2 u_resolution; uniform float u_time; uniform float u_seed; uniform vec3 u_colorA; uniform vec3 u_colorB;
float n(vec2 p){ return fract(sin(dot(p, vec2(41.0,289.0)))*43758.5453); }
float fbm(vec2 p){ float a=0.5, v=0.0; for(int i=0;i<6;i++){ v+=a*n(p); p*=2.0; a*=0.5; } return v; }
void main(){ vec2 uv = gl_FragCoord.xy/u_resolution.xy; uv -= 0.5; uv.x *= u_resolution.x/u_resolution.y; uv += 0.5; 
float f = fbm(uv*3.0 + vec2(u_time*0.2, -u_time*0.15) + u_seed);
vec3 col = mix(u_colorA, u_colorB, smoothstep(0.2,0.8,f)); gl_FragColor = vec4(col,1.0); }`;
      return Response.json({
        id,
        name: "Shader",
        prompt,
        recipe: [{ type: "shader", frag, uniforms: baseUniforms }],
      });
    }

    const sys = `You are a GLSL artist. Return ONLY valid JSON with fields {"id","name","prompt","recipe"}.
recipe must be an array with exactly one item: {"type":"shader","frag":"...","uniforms":{...}}.
The fragment shader must be GLSL ES 1.00, no external includes. Use these uniforms: 
uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse; uniform float u_seed; uniform vec3 u_colorA; uniform vec3 u_colorB;
Render full-screen, write to gl_FragColor. Avoid loops that cause GPU stalls. No additional text.`;

    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: String(prompt || "") },
      ],
      temperature: 0.8,
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
      const frag = `
precision mediump float; uniform vec2 u_resolution; uniform float u_time; uniform float u_seed; uniform vec3 u_colorA; uniform vec3 u_colorB;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(h(i+vec2(0,0)),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);} 
void main(){ vec2 uv = gl_FragCoord.xy/u_resolution.xy; uv -= 0.5; uv.x *= u_resolution.x/u_resolution.y; uv += 0.5; float t=u_time*0.3; 
float v = n(uv*2.0 + t) * 0.6 + n(uv*6.0 - t)*0.4; vec3 col = mix(u_colorA, u_colorB, v); gl_FragColor = vec4(col,1.0);} `;
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
    if (!frag || typeof frag !== "string" || frag.length < 60) {
      // fallback if model returned weak or missing shader
      frag = `precision mediump float; uniform vec2 u_resolution; uniform float u_time; uniform vec3 u_colorA; uniform vec3 u_colorB; 
void main(){ vec2 uv=gl_FragCoord.xy/u_resolution.xy; uv-=0.5; uv.x*=u_resolution.x/u_resolution.y; uv+=0.5; float v=0.5+0.5*sin(u_time+uv.x*8.0+uv.y*6.0); vec3 col=mix(u_colorA,u_colorB,v); gl_FragColor=vec4(col,1.0);} `;
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
