import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { getDistrict } from "@/lib/districts";
import type { Locale } from "@/lib/i18n";
import { formatPrice, type Listing } from "@/lib/listings";
import { ListingImage } from "./ListingImage";

export function ListingCard({ listing, locale, t }: { listing: Listing; locale: Locale; t: Dictionary["listing"] }) {
  const district = getDistrict(listing.district);
  return (
    <Link
      href={`/${locale}/properties/${listing.slug}`}
      className="group block overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:shadow-md"
    >
      <ListingImage listing={listing} locale={locale} className="aspect-[4/3]" />
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gold">
          {district?.name[locale]} · {t[listing.status]}
        </p>
        <h3 className="mt-1 font-semibold text-stone-900 group-hover:text-navy">{listing.title[locale]}</h3>
        <p className="mt-2 text-lg font-semibold text-navy">{formatPrice(listing, locale)}</p>
        <p className="mt-1 text-sm text-stone-600">
          {listing.rooms} · {listing.areaM2} m²
          {listing.citizenshipEligible ? ` · ${t.citizenshipEligible}` : ""}
        </p>
      </div>
    </Link>
  );
}
