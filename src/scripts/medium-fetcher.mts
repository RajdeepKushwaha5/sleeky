#!/usr/bin/env node

console.log('Script starting...');
import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const MEDIUM_USERNAME = 'rajdeep01'; // Replace with your Medium username
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const OUTPUT_DIR = path.join(process.cwd(), 'src/features/blog/data');
const MEDIUM_POSTS_FILE = path.join(OUTPUT_DIR, 'medium-posts.json');

interface RSSItem {
  title?: string;
  link?: string;
  guid?: string;
  author?: string;
  pubDate?: string;
  published?: string;
  updated?: string;
  content?: string;
  'content:encoded'?: string;
  contentSnippet?: string;
  summary?: string;
  categories?: string[];
  creator?: string;
}

interface ProcessedMediumPost {
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

class MediumFetcher {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'content'],
          ['dc:creator', 'creator'],
        ]
      }
    });
  }

  async fetchPosts(): Promise<ProcessedMediumPost[]> {
    try {
      console.log(`Fetching Medium posts from: ${MEDIUM_RSS_URL}`);

      const feed = await this.parser.parseURL(MEDIUM_RSS_URL);

      const posts: ProcessedMediumPost[] = feed.items.map((item: RSSItem) => ({
        id: item.guid || item.link || `medium-${Date.now()}-${Math.random()}`,
        title: item.title || '',
        description: item.contentSnippet || item.summary || '',
        content: item.content || item['content:encoded'] || '',
        url: item.link || '',
        publishedAt: item.pubDate || item.published || '',
        updatedAt: item.updated || item.pubDate,
        tags: item.categories || [],
        author: item.creator || item.author || MEDIUM_USERNAME,
        image: this.extractImageFromContent(item.content || item['content:encoded'] || '')
      }));

      console.log(`Successfully fetched ${posts.length} posts from Medium`);
      return posts;

    } catch (error) {
      console.error('Error fetching Medium posts:', error);
      throw error;
    }
  }

  private extractImageFromContent(content: string): string | undefined {
    // Try to extract the first image from the content
    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = content.match(imgRegex);
    return match ? match[1] : undefined;
  }

  async savePosts(posts: ProcessedMediumPost[]): Promise<void> {
    try {
      // Ensure output directory exists
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      }

      const data = {
        lastUpdated: new Date().toISOString(),
        posts: posts
      };

      fs.writeFileSync(MEDIUM_POSTS_FILE, JSON.stringify(data, null, 2));
      console.log(`Saved ${posts.length} Medium posts to ${MEDIUM_POSTS_FILE}`);

    } catch (error) {
      console.error('Error saving Medium posts:', error);
      throw error;
    }
  }

  async loadExistingPosts(): Promise<ProcessedMediumPost[]> {
    try {
      if (!fs.existsSync(MEDIUM_POSTS_FILE)) {
        return [];
      }

      const data = JSON.parse(fs.readFileSync(MEDIUM_POSTS_FILE, 'utf-8'));
      return data.posts || [];

    } catch (error) {
      console.error('Error loading existing Medium posts:', error);
      return [];
    }
  }

  async syncPosts(): Promise<void> {
    try {
      console.log('Starting Medium posts sync...');

      const [existingPosts, newPosts] = await Promise.all([
        this.loadExistingPosts(),
        this.fetchPosts()
      ]);

      // Create a map of existing posts by ID for quick lookup
      const existingPostsMap = new Map(existingPosts.map(post => [post.id, post]));

      // Merge posts, preferring newer data
      const mergedPosts = newPosts.map(newPost => {
        const existingPost = existingPostsMap.get(newPost.id);
        if (existingPost) {
          // Keep the newer version
          const newDate = new Date(newPost.updatedAt || newPost.publishedAt);
          const existingDate = new Date(existingPost.updatedAt || existingPost.publishedAt);

          return newDate > existingDate ? newPost : existingPost;
        }
        return newPost;
      });

      // Add any existing posts that weren't in the new fetch
      existingPosts.forEach(existingPost => {
        if (!mergedPosts.find(p => p.id === existingPost.id)) {
          mergedPosts.push(existingPost);
        }
      });

      // Sort by published date (newest first)
      mergedPosts.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      await this.savePosts(mergedPosts);
      console.log('Medium posts sync completed successfully!');

    } catch (error) {
      console.error('Error during Medium posts sync:', error);
      throw error;
    }
  }
}

// CLI interface
async function main() {
  console.log('Starting Medium fetcher script...');
  const command = process.argv[2] || 'sync';
  console.log(`Command: ${command}`);

  const fetcher = new MediumFetcher();

  try {
    switch (command) {
      case 'fetch':
        const posts = await fetcher.fetchPosts();
        console.log('Fetched posts:', posts.length);
        break;

      case 'sync':
        await fetcher.syncPosts();
        break;

      case 'save':
        const postsToSave = await fetcher.fetchPosts();
        await fetcher.savePosts(postsToSave);
        break;

      default:
        console.log('Usage: node medium-fetcher.mjs [fetch|sync|save]');
        console.log('  fetch - Fetch posts from Medium RSS');
        console.log('  sync  - Sync posts with existing data (default)');
        console.log('  save  - Fetch and save posts (overwrite existing)');
        process.exit(1);
    }
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  main();
}

export { MediumFetcher, ProcessedMediumPost };