"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center overflow-hidden px-4",
        className
      )}
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]" />
      </div>

      {/* Corner brackets — matching hamburger dropdown style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pointer-events-none absolute inset-8 sm:inset-16"
      >
        <div className="absolute top-0 left-0 h-8 w-8 border-t border-l border-foreground/10" />
        <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-foreground/10" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-foreground/10" />
        <div className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-foreground/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Giant ghost 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative select-none"
        >
          <span className="font-[family-name:var(--font-syne)] text-[10rem] leading-none font-bold tracking-tighter text-foreground/[0.04] sm:text-[14rem]">
            404
          </span>
        </motion.div>

        {/* Overlay content — pulled up over the ghost text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-24 flex flex-col items-center sm:-mt-32"
        >
          {/* Status badge */}
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span className="font-[family-name:var(--font-outfit)] text-xs tracking-widest text-muted-foreground/60 uppercase">
              Page not found
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Lost in the void
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-sm text-center font-[family-name:var(--font-outfit)] text-sm leading-relaxed tracking-wide text-muted-foreground/70">
            This page doesn&apos;t exist or has been moved.
            <br />
            Let&apos;s get you back on track.
          </p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8"
          >
            <Button
              variant="outline"
              asChild
              className="group rounded-lg border-foreground/10 px-6 transition-all hover:border-foreground/20 hover:bg-foreground/5"
            >
              <Link href="/">
                <span className="font-[family-name:var(--font-outfit)] text-sm tracking-wide">
                  Back to Home
                </span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Technical ref — small detail like Discord status dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex items-center gap-2 font-mono text-[10px] text-muted-foreground/30"
        >
          <div className="h-px w-6 bg-foreground/10" />
          <span>ERR_NOT_FOUND</span>
          <div className="h-px w-6 bg-foreground/10" />
        </motion.div>
      </div>
    </div>
  );
}
