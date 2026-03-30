"use client";

import { ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ScrollTop({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const router = useRouter();

  const [showScrollTop, setShowScrollTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setShowScrollTop(latestValue >= 400);
  });

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
          onClick={() => router.back()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Go back"
          type="button"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <div className="h-5 w-px bg-border/40" />
        <button
          onClick={() => router.forward()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
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
