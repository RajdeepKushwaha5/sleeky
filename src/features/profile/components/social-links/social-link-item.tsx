"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import type { SocialLink } from "@/features/profile/types/social-links";
import { cn } from "@/lib/utils";

export function SocialLinkItem({ icon, title, description, href }: SocialLink) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      className={cn(
        "group/link flex cursor-pointer items-center gap-4 rounded-2xl border border-border/18 bg-background/64 p-4 pr-3 shadow-[0_10px_34px_rgba(0,0,0,0.045),0_1px_0_rgba(255,255,255,0.32)_inset] grayscale transition-colors duration-500 select-none hover:border-border/32 hover:bg-background/88 hover:grayscale-0 dark:bg-card/56 dark:shadow-[0_12px_44px_rgba(0,0,0,0.24),0_1px_0_rgba(255,255,255,0.04)_inset] dark:grayscale-0 dark:hover:bg-card/86"
      )}
      href={href}
      target="_blank"
      rel="noopener"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="relative size-12 shrink-0"
        whileHover={{ rotate: [0, -8, 8, -4, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Image
          className="rounded-xl"
          src={icon}
          alt={title}
          width={48}
          height={48}
          quality={100}
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
      </motion.div>

      <div className="flex-1">
        <h3 className="flex items-center font-[family-name:var(--font-syne)] font-semibold tracking-normal text-foreground/86 transition-colors group-hover/link:text-foreground">
          {title}
        </h3>

        {description && (
          <p className="font-[family-name:var(--font-outfit)] text-sm tracking-normal text-muted-foreground/72">
            {description}
          </p>
        )}
      </div>

      <motion.div
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: 2, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <ArrowUpRightIcon className="size-4 text-muted-foreground transition-colors duration-300 group-hover/link:text-foreground" />
      </motion.div>
    </motion.a>
  );
}
