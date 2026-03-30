"use client";

import { HistoryNav } from "./history-nav";

interface SiteHeaderClientProps {
  actions: React.ReactNode;
}

export function SiteHeaderClient({ actions }: SiteHeaderClientProps) {
  return (
    <header className="pointer-events-none fixed top-5 right-5 left-5 z-50 flex items-center justify-between">
      <div className="pointer-events-auto">
        <HistoryNav />
      </div>
      <div className="pointer-events-auto flex items-center gap-1.5">
        {actions}
      </div>
    </header>
  );
}
