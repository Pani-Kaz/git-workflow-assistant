import { useTranslations } from "next-intl";
import { GeneratorResponse } from "@/features/generator/types/generator.types";
import { GeneratorEmptyState } from "./generator-empty-state";
import { GeneratorResultSection } from "./generator-result-section";

type GeneratorResultsPanelProps = {
  data: GeneratorResponse | null;
  isLoading: boolean;
  error: string | null;
};

export function GeneratorResultsPanel({
  data,
  isLoading,
  error,
}: GeneratorResultsPanelProps) {
  const t = useTranslations("generator.results");

  if (isLoading) {
    return (
      <div className="flex min-h-130 items-center justify-center rounded-[28px] border border-base-100/50 bg-background p-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-base-200 border-t-base-700" />
          <p className="text-sm text-base-500">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-130 items-center justify-center rounded-[28px] border border-red-200 bg-background p-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-red-600">
            {t("errorTitle")}
          </h2>
          <p className="mt-2 text-sm text-base-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.groups.length === 0) {
    return <GeneratorEmptyState />;
  }

  return (
    <div className="min-h-130 max-h-[80vh] overflow-y-auto space-y-8 rounded-[28px] border border-base-100/50 bg-background p-5 md:p-6">
      {data.groups.map((group) => (
        <GeneratorResultSection key={group.type} group={group} />
      ))}
    </div>
  );
}