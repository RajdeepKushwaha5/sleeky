"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { RJDPMark } from "@/components/rjdp-mark";
import { useLanyard } from "@/hooks/use-lanyard";
import { cn } from "@/lib/utils";

const DISCORD_USER_ID = "993454036751745125";

export function ProfileCover() {
  const { data: lanyardData } = useLanyard(DISCORD_USER_ID);

  // Typewriter effect for quote
  const fullQuote = "A certain darkness is needed to see the stars.";
  const [displayedQuote, setDisplayedQuote] = useState("");

  useEffect(() => {
    if (displayedQuote.length < fullQuote.length) {
      const timeout = setTimeout(() => {
        setDisplayedQuote(fullQuote.slice(0, displayedQuote.length + 1));
      }, 80); // Typing speed in milliseconds
      return () => clearTimeout(timeout);
    }
  }, [displayedQuote, fullQuote]);

  const isOnline = lanyardData?.discord_status && lanyardData.discord_status !== "offline";
  const statusText = lanyardData?.discord_status || "offline";

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
        {/* Animated GIF Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/assets/kiminonawa-sky.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Minimal overlay ONLY in dark mode for better text contrast */}
        <div className="absolute inset-0 dark:bg-black/40 z-[1]" />

        {/* Diagonal lines background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] z-[2]"
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
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] z-[2]"
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] z-[2]" />

        {/* Small RJDP mark - top left corner - Enhanced visibility */}
        <motion.div
          className="absolute left-4 top-4 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
          }}
        >
          <RJDPMark className="h-6 w-12" />
        </motion.div>


        {/* Live status indicator - Enhanced visibility */}
        <motion.div
          className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-sm z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span
            className="text-zinc-900 dark:text-zinc-100 font-bold"
            style={{
              textShadow: "0 0 8px rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.7), 0 0 12px rgba(255,255,255,0.6)",
            }}
          >
            status:
          </span>
          <motion.span
            className={cn(
              "inline-block h-2.5 w-2.5 rounded-full",
              isOnline ? "bg-emerald-400" : "bg-zinc-400"
            )}
            animate={isOnline ? { opacity: [1, 0.4, 1], scale: [1, 1.3, 1] } : { opacity: 0.6 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              filter: isOnline
                ? "drop-shadow(0 0 6px rgba(52,211,153,0.8)) drop-shadow(0 0 12px rgba(52,211,153,0.5))"
                : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          />
          <span
            className="text-zinc-900 dark:text-zinc-100 font-bold"
            style={{
              textShadow: "0 0 8px rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.7), 0 0 12px rgba(255,255,255,0.6)",
            }}
          >
            {statusText}
          </span>
        </motion.div>

        {/* Quote Subtitle - Center */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p
            className="text-center font-serif text-lg sm:text-xl md:text-2xl italic text-zinc-900 dark:text-zinc-100 max-w-2xl"
            style={{
              textShadow: "0 0 12px rgba(255,255,255,0.95), 0 2px 6px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.7)",
            }}
          >
            {displayedQuote}
            {displayedQuote.length < fullQuote.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-0.5 inline-block h-[1em] w-[2px] bg-zinc-900 dark:bg-zinc-100"
              />
            )}
            {displayedQuote.length === fullQuote.length && (
              <span className="block mt-2 text-sm sm:text-base not-italic opacity-90">
                — Osho
              </span>
            )}
          </p>
        </motion.div>

        {/* Decorative corner brackets - Enhanced visibility */}
        <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-zinc-400/70 dark:border-zinc-500/70" />
        <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-zinc-400/70 dark:border-zinc-500/70" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-zinc-400/70 dark:border-zinc-500/70" />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-zinc-400/70 dark:border-zinc-500/70" />
      </div>
    </BrandContextMenu>
  );
}
