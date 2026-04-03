"use client";

import { useState } from "react";
import { KeyRound, Settings2 } from "lucide-react";
import { AppNavbarBrand } from "./app-navbar-brand";
import { AppNavbarMobileMenu } from "./app-navbar-mobile-menu";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useUserApiKeyStatus } from "@/features/generator/hooks/use-user-api-key-status";
import { ApiKeyManageMenu } from "@/components/generator/api-key-manage-menu";
import { useApiKeyDialog } from "@/components/providers/api-key-dialog-provider";

export function AppNavbar() {
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const { configured, isLoading, clearApiKey } = useUserApiKeyStatus();
  const { openCreateDialog, openReplaceDialog } = useApiKeyDialog();
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);

  const navigationItems = [
    { label: t("home"), href: "/" },
    { label: t("generator"), href: "/generator" },
  ];

  async function handleRemoveApiKey() {
    await clearApiKey();
    setIsManageMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-100 bg-background">
      <div className="mx-auto flex h-16 w-full max-w-350 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <AppNavbarBrand />

          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-3 py-2 text-[12px] font-medium transition-colors",
                    isActive
                      ? "text-base-800"
                      : "text-base-500 hover:text-base-800",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <ThemeToggle />
          <LocaleSwitcher />

          {!configured ? (
            <button
              type="button"
              onClick={openCreateDialog}
              disabled={isLoading}
              className="ml-1 rounded-full inline-flex h-9 cursor-pointer items-center gap-2 bg-blue-600 px-3 text-[12px] font-semibold text-white transition-colors duration-500 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <KeyRound className="h-3.5 w-3.5" />
              {t("addApiKey")}
            </button>
          ) : (
            <div className="relative ml-1">
              <button
                type="button"
                onClick={() => setIsManageMenuOpen((current) => !current)}
                disabled={isLoading}
                className="inline-flex rounded-full  h-9 cursor-pointer items-center gap-2 bg-blue-600 px-3 text-[12px] font-semibold text-white transition-colors duration-500 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Settings2 className="h-3.5 w-3.5" />
                {t("manageApiKey")}
              </button>

              <ApiKeyManageMenu
                open={isManageMenuOpen}
                onCloseAction={() => setIsManageMenuOpen(false)}
                onReplaceAction={() => {
                  setIsManageMenuOpen(false);
                  openReplaceDialog();
                }}
                onRemoveAction={handleRemoveApiKey}
              />
            </div>
          )}
        </div>

        <div className="ml-auto lg:hidden">
          <AppNavbarMobileMenu
            navigationItems={navigationItems}
            onOpenApiKeyDialogAction={() => {
              if (configured) {
                openReplaceDialog();
                return;
              }

              openCreateDialog();
            }}
            onRemoveApiKeyAction={handleRemoveApiKey}
            hasApiKey={configured}
          />
        </div>
      </div>
    </header>
  );
}
