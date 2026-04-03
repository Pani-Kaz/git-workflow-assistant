"use client";

import { useState } from "react";
import {
  GeneratorFormValues,
  GeneratorResponse,
} from "../types/generator.types";

type UseGeneratorReturn = {
  data: GeneratorResponse | null;
  isLoading: boolean;
  error: string | null;
  missingApiKey: boolean;
  resetMissingApiKey: () => void;
  generate: (values: GeneratorFormValues) => Promise<void>;
};

export function useGenerator(): UseGeneratorReturn {
  const [data, setData] = useState<GeneratorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missingApiKey, setMissingApiKey] = useState(false);

  function resetMissingApiKey() {
    setMissingApiKey(false);
  }

  async function generate(values: GeneratorFormValues) {
    try {
      setIsLoading(true);
      setError(null);
      setMissingApiKey(false);

      const response = await fetch("/api/generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.code === "MISSING_USER_API_KEY") {
          setMissingApiKey(true);
          throw new Error("MISSING_USER_API_KEY");
        }

        throw new Error(result?.error || "Failed to generate suggestions");
      }

      setData(result as GeneratorResponse);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate suggestions";

      if (message !== "MISSING_USER_API_KEY") {
        setError(message);
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    data,
    isLoading,
    error,
    missingApiKey,
    resetMissingApiKey,
    generate,
  };
}