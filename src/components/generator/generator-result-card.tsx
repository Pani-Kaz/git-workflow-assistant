"use client";

import { Copy, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type GeneratorResultCardProps = {
  value: string;
  command?: string;
};

export function GeneratorResultCard({
  value,
  command,
}: GeneratorResultCardProps) {
  const t = useTranslations("generator.results.card");
  const [copiedType, setCopiedType] = useState<"text" | "command" | null>(null);

  const hasCommand = useMemo(() => Boolean(command), [command]);

  async function handleCopy(text: string, type: "text" | "command") {
    await navigator.clipboard.writeText(text);
    setCopiedType(type);

    window.setTimeout(() => {
      setCopiedType(null);
    }, 1400);
  }

  return (
    <div className="rounded-3xl border border-base-100/50 bg-background p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold leading-3 text-base-800">
            {value}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(value, "text")}
          className="h-4 flex shrink-0 items-center duration-500 justify-center gap-2 rounded-xl border-none cursor-pointer hover:text-base-800 text-xs font-medium text-base-500 transition-colors"
        >
          {copiedType === "text" ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {hasCommand && (
        <div className="mt-4 rounded-2xl border border-base-100/50 bg-base-50 px-3 py-3 dark:bg-base-100/30">
          <div className="flex items-center justify-between gap-3">
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-xs text-base-700">
              {command}
            </code>

            <button
              type="button"
              onClick={() => handleCopy(command!, "command")}
              className="inline-flex h-8 duration-500 cursor-pointer shrink-0 items-center gap-2 rounded-lg border border-base-100/50 px-2.5 text-[11px] font-medium text-base-500 transition-colors hover:text-base-800"
            >
              {copiedType === "command" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copiedType === "command" ? t("copied") : t("copyCommand")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}