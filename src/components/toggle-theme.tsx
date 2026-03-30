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
      className="relative flex h-8 w-16 cursor-pointer items-center rounded-full border border-foreground/20 bg-foreground/10 p-1 transition-colors duration-300"
    >
      {/* Sliding knob */}
      <span
        className="absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground shadow-md transition-all duration-300 ease-in-out"
        style={{ left: isDark ? "calc(100% - 1.75rem)" : "0.25rem" }}
      >
        <SunIcon className="h-3.5 w-3.5 text-background transition-opacity duration-300 [html.dark_&]:opacity-0 [html.light_&]:opacity-100" />
        <MoonStarIcon className="absolute h-3.5 w-3.5 text-background transition-opacity duration-300 [html.dark_&]:opacity-100 [html.light_&]:opacity-0" />
      </span>
    </button>
  );
}
