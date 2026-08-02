import type { Metadata } from "next";
import { PortfolioList } from "@/components/Portfolio";
import { SECTIONS } from "@/data/portfolio";
import { pageMeta } from "@/lib/metadata";

const section = SECTIONS["case-studies"];

export const metadata: Metadata = pageMeta({
  title: section.metaTitle,
  description: section.metaDescription,
  path: section.path,
});

export default function CaseStudiesPage() {
  return <PortfolioList section={section} />;
}
