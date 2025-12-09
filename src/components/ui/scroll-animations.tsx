"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

// SLEEKY: All animations now load instantly on mount for a quick, snappy feel
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.3, // Faster duration for sleeky effect
  direction = "up",
  distance = 20, // Reduced distance for quicker animations
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up"
      ? [100 * speed, -100 * speed]
      : [-100 * speed, 100 * speed]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// SLEEKY: Instant animation on mount
export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.3, // Faster
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} // Less dramatic scale for speed
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right";
  once?: boolean;
}

// SLEEKY: Instant animation on mount
export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.4, // Faster
  direction = "left",
}: SlideInProps) {
  const x = direction === "left" ? -50 : 50; // Reduced distance for speed

  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

// SLEEKY: Stagger still works but triggers immediately
export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.05, // Faster stagger
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 10 }, // Reduced distance
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }, // Faster
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  width?: "fit-content" | "100%";
  once?: boolean;
}

// SLEEKY: Instant reveal animation
export function Reveal({
  children,
  className,
  width = "fit-content",
}: RevealProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        animate={{ left: "100%" }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="absolute inset-0 z-20 bg-gradient-to-r from-blue-600 to-purple-600"
      />
    </div>
  );
}

interface FloatingProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function Floating({
  children,
  className,
  duration = 3,
  distance = 10,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RotatingProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function Rotating({
  children,
  className,
  duration = 20,
}: RotatingProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
