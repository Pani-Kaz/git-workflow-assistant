"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  GENERATOR_ARTIFACT_OPTIONS,
  GENERATOR_SUGGESTION_COUNT_OPTIONS,
} from "@/features/generator/constants/generator-options";
import { GeneratorFormValues } from "@/features/generator/types/generator.types";

type GeneratorFormProps = {
  onSubmitAction: (values: GeneratorFormValues) => Promise<void>;
  isLoading: boolean;
};

export function GeneratorForm({
  onSubmitAction,
  isLoading,
}: GeneratorFormProps) {
  const t = useTranslations("generator.form");
  const locale = useLocale() as "en" | "pt" | "es";

  const [values, setValues] = useState<GeneratorFormValues>({
    summary: "",
    context: "",
    artifacts: ["commit", "branch", "pullRequest"],
    outputLanguage: "en",
    suggestionsCount: 3,
    uiLocale: locale,
  });

  function toggleArtifact(value: "commit" | "branch" | "pullRequest") {
    setValues((current) => {
      const exists = current.artifacts.includes(value);

      if (exists) {
        return {
          ...current,
          artifacts: current.artifacts.filter((item) => item !== value),
        };
      }

      return {
        ...current,
        artifacts: [...current.artifacts, value],
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.summary.trim()) return;
    if (!values.artifacts.length) return;

    await onSubmitAction(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-base-100/50 bg-background p-5 md:p-6"
    >
      <div>
        <h1 className="text-xl font-semibold tracking-[-0.02em] text-base-800">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm leading-6 text-base-500">
          {t("description")}
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-base-700">
            {t("summaryLabel")}
          </label>
          <textarea
            value={values.summary}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                summary: event.target.value,
              }))
            }
            placeholder={t("summaryPlaceholder")}
            className="min-h-37.5 mt-1 w-full resize-none rounded-2xl border border-base-100/50 bg-transparent px-4 py-3 text-sm text-base-800 outline-none transition-colors placeholder:text-base-400 focus:border-base-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-base-700">
            {t("contextLabel")}
          </label>
          <textarea
            value={values.context}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                context: event.target.value,
              }))
            }
            placeholder={t("contextPlaceholder")}
            className="min-h-27.5 mt-1 w-full resize-none rounded-2xl border border-base-100/50 bg-transparent px-4 py-3 text-sm text-base-800 outline-none transition-colors placeholder:text-base-400 focus:border-base-300"
          />
        </div>

        <div className="space-y-3">
          <span className="text-sm font-medium text-base-700">
            {t("artifactsLabel")}
          </span>

          <div className="grid gap-3 md:grid-cols-3 mt-1">
            {GENERATOR_ARTIFACT_OPTIONS.map((item) => {
              const active = values.artifacts.includes(item.value);

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleArtifact(item.value)}
                  className={[
                    "rounded-full border p-2 cursor-pointer duration-500 hover:-translate-y-1 text-center transition-all",
                    active
                      ? "bg-blue-600 border-blue-700/20 text-white"
                      : "border-base-100/50 bg-transparent text-base-800 hover:border-base-300",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold">
                    {t(`artifactOptions.${item.translationKey}.label`)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-700">
              {t("outputLanguageLabel")}
            </label>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    outputLanguage: "auto",
                  }))
                }
                className={[
                  "h-10 cursor-pointer duration-500 rounded-full border text-xs font-medium transition-colors",
                  values.outputLanguage === "auto"
                    ? "bg-blue-600 border-blue-700/20 text-white"
                    : "border-base-100/50 text-base-700 hover:border-base-300",
                ].join(" ")}
              >
                {t("outputLanguageOptions.auto")}
              </button>

              <button
                type="button"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    outputLanguage: "en",
                  }))
                }
                className={[
                  "h-10 rounded-full cursor-pointer duration-500 border text-sm font-medium transition-colors",
                  values.outputLanguage === "en"
                    ? "bg-blue-600 border-blue-700/20 text-white"
                    : "border-base-100/50 text-base-700 hover:border-base-300",
                ].join(" ")}
              >
                {t("outputLanguageOptions.en")}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-base-700">
              {t("suggestionsCountLabel")}
            </label>

            <div className="grid grid-cols-3 gap-2 mt-1">
              {GENERATOR_SUGGESTION_COUNT_OPTIONS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      suggestionsCount: count,
                    }))
                  }
                  className={[
                    "h-10 cursor-pointer duration-500 rounded-full border text-sm font-medium transition-colors",
                    values.suggestionsCount === count
                      ? "bg-blue-600 border-blue-700/20 text-white"
                      : "border-base-100/50 text-base-700 hover:border-base-300",
                  ].join(" ")}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={
            isLoading || !values.summary.trim() || values.artifacts.length === 0
          }
          className="inline-flex cursor-pointer duration-500 hover:opacity-70 h-11 items-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>

        <p className="text-xs text-base-500">{t("helper")}</p>
      </div>
    </form>
  );
}
