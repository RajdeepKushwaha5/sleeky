"use client";

import { motion } from "motion/react";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative aspect-2/1 overflow-hidden rounded-3xl select-none sm:aspect-3/1",
          "flex flex-col items-center justify-center gap-2",
          "my-4 mx-2"
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
            filter: "grayscale(100%)",
          }}
        />
        {/* Warm orange overlay removed for grayscale theme */}

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

        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 z-[1] bg-black/20 dark:bg-black/40" />

        {/* Quote Subtitle - Per aspera ad astra */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 font-serif text-lg tracking-wide text-white italic sm:text-xl md:text-2xl"
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Per aspera ad astra
        </motion.p>
      </div>
    </BrandContextMenu>
  );
}

