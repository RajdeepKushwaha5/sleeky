import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allPosts.slice(0, 4).map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-2 pb-1">
        <Button
          variant="outline"
          className="rounded-full border-border/25 px-6 text-[13px] font-medium tracking-wide transition-all duration-300 hover:border-border/40 hover:bg-foreground/[0.04]"
          asChild
        >
          <Link href="/blog">
            All Posts
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
