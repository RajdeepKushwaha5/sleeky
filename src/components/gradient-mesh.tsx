"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

/**
 * Animated Gradient Mesh Background with Mouse Reactivity
 * Creates smooth, morphing blob shapes that react to cursor movement
 */
export function GradientMesh() {
  // Mouse position with spring physics for smooth following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse following
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Transform mouse position to blob offsets (inverted for "push away" effect)
  const blob1X = useTransform(smoothMouseX, [0, 1], [0, -30]);
  const blob1Y = useTransform(smoothMouseY, [0, 1], [0, -30]);
  const blob2X = useTransform(smoothMouseX, [0, 1], [0, 40]);
  const blob2Y = useTransform(smoothMouseY, [0, 1], [0, 20]);
  const blob3X = useTransform(smoothMouseX, [0, 1], [0, -20]);
  const blob3Y = useTransform(smoothMouseY, [0, 1], [0, 40]);
  const blob4X = useTransform(smoothMouseX, [0, 1], [0, 25]);
  const blob4Y = useTransform(smoothMouseY, [0, 1], [0, -35]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to 0-1 range
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - more refined */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />

      {/* Animated blobs with mouse reactivity - more subtle */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[60%] w-[60%] rounded-full opacity-20 blur-[100px] dark:opacity-12"
        style={{
          background:
            "radial-gradient(circle, rgba(161,161,170,0.3) 0%, transparent 70%)",
          x: blob1X,
          y: blob1Y,
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/4 -right-1/4 h-[50%] w-[50%] rounded-full opacity-15 blur-[100px] dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(113,113,122,0.25) 0%, transparent 70%)",
          x: blob2X,
          y: blob2Y,
        }}
        animate={{
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[45%] w-[45%] rounded-full opacity-12 blur-[100px] dark:opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(82,82,91,0.25) 0%, transparent 70%)",
          x: blob3X,
          y: blob3Y,
        }}
        animate={{
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-1/4 bottom-1/3 h-[35%] w-[35%] rounded-full opacity-10 blur-[100px] dark:opacity-6"
        style={{
          background:
            "radial-gradient(circle, rgba(39,39,42,0.15) 0%, transparent 70%)",
          x: blob4X,
          y: blob4Y,
        }}
        animate={{
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
