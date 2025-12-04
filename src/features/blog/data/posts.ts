import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { Post, PostMetadata } from "@/features/blog/types/post";

import { getMediumPosts, type MediumPost } from "./medium-posts";

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as PostMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  // Return empty array if directory doesn't exist (e.g., when using only Medium posts)
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map<Post>((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));

    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

/**
 * Convert Medium posts to Post format for unified blog system
 */
function convertMediumPostsToPosts(mediumPosts: MediumPost[]): Post[] {
  return mediumPosts.map((mediumPost) => {
    // Parse RFC 2822 date format to Date object, then format as YYYY-MM-DD
    const parseDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    };

    // Create a URL-safe slug by encoding the Medium post ID
    const createSlug = (id: string) => {
      // Extract the post ID from the URL and make it URL-safe
      const postId = id.split("/").pop() || id;
      return `medium-${postId}`;
    };

    return {
      metadata: {
        title: mediumPost.title,
        description: mediumPost.description,
        image: mediumPost.image,
        category: "medium", // Special category for Medium posts
        icon: "ExternalLink", // Use external link icon
        new: false,
        pinned: false,
        createdAt: parseDate(mediumPost.publishedAt), // Convert to YYYY-MM-DD format
        updatedAt: mediumPost.updatedAt
          ? parseDate(mediumPost.updatedAt)
          : parseDate(mediumPost.publishedAt),
      } as PostMetadata,
      slug: createSlug(mediumPost.id), // Create URL-safe slug
      content: mediumPost.content,
      // Add Medium-specific metadata
      mediumUrl: mediumPost.url,
      mediumTags: mediumPost.tags,
      mediumAuthor: mediumPost.author,
    };
  }) as Post[];
}

export function getAllPosts() {
  const mdxPosts = getMDXData(
    path.join(process.cwd(), "src/features/blog/content")
  );
  const mediumPosts = convertMediumPostsToPosts(getMediumPosts());

  // Combine and sort all posts
  const allPosts = [...mdxPosts, ...mediumPosts].sort((a, b) => {
    if (a.metadata.pinned && !b.metadata.pinned) return -1;
    if (!a.metadata.pinned && b.metadata.pinned) return 1;

    return (
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime()
    );
  });

  return allPosts;
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.metadata?.category === category);
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      return {
        previous: i > 0 ? posts[i - 1] : null,
        next: i < len - 1 ? posts[i + 1] : null,
      };
    }
  }

  return { previous: null, next: null };
}
