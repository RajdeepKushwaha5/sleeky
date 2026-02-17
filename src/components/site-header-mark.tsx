"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function SiteHeaderMark() {
  return (
    <Link
      href="/#overview"
      className="group flex items-center gap-2"
      aria-label="Home"
    >
      <motion.span
        className="relative font-syne text-xl font-extrabold tracking-[-0.03em]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="animate-gradient-x bg-gradient-to-r from-foreground via-foreground/60 to-foreground bg-[length:200%_100%] bg-clip-text text-transparent group-hover:via-primary">
          RJDP
        </span>
        <motion.span
          className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-foreground/60 group-hover:w-full"
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.span>
    </Link>
  );
}
