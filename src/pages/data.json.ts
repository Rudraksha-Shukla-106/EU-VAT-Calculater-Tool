import type { APIRoute } from 'astro';
import { COUNTRIES, DATA_VERSION, DATA_SOURCE } from '../lib/vat';

// Build-time JSON download generated from the dataset — /data.json
export const GET: APIRoute = async () => {
  const body = JSON.stringify(
    {
      source: DATA_SOURCE,
      last_verified: DATA_VERSION,
      rates: COUNTRIES.map((c) => ({
        country: c.name,
        code: c.code,
        slug: c.slug,
        eu_member: c.euMember,
        vat_name: c.vatName,
        vat_abbr: c.vatAbbr,
        standard: c.standard,
        reduced: c.reduced,
        super_reduced: c.superReduced,
        parking: c.parking,
        currency: c.currency,
      })),
    },
    null,
    2,
  );
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="eu-vat-rates.json"',
    },
  });
};
