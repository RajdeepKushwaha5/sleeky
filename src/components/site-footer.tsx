"use client";

import { ArrowUpRight, CheckIcon, CopyIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { USER } from "@/features/profile/data/user";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("rajdeepsingh10789@gmail.com");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = "rajdeepsingh10789@gmail.com";
      Object.assign(ta.style, { position: "fixed", opacity: "0" });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative overflow-hidden bg-background px-6 pt-16 pb-16 text-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/[0.08]" />
      <div className="absolute inset-x-0 top-0 h-8 bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--foreground)_6%,transparent),color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px,transparent_10px)]" />

      <div className="mx-auto max-w-3xl">
        {/* ── Name + subtitle + copyright ── */}
        <div className="flex flex-col gap-8 border-b border-foreground/[0.08] pb-12 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: big serif name */}
          <div>
            <h2 className="font-serif text-[2.6rem] leading-[1] font-medium tracking-tight text-foreground sm:text-[3.2rem]">
              {USER.firstName}
              <br />
              {USER.lastName}
              <sup className="ml-1 align-super font-mono text-[0.16em] text-foreground/30 not-italic">
                io
              </sup>
            </h2>
            <p className="mt-3 font-mono text-[10px] tracking-[0.12em] text-foreground/40 uppercase">
              Full Stack Developer &amp; AI Engineer
            </p>
          </div>

          {/* Right: copyright + link */}
          <div className="sm:text-right">
            <p className="font-mono text-[10px] tracking-wider text-foreground/35 uppercase">
              © Copyright
            </p>
            <div className="mt-2 flex items-center gap-4 font-mono text-[11px] text-foreground/48 sm:justify-end">
              <span>{year}</span>
              <Link
                href={USER.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                {USER.website.replace(/^https?:\/\//, "")}
                <ArrowUpRight className="size-3 opacity-50" />
              </Link>
            </div>
            {/* Email copy */}
            <button
              type="button"
              onClick={copyEmail}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] text-foreground/38 transition-colors hover:text-foreground/70"
            >
              {copied ? (
                <CheckIcon className="size-3 text-foreground/70" />
              ) : (
                <CopyIcon className="size-3" />
              )}
              rajdeepsingh10789@gmail.com
            </button>
          </div>
        </div>

        {/* ── Bottom rule ── */}
        <div className="mt-10 flex items-center justify-between border-t border-foreground/[0.08] pt-6">
          <span className="font-mono text-[9px] tracking-widest text-foreground/28 uppercase">
            RJDP-{year}
          </span>
          <span className="font-mono text-[9px] text-foreground/28">
            Built with Next.js &amp; Tailwind
          </span>
        </div>
      </div>

      <div className="pb-28" />
    </footer>
  );
}
