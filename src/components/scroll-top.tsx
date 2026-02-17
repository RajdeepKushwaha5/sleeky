"use client";

import { ArrowUpIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ScrollTop({ className }: { className?: string }) {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 400);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "[--bottom:1rem] lg:[--bottom:2rem]",
            "fixed bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] left-4 z-50 lg:left-8",
            "flex h-10 w-10 items-center justify-center",
            "rounded-full border border-border/50 bg-background/80 shadow-lg backdrop-blur-xl hover:bg-accent",
            "cursor-pointer transition-colors duration-300",
            className
          )}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpIcon className="size-5" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
