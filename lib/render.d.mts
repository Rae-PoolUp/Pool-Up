export interface RenderContext {
  slug: string;
  mode: 'next' | 'static';
  asset: (name: string) => string;
  href: (target?: string, anchor?: string) => string;
}
export const site: {
  name: string;
  tagline: string;
  supportingLine: string;
  location: string;
  preview: boolean;
};
export const pageSlugs: string[];
export const content: {
  pages: Record<string, { label: string; title: string }>;
};
export function makeContext(slug?: string, mode?: 'next' | 'static', basePath?: string): RenderContext;
export function escapeHTML(value?: string): string;
export function renderHeader(ctx: RenderContext): string;
export function renderFooter(ctx: RenderContext): string;
export function renderPage(slug: string, ctx: RenderContext): string;
export function render404(ctx: RenderContext): string;
export function renderDocument(slug: string): string;
