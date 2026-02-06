"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// Define section IDs for tracking (ordered as they appear on page)
const SECTIONS = [
  "hero",
  "overview",
  "about",
  "experience",
  "projects",
  "blog",
  "github",
  "activity",
  "stack",
  "testimonials",
  "awards",
  "social",
  "certs",
  "live",
  "contact",
];

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
  const [currentSection, setCurrentSection] = useState(1);
  const [totalSections, setTotalSections] = useState(SECTIONS.length);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setScrolled(latestValue >= 20);
  });

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find all sections that exist on the page
      const existingSections: { id: string; top: number }[] = [];

      SECTIONS.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          existingSections.push({ id: sectionId, top: element.offsetTop });
        }
      });

      // Sort by position (should already be in order, but just in case)
      existingSections.sort((a, b) => a.top - b.top);

      // Find current section
      let currentIndex = 0;
      existingSections.forEach((section, index) => {
        if (scrollPosition >= section.top) {
          currentIndex = index;
        }
      });

      setTotalSections(existingSections.length);
      setCurrentSection(Math.min(currentIndex + 1, existingSections.length));
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format section number with leading zero
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <>
      {/* Desktop Vertical Pill - Left Centered */}
      <header className="font-space-grotesk fixed top-1/2 left-4 z-50 hidden -translate-y-1/2 flex-col gap-4 sm:flex">
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-4 overflow-hidden px-2.5 py-5",
            "rounded-2xl border border-border/30 bg-background/80 backdrop-blur-2xl backdrop-saturate-150",
            "shadow-2xl shadow-black/[0.03] dark:shadow-black/40",
            "transition-all duration-700 ease-out",
            // Refined inner glow
            "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-b before:from-foreground/[0.015] before:to-transparent",
            // Subtle ring for depth
            "ring-1 ring-white/50 dark:ring-white/[0.04]"
          )}
        >
          {/* Logo */}
          <div
            className="relative z-10 shrink-0 rotate-180 transform text-base font-bold tracking-tight whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {logo}
          </div>

          {/* Separator */}
          <div className="h-px w-5 bg-gradient-to-r from-transparent via-border/60 to-transparent" />

          {/* Navigation */}
          <div className="relative z-10 flex shrink-0 flex-col items-center gap-3">
            {nav}
          </div>

          {/* Separator */}
          <div className="h-px w-5 bg-gradient-to-r from-transparent via-border/60 to-transparent" />

          {/* Actions */}
          <div className="relative z-10 flex shrink-0 flex-col items-center gap-2">
            {actions}
          </div>

          {/* Separator */}
          <div className="h-px w-5 bg-gradient-to-r from-transparent via-border/60 to-transparent" />

          {/* Section Coordinates */}
          <div className="relative z-10 flex flex-col items-center gap-0.5">
            <span className="font-mono text-[8px] tracking-widest text-foreground/30 uppercase">
              SEC
            </span>
            <span className="font-mono text-xs font-medium text-foreground/60">
              {formatNumber(currentSection)}/{formatNumber(totalSections)}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header
        data-scrolled={scrolled}
        className="font-space-grotesk fixed top-4 right-0 left-0 z-50 flex justify-center px-4 sm:hidden"
      >
        <div
          className={cn(
            "relative flex h-14 items-center justify-between gap-4 overflow-hidden px-5",
            "rounded-2xl border border-border/30 bg-background/80 backdrop-blur-2xl backdrop-saturate-150",
            "shadow-xl shadow-black/[0.03] dark:shadow-black/30",
            "ring-1 ring-white/50 dark:ring-white/[0.04]",
            "w-full max-w-sm whitespace-nowrap transition-all duration-700 ease-out"
          )}
        >
          <div className="relative z-10 shrink-0">{logo}</div>
          <div className="relative z-10 flex items-center gap-2">
            {/* Mobile Section Indicator */}
            <span className="font-mono text-[10px] text-foreground/40">
              {formatNumber(currentSection)}/{formatNumber(totalSections)}
            </span>
            {actions}
          </div>
        </div>
      </header>
    </>
  );
}
