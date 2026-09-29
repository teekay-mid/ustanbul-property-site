import data from "@/data/listings.json";
import type { Locale } from "@/lib/i18n";

// Text is copied from propertyustanbul.com in English; other languages fall
// back to English until translations are added.
type Localized = Partial<Record<Locale, string>> & { en: string };

export const categories = ["apartment", "villa", "luxury", "commercial"] as const;
export type Category = (typeof categories)[number];

export type Listing = {
  slug: string;
  source: string;
  title: Localized;
  description: Localized;
  status: "for_sale" | "for_rent" | "sold";
  category: Category;
  district: string;
  districtName: string;
  address: string | null;
  price: number | null;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  areaM2: number | null;
  features: string[];
  citizenshipEligible: boolean;
  featured: boolean;
  images: string[];
  order: number;
};

export const listings = data as Listing[];

export function text(value: Localized, locale: Locale) {
  return value[locale] ?? value.en;
}

export function getListing(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export function listingsByCategory(category: Category) {
  return listings.filter((l) => l.category === category);
}

export function similarListings(listing: Listing, count = 3) {
  return listings
    .filter((l) => l.slug !== listing.slug && l.status !== "sold")
    .sort(
      (a, b) =>
        Number(b.district === listing.district) - Number(a.district === listing.district) ||
        Number(b.category === listing.category) - Number(a.category === listing.category) ||
        Math.abs((a.price ?? 0) - (listing.price ?? 0)) - Math.abs((b.price ?? 0) - (listing.price ?? 0)),
    )
    .slice(0, count);
}

export function formatPrice(listing: Listing, locale: Locale, onRequest: string) {
  if (listing.price === null) return onRequest;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(listing.price);
}
