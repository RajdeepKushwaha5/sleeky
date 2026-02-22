"use client";

import { useEffect, useState } from "react";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio-aura";

export function AuraToggle() {
  const [auraOn, setAuraOn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) !== "off";
    }
    return true;
  });

  // Sync DOM class on mount or change
  useEffect(() => {
    if (auraOn) {
      document.documentElement.classList.remove("no-aura");
    } else {
      document.documentElement.classList.add("no-aura");
    }
  }, [auraOn]);

  const toggle = () => {
    const next = !auraOn;
    setAuraOn(next);
    if (next) {
      localStorage.setItem(STORAGE_KEY, "on");
    } else {
      document.documentElement.classList.add("no-aura");
      localStorage.setItem(STORAGE_KEY, "off");
    }
  };

  return (
    <SimpleTooltip content={auraOn ? "Hide aura" : "Show aura"}>
      <button
        onClick={toggle}
        aria-label={auraOn ? "Disable aura glow" : "Enable aura glow"}
        aria-pressed={auraOn}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
          "text-muted-foreground/60 hover:text-foreground/80",
          "hover:bg-accent/50",
          auraOn && "text-foreground/70"
        )}
      >
        {/* Aura icon — concentric glow circles */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="7.5"
            cy="7.5"
            r="2.5"
            fill="currentColor"
            opacity={auraOn ? 1 : 0.4}
          />
          <circle
            cx="7.5"
            cy="7.5"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1"
            opacity={auraOn ? 0.45 : 0.2}
          />
          <circle
            cx="7.5"
            cy="7.5"
            r="6.5"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity={auraOn ? 0.2 : 0.1}
          />
        </svg>
      </button>
    </SimpleTooltip>
  );
}
