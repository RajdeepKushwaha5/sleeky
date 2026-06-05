import dayjs from "dayjs";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Post } from "@/features/blog/types/post";
import { cn } from "@/lib/utils";

import { calculateReadingTime, formatReadingTime } from "../lib/reading-time";
import { PostViewCountReadOnly } from "./post-view-count";

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
        "group/post flex flex-col gap-0 border border-foreground/[0.08] bg-foreground/[0.02] transition-colors duration-200 hover:bg-foreground/[0.04]",
        compact && "h-full justify-center"
      )}
    >
      {post.metadata.image && !compact && (
        <div className="relative overflow-hidden select-none">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1200}
            height={630}
            quality={100}
            priority={shouldPreloadImage}
            unoptimized
            className="aspect-[1200/630] w-full object-cover grayscale transition duration-500 group-hover/post:scale-[1.02] group-hover/post:grayscale-0 dark:grayscale-0"
          />
        </div>
      )}

      <div className={cn("flex flex-col gap-2.5 p-4", compact && "py-4")}>
        <h3
          className={cn(
            "font-serif leading-snug font-medium break-words text-foreground/80 italic transition-colors group-hover/post:text-foreground/95",
            compact ? "text-[13.5px]" : "text-[1.05rem]"
          )}
        >
          {post.metadata.title}
          {post.metadata.new && (
            <span className="ml-2 inline-block size-[5px] -translate-y-px rounded-full bg-emerald-500/70" />
          )}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] text-foreground/30">
          <time
            dateTime={dayjs(post.metadata.createdAt).toISOString()}
            className="whitespace-nowrap"
          >
            {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
          </time>
          <span className="text-foreground/15">·</span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="size-2.5 shrink-0" aria-hidden="true" />
            {formatReadingTime(readingTime)}
          </span>
          <span className="text-foreground/15">·</span>
          <div className="whitespace-nowrap">
            <PostViewCountReadOnly slug={post.slug} />
          </div>
        </div>
      </div>
    </Link>
  );
}
