"use client";

import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { TOP_CONTRIBUTIONS } from "../../data/top-contributions";

const ITEMS = [...TOP_CONTRIBUTIONS].sort((a, b) => b.count - a.count);

export function TopContributions() {
  const [open, setOpen] = useState(false);

  if (ITEMS.length === 0) return null;

  return (
    <div className="mt-4 border-t border-foreground/[0.06] px-2 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-3 py-1"
      >
        <span className="font-mono text-[10px] tracking-wide text-foreground/40 uppercase">
          Top contributions in
        </span>

        <span className="flex items-center gap-2.5">
          {/* Collapsed avatar cluster */}
          <AnimatePresence initial={false}>
            {!open && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center overflow-hidden"
              >
                {ITEMS.slice(0, 3).map((item, i) => (
                  <Image
                    key={item.name}
                    src={item.logo}
                    alt=""
                    width={18}
                    height={18}
                    className={cn(
                      "size-[18px] rounded-full bg-background object-cover ring-1 ring-foreground/10",
                      i > 0 && "-ml-1.5"
                    )}
                    style={{ zIndex: ITEMS.length - i }}
                    unoptimized
                  />
                ))}
              </motion.span>
            )}
          </AnimatePresence>

          <ChevronDownIcon
            className={cn(
              "size-3.5 text-foreground/40 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <ul className="mt-1 space-y-0.5 pb-1">
              {ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <Image
                      src={item.logo}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 rounded-full object-cover ring-1 ring-foreground/10"
                      unoptimized
                    />
                    <span className="text-[13px] text-foreground/75 transition-colors group-hover:text-foreground">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
