"use client";

import type { HTMLAttributes } from "react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div
    className={cn("relative w-full overflow-hidden", className)}
    {...props}
  />
);

export type MarqueeContentProps = HTMLAttributes<HTMLDivElement> & {
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  autoFill?: boolean;
  loop?: number;
};

export const MarqueeContent = ({
  children,
  className,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  ...props
}: MarqueeContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    if (innerRef.current) {
      const contentWidth = innerRef.current.scrollWidth;
      // Calculate duration based on content width and desired speed (px/s)
      const calculatedDuration = contentWidth / speed;
      setDuration(calculatedDuration);
    }
  }, [children, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full overflow-hidden",
        pauseOnHover && "[&:hover_.marquee-track]:pause",
        className
      )}
      {...props}
    >
      {/* Track 1 */}
      <div
        ref={innerRef}
        className="marquee-track flex shrink-0 items-stretch"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          willChange: "transform",
          WebkitAnimation: `marquee-scroll ${duration}s linear infinite`,
          WebkitAnimationDirection:
            direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      {/* Track 2 (duplicate for seamless loop) */}
      <div
        className="marquee-track flex shrink-0 items-stretch"
        aria-hidden="true"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          willChange: "transform",
          WebkitAnimation: `marquee-scroll ${duration}s linear infinite`,
          WebkitAnimationDirection:
            direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right";
};

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      "absolute top-0 bottom-0 z-10 h-full w-20 from-background to-transparent",
      side === "left" ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l",
      className
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn("mx-2 shrink-0 object-contain", className)} {...props} />
);
