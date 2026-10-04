import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioDetail } from "@/components/Portfolio";
import { ProductShowcase } from "@/components/ProductShowcase";
import { PRODUCTS } from "@/data/products";
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
  const product = PRODUCTS[slug];
  if (product) {
    return pageMeta({
      title: `${product.name}: ${product.hero.heading}`,
      description: product.metaDescription,
      path: `${section.path}/${slug}`,
      images: product.ogImage && [{ ...product.ogImage, alt: product.name }],
    });
  }

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
  const product = PRODUCTS[slug];
  if (product) return <ProductShowcase product={product} />;

  const item = getItem("work", slug);
  if (!item) notFound();

  return <PortfolioDetail section={section} item={item} />;
}
