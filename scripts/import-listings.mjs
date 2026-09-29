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
  if (t.includes("villa")) return "villa";
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
const listings = lines.map((line, i) => {
  const r = JSON.parse(line);
  const text = `${r.description ?? ""} ${(r.features ?? []).join(" ")}`;
  return {
    slug: r.slug,
    source: `${SOURCE}${r.slug}/`,
    title: { en: titleCase(r.title) },
    description: { en: r.description ?? "" },
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
