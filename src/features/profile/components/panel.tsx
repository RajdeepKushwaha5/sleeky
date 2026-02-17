import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

const Slot = SlotPrimitive.Slot;

import { cn } from "@/lib/utils";

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "relative my-5 rounded-[1.75rem] border border-border/30 bg-card/60 p-7 backdrop-blur-sm",
        "ring-1 ring-white/40 dark:ring-white/[0.03]",
        "transition-colors duration-500",
        className
      )}
      {...props}
    />
  );
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn("mb-5", className)}
      {...props}
    />
  );
}

function PanelTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"h2"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      data-slot="panel-title"
      className={cn(
        "font-syne text-[1.75rem] font-bold tracking-[-0.02em] text-foreground/90 sm:text-3xl",
        className
      )}
      {...props}
    />
  );
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-body"
      className={cn("relative", className)}
      {...props}
    />
  );
}

export { Panel, PanelContent, PanelHeader, PanelTitle };
