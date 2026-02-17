import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { Person, WebSite, WithContext } from "schema-dts";

import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { USER } from "@/features/profile/data/user";
import {
  fontMono,
  fontOutfit,
  fontSans,
  fontSerif,
  fontSpaceGrotesk,
  fontSyne,
} from "@/lib/fonts";

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [USER.username, "RJDP", "Rajdeep"],
    description: SITE_INFO.description,
    author: {
      "@type": "Person",
      name: USER.displayName,
    },
  };
}

function getPersonJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: USER.displayName,
    givenName: USER.firstName,
    familyName: USER.lastName,
    url: SITE_INFO.url,
    image: USER.avatar,
    jobTitle: USER.jobTitle,
    description: USER.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressCountry: "India",
    },
    sameAs: [
      "https://github.com/RajdeepKushwaha5",
      "https://linkedin.com/in/rajdeepsingh5",
      "https://twitter.com/rajdeeptwts",
    ],
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "Blockchain Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Ethereum",
      "Solana",
    ],
  };
}

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s – ${SITE_INFO.name}`,
    default: `${USER.displayName} – ${USER.jobTitle}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: "RajdeepKushwaha5",
      url: SITE_INFO.url,
    },
  ],
  creator: "RajdeepKushwaha5",
  openGraph: {
    title: `${USER.displayName} – ${USER.jobTitle}`,
    description: SITE_INFO.description,
    siteName: SITE_INFO.name,
    url: SITE_INFO.url,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_INFO.url}${SITE_INFO.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${USER.displayName} – ${USER.jobTitle}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rajdeeptwts",
    creator: "@rajdeeptwts",
    title: `${USER.displayName} – ${USER.jobTitle}`,
    description: SITE_INFO.description,
    images: [
      {
        url: `${SITE_INFO.url}${SITE_INFO.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${USER.displayName} – ${USER.jobTitle}`,
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: {
      url: "/icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} ${fontSpaceGrotesk.variable} ${fontSyne.variable} ${fontOutfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <Script src="/oneko/oneko.js" strategy="afterInteractive" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body>
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
