export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  caseStudy?: string;
  updatedAt: string;
}

// Both ship empty on purpose — populate once real names, screenshots, and
// case-study copy are supplied. No placeholder entries.
// `caseStudy` is rendered as plain paragraphs split on blank lines — no markdown.

// Speeir's own products.
export const work: PortfolioItem[] = [];

// Client/brand work.
export const caseStudies: PortfolioItem[] = [];

// The two sections render identically; only the copy and the data source differ.
export const SECTIONS = {
  work: {
    path: "/work",
    items: work,
    eyebrow: "Work",
    heading: "What we've built",
    metaTitle: "Work",
    metaDescription: "Products built by Speeir.",
    emptyHeading: "Products coming soon",
    emptyBody:
      "We're putting together the products we've shipped. Check back shortly, or see what we can build for you.",
    backLabel: "All work",
    itemCta: "View project",
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

export type SectionKey = keyof typeof SECTIONS;
export type Section = (typeof SECTIONS)[SectionKey];

export function getItem(section: SectionKey, slug: string) {
  return SECTIONS[section].items.find((item) => item.slug === slug);
}
