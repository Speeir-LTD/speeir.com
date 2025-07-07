import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Details | Speeir",
  description: "Read our latest blog posts about software development, web development, and technology insights from the Speeir team.",
  keywords: [
    "blog",
    "software development",
    "web development",
    "programming",
    "technology",
    "speeir",
    "tech articles",
    "development insights"
  ],
  authors: [{ name: "Speeir Team" }],
  openGraph: {
    title: "Blog Details | Speeir",
    description: "Read our latest blog posts about software development, web development, and technology insights.",
    url: "https://speeir.com/blog-details",
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
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Details | Speeir",
    description: "Read our latest blog posts about software development, web development, and technology insights.",
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
    canonical: "https://speeir.com/blog-details",
  },
};

export default function BlogDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
