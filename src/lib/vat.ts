import { dataset, getFlag } from 'eu-vat-rates-data';
import type { VatRate } from 'eu-vat-rates-data';

export type { VatRate };
export const DATA_VERSION: string = dataset.version; // e.g. "2026-08-23" — used as "last verified" date
export const DATA_SOURCE: string = dataset.source; // "European Commission TEDB"

export interface CountryEntry {
  code: string;
  slug: string;
  name: string;
  currency: string;
  locale: string;
  euMember: boolean;
  vatName: string;
  vatAbbr: string;
  standard: number;
  reduced: number[];
  superReduced: number | null;
  parking: number | null;
  flag: string;
}

/** BCP-47 locale per country so Intl.NumberFormat renders
 *  "1.234,56 €" in Germany but "€1,234.56" style in Ireland, etc. */
const LOCALES: Record<string, string> = {
  AT: 'de-AT',
  BE: 'nl-BE',
  BG: 'bg-BG',
  CY: 'el-CY',
  CZ: 'cs-CZ',
  DE: 'de-DE',
  DK: 'da-DK',
  EE: 'et-EE',
  ES: 'es-ES',
  FI: 'fi-FI',
  FR: 'fr-FR',
  GB: 'en-GB',
  GR: 'el-GR',
  HR: 'hr-HR',
  HU: 'hu-HU',
  IE: 'en-IE',
  IT: 'it-IT',
  LT: 'lt-LT',
  LU: 'fr-LU',
  LV: 'lv-LV',
  MT: 'en-MT',
  NL: 'nl-NL',
  PL: 'pl-PL',
  PT: 'pt-PT',
  RO: 'ro-RO',
  SE: 'sv-SE',
  SI: 'sl-SI',
  SK: 'sk-SK',
};

/** Lowercase, hyphenated, human-readable slugs: "Czech Republic" -> "czech-republic". */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toEntry(code: string, rate: VatRate): CountryEntry {
  return {
    code,
    slug: slugify(rate.country),
    name: rate.country,
    currency: rate.currency,
    locale: LOCALES[code] ?? 'en-IE',
    euMember: rate.eu_member,
    vatName: rate.vat_name,
    vatAbbr: rate.vat_abbr,
    standard: rate.standard,
    reduced: [...rate.reduced],
    superReduced: rate.super_reduced,
    parking: rate.parking,
    flag: getFlag(code),
  };
}

/**
 * Site scope: all 27 EU members (eu_member === true) PLUS the United
 * Kingdom (GB) shown for reference. Non-EU rows other than GB are excluded
 * so the calculator dropdown and /vat-rate/* pages stay focused on
 * "selling into the EU" + the one most-requested non-EU neighbour.
 */
export const COUNTRIES: CountryEntry[] = Object.entries(dataset.rates)
  .filter(([code, r]) => (r as VatRate).eu_member || code === 'GB')
  .map(([code, r]) => toEntry(code, r as VatRate))
  .sort((a, b) => a.name.localeCompare(b.name));

export const COUNTRY_BY_SLUG: Record<string, CountryEntry> = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, c]),
);

export const COUNTRY_BY_CODE: Record<string, CountryEntry> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
);

export function formatMoney(value: number, locale: string, currency: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency }).format(value);
  }
}

export function formatRate(rate: number): string {
  return `${rate}%`.replace(/\.0%$/, '%');
}

/** Compact JSON payload embedded in pages so the vanilla-TS calculator can
 *  compute without any API call. Values come straight from the data package. */
export function calculatorPayload(): string {
  const obj: Record<string, { n: string; c: string; l: string; s: number; r: number[]; f: string }> = {};
  for (const c of COUNTRIES) {
    obj[c.code] = { n: c.name, c: c.currency, l: c.locale, s: c.standard, r: c.reduced, f: c.flag };
  }
  return JSON.stringify(obj);
}
