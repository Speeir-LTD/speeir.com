import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Speeir - Software Development Insights & Updates",
  description: "Discover the latest insights, tutorials, and best practices in software development, web development, and technology innovation from the Speeir team.",
  keywords: [
    "blog",
    "software development blog",
    "web development",
    "programming tutorials",
    "technology insights",
    "speeir blog",
    "coding tips",
    "development best practices",
    "tech articles",
    "programming guides"
  ],
  authors: [{ name: "Speeir Team" }],
  openGraph: {
    title: "Blog | Speeir - Software Development Insights",
    description: "Discover the latest insights, tutorials, and best practices in software development from the Speeir team.",
    url: "https://speeir.com/blog",
    siteName: "Speeir",
    images: [
      {
        url: "/images/blog/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Speeir Blog - Software Development Insights",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Speeir - Software Development Insights",
    description: "Discover the latest insights, tutorials, and best practices in software development from the Speeir team.",
    images: ["/images/blog/og-image.jpg"],
    creator: "@speeir",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://speeir.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
