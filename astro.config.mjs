import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static-only build for Cloudflare Pages: `output: 'static'` emits pure
// HTML files with no SSR adapter, so hosting costs $0.
export default defineConfig({
  site: 'https://vatratefinder.com',
  output: 'static',
  integrations: [
    sitemap({
      // /embed/ is a noindex iframe target for third-party sites — keep it
      // out of the sitemap. 404/500 have no indexable content either.
      filter: (page) =>
        page !== 'https://vatratefinder.com/embed/' &&
        page !== 'https://vatratefinder.com/404/' &&
        page !== 'https://vatratefinder.com/404.html' &&
        page !== 'https://vatratefinder.com/500/',
    }),
  ],
});
