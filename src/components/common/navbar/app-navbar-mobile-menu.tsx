"use client";

import { useState } from "react";
import { KeyRound, Menu, Settings2, Trash2, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";

type NavigationItem = {
  label: string;
  href: string;
};

type AppNavbarMobileMenuProps = {
  navigationItems: NavigationItem[];
  onOpenApiKeyDialogAction: () => void;
  hasApiKey: boolean;
  onRemoveApiKeyAction: () => void;
};

export function AppNavbarMobileMenu({
  navigationItems,
  onOpenApiKeyDialogAction,
  hasApiKey,
  onRemoveApiKeyAction,
}: AppNavbarMobileMenuProps) {
  const t = useTranslations("navbar");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-base-100 bg-base-100/40 text-base-500 hover:text-base-800"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-3 top-3 w-[calc(100%-24px)] max-w-sm rounded-3xl border border-base-100 bg-background p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-base-800">Menu</span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-base-500 bg-base-800/4 border border-base-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex h-11 items-center rounded-2xl px-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-base-800/5 text-base-800 "
                        : "text-base-500 hover:bg-base-800/5 hover:text-base-800",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-base-800/8 p-3">
              <span className="text-sm font-medium text-base-500">Theme</span>
              <ThemeToggle />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl border border-base-100 p-3">
              <span className="text-sm font-medium text-base-500">
                Language
              </span>
              <LocaleSwitcher />
            </div>
            {!hasApiKey ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenApiKeyDialogAction();
                }}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-sm font-semibold text-white"
              >
                <KeyRound className="h-4 w-4" />
                {t("addApiKey")}
              </button>
            ) : (
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenApiKeyDialogAction();
                  }}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-sm font-semibold text-white"
                >
                  <Settings2 className="h-4 w-4" />
                  {t("replaceApiKey")}
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await onRemoveApiKeyAction();
                    setOpen(false);
                  }}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 text-sm font-semibold text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  {t("removeApiKey")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
