export interface WorkItem {
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

// Speeir's own products only — client/brand work lives in data/case-studies.ts.
// Ships empty on purpose — populate once real product names, screenshots,
// and case-study copy are supplied. No placeholder entries.
// `caseStudy` is rendered as plain paragraphs split on blank lines — no markdown.
export const work: WorkItem[] = [];

export function getWorkBySlug(slug: string) {
  return work.find((item) => item.slug === slug);
}
