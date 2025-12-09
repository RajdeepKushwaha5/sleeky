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
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-4 font-mono text-sm">
      <div
        className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
        aria-hidden
      >
        <Icon className="pointer-events-none size-4 text-muted-foreground" />
      </div>

      <p className="text-balance">
        {href ? (
          <a
            className="underline-offset-4 hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </p>

      {copyValue && (
        <button
          onClick={handleCopy}
          className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title={copied ? "Copied!" : "Copy to clipboard"}
          aria-label={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-green-500" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
      )}
    </div>
  );
}
