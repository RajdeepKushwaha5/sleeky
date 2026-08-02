"use client";

import { RotateCcwIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────
 * Custom Theme — a live editor for the site's neutral ramp.
 * Each role maps to an HSL lightness (0–100, pure grayscale) and
 * is applied as an inline CSS-variable override on <html>, so the
 * whole monochrome UI responds instantly. Persisted per theme.
 * ────────────────────────────────────────────────────────── */

type ThemeKey = "light" | "dark";

type RoleKey =
  | "background"
  | "surface"
  | "muted"
  | "border"
  | "edge"
  | "subtle"
  | "text";

type Values = Record<RoleKey, number>;

const ROLES: { key: RoleKey; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "muted", label: "Muted" },
  { key: "border", label: "Border" },
  { key: "edge", label: "Edge" },
  { key: "subtle", label: "Subtle Text" },
  { key: "text", label: "Text" },
];

const DEFAULTS: Record<ThemeKey, Values> = {
  light: {
    background: 99,
    surface: 98,
    muted: 96,
    border: 91,
    edge: 96,
    subtle: 45,
    text: 12,
  },
  dark: {
    background: 0,
    surface: 3,
    muted: 7,
    border: 13,
    edge: 9,
    subtle: 60,
    text: 96,
  },
};

/* Every CSS variable each role drives. */
const TOKEN_MAP: Record<RoleKey, string[]> = {
  background: [
    "--background",
    "--primary-foreground",
    "--selection-foreground",
  ],
  surface: ["--card", "--popover"],
  muted: ["--muted", "--secondary", "--accent", "--code", "--code-highlight"],
  border: ["--border", "--input"],
  edge: ["--edge"],
  subtle: ["--muted-foreground", "--code-number", "--ring"],
  text: [
    "--foreground",
    "--primary",
    "--selection",
    "--card-foreground",
    "--popover-foreground",
    "--secondary-foreground",
    "--accent-foreground",
  ],
};

const ALL_TOKENS = Object.values(TOKEN_MAP).flat();

const gray = (l: number) => `hsl(0 0% ${l}%)`;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const storageKey = (theme: ThemeKey) => `custom-theme:${theme}`;

function applyValues(values: Values) {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  for (const role of ROLES) {
    for (const token of TOKEN_MAP[role.key]) {
      style.setProperty(token, gray(values[role.key]));
    }
  }
  // `.dark body { background: #000 }` in globals.css beats the CSS variable,
  // so set the page background inline (inline styles win) to keep both themes
  // in sync with the customized Background role.
  document.body.style.setProperty("background", gray(values.background));
}

function clearOverrides() {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  for (const token of ALL_TOKENS) style.removeProperty(token);
  document.body.style.removeProperty("background");
}

function readStored(theme: ThemeKey): Values | null {
  try {
    const raw = localStorage.getItem(storageKey(theme));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Values>;
    return { ...DEFAULTS[theme], ...parsed };
  } catch {
    return null;
  }
}

/* ── Hook — owns state, persistence, and live application ─── */
export function useCustomTheme() {
  const { resolvedTheme } = useTheme();
  const theme: ThemeKey = resolvedTheme === "light" ? "light" : "dark";

  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState<Values>(DEFAULTS.dark);
  const [customized, setCustomized] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Load + apply whenever the active theme changes. Syncing external state
  // (localStorage + the DOM) into React on mount/theme-change is the intended
  // use of this effect, so the set-state-in-effect rule is disabled here.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!mounted) return;
    const stored = readStored(theme);
    if (stored) {
      setValues(stored);
      setCustomized(true);
      applyValues(stored);
    } else {
      setValues(DEFAULTS[theme]);
      setCustomized(false);
      clearOverrides();
    }
  }, [mounted, theme]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setValue = useCallback(
    (key: RoleKey, next: number) => {
      setValues((prev) => {
        const updated = { ...prev, [key]: clamp(next) };
        applyValues(updated);
        try {
          localStorage.setItem(storageKey(theme), JSON.stringify(updated));
        } catch {
          /* ignore quota / private-mode errors */
        }
        return updated;
      });
      setCustomized(true);
    },
    [theme]
  );

  const reset = useCallback(() => {
    clearOverrides();
    try {
      localStorage.removeItem(storageKey(theme));
    } catch {
      /* ignore */
    }
    setValues(DEFAULTS[theme]);
    setCustomized(false);
  }, [theme]);

  return { values, theme, mounted, customized, setValue, reset };
}

/* ── Panel ─────────────────────────────────────────────────── */
export function CustomThemePanel({
  open,
  onClose,
  values,
  theme,
  customized,
  setValue,
  reset,
}: {
  open: boolean;
  onClose: () => void;
  values: Values;
  theme: ThemeKey;
  customized: boolean;
  setValue: (key: RoleKey, next: number) => void;
  reset: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (panelRef.current?.contains(target)) return;
      if (target.closest("[data-ct-trigger]")) return; // let the trigger toggle
      onClose();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  const defaults = DEFAULTS[theme];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2"
          role="dialog"
          aria-label="Custom theme"
        >
          <div className="w-[268px] rounded-[18px] bg-gradient-to-b from-foreground/[0.14] to-foreground/[0.05] p-px shadow-[0_24px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.9)]">
            <div className="overflow-hidden rounded-[17px] bg-white/[0.97] backdrop-blur-2xl dark:bg-[#0b0b0b]/[0.97]">
              {/* Hatched header */}
              <div
                className="h-8 border-b border-foreground/[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, color-mix(in oklab, var(--foreground) 14%, transparent) 0 1px, transparent 1px 7px)",
                }}
              />

              <div className="p-4">
                <h3 className="font-serif text-[15px] font-medium text-foreground/90">
                  Custom Theme
                </h3>
                <p className="mt-1 text-[12px] leading-snug text-foreground/45">
                  You&apos;re a design engineer, why not customize the UI.
                </p>

                {/* Column header */}
                <div className="mt-4 mb-1.5 flex items-center justify-between px-0.5">
                  <span className="font-mono text-[10px] tracking-wide text-foreground/35 uppercase">
                    Color · Var
                  </span>
                  <span className="font-mono text-[10px] tracking-wide text-foreground/35 uppercase">
                    HSL
                  </span>
                </div>

                <div className="space-y-1">
                  {ROLES.map((role) => {
                    const value = values[role.key];
                    const changed = value !== defaults[role.key];
                    return (
                      <div
                        key={role.key}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="size-4 shrink-0 rounded-full ring-1 ring-foreground/15"
                            style={{ background: gray(value) }}
                          />
                          <span className="font-mono text-[12px] text-foreground/70">
                            {role.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={value}
                            aria-label={`${role.label} lightness`}
                            onChange={(e) =>
                              setValue(role.key, Number(e.target.value))
                            }
                            className="w-14 rounded-md border border-foreground/12 bg-foreground/[0.03] px-2 py-1 text-center font-mono text-[12px] text-foreground/80 tabular-nums outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10"
                          />
                          <span
                            className={cn(
                              "size-1.5 rounded-full transition-colors",
                              changed ? "bg-foreground/50" : "bg-transparent"
                            )}
                            aria-hidden
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={reset}
                  disabled={!customized}
                  className={cn(
                    "mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[12px] transition-colors",
                    customized
                      ? "cursor-pointer border-foreground/12 text-foreground/65 hover:bg-foreground/[0.05] hover:text-foreground/90"
                      : "cursor-not-allowed border-foreground/8 text-foreground/25"
                  )}
                >
                  <RotateCcwIcon className="size-3.5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
