import { writeFile } from "fs/promises";
import { resolve } from "path";

/**
 * Download tech stack icons from various sources
 * Using simple-icons SVG data or CDN sources
 */

interface TechIcon {
  key: string;
  url?: string;
  theme?: boolean;
}

const ICONS_DIR = resolve(process.cwd(), "public/tech-stack-icons");

// List of all tech icons needed based on tech-stack.ts
const techIcons: TechIcon[] = [
  { key: "typescript", url: "https://cdn.simpleicons.org/typescript" },
  { key: "javascript", url: "https://cdn.simpleicons.org/javascript" },
  { key: "python", url: "https://cdn.simpleicons.org/python" },
  { key: "cpp", url: "https://cdn.simpleicons.org/cplusplus" },
  { key: "java", url: "https://cdn.simpleicons.org/oracle" },
  { key: "rust", url: "https://cdn.simpleicons.org/rust" },
  { key: "solidity", url: "https://cdn.simpleicons.org/solidity" },
  { key: "react", url: "https://cdn.simpleicons.org/react" },
  { key: "nextjs", theme: true },
  { key: "nodejs", url: "https://cdn.simpleicons.org/nodedotjs" },
  { key: "expressjs", url: "https://cdn.simpleicons.org/express" },
  { key: "tailwindcss", url: "https://cdn.simpleicons.org/tailwindcss" },
  { key: "mongodb", url: "https://cdn.simpleicons.org/mongodb" },
  { key: "postgresql", url: "https://cdn.simpleicons.org/postgresql" },
  { key: "mysql", url: "https://cdn.simpleicons.org/mysql" },
  { key: "redis", url: "https://cdn.simpleicons.org/redis" },
  { key: "docker", url: "https://cdn.simpleicons.org/docker" },
  { key: "ethereum", url: "https://cdn.simpleicons.org/ethereum" },
  { key: "solana", url: "https://cdn.simpleicons.org/solana" },
  { key: "tensorflow", url: "https://cdn.simpleicons.org/tensorflow" },
  { key: "pytorch", url: "https://cdn.simpleicons.org/pytorch" },
  { key: "numpy", url: "https://cdn.simpleicons.org/numpy" },
  { key: "pandas", url: "https://cdn.simpleicons.org/pandas" },
  { key: "scikit-learn", url: "https://cdn.simpleicons.org/scikitlearn" },
  { key: "git", url: "https://cdn.simpleicons.org/git" },
  { key: "github", url: "https://cdn.simpleicons.org/github" },
  { key: "aws", url: "https://cdn.simpleicons.org/amazonaws" },
  { key: "azure", url: "https://cdn.simpleicons.org/microsoftazure" },
  { key: "websockets", url: "https://cdn.simpleicons.org/socketdotio" },
  { key: "chatgpt", theme: true },
  { key: "medium", url: "https://cdn.simpleicons.org/medium" },
];

// Next.js light/dark SVGs
const nextjsLight = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><path fill="currentColor" d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.0971-.0633c.9241-.6152 1.9056-1.478 2.6784-2.3584 1.3843-1.5768 2.2763-3.4164 2.6064-5.3738.0959-.6587.1074-.8534.1074-1.7474 0-.8941-.0115-1.0888-.1074-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"/></svg>`;

const nextjsDark = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><path fill="white" d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.0971-.0633c.9241-.6152 1.9056-1.478 2.6784-2.3584 1.3843-1.5768 2.2763-3.4164 2.6064-5.3738.0959-.6587.1074-.8534.1074-1.7474 0-.8941-.0115-1.0888-.1074-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"/></svg>`;

const chatgptLight = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>ChatGPT</title><path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>`;

const chatgptDark = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>ChatGPT</title><path fill="white" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>`;

async function downloadIcon(icon: TechIcon) {
  try {
    if (icon.theme) {
      // Handle themed icons (Next.js and ChatGPT)
      if (icon.key === "nextjs") {
        await writeFile(
          resolve(ICONS_DIR, `${icon.key}-light.svg`),
          nextjsLight
        );
        await writeFile(
          resolve(ICONS_DIR, `${icon.key}-dark.svg`),
          nextjsDark
        );
        console.log(`✓ Created ${icon.key} (light & dark)`);
      } else if (icon.key === "chatgpt") {
        await writeFile(
          resolve(ICONS_DIR, `${icon.key}-light.svg`),
          chatgptLight
        );
        await writeFile(
          resolve(ICONS_DIR, `${icon.key}-dark.svg`),
          chatgptDark
        );
        console.log(`✓ Created ${icon.key} (light & dark)`);
      }
    } else if (icon.url) {
      // Download from CDN
      const response = await fetch(icon.url);
      if (!response.ok) {
        console.error(`✗ Failed to download ${icon.key}: ${response.statusText}`);
        return;
      }
      const svg = await response.text();
      await writeFile(resolve(ICONS_DIR, `${icon.key}.svg`), svg);
      console.log(`✓ Downloaded ${icon.key}`);
    }
  } catch (error) {
    console.error(`✗ Error downloading ${icon.key}:`, error);
  }
}

async function main() {
  console.log("Downloading tech stack icons...\n");

  for (const icon of techIcons) {
    await downloadIcon(icon);
  }

  console.log("\n✓ All icons downloaded!");
}

main();
