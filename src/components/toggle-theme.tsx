"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useRef } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playClick = useSound("/audio/ui-sounds/click.wav");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const switchTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
  }, [resolvedTheme, setTheme, setMetaColor]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      playClick();

      // Get click coordinates for circular transition origin
      const x = e.clientX;
      const y = e.clientY;

      // Calculate the maximum radius needed to cover the entire screen
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Check if View Transitions API is supported
      if (!document.startViewTransition) {
        switchTheme();
        return;
      }

      // Set CSS custom properties for the transition origin
      document.documentElement.style.setProperty(
        "--theme-transition-x",
        `${x}px`
      );
      document.documentElement.style.setProperty(
        "--theme-transition-y",
        `${y}px`
      );
      document.documentElement.style.setProperty(
        "--theme-transition-radius",
        `${endRadius}px`
      );

      // Start the view transition
      const transition = document.startViewTransition(switchTheme);

      // Add class during transition for custom styling
      transition.ready.then(() => {
        document.documentElement.classList.add("theme-transitioning");
      });

      transition.finished.then(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    },
    [playClick, switchTheme]
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      aria-label="Toggle Theme"
      className="relative flex h-9 w-[4.55rem] cursor-pointer items-center rounded-full border border-foreground/[0.06] bg-foreground/[0.055] p-1 shadow-[0_1px_0_rgba(255,255,255,0.62)_inset] transition-all duration-300 hover:bg-foreground/[0.075] dark:border-white/[0.06] dark:bg-white/[0.07] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] dark:hover:bg-white/[0.1]"
    >
      <span
        suppressHydrationWarning
        className="absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-background/92 shadow-[0_7px_18px_rgba(0,0,0,0.16),0_1px_0_rgba(255,255,255,0.75)_inset] transition-all duration-300 ease-out dark:bg-white/[0.12] dark:shadow-[0_8px_20px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.1)_inset]"
        style={{ left: isDark ? "calc(100% - 2rem)" : "0.25rem" }}
      >
        <SunIcon className="size-4 text-foreground/70 transition-opacity duration-300 [html.dark_&]:opacity-0 [html.light_&]:opacity-100" />
        <MoonStarIcon className="absolute size-4 text-white/72 transition-opacity duration-300 [html.dark_&]:opacity-100 [html.light_&]:opacity-0" />
      </span>
    </button>
  );
}
