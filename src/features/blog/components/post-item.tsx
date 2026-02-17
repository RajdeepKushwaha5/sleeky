import dayjs from "dayjs";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Post } from "@/features/blog/types/post";
import { cn } from "@/lib/utils";

import { calculateReadingTime, formatReadingTime } from "../lib/reading-time";

export function PostItem({
  post,
  shouldPreloadImage,
  compact = false,
}: {
  post: Post;
  shouldPreloadImage?: boolean;
  compact?: boolean;
}) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch={true}
      className={cn(
        "group/post flex flex-col gap-3 rounded-2xl border border-border/25 bg-card/40 p-4 transition-all duration-300 hover:bg-card",
        compact && "p-3"
      )}
    >
      {post.metadata.image && (
        <div className="relative overflow-hidden rounded-xl transition-all duration-300 select-none">
          <div className="[&_img]:aspect-1200/630 [&_img]:rounded-xl">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={630}
              quality={100}
              priority={shouldPreloadImage}
              unoptimized
              className="grayscale transition-all duration-500 group-hover/post:scale-105 group-hover/post:grayscale-0 dark:grayscale-0"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
        </div>
      )}

      <div className={cn("flex flex-col gap-2", !compact && "px-1")}>
        <h3
          className={cn(
            "font-serif font-medium text-foreground/90 italic transition-colors group-hover/post:text-foreground",
            compact ? "text-base leading-snug" : "text-lg leading-snug"
          )}
        >
          {post.metadata.title}
          {post.metadata.new && (
            <span className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-emerald-500" />
          )}
        </h3>

        <dl
          className={cn(
            "flex items-center gap-3 font-mono text-foreground/40",
            compact ? "text-xs" : "text-xs"
          )}
        >
          <div className="whitespace-nowrap">
            <dt className="sr-only">Published on</dt>
            <dd>
              <time dateTime={dayjs(post.metadata.createdAt).toISOString()}>
                {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
              </time>
            </dd>
          </div>
          <span className="text-foreground/20">•</span>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="size-3" aria-hidden="true" />
            <dt className="sr-only">Reading time</dt>
            <dd>{formatReadingTime(readingTime)}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
