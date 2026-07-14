import { NextRequest } from "next/server";
import { z } from "zod";
import {
  ART_STYLE_ALLOWED,
  cheapLocalArtStyleMap,
  parseJsonRequest,
  parseOptionalPrompt,
  type ArtStyle,
} from "@/lib/artstyle/common";

const RequestSchema = z.object({
  prompt: z.string().max(500).optional(),
});

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
    return Response.json({ style: resolveStyleChoice(undefined, localStyle) });
  } catch {
    return Response.json({ style: "ai" }, { status: 200 });
  }
}
