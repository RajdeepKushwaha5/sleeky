import {
  IBM_Plex_Mono as FontMono,
  Inter as FontSans,
  Outfit as FontOutfit,
  Playfair_Display as FontSerif,
  Space_Grotesk as FontSpaceGrotesk,
  Syne as FontSyne,
} from "next/font/google";

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  preload: true,
});

export const fontSyne = FontSyne({
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-syne",
  preload: true,
});

export const fontOutfit = FontOutfit({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-outfit",
  preload: true,
});

export const fontSerif = FontSerif({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-serif",
  preload: true,
});

export const fontMono = FontMono({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  preload: true,
});

export const fontSpaceGrotesk = FontSpaceGrotesk({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  preload: true,
});
