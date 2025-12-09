import { ArrowRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Blueprint grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]" />
      </div>

      {/* Diagonal construction lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, currentColor 60px, currentColor 61px), repeating-linear-gradient(-45deg, transparent, transparent 60px, currentColor 60px, currentColor 61px)`,
          }}
        />
      </div>

      {/* Blueprint corner markers */}
      <div className="absolute top-8 left-8 h-16 w-16 border-t-2 border-l-2 border-foreground/20" />
      <div className="absolute top-8 right-8 h-16 w-16 border-t-2 border-r-2 border-foreground/20" />
      <div className="absolute bottom-8 left-8 h-16 w-16 border-b-2 border-l-2 border-foreground/20" />
      <div className="absolute right-8 bottom-8 h-16 w-16 border-r-2 border-b-2 border-foreground/20" />

      {/* Measurement marks - top */}
      <div className="pointer-events-none absolute top-12 left-1/2 flex -translate-x-1/2 gap-4 opacity-30">
        <div className="h-6 w-px bg-foreground" />
        <div className="h-4 w-px bg-foreground" />
        <div className="h-6 w-px bg-foreground" />
        <div className="h-4 w-px bg-foreground" />
        <div className="h-6 w-px bg-foreground" />
      </div>

      {/* Dimension lines - horizontal */}
      <div className="pointer-events-none absolute top-1/2 right-8 left-8 flex -translate-y-1/2 items-center gap-2 opacity-20">
        <div className="h-1 w-1 rounded-full bg-foreground" />
        <div className="h-px flex-1 bg-foreground" />
        <div className="h-1 w-1 rounded-full bg-foreground" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Technical annotation */}
        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
          <div className="h-px w-8 bg-foreground/30" />
          ERROR CODE
          <div className="h-px w-8 bg-foreground/30" />
        </div>

        {/* Large 404 */}
        <div className="relative">
          {/* Blueprint measurement lines around 404 */}
          <div className="pointer-events-none absolute -top-4 -left-8 flex flex-col gap-1 opacity-30">
            <div className="h-px w-6 bg-foreground" />
            <div className="h-px w-4 bg-foreground" />
          </div>
          <div className="pointer-events-none absolute -top-4 -right-8 flex flex-col items-end gap-1 opacity-30">
            <div className="h-px w-6 bg-foreground" />
            <div className="h-px w-4 bg-foreground" />
          </div>

          <h1 className="font-mono text-[12rem] leading-none font-bold tracking-tighter text-foreground/10 sm:text-[16rem]">
            404
          </h1>

          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-6xl font-bold tracking-tight text-foreground sm:text-8xl">
              404
            </span>
          </div>
        </div>

        {/* Section label */}
        <div className="mt-4 mb-2 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/30" />
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Page Not Found
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/30" />
        </div>

        {/* Description */}
        <p className="mb-8 max-w-md text-center font-mono text-sm text-muted-foreground">
          The blueprint you&apos;re looking for seems to be missing from our
          archives.
          <br />
          <span className="text-muted-foreground/60">
            REF: ERR_PAGE_NOT_FOUND
          </span>
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="default" asChild className="group">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Return Home
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Technical footer */}
        <div className="mt-12 flex items-center gap-3 font-mono text-[9px] text-muted-foreground/40 uppercase">
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-foreground/30" />
            <span>SCALE 1:1</span>
          </div>
          <div className="h-3 w-px bg-foreground/20" />
          <div className="flex items-center gap-1">
            <span>DRAWING: 404-ERR</span>
            <div className="h-1 w-1 rounded-full bg-foreground/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
