# SEO Audit — VatSnap (vatratefinder.com)

Date: 2026-09-24. Stack detected first; no site files changed in this phase.

## Stack

- Framework: Astro 5 (static output, `output: 'static'`), `@astrojs/sitemap` 3.x,
  data from `eu-vat-rates-data` 2026.8.23 (version `2026-08-23`, source `European Commission TEDB`).
- Hosting: Cloudflare Workers static assets (`wrangler.jsonc`, `assets.directory: ./dist`,
  `not_found_handling: 404-page`). Note: README says "Cloudflare Pages", but the active
  config is Workers. This matters because **`public/_redirects` is a Pages feature and is
  ignored by Workers static assets** — which is why none of the redirect rules work (see §1).
- Pages live in `src/pages/`; metadata via `src/layouts/BaseLayout.astro` props
  (`title`, `description`, `canonicalPath`, `robots`, `schema`, `ogImage`).
- `dist/` is committed to git. `dist/sitemap-index.xml` and `dist/sitemap-0.xml` were
  deleted from the working tree (see `git status`).

## 1. Duplicate indexed versions — FAIL

`curl -I` on 2026-09-24, all four return **HTTP 200 with identical HTML** (no redirect):

| URL | Status | Target |
|---|---|---|
| `https://vatratefinder.com/` | 200 | — (serves) |
| `https://www.vatratefinder.com/` | 200 | — (serves, duplicate) |
| `http://vatratefinder.com/` | 200 | — (serves, duplicate; no HTTPS upgrade) |
| `http://www.vatratefinder.com/` | 200 | — (serves, duplicate; no HTTPS upgrade) |

Expected: exactly one 200, three 301s. The `_redirects` rules (www→apex, http→https)
are dead config on Workers. Fix must be a Cloudflare Redirect Rule (manual step)
and/or a Worker-level redirect — documented in Phase 1.

## 2. Existing indexed pages — NEEDS WORK

- The indexed "All EU VAT Rates 2026" page is `src/pages/vat-rate/index.astro` → `/vat-rate/`.
  Live title: `All EU VAT Rates 2026 — VatSnap` (31 chars — fine but will be rewritten per spec).
- Live meta description (157 chars, 2 over the ~155 limit, generic wording):
  `Standard and reduced VAT rates for all 27 EU member states plus the UK, sourced from
  the official EU TEDB dataset. Pick a country for its calculator and FAQ.`
  Plausibly why Google replaced the snippet with footer text. Page also has only a
  one-line intro and no rates table / highest-lowest facts / verified date.

## 3. Host consistency (www vs non-www) — FAIL

- Canonical + `og:url` + sitemap `site:` all use apex `https://vatratefinder.com` (consistent in code).
- But `www` serves HTTP 200 identical content (see §1), so the canonical is unenforced.
- Internal links are root-relative (`/vat-rate/…`) — good, host-agnostic.
- Widget snippet + embed "Powered by VatSnap" link hardcode `https://vatratefinder.com/` — apex, consistent.
- Decision: keep **apex `https://vatratefinder.com`** as the single canonical host
  (it is already the canonical/sitemap/snippet host; switching to www would churn every URL).
  Evidence contradicts the brief's premise that "the site actually serves from www" —
  both hosts serve 200; apex is the configured canonical. Only the server-side
  www→apex 301 is missing.

## 4. robots.txt — NEEDS WORK

Exists (`public/robots.txt`), allows `/`, but:
`Sitemap: https://vatratefinder.com/sitemap-index.xml` points to a URL that returns
the 404 page on live (see §5). Fix the sitemap first, then this line is correct as-is.

## 5. sitemap.xml — FAIL

- Live `GET /sitemap-index.xml` and `/sitemap.xml` return the **404 page** (HTTP 404 with 404 HTML).
- `dist/` contains no sitemap files (deleted in working tree). `@astrojs/sitemap` should
  emit them on `npm run build` — to be verified in Phase 1 build. If the build emits them,
  the live 404 means the last deploy predates them or Workers isn't serving them.
- No blog/data URLs exist yet (nothing to list). `/embed/` is correctly filtered out of the sitemap.

## 6. Per-page tags — NEEDS WORK

- Homepage (`/`): title 60 chars (at the limit), description **160 chars** (over ~155).
  One `<h1>`, self-referencing canonical, indexable. PASS structure, NEEDS WORK lengths.
- `/vat-rate/`: one `<h1>`, canonical OK, description 157 chars (see §2).
- Country pages (spot-checked `/vat-rate/germany/`): title 51 chars, description 135 chars,
  one `<h1>` (`🇩🇪 Germany: 19% VAT`), canonical OK. But H1/title patterns don't match the
  specified `VAT Rate in {Country} 2026: {standard}% | VatSnap` pattern — rewritten in Phase 2.
- No accidental `noindex` on indexable pages (`/embed/`, `/404/`, `/500/` correctly noindexed).

## 7. Open Graph / Twitter images — FAIL

`og:image`/`twitter:image` = `https://vatratefinder.com/og-image.svg` (SVG, `og:image:type`
`image/svg+xml`). Facebook/LinkedIn/X/WhatsApp don't reliably render SVG previews.
No PNG/JPG exists in `public/`. Fix: generate 1200×630 PNG, update tags + alt text,
keep `twitter:card: summary_large_image`.

