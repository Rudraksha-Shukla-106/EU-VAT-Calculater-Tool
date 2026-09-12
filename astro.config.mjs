import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static-only build for Cloudflare Pages: `output: 'static'` emits pure
// HTML files with no SSR adapter, so hosting costs $0.
export default defineConfig({
  site: 'https://vatsnap.example.com',
  output: 'static',
  integrations: [sitemap()],
});
