"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { RJDPMark } from "@/components/rjdp-mark";
import { useLanyard } from "@/hooks/use-lanyard";
import { cn } from "@/lib/utils";

const DISCORD_USER_ID = "993454036751745125";

const phrases = [
  "f*ck it, we ball!",
  "building cool stuff",
  "code • create • conquer",
  "turning ☕ into </code>",
];

export function ProfileCover() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { data: lanyardData } = useLanyard(DISCORD_USER_ID);

  const isOnline = lanyardData?.discord_status && lanyardData.discord_status !== "offline";
  const statusText = lanyardData?.discord_status || "offline";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
        {/* Diagonal lines background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
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
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />

        {/* Small RJDP mark - top left corner */}
        <motion.div
          className="absolute left-4 top-4 opacity-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <RJDPMark className="h-5 w-10" />
        </motion.div>

        {/* Animated text */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : -10,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span
            className={cn(
              "font-mono text-lg font-medium tracking-wide sm:text-xl md:text-2xl",
              "text-zinc-600 dark:text-zinc-400"
            )}
          >
            {phrases[phraseIndex]}
          </span>
        </motion.div>

        {/* Live status indicator */}
        <motion.div
          className="absolute bottom-3 right-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>status:</span>
          <motion.span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              isOnline ? "bg-emerald-500" : "bg-zinc-400"
            )}
            animate={isOnline ? { opacity: [1, 0.4, 1] } : { opacity: 0.6 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>{statusText}</span>
        </motion.div>

        {/* Decorative corner brackets */}
        <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-zinc-300/40 dark:border-zinc-700/40" />
        <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-zinc-300/40 dark:border-zinc-700/40" />
        <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-zinc-300/40 dark:border-zinc-700/40" />
        <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-zinc-300/40 dark:border-zinc-700/40" />
      </div>
    </BrandContextMenu>
  );
}
