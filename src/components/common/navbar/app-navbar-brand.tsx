"use client";

import { Link } from "@/i18n/navigation";

export function AppNavbarBrand() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/generator"
        className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-base-800"
      >
        <span>Git Workflow Assistant</span>
      </Link>
    </div>
  );
}