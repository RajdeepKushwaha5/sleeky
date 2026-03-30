"use client";

interface SiteHeaderClientProps {
  actions: React.ReactNode;
}

export function SiteHeaderClient({ actions }: SiteHeaderClientProps) {
  return (
    <header className="fixed top-5 right-5 z-50">
      <div className="flex items-center gap-1.5">{actions}</div>
    </header>
  );
}
