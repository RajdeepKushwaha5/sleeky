"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Markdown } from "@/components/markdown";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";

import type { Experience } from "../../types/experiences";

function formatPeriod(period: { start: string; end?: string }): string {
  const fmt = (s: string) => {
    if (!s.includes(".")) return s;
    const [m, y] = s.split(".");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[parseInt(m) - 1]} '${y.slice(2)}`;
  };
  if (!period.end) return `${fmt(period.start)} – now`;
  if (period.start === period.end) return fmt(period.start);
  return `${fmt(period.start)} – ${fmt(period.end)}`;
}

export function ExperienceItem({
  experience,
  dimmed,
}: {
  experience: Experience;
  dimmed?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const position = experience.positions[0];
  if (!position) return null;

  return (
    <div
      className={`transition-opacity duration-300 ${dimmed ? "pointer-events-none opacity-40" : ""}`}
    >
      <button
        type="button"
        className="group -mx-2 flex w-full items-center gap-3 rounded-sm px-2 py-3.5 text-left transition-colors hover:bg-foreground/[0.018]"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen ? "true" : "false"}
      >
        {/* Logo box */}
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-foreground/[0.08] bg-foreground/[0.025]">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={26}
              height={26}
              className="object-contain"
              unoptimized
            />
          ) : (
            <span className="size-2 rounded-full bg-foreground/20" />
          )}
        </div>

        {/* Name + role */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] leading-snug font-medium text-foreground/90">
              {experience.companyName}
            </span>
            {experience.isCurrentEmployer && (
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-info opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-info" />
              </span>
            )}
          </div>
          <span className="mt-0.5 block truncate font-mono text-[11px] text-foreground/38">
            {position.title}
          </span>
        </div>

        {/* Right metadata */}
        <div className="hidden shrink-0 flex-col items-end gap-0.5 sm:flex">
          <span className="font-mono text-[11px] text-foreground/32">
            {formatPeriod(position.employmentPeriod)}
          </span>
          {position.employmentType && (
            <span className="font-mono text-[10px] text-foreground/22">
              {position.employmentType}
            </span>
          )}
        </div>

        {/* Chevron */}
        {position.description && (
          <svg
            viewBox="0 0 10 6"
            className={`size-2.5 shrink-0 text-foreground/20 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M1 1l4 4 4-4" />
          </svg>
        )}
      </button>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-[52px]">
              {position.link && (
                <Link
                  href={position.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 inline-block font-mono text-xs text-info/80 underline underline-offset-4 transition-colors hover:text-info"
                >
                  {position.link.label} ↗
                </Link>
              )}

              {position.description && (
                <Prose className="text-[13px] leading-relaxed [&_p]:text-foreground/60 [&_strong]:text-foreground/80">
                  <Markdown>{position.description}</Markdown>
                </Prose>
              )}

              {position.skills && position.skills.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {position.skills.map((skill, i) => (
                    <li key={i}>
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
