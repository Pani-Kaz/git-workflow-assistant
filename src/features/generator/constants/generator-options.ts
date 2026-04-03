import { GeneratorArtifactType } from "../types/generator.types";

export const GENERATOR_ARTIFACT_OPTIONS: Array<{
  value: GeneratorArtifactType;
  translationKey: string;
}> = [
  {
    value: "commit",
    translationKey: "commit",
  },
  {
    value: "branch",
    translationKey: "branch",
  },
  {
    value: "pullRequest",
    translationKey: "pullRequest",
  },
];

export const GENERATOR_SUGGESTION_COUNT_OPTIONS = [3, 4, 5] as const;