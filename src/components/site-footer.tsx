import { Code2 } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-8 md:max-w-3xl">
        {/* Main Footer Content */}
        <div className="px-4 pb-6">
          {/* Tagline */}
          <div className="mb-6 flex items-center justify-center gap-2 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              Passionate about bridging creativity and functionality
            </p>
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

          {/* Social Links Grid */}
          <div className="mb-6 flex items-center justify-center gap-4 text-sm">
            <a
              href="https://github.com/RajdeepKushwaha5"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2 rounded-lg border border-edge bg-card/50 px-4 py-2 transition-all hover:border-foreground/30 hover:bg-muted"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium">
                GitHub
              </span>
            </a>

            <a
              href="https://x.com/rajdeeptwts"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2 rounded-lg border border-edge bg-card/50 px-4 py-2 transition-all hover:border-foreground/30 hover:bg-muted"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-medium">
                Twitter
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/rajdeepsingh5"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2 rounded-lg border border-edge bg-card/50 px-4 py-2 transition-all hover:border-foreground/30 hover:bg-muted"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medium">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="font-mono text-xs text-muted-foreground/70">
              © {currentYear} Rajdeep Singh. All rights reserved.
            </p>
          </div>
        </div>

        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4 py-2"></div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
