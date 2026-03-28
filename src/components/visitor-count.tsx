"use client";

import { UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";

const VID_KEY = "sleeky_vid";

/** Module-level guard so React strict-mode double-mount doesn't fire twice. */
let posted = false;

function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(VID_KEY);
    if (existing) return existing;
  } catch {}
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const id = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  try {
    localStorage.setItem(VID_KEY, id);
  } catch {}
  return id;
}

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (posted) {
      // Already tracked this session — just read.
      fetch("/api/visitors")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.count != null) setCount(data.count);
        })
        .catch(() => {});
      return;
    }
    posted = true;

    const visitorId = getOrCreateVisitorId();
    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.count != null) setCount(data.count);
      })
      .catch(() => {});
  }, []);

  if (count == null) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
      <UsersIcon className="h-3.5 w-3.5 text-primary/70" />
      <span className="font-outfit text-foreground/50">
        You are visitor{" "}
        <span className="font-semibold text-foreground tabular-nums">
          #{count.toLocaleString()}
        </span>
      </span>
    </div>
  );
}
