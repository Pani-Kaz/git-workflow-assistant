export type GeneratorArtifactType = "commit" | "branch" | "pullRequest";

export type GeneratorOutputLanguage = "auto" | "en";

export type GeneratorFormValues = {
  summary: string;
  context?: string;
  artifacts: GeneratorArtifactType[];
  outputLanguage: GeneratorOutputLanguage;
  suggestionsCount: 3 | 4 | 5;
  uiLocale: "en" | "pt" | "es";
};

export type GeneratedSuggestion = {
  id: string;
  value: string;
  command?: string;
};

export type GeneratedArtifactGroup = {
  type: GeneratorArtifactType;
  title: string;
  suggestions: GeneratedSuggestion[];
};

export type GeneratorResponse = {
  groups: GeneratedArtifactGroup[];
};