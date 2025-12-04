import { writeFile } from "fs/promises";
import { resolve } from "path";

const ICONS_DIR = resolve(process.cwd(), "public/tech-stack-icons");

// Missing icons with correct URLs
const missingIcons = [
  { key: "java", url: "https://cdn.simpleicons.org/java" },
  { key: "aws", url: "https://cdn.simpleicons.org/amazonwebservices" },
  { key: "azure", url: "https://cdn.simpleicons.org/microsoftazure" },
];

async function downloadIcon(key: string, url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`✗ Failed to download ${key}: ${response.statusText}`);
      return;
    }
    const svg = await response.text();
    await writeFile(resolve(ICONS_DIR, `${key}.svg`), svg);
    console.log(`✓ Downloaded ${key}`);
  } catch (error) {
    console.error(`✗ Error downloading ${key}:`, error);
  }
}

async function main() {
  console.log("Downloading missing tech stack icons...\n");

  for (const icon of missingIcons) {
    await downloadIcon(icon.key, icon.url);
  }

  console.log("\n✓ Done!");
}

main();
