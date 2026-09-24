# SEO TODO — manual steps for the site owner

Canonical host: **`https://vatratefinder.com`** (apex, no www). Everything in code
(canonical tags, `og:url`, sitemap, widget snippet, structured data) already uses it.
What is missing is server-side enforcement, which you must do in Cloudflare.

## 1. Cloudflare: force HTTPS + single host (do this first)

Why: on 2026-09-24 all four variants (`http/https × www/non-www`) returned HTTP 200
with identical content. The `public/_redirects` file covers this, but the live site
ignores it — redeploy first; if the variants still return 200, add the rule below.

(a) SSL/TLS → Edge Certificates → turn ON **"Always Use HTTPS"**.
This 301-redirects all `http://` traffic to `https://`.

(b) Create a Redirect Rule (Rules → Redirect Rules → Create rule):
- Name: `apex-canonical`
- When incoming requests match: Custom filter —
  `Hostname equals www.vatratefinder.com`
- Then: Dynamic redirect, status **301**,
  target URL: `concat("https://vatratefinder.com", http.request.uri.path, http.request.uri.query)`
  (i.e. redirect to the apex host, preserving path and query string).
- Deploy the rule and place it first.

(c) Verify (expect exactly ONE 200, three 301s, no chains):
`curl -I http://vatratefinder.com/`, `http://www.vatratefinder.com/`,
`https://www.vatratefinder.com/` → all 301 to `https://vatratefinder.com/`;
`https://vatratefinder.com/` → 200.

## 2. Google Search Console (after deploy)

1. Add a **Domain property** for `vatratefinder.com` (covers www + apex) and verify via DNS.
2. Submit the sitemap: `https://vatratefinder.com/sitemap-index.xml`.
3. Request indexing (URL Inspection → Request indexing) for: `/`, `/vat-rate/`,
   the 5 most important country pages (`/vat-rate/germany/`, `/vat-rate/france/`,
   `/vat-rate/ireland/`, `/vat-rate/netherlands/`, `/vat-rate/spain/`), `/blog/`,
   `/blog/oss-vat-explained/`, `/blog/reverse-vat-calculation/`, `/data/`.

## 3. Bing Webmaster Tools

Add the site, then submit the same sitemap URL:
`https://vatratefinder.com/sitemap-index.xml`.

## 4. URLs to submit for re-indexing after deploy

- `/` (homepage — new title/description, PNG social image, WebSite schema)
- `/vat-rate/` (rewritten title/description, rates table, highest/lowest facts)
- 5 top country pages: `/vat-rate/germany/`, `/vat-rate/france/`, `/vat-rate/ireland/`,
  `/vat-rate/netherlands/`, `/vat-rate/spain/`
- 2 new blog posts: `/blog/oss-vat-explained/`, `/blog/reverse-vat-calculation/`
- New: `/blog/`, `/data/`

## 5. Facts needing human verification

- French territorial rates: the dataset lists France with reduced rates
  `0.9, 1.05, 5.5, 8.5, 10, 13` + `2.1` super-reduced but does not label which apply
  on the mainland vs Corsica vs overseas departments. The site says only that some
  special rates are territorial. Confirm the exact per-territory mapping against the
  EU TEDB before publishing territory-specific claims.
- Spain/Portugal/Greece territorial notes (Canaries, Azores/Madeira, Aegean islands):
  same situation — the dataset implies extra bands but does not label territories.
- Local VAT names on country pages come from the dataset's `vat_name` field
  (e.g. Germany "Mehrwertsteuer (MwSt)"). Spot-check against TEDB if you want certainty.
- No `vatsnap-content-pack.md` existed in the repo, so the two blog guides were written
  from the dataset + general EU VAT knowledge. Have an accountant review the OSS and
  reverse-charge explanations before relying on them.
- After deploy, confirm `https://vatratefinder.com/sitemap-index.xml` returns 200
  (it 404'd on live before this overhaul). If it still 404s, the deploy did not pick up
  the `@astrojs/sitemap` output — redeploy from a clean build.
