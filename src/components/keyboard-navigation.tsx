"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const SECTION_IDS = [
  "overview",
  "live",
  "social",
  "about",
  "github",
  "activity",
  "tech",
  "blog",
  "experience",
  "projects",
  "awards",
  "certs",
  "book-call",
  "contact",
];

export function KeyboardNavigation() {
  const [showHint, setShowHint] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const getCurrentSectionIndex = useCallback(() => {
    const scrollY = window.scrollY + window.innerHeight / 3;

    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const element = document.getElementById(SECTION_IDS[i]);
      if (element && element.offsetTop <= scrollY) {
        return i;
      }
    }
    return 0;
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
    const element = document.getElementById(SECTION_IDS[clampedIndex]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "j":
          e.preventDefault();
          const nextIndex = getCurrentSectionIndex() + 1;
          if (nextIndex < SECTION_IDS.length) {
            scrollToSection(nextIndex);
            setLastAction("↓ Next Section");
            setShowHint(true);
            setTimeout(() => setShowHint(false), 1000);
          }
          break;
        case "k":
          e.preventDefault();
          const prevIndex = getCurrentSectionIndex() - 1;
          if (prevIndex >= 0) {
            scrollToSection(prevIndex);
            setLastAction("↑ Previous Section");
            setShowHint(true);
            setTimeout(() => setShowHint(false), 1000);
          }
          break;
        case "g":
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLastAction("↑ Top");
          setShowHint(true);
          setTimeout(() => setShowHint(false), 1000);
          break;
        case "?":
          e.preventDefault();
          setShowHint((prev) => !prev);
          setLastAction("Keyboard Shortcuts");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getCurrentSectionIndex, scrollToSection]);

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-[200] -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-none border border-edge bg-background/95 px-4 py-3 font-mono text-sm shadow-lg backdrop-blur-sm">
            {/* Blueprint corner markers */}
            <div className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-foreground/30" />
            <div className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-foreground/30" />
            <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-foreground/30" />
            <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r border-b border-foreground/30" />

            {lastAction === "Keyboard Shortcuts" ? (
              <div className="flex flex-col gap-2">
                <div className="text-xs tracking-wider text-muted-foreground uppercase">
                  Keyboard Shortcuts
                </div>
                <div className="flex gap-4 text-foreground">
                  <span>
                    <kbd className="rounded border border-edge bg-muted px-1.5 py-0.5 text-xs">
                      J
                    </kbd>{" "}
                    Next
                  </span>
                  <span>
                    <kbd className="rounded border border-edge bg-muted px-1.5 py-0.5 text-xs">
                      K
                    </kbd>{" "}
                    Prev
                  </span>
                  <span>
                    <kbd className="rounded border border-edge bg-muted px-1.5 py-0.5 text-xs">
                      G
                    </kbd>{" "}
                    Top
                  </span>
                  <span>
                    <kbd className="rounded border border-edge bg-muted px-1.5 py-0.5 text-xs">
                      ?
                    </kbd>{" "}
                    Help
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-foreground">{lastAction}</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
