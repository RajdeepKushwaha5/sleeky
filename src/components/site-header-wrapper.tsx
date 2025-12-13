"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface SiteHeaderClientProps {
  logo: React.ReactNode;
  nav: React.ReactNode;
  actions: React.ReactNode;
}

export function SiteHeaderClient({
  logo,
  nav,
  actions,
}: SiteHeaderClientProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setScrolled(latestValue >= 20);
  });

  return (
    <>
      {/* Desktop Vertical Pill - Left Centered */}
      <header
        className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 font-space-grotesk sm:flex"
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-6 overflow-hidden py-6 px-3",
            "rounded-full border border-border/50 bg-background/80 backdrop-blur-xl",
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "transition-all duration-500"
          )}
        >
          {/* Logo */}
          <div className="relative z-10 shrink-0 rotate-180 transform whitespace-nowrap text-lg font-bold tracking-tight" style={{ writingMode: 'vertical-rl' }}>
            {logo}
          </div>

          <div className="h-px w-full bg-border/50" />

          {/* Navigation */}
          <div className="relative z-10 flex shrink-0 flex-col items-center gap-4">
            {nav}
          </div>

          <div className="h-px w-full bg-border/50" />

          {/* Actions */}
          <div className="relative z-10 flex shrink-0 flex-col items-center gap-4">
            {actions}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <header
        data-scrolled={scrolled}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 font-space-grotesk sm:hidden"
      >
        <div
          className={cn(
            "relative flex h-14 items-center justify-between gap-4 overflow-hidden px-6",
            "rounded-full border border-border/50 bg-background/80 backdrop-blur-xl",
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "transition-all duration-500 whitespace-nowrap w-full max-w-sm"
          )}
        >
          <div className="relative z-10 shrink-0">{logo}</div>
          <div className="relative z-10 shrink-0">{actions}</div>
        </div>
      </header>
    </>
  );
}

