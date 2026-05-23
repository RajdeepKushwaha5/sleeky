"use client";

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function CADSideRulers() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {/* LEFT SIDE RULER */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 left-[-32px] hidden w-px select-none xl:block",
          resolvedTheme === "dark" ? "bg-white/10" : "bg-black/10"
        )}
      >
        {/* Ticks and dimension arrows along the left margin */}

        {/* Dimension 1: Top of Cover to Header (103px) */}
        <div className="absolute top-[20px] bottom-[120px] left-[-20px] flex w-6 flex-col items-center">
          <div className="h-px w-3 bg-foreground/20" />
          <div className="relative flex w-px flex-1 items-center justify-center border-l border-dashed border-foreground/30">
            {/* Up arrow */}
            <div className="absolute top-0 left-[-3px] h-0 w-0 border-r-[3px] border-b-[5px] border-l-[3px] border-r-transparent border-b-foreground/40 border-l-transparent" />
            <span className="z-10 rotate-[-90deg] bg-background px-1 font-mono text-[8px] text-foreground/45">
              103
            </span>
            {/* Down arrow */}
            <div className="absolute bottom-0 left-[-3px] h-0 w-0 border-t-[5px] border-r-[3px] border-l-[3px] border-t-foreground/40 border-r-transparent border-l-transparent" />
          </div>
          <div className="h-px w-3 bg-foreground/20" />
        </div>

        {/* Dimension 2: Header to Overview (804px) */}
        <div className="absolute top-[220px] bottom-[500px] left-[-20px] flex w-6 flex-col items-center">
          <div className="h-px w-3 bg-foreground/20" />
          <div className="relative flex w-px flex-1 items-center justify-center border-l border-dashed border-foreground/30">
            <div className="absolute top-0 left-[-3px] h-0 w-0 border-r-[3px] border-b-[5px] border-l-[3px] border-r-transparent border-b-foreground/40 border-l-transparent" />
            <span className="z-10 rotate-[-90deg] bg-background px-1 font-mono text-[8px] text-foreground/45">
              804
            </span>
            <div className="absolute bottom-0 left-[-3px] h-0 w-0 border-t-[5px] border-r-[3px] border-l-[3px] border-t-foreground/40 border-r-transparent border-l-transparent" />
          </div>
          <div className="h-px w-3 bg-foreground/20" />
        </div>

        {/* Dimension 3: Middle section (627px) */}
        <div className="absolute top-[650px] bottom-[1100px] left-[-20px] flex w-6 flex-col items-center">
          <div className="h-px w-3 bg-foreground/20" />
          <div className="relative flex w-px flex-1 items-center justify-center border-l border-dashed border-foreground/30">
            <div className="absolute top-0 left-[-3px] h-0 w-0 border-r-[3px] border-b-[5px] border-l-[3px] border-r-transparent border-b-foreground/40 border-l-transparent" />
            <span className="z-10 rotate-[-90deg] bg-background px-1 font-mono text-[8px] text-foreground/45">
              627
            </span>
            <div className="absolute bottom-0 left-[-3px] h-0 w-0 border-t-[5px] border-r-[3px] border-l-[3px] border-t-foreground/40 border-r-transparent border-l-transparent" />
          </div>
          <div className="h-px w-3 bg-foreground/20" />
        </div>

        {/* Dimension 4: Footer specs spacing (513px) */}
        <div className="absolute top-[1300px] bottom-[1800px] left-[-20px] flex w-6 flex-col items-center">
          <div className="h-px w-3 bg-foreground/20" />
          <div className="relative flex w-px flex-1 items-center justify-center border-l border-dashed border-foreground/30">
            <div className="absolute top-0 left-[-3px] h-0 w-0 border-r-[3px] border-b-[5px] border-l-[3px] border-r-transparent border-b-foreground/40 border-l-transparent" />
            <span className="z-10 rotate-[-90deg] bg-background px-1 font-mono text-[8px] text-foreground/45">
              513
            </span>
            <div className="absolute bottom-0 left-[-3px] h-0 w-0 border-t-[5px] border-r-[3px] border-l-[3px] border-t-foreground/40 border-r-transparent border-l-transparent" />
          </div>
          <div className="h-px w-3 bg-foreground/20" />
        </div>

        {/* Section Coordinate Indicator Labels on the left border */}
        <div className="absolute top-[80px] left-[-8px] rotate-[-90deg] font-mono text-[8px] tracking-widest text-foreground/40 uppercase">
          H1
        </div>
        <div className="absolute top-[280px] left-[-8px] rotate-[-90deg] font-mono text-[8px] tracking-widest text-foreground/40 uppercase">
          DIR
        </div>
        <div className="absolute top-[520px] left-[-8px] rotate-[-90deg] font-mono text-[8px] tracking-widest text-foreground/30 uppercase">
          COY
        </div>
        <div className="absolute top-[960px] left-[-8px] rotate-[-90deg] font-mono text-[8px] tracking-widest text-foreground/30 uppercase">
          COL
        </div>
        <div className="absolute top-[1480px] left-[-8px] rotate-[-90deg] font-mono text-[8px] tracking-widest text-foreground/30 uppercase">
          COT
        </div>
        <div className="absolute top-[1820px] left-[-8px] rotate-[-90deg] font-mono text-[8px] tracking-widest text-foreground/25 uppercase">
          TW12
        </div>
      </div>

      {/* RIGHT SIDE RULER */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-[-32px] bottom-0 hidden w-px select-none xl:block",
          resolvedTheme === "dark" ? "bg-white/10" : "bg-black/10"
        )}
      >
        {/* Right side ticks */}
        <div className="absolute top-[120px] right-[-4px] h-px w-2 bg-foreground/20" />
        <div className="absolute top-[360px] right-[-4px] h-px w-2 bg-foreground/20" />
        <div className="absolute top-[680px] right-[-4px] h-px w-2 bg-foreground/20" />
        <div className="absolute top-[1020px] right-[-4px] h-px w-2 bg-foreground/20" />
        <div className="absolute top-[1380px] right-[-4px] h-px w-2 bg-foreground/20" />
        <div className="absolute top-[1720px] right-[-4px] h-px w-2 bg-foreground/20" />

        {/* Rotation tags */}
        <div className="absolute top-[150px] right-[-8px] rotate-[90deg] font-mono text-[8px] tracking-widest text-foreground/30 uppercase">
          X64
        </div>
        <div className="absolute top-[420px] right-[-8px] rotate-[90deg] font-mono text-[8px] tracking-widest text-foreground/30 uppercase">
          CL26
        </div>
        <div className="absolute top-[800px] right-[-8px] rotate-[90deg] font-mono text-[8px] tracking-widest text-foreground/25 uppercase">
          2026
        </div>
        <div className="absolute top-[1220px] right-[-8px] rotate-[90deg] font-mono text-[8px] tracking-widest text-foreground/25 uppercase">
          DH33
        </div>
      </div>
    </>
  );
}
