"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function SiteHeaderWrapper({ className, ...props }: React.ComponentProps<"header">) {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setScrolled(latestValue >= 20);
  });

  return (
    <header 
      data-scrolled={scrolled} 
      className={cn(
        className,
        scrolled && "pt-2"
      )}
      {...props} 
    />
  );
}
