// Minimal shader templates the model can reference by name to guarantee valid GLSL

export function buildShaderFromTemplate(
  template: string,
  params: Record<string, unknown>
): string {
  switch (template) {
    case "noisy-blobs":
      return noisyBlobs(params);
    case "flame-plumes":
      return flamePlumes(params);
    case "voronoi-fade":
      return voronoiFade(params);
    case "flow-curl":
      return flowCurl(params);
    case "watercolor-paper":
      return watercolorPaper(params);
    case "halftone-dots":
      return halftoneDots(params);
    case "chroma-shift":
      return chromaShift(params);
    case "zebra-stripes":
      return zebraStripes(params);
    case "water-caustics":
      return waterCaustics(params);
    case "spiral-vortex":
      return spiralVortex(params);
    case "marble-flow":
      return marbleFlow(params);
    case "starfield-nebula":
      return starfieldNebula(params);
    case "radial-tunnel":
      return radialTunnel(params);
    case "hex-grid":
      return hexGrid(params);
    default:
      return noisyBlobs(params);
  }
}

function noisyBlobs(params: Record<string, unknown>): string {
  const scale = Number(params["scale"]) || 1.0;
  return `
// expects: u_time, u_resolution, u_colorA, u_colorB
vec2 hash(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float noise(in vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f); return mix(mix( dot(hash(i+vec2(0.0,0.0)), f-vec2(0.0,0.0)), dot(hash(i+vec2(1.0,0.0)), f-vec2(1.0,0.0)), u.x), mix( dot(hash(i+vec2(0.0,1.0)), f-vec2(0.0,1.0)), dot(hash(i+vec2(1.0,1.0)), f-vec2(1.0,1.0)), u.x), u.y); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5; uv.x *= u_resolution.x / u_resolution.y; uv += 0.5;
  float n = 0.0; float amp = 0.5; vec2 p = uv * ${scale.toFixed(2)};
  for(int i=0;i<5;i++){ n += noise(p + u_time*0.05) * amp; p *= 2.0; amp *= 0.5; }
  vec3 col = mix(u_colorA, u_colorB, smoothstep(0.2, 0.8, n));
  gl_FragColor = vec4(col, 1.0);
}`;
}

function voronoiFade(params: Record<string, unknown>): string {
  const cells = Number(params["cells"]) || 8.0;
  return `
vec2 hash2(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float voronoi(vec2 p){
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 8.0;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g = vec2(float(i), float(j));
    vec2 o = hash2(n + g);
    o = 0.5 + 0.5*sin(u_time + 6.2831*o);
    vec2 r = g + o - f;
    float d = dot(r,r);
    md = min(md, d);
  }
  return md;
}
void main(){
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  uv *= ${cells.toFixed(2)};
  float d = sqrt(voronoi(uv));
  vec3 col = mix(u_colorA, u_colorB, smoothstep(0.0, 0.9, d));
  gl_FragColor = vec4(col,1.0);
}`;
}

function flowCurl(params: Record<string, unknown>): string {
  const density = Number(params["density"]) || 1.0;
  return `
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return mat2(c,-s,s,c)*p; }
float n(vec2 p){ return fract(sin(dot(p, vec2(41.0,289.0)))*43758.5453); }
float fbm(vec2 p){ float a=0.5; float v=0.0; for(int i=0;i<6;i++){ v += a*n(p); p = rot(p*2.0, 1.2); a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5; uv.x *= u_resolution.x / u_resolution.y; uv += 0.5;
  vec2 p = uv * ${density.toFixed(2)} + vec2(u_time*0.05, -u_time*0.04);
  float f = fbm(p*4.0);
  vec3 col = mix(u_colorA, u_colorB, f);
  gl_FragColor = vec4(col,1.0);
}`;
}

function watercolorPaper(params: Record<string, unknown>): string {
  const bleed = Number(params["bleed"]) || 0.6;
  return `
float hash(vec2 p){ return fract(sin(dot(p, vec2(27.168, 38.905)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(hash(i+vec2(0,0)),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y); }
float fbm(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5; uv.x *= u_resolution.x / u_resolution.y; uv += 0.5;
  float base = fbm(uv*3.0 + u_time*0.02);
  float edge = smoothstep(0.0, 1.0, fbm(uv*2.0));
  float bleedAmt = ${bleed.toFixed(2)} * fbm(uv*6.0);
  float mixv = smoothstep(0.2, 0.8, base + bleedAmt*0.3) * edge;
  vec3 col = mix(u_colorA, u_colorB, mixv);
  float grain = noise(uv*180.0 + u_time*0.5)*0.04;
  col += grain;
  gl_FragColor = vec4(col, 1.0);
}`;
}

