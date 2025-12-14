"use client";

import { FileText, Mail, Phone } from "lucide-react";
import { useState } from "react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const [emailTooltip, setEmailTooltip] = useState("Click to copy email");
  const [phoneTooltip, setPhoneTooltip] = useState("Click to copy phone");
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // Fallback copy function for mobile devices
  const fallbackCopyText = (text: string): boolean => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success = false;
    try {
      success = document.execCommand("copy");
    } catch {
      success = false;
    }

    document.body.removeChild(textArea);
    return success;
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback for mobile and older browsers
    return fallbackCopyText(text);
  };

  const copyEmail = async () => {
    const success = await copyToClipboard("rajdeepsingh10789@gmail.com");
    setEmailTooltip(success ? "Copied!" : "Failed to copy");
    setEmailCopied(success);
    setTimeout(() => {
      setEmailTooltip("Click to copy email");
      setEmailCopied(false);
    }, 2000);
  };

  const copyPhone = async () => {
    const success = await copyToClipboard("+91 7073526113");
    setPhoneTooltip(success ? "Copied!" : "Failed to copy");
    setPhoneCopied(success);
    setTimeout(() => {
      setPhoneTooltip("Click to copy phone");
      setPhoneCopied(false);
    }, 2000);
  };

  return (
    <footer className="max-w-screen overflow-x-hidden px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Main Footer Card */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Side - Copyright and Tagline */}
          <div className="space-y-1">
            <p className="font-mono text-sm text-foreground/70">
              © {currentYear} Rajdeep Singh. All rights reserved.
            </p>
            <p className="text-sm text-foreground/40">
              Made with focus, endless iterations, and lots of coke.
            </p>
          </div>

          {/* Right Side - Social Buttons */}
          <div className="flex items-center gap-2">
            {/* Gmail - Copy functionality */}
            <button
              onClick={copyEmail}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-95 ${
                emailCopied
                  ? "border-green-500 bg-green-500/20"
                  : "border-border bg-card/60 hover:bg-foreground/10 active:bg-foreground/20"
              }`}
              title={emailTooltip}
            >
              {emailCopied ? (
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <Mail className="h-4 w-4 text-foreground/60 group-hover:text-foreground" />
              )}
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-xs whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
                {emailTooltip}
              </span>
            </button>

            {/* Phone - Copy functionality */}
            <button
              onClick={copyPhone}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-95 ${
                phoneCopied
                  ? "border-green-500 bg-green-500/20"
                  : "border-border bg-card/60 hover:bg-foreground/10 active:bg-foreground/20"
              }`}
              title={phoneTooltip}
            >
              {phoneCopied ? (
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <Phone className="h-4 w-4 text-foreground/60 group-hover:text-foreground" />
              )}
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-xs whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
                {phoneTooltip}
              </span>
            </button>

            {/* CV - Drive Link */}
            <a
              href="https://drive.google.com/file/d/1dWRhT2GSx4StZk2kqGU2UpJLNZCVnuoA/view"
              target="_blank"
              rel="noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 transition-all hover:bg-foreground/10"
              title="Resume"
            >
              <FileText className="h-4 w-4 text-foreground/60" />
            </a>

            {/* Divider */}
            <div className="mx-1 h-6 w-px bg-border" />

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/rajdeepsingh5"
              target="_blank"
              rel="noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 transition-all hover:bg-foreground/10"
              title="LinkedIn"
            >
              <svg
                className="h-4 w-4 text-foreground/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/rajdeeptwts"
              target="_blank"
              rel="noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 transition-all hover:bg-foreground/10"
              title="X"
            >
              <svg
                className="h-4 w-4 text-foreground/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/RajdeepKushwaha5"
              target="_blank"
              rel="noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 transition-all hover:bg-foreground/10"
              title="GitHub"
            >
              <svg
                className="h-4 w-4 text-foreground/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Medium */}
            <a
              href="https://rajdeep01.medium.com/"
              target="_blank"
              rel="noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 transition-all hover:bg-foreground/10"
              title="Medium"
            >
              <svg
                className="h-4 w-4 text-foreground/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
