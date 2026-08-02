import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#A15FDC",
};

const OG_CARD = {
  url:
    "/api/og?title=" +
    encodeURIComponent("Software agency that builds what it pitches") +
    "&subtitle=" +
    encodeURIComponent("Web, mobile, and custom software, building our own products first."),
  width: 1200,
  height: 630,
  alt: "Speeir | Software agency that builds what it pitches",
};

export const metadata: Metadata = {
  title: "Speeir | Software agency that builds what it pitches",
  description:
    "Speeir designs and ships web, mobile, and custom software, building its own products first.",
  metadataBase: new URL("https://speeir.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Speeir | Software agency that builds what it pitches",
    description:
      "Speeir designs and ships web, mobile, and custom software, building its own products first.",
    url: new URL("/", "https://speeir.com"),
    siteName: "Speeir",
    type: "website",
    images: [OG_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speeir | Software agency that builds what it pitches",
    description:
      "Speeir designs and ships web, mobile, and custom software, building its own products first.",
    images: [OG_CARD.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Speeir",
      "url": "https://speeir.com",
      "logo": "https://speeir.com/logo.svg",
      "sameAs": [
        "https://ie.linkedin.com/company/speeir",
        "https://www.instagram.com/speeir.ltd/",
        "https://www.facebook.com/people/Speeir/61576228562819/"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "info@speeir.com",
          "availableLanguage": "en"
        }
      ]
    },
    {
      "@type": "LocalBusiness",
      "name": "Speeir",
      "url": "https://speeir.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IE",
        "addressLocality": "Dublin",
        "addressRegion": "Dublin"
      },
      "areaServed": ["IE"],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "53.3498",
        "longitude": "-6.2603"
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=53.3498,-6.2603",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "info@speeir.com",
          "availableLanguage": "en"
        }
      ]
    },
    {
      "@type": "WebSite",
      "url": "https://speeir.com",
      "name": "Speeir",
      "publisher": {
        "@type": "Organization",
        "name": "Speeir",
        "logo": { "@type": "ImageObject", "url": "https://speeir.com/logo.svg" }
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="alternate" hrefLang="en-IE" href="https://speeir.com" />
        <meta name="geo.region" content="IE" />
        <meta name="geo.country" content="IE" />
        <meta name="geo.placename" content="Ireland" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
