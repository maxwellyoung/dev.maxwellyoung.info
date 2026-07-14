import { NextRequest } from "next/server";
import { z } from "zod";
import {
  createId,
  parseJsonRequest,
  parseOptionalPrompt,
} from "@/lib/artstyle/common";
import {
  createLocalGeneratedRecipe,
  normalizeGeneratedRecipe,
} from "@/lib/artstyle/generateRecipe";

const RequestSchema = z.object({
  prompt: z.string().max(500).optional(),
  shaderOnly: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parsedRequest = await parseJsonRequest(req, RequestSchema);
    if (!parsedRequest.ok) {
      return parsedRequest.response;
    }

    const prompt = parseOptionalPrompt(parsedRequest.data.prompt);
    const id = createId(10);

    return Response.json({
      id,
      name: "Generated",
      prompt,
      recipe: createLocalGeneratedRecipe(prompt),
    });
  } catch {
    return Response.json(
      normalizeGeneratedRecipe(
        {
          id: "local",
          name: "Generated",
          prompt: "",
          recipe: [
            {
              type: "shaderTemplate",
              template: "voronoi-fade",
              uniforms: { colorA: "#ffd1dc", colorB: "#120a1a", cells: 10 },
            },
          ],
        },
        "local",
        ""
      )
    );
  }
}
