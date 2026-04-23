import { parsePromptToSpec } from "@/lib/promptToSpec";
import { ensureFragmentSafety } from "@/lib/shaderValidation";

type BackgroundLayer = Record<string, unknown> & {
  type: string;
  uniforms?: Record<string, unknown>;
  template?: string;
  frag?: string;
};

type GeneratedRecipePayload = {
  id?: string;
  name?: string;
  prompt?: string;
  recipe?: BackgroundLayer[];
};

function createRecipeFallback(prompt: string): BackgroundLayer[] {
  return [
    {
      type: "shaderTemplate",
      template: /(zebra|stripe)/i.test(prompt)
        ? "zebra-stripes"
        : /(water|ocean|sea)/i.test(prompt)
        ? "water-caustics"
        : "noisy-blobs",
      uniforms: { colorA: "#a3c3ff", colorB: "#0a1830" },
    },
  ];
}

function createOpenAIErrorFallback(): BackgroundLayer[] {
  return [
    {
      type: "shaderTemplate",
      template: "flow-curl",
      uniforms: { colorA: "#9ae6b4", colorB: "#0a1f12", density: 1.1 },
    },
  ];
}

export function createLocalGeneratedRecipe(prompt: string) {
  return [
    {
      type: "shaderTemplate",
      template: /(flame|fire|ember|lava)/i.test(prompt)
        ? "flow-curl"
        : "noisy-blobs",
      uniforms: { colorA: "#a3c3ff", colorB: "#0a1830", scale: 1.2 },
    },
    { type: "haze", opacity: 0.22, speed: 0.18, hueBias: 200 },
  ];
}

function normalizeShaderLayer(
  layer: BackgroundLayer,
  palette?: { colorA?: string; colorB?: string }
): BackgroundLayer {
  if (layer.type !== "shader" && layer.type !== "shaderTemplate") {
    return layer;
  }

  const uniforms = { ...(layer.uniforms || {}) };
  if (!uniforms.colorA) {
    uniforms.colorA = palette?.colorA || "#a3c3ff";
  }
  if (!uniforms.colorB) {
    uniforms.colorB = palette?.colorB || "#0a1830";
  }

  return { ...layer, uniforms };
}

function injectPromptBiasedTemplate(
  recipe: BackgroundLayer[],
  prompt: string
): BackgroundLayer[] {
  if (/(flame|fire|ember|lava)/i.test(prompt)) {
    return [
      {
        type: "shaderTemplate",
        template: "flame-plumes",
        uniforms: {
          colorA: "#ffd56a",
          colorB: "#1a0a00",
          intensity: 1.0,
        },
      },
      ...recipe,
    ];
  }

  if (/(zebra|stripe)/i.test(prompt)) {
    return [
      {
        type: "shaderTemplate",
        template: "zebra-stripes",
        uniforms: {
          colorA: "#111111",
          colorB: "#eeeeee",
          bend: 0.9,
          freq: 10.0,
        },
      },
      ...recipe,
    ];
  }

  if (/(water|ocean|sea)/i.test(prompt)) {
    return [
      {
        type: "shaderTemplate",
        template: "water-caustics",
        uniforms: {
          colorA: "#a0e7ff",
          colorB: "#002a3d",
          scale: 2.8,
          speed: 0.6,
        },
      },
      ...recipe,
    ];
  }

  return recipe;
}

export function normalizeGeneratedRecipe(
  payload: GeneratedRecipePayload | null,
  id: string,
  prompt: string
) {
  const spec = parsePromptToSpec(prompt);
  const recipeInput = Array.isArray(payload?.recipe)
    ? payload.recipe
    : createRecipeFallback(prompt);

  const safeLayers = recipeInput
    .filter((layer) => {
      if (layer?.type !== "shader") {
        return true;
      }
      return ensureFragmentSafety(String(layer.frag || "")).ok;
    })
    .map((layer) => {
      if (layer?.type === "shaderTemplate" && typeof layer.template === "string") {
        return {
          type: "shaderTemplate",
          template: layer.template,
          uniforms: layer.uniforms || {},
        } satisfies BackgroundLayer;
      }

      return layer;
    });

  const recipeWithShader =
    safeLayers.some(
      (layer) => layer?.type === "shader" || layer?.type === "shaderTemplate"
    )
      ? safeLayers
      : [
          {
            type: "shaderTemplate",
            template: "noisy-blobs",
            uniforms: { colorA: "#a3c3ff", colorB: "#0a1830", scale: 1.2 },
          },
          ...safeLayers,
        ];

  const promptBiasedRecipe = injectPromptBiasedTemplate(recipeWithShader, prompt);
  const normalizedRecipe = promptBiasedRecipe.map((layer) => {
    const normalizedLayer = normalizeShaderLayer(layer, spec.palette);

    if (
      spec.theme === "flames" &&
      normalizedLayer.type === "shaderTemplate" &&
      !normalizedLayer.uniforms?.intensity
    ) {
      return {
        ...normalizedLayer,
        uniforms: {
          ...(normalizedLayer.uniforms || {}),
          intensity: spec.complexity === 0.8 ? 1.2 : 1.0,
        },
      };
    }

    return normalizedLayer;
  });

  return {
    id: payload?.id || id,
    name: payload?.name || "Generated",
    prompt: String(prompt || payload?.prompt || ""),
    recipe: normalizedRecipe,
  };
}

export function createGeneratedRecipeOpenAIError(id: string, prompt?: string) {
  return {
    id,
    name: "Generated",
    prompt,
    recipe: createOpenAIErrorFallback(),
    error: "openai_error",
  };
}
