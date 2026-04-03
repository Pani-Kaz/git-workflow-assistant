import { NextResponse } from "next/server";
import { z } from "zod";
import { buildCommandPreview } from "@/features/generator/lib/build-command-preview";
import { getArtifactTitle } from "@/features/generator/lib/get-artifact-title";
import { GeneratorResponse } from "@/features/generator/types/generator.types";
import { getDecryptedUserApiKeyFromCookie } from "@/lib/security/user-api-key-cookie";
import { generateGitArtifactsWithUserKey } from "@/services/ai-generation-service";

export const runtime = "nodejs";

const requestSchema = z.object({
  summary: z.string().min(10).max(4000),
  context: z.string().max(4000).optional().default(""),
  artifacts: z
    .array(z.enum(["commit", "branch", "pullRequest"]))
    .min(1)
    .max(3),
  outputLanguage: z.enum(["auto", "en"]),
  suggestionsCount: z.union([z.literal(3), z.literal(4), z.literal(5)]),
  uiLocale: z.enum(["en", "pt", "es"]),
});

export async function POST(request: Request) {
  try {
    const apiKey = await getDecryptedUserApiKeyFromCookie();

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API key not configured",
          code: "MISSING_USER_API_KEY",
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const values = requestSchema.parse(body);

    const aiResult = await generateGitArtifactsWithUserKey(values, apiKey);

    const groups: GeneratorResponse["groups"] = aiResult.groups
      .filter((group) => values.artifacts.includes(group.type))
      .map((group) => ({
        type: group.type,
        title: getArtifactTitle(values.uiLocale, group.type),
        suggestions: group.suggestions
          .slice(0, values.suggestionsCount)
          .map((value, index) => ({
            id: `${group.type}-${index + 1}`,
            value,
            command: buildCommandPreview(group.type, value),
          })),
      }));

    return NextResponse.json<GeneratorResponse>({ groups });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          issues: error.flatten(),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}