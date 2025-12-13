"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { RJDPMark } from "./rjdp-mark";


export function SiteHeaderMark() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold tracking-tighter text-foreground font-space-grotesk">
        RJDP
      </span>
    </div>
  );
}


