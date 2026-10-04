export interface PortfolioItem {
  slug: string;
  title: string;
  summary: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  /** Card tile: wordmark, three phone screens, and the product's own brand colour. */
  logo?: string;
  /** Phone screens for the card fan, in order: left, centre, right. */
  screens?: [string, string, string];
  brand?: string;
  caseStudy?: string;
  updatedAt: string;
}

// Both ship empty on purpose — populate once real names, screenshots, and
// case-study copy are supplied. No placeholder entries.
// `caseStudy` is rendered as plain paragraphs split on blank lines — no markdown.

// Speeir's own products.
export const work: PortfolioItem[] = [
  {
    slug: "trackhq",
    title: "TrackHQ",
    summary:
      "The training log trainers prescribe into and clients actually fill in. Workout plans built on the web, logged set by set on iOS and Android.",
    images: [
      "/images/work/trackhq/client-today.png",
      "/images/work/trackhq/workout-session.png",
      "/images/work/trackhq/trainer-today.png",
      "/images/work/trackhq/progress.png",
    ],
    logo: "/images/work/trackhq/logo.png",
    screens: [
      "/images/work/trackhq/workout-session.png",
      "/images/work/trackhq/client-today.png",
      "/images/work/trackhq/trainer-today.png",
    ],
    brand: "#A15FDC",
    tags: ["Fitness", "iOS & Android", "Web dashboard", "Go + gRPC"],
    updatedAt: "2026-10-04",
  },
  {
    slug: "easysave",
    title: "easySave",
    summary:
      "A marketplace for food nearing its expiry date. Shoppers find discounted items nearby, and shops sell stock that would otherwise be binned.",
    images: [
      "/images/work/easysave/feature.png",
      "/images/work/easysave/shopper-feed.png",
      "/images/work/easysave/shop-dashboard.png",
    ],
    logo: "/images/work/easysave/logo.png",
    screens: [
      "/images/work/easysave/favorites.png",
      "/images/work/easysave/shopper-feed.png",
      "/images/work/easysave/shop-dashboard.png",
    ],
    brand: "#3FB27A",
    tags: ["Marketplace", "Sustainability", "iOS & Android", "Flutter"],
    updatedAt: "2026-10-04",
  },
];

// Client/brand work.
const caseStudies: PortfolioItem[] = [];

// The two sections render identically; only the copy and the data source differ.
export const SECTIONS = {
  work: {
    path: "/work",
    items: work,
    eyebrow: "Products",
    heading: "Products we've built",
    metaTitle: "Products",
    metaDescription: "TrackHQ, easySave and other products designed, built and run by Speeir.",
    emptyHeading: "Products coming soon",
    emptyBody:
      "We're putting together the products we've shipped. Check back shortly, or see what we can build for you.",
    backLabel: "All products",
    itemCta: "View product",
  },
  "case-studies": {
    path: "/case-studies",
    items: caseStudies,
    eyebrow: "Case Studies",
    heading: "Brands we've worked with",
    metaTitle: "Case Studies",
    metaDescription: "Client and brand work delivered by Speeir.",
    emptyHeading: "Case studies coming soon",
    emptyBody:
      "We're putting together the brands we've worked with. Check back shortly, or see what we can build for you.",
    backLabel: "All case studies",
    itemCta: "View case study",
  },
} as const;

type SectionKey = keyof typeof SECTIONS;
export type Section = (typeof SECTIONS)[SectionKey];

export function getItem(section: SectionKey, slug: string) {
  return SECTIONS[section].items.find((item) => item.slug === slug);
}