function halftoneDots(params: Record<string, unknown>): string {
  const scale = Number(params["scale"]) || 140.0;
  return `
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 grid = floor(uv * ${scale.toFixed(1)});
  vec2 cell = fract(uv * ${scale.toFixed(1)});
  float angle = 1.0472; // 60 deg rotation
  mat2 R = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 rp = R*(cell-0.5)+0.5;
  float d = length(rp-0.5);
  float t = 0.5 + 0.5*sin(u_time + grid.x*0.1 + grid.y*0.07);
  vec3 base = mix(u_colorA, u_colorB, t);
  float dotR = smoothstep(0.45, 0.2, d);
  vec3 col = mix(vec3(1.0), base, dotR);
  gl_FragColor = vec4(col,1.0);
}`;
}

function chromaShift(params: Record<string, unknown>): string {
  const shift = Number(params["shift"]) || 0.003;
  return `
vec3 sample(vec2 uv){
  vec2 st = uv; st -= 0.5; st.x *= u_resolution.x / u_resolution.y; st += 0.5;
  float t = 0.5 + 0.5*sin(u_time + uv.x*4.0 + uv.y*3.0);
  return mix(u_colorA, u_colorB, t);
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 c;
  c.r = sample(uv + vec2(${shift}, 0.0)).r;
  c.g = sample(uv).g;
  c.b = sample(uv - vec2(${shift}, 0.0)).b;
  gl_FragColor = vec4(c, 1.0);
}`;
}

function zebraStripes(params: Record<string, unknown>): string {
  const bend = Number(params["bend"]) || 0.8;
  const freq = Number(params["freq"]) || 8.0;
  const wobble = Number(params["wobble"]) || 0.4;
  return `
float hash(float n){ return fract(sin(n)*43758.5453); }
float noise(vec2 x){ vec2 p=floor(x); vec2 f=fract(x); f=f*f*(3.0-2.0*f); float n=p.x+p.y*57.0; return mix(mix(hash(n+0.0),hash(n+1.0),f.x),mix(hash(n+57.0),hash(n+58.0),f.x),f.y); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5; uv.x *= u_resolution.x / u_resolution.y; uv += 0.5;
  float t = u_time * 0.3;
  float n = noise(uv*3.0 + t);
  float stripe = sin(uv.x * ${freq.toFixed(2)} + n*${bend.toFixed(
    2
  )} + t*${wobble.toFixed(2)});
  float m = smoothstep(-0.1, 0.1, stripe);
  vec3 col = mix(u_colorA, u_colorB, m);
  gl_FragColor = vec4(col, 1.0);
}`;
}

function waterCaustics(params: Record<string, unknown>): string {
  const scale = Number(params["scale"]) || 2.5;
  const speed = Number(params["speed"]) || 0.6;
  return `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(hash(i+vec2(0,0)),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);} 
float fbm(vec2 p){float v=0.0; float a=0.5; for(int i=0;i<5;i++){v+=a*noise(p); p*=2.0; a*=0.5;} return v;}
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5; uv.x *= u_resolution.x / u_resolution.y; uv += 0.5;
  vec2 p = uv*${scale.toFixed(2)};
  float t = u_time*${speed.toFixed(2)};
  float c = fbm(p + vec2(t, -t)) * 1.2 + fbm(p*1.8 + vec2(-t, t))*0.8;
  c = smoothstep(0.5, 0.95, c);
  vec3 base = mix(u_colorB, u_colorA, c);
  gl_FragColor = vec4(base, 1.0);
}`;
}

function flamePlumes(params: Record<string, unknown>): string {
  const intensity = Number(params["intensity"]) || 1.0;
  return `
// expects: u_time, u_resolution, u_colorA (hot), u_colorB (dark)
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); float a=hash(i+vec2(0.0)); float b=hash(i+vec2(1.0,0.0)); float c=hash(i+vec2(0.0,1.0)); float d=hash(i+vec2(1.0,1.0)); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);} 
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(37.0,17.0); a*=0.5; } return v; }
vec3 pal(float t, vec3 A, vec3 B, vec3 C, vec3 D){ return A + B*cos(6.28318*(C*t + D)); }
void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; vec2 p=uv-0.5; p.x*=R.x/R.y;
  float t=u_time*0.9; float k=${intensity.toFixed(2)};
  vec2 q=vec2(fbm(p*2.0+vec2(0.0,t)), fbm(p*2.0-vec2(0.0,t)));
  vec2 r=vec2(fbm(p*3.0+2.0*q+vec2(1.7,9.2)), fbm(p*3.0+2.0*q+vec2(8.3,2.8)));
  float n=fbm(p*2.4+3.0*r+vec2(0.0,t*1.6));
  float profile = smoothstep(0.55, 0.0, abs(p.x));
  float heat = clamp(n*1.3 + uv.y*1.2 - 0.25, 0.0, 1.0) * profile * k;
  vec3 fire = pal(heat, vec3(0.5), vec3(0.5), vec3(1.0,0.5,0.2), vec3(0.0,0.15,0.0));
  vec3 col = mix(u_colorB, u_colorA, heat);
  col = mix(col, col*fire, 0.35);
  float d=length(p); col *= 1.0 - smoothstep(0.75, 1.1, d);
  gl_FragColor = vec4(col,1.0);
}`;
}

