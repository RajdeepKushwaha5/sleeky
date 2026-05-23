import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { PostItem } from "@/features/blog/components/post-item";
import { getAllPosts } from "@/features/blog/data/posts";

import { Panel, PanelHeader, PanelTitle } from "./panel";

export function Blog() {
  const allPosts = getAllPosts();

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>

      <div className="py-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {allPosts.slice(0, 4).map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-1 pb-1">
        <Link href="/blog" className="quiet-action group">
          All posts
          <ArrowRight />
        </Link>
      </div>
    </Panel>
  );
}
