"use client";

import { motion } from "motion/react";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative aspect-2/1 overflow-hidden border-x border-edge select-none sm:aspect-3/1",
          "flex flex-col items-center justify-center gap-2",
          "screen-line-before screen-line-after before:-top-px after:-bottom-px",
          "bg-zinc-50 dark:bg-zinc-950"
        )}
      >
        {/* Animated GIF Background - Light mode */}
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            backgroundImage: "url('/assets/giphy.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Animated GIF Background - Dark mode */}
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            backgroundImage: "url('/assets/kiminonawa-sky.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Minimal overlay ONLY in dark mode for better text contrast */}
        <div className="absolute inset-0 z-[1] dark:bg-black/40" />

        {/* Diagonal lines background pattern */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              currentColor 8px,
              currentColor 9px
            )`,
          }}
        />

        {/* Secondary diagonal lines (opposite direction) for depth */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 16px,
              currentColor 16px,
              currentColor 17px
            )`,
          }}
        />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />

        {/* Quote Subtitle - Per aspera ad astra */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 font-mono text-sm tracking-[0.15em] text-zinc-700 italic sm:text-base md:text-lg dark:text-zinc-300"
          style={{
            textShadow:
              "0 0 20px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Per aspera ad astra
        </motion.p>

        {/* Decorative corner brackets - Enhanced visibility */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-zinc-400/70 dark:border-zinc-500/70" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-zinc-400/70 dark:border-zinc-500/70" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-zinc-400/70 dark:border-zinc-500/70" />
        <div className="absolute right-2 bottom-2 h-4 w-4 border-r-2 border-b-2 border-zinc-400/70 dark:border-zinc-500/70" />
      </div>
    </BrandContextMenu>
  );
}
