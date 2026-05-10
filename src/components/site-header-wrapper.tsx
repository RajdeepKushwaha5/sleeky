"use client";

interface SiteHeaderClientProps {
  actions: React.ReactNode;
}

export function SiteHeaderClient({ actions }: SiteHeaderClientProps) {
  return (
    <header className="fixed top-4 right-4 z-50 sm:top-5 sm:right-5">
      <div className="flex h-[3.05rem] items-center gap-1.5 rounded-full border border-foreground/[0.09] bg-background/86 p-1.5 shadow-[0_16px_38px_rgba(0,0,0,0.14),0_1px_0_rgba(255,255,255,0.72)_inset] backdrop-blur-2xl dark:border-white/[0.14] dark:bg-[#050505]/92 dark:shadow-[0_18px_56px_rgba(0,0,0,0.52),0_1px_0_rgba(255,255,255,0.08)_inset]">
        {actions}
      </div>
    </header>
  );
}
