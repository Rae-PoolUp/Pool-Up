import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { site } from '@/lib/render.mjs';
import '../public/assets/site.css';

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
export const metadata: Metadata = {
  title: { default: `Pool Up | ${site.tagline}`, template: '%s | Pool Up' },
  description: 'Pool Up connects verified commuters, drivers and approved transport partners travelling along similar work routes.',
  robots: { index: !site.preview, follow: !site.preview },
  icons: { icon: `${basePath}/assets/favicon.svg` }
};
export const viewport: Viewport = { themeColor: '#2e5d49', colorScheme: 'light' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        {children}
        <Script src={`${basePath}/assets/site.js`} strategy="afterInteractive" />
      </body>
    </html>
  );
}
