import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

const Slot = SlotPrimitive.Slot;

import { cn } from "@/lib/utils";

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "relative my-4 overflow-hidden rounded-[1.75rem] border border-border/18 bg-background/52 p-6 backdrop-blur-md sm:p-7",
        "shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]",
        "before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-foreground/12 before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--foreground)_5%,transparent),transparent_42%)]",
        "transition-[border-color,background-color,box-shadow] duration-500",
        "hover:border-border/28 hover:bg-background/64",
        "dark:border-white/[0.055] dark:bg-black dark:shadow-none dark:backdrop-blur-none",
        "dark:before:opacity-0 dark:after:opacity-0",
        "dark:hover:border-white/[0.09]",
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
        "inline-flex flex-col gap-2 font-syne text-[1.75rem] font-bold tracking-normal text-foreground/90 sm:text-3xl",
        "[&::after]:block [&::after]:h-[2px] [&::after]:w-10 [&::after]:rounded-full",
        "[&::after]:bg-gradient-to-r [&::after]:from-foreground/50 [&::after]:via-foreground/25 [&::after]:to-transparent",
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
