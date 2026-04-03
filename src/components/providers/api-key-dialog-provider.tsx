"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ApiKeyRequiredDialog } from "@/components/generator/api-key-required-dialog";
import { useUserApiKeyStatus } from "@/features/generator/hooks/use-user-api-key-status";

type ApiKeyDialogMode = "create" | "replace";

type ApiKeyDialogContextValue = {
  openCreateDialog: () => void;
  openReplaceDialog: () => void;
  closeDialog: () => void;
  configured: boolean;
  isLoading: boolean;
};

const ApiKeyDialogContext = createContext<ApiKeyDialogContextValue | null>(null);

export function ApiKeyDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { configured, isLoading, saveApiKey, refresh } = useUserApiKeyStatus();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ApiKeyDialogMode>("create");
  const [isSaving, setIsSaving] = useState(false);

  const openCreateDialog = useCallback(() => {
    setMode("create");
    setOpen(true);
  }, []);

  const openReplaceDialog = useCallback(() => {
    setMode("replace");
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  async function handleSaveApiKey(apiKey: string) {
    try {
      setIsSaving(true);
      await saveApiKey(apiKey);
      setOpen(false);
      refresh();
    } finally {
      setIsSaving(false);
    }
  }

  const value = useMemo<ApiKeyDialogContextValue>(
    () => ({
      openCreateDialog,
      openReplaceDialog,
      closeDialog,
      configured,
      isLoading,
    }),
    [openCreateDialog, openReplaceDialog, closeDialog, configured, isLoading],
  );

  return (
    <ApiKeyDialogContext.Provider value={value}>
      {children}

      <ApiKeyRequiredDialog
        open={open}
        mode={mode}
        isSaving={isSaving}
        onCloseAction={closeDialog}
        onSaveAction={handleSaveApiKey}
      />
    </ApiKeyDialogContext.Provider>
  );
}

export function useApiKeyDialog() {
  const context = useContext(ApiKeyDialogContext);

  if (!context) {
    throw new Error("useApiKeyDialog must be used within ApiKeyDialogProvider");
  }

  return context;
}