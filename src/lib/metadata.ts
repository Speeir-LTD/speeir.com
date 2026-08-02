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
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: { url: string; width: number; height: number; alt: string }[];
}): Metadata {
  const fullTitle = `${title} | Speeir`;

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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images?.map((image) => image.url),
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
