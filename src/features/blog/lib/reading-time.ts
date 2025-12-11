/**
 * Calculate estimated reading time for a given text content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  // Remove HTML tags and extra whitespace
  const plainText = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Count words
  const wordCount = plainText
    .split(" ")
    .filter((word) => word.length > 0).length;

  // Calculate reading time and round up to at least 1 minute
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readingTime);
}

/**
 * Format reading time as a human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
