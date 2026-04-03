"use client";

import { useState } from "react";
import { KeyRound, ShieldCheck, ExternalLink, X } from "lucide-react";
import { useTranslations } from "next-intl";

type ApiKeyRequiredDialogProps = {
  open: boolean;
  isSaving: boolean;
  mode?: "create" | "replace";
  onCloseAction: () => void;
  onSaveAction: (apiKey: string) => Promise<void>;
};

export function ApiKeyRequiredDialog({
  open,
  isSaving,
  mode = "create",
  onCloseAction,
  onSaveAction,
}: ApiKeyRequiredDialogProps) {
  const t = useTranslations("generator.apiKeyDialog");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSave() {
    try {
      setError(null);

      if (!apiKey.trim()) {
        throw new Error(t("errors.empty"));
      }

      await onSaveAction(apiKey.trim());
      setApiKey("");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.generic"));
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCloseAction}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-[28px] border border-base-100 bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-base-50 dark:bg-base-100/30">
              <KeyRound className="h-5 w-5 text-base-700" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-base-800">
                {mode === "replace" ? t("replaceTitle") : t("title")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-base-500">
                {mode === "replace"
                  ? t("replaceDescription")
                  : t("description")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseAction}
            className="inline-flex h-9 duration-500 cursor-pointer hover:opacity-70 w-9 shrink-0 items-center justify-center rounded-xl border border-base-100 text-base-500 transition-all hover:text-base-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-base-100 bg-base-50/60 p-5 dark:bg-base-100/20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-base-800">
                {t("securityTitle")}
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-base-600">
              {t("securityDescription")}
            </p>

            <p className="mt-3 text-sm leading-6 text-base-600">
              {t("securityRepositoryText")}
            </p>

            <a
              href="https://github.com/Pani-Kaz/git-workflow-assistant"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#2563eb] transition-opacity hover:opacity-80"
            >
              {t("repositoryLink")}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-3xl border border-base-100 p-5">
            <h3 className="text-sm font-semibold text-base-800">
              {t("tutorialTitle")}
            </h3>

            <ol className="mt-4 space-y-3 text-sm leading-6 text-base-600">
              <li>
                <span className="font-medium text-base-800">1.</span>{" "}
                {t("tutorialSteps.step1")}
              </li>
              <li>
                <span className="font-medium text-base-800">2.</span>{" "}
                {t("tutorialSteps.step2")}
              </li>
              <li>
                <span className="font-medium text-base-800">3.</span>{" "}
                {t("tutorialSteps.step3")}
              </li>
              <li>
                <span className="font-medium text-base-800">4.</span>{" "}
                {t("tutorialSteps.step4")}
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-base-700">
            {t("inputLabel")}
          </label>

          <input
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder={t("inputPlaceholder")}
            className="h-12 w-full rounded-2xl border border-base-100 bg-transparent px-4 text-sm text-base-800 outline-none transition-colors placeholder:text-base-400 focus:border-base-300"
          />

          <p className="text-xs leading-5 text-base-500">
            {t("inputHelper")}
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/20">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCloseAction}
            className="inline-flex duration-500 cursor-pointer hover:opacity-40 transition-all h-11 items-center rounded-xl border border-base-100 px-4 text-sm font-medium text-base-700"
          >
            {t("cancel")}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex h-11 items-center rounded-xl duration-500 cursor-pointer hover:bg-blue-700 bg-blue-600 transition-all px-4 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSaving
              ? t("saving")
              : mode === "replace"
                ? t("replaceSave")
                : t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}