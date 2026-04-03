"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="rounded-lg border px-3 py-2 text-sm"
    >
      {currentTheme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}