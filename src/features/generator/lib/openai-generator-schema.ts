export const generationSchema = {
  name: "git_artifact_generation",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      groups: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            type: {
              type: "string",
              enum: ["commit", "branch", "pullRequest"],
            },
            suggestions: {
              type: "array",
              items: {
                type: "string",
              },
              minItems: 3,
              maxItems: 5,
            },
          },
          required: ["type", "suggestions"],
        },
      },
    },
    required: ["groups"],
  },
  strict: true,
} as const;