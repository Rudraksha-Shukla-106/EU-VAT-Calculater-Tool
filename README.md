# VatSnap — Free EU VAT Calculator

Static Astro site for small online sellers (Etsy, Shopify, Amazon) selling into the EU.
Zero backend, zero database, zero paid APIs. Offline VAT data from the
[`eu-vat-rates-data`](https://www.npmjs.com/package/eu-vat-rates-data) npm package
(source: European Commission TEDB). Deploys to Cloudflare Pages for $0.

## Folder structure

```
astro.config.mjs            # output: 'static', site URL, @astrojs/sitemap
package.json                # astro, @astrojs/sitemap, eu-vat-rates-data
src/
  lib/
    vat.ts                  # data layer: loads dataset, slugify, locales, currency formatting
    descriptions.ts         # unique hand-written editorial copy per country (no invented rates)
  layouts/
    BaseLayout.astro        # <head> SEO/OG/Twitter + JSON-LD slot, header, footer
  components/
    VatCalculator.astro     # interactive widget: dropdown + price + live totals (vanilla TS <script>)
  pages/
    index.astro             # homepage with calculator + country grid
    vat-rate/
      index.astro           # listing of all country pages
      [country].astro       # dynamic template — one static page per country (see below)
    widget.astro            # embed docs + <iframe> snippet
    embed.astro             # standalone mini calculator for iframing (noindex)
    about.astro             # free/unofficial tool + disclaimer
    404.astro
  styles/global.css         # Stripe/Linear-style neutral theme, mobile-first
public/
  robots.txt  favicon.svg  og-image.svg
```

## How `getStaticPaths()` generates country pages

`src/pages/vat-rate/[country].astro` is Astro's dynamic-route pattern: the
`[country]` segment means "one page per value returned by `getStaticPaths()`".

```ts
export async function getStaticPaths() {
  return COUNTRIES.map((c) => ({
    params: { country: c.slug },  // e.g. "germany", "czech-republic"
    props: { code: c.code },      // e.g. "DE", "CZ"
  }));
}
```

At `npm run build`, Astro calls this once, then renders the template once per
entry, emitting pure static files:

```
dist/vat-rate/germany/index.html
dist/vat-rate/france/index.html
... (28 pages: 27 EU members + GB)
```

`COUNTRIES` itself is built in `src/lib/vat.ts` by looping over
`dataset.rates` from `eu-vat-rates-data` and keeping rows where
`eu_member === true`, plus `GB` (labelled "United Kingdom (non-EU, shown for
reference)"). Slugs come from `slugify(country)` → lowercase, hyphenated,
human-readable (`"Czech Republic"` → `"czech-republic"`).

Each country page gets: unique `<title>`/meta description, the calculator
pre-set via `defaultCode`, a hand-written explanation, FAQ + WebApplication
JSON-LD, and a "last verified" date from `dataset.version`.

## How to add a new country manually

Normally you never need to — updating the package is enough. But if a new
jurisdiction must be added by hand:

1. `src/lib/vat.ts` — add its BCP-47 locale to `LOCALES` (e.g. `XX: 'en-XX'`)
   and, if it isn't in the dataset, append a manual entry to `COUNTRIES`.
2. `src/lib/descriptions.ts` — add `slug: [paragraph1, paragraph2]` under
   `DESCRIPTIONS`, using only verifiable rates (never invent thresholds).
3. Rebuild — the `getStaticPaths()` loop picks the new slug up automatically.
4. Better path: `npm update eu-vat-rates-data` so the data stays authoritative.

## Run / build / deploy locally

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview the built site
```

**Cloudflare Pages:** framework preset `Astro`, build command `npm run build`,
output directory `dist`. No adapter, no environment variables. Set the real
domain in `astro.config.mjs` (`site:`) and in `public/robots.txt` + widget
snippet URLs before going live.

## Accuracy notes

- All numbers render from `eu-vat-rates-data` fields (`standard`, `reduced`,
  `super_reduced`, `parking`, `currency`, `version`). Nothing is hardcoded.
- Copy sticks to general, verifiable facts; a disclaimer sits directly above
  every calculator result and on the About page.
