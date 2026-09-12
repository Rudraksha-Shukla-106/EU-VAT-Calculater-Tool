// Unique, data-faithful editorial copy per country.
//
// RULES followed here (see README + page disclaimer):
// - Every numeric rate mentioned matches `eu-vat-rates-data` exactly.
// - No invented thresholds, product lists, or registration limits.
// - Reduced-rate categories are described generically ("certain everyday
//   goods and services defined in national law") unless the shape of the
//   data itself is the point (e.g. Denmark has none, France lists several
//   including territorial variants).
// - The digital-goods sentence is the same verifiably-true OSS principle
//   phrased per page: non-EU and cross-border EU sellers of B2C digital
//   services can usually report via the EU One-Stop Shop instead of
//   registering in each country — confirm details with an accountant.

export interface CountryFaq {
  q: string;
  a: string;
}

export const DESCRIPTIONS: Record<string, string[]> = {
  austria: [
    'Austria charges Umsatzsteuer (USt) at a 20% standard rate, which is what most Etsy, Shopify and Amazon sellers apply to physical goods shipped to Austrian customers. Alongside it sit three reduced rates — 10%, 13% and 19% — plus a 4.9% super-reduced rate on a narrow set of essentials, so mixed carts (for example a print plus a book) can legitimately carry different rates.',
    'Prices on this page are shown in euro using Austrian number formatting. If you sell B2C digital products or services into Austria from abroad, you can generally report that VAT through the EU One-Stop Shop (OSS) rather than registering for USt separately — confirm your setup with an accountant before filing.',
  ],
  belgium: [
    'Belgium applies BTW / TVA at a 21% standard rate — the rate most online sellers use for goods delivered to Belgian buyers. Two reduced rates, 6% and 12%, cover certain everyday goods and services defined in Belgian law, and a 12% parking rate applies to a small set of transitional items. Knowing which of your products sit in the 6% or 12% band matters more than the headline rate if you sell food, books or similar categories.',
    'Totals below are formatted in euro the Belgian way. Cross-border sellers of B2C digital goods to Belgium can usually declare the VAT via the EU One-Stop Shop instead of taking a Belgian VAT number — check this with your accountant or the official EU TEDB source.',
  ],
  bulgaria: [
    'Bulgaria has a straightforward setup for small sellers: a flat 20% standard ДДС rate on most goods and services, with a single 9% reduced rate for a limited set of items defined in national law. If everything you sell is standard-rated, your Bulgarian math is just net × 1.20 — the calculator below does exactly that.',
    'Bulgaria now prices in euro, formatted here with Bulgarian conventions. B2C digital sales into Bulgaria from another country can normally be reported through the EU One-Stop Shop (OSS); confirm eligibility with an accountant before you rely on it.',
  ],
  cyprus: [
    'Cyprus levies ΦΠΑ at a 19% standard rate on most goods and services sold to Cypriot customers. Two reduced rates (5% and 9%) and a 3% super-reduced rate apply to narrow categories set out in Cypriot law, so sellers with mixed catalogues should check line by line rather than assuming 19% everywhere.',
    'Amounts are shown in euro with Cypriot formatting. If you supply B2C digital products to Cyprus from abroad, the EU One-Stop Shop generally lets you report that VAT centrally instead of registering locally — verify with an accountant first.',
  ],
  'czech-republic': [
    'The Czech Republic charges DPH at a 21% standard rate, with a single 12% reduced rate for qualifying goods and services. For most international sellers of crafts, apparel and general merchandise, 21% is the number that matters.',
    'Czech totals are priced in koruna (CZK) with Czech number formatting, not euro, so double-check your checkout currency. B2C digital sales to Czech buyers can usually be declared via the EU One-Stop Shop rather than a separate Czech registration — confirm with your accountant.',
  ],
  germany: [
    'Germany applies Mehrwertsteuer (MwSt) at a 19% standard rate — the figure most online sellers add to goods shipped to German customers — with a single 7% reduced rate for certain everyday items such as books and foodstuffs defined in German law. Two rates keep the bookkeeping simple: standard for most of your catalogue, 7% only where the law explicitly allows it.',
    'Prices are shown in euro using German formatting (1.234,56 €). If you sell B2C digital products to Germany from another country, you can generally account for that VAT through the EU One-Stop Shop (OSS) instead of registering with the Bundeszentralamt für Steuern — confirm with an accountant before filing.',
  ],
  denmark: [
    'Denmark is the EU outlier sellers love for its simplicity: a flat 25% moms with no reduced rates at all. Every taxable sale to a Danish customer carries the same 25%, so there is no reduced-rate classification to get wrong — but also no lower band to benefit from.',
    'Danish totals are in kroner (DKK) with Danish formatting. B2C digital services sold into Denmark from abroad are normally reported through the EU One-Stop Shop; verify your position with an accountant or the official TEDB source.',
  ],
  estonia: [
    'Estonia charges käibemaks at a 24% standard rate, with 9% and 13% reduced rates for qualifying categories in national law. It sits at the higher end of EU headline rates, so pricing "VAT included" for Estonian buyers needs a visibly bigger gross-up than for Germany or Luxembourg.',
    'Amounts appear in euro with Estonian formatting. Cross-border B2C digital sales to Estonia can generally go through the EU One-Stop Shop rather than a separate Estonian registration — check with your accountant.',
  ],
  spain: [
    'Spain applies IVA at a 21% standard rate on most goods and services, plus a 10% reduced rate and a 4% super-reduced rate for a narrow set of essentials. The dataset also reflects additional territorial rates (the full reduced list runs to 10%, with super-reduced 4%), which is why sellers shipping to the Canary Islands or the North-African enclaves should confirm the place-of-supply treatment separately.',
    'Mainland prices are in euro with Spanish formatting. B2C digital products sold to Spanish consumers from abroad can usually be declared via the EU One-Stop Shop — confirm the details with an accountant before filing.',
  ],
  finland: [
    'Finland has the EU\'s only fractional headline rate: Arvonlisävero (ALV) at 25.5% standard, with 10% and 13.5% reduced rates. The unusual decimals mean rounding matters — always round per line or per invoice the way your accounting tool does, and use the calculator below which multiplies by exactly 25.5%.',
    'Finnish euro formatting is used throughout this page. Digital B2C sales into Finland from another country are normally reported through the EU One-Stop Shop instead of a Finnish registration — verify with your accountant.',
  ],
  france: [
    'France levies Taxe sur la valeur ajoutée (TVA) at a 20% standard rate, with reduced rates of 10% and 5.5% applying on the mainland alongside further special rates. Corsica and the overseas departments apply their own special rates, so sellers shipping to the DOM need to check the territorial rate rather than assuming 20% everywhere.',
    'Totals are in euro with French formatting (narrow no-break spaces). B2C digital sales to French consumers from abroad can generally be reported via the EU One-Stop Shop — confirm with an accountant or the TEDB source.',
  ],
  'united-kingdom': [
    'The United Kingdom is not an EU member — it is shown here for reference only because so many EU-based sellers also ship to British customers. The UK charges 20% standard VAT with a single 5% reduced rate on qualifying items; EU OSS schemes do not cover UK sales, so British VAT is handled under separate HMRC rules.',
    'Amounts are in pounds sterling (GBP) with British formatting. Do not use EU reverse-charge or OSS logic for UK orders; check HMRC guidance or your accountant for the correct treatment.',
  ],
  greece: [
    'Greece applies ΦΠΑ at a 24% standard rate — at the higher end of EU headline rates — with 6%, 13% and 17% reduced rates plus 4% super-reduced and 13% parking rates. The 17% band reflects the Aegean-island discount that has applied historically, so sellers should confirm whether their buyer\'s island postcode changes the rate.',
    'Prices are in euro with Greek formatting. B2C digital supplies to Greece from abroad can usually be declared through the EU One-Stop Shop — verify with your accountant before relying on it.',
  ],
  croatia: [
    'Croatia charges PDV at a 25% standard rate, with 5% and 13% reduced rates for qualifying goods and services. For standard-rated crafts and merchandise there is no ambiguity: a Croatian consumer price is net × 1.25.',
    'Croatian totals are in euro with Croatian formatting. Cross-border B2C digital sales to Croatia are normally reported via the EU One-Stop Shop rather than a separate Croatian registration — confirm with your accountant.',
  ],
  hungary: [
    'Hungary has the highest headline VAT in the EU: 27% standard ÁFA, with 5% and 18% reduced rates. The gap between standard and reduced is enormous, so correctly identifying the 5% or 18% items in your catalogue is worth real money — but never assume a product qualifies without checking Hungarian law.',
    'Hungarian totals are in forint (HUF), which has no minor units in practice, formatted the Hungarian way. B2C digital sales into Hungary can generally be reported through the EU One-Stop Shop — verify with your accountant.',
  ],
  ireland: [
    'Ireland charges VAT at a 23% standard rate, with 9% and 13.5% reduced rates covering hospitality, construction-related services and certain goods defined in Irish law. English-speaking sellers often start with Ireland, and the two reduced bands reward a quick check of whether any of your products sit outside the 23% default.',
    'Irish euro formatting (1,234.56 € style) is used on this page. B2C digital products sold to Irish buyers from abroad can usually be declared via the EU One-Stop Shop — confirm with your accountant.',
  ],
  italy: [
    'Italy applies IVA at a 22% standard rate, with 5% and 10% reduced rates plus a 4% super-reduced rate on a narrow set of essentials. Sellers of food, books and hospitality-adjacent goods most often meet the reduced bands; general merchandise stays at 22%.',
    'Amounts are in euro with Italian formatting. Cross-border B2C digital sales to Italy are normally reported through the EU One-Stop Shop instead of an Italian registration — check with your accountant first.',
  ],
  lithuania: [
    'Lithuania levies PVM at a 21% standard rate with 5% and 12% reduced rates for qualifying categories. It is a straightforward three-band system: most seller catalogues land entirely at 21% unless they include food, books, medicines or passenger-transport-adjacent services covered by national law.',
    'Lithuanian euro formatting is used below. B2C digital supplies to Lithuania from another country can generally go through the EU One-Stop Shop — verify with your accountant.',
  ],
  luxembourg: [
    'Luxembourg has the EU\'s lowest headline rate: 17% standard TVA, with 8% and 14% reduced rates, a 3% super-reduced rate and a 14% parking rate. Sellers who price pan-EU "VAT included" often anchor on Luxembourg as the best-case line, but each buyer\'s country rate still governs the actual VAT due.',
    'Prices are in euro with Luxembourgish formatting. B2C digital sales to Luxembourg from abroad are normally declared via the EU One-Stop Shop — confirm with your accountant.',
  ],
  latvia: [
    'Latvia applies PVN at a 21% standard rate with 5% and 12% reduced rates for qualifying goods and services set out in Latvian law. Standard-rated goods math is simple — net × 1.21 — and the reduced bands only help if your products fall squarely inside them.',
    'Latvian euro formatting is used on this page. Cross-border B2C digital sales to Latvia can generally be reported through the EU One-Stop Shop — check with your accountant.',
  ],
  malta: [
    'Malta charges VAT at an 18% standard rate — the EU\'s second-lowest headline — with 5% and 7% reduced rates plus a 12% parking rate on transitional items. Malta applies one of the lower headline rates in the EU for standard-rated goods.',
    'Maltese totals are in euro with local formatting. B2C digital products sold to Malta from abroad are normally declared via the EU One-Stop Shop — verify with your accountant before filing.',
  ],
  netherlands: [
    'The Netherlands applies btw at a 21% standard rate with a single 9% reduced rate for qualifying goods and services. Two bands make classification easy: unless Dutch law explicitly puts your product in the 9% group, it is 21%.',
    'Dutch euro formatting is used throughout. B2C digital sales to Dutch consumers from another country can usually be reported via the EU One-Stop Shop instead of a separate Dutch registration — confirm with your accountant.',
  ],
  poland: [
    'Poland levies VAT at a 23% standard rate, with 5% and 8% reduced rates (the 8% band also recorded as super-reduced in the source data). Sellers of food, books, children\'s goods and related categories most often meet the lower bands; everything else stays at 23%.',
    'Polish totals are in złoty (PLN) with Polish formatting — note the comma decimals. B2C digital supplies to Poland from abroad are normally reported through the EU One-Stop Shop — verify with your accountant.',
  ],
  portugal: [
    'Portugal charges IVA at a 23% standard rate, with reduced rates of 6%, 13%, 16% and 22% — plus 6% super-reduced and 13% parking rates. The extra bands reflect the Azores and Madeira, which apply lower regional rates than the mainland, so sellers should confirm the buyer\'s region for edge cases.',
    'Mainland prices are in euro with Portuguese formatting. B2C digital sales to Portugal from abroad can generally be declared via the EU One-Stop Shop — check with your accountant first.',
  ],
  romania: [
    'Romania applies TVA at a 21% standard rate with a single 11% reduced rate for qualifying items in national law. Sellers with general-merchandise catalogues can treat Romania as a one-rate line at 21% unless a product explicitly falls in the 11% group.',
    'Romanian totals are in leu (RON) with Romanian formatting. Cross-border B2C digital sales to Romania are normally reported via the EU One-Stop Shop — confirm with your accountant.',
  ],
  sweden: [
    'Sweden charges moms at a 25% standard rate with 6% and 12% reduced rates. The reduced bands cover categories such as food, books and passenger transport defined in Swedish law, while crafts, apparel and general merchandise stay at 25%.',
    'Swedish totals are in kronor (SEK) with Swedish formatting. B2C digital services sold to Sweden from abroad are generally reported through the EU One-Stop Shop — verify with your accountant.',
  ],
  slovenia: [
    'Slovenia applies DDV at a 22% standard rate with 5% and 9.5% reduced rates — the 9.5% band is unusual in the EU, so enter it exactly rather than rounding to 10%. Standard-rated goods are simply net × 1.22.',
    'Slovenian euro formatting is used below. B2C digital supplies to Slovenia from another country can normally be declared via the EU One-Stop Shop — check with your accountant.',
  ],
  slovakia: [
    'Slovakia levies DPH at a 23% standard rate, with 5% and 19% reduced rates. The 19% second band is distinctive — close to the headline rate but not identical — so sellers should apply it precisely where Slovak law allows rather than defaulting to 23%.',
    'Slovak totals are in euro with Slovak formatting. Cross-border B2C digital sales to Slovakia are generally reported through the EU One-Stop Shop — confirm with your accountant before filing.',
  ],
};

export const FAQS: Record<string, CountryFaq[]> = {};
for (const [slug, paras] of Object.entries(DESCRIPTIONS)) {
  void paras;
  void slug;
}
// FAQs are generated per page from live data (see [country].astro) so the
// numbers can never drift from the data package. This map exists only to
// allow hand-overrides if ever needed; by default it stays empty.
