"use client";

import { useEffect, useState } from "react";

import { USER } from "@/features/profile/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

function useISTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(ist);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function ProfileHeader() {
  const istTime = useISTClock();

  return (
    <div
      suppressHydrationWarning
      className="relative mx-2 mt-4 flex items-center gap-3 border-b border-foreground/[0.055] pt-1 pb-4"
    >
      {/* Flip sentences */}
      <div className="flex-1 font-mono text-[10px] text-foreground/45">
        <FlipSentences sentences={USER.flipSentences} />
      </div>

      {/* IST clock */}
      {istTime && (
        <span className="hidden shrink-0 font-mono text-[9px] text-foreground/28 tabular-nums sm:block">
          {istTime} IST
        </span>
      )}
    </div>
  );
}
