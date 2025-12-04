import { readdir,readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const ICONS_DIR = resolve(process.cwd(), "public/tech-stack-icons");

async function updateIconToCurrentColor(filename: string) {
  const filePath = resolve(ICONS_DIR, filename);
  
  try {
    let content = await readFile(filePath, "utf-8");
    const originalContent = content;
    
    // Replace common fill patterns with currentColor
    content = content.replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"');
    content = content.replace(/fill='#[0-9A-Fa-f]{3,6}'/g, "fill='currentColor'");
    content = content.replace(/fill="black"/g, 'fill="currentColor"');
    content = content.replace(/fill="white"/g, 'fill="currentColor"');
    content = content.replace(/fill='black'/g, "fill='currentColor'");
    content = content.replace(/fill='white'/g, "fill='currentColor'");
    
    if (content !== originalContent) {
      await writeFile(filePath, content);
      console.log(`✓ Updated ${filename}`);
      return true;
    } else {
      console.log(`- Skipped ${filename} (no changes needed)`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filename}:`, error);
    return false;
  }
}

async function main() {
  console.log("Updating SVG icons to use currentColor...\n");
  
  const files = await readdir(ICONS_DIR);
  const svgFiles = files.filter(f => f.endsWith('.svg'));
  
  let updated = 0;
  for (const file of svgFiles) {
    const wasUpdated = await updateIconToCurrentColor(file);
    if (wasUpdated) updated++;
  }
  
  console.log(`\n✓ Updated ${updated} icons to use currentColor!`);
  console.log("Icons will now adapt to light/dark mode automatically.");
}

main();
