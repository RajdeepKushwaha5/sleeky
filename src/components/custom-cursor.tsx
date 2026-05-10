"use client";

import type { MotionValue } from "motion/react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const TRAIL_COUNT = 12;

function TrailDot({
  targetX,
  targetY,
  index,
  isVisible,
}: {
  targetX: MotionValue<number>;
  targetY: MotionValue<number>;
  index: number;
  isVisible: boolean;
}) {
  // Varying stiffness and damping to create the elastic stretching effect
  const stiffness = Math.max(100, 1000 - index * 60);
  const damping = 28 + index * 1.5;

  const dotX = useSpring(targetX, { stiffness, damping });
  const dotY = useSpring(targetY, { stiffness, damping });

  const opacity = isVisible ? 1 : 0;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: dotX,
        y: dotY,
      }}
      animate={{ opacity }}
      transition={{ duration: 0.2 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 20 20"
        fill="white"
        stroke="black"
        strokeWidth="1.2"
        style={{
          transform: "translate(-2px, -2px)", // Align the tip of the arrow (M2 2) with the raw mouse coordinates
        }}
      >
        <path d="M2 2 L2 16 L5.5 12 L9 18 L11 17 L7.5 11 L13 11 Z" />
      </svg>
    </motion.div>
  );
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  ) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Render the elastic trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <TrailDot
          key={i}
          targetX={cursorX}
          targetY={cursorY}
          index={i}
          isVisible={isVisible}
        />
      ))}
    </>
  );
}
