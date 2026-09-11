/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, ''),
  images: { unoptimized: true },
  poweredByHeader: false
};
export default config;
