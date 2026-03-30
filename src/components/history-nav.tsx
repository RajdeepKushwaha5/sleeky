"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export function HistoryNav({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <button
        onClick={() => router.back()}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
        aria-label="Go back"
        type="button"
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        onClick={() => router.forward()}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
        aria-label="Go forward"
        type="button"
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
}
