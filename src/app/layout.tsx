import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Speeir | Software agency that builds what it pitches",
    description:
      "Speeir designs and ships web, mobile, and custom software, building its own products first.",
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
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
