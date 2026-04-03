import { GeneratorArtifactType } from "../types/generator.types";

type SupportedLocale = "en" | "pt" | "es";

const titles: Record<
  SupportedLocale,
  Record<GeneratorArtifactType, string>
> = {
  en: {
    commit: "Commit suggestions",
    branch: "Branch suggestions",
    pullRequest: "Pull request suggestions",
  },
  pt: {
    commit: "Sugestões de commit",
    branch: "Sugestões de branch",
    pullRequest: "Sugestões de pull request",
  },
  es: {
    commit: "Sugerencias de commit",
    branch: "Sugerencias de branch",
    pullRequest: "Sugerencias de pull request",
  },
};

export function getArtifactTitle(
  locale: SupportedLocale,
  type: GeneratorArtifactType,
) {
  return titles[locale][type];
}