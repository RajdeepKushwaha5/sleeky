"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  colors?: string[];
}

export function GradientText({
  children,
  className,
  animate = true,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
}: GradientTextProps) {
  const gradientColors = colors.join(", ");

  return (
    <motion.span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        animate && "animate-gradient-x",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
        backgroundSize: animate ? "200% auto" : "100% auto",
      }}
    >
      {children}
    </motion.span>
  );
}

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] bg-clip-text text-transparent dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-100",
        "animate-shimmer",
        className
      )}
    >
      {children}
    </span>
  );
}

interface SparkleTextProps {
  children: React.ReactNode;
  className?: string;
}

export function SparkleText({ children, className }: SparkleTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}
