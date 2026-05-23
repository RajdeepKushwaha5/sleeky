"use client";

import type { LucideProps } from "lucide-react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function IntroItem({
  icon: Icon,
  content,
  href,
  copyValue,
}: {
  icon: React.ComponentType<LucideProps>;
  content: React.ReactNode;
  href?: string;
  copyValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex items-center gap-3 py-0.5 font-mono text-[12.5px] text-foreground/55">
      <Icon className="size-3.5 shrink-0 text-foreground/28" aria-hidden />

      <span className="text-balance">
        {href ? (
          <a
            className="underline-offset-4 hover:text-foreground/80 hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </span>

      {copyValue && (
        <button
          onClick={handleCopy}
          className="ml-auto flex size-5 shrink-0 items-center justify-center text-foreground/28 transition-colors hover:text-foreground/60"
          title={copied ? "Copied!" : "Copy"}
          aria-label={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <CheckIcon className="size-3 text-emerald-500/70" />
          ) : (
            <CopyIcon className="size-3" />
          )}
        </button>
      )}
    </div>
  );
}
