import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioDetail } from "@/components/Portfolio";
import { SECTIONS, getItem } from "@/data/portfolio";
import { pageMeta } from "@/lib/metadata";

const section = SECTIONS["work"];

export function generateStaticParams() {
  return section.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem("work", slug);
  if (!item) return {};

  return pageMeta({
    title: item.title,
    description: item.summary,
    path: `${section.path}/${slug}`,
    type: "article",
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem("work", slug);
  if (!item) notFound();

  return <PortfolioDetail section={section} item={item} />;
}
