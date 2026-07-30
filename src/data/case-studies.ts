export interface CaseStudy {
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

// Client/brand work only — Speeir's own products live in data/work.ts.
// Ships empty on purpose — populate once real client names, screenshots,
// and case-study copy are supplied. No placeholder entries.
// `caseStudy` is rendered as plain paragraphs split on blank lines — no markdown.
export const caseStudies: CaseStudy[] = [];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
