"use client";

import { useEffect, useRef } from "react";
import { KeyRound, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

type ApiKeyManageMenuProps = {
  open: boolean;
  onCloseAction: () => void;
  onReplaceAction: () => void;
  onRemoveAction: () => Promise<void>;
};

export function ApiKeyManageMenu({
  open,
  onCloseAction,
  onReplaceAction,
  onRemoveAction,
}: ApiKeyManageMenuProps) {
  const t = useTranslations("navbar");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        onCloseAction();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseAction();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onCloseAction]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 rounded-2xl border border-base-100 bg-background p-2 shadow-xl"
    >
      <button
        type="button"
        onClick={onReplaceAction}
        className="flex h-11 cursor-pointer duration-500 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-base-700 transition-colors hover:bg-base-100/70 hover:text-base-800"
      >
        <KeyRound className="h-4 w-4" />
        {t("replaceApiKey")}
      </button>

      <button
        type="button"
        onClick={onRemoveAction}
        className="flex h-11 w-full cursor-pointer duration-500 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <Trash2 className="h-4 w-4" />
        {t("removeApiKey")}
      </button>
    </div>
  );
}