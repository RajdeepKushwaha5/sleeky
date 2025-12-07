import { Code2 } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before relative mx-auto border-x border-edge pt-8 md:max-w-3xl">
        {/* Architectural grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]" />
        </div>

        {/* Diagonal construction lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, currentColor 30px, currentColor 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, currentColor 30px, currentColor 31px)`,
            }}
          />
        </div>

        {/* Blueprint corner markers */}
        <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-foreground/20" />
        <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-foreground/20" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-foreground/20" />
        <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-foreground/20" />

        {/* Architectural dimension markers */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 opacity-30">
          <div className="h-px w-12 bg-foreground" />
          <div className="h-px w-8 bg-foreground" />
          <div className="h-px w-10 bg-foreground" />
        </div>
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1 opacity-30">
          <div className="h-px w-12 bg-foreground" />
          <div className="h-px w-8 bg-foreground" />
          <div className="h-px w-10 bg-foreground" />
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 px-4 pb-6">
          {/* Blueprint measurement line */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/20 to-foreground/20" />
            <span className="font-mono text-[10px] text-muted-foreground/50">
              SECTION A-A
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-foreground/20 to-foreground/20" />
          </div>

          {/* Tagline with blueprint style */}
          <div className="relative mb-6 flex items-center justify-center gap-2 text-center">
            <div className="absolute top-1/2 -left-2 h-1 w-1 rounded-full bg-foreground/30" />
            <p className="border-b border-dashed border-foreground/10 pb-1 font-mono text-sm text-muted-foreground">
              Passionate about bridging creativity and functionality
            </p>
            <div className="absolute top-1/2 -right-2 h-1 w-1 rounded-full bg-foreground/30" />
          </div>

          {/* Construction/dimension line */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-px w-2 bg-foreground/30" />
            <div className="h-1 w-1 rounded-full bg-foreground/30" />
            <div className="h-px flex-1 bg-foreground/10" />
            <div className="h-1 w-1 rounded-full bg-foreground/30" />
            <div className="h-px w-2 bg-foreground/30" />
          </div>

          {/* Built by */}
          <div className="mb-6 flex items-center justify-center gap-2 text-center">
            <Code2 className="h-4 w-4 text-foreground" />
            <p className="font-mono text-sm text-foreground">
              Crafted by{" "}
              <a
                className="link font-semibold text-foreground transition-colors hover:text-muted-foreground hover:underline"
                href="https://x.com/rajdeeptwts"
                target="_blank"
                rel="noopener"
              >
                Rajdeep Singh
              </a>
            </p>
          </div>

          {/* Blueprint detail line */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-1">
              <div className="h-px w-3 bg-foreground/20" />
              <div className="h-3 w-px bg-foreground/20" />
              <div className="h-px w-3 bg-foreground/20" />
            </div>
          </div>

          {/* Social Links Grid with architectural style */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href="https://github.com/RajdeepKushwaha5"
              target="_blank"
              rel="noopener"
              className="group relative flex items-center gap-2 rounded-none border border-edge bg-card/50 px-4 py-2.5 transition-all hover:border-foreground/30 hover:bg-muted hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-foreground/20" />
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-mono font-medium">GitHub</span>
            </a>

            <a
              href="https://x.com/rajdeeptwts"
              target="_blank"
              rel="noopener"
              className="group relative flex items-center gap-2 rounded-none border border-edge bg-card/50 px-4 py-2.5 transition-all hover:border-foreground/30 hover:bg-muted hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-foreground/20" />
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-mono font-medium">Twitter</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rajdeepsingh5"
              target="_blank"
              rel="noopener"
              className="group relative flex items-center gap-2 rounded-none border border-edge bg-card/50 px-4 py-2.5 transition-all hover:border-foreground/30 hover:bg-muted hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-foreground/20" />
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-mono font-medium">LinkedIn</span>
            </a>

            <a
              href="https://rajdeep01.medium.com/"
              target="_blank"
              rel="noopener"
              className="group relative flex items-center gap-2 rounded-none border border-edge bg-card/50 px-4 py-2.5 transition-all hover:border-foreground/30 hover:bg-muted hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-foreground/20" />
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              <span className="font-mono font-medium">Medium</span>
            </a>
          </div>

          {/* Technical drawing style divider */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex flex-col gap-0.5">
              <div className="h-px w-8 bg-foreground/20" />
              <div className="h-px w-6 bg-foreground/10" />
            </div>
            <div className="font-mono text-[10px] text-muted-foreground/40">
              DETAIL
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="h-px w-8 bg-foreground/20" />
              <div className="h-px w-6 bg-foreground/10" />
            </div>
          </div>

          {/* Copyright with measurement markers */}
          <div className="relative text-center">
            <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 gap-1">
              <div className="h-1 w-1 rounded-full bg-foreground/20" />
              <div className="h-1 w-1 rounded-full bg-foreground/20" />
              <div className="h-1 w-1 rounded-full bg-foreground/20" />
            </div>
            <p className="font-mono text-xs text-muted-foreground/70">
              © {currentYear} Rajdeep Singh. All rights reserved.
            </p>
            <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              <div className="h-1 w-1 rounded-full bg-foreground/20" />
              <div className="h-1 w-1 rounded-full bg-foreground/20" />
              <div className="h-1 w-1 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>

        {/* Blueprint scale notation */}
        <div className="screen-line-before screen-line-after relative flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4 py-2">
            <span className="font-mono text-[10px] text-muted-foreground/40">
              SCALE 1:1
            </span>
            <div className="h-3 w-px bg-foreground/20" />
            <span className="font-mono text-[10px] text-muted-foreground/40">
              REV. {currentYear}
            </span>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