## 8. Trailing slash consistency — PASS (minor note)

- `/vat-rate` → 307 → `/vat-rate/`; `/vat-rate/germany` → 307 → `/vat-rate/germany/`.
  No duplicate content (single hop to slash version). Minor: 307 instead of 301
  (Cloudflare/Astro default behaviour); acceptable, not worth chasing on static hosting.

## 9. Internal linking — NEEDS WORK

- No orphan pages among the 28 country pages (linked from homepage + `/vat-rate/` + each other).
- Anchor text is descriptive (country names). Every country page links back to `/vat-rate/`
  but NOT explicitly to the homepage calculator; "Other countries" block shows the first 8
  alphabetical countries, not neighbours. No blog/guides section or nav/footer links yet.

## 10. Structured data (JSON-LD) — NEEDS WORK

- Exists: `WebApplication` + `FAQPage` on homepage and every country page (2 blocks each, valid shape).
- Missing: `WebSite` (homepage), `BreadcrumbList` (country + blog pages), `Article` (blog posts).
- No fake ratings/reviews anywhere — keep it that way.

## 11. Core Web Vitals risks — NEEDS WORK

- Google Fonts loaded as render-blocking stylesheet (`fonts.googleapis.com` + `gtag.js` in `<head>`);
  no `font-display` control possible via third-party CSS link (self-host or `display=swap` already
  in URL — the CSS2 API includes `display=swap`, so fonts are swap; the stylesheet itself still blocks).
- No `<img>` tags at all (flags are emoji, OG image is SVG) — no image optimisation issues.
- Calculator JS is small vanilla inline scripts; theme/menu script inline in body. No large bundles.
- Lighthouse not run in this environment (no Chrome available); to be run in Phase 5 if possible,
  otherwise manual perf pass (preload font, defer non-critical JS).

## 12. Homepage content problems — FAIL

- (a) Developer note visible to users in calculator panel:
  `All rates load from the eu-vat-rates-data dataset — nothing is hardcoded.` — must be removed.
- (b) France inconsistency confirmed against dataset (`standard 20`, `reduced
  [0.9, 1.05, 5.5, 8.5, 10, 13]`, `super_reduced 2.1`): the country list on the homepage
  shows the full reduced list (correct), but the FAQ answer says only
  "10% and 5.5%, plus a 2.1% super-reduced rate" (incomplete). Fix FAQ from dataset.

## 13. Custom 404 page — PASS

`src/pages/404.astro` exists, links to calculator + country index + widget/about,
`noindex, follow`, served via `not_found_handling: 404-page`.

## 14. Accessibility basics — PASS (one cosmetic note)

- `<html lang="en">`, skip link, form `<label>`s, heading order `h1→h2`, flags `aria-hidden`. PASS.
- Cosmetic: contact form inputs use inline `var(--border)` / `var(--card)` which don't exist
  in `global.css` (falls back harmlessly). Low priority.

## 15. Extra findings (not in the brief — flagged, not auto-fixed)

- **Privacy contradiction (fix in Phase 1):** `privacy.astro` says "No analytics, no advertising
  trackers", but `BaseLayout.astro` loads Google `gtag.js` (`G-C0V9Y4KFDR`). The privacy text
  must be corrected (analytics disclosed) — white-hat and legally safer. Measurement kept.
- **`vatsnap-content-pack.md` does NOT exist** in the project root (checked 2026-09-24).
  Phase 3 articles therefore can't "follow" it; I will write two original guides from the
  dataset + general OSS/reverse-charge knowledge and list verify-with-human items.
  I will NOT create `/blog/eu-vat-rates-2026/` (per brief, avoids keyword cannibalisation).

## Prioritised fix list

**High**
1. Enforce single canonical host (apex) — Cloudflare Redirect Rule + Always Use HTTPS (manual; §1, §3).
2. Restore working sitemap (build + deploy) so robots.txt's sitemap URL returns 200 (§4, §5).
3. Replace SVG social image with 1200×630 PNG + retag (§7).
4. Remove homepage developer note; fix France FAQ from dataset (§12).
5. Rewrite `/vat-rate/` title/description/intro + rates table + highest/lowest + verified date (§2).
6. Country pages: title/description pattern, H1 pattern, unique intros, neighbour links,
   visible verified date + disclaimer, keep existing super-reduced/parking details (§9 + Phase 2).
7. Correct privacy page analytics disclosure (§15).

**Medium**
8. Add `WebSite` + `BreadcrumbList` + `Article` JSON-LD (§10).
9. Blog index + 2 guides + nav/footer links + sitemap entries (Phase 3; no content pack found).
10. Widget page: copy button + live preview + followable "Powered by VatSnap" anchor (§9 + Phase 4).
11. `/data/` page with build-time CSV/JSON + cite note (Phase 4).
12. Font loading: preconnect already present; add `preload` for the font CSS or self-host
    if cheap; keep `display=swap` (§11).

**Low**
13. Contact form nonexistent CSS vars cleanup (§14).
14. 307→301 trailing-slash nicety — skip (platform default, harmless).
15. Footer rewrite to remove package name from user-facing text (Phase 1, step 9/10 in brief).
