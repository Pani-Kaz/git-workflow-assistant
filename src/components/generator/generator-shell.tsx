"use client";

import { useUserApiKeyStatus } from "@/features/generator/hooks/use-user-api-key-status";
import { GeneratorForm } from "./generator-form";
import { GeneratorResultsPanel } from "./generator-results-panel";
import { useGenerator } from "@/features/generator/hooks/use-generator";
import { useState } from "react";
import { ApiKeyRequiredDialog } from "./api-key-required-dialog";
import { useApiKeyDialog } from "../providers/api-key-dialog-provider";

export function GeneratorShell() {
  const {
    data,
    error,
    generate,
    isLoading,
    missingApiKey,
    resetMissingApiKey,
  } = useGenerator();

  const {
    configured,
    isLoading: isApiKeyStatusLoading,
    saveApiKey,
  } = useUserApiKeyStatus();

  const { openCreateDialog } = useApiKeyDialog();
  const { refresh } = useUserApiKeyStatus();

  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isSavingApiKey, setIsSavingApiKey] = useState(false);

  async function handleSaveApiKey(apiKey: string) {
    try {
      setIsSavingApiKey(true);
      await saveApiKey(apiKey);
      setIsApiKeyDialogOpen(false);
      resetMissingApiKey();
      refresh();
    } finally {
      setIsSavingApiKey(false);
    }
  }

  return (
    <>
      <section className="mx-auto w-full max-w-350 px-4 py-8 md:px-6 md:py-10 min-h-[calc(100vh-66px)] flex items-center justify-center">
        <div className="grid gap-6 xl:grid-cols-[560px_minmax(0,1fr)] w-full">
          <GeneratorForm
            onSubmitAction={async (values) => {
              if (!configured && !isApiKeyStatusLoading) {
                openCreateDialog();
                return;
              }

              try {
                await generate(values);
              } catch (error) {
                if (
                  error instanceof Error &&
                  error.message === "MISSING_USER_API_KEY"
                ) {
                  openCreateDialog();
                }
              }
            }}
            isLoading={isLoading}
          />
          <GeneratorResultsPanel
            data={data}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </section>
      <ApiKeyRequiredDialog
        open={isApiKeyDialogOpen || missingApiKey}
        isSaving={isSavingApiKey}
        onCloseAction={() => {
          setIsApiKeyDialogOpen(false);
          resetMissingApiKey();
        }}
        onSaveAction={handleSaveApiKey}
      />
    </>
  );
}
