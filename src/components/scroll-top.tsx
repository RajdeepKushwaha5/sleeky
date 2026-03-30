"use client";

import { ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const NAV_IDX_KEY = "__navIdx";
const NAV_MAX_KEY = "__navMaxIdx";

export function ScrollTop({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const router = useRouter();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const indexRef = useRef(0);
  const maxIndexRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setShowScrollTop(latestValue >= 400);
  });

  useEffect(() => {
    const updateButtons = () => {
      setCanGoBack(indexRef.current > 0);
      setCanGoForward(indexRef.current < maxIndexRef.current);
    };

    // Read or initialize the nav index from history.state
    const state = window.history.state;
    const existingIdx = state?.[NAV_IDX_KEY];

    // Persist max index across refreshes via sessionStorage
    const storedMax = parseInt(sessionStorage.getItem(NAV_MAX_KEY) || "0", 10);

    if (existingIdx !== undefined) {
      indexRef.current = existingIdx;
      maxIndexRef.current = Math.max(storedMax, existingIdx);
    } else {
      // First visit in this session — stamp state with index 0
      indexRef.current = 0;
      maxIndexRef.current = storedMax;
      window.history.replaceState({ ...state, [NAV_IDX_KEY]: 0 }, "");
    }

    sessionStorage.setItem(NAV_MAX_KEY, String(maxIndexRef.current));
    updateButtons();

    // Intercept pushState so every client-side navigation gets an index
    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = function (
      data: unknown,
      unused: string,
      url?: string | URL | null
    ) {
      const newIdx = indexRef.current + 1;
      indexRef.current = newIdx;
      maxIndexRef.current = newIdx; // new nav clears forward stack
      sessionStorage.setItem(NAV_MAX_KEY, String(newIdx));

      const patched =
        data && typeof data === "object"
          ? { ...data, [NAV_IDX_KEY]: newIdx }
          : { [NAV_IDX_KEY]: newIdx };

      originalPushState(patched, unused, url);
      updateButtons();
    };

    // Back / forward detected via popstate
    const onPopState = () => {
      const idx = window.history.state?.[NAV_IDX_KEY];
      if (idx !== undefined) {
        indexRef.current = idx;
        updateButtons();
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.history.pushState = originalPushState;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return (
    <div
      className={cn(
        "[--bottom:1rem] lg:[--bottom:2rem]",
        "fixed bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] left-4 z-50 lg:left-8",
        "flex items-center gap-1.5",
        className
      )}
    >
      {/* Back / Forward */}
      <div className="flex items-center overflow-hidden rounded-full border border-border/50 bg-background/80 shadow-lg backdrop-blur-xl">
        <button
          onClick={() => canGoBack && router.back()}
          disabled={!canGoBack}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors",
            canGoBack
              ? "cursor-pointer text-foreground/60 hover:bg-accent hover:text-foreground"
              : "cursor-not-allowed text-foreground/20"
          )}
          aria-label="Go back"
          type="button"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <div className="h-5 w-px bg-border/40" />
        <button
          onClick={() => canGoForward && router.forward()}
          disabled={!canGoForward}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors",
            canGoForward
              ? "cursor-pointer text-foreground/60 hover:bg-accent hover:text-foreground"
              : "cursor-not-allowed text-foreground/20"
          )}
          aria-label="Go forward"
          type="button"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-background/80 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:bg-accent"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUpIcon className="size-5" />
            <span className="sr-only">Scroll to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
