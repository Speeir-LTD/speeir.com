import type { Metadata } from "next";

const SITE_URL = "https://speeir.com";

// Next doesn't derive openGraph/twitter from `title`/`description`, so every
// page ends up repeating the same two strings three times. This does it once.
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  images,
  cardSubtitle,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: { url: string; width: number; height: number; alt: string }[];
  /** Shorter line for the share card, when the SEO description reads long. */
  cardSubtitle?: string;
}): Metadata {
  const fullTitle = `${title} | Speeir`;

  // Every page gets a card carrying its own headline, unless the caller
  // supplies a real image (a blog post's cover photo).
  const cards = images ?? [
    {
      url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(cardSubtitle ?? description)}`,
      width: 1200,
      height: 630,
      alt: fullTitle,
    },
  ];

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: new URL(path, SITE_URL),
      siteName: "Speeir",
      type,
      images: cards,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: cards.map((card) => card.url),
    },
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export { SITE_URL };
