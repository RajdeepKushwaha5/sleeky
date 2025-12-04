"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
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

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 30,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

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
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
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
    direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
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

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
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

export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "left",
  once = true,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const x = direction === "left" ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
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

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  width?: "fit-content" | "100%";
  once?: boolean;
}

export function Reveal({
  children,
  className,
  width = "fit-content",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ width }}
    >
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        animate={isInView ? { left: "100%" } : { left: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
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
