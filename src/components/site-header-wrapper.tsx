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
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [gridCoords, setGridCoords] = useState({ x: "A", y: "00" });

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setScrolled(latestValue >= 20);

    // Calculate grid coordinates based on scroll position
    const xCoord = String.fromCharCode(
      65 + (Math.floor(latestValue / 200) % 26)
    ); // A-Z
    const yCoord = String(Math.floor(latestValue / 10) % 100).padStart(2, "0"); // 00-99
    setGridCoords({ x: xCoord, y: yCoord });
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(Math.round(latest * 100));
  });

  return (
    <header
      data-scrolled={scrolled}
      className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500"
    >
      <div
        className={cn(
          "relative flex h-14 items-center justify-between gap-3 overflow-hidden rounded-none px-4",
          "border-2 border-foreground/20 bg-background/90 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]",
          "transition-all duration-500",
          scrolled ? "w-full max-w-2xl" : "w-full max-w-4xl"
        )}
        data-header-container
      >
        {/* Blueprint grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:12px_12px] dark:bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]" />
        </div>

        {/* Progress Indicator */}
        <div className="pointer-events-none absolute right-0 -bottom-px left-0 h-0.5 bg-foreground/5">
          <div
            className="h-full bg-foreground/80 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Corner L-brackets */}
        <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-foreground/25" />
        <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-foreground/25" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-foreground/25" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-foreground/25" />

        {/* Top measurement marks */}
        <div className="pointer-events-none absolute top-0 left-1/2 flex -translate-x-1/2 gap-1 opacity-30">
          <div className="h-1.5 w-px bg-foreground" />
          <div className="h-2 w-px bg-foreground" />
          <div className="h-1.5 w-px bg-foreground" />
        </div>

        {/* Bottom dimension line */}
        <div className="pointer-events-none absolute right-6 -bottom-px left-6 h-px bg-foreground/15">
          <div className="absolute top-0 left-0 h-1 w-1 -translate-y-1/2 rounded-full bg-foreground/30" />
          <div className="absolute top-0 right-0 h-1 w-1 -translate-y-1/2 rounded-full bg-foreground/30" />
        </div>

        {/* Technical labels */}
        <div className="pointer-events-none absolute -top-2.5 left-3 bg-background px-1 font-mono text-[8px] tracking-wider text-foreground/30 select-none">
          NAV-001
        </div>
        <div className="pointer-events-none absolute -top-2.5 right-3 bg-background px-1 font-mono text-[8px] tracking-wider text-foreground/30 select-none">
          REV. {new Date().getFullYear()}
        </div>

        {/* Grid Coordinates */}
        <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-none border border-foreground/15 bg-background px-2 py-0.5 font-mono text-[9px] tracking-wider text-foreground/40 select-none">
          GRID: {gridCoords.x}-{gridCoords.y}
        </div>

        {/* Progress Percentage */}
        <div className="pointer-events-none absolute right-3 -bottom-3 rounded-none border border-foreground/15 bg-background px-1.5 py-0.5 font-mono text-[9px] text-foreground/40 select-none">
          {scrollProgress}%
        </div>

        {/* Scaffolding markers - left */}
        <div className="pointer-events-none absolute top-1/2 left-1 flex -translate-y-1/2 flex-col gap-0.5 opacity-20">
          <div className="h-px w-1.5 bg-foreground" />
          <div className="h-px w-1 bg-foreground" />
        </div>

        {/* Scaffolding markers - right */}
        <div className="pointer-events-none absolute top-1/2 right-1 flex -translate-y-1/2 flex-col gap-0.5 opacity-20">
          <div className="h-px w-1.5 bg-foreground" />
          <div className="h-px w-1 bg-foreground" />
        </div>

        {/* Content - elevated above overlays */}
        <div className="relative z-10">{logo}</div>
        <div className="relative z-10">{nav}</div>
        <div className="relative z-10">{actions}</div>
      </div>
    </header>
  );
}
