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

// Ships empty on purpose — populate once real product names, screenshots,
// and case-study copy are supplied. No placeholder entries.
export const work: WorkItem[] = [];
