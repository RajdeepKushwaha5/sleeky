import Link from "next/link";

import type { Post } from "@/features/blog/types/post";

import { PostItem } from "./post-item";

interface RelatedPostsProps {
  currentSlug: string;
  posts: Post[];
  maxPosts?: number;
}

/**
 * Get related posts based on category matching
 */
function getRelatedPosts(
  currentSlug: string,
  allPosts: Post[],
  maxPosts: number
): Post[] {
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  const currentCategory = currentPost.metadata.category;

  // Filter posts by same category, excluding current post
  let related = allPosts.filter(
    (p) => p.slug !== currentSlug && p.metadata.category === currentCategory
  );

  // If not enough related posts in same category, add recent posts
  if (related.length < maxPosts) {
    const recentPosts = allPosts.filter(
      (p) => p.slug !== currentSlug && !related.some((r) => r.slug === p.slug)
    );
    related = [...related, ...recentPosts];
  }

  return related.slice(0, maxPosts);
}

export function RelatedPosts({
  currentSlug,
  posts,
  maxPosts = 3,
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug, posts, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-edge pt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Related Posts</h2>
        <Link
          href="/blog"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all posts →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
