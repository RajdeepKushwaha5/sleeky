"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  gradient?: "blue" | "purple" | "pink" | "green" | "orange" | "none";
  hoverEffect?: boolean;
}

const gradientClasses = {
  blue: "from-blue-500/10 via-blue-500/5 to-transparent dark:from-blue-500/20 dark:via-blue-500/10",
  purple: "from-purple-500/10 via-purple-500/5 to-transparent dark:from-purple-500/20 dark:via-purple-500/10",
  pink: "from-pink-500/10 via-pink-500/5 to-transparent dark:from-pink-500/20 dark:via-pink-500/10",
  green: "from-green-500/10 via-green-500/5 to-transparent dark:from-green-500/20 dark:via-green-500/10",
  orange: "from-orange-500/10 via-orange-500/5 to-transparent dark:from-orange-500/20 dark:via-orange-500/10",
  none: "",
};

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  gradient = "none",
  hoverEffect = true,
}: BentoCardProps) {
  const colSpanClass = {
    1: "",
    2: "sm:col-span-2",
    3: "sm:col-span-2 lg:col-span-3",
  };

  const rowSpanClass = {
    1: "",
    2: "row-span-2",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-edge bg-white/50 p-6 backdrop-blur-sm transition-shadow duration-300",
        "dark:bg-zinc-900/50",
        hoverEffect && "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5",
        gradient !== "none" && `bg-gradient-to-br ${gradientClasses[gradient]}`,
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        className
      )}
    >
      {/* Hover gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      
      {/* Border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-blue-500/30" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface BentoCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCardHeader({ children, className }: BentoCardHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-3", className)}>
      {children}
    </div>
  );
}

interface BentoCardIconProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function BentoCardIcon({
  children,
  className,
  gradient = true,
}: BentoCardIconProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        gradient
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
          : "bg-zinc-100 dark:bg-zinc-800",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCardTitle({ children, className }: BentoCardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
  );
}

interface BentoCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCardDescription({
  children,
  className,
}: BentoCardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
