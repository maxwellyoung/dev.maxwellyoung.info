import { NextRequest } from "next/server";
import { z } from "zod";
import {
  ART_STYLE_ALLOWED,
  cheapLocalArtStyleMap,
  hasOpenAISecret,
  parseJsonRequest,
  parseOptionalPrompt,
  requestOpenAIJson,
  type ArtStyle,
} from "@/lib/artstyle/common";

const RequestSchema = z.object({
  prompt: z.string().max(500).optional(),
});

function createStyleSystemPrompt() {
  return `You are a JSON-only mapper from aesthetic prompt to one of these exact art style keys:
${ART_STYLE_ALLOWED.join(", ")}
Rules:
- Respond with a compact JSON object: {"style":"<one-of-allowed>"}
- Prefer the closest stylistic match. If unsure, choose "ai".
- No extra text.`;
}

function resolveStyleChoice(
  style: string | undefined,
  localStyle: ArtStyle | null
): ArtStyle {
  if (style && ART_STYLE_ALLOWED.includes(style as ArtStyle)) {
    return style as ArtStyle;
  }
  return localStyle ?? "ai";
}

export async function POST(req: NextRequest) {
  try {
    const parsedRequest = await parseJsonRequest(req, RequestSchema);
    if (!parsedRequest.ok) {
      return parsedRequest.response;
    }

    const prompt = parseOptionalPrompt(parsedRequest.data.prompt);
    const localStyle = cheapLocalArtStyleMap(prompt);

    if (!hasOpenAISecret()) {
      return Response.json({ style: resolveStyleChoice(undefined, localStyle) });
    }

    const payload = await requestOpenAIJson<{ style?: string }>({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: createStyleSystemPrompt() },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    if (!payload) {
      return Response.json(
        {
          style: resolveStyleChoice(undefined, localStyle),
          error: "openai_error",
        },
        { status: 200 }
      );
    }

    return Response.json({
      style: resolveStyleChoice(payload.style, localStyle),
    });
  } catch {
    return Response.json({ style: "ai" }, { status: 200 });
  }
}
