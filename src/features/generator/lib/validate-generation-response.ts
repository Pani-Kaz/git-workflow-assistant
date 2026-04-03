import { z } from "zod";

export const generationResponseSchema = z.object({
  groups: z.array(
    z.object({
      type: z.enum(["commit", "branch", "pullRequest"]),
      suggestions: z.array(z.string().min(1)).min(1),
    }),
  ),
});

export type ParsedGenerationResponse = z.infer<typeof generationResponseSchema>;