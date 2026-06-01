"use client";

import {
  BookOpenIcon,
  HomeIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
  X as CloseIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

/* ── Social icon SVGs ───────────────────────────────────── */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.03.052a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.945 13.945 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function NineDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="7" cy="2" r="1.5" />
      <circle cx="12" cy="2" r="1.5" />
      <circle cx="2" cy="7" r="1.5" />
      <circle cx="7" cy="7" r="1.5" />
      <circle cx="12" cy="7" r="1.5" />
      <circle cx="2" cy="12" r="1.5" />
      <circle cx="7" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

function CalComIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z" />
    </svg>
  );
}

/* ── DockItem ───────────────────────────────────────────── */
function DockItem({
  icon,
  label,
  onClick,
  href,
  active,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  active?: boolean;
  external?: boolean;
}) {
  const inner = (
    <motion.div
      whileHover={{ scale: 1.22, y: -5 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 20 }}
      className={cn(
        "group relative flex size-8 cursor-pointer items-center justify-center rounded-xl transition-colors duration-150 sm:size-9",
        active
          ? "bg-foreground/[0.12] text-foreground"
          : "text-foreground/40 hover:bg-foreground/[0.07] hover:text-foreground/80"
      )}
    >
      {icon}

      {/* Active dot */}
      {active && (
        <span className="absolute -bottom-1 left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-foreground/55" />
      )}

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg border border-foreground/[0.08] bg-background/96 px-2.5 py-1 font-mono text-[9px] tracking-wide whitespace-nowrap text-foreground/65 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-150 group-hover:-translate-y-0.5 group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  );
}

function DockDivider() {
  return <div className="mx-1 h-5 w-px shrink-0 bg-foreground/[0.08]" />;
}

