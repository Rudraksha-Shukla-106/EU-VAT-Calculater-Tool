# SEO Changes — VatSnap (vatratefinder.com)

Branch: `seo-overhaul`. No URL slugs were changed, so no 301 redirects were
needed (no redirect chains introduced). No existing correct content was
removed; super-reduced/parking details (e.g. Luxembourg 3%/14%) are kept.
Calculation logic and the `eu-vat-rates-data` dataset are untouched.

## Phase 0 — Audit only
- `SEO_AUDIT.md`: full audit (stack, 14 checks, prioritised fix list). No site
  files changed.

## Phase 1 — Technical fixes (already committed as `0cdeb72`)
- `astro.config.mjs`: sitemap `lastmod` now tracks the dataset version date.
- `src/layouts/BaseLayout.astro`: default `og:image`/`twitter:image` switched
  from `/og-image.svg` to 1200×630 `/og-image.png` (+ width/height/type tags,
  alt text); self-hosted font preloads (`/fonts/*.woff2`); footer rewritten
  to the short TEDB wording (no package names); nav/footer link structure.
- `public/og-image.png`: new 1200×630 social image (navy `#0b1b33`, VatSnap +
  "Free EU VAT Calculator"); `public/fonts/*.woff2`: self-hosted fonts.
- `src/pages/index.astro`: developer note removed; France FAQ fixed from the
  dataset (full reduced list + territorial note); WebSite + WebApplication
  JSON-LD.
- `src/pages/vat-rate/index.astro`: title `EU VAT Rates 2026: All 27 Countries
  + UK | VatSnap`, unique meta description, intro, full rates table from the
  dataset, Highest (Hungary 27%) / Lowest (Luxembourg 17%) computed from the
  dataset, verified date, "Standard vs reduced" + "How often" sections, CTA
  links.
- `src/pages/privacy.astro`: analytics disclosure corrected (gtag.js was
  loaded while the text claimed "no analytics").
- `SEO_TODO_MANUAL.md`: Cloudflare Always-Use-HTTPS + www→apex 301 rule,
  Search Console/Bing steps, re-index list, human-verification list.

## Phase 2 — Country pages (`src/pages/vat-rate/[country].astro`)
- Title pattern `VAT Rate in {Country} 2026: {standard}% | VatSnap` (all ≤60 chars).
- Description pattern with automatic shortening (full reduced list → "N
  reduced rates" fallback, never cut mid-word); all ≤155 chars, all unique.
  France uses the short form (129 chars).
- H1 now exactly `VAT Calculator for {Country}`; added unique lede paragraph
  per page (standard rate, reduced count, EU 17%–27% range comparison).
- "Related countries" block now links 3–4 neighbouring countries (was: first
  8 alphabetical). Visible "Rates last verified" + "Guidance only" lines kept.
- Added links to the homepage calculator and both guides on every page.
- Removed the user-facing `eu-vat-rates-data` package mention from the FAQ
  (now "data tracking the European Commission TEDB"). BreadcrumbList JSON-LD
  already present; kept.

## Phase 3 — Blog (`src/pages/blog/`)
- `index.astro`: `/blog/` index, title `VAT Guides for Small Online Sellers |
  VatSnap`. No `/blog/eu-vat-rates-2026/` created (avoids competing with the
  indexed `/vat-rate/` page).
- `oss-vat-explained.astro` → `/blog/oss-vat-explained/`: OSS guide, links to
  `/vat-rate/`, Germany/France/Ireland/Hungary pages, calculator and the
  reverse-calc guide.
- `reverse-vat-calculation.astro` → `/blog/reverse-vat-calculation/`:
  gross→net formula with worked dataset examples (DE 19%, IE 23%, FI 25.5%),
  links to 3+ internal pages.
- Every article: breadcrumbs + BreadcrumbList, Article JSON-LD (headline,
  dates, organisation author), "Last updated", CTA button, disclaimer.
- Note: `vatsnap-content-pack.md` does not exist in the repo, so both guides
  were written from the dataset + general EU VAT knowledge — they need an
  accountant's review (listed in `SEO_TODO_MANUAL.md`).
- Nav (desktop + mobile) and footer gained "Guides" (`/blog/`) and "Rate
  dataset" (`/data/`) links. Blog URLs are auto-included in the sitemap.

## Phase 4 — Linkable assets
- `src/pages/widget.astro`: one-click copy button (clipboard + fallback),
  live `<iframe>` preview of `/embed/`, "Who can use it" section; snippet
  anchor text is now `Free EU VAT calculator by VatSnap` → homepage.
- `src/pages/embed.astro`: in-widget link text updated to the same
  descriptive anchor (still a normal followable `<a>` to the homepage).
- `src/pages/data/index.astro` → `/data/`, titled `EU VAT Rates Dataset (Free
  Download) | VatSnap`: full rates table + CSV/JSON download buttons, TEDB
  source line, "How to cite" note, in sitemap + footer.
- `src/pages/data.csv.ts` → `/data.csv` and `src/pages/data.json.ts` →
  `/data.json`: build-time downloads generated from the dataset.

## Phase 5 — Verification (2026-09-24, clean `npm run build`: Complete, 42 pages)
- Sitemap: `sitemap-index.xml` + `sitemap-0.xml` emitted, 39 URLs, apex host,
  only 200-returning pages (`/embed/` correctly excluded).
- Crawl of `dist/`: 40 pages — every page has exactly one H1, one unique
  title (≤60), one unique description (≤155), self-referencing apex
  canonical, no `noindex` on indexable pages. Genuine broken internal links: 0.
- JSON-LD: all blocks parse as valid JSON (WebSite/WebApplication/FAQPage on
  homepage, WebApplication/FAQPage/BreadcrumbList on country pages, Article +
  BreadcrumbList on blog posts).
- Calculator math: DE net 100 @19% → VAT 19 / total 119 PASS; gross 119 →
  net 100 PASS; FI 25.5% → VAT 25.5 / total 125.5 PASS. Logic untouched.
- Lighthouse: could not run here (no Chrome in this environment). Expected
  posture is good (static HTML, self-hosted fonts with preload, no render-
  blocking third-party CSS, tiny inline JS), but run Lighthouse mobile on `/`,
  one country page and one blog page after deploy and record scores here.
- Redirect test: cannot verify server-side from a static build — Cloudflare
  rules in `SEO_TODO_MANUAL.md` must be applied, then test the four variants.
- Note: incremental `astro build` on Windows can abort with `EBUSY … unlink`
  during temp cleanup (file lock, not a code error) and skip sitemap output;
  a clean build (`Remove-Item dist` first) completes and emits the sitemap.
