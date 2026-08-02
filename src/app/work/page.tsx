import type { Metadata } from "next";
import { PortfolioList } from "@/components/Portfolio";
import { SECTIONS } from "@/data/portfolio";
import { pageMeta } from "@/lib/metadata";

const section = SECTIONS["work"];

export const metadata: Metadata = pageMeta({
  title: section.metaTitle,
  description: section.metaDescription,
  path: section.path,
});

export default function WorkPage() {
  return <PortfolioList section={section} />;
}
