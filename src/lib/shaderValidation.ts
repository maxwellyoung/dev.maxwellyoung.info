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

type QualitySignal = {
  reason: string;
  score: number;
  matches: (source: string) => boolean;
};

const QUALITY_SIGNALS: QualitySignal[] = [
  { reason: "len400", score: 1, matches: (source) => source.length >= 400 },
  {
    reason: "len250",
    score: 0.5,
    matches: (source) => source.length >= 250 && source.length < 400,
  },
  {
    reason: "noise",
    score: 2,
    matches: (source) => /\bnoise\s*\(/.test(source) || /\bfbm\s*\(/.test(source),
  },
  {
    reason: "hash",
    score: 1,
    matches: (source) => /\bfloat\s+hash\s*\(/.test(source),
  },
  {
    reason: "loop",
    score: 1,
    matches: (source) =>
      /for\s*\(\s*int\s+\w+\s*=\s*0\s*;[^;]*;\s*\w\+\+\s*\)/.test(source),
  },
  {
    reason: "mouse",
    score: 1,
    matches: (source) => (source.match(/u_mouse/g) || []).length >= 2,
  },
  {
    reason: "colorsAB",
    score: 2,
    matches: (source) => /u_colorA/.test(source) && /u_colorB/.test(source),
  },
  {
    reason: "mixAB",
    score: 1.5,
    matches: (source) =>
      /mix\s*\(\s*u_colorA\s*,\s*u_colorB\s*,|mix\s*\(\s*u_colorB\s*,\s*u_colorA\s*,/.test(
        source
      ),
  },
  {
    reason: "palette",
    score: 1,
    matches: (source) =>
      /\bvec3\s+pal\s*\(/.test(source) ||
      /\bpal\s*\(/.test(source) ||
      /\bcos\s*\(/.test(source),
  },
  {
    reason: "aspect",
    score: 1,
    matches: (source) =>
      /R\.x\s*\/\s*R\.y|u_resolution\.x\s*\/\s*u_resolution\.y/.test(source),
  },
  {
    reason: "smoothstep",
    score: 0.5,
    matches: (source) => /\bsmoothstep\s*\(/.test(source),
  },
  {
    reason: "length",
    score: 0.5,
    matches: (source) => /\blength\s*\(/.test(source),
  },
];

function collectQualitySignals(source: string) {
  return QUALITY_SIGNALS.reduce(
    (result, signal) => {
      if (signal.matches(source)) {
        result.score += signal.score;
        result.reasons.push(signal.reason);
      }
      return result;
    },
    { score: 0, reasons: [] as string[] }
  );
}

function hasFlatColorFailure(source: string, reasons: string[]) {
  const setsFlatColor =
    /gl_FragColor\s*=\s*vec4\s*\(\s*(u_colorA|u_colorB)\s*,\s*1\.0\s*\)\s*;/.test(
      source
    );
  const hasProceduralSignal = reasons.some((reason) =>
    ["noise", "loop", "palette", "smoothstep"].includes(reason)
  );

  return setsFlatColor && !hasProceduralSignal;
}

function hasTrivialGradientFailure(source: string, reasons: string[]) {
  const hasTimeUse =
    /u_time[^;\n]*[+\-*]/.test(source) || /[+\-*]\s*u_time/.test(source);
  const trivialAxisMix =
    /gl_FragColor\s*=\s*vec4\s*\(\s*mix\s*\(\s*u_colorA\s*,\s*u_colorB\s*,\s*uv\.(x|y)\s*\)\s*,\s*1\.0\s*\)\s*;/.test(
      source
    );

  return (
    trivialAxisMix &&
    !reasons.includes("noise") &&
    !hasTimeUse &&
    !reasons.includes("mouse")
  );
}

export function assessFragmentQuality(source: string | undefined): {
  ok: boolean;
  score: number;
  reasons: string[];
} {
  if (!source || typeof source !== "string")
    return { ok: false, score: 0, reasons: ["empty"] };

  const { score, reasons } = collectQualitySignals(source);

  if (hasFlatColorFailure(source, reasons)) {
    reasons.push("flat-color");
    return { ok: false, score: Math.max(0, score - 3), reasons };
  }

  if (hasTrivialGradientFailure(source, reasons)) {
    reasons.push("trivial-gradient");
    return { ok: false, score: Math.max(0, score - 3), reasons };
  }

  return { ok: score >= 6.5, score, reasons };
}
