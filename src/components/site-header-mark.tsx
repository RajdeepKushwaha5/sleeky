"use client";

import Link from "next/link";

export function SiteHeaderMark() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="Home">
      <span className="font-space-grotesk text-lg font-bold tracking-[-0.05em] text-foreground transition-all duration-500 ease-out group-hover:tracking-[-0.02em] group-hover:text-foreground/60">
        RJDP
      </span>
    </Link>
  );
}
