// Converts listings copied from propertyustanbul.com (data/propertyustanbul.jsonl,
// one JSON object per line) into src/data/listings.json, the file the site reads.
// Run with: npm run import:listings
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "https://propertyustanbul.com/property/";

const titleCase = (s) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/(^|[\s\-/(])(\p{L})/gu, (_, sep, ch) => sep + ch.toLocaleUpperCase("tr"));

const slugify = (s) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function category(type = "") {
  const t = type.toLowerCase();
  if (t.includes("villa") || t.includes("house")) return "villa";
  if (t.includes("luxury")) return "luxury";
  if (/office|commercial|store|shop/.test(t)) return "commercial";
  return "apartment";
}

function status(s = "") {
  const t = s.toLowerCase();
  if (t.includes("rent")) return "for_rent";
  if (t.includes("sold")) return "sold";
  return "for_sale";
}

const lines = readFileSync("data/propertyustanbul.jsonl", "utf8").split("\n").filter(Boolean);
const records = lines.map((line) => JSON.parse(line));
const bySlug = new Map(records.map((r) => [r.slug, r]));
// Units in the same project share one description: "descriptionFrom": "<slug>".
for (const r of records) if (r.descriptionFrom) r.description = bySlug.get(r.descriptionFrom).description;

// Text pasted from PDFs into WordPress contains ligature characters.
const clean = (s) => s?.replace(/Ɵ/g, "ti").replace(/Ō/g, "ft").replace(/ﬁ/g, "fi").replace(/ﬂ/g, "fl");

const listings = records.map((r, i) => {
  const text = `${r.description ?? ""} ${(r.features ?? []).join(" ")}`;
  return {
    slug: r.slug,
    source: `${SOURCE}${r.slug}/`,
    title: { en: titleCase(r.title) },
    description: { en: clean(r.description) ?? "" },
    status: status(r.status),
    category: category(r.type),
    district: r.district ? slugify(r.district) : "istanbul",
    districtName: r.district ?? "Istanbul",
    address: r.address ?? null,
    price: typeof r.price === "number" ? r.price : null,
    currency: r.currency ?? "USD",
    bedrooms: r.bedrooms ?? null,
    bathrooms: r.bathrooms ?? null,
    areaM2: r.size_m2 ?? null,
    features: (r.features ?? []).filter((f) => !/citizenship/i.test(f)),
    citizenshipEligible: /citizenship/i.test(text) && !/not (eligible|qualify)/i.test(text),
    featured: r.label === "Hot Offer",
    images: r.images ?? [],
    order: i,
  };
});

writeFileSync("src/data/listings.json", JSON.stringify(listings, null, 2) + "\n");
console.log(`Wrote ${listings.length} listings to src/data/listings.json`);
