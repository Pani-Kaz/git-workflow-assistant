"use client";

import { useCallback, useEffect, useState } from "react";

type UseUserApiKeyStatusReturn = {
  configured: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
  saveApiKey: (apiKey: string) => Promise<void>;
  clearApiKey: () => Promise<void>;
};

export function useUserApiKeyStatus(): UseUserApiKeyStatusReturn {
  const [configured, setConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user-api-key");
      const result = await response.json();
      setConfigured(Boolean(result?.configured));
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function saveApiKey(apiKey: string) {
    const response = await fetch("/api/user-api-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to save API key");
    }

    setConfigured(true);
  }

  async function clearApiKey() {
    await fetch("/api/user-api-key", {
      method: "DELETE",
    });

    setConfigured(false);
  }

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    configured,
    isLoading,
    refresh,
    saveApiKey,
    clearApiKey,
  };
}