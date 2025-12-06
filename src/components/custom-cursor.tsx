"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  targetSelector: string;
}

export function CustomCursor({ targetSelector }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest(targetSelector);

      if (closest) {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [targetSelector]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-difference"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* Custom cursor SVG */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="translate-x-[-50%] translate-y-[-50%]"
      >
        {/* Pointer cursor */}
        <path
          d="M5 3L5 19L9 15L12 22L14.5 21L11.5 14L16 14L5 3Z"
          className="fill-white dark:fill-black"
          stroke="currentColor"
          strokeWidth="0.5"
        />

        {/* Click/Touch icon overlay */}
        <g transform="translate(17, 17)">
          {/* Outer circle */}
          <circle
            cx="7"
            cy="7"
            r="6"
            className="fill-none stroke-white dark:stroke-black"
            strokeWidth="1.5"
          />

          {/* Inner dot */}
          <circle
            cx="7"
            cy="7"
            r="2.5"
            className="fill-white dark:fill-black"
          />

          {/* Ripple effect */}
          <motion.circle
            cx="7"
            cy="7"
            r="6"
            className="fill-none stroke-white dark:stroke-black"
            strokeWidth="1"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </g>
      </svg>
    </motion.div>
  );
}
