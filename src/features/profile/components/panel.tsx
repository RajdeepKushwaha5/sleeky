import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

const Slot = SlotPrimitive.Slot;

import { cn } from "@/lib/utils";

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "screen-line-before screen-line-after relative border-x border-edge",
        className
      )}
      {...props}
    >
      {/* Architectural grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]" />
      </div>

      {/* Diagonal construction lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] dark:opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, currentColor 30px, currentColor 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, currentColor 30px, currentColor 31px)`,
          }}
        />
      </div>

      {/* Blueprint corner markers */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-6 w-6 border-t-2 border-l-2 border-foreground/15" />
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-6 w-6 border-t-2 border-r-2 border-foreground/15" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-6 w-6 border-b-2 border-l-2 border-foreground/15" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-6 w-6 border-r-2 border-b-2 border-foreground/15" />

      {/* Architectural dimension markers - left side */}
      <div className="pointer-events-none absolute top-3 left-2 z-0 flex flex-col gap-0.5 opacity-20">
        <div className="h-px w-8 bg-foreground" />
        <div className="h-px w-6 bg-foreground" />
        <div className="h-px w-7 bg-foreground" />
      </div>

      {/* Architectural dimension markers - right side */}
      <div className="pointer-events-none absolute top-3 right-2 z-0 flex flex-col items-end gap-0.5 opacity-20">
        <div className="h-px w-8 bg-foreground" />
        <div className="h-px w-6 bg-foreground" />
        <div className="h-px w-7 bg-foreground" />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">{props.children}</div>
    </section>
  );
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn("screen-line-after relative px-4", className)}
      {...props}
    >
      {/* Blueprint measurement line before header */}
      <div className="absolute -top-2 right-4 left-4 flex items-center gap-2 opacity-30">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/30 to-foreground/30" />
        <div className="h-1 w-1 rounded-full bg-foreground/40" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-foreground/30 to-foreground/30" />
      </div>
      {props.children}
    </header>
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
      className={cn("relative text-3xl font-semibold", className)}
      {...props}
    />
  );
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-body"
      className={cn("relative p-4", className)}
      {...props}
    />
  );
}

export { Panel, PanelContent, PanelHeader, PanelTitle };
