import { useTranslations } from "next-intl";

export function GeneratorEmptyState() {
  const t = useTranslations("generator.emptyState");

  return (
    <div className="flex min-h-130 flex-col items-center justify-center rounded-[28px] border border-dashed border-base-100 bg-background px-8 text-center">
      <h2 className="mt-5 text-lg font-semibold text-base-800">
        {t("title")}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-base-500">
        {t("description")}
      </p>
    </div>
  );
}