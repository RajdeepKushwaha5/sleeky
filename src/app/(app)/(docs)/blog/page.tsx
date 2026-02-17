import type { Metadata } from "next";

import { PostItem } from "@/features/blog/components/post-item";
import { getAllPosts } from "@/features/blog/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "A collection of articles on development, design, and ideas.",
};

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <>
      {/* Header */}
      <div className="mb-8 space-y-4 px-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/25 bg-card/30 px-3 py-1 text-xs font-medium text-foreground/60">
          <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
          Articles
        </div>
        <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="max-w-2xl font-mono text-sm text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <div className="relative pt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allPosts.map((post, index) => (
            <PostItem
              key={post.slug}
              post={post}
              shouldPreloadImage={index <= 4}
            />
          ))}
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