/* ── MorePanel ──────────────────────────────────────────── */
function MorePanel({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  const items = [
    {
      icon: <BookOpenIcon className="size-[15px]" />,
      label: "Blog",
      href: "/blog",
      external: false,
    },
    {
      icon: <MailIcon className="size-[15px]" />,
      label: "Contact",
      href: "/#contact",
      external: false,
    },
    {
      icon: <MediumIcon className="size-[15px]" />,
      label: "Medium",
      href: "https://medium.com/@rajdeep01",
      external: true,
    },
    {
      icon: <DiscordIcon className="size-[15px]" />,
      label: "Discord",
      href: "https://discord.com/users/rajdeepsingh",
      external: true,
    },
    {
      icon: <CalComIcon className="size-[15px]" />,
      label: "Book a Call",
      href: "https://cal.com/rajdeepsingh5",
      external: true,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2"
        >
          <div className="rounded-[16px] bg-gradient-to-b from-foreground/[0.13] to-foreground/[0.05] p-px shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.88)]">
            <div className="w-[9.5rem] rounded-[15px] bg-white/[0.94] p-2 backdrop-blur-2xl dark:bg-[#0c0c0c]/[0.95]">
              <p className="mb-1.5 px-2 font-mono text-[8px] tracking-[0.2em] text-foreground/30 uppercase">
                More
              </p>
              {items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-foreground/50 transition-colors hover:bg-foreground/[0.055] hover:text-foreground/85"
                  >
                    {item.icon}
                    <span className="font-mono text-[10px] tracking-wide">
                      {item.label}
                    </span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-foreground/50 transition-colors hover:bg-foreground/[0.055] hover:text-foreground/85",
                      pathname === item.href && "text-foreground/85"
                    )}
                  >
                    {item.icon}
                    <span className="font-mono text-[10px] tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── BottomDock ─────────────────────────────────────────── */
export function BottomDock() {
  const { setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const pathname = usePathname();
  const playClick = useSound("/audio/ui-sounds/click.wav");
  const [moreOpen, setMoreOpen] = useState(false);

  const switchTheme = useCallback(
    (theme: "light" | "dark") => {
      setTheme(theme);
      setMetaColor(
        theme === "light" ? META_THEME_COLORS.light : META_THEME_COLORS.dark
      );
    },
    [setTheme, setMetaColor]
  );

  const toggleTheme = useCallback(
    (e: React.MouseEvent, theme: "light" | "dark") => {
      playClick?.();
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      if (!document.startViewTransition) {
        switchTheme(theme);
        return;
      }

      document.documentElement.style.setProperty(
        "--theme-transition-x",
        `${x}px`
      );
      document.documentElement.style.setProperty(
        "--theme-transition-y",
        `${y}px`
      );
      document.documentElement.style.setProperty(
        "--theme-transition-radius",
        `${endRadius}px`
      );

      const t = document.startViewTransition(() => switchTheme(theme));
      t.ready.then(() =>
        document.documentElement.classList.add("theme-transitioning")
      );
      t.finished.then(() =>
        document.documentElement.classList.remove("theme-transitioning")
      );
    },
    [playClick, switchTheme]
  );

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-[env(safe-area-inset-bottom,0px)] sm:bottom-5">
      {/* More panel — mobile only, floats above dock */}
      <div className="relative sm:hidden">
        <MorePanel
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          pathname={pathname}
        />
      </div>

      <motion.div
        initial={{ y: 24, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.55,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.15,
        }}
      >
        {/* Gradient-border wrapper */}
        <div className="rounded-[20px] bg-gradient-to-b from-foreground/[0.13] to-foreground/[0.05] p-px shadow-[0_28px_70px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.9),0_0_0_0.5px_rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-0.5 rounded-[19px] bg-white/[0.92] px-2 py-1.5 backdrop-blur-2xl sm:px-2.5 sm:py-2 dark:bg-[#0c0c0c]/[0.93]">
            {/* ── Nav ── */}
            <DockItem
              icon={<HomeIcon className="size-[17px]" />}
              label="Home"
              href="/"
              active={pathname === "/"}
            />
            {/* Blog + Mail hidden on mobile — accessible via More panel */}
            <span className="hidden sm:contents">
              <DockItem
                icon={<BookOpenIcon className="size-[17px]" />}
                label="Blog"
                href="/blog"
                active={pathname?.startsWith("/blog")}
              />
              <DockItem
                icon={<MailIcon className="size-[17px]" />}
                label="Contact"
                href="/#contact"
              />
            </span>

            <DockDivider />

            {/* ── Socials ── */}
            <DockItem
              icon={<GitHubIcon className="size-[17px]" />}
              label="GitHub"
              href="https://github.com/RajdeepKushwaha5"
              external
            />
            <DockItem
              icon={<LinkedInIcon className="size-[15px]" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/rajdeepsingh5/"
              external
            />
            <DockItem
              icon={<XIcon className="size-[15px]" />}
              label="X / Twitter"
              href="https://x.com/rajdeeptwts"
              external
            />
            <span className="hidden sm:contents">
              <DockItem
                icon={<MediumIcon className="size-[16px]" />}
                label="Medium"
                href="https://medium.com/@rajdeep01"
                external
              />
              <DockItem
                icon={<DiscordIcon className="size-[16px]" />}
                label="Discord"
                href="https://discord.com/users/rajdeepsingh"
                external
              />
              <DockItem
                icon={<CalComIcon className="size-[16px]" />}
                label="Book a Call"
                href="https://cal.com/rajdeepsingh5"
                external
              />
            </span>

            <DockDivider />

            {/* ── Theme ── */}
            <DockItem
              icon={<SunIcon className="size-[17px]" />}
              label="Light"
              onClick={(e) => toggleTheme(e, "light")}
            />
            <DockItem
              icon={<MoonIcon className="size-[17px]" />}
              label="Dark"
              onClick={(e) => toggleTheme(e, "dark")}
            />

            {/* ── More (mobile only) ── */}
            <span className="contents sm:hidden">
              <DockDivider />
              <motion.button
                type="button"
                whileHover={{ scale: 1.18, y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                aria-label="More options"
                onClick={() => setMoreOpen((v) => !v)}
                className={cn(
                  "group relative flex size-8 cursor-pointer items-center justify-center rounded-xl transition-colors duration-150",
                  moreOpen
                    ? "bg-foreground/[0.12] text-foreground"
                    : "text-foreground/40 hover:bg-foreground/[0.07] hover:text-foreground/80"
                )}
              >
                {moreOpen ? (
                  <CloseIcon className="size-[14px]" />
                ) : (
                  <NineDotsIcon className="size-[17px]" />
                )}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg border border-foreground/[0.08] bg-background/96 px-2.5 py-1 font-mono text-[9px] tracking-wide whitespace-nowrap text-foreground/65 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-150 group-hover:-translate-y-0.5 group-hover:opacity-100">
                  {moreOpen ? "Close" : "More"}
                </span>
              </motion.button>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
