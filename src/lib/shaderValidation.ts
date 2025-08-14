export function ensureFragmentSafety(source: string | undefined): {
  ok: boolean;
  reason?: string;
} {
  if (!source || typeof source !== "string")
    return { ok: false, reason: "empty" };
  if (source.length < 120) return { ok: false, reason: "too-short" };
  if (!/gl_FragColor/.test(source))
    return { ok: false, reason: "no-fragcolor" };
  if (!/u_resolution/.test(source))
    return { ok: false, reason: "no-resolution" };
  if (!/u_time/.test(source)) return { ok: false, reason: "no-time" };
  // Disallow dangerous or unsupported tokens in WebGL1
  const banned = [
    "#extension",
    "#version",
    "highp sampler3D",
    "sampler3D",
    "dFdx",
    "dFdy",
    "fwidth",
  ];
  for (const token of banned) {
    if (source.includes(token)) return { ok: false, reason: `banned:${token}` };
  }
  // Limit loop hints (not perfect but helps)
  const manyLoop = source.match(/for\s*\(.*?;.*?i\s*<\s*(\d+)/);
  if (manyLoop && Number(manyLoop[1]) > 16)
    return { ok: false, reason: "loop-too-large" };
  return { ok: true };
}

export function extractUniformNames(source: string): string[] {
  const names: string[] = [];
  const re = /uniform\s+\w+\s+(u_[A-Za-z0-9_]+)\s*;/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) names.push(m[1]);
  return Array.from(new Set(names));
}
