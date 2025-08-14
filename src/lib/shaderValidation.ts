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

export function assessFragmentQuality(source: string | undefined): {
  ok: boolean;
  score: number;
  reasons: string[];
} {
  if (!source || typeof source !== "string")
    return { ok: false, score: 0, reasons: ["empty"] };
  const s = source;
  let score = 0;
  const reasons: string[] = [];

  // Length heuristics
  if (s.length >= 400) {
    score += 1;
    reasons.push("len400");
  } else if (s.length >= 250) {
    score += 0.5;
    reasons.push("len250");
  }

  // Signal for procedural richness
  const hasNoise = /\bnoise\s*\(/.test(s) || /\bfbm\s*\(/.test(s);
  if (hasNoise) {
    score += 2;
    reasons.push("noise");
  }
  const hasHash = /\bfloat\s+hash\s*\(/.test(s);
  if (hasHash) {
    score += 1;
    reasons.push("hash");
  }
  const hasLoop = /for\s*\(\s*int\s+\w+\s*=\s*0\s*;[^;]*;\s*\w\+\+\s*\)/.test(
    s
  );
  if (hasLoop) {
    score += 1;
    reasons.push("loop");
  }
  const usesMouse = (s.match(/u_mouse/g) || []).length >= 2; // count > 1 to avoid only declaration
  if (usesMouse) {
    score += 1;
    reasons.push("mouse");
  }
  const usesColors = /u_colorA/.test(s) && /u_colorB/.test(s);
  if (usesColors) {
    // double-weight color usage to push away from single-color outputs
    score += 2;
    reasons.push("colorsAB");
  }
  const mixesColors =
    /mix\s*\(\s*u_colorA\s*,\s*u_colorB\s*,|mix\s*\(\s*u_colorB\s*,\s*u_colorA\s*,/.test(
      s
    );
  if (mixesColors) {
    score += 1.5;
    reasons.push("mixAB");
  }
  const hasPalette =
    /\bvec3\s+pal\s*\(/.test(s) || /\bpal\s*\(/.test(s) || /\bcos\s*\(/.test(s);
  if (hasPalette) {
    score += 1;
    reasons.push("palette");
  }
  const aspectCorrect =
    /R\.x\s*\/\s*R\.y|u_resolution\.x\s*\/\s*u_resolution\.y/.test(s);
  if (aspectCorrect) {
    score += 1;
    reasons.push("aspect");
  }
  const hasSmoothstep = /\bsmoothstep\s*\(/.test(s);
  if (hasSmoothstep) {
    score += 0.5;
    reasons.push("smoothstep");
  }
  const usesDistance = /\blength\s*\(/.test(s);
  if (usesDistance) {
    score += 0.5;
    reasons.push("length");
  }

  // Negative signals (trivial outputs / flat color)
  const setsFlatColor =
    /gl_FragColor\s*=\s*vec4\s*\(\s*(u_colorA|u_colorB)\s*,\s*1\.0\s*\)\s*;/.test(
      s
    );
  const noProcedural = !hasNoise && !hasLoop && !hasPalette && !hasSmoothstep;
  if (setsFlatColor && noProcedural) {
    reasons.push("flat-color");
    return { ok: false, score: Math.max(0, score - 3), reasons };
  }

  // Trivial gradient check: just uv axis mix without time/noise/mouse
  const hasTimeUse = /u_time[^;\n]*[+\-*]/.test(s) || /[+\-*]\s*u_time/.test(s);
  const trivialAxisMix =
    /gl_FragColor\s*=\s*vec4\s*\(\s*mix\s*\(\s*u_colorA\s*,\s*u_colorB\s*,\s*uv\.(x|y)\s*\)\s*,\s*1\.0\s*\)\s*;/.test(
      s
    );
  if (trivialAxisMix && !hasNoise && !hasTimeUse && !usesMouse) {
    reasons.push("trivial-gradient");
    return { ok: false, score: Math.max(0, score - 3), reasons };
  }

  // Final decision: require higher richness to avoid flat outputs
  const ok = score >= 6.5;
  return { ok, score, reasons };
}
