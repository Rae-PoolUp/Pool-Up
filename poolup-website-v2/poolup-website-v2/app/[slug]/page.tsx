import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SitePage from '@/components/SitePage';
import { content, pageSlugs } from '@/lib/render.mjs';

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = content.pages[slug];
  if (!page) return { title: 'Page not found' };
  return { title: page.label };
}
export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  if (!pageSlugs.includes(slug)) notFound();
  return <SitePage slug={slug} />;
}
