import { makeContext, renderHeader, renderPage, renderFooter, render404 } from '@/lib/render.mjs';

type Props = { slug: string; notFound?: boolean };

/**
 * All markup is generated from local, HTML-escaped editorial content.
 * Never pass untrusted HTML or registration data to this component.
 * Plain links are intentional: the same markup also works as offline HTML.
 */
export default function SitePage({ slug, notFound = false }: Props) {
  const context = makeContext(slug, 'next', process.env.NEXT_PUBLIC_BASE_PATH || '');
  const markup = renderHeader(context)
    + (notFound ? render404(context) : renderPage(slug, context))
    + renderFooter(context);
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
