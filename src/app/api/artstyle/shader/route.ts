import { NextRequest } from "next/server";
import { z } from "zod";
import {
  createId,
  createSeed,
  hasOpenAISecret,
  parseJsonRequest,
  parseOptionalPrompt,
} from "@/lib/artstyle/common";
import {
  buildCatchallShaderRecipe,
  buildLocalShaderRecipe,
  buildRemoteShaderRecipe,
} from "@/lib/artstyle/shaderRecipe";

const RequestSchema = z.object({
  prompt: z.string().max(500).optional(),
  seed: z.number().int().finite().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parsedRequest = await parseJsonRequest(req, RequestSchema);
    if (!parsedRequest.ok) {
      return parsedRequest.response;
    }

    const prompt = parseOptionalPrompt(parsedRequest.data.prompt);
    const id = createId(10);
    const seed = createSeed(parsedRequest.data.seed);

    if (!hasOpenAISecret()) {
      return Response.json(buildLocalShaderRecipe(id, prompt, seed));
    }

    return Response.json(await buildRemoteShaderRecipe(id, prompt, seed));
  } catch {
    return Response.json(buildCatchallShaderRecipe(createId(10)));
  }
}
