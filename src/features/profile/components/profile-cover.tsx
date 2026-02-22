"use client";

import { motion } from "motion/react";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative aspect-[2.2/1] overflow-hidden rounded-2xl select-none sm:aspect-[2.8/1]",
          "flex flex-col items-center justify-center gap-3",
          "mx-2 my-6",
          // Animated glow border
          "ring-1 ring-black/[0.03] dark:ring-white/[0.04]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-2xl",
          "before:ring-2 before:ring-white/10 before:ring-inset dark:before:ring-white/5"
        )}
      >
        {/* Animated GIF Background - Light mode with warm tint */}
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            backgroundImage: "url('/assets/giphy.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(100%) contrast(1.1)",
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

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/25 to-black/5 dark:from-black/70 dark:via-black/30 dark:to-black/10" />

        {/* Aura pulse glow — bottom edge */}
        <div
          className="absolute bottom-0 left-1/2 z-[1] h-32 w-3/4 -translate-x-1/2 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(99,102,241,0.25) 0%, transparent 70%)",
            animation: "aura-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Subtle vignette effect */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.2)" }}
        />

        {/* Quote Subtitle - Per aspera ad astra */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-10 font-serif text-lg tracking-[0.04em] italic sm:text-xl md:text-2xl"
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            background:
              "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Per aspera ad astra
        </motion.p>

        {/* Subtle subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-10 font-sans text-[11px] font-light tracking-[0.2em] text-white/50 uppercase sm:text-xs"
        >
          Through hardships to the stars
        </motion.p>
      </div>
    </BrandContextMenu>
  );
}
