import { GeneratorArtifactType } from "../types/generator.types";

export function buildCommandPreview(
  type: GeneratorArtifactType,
  value: string,
): string | undefined {
  if (type === "commit") {
    const safeValue = value.replaceAll('"', '\\"');
    return `git commit -m "${safeValue}"`;
  }

  if (type === "branch") {
    return `git checkout -b ${value}`;
  }

  return undefined;
}