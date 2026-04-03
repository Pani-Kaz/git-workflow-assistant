import { useTranslations } from "next-intl";
import { GeneratedArtifactGroup } from "@/features/generator/types/generator.types";
import { GeneratorResultCard } from "./generator-result-card";

type GeneratorResultSectionProps = {
  group: GeneratedArtifactGroup;
};

export function GeneratorResultSection({
  group,
}: GeneratorResultSectionProps) {
  const t = useTranslations("generator.results.section");

  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-sm font-semibold text-base-800">{group.title}</h2>
        <p className="mt-1 text-xs text-base-500">
          {t("suggestionsGenerated", { count: group.suggestions.length })}
        </p>
      </div>

      <div className="space-y-3">
        {group.suggestions.map((suggestion) => (
          <GeneratorResultCard
            key={suggestion.id}
            value={suggestion.value}
            command={suggestion.command}
          />
        ))}
      </div>
    </section>
  );
}