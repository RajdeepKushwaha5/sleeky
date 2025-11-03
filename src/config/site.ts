import { USER } from "@/features/profile/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://rajdeep-singh.vercel.app",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Blogs",
    href: "/blog",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Contact Me",
    href: "/#contact",
  },
  {
    title: "Resume",
    href: "https://drive.google.com/file/d/1dWRhT2GSx4StZk2kqGU2UpJLNZCVnuoA/view",
    external: true,
  },
];

export const GITHUB_USERNAME = "RajdeepKushwaha5";
export const SOURCE_CODE_GITHUB_REPO = "RajdeepKushwaha5/sleeky";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/RajdeepKushwaha5/sleeky";

export const UTM_PARAMS = {
  utm_source: "rajdeep-singh.vercel.app",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
