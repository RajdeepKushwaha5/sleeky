import fs from 'fs';
import path from 'path';

export interface MediumPost {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: string;
  image?: string;
}

interface MediumPostsData {
  lastUpdated: string;
  posts: MediumPost[];
}

const MEDIUM_POSTS_FILE = path.join(process.cwd(), 'src/features/blog/data/medium-posts.json');

/**
 * Load Medium posts from the JSON file
 */
export function getMediumPosts(): MediumPost[] {
  try {
    if (!fs.existsSync(MEDIUM_POSTS_FILE)) {
      return [];
    }

    const data: MediumPostsData = JSON.parse(
      fs.readFileSync(MEDIUM_POSTS_FILE, 'utf-8')
    );

    return data.posts || [];
  } catch (error) {
    console.error('Error loading Medium posts:', error);
    return [];
  }
}

/**
 * Get a specific Medium post by ID
 */
export function getMediumPostById(id: string): MediumPost | null {
  const posts = getMediumPosts();
  return posts.find(post => post.id === id) || null;
}

/**
 * Get Medium posts by tag
 */
export function getMediumPostsByTag(tag: string): MediumPost[] {
  const posts = getMediumPosts();
  return posts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get recent Medium posts (default: 5)
 */
export function getRecentMediumPosts(limit: number = 5): MediumPost[] {
  const posts = getMediumPosts();
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

/**
 * Search Medium posts by title or description
 */
export function searchMediumPosts(query: string): MediumPost[] {
  const posts = getMediumPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get Medium posts statistics
 */
export function getMediumPostsStats() {
  const posts = getMediumPosts();

  return {
    total: posts.length,
    tags: [...new Set(posts.flatMap(post => post.tags))],
    authors: [...new Set(posts.map(post => post.author))],
    dateRange: posts.length > 0 ? {
      earliest: posts.reduce((earliest, post) =>
        new Date(post.publishedAt) < new Date(earliest.publishedAt) ? post : earliest
      ).publishedAt,
      latest: posts.reduce((latest, post) =>
        new Date(post.publishedAt) > new Date(latest.publishedAt) ? post : latest
      ).publishedAt
    } : null
  };
}