import { cache } from "react";
import Parser from "rss-parser";

import { getMediumPosts, type MediumPost } from "../data/medium-posts";

/**
 * Live Medium feed loader.
 *
 * Fetches the author's Medium RSS feed at request time and caches the result
 * with Next.js ISR so the latest posts appear automatically (revalidated every
 * hour) without a manual data update. If the network request fails — e.g.
 * during an offline build — it falls back to the bundled `medium-posts.json`
 * so pages always render.
 */

const MEDIUM_FEED_URL =
  process.env.MEDIUM_FEED_URL || "https://rajdeep01.medium.com/feed";

// Revalidate the feed at most once an hour.
const REVALIDATE_SECONDS = 60 * 60;

type MediumFeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  contentEncoded?: string; // content:encoded — full post HTML
  contentEncodedSnippet?: string; // content:encoded, plain text
  categories?: string[];
  guid?: string;
};

// Medium exposes the full post body under <content:encoded>, which rss-parser
// keeps under its raw (colon) key. Remap it to friendlier field names.
const parser = new Parser<Record<string, unknown>, MediumFeedItem>({
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["content:encodedSnippet", "contentEncodedSnippet"],
    ],
  },
});

/** Strip Medium's RSS tracking query params from a canonical post URL. */
function cleanUrl(url: string): string {
  return url.split("?")[0];
}

/** Pull the first image out of the post HTML, if any. */
function extractImage(html: string): string | undefined {
  const match = /<img[^>]+src=["']([^"']+)["']/i.exec(html);
  return match?.[1];
}

/** Build a short plain-text description from the content snippet. */
function buildDescription(item: MediumFeedItem): string {
  const snippet = (item.contentEncodedSnippet || "")
    .replace(/\s+/g, " ")
    .trim();
  if (snippet.length <= 200) return snippet;
  return `${snippet.slice(0, 197).trimEnd()}…`;
}

function toMediumPost(item: MediumFeedItem): MediumPost {
  const url = cleanUrl(item.link || item.guid || "");
  const content = item.contentEncoded || "";

  return {
    // The guid (e.g. https://medium.com/p/<hash>) is the stable id the rest of
    // the blog system slugifies via its trailing hash.
    id: cleanUrl(item.guid || item.link || url),
    title: (item.title || "Untitled").trim(),
    description: buildDescription(item),
    content,
    url,
    publishedAt: item.pubDate || item.isoDate || new Date().toUTCString(),
    tags: item.categories ?? [],
    author: item.creator || "Rajdeep Singh",
    image: extractImage(content),
  };
}

/**
 * Fetch the live Medium posts (ISR-cached), falling back to bundled JSON.
 * Deduped within a single request via `cache`.
 */
export const getLiveMediumPosts = cache(async (): Promise<MediumPost[]> => {
  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio-blog-fetcher)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Medium feed responded with ${res.status}`);
    }

    const xml = await res.text();
    const feed = await parser.parseString(xml);
    const posts = (feed.items ?? [])
      .map(toMediumPost)
      .filter((post) => post.id && post.title);

    if (posts.length === 0) {
      throw new Error("Medium feed returned no items");
    }

    return posts;
  } catch (error) {
    console.error("Falling back to bundled Medium posts:", error);
    return getMediumPosts();
  }
});
