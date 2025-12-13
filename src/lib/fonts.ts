import {
  IBM_Plex_Mono as FontMono,
  Inter as FontSans,
  Playfair_Display as FontSerif,
  Space_Grotesk as FontSpaceGrotesk,
} from "next/font/google";

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
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
