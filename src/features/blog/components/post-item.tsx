import dayjs from "dayjs";
import { Clock, MoveUpRight, PinIcon } from "lucide-react";
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
        "group/post flex flex-col gap-2",
        compact
          ? "overflow-hidden rounded-lg border border-edge/50 bg-card/30 p-3 transition-colors hover:bg-card/60"
          : [
              "p-3 sm:p-2",
              "max-sm:screen-line-before max-sm:screen-line-after",
              "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after",
            ]
      )}
    >
      {post.metadata.image && (
        <div className="relative overflow-hidden rounded-xl transition-shadow duration-300 select-none group-hover/post:shadow-lg">
          <div className="[&_img]:aspect-1200/630 [&_img]:rounded-xl">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={630}
              quality={100}
              priority={shouldPreloadImage}
              unoptimized
              className="grayscale transition-all duration-500 group-hover/post:scale-105 group-hover/post:grayscale-0"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />

          {/* Hover overlay with read button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/post:opacity-100">
            <div className="flex h-16 w-16 scale-75 transform items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 group-hover/post:scale-100">
              <MoveUpRight className="h-8 w-8 text-black" />
            </div>
          </div>

          {/* {post.metadata.new && (
            <span className="absolute top-1.5 right-1.5 rounded-md bg-info px-1.5 font-mono text-sm font-medium text-white text-shadow-xs">
              New
            </span>
          )} */}

          {post.metadata.pinned && (
            <span className="absolute top-1.5 right-1.5 z-10 flex size-6 items-center justify-center rounded-md bg-info">
              <PinIcon className="size-4 rotate-45 text-white" />
            </span>
          )}
        </div>
      )}

      <div className={cn("flex flex-col gap-1", !compact && "p-2")}>
        <h3
          className={cn(
            "font-medium text-balance underline-offset-4 group-hover/post:underline",
            compact ? "text-base leading-snug" : "text-lg leading-snug"
          )}
        >
          {post.metadata.title}
          {post.metadata.new && (
            <span className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-info" />
          )}
        </h3>

        <dl
          className={cn(
            "flex items-center gap-2 text-muted-foreground",
            compact ? "text-xs" : "flex-nowrap gap-3 text-sm"
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
          <span className="text-muted-foreground/50">•</span>
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
