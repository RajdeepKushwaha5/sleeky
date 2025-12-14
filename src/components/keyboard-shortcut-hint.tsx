"use client";

import { KeyboardIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A subtle keyboard shortcut hint that appears in the corner
 * to remind power users that shortcuts are available.
 * Shows for 5 seconds on every page load.
 */
export function KeyboardShortcutHint() {
  const [isVisible, setIsVisible] = useState(true);
  const [showFullHelp, setShowFullHelp] = useState(false);

  // Auto-hide after 5 seconds
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = useCallback(() => {
    setShowFullHelp((prev) => !prev);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-20 z-50 hidden sm:block"
        >
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "group flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-card hover:text-foreground",
              showFullHelp && "rounded-lg"
            )}
          >
            <KeyboardIcon className="size-3.5" />
            <span>Press ? for shortcuts</span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  handleDismiss();
                }
              }}
              className="ml-1 cursor-pointer rounded-full p-0.5 hover:bg-foreground/10"
              aria-label="Dismiss"
            >
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </motion.button>

          <AnimatePresence>
            {showFullHelp && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 bottom-full mb-2 rounded-lg border border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Keyboard Shortcuts
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <ShortcutItem keys={["J"]} label="Next section" />
                  <ShortcutItem keys={["K"]} label="Previous section" />
                  <ShortcutItem keys={["G"]} label="Go to top" />
                  <ShortcutItem keys={["?"]} label="Toggle help" />
                  <ShortcutItem keys={["⌘", "K"]} label="Command menu" />
                  <ShortcutItem keys={["/"]} label="Quick search" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ShortcutItem({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {keys.map((key, i) => (
          <kbd
            key={i}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-edge bg-muted px-1.5 text-xs font-medium"
          >
            {key}
          </kbd>
        ))}
      </div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
