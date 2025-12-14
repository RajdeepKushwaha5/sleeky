"use client";

import Link from "next/link";

export function SiteHeaderMark() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2"
      aria-label="Home"
    >
      <span className="text-lg font-bold tracking-tighter text-foreground font-space-grotesk transition-all duration-300 group-hover:text-foreground/70 group-hover:tracking-tight">
        RJDP
      </span>
    </Link>
  );
}

