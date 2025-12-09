"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useRef } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";

import { Button } from "./ui/button";

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

  return (
    <Button ref={buttonRef} variant="outline" size="icon" onClick={handleClick}>
      <MoonStarIcon className="hidden [html.dark_&]:block" />
      <SunIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
