import { readdir,readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const ICONS_DIR = resolve(process.cwd(), "public/tech-stack-icons");

// List of icons that already have theme variants
const themedIcons = ["nextjs", "chatgpt"];

async function createThemeVariants(filename: string) {
  const filePath = resolve(ICONS_DIR, filename);
  const key = filename.replace(".svg", "");
  
  // Skip if already a themed variant
  if (filename.includes("-light") || filename.includes("-dark")) {
    return;
  }
  
  // Skip if this icon already has theme variants
  if (themedIcons.includes(key)) {
    return;
  }
  
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Create light variant (dark color for light background)
    const lightContent = content.replace(/fill="currentColor"/g, 'fill="#18181b"');
    await writeFile(resolve(ICONS_DIR, `${key}-light.svg`), lightContent);
    
    // Create dark variant (light color for dark background)
    const darkContent = content.replace(/fill="currentColor"/g, 'fill="#fafafa"');
    await writeFile(resolve(ICONS_DIR, `${key}-dark.svg`), darkContent);
    
    console.log(`✓ Created light/dark variants for ${key}`);
  } catch (error) {
    console.error(`✗ Error creating variants for ${filename}:`, error);
  }
}

async function main() {
  console.log("Creating light/dark theme variants for all icons...\n");
  
  const files = await readdir(ICONS_DIR);
  const svgFiles = files.filter(f => f.endsWith('.svg') && !f.includes('-light') && !f.includes('-dark'));
  
  for (const file of svgFiles) {
    await createThemeVariants(file);
  }
  
  console.log("\n✓ All theme variants created!");
}

main();
