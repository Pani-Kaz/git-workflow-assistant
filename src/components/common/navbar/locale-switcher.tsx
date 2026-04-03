"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = ["en", "pt", "es"] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center rounded-full border border-base-100 bg-base-500/3 p-1">
      {locales.map((item) => {
        const active = locale === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => router.replace(pathname, { locale: item })}
            className={[
              "rounded-full cursor-pointer hover:opacity-70 duration-500 px-2.5 py-1 text-[10px] font-semibold uppercase transition-all",
              active
                ? "text-base-800 bg-base-500/20"
                : "text-base-500 hover:text-base-800 hover:bg-base-500/10",
            ].join(" ")}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}