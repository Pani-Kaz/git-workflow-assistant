import { GeneratorFormValues } from "../types/generator.types";

export function buildGenerationPrompt(values: GeneratorFormValues) {
  const outputLanguage =
    values.outputLanguage === "en"
      ? "English"
      : values.uiLocale === "pt"
        ? "Portuguese"
        : values.uiLocale === "es"
          ? "Spanish"
          : "English";

  return `
You are an expert Git workflow assistant.

Your task is to generate high-quality Git artifacts based on a developer change summary.

Rules:
- Return only valid JSON matching the requested schema.
- Generate exactly ${values.suggestionsCount} suggestions for each requested artifact type.
- Do not repeat suggestions with minor wording changes.
- Keep suggestions concise, professional and production-ready.
- Prefer conventional commit style for commits.
- For branch names:
  - lowercase only
  - use hyphens
  - no spaces
  - no quotes
  - no emojis
  - no prefixes other than the branch content itself
  - examples: feat/generator-results-panel, fix/navbar-theme-toggle
- For pull request titles:
  - concise and professional
  - no trailing period
  - preferably conventional style when natural
- For commits:
  - concise and professional
  - conventional style strongly preferred
  - no trailing period
- Output language for the generated artifact text: ${outputLanguage}
- The user interface language is ${values.uiLocale}
- Artifact types requested: ${values.artifacts.join(", ")}

Developer change summary:
${values.summary}

Additional technical context:
${values.context?.trim() || "None"}

Quality bar:
- strong naming
- clean wording
- realistic Git naming used by senior engineers
- avoid generic text like "update stuff" or "fix bug"
`.trim();
}