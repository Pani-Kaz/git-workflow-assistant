import OpenAI from "openai";
import { buildGenerationPrompt } from "@/features/generator/lib/build-generation-prompt";
import { generationSchema } from "@/features/generator/lib/openai-generator-schema";
import {
  generationResponseSchema,
  ParsedGenerationResponse,
} from "@/features/generator/lib/validate-generation-response";
import { GeneratorFormValues } from "@/features/generator/types/generator.types";

export async function generateGitArtifactsWithUserKey(
  values: GeneratorFormValues,
  apiKey: string,
): Promise<ParsedGenerationResponse> {
  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

  const client = new OpenAI({
    apiKey,
  });

  const completion = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "developer",
        content: buildGenerationPrompt(values),
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: generationSchema,
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("The model returned an empty response");
  }

  return generationResponseSchema.parse(JSON.parse(content));
}