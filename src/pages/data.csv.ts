import type { APIRoute } from 'astro';
import { COUNTRIES, DATA_VERSION, DATA_SOURCE } from '../lib/vat';

function csvCell(v: string | number | null): string {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// Build-time CSV download generated from the dataset — /data.csv
export const GET: APIRoute = async () => {
  const header = 'country,code,slug,eu_member,vat_name,vat_abbr,standard,reduced,super_reduced,parking,currency,last_verified,source';
  const rows = COUNTRIES.map((c) =>
    [
      c.name,
      c.code,
      c.slug,
      c.euMember ? 'yes' : 'no',
      c.vatName,
      c.vatAbbr,
      c.standard,
      c.reduced.join(';'),
      c.superReduced ?? '',
      c.parking ?? '',
      c.currency,
      DATA_VERSION,
      DATA_SOURCE,
    ]
      .map(csvCell)
      .join(','),
  );
  const body = [header, ...rows].join('\n') + '\n';
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="eu-vat-rates.csv"',
    },
  });
};
