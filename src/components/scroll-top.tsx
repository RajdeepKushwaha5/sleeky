"use client";

import { ArrowUpIcon } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollTop({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 400);
  });

  return (
    <Button
      data-visible={visible}
      className={cn(
        "[--bottom:1rem] lg:[--bottom:2rem]",
        "fixed left-4 bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] z-50 lg:left-8",
        "rounded-full border border-border/50 bg-background/80 backdrop-blur-xl shadow-lg hover:bg-accent",
        "transition-all duration-300 data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0",
        className
      )}
      variant="outline"
      size="icon-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      {...props}
    >
      <ArrowUpIcon className="size-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}

