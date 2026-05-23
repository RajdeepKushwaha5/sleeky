"use client";

import { CircleEqual, GridIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

interface FloatingSidebarProps {
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  showDimensions: boolean;
  setShowDimensions: (show: boolean) => void;
}

export function FloatingSidebar({
  showGrid,
  setShowGrid,
  showDimensions,
  setShowDimensions,
}: FloatingSidebarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playClick = useSound("/audio/ui-sounds/click.wav");

  const switchTheme = useCallback(
    (theme: "light" | "dark") => {
      setTheme(theme);
      setMetaColor(
        theme === "light" ? META_THEME_COLORS.light : META_THEME_COLORS.dark
      );
    },
    [setTheme, setMetaColor]
  );

  const toggleTheme = useCallback(
    (e: React.MouseEvent, theme: "light" | "dark") => {
      playClick?.();

      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      if (!document.startViewTransition) {
        switchTheme(theme);
        return;
      }

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

      const transition = document.startViewTransition(() => switchTheme(theme));

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
    <>
      <div
        className={cn(
          "fixed bottom-24 left-4 z-[49] flex flex-col items-center gap-1 rounded-lg border bg-background/82 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300 md:top-1/2 md:bottom-auto md:left-6 md:-translate-y-1/2",
          resolvedTheme === "dark"
            ? "border-white/[0.08] bg-[#050505]/86 shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
            : "border-black/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.1)]"
        )}
      >
        <button
          onClick={() => {
            playClick?.();
            setShowGrid(!showGrid);
          }}
          title="Toggle blueprint grid"
          aria-label="Toggle grid"
          className={cn(
            "flex size-9 cursor-pointer items-center justify-center rounded-md transition-all duration-300",
            showGrid
              ? "bg-foreground text-background"
              : "text-foreground/60 hover:bg-foreground/[0.08]"
          )}
        >
          <GridIcon className="size-4.5" />
        </button>

        <button
          onClick={() => {
            playClick?.();
            setShowDimensions(!showDimensions);
          }}
          title="Toggle dimension indicators"
          aria-label="Toggle dimensions"
          className={cn(
            "flex size-9 cursor-pointer items-center justify-center rounded-md transition-all duration-300",
            showDimensions
              ? "bg-foreground text-background"
              : "text-foreground/60 hover:bg-foreground/[0.08]"
          )}
        >
          <CircleEqual className="size-4.5" />
        </button>

        <div className="h-px w-6 bg-foreground/10" />

        <button
          onClick={(e) => toggleTheme(e, "light")}
          title="Switch to light mode"
          aria-label="Switch to light mode"
          className={cn(
            "flex size-9 cursor-pointer items-center justify-center rounded-md transition-all duration-300",
            resolvedTheme === "light"
              ? "bg-foreground/10 text-foreground"
              : "text-foreground/40 hover:bg-white/5 hover:text-foreground/80"
          )}
        >
          <SunIcon className="size-4.5" />
        </button>

        <button
          onClick={(e) => toggleTheme(e, "dark")}
          title="Switch to dark mode"
          aria-label="Switch to dark mode"
          className={cn(
            "flex size-9 cursor-pointer items-center justify-center rounded-md transition-all duration-300",
            resolvedTheme === "dark"
              ? "bg-white/10 text-white"
              : "text-foreground/40 hover:bg-black/5 hover:text-foreground/80"
          )}
        >
          <MoonIcon className="size-4.5" />
        </button>
      </div>
    </>
  );
}
