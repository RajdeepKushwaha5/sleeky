"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface SiteHeaderClientProps {
  logo: React.ReactNode;
  nav: React.ReactNode;
  actions: React.ReactNode;
}

export function SiteHeaderClient({ logo, nav, actions }: SiteHeaderClientProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setScrolled(latestValue >= 20);
  });

  return (
    <header
      data-scrolled={scrolled}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500"
    >
      <div
        className={cn(
          "flex h-14 items-center justify-between gap-3 rounded-2xl px-4",
          "border border-border/50 bg-background/80 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.4)]",
          "transition-all duration-500",
          scrolled ? "w-full max-w-2xl" : "w-full max-w-4xl"
        )}
        data-header-container
      >
        {logo}
        {nav}
        {actions}
      </div>
    </header>
  );
}