// New templates for greater variety
function spiralVortex(params: Record<string, unknown>): string {
  const twist = Number(params["twist"]) || 1.2;
  const arms = Number(params["arms"]) || 5.0;
  return `
void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; vec2 p=uv-0.5; p.x*=R.x/R.y;
  float a = atan(p.y, p.x);
  float r = length(p);
  float t = u_time*0.25;
  float spiral = sin(a*${arms.toFixed(1)} + r*6.0 - t*${twist.toFixed(2)});
  float m = smoothstep(-0.5, 0.8, spiral) * smoothstep(0.95, 0.1, r);
  vec3 col = mix(u_colorB, u_colorA, m);
  gl_FragColor = vec4(col,1.0);
}`;
}

function marbleFlow(params: Record<string, unknown>): string {
  const veins = Number(params["veins"]) || 3.0;
  return `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);} 
float noise(vec2 p){vec2 i=floor(p), f=fract(p);vec2 u=f*f*(3.0-2.0*f);float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);} 
float fbm(vec2 p){float v=0.0; float a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0; a*=0.5; } return v; }
void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; vec2 p=uv-0.5; p.x*=R.x/R.y;
  float t=u_time*0.1; float f = fbm(p*${veins.toFixed(1)} + vec2(t,-t));
  float veins = 0.5 + 0.5*sin(f*10.0 + p.y*6.0);
  vec3 col = mix(u_colorA, u_colorB, veins);
  gl_FragColor = vec4(col,1.0);
}`;
}

function starfieldNebula(params: Record<string, unknown>): string {
  const density = Number(params["density"]) || 1.0;
  return `
float hash(vec2 p){return fract(sin(dot(p,vec2(27.168,38.905)))*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p), f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);} 
float fbm(vec2 p){float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5;} return v; }
void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; vec2 p=uv-0.5; p.x*=R.x/R.y;
  float t=u_time*0.05; float n = fbm(p*2.5 + vec2(t,-t));
  vec3 neb = mix(u_colorB, u_colorA, smoothstep(0.3, 0.8, n));
  // sparse stars
  float s = step(0.9975, fract(sin(dot(floor(uv*R.xy*${(
    500.0 * density
  ).toFixed(1)}), vec2(12.9898,78.233)))*43758.5453));
  vec3 col = neb + vec3(s) * 0.85;
  gl_FragColor = vec4(col,1.0);
}`;
}

function radialTunnel(params: Record<string, unknown>): string {
  const speed = Number(params["speed"]) || 0.6;
  return `
void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; vec2 p=uv-0.5; p.x*=R.x/R.y;
  float t = u_time*${speed.toFixed(
    2
  )}; float r = length(p); float a = atan(p.y,p.x);
  float bands = fract(r*6.0 - t) * 0.9 + 0.1;
  float mask = smoothstep(0.0, 0.6, r) * smoothstep(0.95, 0.2, r);
  vec3 col = mix(u_colorB, u_colorA, bands) * mask;
  gl_FragColor = vec4(col,1.0);
}`;
}

function hexGrid(params: Record<string, unknown>): string {
  const scale = Number(params["scale"]) || 18.0;
  return `
vec2 hex(vec2 p){
  p = vec2(p.x, p.y*1.1547); // 2/sqrt(3)
  vec2 i = floor(p + vec2(0.5,0.5));
  vec2 f = fract(p + vec2(0.5,0.5)) - 0.5;
  vec2 a = vec2(1.0,0.0); vec2 b = vec2(0.5,0.8660254); vec2 c = vec2(-0.5,0.8660254);
  vec2 g = i + (dot(f,a) < 0.0 ? (dot(f,b) < 0.0 ? vec2(-1.0,0.0) : vec2(0.0,1.0)) : (dot(f,c) > 0.0 ? vec2(1.0,0.0) : vec2(0.0,0.0)));
  return g;
}
void main(){
  vec2 R=u_resolution; vec2 uv=gl_FragCoord.xy/R; vec2 p=uv*${scale.toFixed(1)};
  vec2 h = hex(p);
  float t = 0.5 + 0.5*sin(u_time + h.x*0.7 + h.y*0.5);
  vec3 col = mix(u_colorA, u_colorB, t);
  gl_FragColor = vec4(col,1.0);
}`;
}
